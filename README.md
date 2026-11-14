# The Small Space Edit

Small spaces. Smarter living. — Next.js (App Router) static site for small-space organization guides (US audience).

## Develop
```bash
npm install
npm run dev
```

## Build
```bash
npm run build   # static export to ./out
```

## Deploy (Vercel)
- Framework preset: **Next.js** (default build command `npm run build`). `output: 'export'` produces a static site.
- Environment variables:
  - `NEXT_PUBLIC_SITE_URL` — canonical URL (default `https://thesmallspaceedit.vercel.app`)
  - `NEXT_PUBLIC_PINTEREST_DOMAIN_VERIFY` — Pinterest domain-claim code (renders `<meta name="p:domain_verify">`)

## TODO before launch
- Real contact email in `lib/site.ts`
- Amazon Associates links (`affiliateUrl`) in `lib/products.ts` — cards show "Product link coming soon" until set
- Connect the newsletter form to an email provider (`components/newsletter/NewsletterForm.tsx`)
