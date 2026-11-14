import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import MotionObserver from '@/components/motion/MotionObserver';
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div id="scroll-sentinel" aria-hidden="true" />
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
      <MotionObserver />
    </>
  );
}
