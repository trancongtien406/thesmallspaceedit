// ONE config file per niche: content/settings/brand.json (editable in /keystatic → "Brand & niche settings").
// New niche = clone repo, edit brand.json (name, colors, categories, hero…), replace content/guides + content/products.
import brand from '@/content/settings/brand.json';

export type BrandCategory = { slug: string; title: string; short: string; h1: string; description: string; image: string; imageAlt: string };
export type Brand = {
  name: string; slogan: string; seoTitle: string; tagline: string; description: string; siteUrl: string; email: string; author: string;
  pinterestUrl: string; pinterestVerify: string;
  hero: { eyebrow: string; titleLine1: string; titleLine2: string; lead: string; image: string; imageAlt: string; trust: string[] };
  colors: Record<string, string>;
  categories: BrandCategory[]; featuredGuides: string[]; homepageProducts: string[];
};
export const BRAND = brand as Brand;

// brand.json color keys -> CSS custom properties in app/globals.css
const CSS_VARS: Record<string, string> = {
  background: '--background', surface: '--surface', surfaceMuted: '--surface-muted', cream: '--cream', sand: '--sand', sage: '--sage',
  sageLight: '--sage-light', terracotta: '--terracotta', forest: '--forest', forestLight: '--forest-light', forestDark: '--forest-dark',
  textPrimary: '--text-primary', textSecondary: '--text-secondary', border: '--border',
};
const HEX = /^#[0-9a-fA-F]{3,8}$/;
export function brandCssVars(): string {
  const decl = Object.entries(BRAND.colors ?? {}).filter(([k, v]) => CSS_VARS[k] && HEX.test(v)).map(([k, v]) => `${CSS_VARS[k]}:${v}`).join(';');
  return decl ? `:root{${decl}}` : '';
}
