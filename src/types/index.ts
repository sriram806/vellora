export interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // optional field referenced by pre-existing hooks
  category: 't-shirts' | 'pants' | 'sneakers' | 'outerwear' | 'accessories';
  collection: string;
  images: string[];
  details: string[];
  reviews: Review[];
  rating: number;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  featured: boolean;
  trending: boolean;
  newArrival: boolean;
}

export interface CartItem {
  id?: string; // made optional to support pre-existing hook types
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: any; // Allow string or ProductColor to support both cart contexts
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
}

export interface NavItem {
  label: string;
  href: string;
  featured?: boolean;
  children?: { label: string; href: string }[];
}

export interface SocialLink {
  platform: string;
  href: string;
  icon: string;
}

export interface FooterSection {
  title: string;
  links: { label: string; href: string }[];
}

export interface SizeChartEntry {
  size: string;
  chest: string;
  waist: string;
  hips: string;
  length: string;
}

export interface FilterOption {
  label: string;
  value: string;
}

export interface PriceRange {
  label: string;
  min: number;
  max: number;
}

export interface SortOption {
  label: string;
  value: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  productCount: number;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  hours: string;
  image: string;
  coordinates: { lat: number; lng: number };
}
