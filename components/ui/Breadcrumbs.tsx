import Link from 'next/link';
import { SITE } from '@/lib/site';
export type Crumb = { name: string; href: string };
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const ld = { '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: SITE.url + c.href })) };
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ol>{items.map((c, i) => <li key={c.href}>{i < items.length - 1 ? <Link href={c.href}>{c.name}</Link> : <span aria-current="page">{c.name}</span>}</li>)}</ol>
    </nav>
  );
}
