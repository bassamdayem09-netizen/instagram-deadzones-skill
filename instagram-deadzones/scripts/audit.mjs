// Usage: node audit.mjs page.html [width=1080] [height=1920] [duration=auto]
// Flags visible text that touches Instagram dead zones. Requires: npm i playwright
import { chromium } from 'playwright';
import path from 'node:path';
const file = path.resolve(process.argv[2] || 'index.html');
const W = +(process.argv[3] || 1080), H = +(process.argv[4] || 1920);
const Z = { top: 250, bottom: H - 420, right: W - 120, edge: 70 };
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H } });
await page.addInitScript(() => { window.__timelines = window.__timelines || {}; });
await page.goto('file://' + file);
await page.waitForTimeout(800);
const res = await page.evaluate(({ Z, W, H }) => {
  const tl = window.__timelines && window.__timelines.main;
  const root = document.querySelector('[data-composition-id]');
  const dur = tl ? tl.duration() : 0;
  const clips = root ? Array.from(document.querySelectorAll('[data-start]')).filter(e => e !== root) : [];
  const seek = t => { if (!tl) return; clips.forEach(c => { const s = +c.dataset.start, d = +c.dataset.duration; c.style.visibility = (t >= s && t < s + d) ? 'visible' : 'hidden'; }); tl.seek(t, false); };
  const opacity = el => { let o = 1; for (let e = el; e && e !== document.body; e = e.parentElement) { const cs = getComputedStyle(e); if (cs.visibility === 'hidden' || cs.display === 'none') return 0; o *= parseFloat(cs.opacity); } return o; };
  const found = new Map();
  const times = tl ? Array.from({ length: Math.floor(dur / 0.5) + 1 }, (_, i) => i * 0.5) : [0];
  for (const t of times) {
    seek(t);
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n;
    while ((n = w.nextNode())) {
      if (!n.textContent.trim()) continue;
      const el = n.parentElement; if (opacity(el) < 0.85) continue;
      const r = document.createRange(); r.selectNodeContents(n);
      const rs = Array.from(r.getClientRects()).filter(x => x.width > 1 && x.height > 1); if (!rs.length) continue;
      const L = Math.min(...rs.map(x => x.left)), R = Math.max(...rs.map(x => x.right)), T = Math.min(...rs.map(x => x.top)), B = Math.max(...rs.map(x => x.bottom));
      const issues = [];
      if (T < Z.top) issues.push('TOP zone (y=' + Math.round(T) + ')');
      if (B > Z.bottom) issues.push('BOTTOM zone (y=' + Math.round(B) + ')');
      if (R > Z.right && B > 900) issues.push('RIGHT buttons (x=' + Math.round(R) + ')');
      if (L < Z.edge || R > W - Z.edge) issues.push('EDGE margin');
      for (const i of issues) {
        const k = i + ' | ' + n.textContent.trim().slice(0, 28);
        const f = found.get(k) || { t0: t, t1: t }; f.t1 = t; found.set(k, f);
      }
    }
  }
  return Array.from(found.entries()).map(([k, v]) => k + ' | ' + v.t0.toFixed(1) + '-' + v.t1.toFixed(1) + 's');
}, { Z, W, H });
console.log(res.length ? res.join('\n') : 'No dead-zone problems found.');
await browser.close();
