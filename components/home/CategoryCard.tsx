import Link from 'next/link';
import type { Category } from '@/lib/taxonomy';
import Pic, { hasExt } from '@/components/ui/Pic';
export default function CategoryCard({ c }: { c: Category }) {
  return (
    <Link className="cat-card" href={`/${c.slug}/`}>
      <Pic src={hasExt(c.image) ? c.image : `${c.image}-43`} alt={c.imageAlt} width={640} height={480} />
      <span>{c.title}</span>
    </Link>
  );
}
