import CategoryPage, { categoryMetadata } from '@/components/category/CategoryPage';
export const metadata = categoryMetadata('small-kitchen');
export default function Page() { return <CategoryPage slug="small-kitchen" />; }
