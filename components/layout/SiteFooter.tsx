import Link from 'next/link';
import { SITE } from '@/lib/site';
import { CATEGORIES } from '@/lib/taxonomy';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="fbrand"><span className="brand-name">{SITE.name}</span><p style={{ marginTop: 8 }}>{SITE.slogan}<br />{SITE.tagline}</p></div>
          <div><h3>Explore</h3><ul>{CATEGORIES.slice(0, 4).map((c) => <li key={c.slug}><Link href={`/${c.slug}/`}>{c.title}</Link></li>)}<li><Link href="/guides/">All Guides</Link></li></ul></div>
          <div><h3>About</h3><ul><li><Link href="/about/">Our Story</Link></li><li><Link href="/contact/">Contact</Link></li><li><Link href="/about/#editorial-standards">Editorial Standards</Link></li><li><Link href="/how-we-choose/">How We Choose Products</Link></li></ul></div>
          <div><h3>Information</h3><ul><li><Link href="/affiliate-disclosure/">Affiliate Disclosure</Link></li><li><Link href="/privacy-policy/">Privacy Policy</Link></li></ul></div>
          <div><h3>Follow Along</h3><ul>
            <li><a href={SITE.pinterest} target="_blank" rel="noopener noreferrer me">Pinterest</a></li>
            <li><Link href="#newsletter">Email Newsletter</Link></li></ul></div>
        </div>
        <div className="footer-disclosure"><strong>{SITE.disclosure}</strong><span>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</span></div>
      </div>
    </footer>
  );
}
