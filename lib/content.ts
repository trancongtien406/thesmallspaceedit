// Guides live in content/guides/*.md (YAML front matter + Markdown/Markdoc body), editable in /keystatic → "Guides".
// Product boxes inside a guide body: {% product name="…" why="…" product="<product-slug>" /%}
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import { Marked } from 'marked';
import { getProduct, type Product } from './products';
import { normImage } from './images';
import { SITE } from './site';
import { BRAND } from './brand';

export type Block = { type: 'html'; html: string } | { type: 'product'; product: Product; position: number };
export type TocItem = { id: string; text: string };
export type PinMedia = { type: 'image' | 'video'; src: string; poster?: string; alt: string };
export type Guide = {
  slug: string; title: string; description: string; image: string; imagealt: string; category: string;
  primaryCategory: string; categories: string[]; blocks: Block[]; toc: TocItem[]; readingTime: number;
  publishedAt: string; updatedAt: string; author: string; faqs: { q: string; a: string }[];
  heroImage: string; ogImage: string; subtitle?: string; order: number; pin?: PinMedia;
};

// Site launch date: fallback when a guide has no `published` date. Dates never auto-change on deploy;
// set `updated` (CMS: "Last updated") only on a real content update.
export const PUBLISHED = '2026-11-14';

const DIR = path.join(process.cwd(), 'content', 'guides');
const decode = (s: string) => s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const slugify = (s: string) => s.toLowerCase().replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const PRODUCT_TAG = /^[ \t]*\{%\s*product\b([^%]*?)\/?%\}(?:\s*\{%\s*\/product\s*%\})?[ \t]*$/gm;
const attrs = (s: string) => {
  const o: Record<string, string> = {};
  for (const m of s.matchAll(/(\w+)=(?:"((?:[^"\\]|\\.)*)"|'([^']*)')/g)) o[m[1]] = (m[2] ?? m[3] ?? '').replace(/\\(.)/g, '$1');
  return o;
};
const str = (v: unknown) => (v === undefined || v === null ? '' : String(v));

function parse(file: string): Guide {
  const slug = file.replace(/\.md$/, '');
  const raw = fs.readFileSync(path.join(DIR, file), 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const meta = (m ? YAML.parse(m[1]) : {}) ?? {};
  const body = (m ? m[2] : raw).replace(/^\n+/, '');
  // reading time counts product boxes as their name + reason (same as before the CMS migration)
  const words = body.replace(PRODUCT_TAG, (_x, a) => { const t = attrs(a); return `::: product ${t.name ?? ''} | ${t.why ?? ''}`; }).split(/\s+/).length;

  const toc: TocItem[] = [];
  const marked = new Marked({
    renderer: {
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens);
        if (depth === 2) { const id = slugify(text); toc.push({ id, text: decode(text.replace(/<[^>]+>/g, '')) }); return `<h2 id="${id}">${text}</h2>\n`; }
        return `<h${depth}>${text}</h${depth}>\n`;
      },
    },
  });

  const blocks: Block[] = []; const used = new Set<string>(); let pos = 0; let last = 0;
  const pushHtml = (md: string) => { if (md.trim()) blocks.push({ type: 'html', html: marked.parse(md, { async: false }) as string }); };
  for (const t of body.matchAll(PRODUCT_TAG)) {
    pushHtml(body.slice(last, t.index)); last = t.index! + t[0].length;
    const a = attrs(t[1]); pos++;
    const rich = a.product ? getProduct(a.product) : undefined;
    if (rich && rich.features.length && !used.has(rich.id)) { used.add(rich.id); blocks.push({ type: 'product', product: rich, position: pos }); }
    else blocks.push({ type: 'product', position: pos, product: { id: slugify(a.name ?? ''), name: a.name ?? '', description: a.why ?? '', features: [], pros: [], cons: [], check: [], affiliateUrl: rich?.affiliateUrl } });
  }
  pushHtml(body.slice(last));

  const primary = str(meta.primaryCategory);
  const hero = normImage(meta.heroImage);
  const pin = meta.pin && meta.pin.type && meta.pin.type !== 'none' && meta.pin.src
    ? { type: meta.pin.type, src: str(meta.pin.src), poster: str(meta.pin.poster) || undefined, alt: str(meta.pin.alt) } as PinMedia : undefined;
  const published = str(meta.published) || PUBLISHED;
  return {
    slug, title: str(meta.title), description: str(meta.description), image: `/img/${slug}`, imagealt: str(meta.imagealt), category: str(meta.categoryLabel),
    primaryCategory: primary, categories: [primary, ...((meta.alsoCategories ?? []) as string[]).filter((c) => c && c !== primary)], blocks, toc,
    readingTime: Math.max(3, Math.round(words / 230)), publishedAt: published, updatedAt: str(meta.updated) || published,
    subtitle: str(meta.subtitle) || undefined, author: SITE.author,
    faqs: ((meta.faqs ?? []) as { q: string; a: string }[]).filter((f) => f?.q && f?.a),
    heroImage: hero ?? `/img/${slug}-hero`,
    ogImage: hero ? (/\.[a-z]+$/i.test(hero) ? hero : `${hero}.jpg`) : `/img/${slug}-og.jpg`,
    order: Number(meta.order ?? 999), pin,
  };
}

let cache: Guide[] | null = null;
export function getGuides(): Guide[] {
  return (cache ??= fs.readdirSync(DIR).filter((f) => f.endsWith('.md')).map(parse)
    .sort((a, b) => a.order - b.order || b.publishedAt.localeCompare(a.publishedAt) || a.slug.localeCompare(b.slug)));
}
export function getGuide(slug: string) { return getGuides().find((g) => g.slug === slug); }
export function getGuidesInCategory(cat: string) { return getGuides().filter((g) => g.categories.includes(cat)); }
export function getFeaturedSlugs(): string[] { return BRAND.featuredGuides.filter((s) => getGuide(s)); }
