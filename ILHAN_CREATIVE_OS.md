# ILHAN_CREATIVE_OS.md
# İlhan Çevn Creative Operating System
## Reusable Framework for All Future Projects

---

## What This Is

This document is a reusable operating system for every creative and digital project İlhan Çevn undertakes. It defines standards, workflows, tech stacks, and decision frameworks for:

- Brand identity projects
- Corporate identity projects
- Portfolio websites
- Client websites / landing pages
- YouTube channel branding
- AI-generated visual systems
- SEO implementation
- GitHub and Vercel deployment

Use this as the starting point for any new project. It is informed by the lessons learned building `iccreative-portfolio`.

---

## Part 1: Brand Identity Projects

### Standard Deliverables Checklist

**Core Identity**
- [ ] Primary logo (SVG + PNG at 2000px)
- [ ] Icon/mark variant (square, for apps/favicons)
- [ ] Wordmark variant (if different from logo)
- [ ] Logo on dark background
- [ ] Logo on light background
- [ ] Logo on brand color background
- [ ] Minimum size specification

**Color System**
- [ ] Primary color (HEX, RGB, CMYK, Pantone)
- [ ] Secondary color(s)
- [ ] Neutral palette (3–5 grays)
- [ ] Color usage rules (what goes where)
- [ ] Color accessibility check (WCAG contrast ratios)

**Typography**
- [ ] Primary typeface (heading)
- [ ] Secondary typeface (body)
- [ ] License type (Google Fonts / Adobe Fonts / purchased)
- [ ] Type scale (H1 through body and caption)
- [ ] Typographic rules (spacing, alignment, case)

**Brand Applications**
- [ ] Business card (front + back)
- [ ] Letterhead (A4)
- [ ] Email signature
- [ ] Social media profile picture
- [ ] Social media cover image (LinkedIn: 1584×396, Facebook: 820×312)
- [ ] Instagram post template (1:1 and 9:16)
- [ ] PowerPoint/presentation template

**Brand Guidelines PDF**
- [ ] Logo usage (do's and don'ts)
- [ ] Color palette
- [ ] Typography
- [ ] Spacing and margins
- [ ] Photography/imagery direction
- [ ] Tone of voice (3–5 adjectives + writing examples)

---

## Part 2: Corporate Identity Projects

**Beyond brand identity — includes all business materials:**

- [ ] All brand identity deliverables (above)
- [ ] Company profile (12–24 page PDF)
- [ ] Proposal/quote template
- [ ] Invoice template
- [ ] Email templates (transactional + marketing)
- [ ] Signage system (interior + exterior)
- [ ] Vehicle wrap concept
- [ ] Uniforms/workwear concept
- [ ] Packaging (if applicable)
- [ ] Digital banner ads (5 sizes minimum)

---

## Part 3: Website Projects — Tech Stack

### Stack Decision Framework

| Project type | Recommended stack |
|---|---|
| Portfolio / personal brand | React + Vite + Tailwind (this stack) |
| Small business / landing page | Next.js 14 App Router (simple, SEO-ready) |
| E-commerce | Shopify or Next.js + Stripe |
| Content/blog | Next.js + Contentlayer or Sanity |
| App MVP | Next.js 14 + Prisma + PostgreSQL |

### For Any New Portfolio/Branding Website

**Base setup** (copy from `iccreative-portfolio`):
```bash
npm create vite@latest project-name -- --template react
npm install framer-motion i18next react-i18next tailwindcss autoprefixer postcss
npx tailwindcss init -p
```

**Always include from day 1:**
1. `vite.config.js` — base path, chunk splitting
2. `src/styles/globals.css` — design tokens as CSS custom properties
3. `src/utils/assetPath.js` — `assetUrl()` function for GitHub Pages compat
4. `src/i18n.js` — bilingual setup (EN + TR minimum)
5. `src/context/ModalContext.jsx` — if the site has modals

**Design system files to copy from this project:**
- `globals.css` — color tokens, animations, glass utilities
- The `GlowButton`, `SectionTag`, `GlassCard`, `AnimatedCounter` components

### Deployment Decisions

| Hosting | When to use | Cost |
|---|---|---|
| GitHub Pages | Static sites, portfolio, no backend | Free |
| Vercel | Any Next.js project, API routes needed | Free tier generous |
| Netlify | Forms needed without backend code | Free tier |
| Railway | Full-stack with database | $5–20/month |

**GitHub Pages deployment** — always use GitHub Actions (not branch deploy):
- Source: `.github/workflows/deploy.yml` (copy from this project)
- Key: `base: '/repo-name/'` in vite.config.js
- Key: `assetUrl()` for all image paths

---

## Part 4: Dark Cosmos Design System (Reusable)

The design language from `iccreative-portfolio` is reusable for any premium creative studio site.

### Core Color Palette
```css
--color-bg:     #020210   /* Deep cosmic dark */
--color-blue:   #3F8CFF   /* Primary energy */
--color-cyan:   #00D4FF   /* Secondary electric */
--color-violet: #7B4FFF   /* Depth */
--color-text-primary:   #F0F2FF
--color-text-secondary: #8A90A8
```

### Font
**Space Grotesk** — Google Fonts. Geometric, slightly editorial, modern.
Alternative: Inter (more neutral), Syne (more distinctive)

### Animation Philosophy
- Entrance: fade + slide up (Y: 24px → 0), 650ms, ease-expo-out
- H1 words: "The Print" effect — rotateX + blur + Y translate, staggered
- Background: breathing orbs (10–26 second cycles, very subtle)
- Hover: scale(1.02–1.05), border brightens, 200–350ms

### Component Library
All components from this project are portable:
- `LogoMark.jsx` — for any brand with a monogram logo
- `GlowButton.jsx` — primary/secondary CTAs
- `CaseStudyModal.jsx` — for portfolio case studies
- `GlobalAtmosphere.jsx` — background atmosphere layer
- `AnimatedCounter.jsx` — number count-up
- `SectionBridge.jsx` — section separators

---

## Part 5: i18n System (EN + TR)

**Every client site should be bilingual from the start.**

### Setup (15 minutes)
1. Copy `src/i18n.js`
2. Create `src/locales/en/translation.json` and `src/locales/tr/translation.json`
3. localStorage key: `ic_lang` (or `{project}_lang`)
4. Language toggle: saves to localStorage

### Key patterns
```js
// Simple string
t('section.title')

// Array (for headlines, lists)
t('section.items', { returnObjects: true })

// Nested
t('work.projects.0.title')
```

### Translation file structure
```json
{
  "nav": { ... },
  "hero": { "headline": ["word1", "word2"], "subline": "..." },
  "section_name": {
    "section_label": "UPPERCASE LABEL",
    "title_line1": "...",
    "title_line2": "...",
    "items": [{ "title": "...", "desc": "..." }]
  }
}
```

---

## Part 6: SEO System

See `SEO_SYSTEM.md` for current implementation.

### SEO Checklist for Every New Site

**`index.html` must have:**
- [ ] `<title>` — 50–60 chars, include main keyword + location
- [ ] `<meta name="description">` — 150–160 chars
- [ ] `<link rel="canonical">`
- [ ] Open Graph (og:title, og:description, og:image, og:url)
- [ ] Twitter Card (summary_large_image)
- [ ] JSON-LD: at minimum a Person or Organization schema
- [ ] hreflang if multilingual
- [ ] `<meta name="theme-color">` for mobile browser chrome

**`public/` must have:**
- [ ] `robots.txt`
- [ ] `sitemap.xml`
- [ ] `og-image.jpg` (1200×630)
- [ ] `favicon.svg` + `favicon-32.png`
- [ ] `apple-touch-icon.png` (180×180)

**JSON-LD types for creative studio:**
- `Person` — the designer/creative
- `ProfessionalService` — the studio
- `WebSite` — with SearchAction
- `CreativeWork` or `ItemList` — portfolio

---

## Part 7: GitHub Deployment OS

### Standard Workflow for Every Project

**Initial setup:**
```bash
cd project-folder
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

**Auto-deploy workflow** — copy `.github/workflows/deploy.yml` from this project.
Always add a build verification step:
```yaml
- name: Verify build output
  run: |
    if grep -q '/src/main.jsx' dist/index.html; then
      echo "ERROR: raw source was not built"
      exit 1
    fi
    echo "✓ Build output verified"
```

**Daily workflow:**
```bash
# Make changes
git add specific-files
git commit -m "clear description of what changed"
git push
# Wait ~60 seconds → check live URL
```

**Check Actions status:**
`https://github.com/USERNAME/REPO/actions`

---

## Part 8: Image Optimization Protocol

**Before any deployment, all images must be:**

1. **Format**: WebP preferred (.webp). JPEG acceptable for photos. PNG only for graphics with transparency.
2. **Quality**: WebP at quality=87 gives excellent results with ~70–80% size reduction.
3. **Naming**: lowercase, hyphens or underscores, descriptive: `chargenest_001.webp`
4. **Storage**: `public/projects/{slug}/` for project images, `public/` for global assets
5. **Path in code**: always via `assetUrl()` — never raw string paths

**WebP batch conversion (Python):**
```python
from PIL import Image
import os, pathlib

src = pathlib.Path('source_images')
out = pathlib.Path('public/projects/newproject')
out.mkdir(parents=True, exist_ok=True)

for f in sorted(src.iterdir()):
    if f.suffix.lower() in ('.jpg', '.jpeg', '.png'):
        img = Image.open(f)
        dest = out / f.stem.lower().replace(' ', '_')
        dest = dest.with_suffix('.webp')
        img.save(dest, 'WEBP', quality=87)
        orig_kb = f.stat().st_size / 1024
        new_kb = dest.stat().st_size / 1024
        print(f'{f.name} → {dest.name}: {orig_kb:.0f}KB → {new_kb:.0f}KB')
```

**LCP (Largest Contentful Paint) optimization:**
- Featured/hero image: `loading="eager" fetchpriority="high"`
- Everything else: `loading="lazy" decoding="async"`

---

## Part 9: AI-Generated Visual Systems

For projects incorporating AI-generated imagery or AI-assisted design:

### Tools Stack
- **Midjourney** — premium image generation, best for brand visuals
- **Adobe Firefly** — commercially safe, integrates with CC
- **DALL-E 3** (via ChatGPT) — accessible, good for concepts
- **Stable Diffusion** — local, full control, advanced users
- **RunwayML** — video generation, motion graphics

### Workflow
1. Define visual brief in text: mood, color palette, style references, must-avoid list
2. Generate 20+ options → select 3–5 best
3. Upscale winners (Topaz AI or Midjourney upscale)
4. Post-process in Photoshop: adjust saturation, add brand color grading
5. Export at required size and format

### Consistency Protocol
For a brand with AI imagery:
- Save your winning prompts → reuse with slight variations
- Create a "brand style seed" — use `--sref` in Midjourney to lock visual style
- Maintain a Notion or spreadsheet of: prompt | output | status (approved/rejected)

---

## Part 10: Project Kickoff Template

Use this for every new project:

### Discovery Questions (send to client)
1. What does your company do and who is your target customer?
2. What 3 words should people feel when they see your brand?
3. Who are your main competitors? What do you like and dislike about their brands?
4. Which brands (outside your industry) do you admire visually? Why?
5. What are your must-have and must-avoid colors?
6. Where will this brand be used most? (digital, print, signage, packaging, etc.)
7. What is your timeline and budget?

### Project Brief Template
```
PROJECT: {name}
CLIENT: {client}
DATE: {date}
DEADLINE: {deadline}

WHAT: {one sentence description}
FOR WHOM: {target audience}
WHY: {problem being solved}

DELIVERABLES:
- [list]

REFERENCES:
- [3-5 visual reference URLs]

MUST-HAVE:
- [constraints, colors, must-include elements]

MUST-AVOID:
- [styles, colors, competitors to not look like]

SUCCESS METRICS:
- [how will we know this was successful?]
```

---

## Part 11: Recurring Preferences & Lessons Learned

These are hard-won preferences from working on `iccreative-portfolio`:

1. **Always use `minHeight: 'min(100vh, 980px)'`** for hero sections — never bare `height: 100vh`. Tall screens would otherwise make the hero grotesquely large.

2. **Always use `assetUrl()` for ALL image paths** in React components — never raw strings. GitHub Pages subdirectory deployment breaks root-absolute paths.

3. **Never combine `alignItems: center` + fixed `height` + `overflow: hidden`** on a flex container. If content exceeds the height, it clips equally from both top and bottom.

4. **GitHub Pages source must be "GitHub Actions"** (not "Deploy from branch"). This setting lives in repo Settings → Pages and must be set manually after first push.

5. **JSON must not have trailing commas** — always validate with `node -e "require('./file.json')"` after editing JSON files.

6. **`npm ci` requires `package-lock.json` to be committed** — never add it to .gitignore.

7. **Build verification in CI is essential** — the workflow should check that `dist/index.html` references `/assets/` paths, not `/src/`. This catches the "Pages serving raw source" bug.

8. **i18n arrays need `{ returnObjects: true }`** — `t('key.array')` returns the key string without this flag.

9. **WebP conversion gives 70–80% size reduction** with imperceptible quality loss at quality=87. Always convert before deployment.

10. **Design tokens as CSS custom properties** — define all colors in `:root {}` in globals.css. Never hardcode hex values in JSX.
