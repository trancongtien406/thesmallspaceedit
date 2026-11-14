import Link from 'next/link';
import type { Category } from '@/lib/taxonomy';
export default function CategoryCard({ c }: { c: Category }) {
  return (
    <Link className="cat-card" href={`/${c.slug}/`}>
      <picture><source srcSet={`${c.image}-sq.webp`} type="image/webp" /><img src={`${c.image}-sq.jpg`} alt={c.imageAlt} width={600} height={600} loading="lazy" decoding="async" /></picture>
      <span>{c.title}</span>
    </Link>
  );
}
