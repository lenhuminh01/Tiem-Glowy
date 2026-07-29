import productsData from './products.json';
import collectionsData from './collections.json';
import tiktoksData from './tiktoks.json';
import profileData from './profile.json';
import { Product, Collection, TikTokPost, CreatorProfile, Category } from '../types/storefront';

// Default JSON datasets loaded directly from JSON files
export const initialProducts: Product[] = productsData as Product[];
export const initialCollections: Collection[] = collectionsData as Collection[];
export const initialTikToks: TikTokPost[] = tiktoksData as TikTokPost[];
export const initialProfile: CreatorProfile = profileData as CreatorProfile;

export function filterProductsByCategory(products: Product[], category: Category): Product[] {
  if (category === 'all') return products;
  return products.filter((p) => p.category === category);
}

export function searchProducts(products: Product[], query: string): Product[] {
  if (!query.trim()) return products;
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.lynieReview.toLowerCase().includes(q) ||
      (p.brand && p.brand.toLowerCase().includes(q)) ||
      p.collectionName.toLowerCase().includes(q)
  );
}
