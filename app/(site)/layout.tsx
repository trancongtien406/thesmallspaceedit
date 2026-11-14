import '../globals.css';
import SiteChrome from '@/components/layout/SiteChrome';
// Public site layout (header, footer, motion). The admin at /keystatic uses the bare root layout instead.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>;
}
