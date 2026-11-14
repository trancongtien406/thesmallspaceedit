import Link from 'next/link';
import SimplePage from '@/components/ui/SimplePage';
import { SITE } from '@/lib/site';
export const metadata = { title: 'Affiliate Disclosure', description: 'Affiliate disclosure for The Small Space Edit, a participant in the Amazon Services LLC Associates Program.', alternates: { canonical: '/affiliate-disclosure/' } };
export default function Disclosure() {
  return (
    <SimplePage title="Affiliate Disclosure" path="/affiliate-disclosure/">
      <p style={{ background: 'var(--sage-light)', padding: '16px 20px', borderRadius: 10 }}><strong>{SITE.disclosure}</strong></p>
      <h2>Amazon Associates participation</h2>
      <p>{SITE.name} is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.</p>
      <h2>What affiliate links are</h2>
      <p>An affiliate link is a special link that lets a retailer know a visitor came from our site. When you click one of these links and make a qualifying purchase, we may receive a small commission.</p>
      <h2>Does it cost you more?</h2>
      <p>No. Under standard affiliate programs, the price you pay is the same whether or not you use our link.</p>
      <h2>How we choose what to recommend</h2>
      <p>We only mention product types we believe are genuinely useful for small spaces, based on research into features, dimensions and practical use cases. We do not publish fake reviews, invent ratings, or accept payment for positive coverage. Commissions never determine what we recommend. Pins we publish on Pinterest that contain affiliate links are labeled #affiliate.</p>
      <p>Prices and availability on Amazon are accurate as of the date/time indicated on Amazon and are subject to change. Any price and availability information displayed on Amazon at the time of purchase will apply to the purchase of the product.</p>
      <h2>Contact</h2>
      <p>If you have questions about this disclosure, please <Link href="/contact/">contact us</Link>.</p>
    </SimplePage>
  );
}
