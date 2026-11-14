import Link from 'next/link';
import type { Guide } from '@/lib/content';
import { getCategory } from '@/lib/taxonomy';
import Pic from '@/components/ui/Pic';

export default function ArticleCard({ g, priority = false, wide = false }: { g: Guide; priority?: boolean; wide?: boolean }) {
  return (
    <Link className={`article-card${wide ? ' wide' : ''}`} href={`/guides/${g.slug}/`} data-event="related_article_click">
      <div className="thumb"><Pic src={g.heroImage} alt={g.imagealt} width={1152} height={768} priority={priority} highFetch={false} /></div>
      <div className="body">
        <span><span className="badge">{getCategory(g.primaryCategory)?.title}</span></span>
        <h3>{g.title}</h3>
        <p>{g.description}</p>
        <span className="meta">{g.readingTime} min read</span>
      </div>
    </Link>
  );
}
