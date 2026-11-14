import Link from 'next/link';
import { SITE } from '@/lib/site';
export default function AffiliateDisclosure() {
  return (
    <div className="disclosure"><div role="note">
      <strong>Disclosure:</strong> This article contains affiliate links. If you buy through them we may earn a commission at no extra cost to you. {SITE.disclosure}{' '}
      <Link href="/affiliate-disclosure/">Learn more</Link>.
    </div></div>
  );
}
