import Link from 'next/link';
import ArticleCard from '@/components/article/ArticleCard';
import CategoryCard from '@/components/home/CategoryCard';
import { SolutionCard } from '@/components/product/ProductCard';
import NewsletterForm from '@/components/newsletter/NewsletterForm';
import SectionHeading from '@/components/ui/SectionHeading';
import Pic from '@/components/ui/Pic';
import { FEATURED, getGuide, getGuides } from '@/lib/content';
import { CATEGORIES } from '@/lib/taxonomy';
import { FAVORITES } from '@/lib/products';
import { SITE } from '@/lib/site';

export const metadata = { alternates: { canonical: '/' } };

export default function Home() {
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
          <div className="eyebrow">Small-space living, made practical</div>
          <h1 style={{ marginTop: 12 }}>Small Spaces.<br />Smarter Living.</h1>
          <p className="lead">Thoughtful storage ideas, practical home finds, and renter-friendly inspiration to help you make the most of every inch.</p>
          <Link className="btn btn-primary" href="/guides/">Explore Our Guides</Link>
          <ul className="hero-trust"><li>Renter-friendly ideas</li><li>Measuring tips in every guide</li><li>No fake reviews</li></ul>
        </div>
        <div className="hero-img"><Pic src="/img/home-hero" alt="A bright, organized small apartment living room with a storage ottoman, floating shelves and a slim rolling cart" width={1024} height={768} priority sizes="(max-width: 1024px) 100vw, 600px" /></div>
      </div></section>

      <section className="section section-muted"><div className="container">
        <SectionHeading eyebrow="Explore by category" title="Find solutions for every room" />
        <div className="cat-grid">{CATEGORIES.map((c) => <CategoryCard key={c.slug} c={c} />)}</div>
      </div></section>

      <section className="section"><div className="container">
        <SectionHeading eyebrow="Featured guides" title="Start here" href="/guides/" linkLabel="All guides" />
        <div className="featured-grid">{featured.map((g, i) => <ArticleCard key={g.slug} g={g} priority={i === 0} />)}</div>
      </div></section>

      <section className="section section-muted"><div className="container">
        <SectionHeading eyebrow="Latest home guides" title="Fresh ideas for small spaces" href="/guides/" linkLabel="View all" />
        <div className="card-grid">{latest.map((g) => <ArticleCard key={g.slug} g={g} />)}</div>
      </div></section>

      <section className="section"><div className="container">
        <SectionHeading eyebrow="Small space solutions" title="Small Space Solutions" intro="The product types we recommend most often. Each guide explains what to measure, the trade-offs, and how to choose." />
        <div className="product-grid three">{FAVORITES.map((p, i) => <SolutionCard key={p.id} product={p} position={i + 1} />)}</div>
        <p className="section-note">Images are illustrative. Recommendations are based on product specifications and available product information. <Link href="/how-we-choose/">How we choose products</Link></p>
      </div></section>

      <section className="section" style={{ paddingTop: 0 }}><div className="container">
        <div className="inspo">
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
