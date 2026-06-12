# SEO_SYSTEM.md — iç creative SEO Architecture

---

## Overview

All SEO lives in `index.html` (static file, Vite copies it verbatim to dist/).
The site is a Single Page Application — there is only one HTML document. All structured data and meta describe the homepage, which is also the portfolio page.

**Current domain**: `https://ilhncvn-png.github.io/iccreative-portfolio/`
**Target domain** (when purchased): Update all URLs with sed command below.

---

## Meta Tags Implemented

### Primary SEO
```html
<title>İÇ Creative — Brand Identity Designer & Creative Director | Istanbul</title>
<meta name="description" content="Creative Director and Brand Identity Designer with 25+ years of experience. Brand identity systems, corporate identity, logo design, web design and AI-powered brand strategy — serving clients across Turkey, Germany and Europe." />
<meta name="author" content="İlhan Çevn" />
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
<meta name="keywords" content="Creative Director, Brand Designer, Brand Identity Designer, Corporate Identity Designer, Logo Designer, Brand Strategist, Web Designer, AI Branding Consultant, Visual Identity Designer, Creative Consultant, YouTube Brand Designer, Istanbul, Turkey, Germany, Europe" />
```

### Geo Targeting (Istanbul)
```html
<meta name="geo.region"    content="TR-34" />
<meta name="geo.placename" content="Istanbul, Turkey" />
<meta name="ICBM"          content="41.0082, 28.9784" />
```

### Open Graph
```html
<meta property="og:type"              content="website" />
<meta property="og:site_name"         content="iç creative" />
<meta property="og:url"               content="https://ilhncvn-png.github.io/iccreative-portfolio/" />
<meta property="og:title"             content="İÇ Creative — Brand Identity Designer & Creative Director" />
<meta property="og:description"       content="..." />
<meta property="og:image"             content="https://...og-image.jpg" />
<meta property="og:image:width"       content="1200" />
<meta property="og:image:height"      content="630" />
<meta property="og:locale"            content="en_US" />
<meta property="og:locale:alternate"  content="tr_TR" />
```

### Twitter Card
```html
<meta name="twitter:card"    content="summary_large_image" />
<meta name="twitter:site"    content="@ilhncvn" />
<meta name="twitter:creator" content="@ilhncvn" />
<meta name="twitter:image"   content="https://...og-image.jpg" />
```

### Canonical + hreflang
```html
<link rel="canonical"    href="https://ilhncvn-png.github.io/iccreative-portfolio/" />
<link rel="alternate" hreflang="en"        href="..." />
<link rel="alternate" hreflang="tr"        href="...?lang=tr" />
<link rel="alternate" hreflang="x-default" href="..." />
```

---

## JSON-LD Structured Data

Four schemas implemented as a single `<script type="application/ld+json">` array:

### 1. Person Schema
```json
{
  "@type": "Person",
  "name": "İlhan Çevn",
  "jobTitle": "Creative Director & Brand Identity Designer",
  "url": "https://...",
  "image": "https://.../og-image.jpg",
  "sameAs": ["https://x.com/ilhncvn"],
  "knowsAbout": ["Brand Identity Design", "Creative Direction", "AI Branding", ...]
}
```

### 2. ProfessionalService Schema
```json
{
  "@type": "ProfessionalService",
  "name": "iç creative",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "itemListElement": [8 services as Offer objects]
  }
}
```
8 services: Brand Identity Systems, Corporate Identity, Logo Design, Web Design, AI-powered Brand Production, Visual Identity Systems, YouTube Channel Brand Design, Creative Direction.

### 3. WebSite Schema (with SearchAction)
```json
{
  "@type": "WebSite",
  "url": "https://...",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "...?search={search_term_string}"
  }
}
```

### 4. ItemList Schema (Portfolio)
```json
{
  "@type": "ItemList",
  "name": "Brand Identity & Design Portfolio",
  "itemListElement": [8 portfolio projects as CreativeWork ListItems]
}
```
Each project: `@type: CreativeWork`, name, description, image.

---

## robots.txt

```
User-agent: *
Allow: /
Disallow: /src/
Disallow: /.vite/

Sitemap: https://ilhncvn-png.github.io/iccreative-portfolio/sitemap.xml
```

---

## sitemap.xml

Two URL entries: English (priority 1.0) and Turkish (?lang=tr, priority 0.9)
Each includes:
- `<loc>` — canonical URL
- `<lastmod>` — last modified date (update manually when content changes)
- `<changefreq>monthly`
- `<xhtml:link>` — hreflang alternates for en, tr, x-default
- `<image:image>` — OG image with title and caption

---

## Assets

| File | Size | Purpose |
|---|---|---|
| `public/og-image.jpg` | 116KB | Social share image (1200×630) |
| `public/apple-touch-icon.png` | — | iOS home screen (180×180) |
| `public/favicon.svg` | — | Vector favicon |
| `public/favicon-64.png` | — | PNG fallback 64×64 |
| `public/favicon-32.png` | — | PNG fallback 32×32 |
| `public/favicon-48.png` | — | PNG fallback 48×48 |

---

## Changing Domain (Command)

When a custom domain is configured, run this one command from project root:

```bash
NEW="https://yournewdomain.com"
OLD="https://ilhncvn-png.github.io/iccreative-portfolio"
sed -i '' "s|$OLD|$NEW|g" index.html public/robots.txt public/sitemap.xml
```

Then:
1. Update `vite.config.js`: `base: '/'` (instead of `/iccreative-portfolio/`)
2. Create `public/CNAME` with just: `yournewdomain.com`
3. `npm run build` → `git push`

---

## Adding Google Analytics

In `index.html` `<head>`, after existing meta tags:
```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## Adding Google Search Console Verification

In `index.html` `<head>`:
```html
<meta name="google-site-verification" content="VERIFICATION_CODE" />
```

---

## Target Keywords

**Primary (English)**:
- brand identity designer istanbul
- creative director turkey
- brand identity designer turkey
- logo designer istanbul
- corporate identity designer

**Primary (Turkish)**:
- marka kimliği tasarımcısı istanbul
- kurumsal kimlik tasarımı
- logo tasarımı istanbul
- kreatif direktör türkiye

**Secondary**:
- brand designer europe
- ai branding consultant
- youtube brand designer
- web designer istanbul

---

## SEO Health Checklist

Run this before every major deployment:

- [ ] Title tag under 60 characters
- [ ] Meta description 150–160 characters
- [ ] `og:image` is 1200×630, JPEG, under 200KB
- [ ] All canonical URLs match current domain
- [ ] sitemap.xml `<lastmod>` dates are current
- [ ] robots.txt Sitemap directive points to current domain
- [ ] JSON-LD validates at: https://search.google.com/test/rich-results
- [ ] hreflang URLs are accessible (EN and TR both return 200)
- [ ] No broken image references (og:image URL returns 200)
