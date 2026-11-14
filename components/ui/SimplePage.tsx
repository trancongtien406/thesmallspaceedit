import Breadcrumbs from './Breadcrumbs';
export default function SimplePage({ title, path, children, schemaType = 'WebPage' }: { title: string; path: string; children: React.ReactNode; schemaType?: string }) {
  const ld = { '@context': 'https://schema.org', '@type': schemaType, name: title };
  return (
    <div className="page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: title, href: path }]} />
      <h1>{title}</h1>{children}
    </div>
  );
}
