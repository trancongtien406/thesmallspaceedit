import Link from 'next/link';
import { ChevronDown, Search } from 'lucide-react';
import { SITE } from '@/lib/site';
import { CATEGORIES } from '@/lib/taxonomy';
import MobileDrawer from './MobileDrawer';

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container bar">
        <MobileDrawer />
        <Link className="brand" href="/" aria-label={`${SITE.name} home`}>
          <span className="brand-name">{SITE.name}</span><span className="brand-tag">{SITE.slogan}</span>
        </Link>
        <nav className="main-nav" aria-label="Main">
          <Link href="/">Home</Link>
          <div className="dd">
            <button aria-haspopup="true">Explore <ChevronDown size={16} aria-hidden="true" /></button>
            <div className="dd-menu">
              <Link href="/guides/">All Guides</Link>
              {CATEGORIES.map((c) => <Link key={c.slug} href={`/${c.slug}/`}>{c.title}</Link>)}
            </div>
          </div>
          <Link href="/about/">About</Link>
        </nav>
        <Link className="icon-btn" href="/search/" aria-label="Search guides"><Search size={22} /></Link>
      </div>
    </header>
  );
}
