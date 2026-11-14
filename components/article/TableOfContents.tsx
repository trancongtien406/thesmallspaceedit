'use client';
import { useEffect, useRef, useState } from 'react';
import type { TocItem } from '@/lib/content';

function useActive(items: TocItem[]) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const els = items.map((t) => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver((entries) => {
      const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (vis[0]) setActive(vis[0].target.id);
    }, { rootMargin: '-90px 0px -65% 0px' });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [items]);
  return active;
}

/** Mobile: collapsed-by-default accordion with section count; active section highlighted in sage (review P1 #10). */
export function TocMobile({ items }: { items: TocItem[] }) {
  const active = useActive(items);
  const ref = useRef<HTMLDetailsElement>(null);
  return (
    <details className="toc-mobile" ref={ref}>
      <summary><span>In This Guide <span className="toc-count">· {items.length} sections</span></span></summary>
      <ol>{items.map((t) => <li key={t.id}><a href={`#${t.id}`} className={active === t.id ? 'active' : ''} aria-current={active === t.id ? 'true' : undefined}
        onClick={() => { if (ref.current) ref.current.open = false; }}>{t.text}</a></li>)}</ol>
    </details>
  );
}

export default function TableOfContents({ items }: { items: TocItem[] }) {
  const active = useActive(items);
  return (
    <nav className="toc" aria-label="Table of contents">
      <h2>In This Guide</h2>
      <ol>{items.map((t) => <li key={t.id}><a href={`#${t.id}`} className={active === t.id ? 'active' : ''} aria-current={active === t.id ? 'true' : undefined}>{t.text}</a></li>)}</ol>
    </nav>
  );
}
