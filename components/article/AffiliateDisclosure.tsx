import Link from 'next/link';
import { SITE } from '@/lib/site';
// Review P0 #3: prominent, labelled, placed before the first recommendation. Amazon sentence kept verbatim (SITE.disclosure).
export default function AffiliateDisclosure() {
  return (
    <div className="disclosure"><div role="note" aria-label="Affiliate Disclosure">
      <strong className="disc-label">Affiliate Disclosure</strong>
      <p>This article contains affiliate links. {SITE.disclosure} We may earn a commission if you purchase through these links, at no additional cost to you. <Link href="/affiliate-disclosure/">Full disclosure</Link> · <Link href="/how-we-choose/">How we choose products</Link></p>
    </div></div>
  );
}
