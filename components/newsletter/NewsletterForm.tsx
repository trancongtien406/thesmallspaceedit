'use client';
import { useState } from 'react';
import Link from 'next/link';

type State = 'idle' | 'loading' | 'success' | 'already' | 'invalid' | 'error';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// TODO: connect to a real email provider (e.g. Resend audience, Kit, MailerLite, Beehiiv) via an API route or
// the provider's hosted form. Until then this form validates input only and does NOT store or send anything.
const seen = new Set<string>(); // in-memory only (demo) — nothing is persisted
async function subscribe(email: string): Promise<'ok' | 'already'> {
  await new Promise((r) => setTimeout(r, 600));
  if (seen.has(email.toLowerCase())) return 'already';
  seen.add(email.toLowerCase());
  return 'ok';
}

export default function NewsletterForm({ variant = 'full', id = 'newsletter' }: { variant?: 'full' | 'small'; id?: string }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<State>('idle');
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === 'loading') return;
    if (!EMAIL_RE.test(email.trim())) { setState('invalid'); return; }
    setState('loading');
    try { const r = await subscribe(email.trim()); setState(r === 'already' ? 'already' : 'success'); } catch { setState('error'); }
  };
  const inputId = `${id}-email`;
  return (
    <section className={`newsletter ${variant === 'small' ? 'small' : ''}`} id={id} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`}>Make Every Inch Count</h2>
      <p>Get practical home organization ideas and thoughtful small-space inspiration delivered to your inbox.</p>
      {state === 'success' ? (
        <p className="nl-msg ok" role="status">✓ Thanks! Our newsletter is launching soon. (Signups are not connected yet, so your email was not saved.)</p>
      ) : (
        <form className="nl-form" onSubmit={onSubmit} noValidate>
          <label htmlFor={inputId} className="sr-only">Your email address</label>
          <input id={inputId} type="email" name="email" autoComplete="email" placeholder="Your email address" value={email}
            onChange={(e) => { setEmail(e.target.value); if (state === 'invalid') setState('idle'); }}
            aria-invalid={state === 'invalid'} aria-describedby={`${id}-msg`} />
          <button className="btn btn-primary" type="submit" disabled={state === 'loading'} aria-busy={state === 'loading'}>
            {state === 'loading' ? <><span className="spinner" aria-hidden="true" /> Sending…</> : 'Get the Ideas'}
          </button>
        </form>
      )}
      <div id={`${id}-msg`} aria-live="polite">
        {state === 'invalid' && <p className="nl-msg err">⚠ Please enter a valid email address.</p>}
        {state === 'already' && <p className="nl-msg ok">You&apos;re already on the list. Thanks!</p>}
        {state === 'error' && <p className="nl-msg err">⚠ Something went wrong. Please try again.</p>}
      </div>
      <p className="nl-consent">By subscribing, you agree to receive emails from The Small Space Edit. Unsubscribe anytime. See our <Link href="/privacy-policy/">Privacy Policy</Link>.</p>
    </section>
  );
}
