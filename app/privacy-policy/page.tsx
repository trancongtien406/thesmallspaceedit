import Link from 'next/link';
import SimplePage from '@/components/ui/SimplePage';
import { SITE } from '@/lib/site';
import { PUBLISHED } from '@/lib/content';
export const metadata = { title: 'Privacy Policy', description: 'Privacy policy for The Small Space Edit.', alternates: { canonical: '/privacy-policy/' } };
export default function Privacy() {
  const updated = new Date(PUBLISHED + 'T12:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const mail = <a href={`mailto:${SITE.email}`}>{SITE.email}</a>;
  return (
    <SimplePage title="Privacy Policy" path="/privacy-policy/">
      <p><em>Last updated: {updated}</em></p>
      <p>This Privacy Policy explains how {SITE.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses and protects information when you visit {SITE.url}/ (the &quot;Site&quot;). It describes only the services the Site actually uses today, and we will update it when that changes.</p>
      <h2>Information We Collect</h2>
      <p><strong>Email address:</strong> only if you contact us or join our newsletter. Our newsletter signup is not connected to an email provider yet, so the form currently does not store your email.</p>
      <p><strong>Technical information:</strong> our hosting provider may automatically log standard technical data such as IP address, browser type, referring page and time of visit, for security and performance.</p>
      <p><strong>Analytics:</strong> we do not currently run analytics scripts. If we add analytics (for example Google Analytics 4, Vercel Analytics or the Pinterest tag), we will list it here.</p>
      <h2>How We Use Information</h2>
      <p>To operate and secure the Site, to reply to messages, and — once enabled and only if you subscribe — to send the newsletter you asked for. Every newsletter will include an unsubscribe link, in line with the CAN-SPAM Act.</p>
      <h2>Cookies</h2>
      <p>The Site itself does not set advertising cookies. When you click an affiliate link and visit Amazon, Amazon may place cookies on your browser to track referrals and purchases. Please review Amazon&apos;s privacy notice for details.</p>
      <h2>Third-Party Services</h2>
      <ul><li><strong>Vercel</strong> — website hosting and delivery.</li><li><strong>Amazon Services LLC Associates Program</strong> — affiliate links.</li><li><strong>Email provider</strong> — not yet selected (TODO). This policy will be updated when one is connected.</li></ul>
      <h2>Affiliate Links</h2>
      <p>{SITE.disclosure} See our <Link href="/affiliate-disclosure/">Affiliate Disclosure</Link>.</p>
      <h2>Data Retention</h2>
      <p>We keep emails you send us only as long as needed to respond and for reasonable record-keeping. Newsletter subscriber data (once enabled) is kept until you unsubscribe or ask us to delete it.</p>
      <h2>Your Rights</h2>
      <p>Depending on where you live (for example California under the CCPA/CPRA, or other US state privacy laws), you may have rights to access, correct or delete personal information we hold about you. To make a request, email us at {mail}.</p>
      <h2>Children&apos;s Privacy</h2>
      <p>This Site is not directed at children under 13, and we do not knowingly collect information from children.</p>
      <h2>Contact</h2>
      <p>Questions? Email {mail}.</p>
    </SimplePage>
  );
}
