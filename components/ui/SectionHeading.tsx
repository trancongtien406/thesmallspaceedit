import Link from 'next/link';
export default function SectionHeading({ eyebrow, title, intro, href, linkLabel, as = 'h2' }: {
  eyebrow?: string; title: string; intro?: string; href?: string; linkLabel?: string; as?: 'h1' | 'h2';
}) {
  const H = as;
  return (
    <div className="section-heading">
      <div>{eyebrow && <div className="eyebrow">{eyebrow}</div>}<H>{title}</H>{intro && <p>{intro}</p>}</div>
      {href && <Link className="btn-text" href={href}>{linkLabel ?? 'View all'} →</Link>}
    </div>
  );
}
