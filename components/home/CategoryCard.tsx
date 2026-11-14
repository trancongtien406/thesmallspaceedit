import Link from 'next/link';
import type { Category } from '@/lib/taxonomy';
export default function CategoryCard({ c }: { c: Category }) {
  return (
    <Link className="cat-card" href={`/${c.slug}/`}>
      <picture><source srcSet={`${c.image}-43.webp`} type="image/webp" /><img src={`${c.image}-43.jpg`} alt={c.imageAlt} width={640} height={480} loading="lazy" decoding="async" /></picture>
      <span>{c.title}</span>
    </Link>
  );
}
