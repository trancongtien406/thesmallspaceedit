import Link from 'next/link';
import type { Metadata } from 'next';
import ArticleCard from '@/components/article/ArticleCard';
import ProductCard from '@/components/product/ProductCard';
import NewsletterForm from '@/components/newsletter/NewsletterForm';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import SectionHeading from '@/components/ui/SectionHeading';
import Pic, { hasExt } from '@/components/ui/Pic';
import { getGuidesInCategory } from '@/lib/content';
import { CATEGORIES, getCategory } from '@/lib/taxonomy';
import { SITE } from '@/lib/site';
import type { Product } from '@/lib/products';

export function categoryMetadata(slug: string): Metadata {
  const c = getCategory(slug)!;
  return { title: c.h1, description: c.description.slice(0, 158), alternates: { canonical: `/${slug}/` },
    openGraph: { title: c.h1, description: c.description, url: `/${slug}/`, images: [{ url: hasExt(c.image) ? c.image : `${c.image}.jpg`, width: 1152, height: 768, alt: c.imageAlt }] } };
}

export default function CategoryPage({ slug }: { slug: string }) {
  const c = getCategory(slug)!;
  const guides = getGuidesInCategory(slug);
  const [featured, ...rest] = guides;
  const products: Product[] = [];
  for (const g of guides) for (const b of g.blocks) if (b.type === 'product' && b.product.features.length && !products.find((p) => p.id === b.product.id)) products.push(b.product);
  const ld = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: c.h1, description: c.description, url: `${SITE.url}/${slug}/`,
    hasPart: guides.map((g) => ({ '@type': 'BlogPosting', headline: g.title, url: `${SITE.url}/guides/${g.slug}/` })) };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="container" style={{ paddingTop: 24 }}>
        <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: c.title, href: `/${slug}/` }]} />
        <div className="cat-head">
          <div><div className="eyebrow">Category</div><h1 style={{ marginTop: 8 }}>{c.h1}</h1><p>{c.description}</p></div>
          <Pic src={c.image} alt={c.imageAlt} width={1152} height={768} priority sizes="(max-width: 1024px) 100vw, 560px" />
        </div>
      </div>
      {featured && <section className="section section-muted"><div className="container">
        <SectionHeading eyebrow="Featured guide" title="Start with this one" />
        <ArticleCard g={featured} priority wide />
      </div></section>}
      {rest.length > 0 && <section className="section"><div className="container">
        <SectionHeading eyebrow="Latest guides" title={`More ${c.title.toLowerCase()} ideas`} />
        <div className="card-grid reveal-group" data-stagger="50" data-stagger-max="250">{rest.map((g) => <ArticleCard key={g.slug} g={g} />)}</div>
      </div></section>}
      {products.length > 0 && <section className="section section-muted"><div className="container">
        <SectionHeading eyebrow={`Shop ${c.title.toLowerCase()} favorites`} title="Organizers we recommend" intro="Generic product types from our guides. Always check dimensions before you buy." />
        <div className="product-grid reveal-group" data-stagger="55" data-stagger-max="220">{products.slice(0, 4).map((p, i) => <ProductCard key={p.id} product={p} position={i + 1} articleSlug={slug} />)}</div>
      </div></section>}
      <section className="section"><div className="container">
        <SectionHeading title="Related categories" />
        <div className="pill-row">{CATEGORIES.filter((x) => x.slug !== slug).map((x) => <Link key={x.slug} className="pill" href={`/${x.slug}/`}>{x.title}</Link>)}</div>
      </div></section>
      <section className="container"><NewsletterForm /></section>
    </>
  );
}
