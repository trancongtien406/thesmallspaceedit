import ArticleCard from '@/components/article/ArticleCard';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import SectionHeading from '@/components/ui/SectionHeading';
import Link from 'next/link';
import { getGuides } from '@/lib/content';
import { CATEGORIES } from '@/lib/taxonomy';
export const metadata = {
  title: 'All Small Space Organization Guides',
  description: 'Every guide from The Small Space Edit: small kitchen storage, no-drill bathroom ideas, closets, rolling carts, vacuum bags, shelf risers and renter-friendly hacks.',
  alternates: { canonical: '/guides/' },
};
export default function Guides() {
  return (
    <section className="section" style={{ paddingTop: 24 }}><div className="container">
      <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Guides', href: '/guides/' }]} />
      <SectionHeading as="h1" title="All Guides" intro="Practical, renter-friendly guides for organizing small apartments — with measuring tips in every one." />
      <div className="pill-row" style={{ marginBottom: 28 }}>{CATEGORIES.map((c) => <Link key={c.slug} className="pill" href={`/${c.slug}/`}>{c.title}</Link>)}</div>
      <div className="card-grid">{getGuides().map((g, i) => <ArticleCard key={g.slug} g={g} priority={i < 3} />)}</div>
    </div></section>
  );
}
