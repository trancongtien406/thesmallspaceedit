import type { Metadata, Viewport } from 'next';
import { DM_Sans, Playfair_Display } from 'next/font/google';
import { SITE } from '@/lib/site';
import { BRAND, brandCssVars } from '@/lib/brand';

// Runs before first paint: enables hide-then-reveal only when motion is allowed and IO exists; failsafe un-hides after 3 s.
const MOTION_BOOT = `(function(){try{var d=document.documentElement;if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window){d.classList.add('js-motion');setTimeout(function(){if(!window.__motionReady)d.classList.remove('js-motion')},3000)}}catch(e){}})();`;

// Self-hosted at build time by next/font (spec §1.2)
const body = DM_Sans({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const heading = Playfair_Display({ subsets: ['latin'], weight: ['500', '600'], variable: '--font-heading', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: BRAND.seoTitle || SITE.name, template: `%s | ${SITE.name}` },
  description: SITE.description,
  openGraph: { type: 'website', siteName: SITE.name, locale: 'en_US', images: [{ url: '/img/home-og.jpg', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/favicon.svg' },
  robots: { index: true, follow: true },
  // Pinterest domain claim (TODO): set NEXT_PUBLIC_PINTEREST_DOMAIN_VERIFY -> renders <meta name="p:domain_verify">
  other: { 'pinterest-rich-pin': 'true', ...(SITE.pinterestVerify ? { 'p:domain_verify': SITE.pinterestVerify } : {}) },
};
export const viewport: Viewport = { themeColor: '#F7F4ED', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${body.variable} ${heading.variable}`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: MOTION_BOOT }} />{brandCssVars() && <style id="brand-colors" dangerouslySetInnerHTML={{ __html: brandCssVars() }} />}</head>
      <body>{children}</body>
    </html>
  );
}
