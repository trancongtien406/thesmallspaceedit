import SearchClient from './SearchClient';
import { getGuides } from '@/lib/content';
import { getCategory } from '@/lib/taxonomy';
export const metadata = { title: 'Search Guides', description: 'Search all small space organization guides.', alternates: { canonical: '/search/' }, robots: { index: false, follow: true } };
export default function Search() {
  const items = getGuides().map((g) => ({ slug: g.slug, title: g.title, description: g.description, category: getCategory(g.primaryCategory)!.title }));
  return <div className="page"><h1>Search Guides</h1><SearchClient items={items} /></div>;
}
