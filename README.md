# VR Exhibits — website

Single-page marketing site for VR Exhibits: exhibition stand design and fabrication, event experiences, retail environments, signage and experiential marketing.

Built with **React 18 + Vite 5 + Tailwind CSS 3**. No UI libraries, no animation libraries.

---

## Admin portal

A password-protected admin portal lives at **/admin**. Setup (one time, no coding) is explained step by step in **ADMIN-SETUP-GUIDE.md**. It runs on Netlify Functions + Netlify Blobs (`netlify/`), and publishing triggers a rebuild via `BUILD_HOOK_URL`; `scripts/fetch-content.mjs` pulls the saved content into each build.

Required Netlify environment variables: `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `BUILD_HOOK_URL`.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
npm run preview    # serve the production build locally
```

Requires Node 18+.

---

## Folder structure

```
vr-exhibits/
├── index.html                  SEO meta, Open Graph, JSON-LD, font loading
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   └── generate-placeholders.py   Regenerates the placeholder renders
├── src/
│   ├── main.jsx
│   ├── App.jsx                 Page assembly + skip link
│   ├── index.css               Tailwind layers, focus styles, reveal, blueprint grid
│   ├── data/
│   │   └── site.js             ALL editable content lives here
│   ├── assets/images/          Placeholder renders (SVG) — swap for real photos
│   ├── hooks/
│   │   ├── useInView.js        IntersectionObserver hook
│   │   ├── useCountUp.js       Animated statistics
│   │   └── useReducedMotion.js
│   ├── lib/
│   │   ├── cx.js               className helper
│   │   └── submitEnquiry.js    Form submission (wire your endpoint here)
│   └── components/
│       ├── layout/
│       │   ├── Navbar.jsx      Sticky nav + full-screen mobile menu
│       │   └── Footer.jsx
│       ├── sections/
│       │   ├── Hero.jsx
│       │   ├── BrandStatement.jsx
│       │   ├── Showcase.jsx       Full-bleed cinematic image band
│       │   ├── Capabilities.jsx   Numbered accordion + sticky preview image
│       │   ├── Process.jsx
│       │   ├── FeaturedWork.jsx   Asymmetric grid, filters, view all
│       │   ├── Impact.jsx
│       │   ├── Clients.jsx
│       │   └── Contact.jsx        Validated enquiry form + success state
│       └── ui/
│           ├── Button.jsx
│           ├── Reveal.jsx
│           ├── SmartImage.jsx     Lazy, responsive <img>
│           ├── DimensionLine.jsx  Architectural dimension marker
│           ├── Logo.jsx
│           └── ClientMark.jsx     Placeholder client logos
├── tailwind.config.js          Design tokens
├── postcss.config.js
└── vite.config.js
```

---

## Design system

### Colour

| Token | Hex | Use |
|---|---|---|
| `royal` | `#123B70` | Structure, navigation, major backgrounds (process, footer, contact panel) |
| `royal-700` | `#0D2D57` | Depth panels on blue backgrounds |
| `royal-50` | `#E8EEF6` | Input focus tint |
| `burgundy` | `#741F3D` | Primary buttons, active states, hover accents, the impact band |
| `burgundy-800` | `#5C1830` | Primary button hover |
| `navy` | `#10243E` | Body text and headlines |
| `cool` | `#F5F7FA` | Alternating light sections |
| `white` | `#FFFFFF` | Default section background |

Burgundy is deliberately rationed: one primary action per view, active filters/accordion items, and the single full-bleed impact band.

### Typography

Apple-style system typography. On iPhone, iPad and Mac the site uses Apple's own **San Francisco** font; everywhere else it uses self-hosted **Inter**, the closest open match. Headlines are semibold (600) with tight tracking; body text is 17px, Apple's standard reading size.

| Role | Size | Weight |
|---|---|---|
| Hero statement | `clamp(2.5rem, 6.4vw, 5.75rem)`, centered | 600 |
| Contact headline | `clamp(2.75rem, 8vw, 6.5rem)`, brand gradient | 600 |
| Section heading | `clamp(2.25rem, 5vw, 4rem)`, centered | 600 |
| Card titles | 21–28px | 600 |
| Body | 17px (15px secondary, 13px captions) | 400–500 |

### Layout (Apple-inspired)

- Centered section headings with a short supporting line underneath.
- Rounded "bento" cards (28–36px corners) on a light grey (`cool`) background.
- Pill-shaped buttons; burgundy is kept for the main action.
- Frosted-glass navigation bar: dark over the hero image, light everywhere else.
- Large rounded, inset image panels for photography.
- Form fields are rounded input boxes with a soft focus ring.

### Motion

- One orchestrated load sequence in the hero (full-bleed image settles from a slow zoom, text rises, accents slide in).
- The full-width image band settles from a gentle zoom when scrolled into view.
- A single fade-up per section element on first scroll into view.
- Everything else responds to the visitor: accordion, filters, hover reveals, form states.
- `prefers-reduced-motion` disables all animation and count-ups show final values immediately.

---

## Editing content

Open **`src/data/site.js`**. Every section reads from it.

| What | Where in `site.js` |
|---|---|
| Phone, email, WhatsApp, hours, social links | `company` |
| Offices (address, map link, local contact) | `company.offices` |
| Menu items | `navigation` |
| Hero statement, intro, buttons, image | `hero` |
| About section text and facts | `brand` |
| Full-width image band | `showcase` |
| The five capabilities | `capabilities` |
| Process steps | `process` |
| Projects and filters | `projects`, `workFilters`, `workInitialCount` |
| Statistics | `impact` |
| Client logos | `clients` |
| Form options and messages | `contact` |

### Before launch — replace every placeholder

- [ ] `company.social`: paste full profile URLs (empty entries are hidden, and the row disappears if all are empty)
- [ ] `impact.stats`: the statistics section is **hidden** until you enter verified figures and set `impact.isPlaceholder = false`
- [ ] `projects`: real project names, industries, locations, years and images
- [ ] `clients.logos`: add more client names as you win work (4 or fewer use equal tiles; more than 6 switch to the irregular grid)
- [ ] Check claims in `brand` and `capabilities` (e.g. in-house workshop, reply time) match how the studio actually works
- [ ] `index.html`: canonical URL, Open Graph image, JSON-LD contact details
- [ ] `public/sitemap.xml` and `robots.txt`: real domain
- [ ] Add a 1200×630 `public/og-image.png`
- [ ] Activate the enquiry form (see Enquiry emails below)

### Adding a project

```js
import p09 from '../assets/images/my-project.jpg';

{
  id: 'unique-id',
  name: 'Project name',
  industry: 'Automotive',
  location: 'Mumbai',
  year: 2026,
  service: 'Exhibition',   // must match a value in workFilters
  layout: 'side',          // feature | side | tall | wide | broad
  href: '/work/unique-id', // or '#contact'
  image: { src: p09, alt: 'Describe what is in the photo' },
}
```

Layout sizes on desktop (12 columns): `full` 12 cols × 2 rows (cinematic lead project), `feature` 7 cols × 2 rows, `side` 5 cols, `tall` 4 cols × 2 rows, `wide` 8 cols, `broad` 7 cols. The grid uses dense packing, so mixed orders still fill gaps; the default order of the first six fills the grid exactly.

### Replacing images

Drop photos into `src/assets/images/`, import them in `site.js`, and update `alt` text. For best performance, export each photo at two or three widths (WebP or AVIF) and pass them to `SmartImage`:

```jsx
<SmartImage
  src={hall1600}
  srcSet={`${hall800} 800w, ${hall1600} 1600w, ${hall2400} 2400w`}
  sizes="(min-width: 1024px) 50vw, 100vw"
  alt="…"
/>
```

Full-bleed images (hero, image band, lead project) look best at 2400px wide or more. All images except the hero are `loading="lazy"` with explicit width and height to prevent layout shift. The hero image is loaded eagerly.

To regenerate or restyle the placeholder renders: `npm run placeholders` (needs Python 3).

### Real client logos

```js
import acme from '../assets/logos/acme.svg';
{ name: 'Acme', logo: acme }
```

`ClientMark` renders the image instead of the placeholder mark when `logo` is set.

---

## Enquiry emails

Enquiries are delivered by email to **every address in `enquiryDelivery.recipients`** in `src/data/site.js` (currently onlystall@gmail.com). Sending uses [FormSubmit](https://formsubmit.co), a free service that needs no server or account.

**One-time activation (required):**

1. Deploy the site and submit the enquiry form once yourself.
2. FormSubmit sends an activation email to the **first** recipient (onlystall@gmail.com). Check spam if it doesn't arrive.
3. Click **Activate Form**. Every enquiry after that arrives in every recipient inbox, with the client's email set as the reply-to address.
4. Optional: the activation email also gives you a random alias. Paste it into `enquiryDelivery.formsubmitAlias` to hide the Gmail address from the page source.

**"Email us" links:** every email link on the site (contact panel, footer, mobile menu) opens one new email addressed to all addresses in `company.emails`.

To add or remove a recipient, edit both lists in `site.js`.

**Preview build:** `npx vite build --mode demo` simulates sending (used for the hosted preview, whose host blocks outside requests). A normal `npm run build` sends real emails.

Validation rules (in `Contact.jsx`, `validate()`): name ≥ 2 characters, company required, valid email, optional phone with 7–15 digits, project type and budget required. Project details (message) is optional; empty messages arrive as "Not given". A hidden honeypot field (`website`) filters simple bots.

## Accessibility

- Semantic landmarks: `header`, `nav`, `main`, `section` with `aria-labelledby`, `footer`
- One `h1`; sections use `h2`; items use `h3`
- Skip link to main content
- Visible focus rings on every interactive element (burgundy on light, white on dark)
- Capabilities accordion: buttons with `aria-expanded` / `aria-controls`; collapsed panels are `inert`
- Filters use `aria-pressed`; result count announced with `aria-live`
- Project info is revealed on hover **and** keyboard focus, and is always visible on touch devices
- Form: labels on every field, `aria-invalid`, `aria-describedby` error messages, focus moves to the first invalid field, success message is announced and focused
- Mobile menu: Escape closes, focus moves into the menu on open
- Animated statistics expose the final value to screen readers
- Reduced motion respected throughout

---

## Deployment

`npm run build` outputs a static site to `dist/`. Deploy to Vercel, Netlify, Cloudflare Pages, S3 or any static host. No server needed unless you add one for the form.

---

## Originality note

The layout, copy, components and all placeholder visuals in this project were created for VR Exhibits. No text, images, code, layout or branding were taken from any reference website.
