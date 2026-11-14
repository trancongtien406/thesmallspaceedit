// Central site config. Change brand/URL/email here.
export const SITE = {
  name: 'The Small Space Edit',
  slogan: 'Small spaces. Smarter living.',
  // TODO: set NEXT_PUBLIC_SITE_URL in Vercel to the final domain (e.g. https://thesmallspaceedit.com)
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://thesmallspaceedit.vercel.app').replace(/\/$/, ''),
  pinterest: 'https://www.pinterest.com/thesmallspaceedit_/',
  email: 'hello@example.com', // TODO: replace with the real contact email
  disclosure: 'As an Amazon Associate I earn from qualifying purchases.',
  description:
    'Practical, renter-friendly storage and organization ideas for small apartments: tiny kitchens, no-drill bathrooms, small closets and space-saving finds.',
  // TODO: Pinterest domain claim — set NEXT_PUBLIC_PINTEREST_DOMAIN_VERIFY to the code from
  // Pinterest > Settings > Claimed accounts. It renders <meta name="p:domain_verify" content="..."> on every page.
  pinterestVerify: process.env.NEXT_PUBLIC_PINTEREST_DOMAIN_VERIFY || '',
};
