import Link from 'next/link';
import SimplePage from '@/components/ui/SimplePage';
import { SITE } from '@/lib/site';
export const metadata = {
  title: 'How We Choose Products',
  description: 'How The Small Space Edit researches and recommends small-space storage products: research sources, what we do and do not claim, image labels, and affiliate links.',
  alternates: { canonical: '/how-we-choose/' },
};
export default function HowWeChoose() {
  return (
    <SimplePage title="How We Choose Products" path="/how-we-choose/">
      <p className="eyebrow" style={{ marginTop: -12 }}>Research transparency</p>
      <p>Every product recommendation on {SITE.name} starts with a specific small-space problem, like a narrow gap beside the fridge or a bathroom with no drilling allowed. Then we look for the <em>type</em> of product that solves it. This page explains how that research works and what our recommendations do and do not mean.</p>

      <h2>Researched, not hands-on tested</h2>
      <p>Unless a guide clearly says an item was tested hands-on, our recommendations are <strong>based on product specifications and available product information</strong>. We have not personally used every product. We never write &ldquo;we tested&rdquo; or &ldquo;tried and loved&rdquo; unless that is true.</p>

      <h2>What we look at</h2>
      <ul>
        <li><strong>Manufacturer specifications</strong>: dimensions, materials, stated weight capacity and installation method (for example tension, adhesive, freestanding or screws).</li>
        <li><strong>Retailer product listings</strong>: published product details, Q&amp;A, and how buyers report the item fitting into real homes.</li>
        <li><strong>Common fit problems</strong>: plumbing in sink cabinets, door clearance, baseboards, sloped floors and other things that often cause returns.</li>
        <li><strong>Renter-friendliness</strong>: whether it can be installed and removed without permanent damage.</li>
      </ul>

      <h2>How to read our product cards</h2>
      <ul>
        <li><strong>Key features</strong> describe what to look for in that product type. Exact sizes and materials vary by brand and model, so always check the listing.</li>
        <li><strong>Why it helps / Watch out for</strong> sum up typical strengths and trade-offs for that type of product. They are not a review of one specific item.</li>
        <li><strong>Measure before you buy</strong> lists the measurements that decide whether it will fit.</li>
        <li>We never show <strong>star ratings, prices or stock levels</strong>. These change often, and the current listing is the only reliable source.</li>
      </ul>

      <h2>About our images</h2>
      <p>Images marked <strong>&ldquo;Illustrative image&rdquo;</strong> are AI-generated concept images. They show the organization idea, not the exact product behind a link. The item you buy may look different. If we ever show a photo of the actual linked product, it will be marked <strong>&ldquo;Product image&rdquo;</strong> and used with permission.</p>

      <h2>Affiliate links</h2>
      <p>Some links may be affiliate links. {SITE.disclosure} Commissions never decide what we recommend, and many of our tips need no product at all. See our <Link href="/affiliate-disclosure/">affiliate disclosure</Link> and <Link href="/about/#editorial-standards">editorial standards</Link>.</p>

      <h2>Corrections</h2>
      <p>If a spec, measurement or recommendation looks wrong, please <Link href="/contact/">contact us</Link>. We review reports and update the guide.</p>
    </SimplePage>
  );
}
