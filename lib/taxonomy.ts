// Categories come from the brand config (content/settings/brand.json). Safe for client components (no fs).
import { BRAND, type BrandCategory } from './brand';
export type Category = BrandCategory;
export const CATEGORIES: Category[] = BRAND.categories;
export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
