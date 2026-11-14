'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
type Item = { slug: string; title: string; description: string; category: string };
export default function SearchClient({ items }: { items: Item[] }) {
  const [q, setQ] = useState('');
  const res = useMemo(() => { const t = q.trim().toLowerCase(); if (!t) return items;
    return items.filter((i) => t.split(/\s+/).every((w) => (i.title + ' ' + i.description + ' ' + i.category).toLowerCase().includes(w))); }, [q, items]);
  return (
    <>
      <div className="search-box"><label htmlFor="q" className="sr-only">Search guides</label>
        <input id="q" type="search" placeholder="Try “bathroom”, “rolling cart” or “closet”" value={q} onChange={(e) => setQ(e.target.value)} autoFocus /></div>
      <p style={{ color: 'var(--text-secondary)', marginTop: 12 }} aria-live="polite">{res.length} guide{res.length === 1 ? '' : 's'}</p>
      <ul style={{ listStyle: 'none', padding: 0 }}>{res.map((i) => (
        <li key={i.slug} style={{ borderBottom: '1px solid var(--border)', padding: '14px 0' }}>
          <span className="badge">{i.category}</span>
          <h2 style={{ fontSize: 20, margin: '8px 0 4px' }}><Link href={`/guides/${i.slug}/`} style={{ textDecoration: 'none', color: 'var(--forest)' }}>{i.title}</Link></h2>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 15 }}>{i.description}</p></li>))}</ul>
    </>
  );
}
