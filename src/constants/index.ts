import type {
  NavItem,
  SocialLink,
  FooterSection,
  SizeChartEntry,
  FilterOption,
  PriceRange,
  SortOption,
  Category,
  Testimonial,
  StoreLocation,
} from "@/types";

// ============================================
// Navigation
// ============================================

export const NAV_ITEMS: NavItem[] = [
  {
    label: "New Arrivals",
    href: "/new-arrivals",
    featured: true,
  },
  {
    label: "Collections",
    href: "/collections",
    children: [
      { label: "Midnight Noir", href: "/collections/midnight-noir" },
      { label: "Arctic Luxe", href: "/collections/arctic-luxe" },
      { label: "Urban Edge", href: "/collections/urban-edge" },
      { label: "Silk Road", href: "/collections/silk-road" },
      { label: "Neo Tokyo", href: "/collections/neo-tokyo" },
      { label: "Coastal Dusk", href: "/collections/coastal-dusk" },
    ],
  },
  {
    label: "Categories",
    href: "/categories",
    children: [
      { label: "T-Shirts", href: "/categories/t-shirts" },
      { label: "Shirts", href: "/categories/shirts" },
      { label: "Pants", href: "/categories/pants" },
      { label: "Jackets", href: "/categories/jackets" },
      { label: "Dresses", href: "/categories/dresses" },
      { label: "Hoodies", href: "/categories/hoodies" },
      { label: "Sneakers", href: "/categories/sneakers" },
      { label: "Accessories", href: "/categories/accessories" },
    ],
  },
  {
    label: "Trending",
    href: "/trending",
  },
  {
    label: "About",
    href: "/about",
  },
];

// ============================================
// Social Links
// ============================================

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: "Instagram",
    href: "https://instagram.com/JCOPS",
    icon: "instagram",
  },
  {
    platform: "Twitter",
    href: "https://twitter.com/JCOPS",
    icon: "twitter",
  },
  {
    platform: "Facebook",
    href: "https://facebook.com/JCOPS",
    icon: "facebook",
  },
  {
    platform: "Pinterest",
    href: "https://pinterest.com/JCOPS",
    icon: "pinterest",
  },
  {
    platform: "TikTok",
    href: "https://tiktok.com/@JCOPS",
    icon: "tiktok",
  },
  {
    platform: "YouTube",
    href: "https://youtube.com/@JCOPS",
    icon: "youtube",
  },
];

// ============================================
// Footer Sections
// ============================================

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", href: "/new-arrivals" },
      { label: "Best Sellers", href: "/best-sellers" },
      { label: "Collections", href: "/collections" },
      { label: "Sale", href: "/sale" },
      { label: "Gift Cards", href: "/gift-cards" },
    ],
  },
  {
    title: "Categories",
    links: [
      { label: "T-Shirts", href: "/categories/t-shirts" },
      { label: "Pants", href: "/categories/pants" },
      { label: "Jackets", href: "/categories/jackets" },
      { label: "Dresses", href: "/categories/dresses" },
      { label: "Sneakers", href: "/categories/sneakers" },
      { label: "Accessories", href: "/categories/accessories" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Stores", href: "/stores" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Shipping & Returns", href: "/shipping-returns" },
      { label: "Size Guide", href: "/size-guide" },
      { label: "Order Tracking", href: "/order-tracking" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

// ============================================
// Size Charts
// ============================================

export const SIZE_CHART_TOPS: SizeChartEntry[] = [
  { size: "XS", chest: "32-34\"", waist: "26-28\"", hips: "34-36\"", length: "26\"" },
  { size: "S", chest: "34-36\"", waist: "28-30\"", hips: "36-38\"", length: "27\"" },
  { size: "M", chest: "36-38\"", waist: "30-32\"", hips: "38-40\"", length: "28\"" },
  { size: "L", chest: "38-40\"", waist: "32-34\"", hips: "40-42\"", length: "29\"" },
  { size: "XL", chest: "40-42\"", waist: "34-36\"", hips: "42-44\"", length: "30\"" },
  { size: "XXL", chest: "42-44\"", waist: "36-38\"", hips: "44-46\"", length: "31\"" },
];

export const SIZE_CHART_PANTS: SizeChartEntry[] = [
  { size: "28", chest: "-", waist: "28\"", hips: "36\"", length: "30\"" },
  { size: "30", chest: "-", waist: "30\"", hips: "38\"", length: "31\"" },
  { size: "32", chest: "-", waist: "32\"", hips: "40\"", length: "32\"" },
  { size: "34", chest: "-", waist: "34\"", hips: "42\"", length: "32\"" },
  { size: "36", chest: "-", waist: "36\"", hips: "44\"", length: "33\"" },
  { size: "38", chest: "-", waist: "38\"", hips: "46\"", length: "33\"" },
];

export const SIZE_CHART_SHOES: SizeChartEntry[] = [
  { size: "US 7", chest: "-", waist: "-", hips: "-", length: "25 cm" },
  { size: "US 8", chest: "-", waist: "-", hips: "-", length: "25.5 cm" },
  { size: "US 9", chest: "-", waist: "-", hips: "-", length: "26.5 cm" },
  { size: "US 10", chest: "-", waist: "-", hips: "-", length: "27.5 cm" },
  { size: "US 11", chest: "-", waist: "-", hips: "-", length: "28.5 cm" },
  { size: "US 12", chest: "-", waist: "-", hips: "-", length: "29.5 cm" },
];

// ============================================
// Filter Options
// ============================================

export const CATEGORY_FILTERS: FilterOption[] = [
  { label: "All Categories", value: "all" },
  { label: "T-Shirts", value: "t-shirts" },
  { label: "Shirts", value: "shirts" },
  { label: "Pants", value: "pants" },
  { label: "Jackets", value: "jackets" },
  { label: "Dresses", value: "dresses" },
  { label: "Hoodies", value: "hoodies" },
  { label: "Sneakers", value: "sneakers" },
  { label: "Accessories", value: "accessories" },
];

export const PRICE_RANGES: PriceRange[] = [
  { label: "Under $100", min: 0, max: 100 },
  { label: "$100 - $250", min: 100, max: 250 },
  { label: "$250 - $500", min: 250, max: 500 },
  { label: "$500 - $1000", min: 500, max: 1000 },
  { label: "$1000 - $2000", min: 1000, max: 2000 },
  { label: "Over $2000", min: 2000, max: Infinity },
];

export const COLOR_FILTERS: FilterOption[] = [
  { label: "Black", value: "#000000" },
  { label: "White", value: "#FFFFFF" },
  { label: "Navy", value: "#1B2A4A" },
  { label: "Charcoal", value: "#333333" },
  { label: "Ivory", value: "#F5F0EB" },
  { label: "Camel", value: "#C5A258" },
  { label: "Burgundy", value: "#722F37" },
  { label: "Olive", value: "#556B2F" },
  { label: "Slate Blue", value: "#6A7B8B" },
  { label: "Midnight", value: "#191970" },
  { label: "Cream", value: "#FFFDD0" },
  { label: "Forest Green", value: "#228B22" },
];

export const SIZE_FILTERS: FilterOption[] = [
  { label: "XS", value: "XS" },
  { label: "S", value: "S" },
  { label: "M", value: "M" },
  { label: "L", value: "L" },
  { label: "XL", value: "XL" },
  { label: "XXL", value: "XXL" },
];

// ============================================
// Sort Options
// ============================================

export const SORT_OPTIONS: SortOption[] = [
  { label: "Featured", value: "featured" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Selling", value: "best-selling" },
  { label: "Top Rated", value: "top-rated" },
  { label: "Name: A-Z", value: "name-asc" },
  { label: "Name: Z-A", value: "name-desc" },
];

// ============================================
// Categories
// ============================================

export const CATEGORIES: Category[] = [
  {
    id: "cat-tshirts",
    name: "T-Shirts",
    slug: "t-shirts",
    image: "https://picsum.photos/seed/cat-tshirts/800/1000",
    description: "Premium cotton and blended tees with architectural cuts and artisanal finishes.",
    productCount: 8,
  },
  {
    id: "cat-shirts",
    name: "Shirts",
    slug: "shirts",
    image: "https://picsum.photos/seed/cat-shirts/800/1000",
    description: "Tailored shirts in luxurious fabrics — from silk to Japanese cotton.",
    productCount: 5,
  },
  {
    id: "cat-pants",
    name: "Pants",
    slug: "pants",
    image: "https://picsum.photos/seed/cat-pants/800/1000",
    description: "Structured trousers, relaxed cargos, and sculptural silhouettes.",
    productCount: 8,
  },
  {
    id: "cat-jackets",
    name: "Jackets",
    slug: "jackets",
    image: "https://picsum.photos/seed/cat-jackets/800/1000",
    description: "Outerwear that commands attention — from bomber jackets to tailored overcoats.",
    productCount: 6,
  },
  {
    id: "cat-dresses",
    name: "Dresses",
    slug: "dresses",
    image: "https://picsum.photos/seed/cat-dresses/800/1000",
    description: "Statement dresses for every occasion — draped silks, sculptural knits, and flowing forms.",
    productCount: 6,
  },
  {
    id: "cat-hoodies",
    name: "Hoodies",
    slug: "hoodies",
    image: "https://picsum.photos/seed/cat-hoodies/800/1000",
    description: "Elevated loungewear crafted from heavyweight fleece and premium blends.",
    productCount: 5,
  },
  {
    id: "cat-sneakers",
    name: "Sneakers",
    slug: "sneakers",
    image: "https://picsum.photos/seed/cat-sneakers/800/1000",
    description: "Architectural footwear where craftsmanship meets contemporary design.",
    productCount: 6,
  },
  {
    id: "cat-accessories",
    name: "Accessories",
    slug: "accessories",
    image: "https://picsum.photos/seed/cat-accessories/800/1000",
    description: "Finishing touches — scarves, bags, belts, and jewelry crafted with precision.",
    productCount: 6,
  },
];

// ============================================
// Testimonials
// ============================================

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    author: "Isabelle Moreau",
    role: "Fashion Editor, Vogue Paris",
    content: "JCOPS represents the rare intersection of visionary design and impeccable quality. Each piece tells a story that transcends seasonal trends.",
    avatar: "https://picsum.photos/seed/testimonial1/100/100",
    rating: 5,
  },
  {
    id: "test-2",
    author: "Marcus Chen",
    role: "Creative Director",
    content: "I've worn luxury brands for decades. JCOPS is the first to make me feel like I'm wearing the future. The attention to detail is extraordinary.",
    avatar: "https://picsum.photos/seed/testimonial2/100/100",
    rating: 5,
  },
  {
    id: "test-3",
    author: "Aria Nakamura",
    role: "Architect & Style Consultant",
    content: "The way JCOPS approaches garment construction reminds me of architectural design — every seam has purpose, every drape has intention.",
    avatar: "https://picsum.photos/seed/testimonial3/100/100",
    rating: 5,
  },
  {
    id: "test-4",
    author: "David Okafor",
    role: "Film Producer",
    content: "When I need to make an impression, I reach for JCOPS. The fabrics are unlike anything I've felt, and the fit is consistently perfect.",
    avatar: "https://picsum.photos/seed/testimonial4/100/100",
    rating: 5,
  },
  {
    id: "test-5",
    author: "Elena Vasquez",
    role: "Gallery Owner",
    content: "JCOPS doesn't just sell clothing — they curate an experience. From the packaging to the product, every touchpoint exudes sophistication.",
    avatar: "https://picsum.photos/seed/testimonial5/100/100",
    rating: 5,
  },
  {
    id: "test-6",
    author: "James Whitfield",
    role: "CEO, Whitfield Capital",
    content: "I appreciate brands that respect both tradition and innovation. JCOPS does both with a confidence that's rare in today's fashion landscape.",
    avatar: "https://picsum.photos/seed/testimonial6/100/100",
    rating: 4,
  },
];

// ============================================
// Store Locations
// ============================================

export const STORE_LOCATIONS: StoreLocation[] = [
  {
    id: "store-nyc",
    name: "JCOPS New York",
    address: "450 Fashion Avenue",
    city: "New York",
    country: "United States",
    phone: "+1 (212) 555-0180",
    email: "nyc@JCOPS.com",
    hours: "Mon–Sat: 10AM–8PM, Sun: 11AM–6PM",
    image: "https://picsum.photos/seed/store-nyc/800/600",
    coordinates: { lat: 40.7528, lng: -73.9928 },
  },
  {
    id: "store-london",
    name: "JCOPS London",
    address: "27 Bond Street",
    city: "London",
    country: "United Kingdom",
    phone: "+44 20 7946 0958",
    email: "london@JCOPS.com",
    hours: "Mon–Sat: 10AM–7PM, Sun: 12PM–5PM",
    image: "https://picsum.photos/seed/store-london/800/600",
    coordinates: { lat: 51.5144, lng: -0.1419 },
  },
  {
    id: "store-paris",
    name: "JCOPS Paris",
    address: "8 Rue du Faubourg Saint-Honoré",
    city: "Paris",
    country: "France",
    phone: "+33 1 42 96 12 34",
    email: "paris@JCOPS.com",
    hours: "Mon–Sat: 10AM–7PM, Sun: Closed",
    image: "https://picsum.photos/seed/store-paris/800/600",
    coordinates: { lat: 48.8706, lng: 2.3167 },
  },
  {
    id: "store-tokyo",
    name: "JCOPS Tokyo",
    address: "5-3-1 Minami-Aoyama, Minato",
    city: "Tokyo",
    country: "Japan",
    phone: "+81 3-5467-1234",
    email: "tokyo@JCOPS.com",
    hours: "Daily: 11AM–8PM",
    image: "https://picsum.photos/seed/store-tokyo/800/600",
    coordinates: { lat: 35.6627, lng: 139.7120 },
  },
  {
    id: "store-dubai",
    name: "JCOPS Dubai",
    address: "The Dubai Mall, Financial Centre Road",
    city: "Dubai",
    country: "United Arab Emirates",
    phone: "+971 4 339 8760",
    email: "dubai@JCOPS.com",
    hours: "Sun–Wed: 10AM–10PM, Thu–Sat: 10AM–12AM",
    image: "https://picsum.photos/seed/store-dubai/800/600",
    coordinates: { lat: 25.1972, lng: 55.2744 },
  },
  {
    id: "store-milan",
    name: "JCOPS Milan",
    address: "Via Monte Napoleone 15",
    city: "Milan",
    country: "Italy",
    phone: "+39 02 7600 4321",
    email: "milan@JCOPS.com",
    hours: "Mon–Sat: 10AM–7:30PM, Sun: Closed",
    image: "https://picsum.photos/seed/store-milan/800/600",
    coordinates: { lat: 45.4685, lng: 9.1953 },
  },
];

// ============================================
// Brand Constants
// ============================================

export const BRAND = {
  name: "JCOPS",
  tagline: "Where Fabric Meets Future",
  description: TESTIMONIALS[0]?.content || "",
  email: "hello@JCOPS.com",
  phone: "+1 (800) JCOPS",
  year: 2024,
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const CURRENCY = "USD" as const;

export const FREE_SHIPPING_THRESHOLD = 200;
export const TAX_RATE = 0.08;
