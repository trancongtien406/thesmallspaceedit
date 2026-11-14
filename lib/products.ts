// Products live in content/products/*.yaml (editable in /keystatic → "Products").
// They are generic product TYPES: no prices, ratings, stock status or "we tested it" claims.
// Features/pros/cons come from published product specifications and listing information (no hands-on testing).
// affiliateUrl must be a real Amazon Associates (SiteStripe) link; until set, cards show "Product link coming soon".
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import { BRAND } from './brand';
import { normImage } from './images';

export type Product = {
  id: string; name: string; description: string; image?: string; imageAlt?: string; badge?: string;
  features: string[]; pros: string[]; cons: string[]; check: string[]; affiliateUrl?: string;
  /** category slug from brand.json */
  category?: string;
  /** guide that covers this product type in depth (homepage CTA target) */
  guide?: string;
  /** 'illustrative' = AI-generated concept image (NOT the exact product); 'product' = rights-cleared image of the actual linked item */
  imageType?: 'illustrative' | 'product';
};

const DIR = path.join(process.cwd(), 'content', 'products');
let cache: Product[] | null = null;
export function getProducts(): Product[] {
  return (cache ??= fs.readdirSync(DIR).filter((f) => /\.ya?ml$/.test(f)).sort().map((f) => {
    const d = YAML.parse(fs.readFileSync(path.join(DIR, f), 'utf8')) ?? {};
    return {
      id: f.replace(/\.ya?ml$/, ''), name: d.name, description: d.description ?? '', image: normImage(d.image), imageAlt: d.imageAlt || undefined,
      badge: d.badge || undefined, features: d.features ?? [], pros: d.pros ?? [], cons: d.cons ?? [], check: d.check ?? [],
      affiliateUrl: d.affiliateUrl || undefined, category: d.category || undefined, guide: d.guide || undefined, imageType: d.imageType || 'illustrative',
    } satisfies Product;
  }));
}
export const getProduct = (id: string) => getProducts().find((p) => p.id === id);
// Homepage "Small Space Solutions" (brand.json homepageProducts)
export const getFavorites = () => BRAND.homepageProducts.map(getProduct).filter(Boolean) as Product[];
