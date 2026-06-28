import { Product, Review } from './index';

export interface BodyMeasurements {
  height: string; // in cm or inches
  weight: string; // in kg or lbs
  chest?: string;
  waist?: string;
  hips?: string;
}

export interface SizeRecommendation {
  suggestedSize: string;
  confidenceScore: number; // 0 to 100
  fitNote: string;
}

export interface PDPColorVariant {
  name: string;
  hex: string;
  image?: string; // Optional image specifically for color swatch
  limitedEdition?: boolean;
  inStock?: boolean;
}

export interface DetailedSpecifications {
  materials: { name: string; percentage: number; description: string }[];
  dimensions: { size: string; chest: string; length: string; sleeve?: string; waist?: string }[];
  careInstructions: string[];
  shippingInfo: string;
  returnsInfo: string;
  warrantyInfo: string;
  faqs: { question: string; answer: string }[];
}

export interface ReviewWithMedia extends Review {
  id: string;
  verified: boolean;
  helpfulVotes: number;
  userPhotos?: string[];
  userVideo?: string;
  title?: string;
}

export interface ProductStoryBlock {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  layout: 'left-image' | 'right-image' | 'full-width';
  parallaxSpeed?: number;
}

export interface OutfitItem {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

export interface DeliveryDetails {
  freeShippingThreshold: number;
  expressShippingCost: number;
  expressDeliveryDays: number;
  standardDeliveryDays: number;
  returnWindowDays: number;
}

export interface PDPExtraData {
  sku: string;
  fit: 'Slim' | 'Regular' | 'Relaxed' | 'Oversized';
  designerNotes: string;
  countryOfOrigin: string;
  sustainabilityScore: number; // 0-100
  sustainabilityBadges: string[];
  fabricWeight: string; // e.g. "240 GSM"
  fabricFinish: string; // e.g. "Double Mercerized"
  emiOptions: { bank: string; months: number; amountPerMonth: number }[];
  specs: DetailedSpecifications;
  story: ProductStoryBlock[];
  outfit: OutfitItem[];
  delivery: DeliveryDetails;
}
