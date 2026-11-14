import type { Product } from '@/lib/products';
import { SITE } from '@/lib/site';

// Only real Amazon Associates links are rendered as an active CTA (spec §5.4). Otherwise: "Product link coming soon".
const isValidAffiliate = (u?: string) => !!u && /^https:\/\/(www\.)?(amazon\.com|amzn\.to)\//.test(u);

export default function ProductCard({ product: p, position, articleSlug, compact }: { product: Product; position?: number; articleSlug?: string; compact?: boolean }) {
  const rich = !compact && p.features.length > 0;
  const live = isValidAffiliate(p.affiliateUrl);
  const footer = (
    <div className="pfoot">
      {live ? (
        <a className="btn btn-primary" href={p.affiliateUrl} target="_blank" rel="sponsored nofollow noopener noreferrer"
          data-event="amazon_click" data-article={articleSlug} data-position={position}>Check price on Amazon ↗</a>
      ) : (
        // TODO: add affiliateUrl (Amazon Associates SiteStripe link, unique tracking ID per pin) in lib/products.ts
        <span className="unavailable" data-todo="amazon-link" aria-disabled="true">Product link coming soon</span>
      )}
      <p className="pdisc">{SITE.disclosure}</p>
    </div>
  );
  return (
    <aside className={`product-card ${rich ? 'rich' : 'compact'}`} aria-label={`Product recommendation: ${p.name}`} data-product-id={p.id}>
      {rich && p.image && (
        <div className="pimg"><picture><source srcSet={`${p.image}.webp`} type="image/webp" /><img src={`${p.image}.jpg`} alt={p.imageAlt ?? p.name} width={600} height={600} loading="lazy" decoding="async" /></picture></div>
      )}
      <div className="pbody">
        {p.badge && <span><span className={`badge ${p.badge === "Editor's Pick" ? 'badge-terracotta' : ''}`}>{p.badge}</span></span>}
        <h3>{p.name}</h3>
        <p className="pdesc">{p.description}</p>
        {rich && (<>
          <div className="plist"><strong>Key features</strong><ul>{p.features.map((f) => <li key={f}>{f}</li>)}</ul></div>
          <div className="pc">
            <div className="plist"><strong>Pros</strong><ul>{p.pros.map((f) => <li key={f}>{f}</li>)}</ul></div>
            <div className="plist"><strong>Cons</strong><ul>{p.cons.map((f) => <li key={f}>{f}</li>)}</ul></div>
          </div>
          <div className="plist"><strong>Check before you buy</strong><ul>{p.check.map((f) => <li key={f}>{f}</li>)}</ul></div>
        </>)}
        {!rich && <p className="plist" style={{ color: 'var(--text-secondary)' }}>Check dimensions and recent buyer reviews before you buy.</p>}
        {rich && footer}
      </div>
      {!rich && footer}
    </aside>
  );
}
