export type Category = { slug: string; title: string; short: string; h1: string; description: string; image: string; imageAlt: string };

export const CATEGORIES: Category[] = [
  { slug: 'small-kitchen', title: 'Small Kitchen', short: 'Kitchen', h1: 'Small Kitchen Organization Ideas',
    description: 'A tiny kitchen can work as hard as a big one when every cabinet, wall and gap has a job. These guides cover cabinet shelf risers, under-sink organizers, wall rails and slim rolling carts, with honest advice on measuring and choosing renter-friendly organizers that make cooking in a small apartment kitchen easier and calmer.',
    image: '/img/cat-small-kitchen', imageAlt: 'Small kitchen with a sage green rolling cart, glass canisters, a magnetic knife strip and a wall utensil rail' },
  { slug: 'bathroom-storage', title: 'Bathroom Storage', short: 'Bathroom', h1: 'Small Bathroom Storage Ideas',
    description: 'Apartment bathrooms rarely come with enough storage, and most leases rule out drilling into tile. Our bathroom guides focus on no-drill solutions such as over-the-toilet shelves, tension pole caddies, over-the-door hooks and vanity organizers, plus installation tips that protect your walls and your security deposit.',
    image: '/img/cat-bathroom-storage', imageAlt: 'Narrow bathroom with a wooden over-the-toilet shelf holding rolled sage towels and woven baskets' },
  { slug: 'closet-organization', title: 'Closet Organization', short: 'Closet', h1: 'Small Closet Organization Ideas',
    description: 'One small reach-in closet can hold far more than you think. These guides walk through slim hangers, double hang rods, hanging shelves, door storage and vacuum storage bags for off-season clothes, so you can keep everything visible, reachable and out of the chair pile in a small bedroom.',
    image: '/img/cat-closet-organization', imageAlt: 'Small reach-in closet with matching hangers, a hanging shelf organizer, fabric bins and an over-the-door shoe organizer' },
  { slug: 'renter-friendly', title: 'Renter-Friendly', short: 'Renter-Friendly', h1: 'Renter-Friendly Organization Ideas',
    description: 'No holes, no paint, no problem. Our renter-friendly guides collect damage-free ways to add storage and style to a rental apartment, including adhesive hooks, tension rods, freestanding shelves and plug-in lighting, along with tips for removing everything cleanly when your lease ends.',
    image: '/img/cat-renter-friendly', imageAlt: 'Rental apartment corner with adhesive wall hooks, a floating shelf, a plug-in wall sconce and a console table with baskets' },
  { slug: 'space-saving-furniture', title: 'Space-Saving Furniture', short: 'Furniture', h1: 'Space-Saving Furniture for Small Apartments',
    description: 'In a small apartment, every piece of furniture should earn its spot. These guides cover storage ottomans, rolling carts, over-the-toilet units and other multi-purpose pieces, explaining what to measure and which features matter so you can add storage without crowding the room.',
    image: '/img/cat-space-saving-furniture', imageAlt: 'Beige storage ottoman with its lid open showing folded blankets beside a cream sofa' },
];
export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug);

// primary category (breadcrumb) + extra categories each guide is listed in
export const GUIDE_TAXONOMY: Record<string, { primary: string; also?: string[] }> = {
  'small-kitchen-storage-ideas': { primary: 'small-kitchen', also: ['renter-friendly'] },
  'no-drill-bathroom-storage': { primary: 'bathroom-storage', also: ['renter-friendly'] },
  'space-saving-amazon-finds': { primary: 'space-saving-furniture', also: ['renter-friendly'] },
  'under-sink-organizers': { primary: 'small-kitchen', also: ['bathroom-storage'] },
  'rolling-storage-carts': { primary: 'space-saving-furniture', also: ['small-kitchen'] },
  'small-closet-organization-hacks': { primary: 'closet-organization' },
  'vacuum-storage-bags-guide': { primary: 'closet-organization' },
  'cabinet-shelf-risers': { primary: 'small-kitchen' },
  'storage-ottomans-small-living-rooms': { primary: 'space-saving-furniture' },
  'over-the-toilet-storage': { primary: 'bathroom-storage', also: ['space-saving-furniture'] },
  'renter-friendly-organization-hacks': { primary: 'renter-friendly' },
};
