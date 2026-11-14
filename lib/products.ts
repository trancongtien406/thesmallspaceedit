// Product recommendations are generic product TYPES. No prices, ratings, stock status or "we tested it" claims.
// Features/pros/cons describe the product TYPE from published product specifications and listing information (no hands-on testing).
// affiliateUrl must be a real Amazon Associates (SiteStripe) link. Until it is set, cards show "Product link coming soon".
export type Product = {
  id: string; name: string; description: string; image?: string; imageAlt?: string; badge?: string;
  features: string[]; pros: string[]; cons: string[]; check: string[]; affiliateUrl?: string; match?: RegExp;
  /** guide that covers this product type in depth (homepage CTA target) */
  guide?: string;
  /** 'illustrative' = AI-generated concept image (NOT the exact product); 'product' = rights-cleared image of the actual linked item */
  imageType?: 'illustrative' | 'product';
};

export const PRODUCTS: Product[] = [
  { id: 'slim-rolling-cart', guide: 'rolling-storage-carts', name: 'Slim Rolling Storage Cart', badge: "Editor's Pick", match: /slim.*(rolling|cart)/i,
    description: 'Turns the narrow gap beside a fridge, washer or vanity into three or four shelves.',
    image: '/img/product-rolling-cart', imageAlt: 'Sage green three-tier rolling cart with spice jars and towels beside a refrigerator',
    features: ['Narrow footprint (often 5–10 in wide)', 'Shelves with raised lips', 'Casters, ideally lockable'],
    pros: ['No installation or drilling', 'Moves between rooms', 'Uses space that is usually wasted'],
    cons: ['Slim models can tip if the top tier is overloaded', 'Small casters roll poorly on thick carpet'],
    check: ['Gap width at floor and top (leave ~½ in each side)', 'Height under countertops', 'Weight limit per shelf'] },
  { id: 'under-sink-pull-out', guide: 'under-sink-organizers', name: 'Two-Tier Pull-Out Under-Sink Organizer', badge: 'Space Saving', match: /(under-sink|under sink).*(sliding|pull-out|organizer)|two-tier.*(under|sliding)/i,
    description: 'Best for making the back of an under-sink cabinet reachable without kneeling and digging.',
    image: '/img/product-under-sink', imageAlt: 'Under-sink cabinet with a two-tier sliding organizer, clear bins and spray bottles on a tension rod',
    features: ['Two sliding tiers', 'Narrow designs that sit beside pipes', 'Some have adjustable heights'],
    pros: ['Uses full cabinet height', 'Brings items at the back to the front', 'No permanent mounting needed'],
    cons: ['Must fit around your specific plumbing', 'Some sliding rails need light assembly'],
    check: ['Width on each side of the drain pipe', 'Height to the bottom of the P-trap', 'Cabinet door clearance'] },
  { id: 'shelf-riser', guide: 'cabinet-shelf-risers', name: 'Expandable Cabinet Shelf Riser', badge: 'Budget Friendly', match: /expandable cabinet shelf riser|stackable cabinet shelf riser/i,
    description: 'Adds a second level inside a cabinet so plates, bowls or mugs stop wasting vertical space.',
    image: '/img/product-shelf-riser', imageAlt: 'Open cabinet with white wire shelf risers holding plates above bowls',
    features: ['Wire, bamboo or coated metal', 'Expandable or stackable options', 'Tool-free'],
    pros: ['Simple way to double a shelf', 'Renter-friendly', 'Works in pantries and vanities too'],
    cons: ['Too short a riser is useless — measure first', 'Cheap risers can bow under heavy stoneware'],
    check: ['Height of the stack that goes underneath + ½ in', 'Interior width and depth', 'Door opening width'] },
  { id: 'over-toilet-shelf', guide: 'over-the-toilet-storage', name: 'Freestanding Over-the-Toilet Shelf', badge: 'Renter-Friendly', match: /freestanding over-the-toilet/i,
    description: 'Adds two to three shelves above the toilet with nothing mounted to the wall.',
    image: '/img/product-over-toilet', imageAlt: 'Slim wood and white shelf over a toilet with rolled towels and baskets',
    features: ['Legs straddle the toilet', 'Open shelves or a closed cabinet', 'Adjustable feet on many models'],
    pros: ['Uses the most-wasted wall in the bathroom', 'No drilling into tile', 'Looks built-in with matching baskets'],
    cons: ['Can be top-heavy — use the anti-tip strap if allowed', 'May block access to the tank lid if too low'],
    check: ['Toilet tank width vs. inside leg width', 'Floor-to-tank-top height', 'Location of the water shut-off valve'] },
  { id: 'storage-ottoman', guide: 'storage-ottomans-small-living-rooms', name: 'Upholstered Storage Ottoman', badge: 'Space Saving', match: /upholstered storage ottoman|rectangular storage ottoman/i,
    description: 'A footrest, extra seat and hidden storage bin in one compact piece.',
    image: '/img/product-ottoman', imageAlt: 'Beige storage ottoman with the lid open showing folded throws and board games',
    features: ['Hinged or lift-off lid', 'Some have a flip-over tray top', 'Rectangular, cube, round or bench shapes'],
    pros: ['Hides blankets, games and chargers', 'Adds seating for guests', 'Works in living room, bedroom or entryway'],
    cons: ['Lightweight folding cubes are not great for sitting', 'Light fabrics show stains'],
    check: ['Walkway clearance (aim for 14–18 in from the sofa)', 'Height relative to your sofa seat', 'Stated weight capacity'] },
  { id: 'vacuum-bags', guide: 'vacuum-storage-bags-guide', name: 'Vacuum Storage Bags (Mixed Sizes)', badge: 'Space Saving', match: /vacuum storage bags/i,
    description: 'Shrinks comforters and off-season clothes into flat slabs that slide under a bed.',
    image: '/img/product-vacuum-bags', imageAlt: 'Flat compressed vacuum storage bags with comforters stacked beside a bed',
    features: ['Airtight zipper + one-way valve', 'Jumbo to small sizes', 'Hand pump included with some sets'],
    pros: ['Huge space savings for bulky bedding', 'Flat bags fit under low beds', 'Keeps fabrics dust-free'],
    cons: ['Not ideal for long-term storage of down, wool or leather', 'Some bags slowly regain air'],
    check: ['Bag sizes vs. what you will store', 'Valve fits your vacuum hose (or pump included)', 'Under-bed clearance'] },
  { id: 'over-door-organizer', guide: 'small-closet-organization-hacks', name: 'Over-the-Door Pocket Organizer', badge: 'Renter-Friendly', match: /over-the-door (pocket|shoe)|over-the-door organizer/i,
    description: 'Full-height storage for shoes, snacks or accessories on the back of any door — no tools.',
    image: '/img/product-over-door', imageAlt: 'Beige over-the-door pocket organizer holding a scarf, wallet and gloves',
    features: ['Hooks over the door top', 'Clear or fabric pockets', 'Various pocket depths'],
    pros: ['Installs in seconds', 'Uses an ignored surface', 'Frees closet floor space'],
    cons: ['Thick hooks can stop some doors from closing', 'Heavy loads can make the door swing'],
    check: ['Door thickness', 'Gap at the top of the door frame', 'Pocket depth for what you will store'] },
  { id: 'tension-shower-caddy', guide: 'no-drill-bathroom-storage', name: 'Tension Pole Shower Caddy', badge: 'No Drilling', match: /tension pole shower caddy/i,
    description: 'Floor-to-ceiling shower shelves held by spring tension instead of screws.',
    image: '/img/product-shower-caddy', imageAlt: 'Bright small bathroom with corner shower shelves and an over-the-toilet shelf',
    features: ['Spring-loaded pole', 'Several adjustable shelves', 'Rust-resistant metals on better models'],
    pros: ['No holes in tile', 'Adds a lot of shower storage', 'Easy to remove when you move'],
    cons: ['Tension can loosen over time — re-check monthly', 'Cheaper finishes may rust'],
    check: ['Floor or tub-edge to ceiling height', 'Corner width', 'Material (stainless or aluminum preferred)'] },
];

export function matchProduct(name: string) { return PRODUCTS.find((p) => p.match?.test(name)); }
// Homepage "Small Space Solutions": 3 cards (review P1 #6)
export const FAVORITES = ['slim-rolling-cart', 'over-toilet-shelf', 'storage-ottoman'].map((id) => PRODUCTS.find((p) => p.id === id)!);
