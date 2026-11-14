import type { Metadata, Viewport } from 'next';
import { DM_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import { SITE } from '@/lib/site';

// Self-hosted at build time by next/font (spec §1.2)
const body = DM_Sans({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const heading = Playfair_Display({ subsets: ['latin'], weight: ['500', '600'], variable: '--font-heading', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — Small Space Organization & Renter-Friendly Storage Ideas`, template: `%s | ${SITE.name}` },
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
    <html lang="en-US" className={`${body.variable} ${heading.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
