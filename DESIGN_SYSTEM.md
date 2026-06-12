# DESIGN_SYSTEM.md — iç creative Design Language

---

## Design Philosophy

**Aesthetic**: Dark cosmos / cinematic editorial. The site feels like a premium creative intelligence system — not a standard portfolio. Every visual decision reinforces: sophisticated, precise, AI-forward.

**Mood reference**: Deep-space observatory meets high-end design studio. Navy-black backgrounds, chromatic blue-cyan energy, fine structural lines.

**Anti-patterns to avoid**:
- Never use light/white backgrounds
- Never use rounded-corner cards that feel "bubbly" or casual
- No drop shadows on text
- No stock photography
- No bright saturated colors except as accent moments

---

## Color System

All defined as CSS custom properties in `src/styles/globals.css`:

```css
/* Backgrounds */
--color-bg:            #020210   /* Page background — almost-black deep navy */
--color-surface:       #070B16   /* Cards, modals — slightly lighter */
--color-card:          #0B1020   /* Card backgrounds */

/* Brand accents */
--color-blue:          #3F8CFF   /* Primary — dominant accent */
--color-blue-hi:       #5B8FFF   /* Highlight / hover state of blue */
--color-cyan:          #00D4FF   /* Secondary — energy, tech */
--color-orange:        #FF6B2B   /* CTA buttons (amber-orange) */
--color-amber:         #FFB347   /* Warm accent, rarely used */
--color-violet:        #7B4FFF   /* Third accent — depth, creativity */

/* Text */
--color-text-primary:  #F0F2FF   /* Body text, headings */
--color-text-secondary:#8A90A8   /* Subtext, captions */
--color-text-muted:    #3D4258   /* Labels, timestamps, tertiary info */
```

**Per-project accent colors** (used for hover states, gradients, card glow):

| Project | Color | Hex |
|---|---|---|
| iNeed | Deep blue | #1E64FF |
| chargenest | Android green | #3DDC84 |
| EverCraft | Electric blue | #2255FF |
| cata | Flame orange | #FF6120 |
| iNeedhome | Sky blue | #0074F1 |
| dreamCloud | Purple | #6C5CE7 |
| Beyond Midnight Waves | Deep violet | #6C52E0 |
| Mini Melody Song | Hot pink | #FF5BC1 |

---

## Typography

**Font**: Space Grotesk (Google Fonts)
**Weights loaded**: 300, 400, 500, 600, 700
**Fallback stack**: `'Space Grotesk', 'Inter', ui-sans-serif, system-ui, sans-serif`
**Anti-aliasing**: `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale`

### Type Scale (inline styles, not Tailwind)

| Use | Size | Weight | Letter-spacing |
|---|---|---|---|
| H1 hero | `clamp(52px, 7.5vw, 112px)` | 800 | -0.025em |
| H2 sections | `clamp(36px, 5vw, 72px)` | 700–800 | -0.02em |
| H3 cards | `clamp(20px, 2vw, 28px)` | 600–700 | -0.01em |
| Body | `clamp(16px, 1.4vw, 20px)` | 400 | normal |
| Caption | 11–13px | 400–500 | 0.10–0.18em (uppercase) |
| Micro-label | 9–11px | 500 | 0.22–0.28em (uppercase) |
| Section number | 10px | 600 | 0.28em |

### Line Heights
- Headings: 1.02 – 1.1
- Body: 1.5 – 1.70
- Tight layouts: 1.1 – 1.2

---

## Glassmorphism System

Three levels defined in `globals.css @layer utilities`:

```css
.glass-1  { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.09); }
.glass-2  { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.09);
            backdrop-filter: blur(20px); }
.glass-3  { background: rgba(255,255,255,0.09); border: 1px solid rgba(255,255,255,0.09);
            backdrop-filter: blur(28px); }
```

**CSS variables for inline use:**
```
--glass-1:            rgba(255,255,255,0.03)
--glass-border:       rgba(255,255,255,0.09)
--glass-border-hover: rgba(255,255,255,0.20)
```

---

## Animation System

**Library**: Framer Motion 11
**Trigger**: `useInView` hook for scroll-triggered animations

### Standard Variants

```js
// Container — staggers children
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
}

// "The Print" — H1 word-by-word entrance (Hero)
const wordVariants = {
  hidden: { opacity: 0, y: 36, rotateX: -22, filter: 'blur(3px)' },
  visible: { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)',
    transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] } },
}

// Standard fade + slide up
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
}

// Simple fade in
const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.60, ease: [0.25, 0.1, 0, 1] } },
}
```

### Easing Tokens
```
--ease-expo-out:  cubic-bezier(0.16, 1, 0.3, 1)      Main entrance
--ease-smooth:    cubic-bezier(0.4, 0, 0.2, 1)        Material-style
--ease-appear:    cubic-bezier(0.25, 0.1, 0, 1)        Subtle appear
--ease-spring:    cubic-bezier(0.34, 1.56, 0.64, 1)   Springy
```

### CSS Keyframe Animations (globals.css)
- `chromaBreathe` / `chromaBreatheAlt` — EnergyCore color volumes
- `energyPulse` — ring expand and fade
- `particleDrift` — upward particle drift
- `coreBreathe` — center singularity pulse
- `membraneShimmer` — glass ring opacity
- `nodeBlink` — data node accent blink
- `ring-spin-cw` / `ring-spin-ccw` — scanner ring rotation
- `flow-a` through `flow-h` — SVG path flow animations
- `logoMarkPulse` — logo glow pulse
- `animate-scroll-hint` — scroll indicator line drop
- `orbBreathe1/2/3` — chromatic background orbs

---

## Component Patterns

### GlowButton
```jsx
<GlowButton variant="primary" onClick={handler}>Label</GlowButton>
<GlowButton variant="secondary" href="#section">Label</GlowButton>
```
- Primary: amber/orange gradient with glow shadow
- Secondary: ghost border style

### SectionTag
```jsx
<SectionTag>CREATIVE DIRECTION · AI SYSTEMS · BRAND STRATEGY</SectionTag>
```
Small uppercase badge with left-dot indicator.

### LogoMark variants
```jsx
<LogoMark size={52} />                                    // Interactive, hover glow
<LogoMark watermark size={480} />                         // ~3% opacity, no interaction
<LogoMark size={140} displaySize="clamp(110px, 14vw, 175px)" />  // Hero sized
```
**Image path**: always `assetUrl('/logo.webp')` (handled internally by LogoMark)
**Aspect**: Container width = height × 2.1 (clips glow bleed at bottom)
**Object-position**: `top center` to crop the transparent bottom area

---

## Layout System

**Max content width**: 1440px (centered, `margin: 0 auto`)
**Horizontal padding**: `clamp(20px, 5vw, 80px)` on both sides
**Grid**: 12-column CSS Grid for hero, flex or 2-col for sections
**Section gap flow**: Controlled by `<SectionBridge>` component

### Hero grid columns
```css
.hero-left-col  { grid-column: 1 / 7; }    /* Text content */
.hero-right-col { grid-column: 7 / 13; }   /* EnergyCore visual */

@media (max-width: 1023px) {
  .hero-left-col  { grid-column: 1 / -1; text-align: center; align-items: center; }
  .hero-right-col { display: none !important; }
}
@media (max-width: 767px) {
  .hero-left-col { gap: 24px !important; }
}
```

### Work grid (12-col Tailwind)
```
Row 0: Featured — full 12 cols (left panel col-span-5, right visual col-span-7)
Row 1: [col-span-6 md:col-span-3] [col-span-6 md:col-span-3]
Row 2: [col-span-6 md:col-span-2] × 3
Row 3: [col-span-6 md:col-span-3] [col-span-6 md:col-span-3]
```

---

## Background Layer Stack

| Layer | Component | z-index |
|---|---|---|
| Bottom | ChromaticBackground | 0 |
| Above bg | GlobalAtmosphere | 0 |
| Content | Main div wrapper | 1 |
| Fixed nav | Header | 100 |
| Overlay | ProjectModal | 500 |
| Full overlay | CaseStudyModal | 600 |

---

## Responsive Breakpoints

| Name | Width | Notes |
|---|---|---|
| Mobile | < 768px | Single column, hero right hidden, smaller gaps |
| Tablet | 768–1023px | Hero right hidden, full-width layout |
| Desktop | ≥ 1024px | Full 12-col hero grid |
| Wide | ≥ 1440px | Content width caps at 1440px |

---

## Rules: Do and Don't

**DO:**
- Use CSS custom properties for all colors
- Use `clamp()` for responsive font sizes and spacing
- Use Framer Motion for all entrance animations
- Use `assetUrl()` for all image src values from public/
- Use `useInView` for scroll-triggered reveals
- Keep section hero height with `minHeight: 'min(100vh, 980px)'`

**DON'T:**
- Never hardcode hex colors in JSX — use CSS vars
- Never use root-absolute `/image.png` in `src={}` — use `assetUrl()`
- Never use `height: 100vh` alone — always add a max cap
- Never combine `alignItems: center` + fixed height + `overflow: hidden` — clips content
- Never import images without going through public/ and assetUrl()
