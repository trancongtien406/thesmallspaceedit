import Link from 'next/link';
import ArticleCard from '@/components/article/ArticleCard';
import CategoryCard from '@/components/home/CategoryCard';
import { SolutionCard } from '@/components/product/ProductCard';
import NewsletterForm from '@/components/newsletter/NewsletterForm';
import SectionHeading from '@/components/ui/SectionHeading';
import Pic from '@/components/ui/Pic';
import { getFeaturedSlugs, getGuide, getGuides } from '@/lib/content';
import { CATEGORIES } from '@/lib/taxonomy';
import { getFavorites } from '@/lib/products';
import { BRAND } from '@/lib/brand';
import { SITE } from '@/lib/site';

export const metadata = { alternates: { canonical: '/' } };

export default function Home() {
  const FEATURED = getFeaturedSlugs();
  const FAVORITES = getFavorites();
  const H = BRAND.hero;
  const featured = FEATURED.map((s) => getGuide(s)!);
  const latest = getGuides().filter((g) => !FEATURED.includes(g.slug)).slice(0, 6);
  const ld = [
    { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE.name, url: SITE.url + '/', description: SITE.description },
    { '@context': 'https://schema.org', '@type': 'Organization', name: SITE.name, url: SITE.url + '/', logo: SITE.url + '/favicon.svg', sameAs: [SITE.pinterest] },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="hero"><div className="container hero-grid">
        <div>
          <div className="eyebrow">{H.eyebrow}</div>
          <h1 style={{ marginTop: 12 }}>{H.titleLine1}{H.titleLine2 && <><br />{H.titleLine2}</>}</h1>
          <p className="lead">{H.lead}</p>
          <Link className="btn btn-primary" href="/guides/">Explore Our Guides</Link>
          {H.trust?.length > 0 && <ul className="hero-trust">{H.trust.map((t) => <li key={t}>{t}</li>)}</ul>}
        </div>
        <div className="hero-img"><Pic src={H.image} alt={H.imageAlt} width={1024} height={768} priority sizes="(max-width: 1024px) 100vw, 600px" /></div>
      </div></section>

      <section className="section section-muted"><div className="container">
        <SectionHeading eyebrow="Explore by category" title="Find solutions for every room" />
        <div className="cat-grid reveal-group" data-stagger="65" data-stagger-max="260">{CATEGORIES.map((c) => <CategoryCard key={c.slug} c={c} />)}</div>
      </div></section>

      <section className="section"><div className="container">
        <SectionHeading eyebrow="Featured guides" title="Start here" href="/guides/" linkLabel="All guides" />
        <div className="featured-grid reveal-group" data-stagger="80" data-stagger-max="240">{featured.map((g, i) => <ArticleCard key={g.slug} g={g} priority={i === 0} />)}</div>
      </div></section>

      <section className="section section-muted"><div className="container">
        <SectionHeading eyebrow="Latest home guides" title="Fresh ideas for small spaces" href="/guides/" linkLabel="View all" />
        <div className="card-grid reveal-group" data-stagger="50" data-stagger-max="250">{latest.map((g) => <ArticleCard key={g.slug} g={g} />)}</div>
      </div></section>

      <section className="section"><div className="container">
        <SectionHeading eyebrow="Small space solutions" title="Small Space Solutions" intro="The product types we recommend most often. Each guide explains what to measure, the trade-offs, and how to choose." />
        <div className="product-grid three reveal-group" data-stagger="55" data-stagger-max="220">{FAVORITES.map((p, i) => <SolutionCard key={p.id} product={p} position={i + 1} />)}</div>
        <p className="section-note">Images are illustrative. Recommendations are based on product specifications and available product information. <Link href="/how-we-choose/">How we choose products</Link></p>
      </div></section>

      <section className="section" style={{ paddingTop: 0 }}><div className="container">
        <div className="inspo reveal">
          <div className="txt">
            <div className="eyebrow">As seen on Pinterest</div>
            <h2 style={{ margin: '10px 0 14px' }}>Make Every Inch Count</h2>
            <p>Before-and-afters, no-drill hacks and small-space finds — each pin leads to a full guide with measuring tips and the exact ideas it promises.</p>
            <Link className="btn btn-secondary" href="/guides/small-kitchen-storage-ideas/">Explore the Guide</Link>
          </div>
          <div className="pins">
            <Link href="/guides/small-kitchen-storage-ideas/"><img src="/img/tiny-kitchen-storage-ideas-before-after.jpg" alt="Pin: tiny kitchen before and after with 7 storage ideas" width={800} height={1200} loading="lazy" /></Link>
            <Link href="/guides/no-drill-bathroom-storage/"><img src="/img/no-drill-bathroom-storage-ideas.jpg" alt="Pin: no drilling, more storage, 5 tiny bathroom hacks" width={800} height={1200} loading="lazy" /></Link>
            <Link href="/guides/space-saving-amazon-finds/"><img src="/img/space-saving-amazon-finds.jpg" alt="Pin: flat lay of space-saving organizers for a tiny apartment" width={800} height={1200} loading="lazy" /></Link>
          </div>
        </div>
      </div></section>

      <section className="section" style={{ paddingTop: 0 }}><div className="container"><NewsletterForm /></div></section>
    </>
  );
}
