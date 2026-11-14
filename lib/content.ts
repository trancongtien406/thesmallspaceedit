import fs from 'node:fs';
import path from 'node:path';
import { Marked } from 'marked';
import { matchProduct, type Product } from './products';
import { GUIDE_TAXONOMY } from './taxonomy';
import { FAQS } from './faqs';

export type Block = { type: 'html'; html: string } | { type: 'product'; product: Product; position: number };
export type TocItem = { id: string; text: string };
export type Guide = {
  slug: string; title: string; description: string; image: string; imagealt: string; category: string;
  primaryCategory: string; categories: string[]; blocks: Block[]; toc: TocItem[]; readingTime: number;
  publishedAt: string; updatedAt: string; author: string; faqs: { q: string; a: string }[];
  heroImage: string; ogImage: string; subtitle?: string;
};

// Dates are fixed in front matter (`published:` / `updated:`), never auto-changed on deploy. Set `updated:` only on a real content update.
export const PUBLISHED = '2026-11-14';

const ORDER = [
  'small-kitchen-storage-ideas', 'no-drill-bathroom-storage', 'space-saving-amazon-finds', 'under-sink-organizers',
  'rolling-storage-carts', 'small-closet-organization-hacks', 'vacuum-storage-bags-guide', 'cabinet-shelf-risers',
  'storage-ottomans-small-living-rooms', 'over-the-toilet-storage', 'renter-friendly-organization-hacks',
];
export const FEATURED = ['small-kitchen-storage-ideas', 'no-drill-bathroom-storage', 'space-saving-amazon-finds'];

// Pin creative shown near the end of the matching landing page (Pinterest save-friendly 2:3)
export const PIN_MEDIA: Record<string, { type: 'image' | 'video'; src: string; poster?: string; alt: string }> = {
  'small-kitchen-storage-ideas': { type: 'image', src: '/img/tiny-kitchen-storage-ideas-before-after.jpg', alt: 'Before and after of a small galley kitchen: cluttered counters on the left, clear organized counters with canisters and a utensil rail on the right' },
  'no-drill-bathroom-storage': { type: 'image', src: '/img/no-drill-bathroom-storage-ideas.jpg', alt: 'Small white-tiled bathroom with an over-the-toilet shelf, towel hooks, corner shower caddy and clear vanity organizers' },
  'space-saving-amazon-finds': { type: 'video', src: '/img/space-saving-apartment-finds.mp4', poster: '/img/space-saving-apartment-finds-cover.jpg', alt: 'Video: six space-saving finds for a tiny apartment' },
};

const decode = (s: string) => s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const slugify = (s: string) => s.toLowerCase().replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function parse(slug: string): Guide {
  const raw = fs.readFileSync(path.join(process.cwd(), 'content', `${slug}.md`), 'utf8');
  const [fm, ...rest] = raw.split('\n---\n');
  const meta: Record<string, string> = {};
  for (const line of fm.trim().split('\n')) { const i = line.indexOf(': '); meta[line.slice(0, i)] = line.slice(i + 2); }
  const body = rest.join('\n---\n');
  const words = body.split(/\s+/).length;

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

  const blocks: Block[] = []; const used = new Set<string>(); let pos = 0;
  const parts = body.split(/^::: product (.+?) \| (.+)$/m);
  for (let i = 0; i < parts.length; i += 3) {
    if (parts[i].trim()) blocks.push({ type: 'html', html: marked.parse(parts[i], { async: false }) as string });
    if (i + 2 < parts.length) {
      const name = parts[i + 1], why = parts[i + 2];
      const rich = matchProduct(name);
      pos++;
      if (rich && !used.has(rich.id)) { used.add(rich.id); blocks.push({ type: 'product', product: rich, position: pos }); }
      else blocks.push({ type: 'product', position: pos, product: { id: slugify(name), name, description: why, features: [], pros: [], cons: [], check: [] } });
    }
  }
  const tax = GUIDE_TAXONOMY[slug];
  return {
    slug, title: meta.title, description: meta.description, image: `/img/${slug}`, imagealt: meta.imagealt, category: meta.category,
    primaryCategory: tax.primary, categories: [tax.primary, ...(tax.also ?? [])], blocks, toc,
    readingTime: Math.max(3, Math.round(words / 230)), publishedAt: meta.published || PUBLISHED, updatedAt: meta.updated || meta.published || PUBLISHED, subtitle: meta.subtitle, author: 'The Small Space Edit',
    faqs: FAQS[slug] ?? [], heroImage: `/img/${slug}-hero`, ogImage: `/img/${slug}-og.jpg`,
  };
}

let cache: Guide[] | null = null;
export function getGuides(): Guide[] { return (cache ??= ORDER.map(parse)); }
export function getGuide(slug: string) { return getGuides().find((g) => g.slug === slug); }
export function getGuidesInCategory(cat: string) { return getGuides().filter((g) => g.categories.includes(cat)); }
