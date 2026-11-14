'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { CATEGORIES } from '@/lib/taxonomy';

export default function MobileDrawer() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    document.body.classList.add('no-scroll');
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.classList.remove('no-scroll'); window.removeEventListener('keydown', onKey); openRef.current?.focus(); };
  }, [open]);
  const close = () => setOpen(false);
  return (
    <>
      <button ref={openRef} className="icon-btn menu-btn" aria-label="Open menu" aria-expanded={open} aria-controls="mobile-drawer" onClick={() => setOpen(true)}><Menu size={24} /></button>
      {open && (
        <>
          <div className="drawer-overlay" onClick={close} aria-hidden="true" />
          <div className="drawer" id="mobile-drawer" role="dialog" aria-modal="true" aria-label="Site menu">
            <div className="drawer-head">
              <span className="brand-name" style={{ fontFamily: 'var(--font-heading)', color: 'var(--forest)' }}>The Small Space Edit</span>
              <button ref={closeRef} className="icon-btn" aria-label="Close menu" onClick={close}><X size={24} /></button>
            </div>
            <nav aria-label="Mobile">
              <Link href="/" onClick={close}>Home</Link>
              <Link href="/guides/" onClick={close}>Explore All Guides</Link>
              {CATEGORIES.map((c) => <Link key={c.slug} className="sub" href={`/${c.slug}/`} onClick={close}>{c.title}</Link>)}
              <Link href="/about/" onClick={close}>About Us</Link>
              <Link href="/search/" onClick={close}>Search</Link>
            </nav>
            <div className="drawer-cta"><strong>Make Every Inch Count</strong><p style={{ margin: '6px 0 12px', fontSize: 15 }}>Get practical ideas for your home.</p>
              <Link className="btn btn-primary" href="#newsletter" onClick={close}>Get the ideas</Link></div>
          </div>
        </>
      )}
    </>
  );
}
