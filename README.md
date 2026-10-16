# instagram-deadzones

A free skill for Claude that designs Instagram Reels, Stories, covers and carousels **inside the safe area**, and checks your work for text, logos or CTAs hidden under Instagram's interface (the "dead zones").

By [@ai.lablaunch](https://instagram.com/ai.lablaunch).

## What it does
- Gives Claude the dead-zone numbers and layout rules for 1080 x 1920 Reels/Stories, the profile-grid cover and carousels.
- Includes a red **overlay** you can drop on any design to see the zones.
- Includes an **audit script** that lists every piece of text touching a dead zone (for HTML designs and Hyperframes-style compositions).

## Dead zones at a glance (1080 x 1920)
| Zone | Keep clear |
|---|---|
| Top | first 250 px |
| Bottom | last 420 px (nothing below y = 1500) |
| Right | last 120 px |
| Edges | 70 px margin |

Safe area: x 70 to 960, y 250 to 1500. These are widely used working values, not official Instagram specs. Instagram changes its UI, so always check a draft on a real phone.

## Repo layout
```
instagram-deadzones-skill/
  README.md
  LICENSE
  .gitignore
  instagram-deadzones/        <- the skill folder (this is what you install)
    SKILL.md
    scripts/
      overlay.html
      audit.mjs
      package.json
```

## Install

### Claude (claude.ai / desktop app)
1. Download this repo as a ZIP (green **Code** button, then **Download ZIP**), or grab `instagram-deadzones.zip` from the Releases page.
2. The uploaded ZIP must have the `instagram-deadzones` folder (the one containing `SKILL.md`) at its top level. If you downloaded the whole repo, unzip it and re-zip just the `instagram-deadzones` folder.
3. In Claude, open **Settings**, then **Capabilities** (or **Customize**), find **Skills**, and choose **Upload skill**. Select the ZIP and turn the skill on.
4. Menu names change between versions. If you can't find it, search the settings for "Skills".

### Claude Code
Copy the skill folder into your skills directory:

```bash
# for all your projects
mkdir -p ~/.claude/skills
cp -r instagram-deadzones ~/.claude/skills/

# or for one project only
mkdir -p .claude/skills
cp -r instagram-deadzones .claude/skills/
```
Restart Claude Code. The skill loads automatically when you ask for an Instagram reel, story, cover or carousel design.

## Use it
Ask Claude things like:
- "Design a 9:16 reel intro for my brand. Keep everything inside the Instagram safe area."
- "Check this HTML for Instagram dead-zone problems."
- "Make this cover safe for the profile grid crop."

## Run the audit yourself (optional)
Needs Node.js 18+.

```bash
cd instagram-deadzones/scripts
npm install
npx playwright install chromium
node audit.mjs path/to/your-design.html 1080 1920
```
Output lists each text element that touches a dead zone, with the time range if the page has a timeline (`window.__timelines.main`). `No dead-zone problems found.` means you're clear.

To preview the zones while designing, copy the `<style>` and `<div id="dz">` from `scripts/overlay.html` into your page, then remove them before export.

## Upload this repo to GitHub
1. Create a new empty repository on github.com (for example `instagram-deadzones-skill`). Don't add a README there, this repo already has one.
2. In a terminal, from this folder:
```bash
git init
git add .
git commit -m "Add instagram-deadzones skill"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/instagram-deadzones-skill.git
git push -u origin main
```
3. Optional: create a **Release** and attach `instagram-deadzones.zip` (the zipped skill folder) so people can install without cloning.

No command line? On the new repo page choose **uploading an existing file** and drag in everything in this folder.

## License
MIT. Free to use, modify and share. A credit to @ai.lablaunch is appreciated.
