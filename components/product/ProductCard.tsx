import Link from 'next/link';
import type { Product } from '@/lib/products';
import { SITE } from '@/lib/site';
import Pic from '@/components/ui/Pic';

// Only real Amazon Associates links are rendered as an active CTA. Otherwise: "Product link coming soon".
export const isValidAffiliate = (u?: string) => !!u && /^https:\/\/(www\.)?(amazon\.com|amzn\.to)\//.test(u);

/** Image source label (review P0 #2): AI concept images must never pass as the exact linked product. */
export function ImageLabel({ type = 'illustrative' }: { type?: Product['imageType'] }) {
  return type === 'product'
    ? <span className="img-label">Product image</span>
    : <span className="img-label" title="AI-generated concept image. The product you buy may look different.">Illustrative image</span>;
}

function ProductImage({ p }: { p: Product }) {
  if (!p.image) return null;
  return (
    <div className="pimg">
      <Pic src={p.image} alt={p.imageAlt ?? p.name} width={600} height={600} />
      <ImageLabel type={p.imageType} />
    </div>
  );
}

function AmazonCta({ p, position, articleSlug }: { p: Product; position?: number; articleSlug?: string }) {
  return (
    <a className="btn btn-primary" href={p.affiliateUrl} target="_blank" rel="sponsored nofollow noopener noreferrer"
      data-event="amazon_click" data-article={articleSlug} data-position={position}>Check price on Amazon ↗</a>
  );
}

const ResearchNote = () => (
  <p className="pbasis">Based on product specifications and available product information, not hands-on testing. Sizes and materials vary by model, so check the listing. <Link href="/how-we-choose/">How we choose</Link></p>
);

/** Homepage "Small Space Solutions" card: 3 key features, CTA to the matching guide (review P0 #5, P1 #6–7). */
export function SolutionCard({ product: p, position }: { product: Product; position?: number }) {
  const live = isValidAffiliate(p.affiliateUrl);
  return (
    <article className="product-card solution" data-product-id={p.id}>
      <ProductImage p={p} />
      <div className="pbody">
        {p.badge && <span><span className={`badge ${p.badge === "Editor's Pick" ? 'badge-terracotta' : ''}`}>{p.badge}</span></span>}
        <h3>{p.name}</h3>
        <p className="pdesc">{p.description}</p>
        <ul className="pfeat">{p.features.slice(0, 3).map((f) => <li key={f}>{f}</li>)}</ul>
        <div className="pfoot">
          {live ? <AmazonCta p={p} position={position} articleSlug="home" /> : p.guide && <Link className="btn btn-primary" href={`/guides/${p.guide}/`}>Explore the Guide</Link>}
          {live && <p className="pdisc">{SITE.disclosure}</p>}
        </div>
      </div>
    </article>
  );
}

export default function ProductCard({ product: p, position, articleSlug, compact }: { product: Product; position?: number; articleSlug?: string; compact?: boolean }) {
  const rich = !compact && p.features.length > 0;
  const live = isValidAffiliate(p.affiliateUrl);
  const footer = (
    <div className="pfoot">
      {live ? <AmazonCta p={p} position={position} articleSlug={articleSlug} /> : (
        // TODO: add affiliateUrl (Amazon Associates SiteStripe link, unique tracking ID per pin) in lib/products.ts
        <span className="unavailable" data-todo="amazon-link" aria-disabled="true">Product link coming soon</span>
      )}
      <p className="pdisc">{SITE.disclosure}</p>
    </div>
  );
  return (
    <aside id={rich ? `pick-${p.id}` : undefined} className={`product-card ${rich ? 'rich' : 'compact'}`} aria-label={`Product recommendation: ${p.name}`} data-product-id={p.id}>
      {rich && <ProductImage p={p} />}
      <div className="pbody">
        {p.badge && <span><span className={`badge ${p.badge === "Editor's Pick" ? 'badge-terracotta' : ''}`}>{p.badge}</span></span>}
        <h3>{p.name}</h3>
        <p className="pdesc">{p.description}</p>
        {rich && (<>
          <div className="plist"><strong>Key features</strong><ul>{p.features.slice(0, 3).map((f) => <li key={f}>{f}</li>)}</ul></div>
          <div className="pc">
            <div className="plist"><strong>Why it helps</strong><ul>{p.pros.slice(0, 2).map((f) => <li key={f}>{f}</li>)}</ul></div>
            <div className="plist"><strong>Watch out for</strong><ul>{p.cons.slice(0, 2).map((f) => <li key={f}>{f}</li>)}</ul></div>
          </div>
          <div className="plist"><strong>Measure before you buy</strong><ul>{p.check.map((f) => <li key={f}>{f}</li>)}</ul></div>
          <ResearchNote />
        </>)}
        {!rich && <p className="plist" style={{ color: 'var(--text-secondary)' }}>Check dimensions and recent buyer reviews before you buy.</p>}
        {rich && footer}
      </div>
      {!rich && footer}
    </aside>
  );
}
