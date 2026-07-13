/* Ekaika Living — shared product catalog.
   Single source of truth consumed by index.html, collection.html,
   product.html, bag.html and wishlist.html. */

const PRODUCTS = [
  {
    slug: 'ivory-noor-buta',
    category: 'bedsheet',
    categoryLabel: 'Bedsheet',
    name: 'Ivory Noor Buta',
    variant: 'King · Percale weave · Incl. 2 pillow covers',
    price: 5200,
    isNew: false,
    folder: 'bs-Ivory gold Noor Buta',
    images: ['Pic1.png', 'Pic2.png', 'Pic3.png', 'Pic4.png', 'Pic5.png', 'Pic6.png', 'Pic6a.png', 'Pic7.png', 'Pic8.png'],
    sizes: ['King'],
    description: 'A refined floral buta scattered across ivory percale-weave cotton, finished in warm gold. Block-printed by hand and woven with a soft-touch percale finish that turns crisper with every wash. Includes two pillow covers.'
  },
  {
    slug: 'pale-pink-jaal',
    category: 'bedsheet',
    categoryLabel: 'Bedsheet',
    name: 'Pale Pink Jaal',
    variant: 'King / Queen · Incl. 2 pillow covers',
    price: 4800,
    isNew: false,
    folder: 'bs-PalepinkblockPrint',
    images: ['Pic1.png', 'Pic2.png', 'Pic3.png', 'Pic4.png', 'Pic5.png', 'Pic6.png', 'Pic7.png', 'Pic8.png', 'Pic9.png', 'Pic10.png', 'Pic11.png', 'Pic12.png'],
    sizes: ['King', 'Queen'],
    description: 'A delicate lattice pattern in dusty rose, block-printed on 300-thread-count pure cotton. Includes two pillow covers. Each run has subtle variation — the quiet signature of the hand.'
  },
  {
    slug: 'nargis-buta',
    category: 'bedsheet',
    categoryLabel: 'Bedsheet',
    name: 'Nargis Buta',
    variant: 'King · Multicolor · Incl. 2 pillow covers',
    price: 5500,
    isNew: true,
    folder: 'bs-Multicolor Nargis Buta',
    images: ['pic1.png', 'pic2.png', 'pic3.png', 'pic4.png', 'pic5.png', 'pic6.png', 'pic7.png'],
    sizes: ['King'],
    description: 'A joyful multicolor nargis buta in blue, rust and ivory, hand block-printed across pure cotton. A statement piece for a room that wants a little more colour. Includes two pillow covers.'
  },
  {
    slug: 'ivory-chinaar-buta',
    category: 'bedsheet',
    categoryLabel: 'Bedsheet',
    name: 'Ivory Chinaar Buta',
    variant: 'King · Percale weave · Incl. 2 pillow covers',
    price: 4800,
    isNew: false,
    folder: 'bs-Ivory Chinaar Buta -Percale weave',
    images: ['Pic1.png', 'Pic2.png', 'Pic3.png', 'Pic4.png', 'Pic5.png', 'Pic6.png', 'Pic7.png', 'Pic8.png'],
    sizes: ['King'],
    description: 'Inspired by the chinaar leaf, this ivory percale bedsheet is block-printed in green and rust for a quiet, botanical mood. Includes two pillow covers.'
  },
  {
    slug: 'maroon-paisley-jaal',
    category: 'bedsheet',
    categoryLabel: 'Bedsheet',
    name: 'Maroon Paisley Jaal',
    variant: 'King / Queen · Incl. 2 pillow covers',
    price: 4600,
    isNew: false,
    folder: 'bs-White-Maroon-jaal',
    images: ['pic1.png', 'pic2.png', 'pic3.png', 'pic3a.png', 'pic4.png', 'pic5.png', 'pic6.png', 'pic7.png'],
    sizes: ['King', 'Queen'],
    description: 'A classic paisley jaal in deep maroon on white cotton — timeless, warm and built for everyday use. Includes two pillow covers.'
  },
  {
    slug: 'nargis-jaal-quilt',
    category: 'quilt',
    categoryLabel: 'Quilted Bedcover',
    name: 'Nargis Jaal Quilt',
    variant: 'Double · Reversible · Kantha-style quilting',
    price: 8400,
    isNew: true,
    folder: 'bs-Quited reversible',
    images: ['pic1.png', 'pic2.png', 'pic2a.png', 'pic3.png', 'pic4.png', 'pic5.png', 'pic6.png', 'pic7.png', 'pic8.png'],
    sizes: ['Double', 'Queen'],
    description: 'A reversible kantha-style quilted bedcover in teal, pink and ivory. Hand-quilted with running stitches over layered cotton, for a bedcover that gets softer with age.'
  },
  {
    slug: 'mint-buti-bel',
    category: 'cushion',
    categoryLabel: 'Cushion Cover',
    name: 'Mint Buti Bel',
    variant: 'Set of 2 · 16×16 in · Zip closure',
    price: 1600,
    isNew: false,
    folder: 'cc-mintMagentaButiBel',
    images: ['Pic-1.png', 'Pic-2.png', 'Pic-3.png', 'Pic-4.png', 'Pic-5.png', 'Pic-6.png', 'Pic-7.png', 'Pic-8.png'],
    sizes: [],
    description: 'A dainty buti bel vine in mint and magenta, block-printed on pure cotton with a concealed zip closure. Sold as a set of two.'
  },
  {
    slug: 'cyan-nargis',
    category: 'cushion',
    categoryLabel: 'Cushion Cover',
    name: 'Cyan Nargis',
    variant: 'Set of 2 · 16×16 in · Zip closure',
    price: 1600,
    isNew: true,
    folder: 'cc-cyan-pinkSmallFlowers',
    images: ['Pic1.png', 'Pic2.png', 'Pic3.png', 'Pic4.png', 'Pic5.png', 'Pic6.png'],
    sizes: [],
    description: 'Cyan and pink nargis blossoms scattered across natural cotton, block-printed by hand. Sold as a set of two with concealed zip closure.'
  },
  {
    slug: 'ivory-rose-bouquet',
    category: 'cushion',
    categoryLabel: 'Cushion Cover',
    name: 'Ivory Rose Bouquet',
    variant: 'Single · 16×16 in · Zip closure',
    price: 950,
    isNew: false,
    folder: 'cc-ivory-rose-print',
    images: ['Pic-1.png', 'Pic-2.png', 'Pic-2a.png', 'Pic-3.png', 'Pic-4.png', 'Pic-5.png', 'Pic-6.png'],
    sizes: [],
    description: 'A single rose bouquet motif in dusty rose on ivory cotton — soft, romantic and easy to layer with other prints. Sold as a single cover with concealed zip closure.'
  },
  {
    slug: 'teal-hibiscus-jaal',
    category: 'cushion',
    categoryLabel: 'Cushion Cover',
    name: 'Teal Hibiscus Jaal',
    variant: 'Single · 16×16 in · Zip closure',
    price: 950,
    isNew: true,
    folder: 'cc-cyanMagentaJaal',
    images: ['Pic1.png', 'Pic1_bench.png', 'Pic2.png', 'Pic3.png', 'Pic4.png', 'Pic5.png', 'Pic6.png'],
    sizes: [],
    description: 'A teal and magenta hibiscus jaal on a forest-green ground, block-printed by hand. Sold as a single cover with concealed zip closure.'
  },
  {
    slug: 'maroon-butterfly',
    category: 'cushion',
    categoryLabel: 'Cushion Cover',
    name: 'Maroon Butterfly',
    variant: 'Set of 2 · 16×16 in · Zip closure',
    price: 1600,
    isNew: false,
    folder: 'cc-maroonGreyButterfly',
    images: ['Pic1.png', 'Pic2.png', 'Pic3.png', 'Pic4.png', 'Pic5.png', 'Pic6.png'],
    sizes: [],
    description: 'Maroon butterflies in flight across ivory cotton, hand block-printed with a soft, storybook charm. Sold as a set of two.'
  },
  {
    slug: 'rose-stripe-kantha',
    category: 'cushion',
    categoryLabel: 'Cushion Cover',
    name: 'Rose Stripe Kantha',
    variant: 'Single · 16×16 in · Kantha quilted',
    price: 950,
    isNew: false,
    folder: 'cc-maroonStripes',
    images: ['Pic-1.png', 'Pic-2.png', 'Pic-3.png', 'Pic-4.png', 'Pic-5.png', 'Pic-5a.png', 'Pic-6.png'],
    sizes: [],
    description: 'A rose and white stripe, finished with fine kantha quilting stitches for texture and warmth. Sold as a single cover with concealed zip closure.'
  }
];

function productImagePath(product, filename) {
  return encodeURI(product.folder + '/' + filename);
}

function productCoverImage(product) {
  return productImagePath(product, product.images[0]);
}

function findProduct(slug) {
  return PRODUCTS.find(p => p.slug === slug);
}

function formatPrice(amount) {
  return '₹ ' + amount.toLocaleString('en-IN');
}
