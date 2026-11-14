import SimplePage from '@/components/ui/SimplePage';
import { SITE } from '@/lib/site';
export const metadata = { title: 'Contact', description: 'Get in touch with The Small Space Edit.', alternates: { canonical: '/contact/' } };
export default function Contact() {
  return (
    <SimplePage title="Contact" path="/contact/" schemaType="ContactPage">
      <p>Have a question, a small-space problem you&apos;d like us to cover, or a correction? We&apos;d love to hear from you.</p>
      {/* TODO: replace SITE.email (lib/site.ts) with the real contact email */}
      <p><strong>Email:</strong> <a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
      <p>We read every message and try to reply within a few business days. Please note we don&apos;t accept paid guest posts.</p>
    </SimplePage>
  );
}
