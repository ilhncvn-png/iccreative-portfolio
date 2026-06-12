# iç creative — Portfolio

Premium lead-gen portfolio for İlhan Çevn. Built with React 18, Vite 6, Tailwind CSS 3.4 and Framer Motion 11. Bilingual (EN / TR) via react-i18next.

---

## Tech Stack

| Layer | Library |
|---|---|
| UI | React 18 + Vite 6 |
| Styling | Tailwind CSS 3.4 (JIT) |
| Animation | Framer Motion 11 |
| i18n | react-i18next |
| Font | Space Grotesk (Google Fonts) |

---

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Production Build

```bash
npm run build
npm run preview   # preview at http://localhost:4173
```

---

## GitHub Pages Deployment

This project is configured for automated deployment via GitHub Actions.  
Every push to `main` triggers a build and deploys the `dist/` folder to GitHub Pages.

### First-time setup

**1. Create the GitHub repository**

Go to [github.com/new](https://github.com/new) and create a new **public** repository.  
Name it `iccreative-portfolio` (or any name you prefer).

**2. Push the project**

Run these commands from the project root:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your GitHub username and the repo name you chose.

**3. Enable GitHub Pages**

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save

The first deployment will start automatically when you push. Subsequent pushes to `main` auto-deploy.

**4. Add your custom domain (if applicable)**

1. In **Settings → Pages → Custom domain**, enter `iccreative.studio`
2. Click **Save** — GitHub will verify the domain
3. Check **Enforce HTTPS** once the SSL certificate is issued (~10 minutes)

The `CNAME` file in `public/` is already configured. No further changes needed.

---

## Custom Domain DNS Setup

At your domain registrar, add these DNS records:

| Type | Name | Value |
|---|---|---|
| `A` | `@` | `185.199.108.153` |
| `A` | `@` | `185.199.109.153` |
| `A` | `@` | `185.199.110.153` |
| `A` | `@` | `185.199.111.153` |
| `CNAME` | `www` | `YOUR_USERNAME.github.io` |

DNS propagation takes up to 24 hours. HTTPS is issued automatically by GitHub via Let's Encrypt.

---

## Deploying Without a Custom Domain

If you do **not** have a custom domain, the site will be served at:

```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

Before deploying, update `vite.config.js`:

```js
base: '/YOUR_REPO_NAME/',
```

Also update the domain placeholder in three files:
- `index.html` — canonical, hreflang, og:url, JSON-LD
- `public/robots.txt` — Sitemap URL
- `public/sitemap.xml` — all `<loc>` entries

Replace `https://iccreative.studio` with `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`.

And remove or empty the `public/CNAME` file.

---

## Updating the Site After Deployment

```bash
# Make your changes, then:
git add .
git commit -m "Your change description"
git push
```

GitHub Actions will automatically build and deploy. Deployment takes ~60 seconds.

---

## Project Structure

```
/
├── public/
│   ├── CNAME                  # Custom domain
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── og-image.jpg           # Social share image (1200×630)
│   ├── apple-touch-icon.png   # iOS home screen icon
│   ├── favicon.svg
│   └── projects/              # Portfolio images (WebP)
│       ├── ineed/
│       ├── chargenest/
│       ├── evercraft/
│       ├── cata/
│       ├── ineedhome/
│       ├── dreamcloud/
│       ├── beyondmidnightwaves/
│       └── minimelodysong/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   ├── sections/
│   │   └── ui/
│   ├── context/
│   ├── locales/
│   │   ├── en/translation.json
│   │   └── tr/translation.json
│   └── main.jsx
├── index.html
├── vite.config.js
└── .github/
    └── workflows/
        └── deploy.yml         # Auto-deploy on push to main
```

---

## Before Going Live — Checklist

- [ ] Replace `https://iccreative.studio` with your live domain everywhere
- [ ] Verify `public/CNAME` contains exactly your domain (no `https://`)
- [ ] Confirm DNS A records are pointing to GitHub Pages IPs
- [ ] Test `npm run build && npm run preview` locally
- [ ] Validate structured data at [search.google.com/test/rich-results](https://search.google.com/test/rich-results)
- [ ] Submit sitemap at [search.google.com/search-console](https://search.google.com/search-console)

---

## License

All rights reserved. © 2025 iç creative.
