import Link from 'next/link';
import SimplePage from '@/components/ui/SimplePage';
import { SITE } from '@/lib/site';
export const metadata = { title: 'About The Small Space Edit', description: 'A home and lifestyle resource dedicated to making small spaces feel more functional, organized and comfortable.', alternates: { canonical: '/about/' } };
export default function About() {
  return (
    <SimplePage title="About The Small Space Edit" path="/about/" schemaType="AboutPage">
      <p className="eyebrow" style={{ marginTop: -12 }}>A better way to live in less space</p>
      <p>Welcome to {SITE.name}, a home and lifestyle resource dedicated to making small spaces feel more functional, organized, and comfortable.</p>
      <p>We believe that great living isn&apos;t about having more space. It&apos;s about making thoughtful use of the space you already have.</p>
      <p>Our guides explore practical storage ideas, renter-friendly home improvements, space-saving furniture, and carefully researched home products.</p>
      <h2>What We Cover</h2>
      <ul><li>Small-space organization</li><li>Kitchen and bathroom storage</li><li>Closet and laundry room solutions</li><li>Renter-friendly home ideas</li><li>Space-saving furniture and home essentials</li></ul>
      <h2>Our Approach</h2>
      <p>We focus on practical ideas, clear product information, realistic expectations, and helpful recommendations. Our goal is to help readers make more informed decisions about their homes, one thoughtful improvement at a time.</p>
      <h2 id="editorial-standards">Editorial Standards</h2>
      <ul>
        <li><strong>Research, not hands-on testing.</strong> Our guides are based on research into product types, features, dimensions and common use cases. We do not claim to have personally tested products unless a guide explicitly says so.</li>
        <li><strong>No fake reviews or ratings.</strong> We never invent star ratings, testimonials or prices.</li>
        <li><strong>Measure first.</strong> Every guide explains what to measure and check so you can decide whether something fits your space.</li>
        <li><strong>Illustrative images.</strong> Images on this site are AI-assisted illustrations of organization ideas, not photos of specific products.</li>
        <li><strong>Corrections.</strong> If you spot an error, <Link href="/contact/">tell us</Link> and we will review and update the guide.</li>
      </ul>
      <h2>How We Choose Products</h2>
      <p>We recommend product <em>types</em> that solve a specific small-space problem, and we describe the features that matter, the trade-offs (pros and cons), and the measurements to check. Prices and availability change often, so we send you to the current listing rather than quoting a price.</p>
      <h2>Affiliate Transparency</h2>
      <p>Some links on this website may be affiliate links. We may earn a commission from qualifying purchases at no additional cost to you. Commissions never decide what we recommend. {SITE.disclosure} Read our full <Link href="/affiliate-disclosure/">affiliate disclosure</Link>.</p>
      <h2>Contact</h2>
      <p>Questions or ideas? Visit our <Link href="/contact/">contact page</Link>.</p>
    </SimplePage>
  );
}
