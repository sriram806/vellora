import { PDPExtraData } from '../types/pdp-types';

export const pdpExtraDataMap: Record<string, PDPExtraData> = {
  'vellora-signature-tee': {
    sku: 'VL-TEE-092-AE',
    fit: 'Relaxed',
    designerNotes: 'The Signature Silk-Cotton Tee was conceived as a study in pure form and texture. Designed with a slightly dropped shoulder, a wider clean collar band, and a custom drape that emphasizes movement. The blending of organic cotton and mulberry silk offers a subtle, premium luster that catches the light naturally.',
    countryOfOrigin: 'Italy',
    sustainabilityScore: 92,
    sustainabilityBadges: ['Organic Material', 'Fair Trade Certified', 'Low Carbon Production'],
    fabricWeight: '240 GSM',
    fabricFinish: 'Silket Soft Wash',
    emiOptions: [
      { bank: 'Chase Premium', months: 3, amountPerMonth: 60 },
      { bank: 'Amex Platinum', months: 6, amountPerMonth: 30 }
    ],
    specs: {
      materials: [
        { name: 'Organic Long-Staple Cotton', percentage: 70, description: 'Harvested by hand to preserve the extra-long fibers for maximum strength and breathability.' },
        { name: 'Mulberry Silk', percentage: 30, description: 'Finest 18-momme Grade 6A silk strands for a liquid drape, natural thermal regulation, and high-end sheen.' }
      ],
      dimensions: [
        { size: 'XS', chest: '36 in', length: '26 in', sleeve: '8 in' },
        { size: 'S', chest: '38 in', length: '26.8 in', sleeve: '8.3 in' },
        { size: 'M', chest: '40 in', length: '27.5 in', sleeve: '8.7 in' },
        { size: 'L', chest: '42 in', length: '28.3 in', sleeve: '9 in' },
        { size: 'XL', chest: '44 in', length: '29.1 in', sleeve: '9.4 in' }
      ],
      careInstructions: [
        'Dry clean recommended to preserve silk luster and texture.',
        'If washing at home, hand wash cold with luxury pH-neutral silk detergent.',
        'Do not wring. Press gently between towels to remove excess water.',
        'Dry flat in the shade. Cool iron on the reverse side if necessary.'
      ],
      shippingInfo: 'Complimentary carbon-neutral express shipping globally. Signature required upon delivery to ensure safety.',
      returnsInfo: 'Exchanges or refunds are accepted within 30 days of delivery. Items must be returned in their original packaging with tags and security seals intact.',
      warrantyInfo: '2-year luxury craftsmanship guarantee. Covers seams, color fastness, and structural integrity.',
      faqs: [
        { question: 'Does the fabric shrink after washing?', answer: 'Due to the double-pre-shrunk nature of our Pima cotton and silk blends, shrinkage is minimal (under 1.5%) if cared for according to instructions.' },
        { question: 'Is the neckband prone to stretching?', answer: 'No, the neckband is reinforced with double-needle tailoring and low-density elastane to retain its clean shape over years of wear.' }
      ]
    },
    story: [
      {
        title: 'The Art of Mulberry Silk',
        subtitle: 'Uncompromising Raw Materials',
        description: 'Every yarn begins in the hills of Como, Italy, where mulberry silkworms feed exclusively on mulberry leaves. The resulting thread is spun with long-staple organic cotton to achieve an elevated drape that feels cool against the skin.',
        imageUrl: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=1200&auto=format&fit=crop',
        layout: 'left-image',
        parallaxSpeed: 15
      },
      {
        title: 'Crafted in Tuscany',
        subtitle: 'Generation of Tailors',
        description: 'Our partner atelier in Florence has been constructing luxury garments for over seventy years. Each seam is hand-finished with meticulous double-needle stitching, ensuring longevity and a premium interior finish.',
        imageUrl: 'https://images.unsplash.com/photo-1558603668-6570496b66f8?w=1200&auto=format&fit=crop',
        layout: 'right-image',
        parallaxSpeed: -10
      }
    ],
    outfit: [
      { id: 'sartorial-pleated-trousers', name: 'Sartorial Pleated Trousers', price: 580, category: 'pants', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop' },
      { id: 'vellora-court-sneaker', name: 'Aether Calfskin Court Sneaker', price: 490, category: 'sneakers', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop' },
      { id: 'vellora-calfskin-tote', name: 'Aether Calfskin Holdall Tote', price: 1250, category: 'accessories', image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=600&auto=format&fit=crop' }
    ],
    delivery: {
      freeShippingThreshold: 300,
      expressShippingCost: 25,
      expressDeliveryDays: 2,
      standardDeliveryDays: 5,
      returnWindowDays: 30
    }
  },
  'sartorial-pleated-trousers': {
    sku: 'VL-TR-308-SM',
    fit: 'Relaxed',
    designerNotes: 'Merging historical menswear tailoring with modern fluid shapes. These pleated trousers feature a high rise, side-adjusters, and a soft, unstructured drape. Tailored from virgin wool and cashmere in Biella, Italy, they offer an elegant flow with a customized feel.',
    countryOfOrigin: 'Italy',
    sustainabilityScore: 88,
    sustainabilityBadges: ['Traceable Wool', 'Hand-Crafted Atelier', 'Zero Waste Patterning'],
    fabricWeight: '310 GSM',
    fabricFinish: 'Brushed Cashmere Softness',
    emiOptions: [
      { bank: 'Chase Premium', months: 3, amountPerMonth: 193 },
      { bank: 'Amex Platinum', months: 6, amountPerMonth: 97 }
    ],
    specs: {
      materials: [
        { name: 'Italian Virgin Wool', percentage: 90, description: 'Sourced from the historic wool mills in Biella, offering resilience and breathable insulation.' },
        { name: 'Pure Cashmere', percentage: 10, description: 'Added to provide silk-like softness and luxury insulation.' }
      ],
      dimensions: [
        { size: '46', chest: 'N/A', length: '32 in', waist: '31 in' },
        { size: '48', chest: 'N/A', length: '32.5 in', waist: '33 in' },
        { size: '50', chest: 'N/A', length: '33 in', waist: '35 in' },
        { size: '52', chest: 'N/A', length: '33.5 in', waist: '37 in' },
        { size: '54', chest: 'N/A', length: '34 in', waist: '39 in' }
      ],
      careInstructions: [
        'Dry clean only by specialists in wool care.',
        'Hang on wide wood hangers to retain waistband structure.',
        'Steam lightly to release creases. Avoid direct hot ironing.'
      ],
      shippingInfo: 'Complimentary carbon-neutral express shipping globally.',
      returnsInfo: 'Exchanges or refunds are accepted within 30 days. Pants that have been tailored or hemmed are non-returnable.',
      warrantyInfo: '3-year luxury craftsmanship guarantee. Covers stitching, buckles, and zipper units.',
      faqs: [
        { question: 'Do the pants come hemmed?', answer: 'Our trousers come with unfinished cuffs, allowing you to seek personal tailoring for the exact perfect break at the ankle.' }
      ]
    },
    story: [
      {
        title: 'Biella Wool Heritage',
        subtitle: 'The Cradle of Weaving',
        description: 'Sourced from wool mills in Biella, Italy, operating since the 17th century. The pure mountain waters of the region are used to wash the raw fibers, unlocking an unmatched loft and softness.',
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&auto=format&fit=crop',
        layout: 'left-image',
        parallaxSpeed: 10
      }
    ],
    outfit: [
      { id: 'vellora-signature-tee', name: 'Signature Silk-Cotton Tee', price: 180, category: 't-shirts', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop' },
      { id: 'aether-cashmere-overcoat', name: 'Aether Double-Breasted Cashmere Coat', price: 2400, category: 'outerwear', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop' }
    ],
    delivery: {
      freeShippingThreshold: 300,
      expressShippingCost: 25,
      expressDeliveryDays: 2,
      standardDeliveryDays: 5,
      returnWindowDays: 30
    }
  },
  'vellora-court-sneaker': {
    sku: 'VL-SK-551-CT',
    fit: 'Regular',
    designerNotes: 'A minimalist low-top silhouette featuring a custom Margom rubber sole and Italian calfskin leather. Double-stitched seams and full lambskin lining provide long-term durability and soft, blister-free wear.',
    countryOfOrigin: 'Italy',
    sustainabilityScore: 85,
    sustainabilityBadges: ['LWG Gold Certified Leather', 'Natural Rubber Sole', 'Local Craftsmanship'],
    fabricWeight: 'Premium Heavy Leather',
    fabricFinish: 'Aniline Full-Grain',
    emiOptions: [
      { bank: 'Chase Premium', months: 3, amountPerMonth: 163 },
      { bank: 'Amex Platinum', months: 6, amountPerMonth: 82 }
    ],
    specs: {
      materials: [
        { name: 'Italian Full-Grain Calfskin', percentage: 100, description: 'Supple yet supportive, naturally breathable leather upper.' },
        { name: 'Lambskin Lining', percentage: 100, description: 'Premium glove leather lining that molds to the foot.' }
      ],
      dimensions: [
        { size: '40', chest: 'N/A', length: '26.7 cm' },
        { size: '41', chest: 'N/A', length: '27.3 cm' },
        { size: '42', chest: 'N/A', length: '28.0 cm' },
        { size: '43', chest: 'N/A', length: '28.7 cm' },
        { size: '44', chest: 'N/A', length: '29.3 cm' },
        { size: '45', chest: 'N/A', length: '30.0 cm' }
      ],
      careInstructions: [
        'Wipe clean with a soft, damp cloth.',
        'Use premium white leather cream to nourish and protect.',
        'Insert cedar shoe trees to absorb moisture and maintain shape.'
      ],
      shippingInfo: 'Complimentary express shipping in premium dustbag and box packaging.',
      returnsInfo: 'Exchanges or refunds are accepted within 30 days. Sole must show zero signs of wear; try them on on a carpeted surface.',
      warrantyInfo: '1-year guarantee on sole bonding and stitching.',
      faqs: [
        { question: 'Do these run true to size?', answer: 'We recommend sizing down if you are in-between sizes, as premium calfskin leather will stretch slightly and mold to your feet.' }
      ]
    },
    story: [
      {
        title: 'Master Shoemakers of Marche',
        subtitle: 'Hand-Lasted Precision',
        description: 'Handcrafted in Civitanova Marche, Italy—the global heartland of luxury shoemaking. Every pair is individually lasted and hand-finished with signature gold-leaf serial stamps.',
        imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1200&auto=format&fit=crop',
        layout: 'left-image',
        parallaxSpeed: 10
      }
    ],
    outfit: [
      { id: 'vellora-signature-tee', name: 'Signature Silk-Cotton Tee', price: 180, category: 't-shirts', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop' },
      { id: 'sartorial-pleated-trousers', name: 'Sartorial Pleated Trousers', price: 580, category: 'pants', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop' }
    ],
    delivery: {
      freeShippingThreshold: 300,
      expressShippingCost: 25,
      expressDeliveryDays: 2,
      standardDeliveryDays: 5,
      returnWindowDays: 30
    }
  },
  'aether-cashmere-overcoat': {
    sku: 'VL-CO-800-CM',
    fit: 'Oversized',
    designerNotes: 'A signature double-breasted coat crafted from pure 100% Italian cashmere. Featuring an unstructured shoulders design, hand-rolled edges, and deep side welt pockets. It sits beautifully as a statement layer over tees or tailoring.',
    countryOfOrigin: 'Italy',
    sustainabilityScore: 94,
    sustainabilityBadges: ['100% Recyclable Fiber', 'Organic Dyeing Process', 'Artisanal Assembly'],
    fabricWeight: '460 GSM',
    fabricFinish: 'Zibeline Ripple Polish',
    emiOptions: [
      { bank: 'Chase Premium', months: 3, amountPerMonth: 800 },
      { bank: 'Amex Platinum', months: 6, amountPerMonth: 400 }
    ],
    specs: {
      materials: [
        { name: 'Grade-A Italian Cashmere', percentage: 100, description: 'Superfine cashmere threads sorted by length and purity to provide extreme thermal properties and a weightless feel.' }
      ],
      dimensions: [
        { size: '48', chest: '44 in', length: '46 in', sleeve: '25 in' },
        { size: '50', chest: '46 in', length: '47 in', sleeve: '25.6 in' },
        { size: '52', chest: '48 in', length: '48 in', sleeve: '26 in' },
        { size: '54', chest: '50 in', length: '49 in', sleeve: '26.5 in' }
      ],
      careInstructions: [
        'Professional dry clean only.',
        'Store in a breathable garment bag with cedar blocks.',
        'Use a specialized cashmere brush to remove surface pills.'
      ],
      shippingInfo: 'Complimentary courier shipping. Delivered in a luxury garment bag and heavy wood hanger.',
      returnsInfo: 'Exchanges or refunds are accepted within 30 days. Security tag must remain attached.',
      warrantyInfo: 'Lifetime craftsmanship guarantee on seams, buttons, and fabric structural failures.',
      faqs: [
        { question: 'Is the coat fully lined?', answer: 'No, this coat uses double-faced unlined craftsmanship with hidden hand-stitched seams, allowing the cashmere to drape naturally and conform to the wearer.' }
      ]
    },
    story: [
      {
        title: 'The Softest Fiber on Earth',
        subtitle: 'Sourced from Alashan',
        description: 'Our cashmere is collected through gentle hand-combing of cashmere goats in Alashan, Mongolia, during spring. Only the finest undercoat fibers are selected and transported to Italy for processing.',
        imageUrl: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=1200&auto=format&fit=crop',
        layout: 'left-image',
        parallaxSpeed: 12
      }
    ],
    outfit: [
      { id: 'vellora-signature-tee', name: 'Signature Silk-Cotton Tee', price: 180, category: 't-shirts', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop' },
      { id: 'sartorial-pleated-trousers', name: 'Sartorial Pleated Trousers', price: 580, category: 'pants', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop' },
      { id: 'vellora-court-sneaker', name: 'Aether Calfskin Court Sneaker', price: 490, category: 'sneakers', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop' }
    ],
    delivery: {
      freeShippingThreshold: 300,
      expressShippingCost: 25,
      expressDeliveryDays: 2,
      standardDeliveryDays: 5,
      returnWindowDays: 30
    }
  }
};

const defaultPDPExtra = (productId: string): PDPExtraData => ({
  sku: `VL-PR-${productId.slice(0, 3).toUpperCase()}-99`,
  fit: 'Regular',
  designerNotes: 'Designed under the theme of luxury comfort. Featuring clean modern tailoring, high-quality finishes, and architectural lines that work well as part of any capsule wardrobe.',
  countryOfOrigin: 'Portugal',
  sustainabilityScore: 82,
  sustainabilityBadges: ['Eco-Conscious Packaging', 'Ethically Sourced Fabric'],
  fabricWeight: '220 GSM',
  fabricFinish: 'Classic Soft Wash',
  emiOptions: [
    { bank: 'Chase Premium', months: 3, amountPerMonth: 50 }
  ],
  specs: {
    materials: [
      { name: 'Sourced Fabric Blend', percentage: 100, description: 'High-quality fibers selected for durability and comfort.' }
    ],
    dimensions: [
      { size: 'S', chest: '38 in', length: '27 in' },
      { size: 'M', chest: '40 in', length: '28 in' },
      { size: 'L', chest: '42 in', length: '29 in' }
    ],
    careInstructions: [
      'Machine wash cold on gentle cycle.',
      'Hang dry in shade to prevent fading.',
      'Warm iron if needed.'
    ],
    shippingInfo: 'Complimentary standard shipping on orders above $300.',
    returnsInfo: 'Easy returns within 30 days.',
    warrantyInfo: '1-year craftsmanship warranty.',
    faqs: [
      { question: 'Where is this item made?', answer: 'This item is crafted in our state-of-the-art partner facility in Portugal.' }
    ]
  },
  story: [
    {
      title: 'Minimalist Architecture',
      subtitle: 'Form Follows Function',
      description: 'Creating structures that merge naturally with daily environments. The garment features seamless detailing and zero clutter, keeping the focus entirely on structural drape.',
      imageUrl: 'https://images.unsplash.com/photo-1517462964-21fdcec3f25b?w=1200&auto=format&fit=crop',
      layout: 'left-image'
    }
  ],
  outfit: [],
  delivery: {
    freeShippingThreshold: 300,
    expressShippingCost: 25,
    expressDeliveryDays: 3,
    standardDeliveryDays: 6,
    returnWindowDays: 30
  }
});

export function getPDPExtraData(productId: string): PDPExtraData {
  return pdpExtraDataMap[productId] || defaultPDPExtra(productId);
}
