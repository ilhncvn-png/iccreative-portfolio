# NEXT_STEPS.md — iç creative Portfolio

Last updated: 2026-06-12

---

## Immediate Next Actions (Do These First)

### 1. Connect Contact Form
The contact section exists but form submissions don't go anywhere.

**Option A — Formspree (simplest, free tier):**
```
1. Create account at formspree.io
2. Create a new form → get endpoint URL
3. In Contact.jsx: <form action="https://formspree.io/f/YOURCODE" method="POST">
4. Add honeypot field for spam protection
```

**Option B — EmailJS (no backend, works with GitHub Pages):**
```
1. emailjs.com → create account + email service + template
2. npm install @emailjs/browser
3. Call emailjs.send(serviceId, templateId, params, publicKey) on submit
```

### 2. Google Search Console + Analytics
```
1. Google Search Console: add property https://ilhncvn-png.github.io/iccreative-portfolio/
2. Verify via HTML tag (add to index.html <head>)
3. Submit sitemap: https://ilhncvn-png.github.io/iccreative-portfolio/sitemap.xml
4. Google Analytics 4: create property → get G-XXXXXXXX tag
5. Add to index.html: <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX">
```

### 3. Custom Domain Setup
When ready to move from GitHub Pages subdomain to custom domain:
```
1. Buy domain (e.g., iccreative.studio or ilhancevn.com)
2. In vite.config.js: change base: '/' 
3. Create public/CNAME with just: yourdomain.com
4. Add DNS A records:
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
5. Add CNAME: www → ilhncvn-png.github.io
6. Run: sed -i '' 's|ilhncvn-png.github.io/iccreative-portfolio|yourdomain.com|g' index.html public/robots.txt public/sitemap.xml
7. Update JSON-LD @id values in index.html
8. Enable HTTPS in GitHub Pages settings after DNS propagates
```

---

## Future Improvements

### Performance
- [ ] Convert `ineed_002.jpg` through `ineed_007.jpg` to WebP (will reduce ~300KB)
- [ ] Add `<link rel="preload">` for first portfolio project image
- [ ] Run `npm run build && npm run preview` + Chrome Lighthouse audit
- [ ] Target: LCP < 2.5s, CLS < 0.1, FID < 100ms, Lighthouse 90+
- [ ] Consider adding a `<noscript>` fallback message

### UX
- [ ] Custom 404 page: create `public/404.html` mirroring site style
- [ ] "Back to top" button (appears after scrolling past hero)
- [ ] Mobile hamburger menu — test and verify on iPhone SE (375px)
- [ ] Keyboard navigation audit through all modals
- [ ] Add `prefers-reduced-motion` check for all Framer Motion animations:
  ```js
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ```

### Content
- [ ] Add new portfolio projects as they're completed
  - See CLIENT_WORKFLOW.md for exact steps
- [ ] Consider adding: Testimonials section after Work
- [ ] Consider adding: a short video reel (embed Vimeo/YouTube)
- [ ] Consider adding: "Currently available for projects" status badge in header
- [ ] LinkedIn URL: add to Contact section and header
- [ ] Case study texts: expand overview/challenge/solution for each project
- [ ] Add project URLs / live site links where applicable

### Design
- [ ] Scroll-progress indicator (thin line at top of viewport)
- [ ] Cursor custom style (optional — dot follower matches brand)
- [ ] Section transitions: consider parallax for SectionBridge elements
- [ ] Portfolio grid hover: currently shows letter fallback — could add project preview video

---

## SEO Tasks

### Immediate
- [ ] Register with Google Search Console
- [ ] Submit sitemap.xml
- [ ] Set up Google Analytics 4
- [ ] Add GA4 gtag to `index.html`

### When Custom Domain is Live
- [ ] Update canonical URL in `index.html`
- [ ] Update all `og:url` and `og:image` URLs
- [ ] Update JSON-LD `@id`, `url`, `image` fields
- [ ] Update `robots.txt` Sitemap directive
- [ ] Update `sitemap.xml` all `<loc>` entries
- [ ] Re-submit sitemap to Google Search Console with new domain
- [ ] Request indexing for homepage

### Ongoing
- [ ] Add blog/articles section (boosts organic search)
- [ ] Target keywords: "brand identity designer Istanbul", "marka kimliği tasarımcısı", "creative director Turkey"
- [ ] Build backlinks: LinkedIn posts, Behance, Dribbble portfolio links pointing to site
- [ ] Add FAQ structured data to Contact section (JSON-LD FAQPage schema)
- [ ] Add structured data for each case study (CreativeWork schema on individual pages — needs routing)

---

## Marketing Tasks

### Immediate Launch
- [ ] Share live URL on LinkedIn with project showcase
- [ ] Share on Behance — add portfolio link
- [ ] Share on Dribbble — add portfolio link
- [ ] Share on Twitter/X (@ilhncvn)
- [ ] Add website URL to all social media bios

### Ongoing
- [ ] Monthly: update `<lastmod>` in sitemap.xml when content changes
- [ ] Add new project case studies as work is completed
- [ ] Write 1-2 paragraph project descriptions for each case study (currently good, can expand)
- [ ] Consider Instagram stories/reels showing the portfolio

---

## Deployment Tasks

### Routine
- After any content change: `git add . && git commit -m "description" && git push`
- Check Actions tab for green checkmark: https://github.com/ilhncvn-png/iccreative-portfolio/actions
- Wait ~60 seconds after push for deployment

### Adding a New Project (full checklist)
See CLIENT_WORKFLOW.md for complete steps.
Short version:
1. Add images to `public/projects/newproject/`
2. Add project to `PROJECT_VISUAL` array in `Work.jsx` (id, year, gradient, accent, letter, span, height, accentColor)
3. Add project text to both `en/translation.json` and `tr/translation.json`
4. Add `ART_DIRECTION['id']` config in `CaseStudyModal.jsx`
5. `npm run build` → verify locally → `git push`
