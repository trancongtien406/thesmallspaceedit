'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Quiet Editorial Motion (chatgpt_motion_spec.md §4, §7, §9).
 * Progressive enhancement: content is only hidden when <html> has `js-motion`, which an inline <head> script adds
 * (skipped for reduced motion / no IntersectionObserver) and removes again after 3 s if this component never runs.
 * One observer per page; each element is revealed once and unobserved. Items revealed in the same batch get a
 * capped stagger delay taken from the group's data-stagger / data-stagger-max attributes.
 */
declare global { interface Window { __motionReady?: boolean } }

export default function MotionObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    window.__motionReady = true;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const items = [
      ...Array.from(document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)')),
      ...Array.from(document.querySelectorAll<HTMLElement>('.reveal-group > :not(.is-visible)')),
    ];
    const revealAll = () => { items.forEach((el) => el.classList.add('is-visible')); root.classList.remove('js-motion'); };
    if (!root.classList.contains('js-motion') || mq.matches || !('IntersectionObserver' in window)) { revealAll(); return; }

    const io = new IntersectionObserver((entries) => {
      const batch = entries.filter((e) => e.isIntersecting || e.boundingClientRect.bottom < 0)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);
      const perGroup = new Map<Element, number>();
      for (const e of batch) {
        const el = e.target as HTMLElement;
        const group = el.parentElement?.classList.contains('reveal-group') ? el.parentElement : null;
        if (e.boundingClientRect.bottom < 0) el.classList.add('no-anim'); // already scrolled past: show without animating
        else if (group) {
          const i = perGroup.get(group) ?? 0; perGroup.set(group, i + 1);
          const step = Number(group.dataset.stagger ?? 60), max = Number(group.dataset.staggerMax ?? 260);
          el.style.setProperty('--d', `${Math.min(i * step, max)}ms`);
        }
        el.classList.add('is-visible');
        io.unobserve(el);
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach((el) => io.observe(el));

    const onChange = () => { if (mq.matches) { io.disconnect(); revealAll(); } };
    mq.addEventListener('change', onChange);
    return () => { io.disconnect(); mq.removeEventListener('change', onChange); };
  }, [pathname]);

  // Header shadow once the page is scrolled (sentinel + IO, no scroll handler) — spec §3.6
  useEffect(() => {
    const sentinel = document.getElementById('scroll-sentinel');
    const header = document.querySelector('.site-header');
    if (!sentinel || !header) return;
    const io = new IntersectionObserver(([e]) => header.classList.toggle('is-scrolled', !e.isIntersecting));
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  return null;
}
