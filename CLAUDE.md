# CLAUDE.md — iç creative Portfolio: Project Memory

This file is the primary memory document for this project.
Read this first at the start of every new Claude session.

---

## Project Identity

| Field | Value |
|---|---|
| Brand name | **iç creative** |
| Owner | **İlhan Çevn** |
| Role | Creative Director & Brand Identity Designer |
| Years active | 25+ |
| Location | Istanbul, Turkey (also serves Germany, Europe) |
| Email | ilhncvn@gmail.com |
| GitHub user | ilhncvn-png |
| Repo | https://github.com/ilhncvn-png/iccreative-portfolio |
| Live URL | https://ilhncvn-png.github.io/iccreative-portfolio/ |
| Twitter/X | @ilhncvn |

---

## Tech Stack

| Layer | Library | Version |
|---|---|---|
| Framework | React | 18.3.1 |
| Build tool | Vite | 6.x |
| Styling | Tailwind CSS | 3.4.17 (JIT) |
| Animation | Framer Motion | 11.x |
| i18n | react-i18next + i18next | 17.x / 26.x |
| Icons | lucide-react | 0.468 |
| Font | Space Grotesk | Google Fonts (300–700) |
| Deployment | GitHub Pages via GitHub Actions | — |

---

## File Structure

```
/
├── index.html                   ← Full SEO: title, meta, OG, Twitter, JSON-LD, hreflang
├── vite.config.js               ← base: '/iccreative-portfolio/', chunk splitting
├── .github/workflows/deploy.yml ← Auto-deploy on push to main
├── public/
│   ├── logo.webp                ← İÇ brand monogram (60KB WebP)
│   ├── og-image.jpg             ← Social share image 1200×630
│   ├── apple-touch-icon.png     ← 180×180 iOS icon
│   ├── favicon.svg / favicon-*.png
│   ├── robots.txt
│   ├── sitemap.xml
│   └── projects/
│       ├── ineed/               ← 7 images (.webp + .jpg)
│       ├── chargenest/          ← 12 images
│       ├── evercraft/           ← 6 images (all .webp)
│       ├── cata/                ← 6 images (all .webp)
│       ├── ineedhome/           ← 4 images (all .webp)
│       ├── dreamcloud/          ← 4 images (all .webp)
│       ├── beyondmidnightwaves/ ← 5 images (all .webp)
│       └── minimelodysong/      ← 6 images (all .webp)
└── src/
    ├── App.jsx                  ← Section order + ModalProvider wrapper
    ├── main.jsx                 ← React root mount
    ├── i18n.js                  ← i18next init, localStorage key: ic_lang
    ├── styles/globals.css       ← Design tokens + animations + responsive rules
    ├── utils/assetPath.js       ← assetUrl() — prepends BASE_URL for GitHub Pages
    ├── context/ModalContext.jsx ← isOpen, openModal, closeModal, activeCaseStudy
    ├── data/hero.js             ← CTA hrefs and hero static data
    ├── locales/
    │   ├── en/translation.json  ← English content (all sections + 8 projects)
    │   └── tr/translation.json  ← Turkish content (all sections + 8 projects)
    ├── components/
    │   ├── layout/
    │   │   └── Header.jsx       ← Fixed nav, lang switcher, "Start a Project" CTA
    │   ├── sections/
    │   │   ├── Hero.jsx         ← EnergyCore SVG visual, H1, stats, CTAs
    │   │   ├── Experience.jsx   ← 25+ years, stats row, capabilities grid
    │   │   ├── Services.jsx     ← 6 service cards with capabilities list
    │   │   ├── AIDev.jsx        ← AI Development section, stack index
    │   │   ├── Branding.jsx     ← Brand pillars, quote
    │   │   ├── WebDesign.jsx    ← Web services, capabilities
    │   │   ├── ContentYoutube.jsx ← YouTube ecosystem section
    │   │   ├── Work.jsx         ← Portfolio grid, FeaturedCard + GridCards
    │   │   ├── Process.jsx      ← How we work / process steps
    │   │   └── Contact.jsx      ← Lead generation form / contact section
    │   └── ui/
    │       ├── CaseStudyModal.jsx   ← Full case study overlay (z-600), portal
    │       ├── ProjectModal.jsx     ← Lightweight project modal
    │       ├── LogoMark.jsx         ← İÇ brand monogram (watermark + interactive)
    │       ├── GlobalAtmosphere.jsx ← Fixed bg: blobs, particles, editorial line
    │       ├── ChromaticBackground.jsx ← Chromatic orb background layer
    │       ├── LoadingScreen.jsx    ← Intro loading animation
    │       ├── GlowButton.jsx       ← Primary/secondary CTA button
    │       ├── GlassCard.jsx        ← Glassmorphism card component
    │       ├── SectionTag.jsx       ← Small uppercase category badge
    │       ├── SectionBridge.jsx    ← Subtle visual connectors between sections
    │       ├── LangSwitcher.jsx     ← EN/TR toggle, saves to localStorage
    │       └── AnimatedCounter.jsx  ← Number count-up animation
```

---

## Page Sections (in scroll order)

1. **Hero** — EnergyCore visual, headline "Designing Brands, Systems & Digital Experiences", 4 stat cards (25+yr, 6 disciplines, Global, AI), 2 CTAs
2. **Experience** — "25+ Years of Creative Direction", stats row, 8 capability cards
3. **Services** — 6 service areas (Branding, Web, AI Development, Social Media, YouTube, Motion)
4. **AIDev** — AI workflow section, tech stack index with categories
5. **Branding** — Brand philosophy: Positioning, Identity, Architecture, Messaging pillars + quote
6. **WebDesign** — Web design capabilities
7. **ContentYoutube** — YouTube ecosystem services
8. **Work** — Portfolio: 1 FeaturedCard (iNeed) + 7 GridCards in 2+2+2 + 3+3 layout
9. **Process** — How the collaboration works
10. **Contact** — Lead gen / contact form

---

## Portfolio Projects (8 total, in Work section order)

| ID | Title | Category | Year | Grid | Accent |
|---|---|---|---|---|---|
| 01 | iNeed | Brand Identity · App Design · Visual Identity | 2023 | Featured (full-width) | #1E64FF |
| 02 | chargenest | Brand Identity · App Design · Mobile UI | 2022 | col-span-3 (Row 1) | #3DDC84 |
| 03 | EverCraft | Brand Identity · Web Design · Corporate Identity | 2024 | col-span-3 (Row 1) | #2255FF |
| 04 | cata | Brand Identity · Marine Services · Corporate Identity | 2023 | col-span-2 (Row 2) | #FF6120 |
| 05 | iNeedhome | Web App · Real Estate · UI Design | 2024 | col-span-2 (Row 2) | #0074F1 |
| 06 | dreamCloud | SaaS · Social Media Management · UI/UX Design | 2024 | col-span-2 (Row 2) | #6C5CE7 |
| 07 | Beyond Midnight Waves | YouTube Ecosystem · Brand Identity · Content Production | 2024 | col-span-3 (Row 3) | #6C52E0 |
| 08 | Mini Melody Song | YouTube Ecosystem · Kids Entertainment · Character Design | 2024 | col-span-3 (Row 3) | #FF5BC1 |

**Grid layout logic (Work.jsx):**
```
const [featured, ...grid] = PROJECTS
// featured → FeaturedCard (left text + right image)
// grid[0-1] → Row 1: 3+3
// grid[2-4] → Row 2: 2+2+2
// grid[5-6] → Row 3: 3+3
```

---

## Case Study System (CaseStudyModal.jsx)

Each project has:
- `images[]` — array of `/projects/{slug}/{slug}_00N.webp` paths from translation.json
- `headline` — case study title
- `overview` / `challenge` / `solution` — long-form text
- `ART_DIRECTION['id']` — per-image presentation config in CaseStudyModal.jsx

**ART_DIRECTION config per image:**
```js
{
  mode: 'cinematic' | 'editorial' | 'full-bleed' | 'document' | 'portrait-focus' | 'auto',
  layout: 'full-bleed' | 'inset' | 'split-left' | 'split-right' | 'editorial',
  focalPoint: 'center' | 'top' | 'bottom',
  label: 'STRING',      // e.g. 'WORDMARK'
  caption: 'STRING',    // descriptive caption
}
```

**AdaptiveImage** renders differently based on `mode`:
- `document` → constrained max-width image
- everything else → full-bleed `position: absolute` fill

Opening: `openCaseStudy(project)` from ModalContext.
Portal: `createPortal(content, document.body)` at z-index 600.

---

## i18n System

- **Languages**: English (default) + Turkish
- **Key**: `ic_lang` in localStorage
- **Init**: `src/i18n.js` → `i18next.use(initReactI18next).init(...)`
- **Arrays**: `t('key', { returnObjects: true })` for headline words, stats, caps arrays
- **Language toggle**: `LangSwitcher.jsx` → `i18n.changeLanguage()` + saves to localStorage

**Critical i18n pattern** — work projects:
```js
const projectTexts = t('work.projects', { returnObjects: true })  // array of 8
const PROJECTS = PROJECT_VISUAL.map((vis, i) => ({ ...vis, ...projectTexts[i] }))
```

Translation JSON keys for a project:
```json
{
  "title": "...",
  "category": "...",
  "headline": "...",
  "overview": "...",
  "challenge": "...",
  "solution": "...",
  "images": ["/projects/slug/slug_001.webp", ...]
}
```

---

## Image System

**CRITICAL rule**: All public-folder images must use `assetUrl()`:
```js
import { assetUrl } from '../../utils/assetPath'
src={assetUrl('/logo.webp')}                    // logo
src={assetUrl(coverImage)}                       // project covers
const images = (project.images || []).map(assetUrl)  // gallery
```

`assetUrl(path)` = `import.meta.env.BASE_URL + path.replace(/^\//, '')`
- Dev: `/logo.webp`
- Production: `/iccreative-portfolio/logo.webp`

**Images in translation.json are stored as root-absolute paths** (`/projects/...`).
**DO NOT store them without the leading slash.** assetUrl strips it.

Image loading attributes:
- Featured card cover / LCP: `loading="eager" fetchpriority="high"`
- Grid cards + modal gallery: `loading="lazy" decoding="async"`

---

## Design System Summary

See `DESIGN_SYSTEM.md` for full detail.

**Core colors (CSS vars):**
```
--color-bg:           #020210  (deep cosmic dark)
--color-surface:      #070B16
--color-card:         #0B1020
--color-blue:         #3F8CFF  (primary accent)
--color-blue-hi:      #5B8FFF
--color-cyan:         #00D4FF
--color-orange:       #FF6B2B
--color-amber:        #FFB347
--color-violet:       #7B4FFF
--color-text-primary: #F0F2FF
--color-text-secondary:#8A90A8
--color-text-muted:   #3D4258
```

**Typography**: Space Grotesk (Google Fonts, weights 300–700)
**Animation**: Framer Motion `motion.div` + `useInView` + `AnimatePresence`
**Easing**: `--ease-expo-out: cubic-bezier(0.16, 1, 0.3, 1)` (main), `--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)`
**Glass**: `background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.09); backdrop-filter: blur(20px)`

---

## Deployment System

**Platform**: GitHub Pages (free, no custom domain currently)
**Trigger**: Every push to `main` branch auto-deploys via GitHub Actions
**Workflow**: `.github/workflows/deploy.yml`
  1. Checkout → Node 20 → `npm ci` → `npm run build`
  2. Verify: checks `dist/index.html` references `/iccreative-portfolio/assets/` NOT `/src/main.jsx`
  3. `actions/upload-pages-artifact@v3` → `actions/deploy-pages@v4`

**CRITICAL**: GitHub repo Settings → Pages → Source must be **"GitHub Actions"** (not branch)

**Vite base path**: `base: '/iccreative-portfolio/'` in `vite.config.js`

**Build output validation**: `npm run build && npm run preview` → test at `http://localhost:4173/iccreative-portfolio/`

**To add custom domain**:
1. Create `public/CNAME` with `yourdomain.com` (no https://)
2. Change `vite.config.js` `base` to `'/'`
3. Update all URLs in `index.html`, `robots.txt`, `sitemap.xml`
4. Add DNS A records pointing to GitHub Pages IPs

---

## SEO Implementation

See `SEO_SYSTEM.md` for full detail.

**All SEO lives in `index.html`** (Vite copies it verbatim to dist/):
- Title, meta description, keywords, author, robots
- Geo targeting: `geo.region = TR-34`, Istanbul coordinates
- Open Graph (og:title, og:description, og:image 1200×630, og:url, og:locale)
- Twitter Card (summary_large_image, @ilhncvn)
- JSON-LD: Person + ProfessionalService + WebSite (with SearchAction) + ItemList (8 projects)
- hreflang: en, tr, x-default

**When domain changes**: update 30+ URL references across `index.html`, `robots.txt`, `sitemap.xml`.
Use: `sed -i '' 's|OLD_DOMAIN|NEW_DOMAIN|g' index.html public/robots.txt public/sitemap.xml`

---

## Known Issues / Watch Points

1. **Hero height** — fixed: `minHeight: 'min(100vh, 980px)'`. If hero content grows taller, it will extend past the cap but won't clip.
2. **Image paths** — fixed: all use `assetUrl()`. Never use raw `/path` strings in `src={}`.
3. **JSON-LD URLs** — currently `ilhncvn-png.github.io`. Update when custom domain is added.
4. **ineed images** — 7 images, but `ineed_002.jpg` through `ineed_007.jpg` are `.jpg`, not `.webp`. Others are `.webp`.

---

## How to Resume This Project

Copy this prompt exactly into a new Claude session:

```
I'm working on my portfolio website at /Users/iceven/Documents/icweb

Please read CLAUDE.md in the project root first — it contains the full project memory.

Current state summary:
- Stack: React 18 + Vite 6 + Tailwind CSS + Framer Motion + react-i18next
- Live at: https://ilhncvn-png.github.io/iccreative-portfolio/
- GitHub: https://github.com/ilhncvn-png/iccreative-portfolio
- 8 portfolio projects in Work section
- EN + TR bilingual
- Deployed via GitHub Actions (push to main = auto-deploy)

Also read: PROJECT_STATUS.md and NEXT_STEPS.md

My request today: [DESCRIBE WHAT YOU WANT TO DO]
```
