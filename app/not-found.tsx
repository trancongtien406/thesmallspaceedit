import Link from 'next/link';
export default function NotFound() {
  return <div className="page"><h1>Page not found</h1><p>The page you&apos;re looking for doesn&apos;t exist. Try our <Link href="/guides/">guides</Link> or <Link href="/search/">search</Link>.</p></div>;
}
