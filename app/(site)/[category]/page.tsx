// Category pages are generated from the categories in content/settings/brand.json.
import { notFound } from 'next/navigation';
import CategoryPage, { categoryMetadata } from '@/components/category/CategoryPage';
import { CATEGORIES, getCategory } from '@/lib/taxonomy';

export const dynamicParams = false;
export function generateStaticParams() { return CATEGORIES.map((c) => ({ category: c.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  return getCategory(category) ? categoryMetadata(category) : {};
}
export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!getCategory(category)) notFound();
  return <CategoryPage slug={category} />;
}
