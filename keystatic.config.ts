// Keystatic CMS — admin UI at /keystatic (/admin redirects there).
// Local dev: edits files on disk. Production: GitHub mode, every save is a commit to main → Vercel redeploys (~1 min).
import { config, collection, singleton, fields } from '@keystatic/core';
import { block } from '@keystatic/core/content-components';
import brand from './content/settings/brand.json';

const REPO = { owner: 'trancongtien406', name: 'thesmallspaceedit' } as const;
const categoryOptions = brand.categories.map((c) => ({ label: c.title, value: c.slug }));
const hex = (label: string) => fields.text({ label, validation: { isRequired: true, pattern: { regex: /^#[0-9a-fA-F]{3,8}$/, message: 'Use a hex color like #263C34' } } });

export default config({
  storage: process.env.NODE_ENV === 'development' && !process.env.KEYSTATIC_GITHUB_CLIENT_ID
    ? { kind: 'local' }
    : { kind: 'github', repo: REPO },
  ui: {
    brand: { name: `${brand.name} admin` },
    navigation: { Content: ['guides', 'products'], Settings: ['brand'] },
  },
  collections: {
    products: collection({
      label: 'Products',
      path: 'content/products/*',
      format: { data: 'yaml' },
      slugField: 'name',
      columns: ['badge', 'category'],
      schema: {
        name: fields.slug({ name: { label: 'Product name', description: 'Generic product type, e.g. "Slim Rolling Storage Cart". No brand claims, prices or ratings.' },
          slug: { label: 'Product ID', description: 'Used in guides: {% product … product="this-id" /%}. Do not change after publishing.' } }),
        badge: fields.select({ label: 'Badge', defaultValue: '', options: [
          { label: '(none)', value: '' }, { label: "Editor's Pick", value: "Editor's Pick" }, { label: 'Space Saving', value: 'Space Saving' },
          { label: 'Budget Friendly', value: 'Budget Friendly' }, { label: 'Renter-Friendly', value: 'Renter-Friendly' }, { label: 'No Drilling', value: 'No Drilling' } ] }),
        category: fields.select({ label: 'Category', options: categoryOptions, defaultValue: categoryOptions[0].value }),
        guide: fields.relationship({ label: 'Main guide', description: 'Homepage card button "Explore the Guide" links here.', collection: 'guides' }),
        description: fields.text({ label: 'Short description', multiline: true, validation: { isRequired: true } }),
        image: fields.image({ label: 'Image', description: 'Square image works best (600×600+). AI images must keep "Illustrative image" below.', directory: 'public/img/products', publicPath: '/img/products/' }),
        imageAlt: fields.text({ label: 'Image alt text', description: 'Describe what the image literally shows.' }),
        imageType: fields.select({ label: 'Image label', defaultValue: 'illustrative', options: [
          { label: 'Illustrative image (AI / concept — default)', value: 'illustrative' }, { label: 'Product image (real photo of the linked item, rights cleared)', value: 'product' } ] }),
        features: fields.array(fields.text({ label: 'Feature' }), { label: 'Key features (max 3 shown)', itemLabel: (p) => p.value }),
        pros: fields.array(fields.text({ label: 'Pro' }), { label: 'Why it helps (max 2 shown)', itemLabel: (p) => p.value }),
        cons: fields.array(fields.text({ label: 'Con' }), { label: 'Watch out for (max 2 shown)', itemLabel: (p) => p.value }),
        check: fields.array(fields.text({ label: 'Measurement / check' }), { label: 'Measure before you buy', itemLabel: (p) => p.value }),
        affiliateUrl: fields.text({ label: 'Amazon affiliate link', description: 'Your Amazon Associates SiteStripe link (https://amzn.to/… or https://www.amazon.com/…?tag=…). Leave empty to show "Product link coming soon".',
          validation: { pattern: { regex: /^$|^https:\/\/(www\.)?(amazon\.com|amzn\.to)\//, message: 'Must be an amazon.com or amzn.to link' } } }),
      },
    }),
    guides: collection({
      label: 'Guides',
      path: 'content/guides/*',
      format: { contentField: 'body' },
      slugField: 'title',
      entryLayout: 'content',
      columns: ['primaryCategory', 'published'],
      schema: {
        title: fields.slug({ name: { label: 'Title (H1)' }, slug: { label: 'URL slug', description: '/guides/<slug>/ — do not change after publishing (breaks Pinterest links).' } }),
        subtitle: fields.text({ label: 'Subtitle (shown under the title)', multiline: true }),
        description: fields.text({ label: 'Meta description (SEO, ~150 characters)', multiline: true, validation: { isRequired: true } }),
        categoryLabel: fields.text({ label: 'Short topic label', description: 'e.g. Kitchen, Bathroom, Finds' }),
        primaryCategory: fields.select({ label: 'Main category', options: categoryOptions, defaultValue: categoryOptions[0].value }),
        alsoCategories: fields.multiselect({ label: 'Also show in categories', options: categoryOptions }),
        heroImage: fields.image({ label: 'Hero image (optional)', description: 'Landscape 3:2, ~1200×800. Empty = keep the current built-in image.', directory: 'public/img/guides', publicPath: '/img/guides/' }),
        imagealt: fields.text({ label: 'Hero image alt text' }),
        order: fields.integer({ label: 'Sort order', description: 'Lower = shown first. New guides: use 5 to put it first, 999 for last.', defaultValue: 999 }),
        published: fields.date({ label: 'Published date', defaultValue: { kind: 'today' } }),
        updated: fields.date({ label: 'Last updated (only after a real content update)' }),
        faqs: fields.array(fields.object({ q: fields.text({ label: 'Question' }), a: fields.text({ label: 'Answer', multiline: true }) }),
          { label: 'FAQ', itemLabel: (p) => p.fields.q.value || 'Question' }),
        pin: fields.object({
          type: fields.select({ label: 'Pin media type', defaultValue: 'none', options: [{ label: 'None (use built-in 2:3 image)', value: 'none' }, { label: 'Image', value: 'image' }, { label: 'Video', value: 'video' }] }),
          src: fields.text({ label: 'Pin file path', description: 'e.g. /img/my-pin.jpg (file in public/img)' }),
          poster: fields.text({ label: 'Video cover path (video only)' }),
          alt: fields.text({ label: 'Pin alt text', multiline: true }),
        }, { label: 'Pinterest pin shown at the end of the guide' }),
        body: fields.markdoc({
          label: 'Guide body',
          extension: 'md',
          components: {
            product: block({
              label: 'Product box',
              description: 'Recommendation card. Pick a product for the full card; otherwise a compact box is shown.',
              schema: {
                name: fields.text({ label: 'Product type name' }),
                why: fields.text({ label: 'Why (one line)' }),
                product: fields.relationship({ label: 'Product (optional, full card)', collection: 'products' }),
              },
            }),
          },
        }),
      },
    }),
  },
  singletons: {
    brand: singleton({
      label: 'Brand & niche settings',
      path: 'content/settings/brand',
      format: { data: 'json' },
      schema: {
        name: fields.text({ label: 'Site name', validation: { isRequired: true } }),
        slogan: fields.text({ label: 'Slogan' }),
        seoTitle: fields.text({ label: 'Homepage SEO title' }),
        tagline: fields.text({ label: 'Footer tagline' }),
        description: fields.text({ label: 'Site description (SEO)', multiline: true }),
        siteUrl: fields.url({ label: 'Site URL', description: 'Vercel env NEXT_PUBLIC_SITE_URL overrides this.' }),
        email: fields.text({ label: 'Contact email' }),
        author: fields.text({ label: 'Author name on guides' }),
        pinterestUrl: fields.url({ label: 'Pinterest profile URL' }),
        pinterestVerify: fields.text({ label: 'Pinterest domain verification code' }),
        hero: fields.object({
          eyebrow: fields.text({ label: 'Eyebrow' }),
          titleLine1: fields.text({ label: 'Title line 1' }),
          titleLine2: fields.text({ label: 'Title line 2' }),
          lead: fields.text({ label: 'Intro text', multiline: true }),
          image: fields.text({ label: 'Hero image path', description: '/img/home-hero (no extension = .webp + .jpg) or a full file path' }),
          imageAlt: fields.text({ label: 'Hero image alt text' }),
          trust: fields.array(fields.text({ label: 'Point' }), { label: 'Trust points', itemLabel: (p) => p.value }),
        }, { label: 'Homepage hero' }),
        colors: fields.object({
          background: hex('Background'), surface: hex('Card surface'), surfaceMuted: hex('Muted surface'), cream: hex('Cream'), sand: hex('Sand'),
          sage: hex('Sage (accent)'), sageLight: hex('Sage light'), terracotta: hex('Terracotta (highlight)'), forest: hex('Forest (primary / buttons)'),
          forestLight: hex('Forest light (hover)'), forestDark: hex('Forest dark'), textPrimary: hex('Text'), textSecondary: hex('Secondary text'), border: hex('Borders'),
        }, { label: 'Colors' }),
        categories: fields.array(fields.object({
          slug: fields.text({ label: 'URL slug', description: '/<slug>/ — do not change after publishing' }),
          title: fields.text({ label: 'Name' }), short: fields.text({ label: 'Short name' }), h1: fields.text({ label: 'Page title (H1)' }),
          description: fields.text({ label: 'Description', multiline: true }),
          image: fields.text({ label: 'Image path', description: '/img/cat-x (no extension) or full path to an image in public/' }),
          imageAlt: fields.text({ label: 'Image alt text' }),
        }), { label: 'Categories', itemLabel: (p) => p.fields.title.value || 'Category' }),
        featuredGuides: fields.array(fields.relationship({ label: 'Guide', collection: 'guides' }), { label: 'Homepage featured guides (3)', itemLabel: (p) => p.value ?? '' }),
        homepageProducts: fields.array(fields.relationship({ label: 'Product', collection: 'products' }), { label: 'Homepage "Small Space Solutions" (3)', itemLabel: (p) => p.value ?? '' }),
      },
    }),
  },
});
