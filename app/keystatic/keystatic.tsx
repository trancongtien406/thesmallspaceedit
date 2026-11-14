'use client';
import { useEffect, useState } from 'react';
import { makePage } from '@keystatic/next/ui/app';
import config from '../../keystatic.config';

const KeystaticPage = makePage(config);

// The site uses `trailingSlash: true`, so a reload or deep link lands on e.g. "/keystatic/collection/products/",
// which Keystatic's router reports as "Not found". After Next.js has synced its own history entry, strip the
// trailing slash, then mount Keystatic (it reads window.location once on mount).
export default function KeystaticApp() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => {
      const { pathname, search, hash } = window.location;
      if (/^\/keystatic\/.+\/$/.test(pathname)) window.history.replaceState(window.history.state, '', pathname.replace(/\/+$/, '') + search + hash);
      setReady(true);
    }, 0);
    return () => clearTimeout(t);
  }, []);
  return ready ? <KeystaticPage /> : null;
}
