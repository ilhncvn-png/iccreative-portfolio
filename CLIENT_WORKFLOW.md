# CLIENT_WORKFLOW.md — Adding Projects & Managing Portfolio

---

## How to Add a New Portfolio Project

This is the complete step-by-step process for adding any new project to the portfolio.

### Step 1: Prepare Images

1. Collect all project deliverable images
2. Rename them: `{slug}_001.jpg`, `{slug}_002.jpg`, etc.
3. Convert to WebP (recommended):
   ```python
   from PIL import Image
   import os
   
   folder = 'public/projects/newproject'
   os.makedirs(folder, exist_ok=True)
   
   for fname in sorted(os.listdir('source_images')):
       img = Image.open(f'source_images/{fname}')
       out = fname.replace('.jpg', '.webp').replace('.png', '.webp')
       img.save(f'{folder}/{out}', 'WEBP', quality=87)
       print(f'{fname} → {out}')
   ```
4. Place images in: `public/projects/{slug}/`
5. Recommended: 6–12 images per project. First image = cover (shown in Work grid).

**Cover image requirements:**
- Aspect ratio: wide (16:9 or 3:2 preferred)
- Shows the strongest, most recognizable visual from the project
- Will display as `loading="eager" fetchpriority="high"` if it's the featured project

---

### Step 2: Assign Visual Props (Work.jsx)

Open `src/components/sections/Work.jsx`.

Add entry to `PROJECT_VISUAL` array. Each project needs:

```js
{
  id: 'NN',                  // Next sequential ID (e.g., '09')
  year: '2025',              // Project year
  gradient: 'linear-gradient(145deg, rgba(R,G,B,0.22) 0%, rgba(R,G,B,0.30) 55%, rgba(1,3,16,0.92) 100%)',
  accent: 'rgba(R,G,B,0.22)',
  letter: 'X',              // First letter of project name
  span: 'col-span-6 md:col-span-3',  // See grid rules below
  height: '300px',          // Card height in grid
  accentColor: '#RRGGBB',   // Brand color hex for hover states
}
```

**Grid span rules** (rows sum to 12 on md+):
- Row of 2 cards: `md:col-span-6` each → but use `md:col-span-3` ... hmm, actually check current layout
- Row of 3 cards: `md:col-span-2` each
- Row of 2 cards: `md:col-span-3` each
- Featured (first item): no span needed — it's rendered as FeaturedCard separately

**Standard heights**:
- 3+3 row cards: `height: '300px'`
- 2+2+2 row cards: `height: '260px'`

**Gradient template** (adjust RGB values to match brand color):
```
linear-gradient(145deg, rgba(R,G,B,0.22) 0%, rgba(R/2,G/2,B/2,0.30) 55%, rgba(1,3,16,0.92) 100%)
```

---

### Step 3: Add Text Content (translation.json)

Add to **both** `src/locales/en/translation.json` AND `src/locales/tr/translation.json` under `work.projects[]`.

The order in the array must match the order in `PROJECT_VISUAL`.

```json
{
  "title": "Project Name",
  "category": "Brand Identity · Web Design · [other]",
  "headline": "Project Name — Descriptive Subtitle",
  "overview": "2-3 paragraphs about the project, client, brief...",
  "challenge": "What was the creative/strategic challenge?",
  "solution": "What was designed, how, what decisions were made...",
  "images": [
    "/projects/slug/slug_001.webp",
    "/projects/slug/slug_002.webp",
    "/projects/slug/slug_003.webp"
  ]
}
```

**IMPORTANT**: Image paths start with `/` — `assetUrl()` strips it at runtime.

---

### Step 4: Configure ART_DIRECTION (CaseStudyModal.jsx)

Open `src/components/ui/CaseStudyModal.jsx`.

Add entry to `ART_DIRECTION` object (keyed by project id string):

```js
'09': [
  {
    mode:       'cinematic',       // How the image is rendered
    layout:     'full-bleed',      // How it's laid out in the gallery
    focalPoint: 'center',          // Object-position for cropping
    label:      'WORDMARK',        // Uppercase section label
    caption:    'Primary brand mark on dark background',
  },
  // ... one entry per image
]
```

**Mode values:**
- `cinematic` — full-bleed, dramatic presentation
- `editorial` — standard inset editorial feel
- `full-bleed` — edge-to-edge image
- `document` — constrained width, shows as a contained image
- `portrait-focus` — optimized for portrait/tall images
- `auto` — default fallback

**Layout values:**
- `full-bleed` — image takes full gallery width
- `inset` — image with margins
- `split-left` — image left, text right
- `split-right` — image right, text left
- `editorial` — editorial magazine style

---

### Step 5: Update Section Count

The Work section header shows "08" as section number. If you want the section count to reflect the number of projects, update in `Work.jsx`:

```jsx
<span style={{ ... }}>09</span>  {/* update manually */}
```

(This is a design decision — it currently shows the section number in the page, not project count.)

---

### Step 6: Build and Verify

```bash
npm run build
npm run preview
# Open http://localhost:4173/iccreative-portfolio/
# Check: new project appears in Work grid
# Click project card → case study modal opens
# Verify all images load correctly
# Check both EN and TR language versions
```

---

### Step 7: Commit and Deploy

```bash
git add public/projects/newproject/ src/components/sections/Work.jsx src/components/ui/CaseStudyModal.jsx src/locales/en/translation.json src/locales/tr/translation.json
git commit -m "Add [Project Name] to portfolio"
git push
```

GitHub Actions auto-deploys in ~60 seconds.

---

## Removing a Project

1. Delete image folder: `rm -rf public/projects/{slug}/`
2. Remove entry from `PROJECT_VISUAL` in `Work.jsx`
3. Remove entry from `work.projects[]` in both translation.json files
4. Remove `ART_DIRECTION['id']` from `CaseStudyModal.jsx`
5. Renumber remaining project IDs if needed (renumber in Work.jsx AND translation.json)
6. Rebuild and push

---

## Reordering Projects

The first project in `PROJECT_VISUAL` is always the Featured Card (full-width, prominent).
The rest are grid cards.

To make a different project featured:
1. Move it to index 0 in `PROJECT_VISUAL`
2. Move corresponding translation object to index 0 in `work.projects[]`
3. The grid layout (3+3, 2+2+2, 3+3) applies to indices 1–7

---

## Case Study Quality Checklist

Before publishing a new case study:
- [ ] At least 4 images (ideal: 6–12)
- [ ] First image is the strongest visual (used as Work grid cover)
- [ ] overview field: explains the project brief and context (min 100 words)
- [ ] challenge field: the creative/strategic problem (min 50 words)
- [ ] solution field: what was created and key decisions (min 100 words)
- [ ] headline field: clear case study title (e.g., "iNeed — On-Demand Service Brand")
- [ ] category field: 2–3 disciplines separated by "·"
- [ ] Turkish translation present in tr/translation.json
- [ ] ART_DIRECTION configured for each image
- [ ] All images load correctly in preview
- [ ] Modal opens and closes without errors

---

## Contact Form Backend Options

Currently the Contact section has no form submission handler.

### Option A: Formspree (easiest, free tier 50 submissions/month)
```jsx
// In Contact.jsx
<form action="https://formspree.io/f/YOUR_CODE" method="POST">
  <input type="text" name="name" required />
  <input type="email" name="email" required />
  <textarea name="message" required></textarea>
  <input type="hidden" name="_subject" value="New project inquiry — iç creative" />
  <button type="submit">Send</button>
</form>
```

### Option B: EmailJS (client-side, no server, GitHub Pages compatible)
```bash
npm install @emailjs/browser
```
```jsx
import emailjs from '@emailjs/browser'

const handleSubmit = async (e) => {
  e.preventDefault()
  await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
  }, PUBLIC_KEY)
}
```

### Option C: Netlify Forms (if moving to Netlify hosting)
```html
<form name="contact" netlify netlify-honeypot="bot-field">
```
