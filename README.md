# The Small Space Edit

Small spaces. Smarter living. — Next.js (App Router) static site for small-space organization guides (US audience).

## Develop
```bash
npm install
npm run dev
```

## Build
```bash
npm run build   # all public pages are pre-rendered as static HTML; /keystatic + /api/keystatic are server routes
```

## Deploy (Vercel)
- Framework preset: **Next.js** (default build command and output directory). No `output: 'export'` (the CMS needs API routes); public pages are still static (SSG).
- Environment variables:
  - `NEXT_PUBLIC_SITE_URL` — canonical URL (default `https://thesmallspaceedit.vercel.app`)
  - `NEXT_PUBLIC_PINTEREST_DOMAIN_VERIFY` — Pinterest domain-claim code (renders `<meta name="p:domain_verify">`)

## TODO before launch
- Real contact email in `lib/site.ts`
- Amazon Associates links (`affiliateUrl`) in `lib/products.ts` — cards show "Product link coming soon" until set
- Connect the newsletter form to an email provider (`components/newsletter/NewsletterForm.tsx`)

## Admin / CMS (Keystatic) — `/admin` → `/keystatic`
Content is plain files in this repo; the admin edits them and commits to `main`, Vercel redeploys in ~1 minute.

| What | File(s) | Admin section |
|---|---|---|
| Guides (Markdown body, title, meta, hero image, categories, FAQ, pin) | `content/guides/*.md` | Guides |
| Products (name, description, features, pros/cons, image, Amazon link, category, badge) | `content/products/*.yaml` (+ images in `public/img/products/<id>/`) | Products |
| Brand & niche (name, slogan, SEO, colors, categories, hero, featured items) | `content/settings/brand.json` | Brand & niche settings |

Product box inside a guide body: `{% product name="Type name" why="One line" product="product-id" /%}` (the editor inserts it via **+ → Product box**).
The first box that references a product shows the full card; later ones and boxes without a product show a compact box.

**Local editing:** `npm run dev` → http://localhost:3000/keystatic (edits files on disk; commit + push yourself).
**Production (GitHub mode):** needs a GitHub App + 4 env vars in Vercel: `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`,
`KEYSTATIC_SECRET`, `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`. Until they are set, `/api/keystatic/*` answers 503 and the public site is unaffected.

Compliance is enforced in code, not in the CMS: Amazon disclosure sentence (`lib/site.ts`), no prices/ratings fields,
"Product link coming soon" until a valid amazon.com / amzn.to link is entered, "Illustrative image" label by default.

## New niche = clone + config
1. Clone/fork this repo into a new repo and import it in Vercel (Next.js preset).
2. Edit `content/settings/brand.json` (or the admin): name, slogan, SEO title/description, site URL, email, Pinterest, hero, colors, categories.
3. Replace `content/guides/*` and `content/products/*` (and images in `public/img`).
4. Update `REPO` in `keystatic.config.ts` and create a new GitHub App for the new repo/domain.
Legal pages (About, Privacy, Disclosure, How we choose) use the brand name automatically but their wording is niche-neutral-ish — review them.
