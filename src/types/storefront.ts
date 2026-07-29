export type MainCategory = 'all' | 'skincare' | 'makeup' | 'bodycare' | 'haircare' | 'fashion' | 'lifestyle' | 'grocery' | 'snacks';

export type SubCategory =
  // Fashion (Mục đích sử dụng)
  | 'fashion_tops'
  | 'fashion_dresses'
  | 'fashion_skirts'
  | 'fashion_pants'
  | 'fashion_sets'
  // Skincare
  | 'cleanser'
  | 'serum'
  | 'sunscreen'
  | 'moisturizer'
  // Makeup
  | 'lip'
  | 'cushion'
  | 'foundation'
  | 'blush'
  // Body Care
  | 'body_lotion'
  | 'body_scrub'
  | 'fragrance'
  // Hair Care
  | 'hair_care'
  | 'general';

export type Category = MainCategory;

export interface Product {
  id: string;
  title: string;
  name?: string;
  brand?: string;
  shopName?: string;
  shop?: string;
  sheetOrigin?: 'Summary' | 'FA' | 'HB' | 'LS';
  price?: string;
  originalPrice?: string;
  commission?: string;
  sales?: string;
  brandRank?: string | number;
  productRank?: string | number;
  isLyniePick?: boolean;
  lyniePick?: boolean;
  pickValue?: string;
  category: MainCategory;
  subCategory?: SubCategory;
  collectionId: string;
  collectionName: string;
  rating?: number;
  reviewsCount?: number;
  image: string;
  galleryImages?: string[];
  description: string;
  lynieReview: string; // Creator's honest mini-review
  badge?: string; // e.g., "Best Seller", "Khuyên dùng"
  discountCode?: string;
  affiliateUrl: string;
  platform: 'Shopee' | 'TikTok Shop' | 'Lazada' | 'Brand Store';
  isHostPick?: boolean;
  isTrending?: boolean;
  isFeatured?: boolean;
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  itemCount: number;
  tag: string;
  description: string;
  featuredThumbnails?: string[]; // 2-4 thumbnail URLs for Pinterest board preview
}

export interface TikTokPost {
  id: string;
  videoTitle: string;
  thumbnail: string;
  videoUrl: string;
  productLink?: string;
  views?: string;
  likes?: string;
  date?: string;
  taggedProductIds: string[];
}

export interface CreatorProfile {
  name: string;
  brand: string;
  tagline: string;
  subtitle: string;
  description: string;
  subDescription: string;
  avatar: string;
  bio: string;
  aboutText: string;
  tiktokHandle: string;
  tiktokUrl: string;
  instagramHandle: string;
  instagramUrl: string;
  shopeePlaceholder: string;
  email: string;
}

export interface ClickEventLog {
  id: string;
  productId: string;
  timestamp: number;
  source: string;
  affiliateUrl: string;
}

export interface PageViewLog {
  id: string;
  type: 'landing' | 'collection' | 'product_detail';
  path: string;
  timestamp: number;
  meta?: string;
}

export interface FunnelAnalytics {
  totalViews: number;
  totalClicks: number;
  productClicks: Record<string, number>;
  sourceStats: Record<string, number>;
  pageViews: Record<string, number>;
}

export interface GeneratedContent {
  productId: string;
  productName: string;
  tikTokHook: string;
  reviewScript: string;
  beautyCaption: string;
  seoArticleSummary: string;
}

export interface BeautyKnowledgeItem {
  id: string;
  topic: string;
  keyword: string;
  tipTitle: string;
  explanation: string;
  keyIngredients: string[];
  recommendedRoutine: string[];
}



