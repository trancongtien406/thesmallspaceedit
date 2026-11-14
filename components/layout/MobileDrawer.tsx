'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { CATEGORIES } from '@/lib/taxonomy';

// Always rendered so open/close can animate (transform + opacity only, spec §3.6). When closed it is
// visibility:hidden + inert, so it is not focusable or read by screen readers.
export default function MobileDrawer() {
  const [open, setOpen] = useState(false);
  const wasOpen = useRef(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const drawer = drawerRef.current;
    if (!open) {
      if (wasOpen.current) openRef.current?.focus(); // restore focus to the menu button
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;
    document.body.classList.add('no-scroll');
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); return; }
      if (e.key !== 'Tab' || !drawer) return; // focus trap
      const f = Array.from(drawer.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => { document.body.classList.remove('no-scroll'); window.removeEventListener('keydown', onKey); };
  }, [open]);

  const close = () => setOpen(false);
  return (
    <>
      <button ref={openRef} className="icon-btn menu-btn" aria-label="Open menu" aria-expanded={open} aria-controls="mobile-drawer" onClick={() => setOpen(true)}><Menu size={24} /></button>
      <div className={`drawer-overlay${open ? ' is-open' : ''}`} onClick={close} aria-hidden="true" />
      <div ref={drawerRef} className={`drawer${open ? ' is-open' : ''}`} id="mobile-drawer" role="dialog" aria-modal="true" aria-label="Site menu"
        aria-hidden={!open} inert={!open}>
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
  );
}
