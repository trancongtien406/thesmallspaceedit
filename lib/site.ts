// Site settings derived from the brand config (content/settings/brand.json). Edit that file (or /keystatic), not this one.
import { BRAND } from './brand';

// Amazon Associates required disclosure — exact wording, intentionally NOT editable in the CMS.
export const AMAZON_DISCLOSURE = 'As an Amazon Associate I earn from qualifying purchases.';

export const SITE = {
  name: BRAND.name,
  slogan: BRAND.slogan,
  tagline: BRAND.tagline,
  // NEXT_PUBLIC_SITE_URL (Vercel env) overrides brand.siteUrl, e.g. once a custom domain is connected
  url: (process.env.NEXT_PUBLIC_SITE_URL || BRAND.siteUrl || 'https://thesmallspaceedit.vercel.app').replace(/\/$/, ''),
  pinterest: BRAND.pinterestUrl,
  email: BRAND.email, // TODO: replace hello@example.com with the real contact email (brand.json / CMS)
  disclosure: AMAZON_DISCLOSURE,
  description: BRAND.description,
  author: BRAND.author || BRAND.name,
  // Pinterest domain claim: <meta name="p:domain_verify">. Env var overrides the brand.json value.
  pinterestVerify: process.env.NEXT_PUBLIC_PINTEREST_DOMAIN_VERIFY || BRAND.pinterestVerify || '',
};
