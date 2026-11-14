import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ArticleCard from '@/components/article/ArticleCard';
import AffiliateDisclosure from '@/components/article/AffiliateDisclosure';
import FAQAccordion from '@/components/article/FAQAccordion';
import TableOfContents, { TocMobile } from '@/components/article/TableOfContents';
import ProductCard, { ImageLabel } from '@/components/product/ProductCard';
import Link from 'next/link';
import NewsletterForm from '@/components/newsletter/NewsletterForm';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { getGuide, getGuides } from '@/lib/content';
import Pic from '@/components/ui/Pic';
import { getCategory } from '@/lib/taxonomy';
import { SITE } from '@/lib/site';

export const dynamicParams = false;
export function generateStaticParams() { return getGuides().map((g) => ({ slug: g.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const g = getGuide((await params).slug);
  if (!g) return {};
  return {
    title: g.title, description: g.description, alternates: { canonical: `/guides/${g.slug}/` },
    openGraph: { type: 'article', title: g.title, description: g.description, url: `/guides/${g.slug}/`, siteName: SITE.name,
      publishedTime: g.publishedAt, modifiedTime: g.updatedAt,
      images: [{ url: g.ogImage, width: 1200, height: 630, alt: g.imagealt }, { url: `${g.image}.jpg`, width: 800, height: 1200, alt: g.imagealt }] },
    twitter: { card: 'summary_large_image', title: g.title, description: g.description, images: [g.ogImage] },
  };
}

const fmt = (d: string) => new Date(d + 'T12:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();
  const cat = getCategory(g.primaryCategory)!;
  const all = getGuides();
  const sameCat = all.filter((x) => x.slug !== slug && x.categories.some((c) => g.categories.includes(c)));
  const rel = [...sameCat, ...all.filter((x) => x.slug !== slug && !sameCat.includes(x))].slice(0, 3);
  const pin = g.pin;
  // Review P0 #4: surface the main recommendation right after intro + TOC (anchor link, not an affiliate CTA)
  const richProducts = g.blocks.flatMap((b) => (b.type === 'product' && b.product.features.length ? [b.product] : []));
  const pick = richProducts.find((p) => p.badge === "Editor's Pick") ?? richProducts[0];
  const toc = [...g.toc, ...(g.faqs.length ? [{ id: 'faq', text: 'Frequently Asked Questions' }] : [])];
  const ld = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: g.title, description: g.description,
    image: [SITE.url + g.ogImage, `${SITE.url}${g.image}.jpg`], datePublished: g.publishedAt, dateModified: g.updatedAt,
    author: { '@type': 'Organization', name: SITE.name, url: SITE.url + '/about/' }, publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url + '/' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE.url}/guides/${slug}/` } };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <header className="article-head">
        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: cat.title, href: `/${cat.slug}/` }, { name: g.title.split(':')[0], href: `/guides/${slug}/` }]} />
        <h1>{g.title}</h1>
        <p className="intro">{g.subtitle ?? g.description}</p>
        <div className="article-meta">
          <span>By <Link href="/about/">{g.author}</Link></span>
          <span>Published <time dateTime={g.publishedAt}>{fmt(g.publishedAt)}</time></span>
          {g.updatedAt !== g.publishedAt && <span>Updated <time dateTime={g.updatedAt}>{fmt(g.updatedAt)}</time></span>}
          <span>{g.readingTime} min read</span>
        </div>
      </header>
      <div className="article-hero"><Pic src={g.heroImage} alt={g.imagealt} width={1152} height={768} priority sizes="(max-width: 1040px) 100vw, 1000px" /><ImageLabel /></div>
      <AffiliateDisclosure />
      <div className="article-layout">
        <article className="prose">
          <TocMobile items={toc} />
          {pick && (
            <a className="quick-pick" href={`#pick-${pick.id}`}>
              {pick.image && <Pic src={pick.image} alt="" width={96} height={96} />}
              <span className="qp-body">
                <span className="qp-label">{pick.badge === "Editor's Pick" ? "Editor's Pick" : 'Top pick in this guide'}</span>
                <strong>{pick.name}</strong>
                <span className="qp-desc">{pick.description}</span>
                <span className="qp-link">See details, fit tips and trade-offs ↓</span>
              </span>
            </a>
          )}
          {g.blocks.map((b, i) => b.type === 'html'
            ? <div key={i} dangerouslySetInnerHTML={{ __html: b.html }} />
            : <ProductCard key={i} product={b.product} position={b.position} articleSlug={slug} />)}
          {pin ? (pin.type === 'video'
            ? <figure><video controls muted playsInline preload="none" poster={pin.poster} width={800} height={1422}><source src={pin.src} type="video/mp4" /></video><figcaption>{pin.alt}</figcaption></figure>
            : <figure><img src={pin.src} alt={pin.alt} width={800} height={1200} loading="lazy" data-pin-description={g.title} /><figcaption>Save this guide to Pinterest for later.</figcaption></figure>)
            : <figure><Pic src={g.image} alt={g.imagealt} width={800} height={1200} /><figcaption>Save this guide to Pinterest for later.</figcaption></figure>}
          <FAQAccordion items={g.faqs} />
        </article>
        <aside className="sidebar" aria-label="Guide navigation">
          <div className="sidebar-inner"><TableOfContents items={toc} /><NewsletterForm variant="small" id="newsletter-sidebar" /></div>
        </aside>
      </div>
      <section className="section"><div className="container">
        <h2 style={{ marginBottom: 24 }}>Related Articles</h2>
        <div className="card-grid reveal-group" data-stagger="50" data-stagger-max="250">{rel.map((x) => <ArticleCard key={x.slug} g={x} />)}</div>
      </div></section>
      <section className="container"><NewsletterForm /></section>
    </>
  );
}
