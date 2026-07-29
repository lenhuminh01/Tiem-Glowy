import { Product } from '../types/storefront';

export class RecommendationEngine {
  /**
   * Helper to parse sales strings like "3.5k+ đã bán" into numeric value
   */
  private static parseSalesCount(salesStr?: string): number {
    if (!salesStr) return 0;
    const cleanStr = salesStr.toLowerCase().replace(/[^0-9.k+]/g, '');
    if (cleanStr.includes('k')) {
      const num = parseFloat(cleanStr.replace('k', ''));
      return isNaN(num) ? 0 : num * 1000;
    }
    const num = parseFloat(cleanStr);
    return isNaN(num) ? 0 : num;
  }

  /**
   * Calculate recommendation score for a product:
   * Priority:
   * 1. Lynie Pick = +1000 pts
   * 2. Sales performance
   * 3. Trusted shop = +200 pts
   * 4. Rating & Reviews
   */
  public static calculateProductScore(product: Product): number {
    let score = 0;

    // 1. Lynie Pick = Highest Priority
    if (product.isLyniePick || product.lyniePick) {
      score += 1000;
    }

    // 2. Sales Performance
    const salesNum = this.parseSalesCount(product.sales);
    score += Math.min(salesNum / 10, 500);

    // 3. Trusted Store
    const isOfficialShop =
      product.shopName?.toLowerCase().includes('official') ||
      product.shopName?.toLowerCase().includes('flagship') ||
      product.platform === 'Shopee';
    if (isOfficialShop) {
      score += 200;
    }

    // 4. Rating
    if (product.rating) {
      score += product.rating * 20;
    }

    return score;
  }

  /**
   * Rank all products based on overall recommendation algorithm
   */
  public static rankProducts(products: Product[]): Product[] {
    return [...products].sort((a, b) => {
      return this.calculateProductScore(b) - this.calculateProductScore(a);
    });
  }

  /**
   * Section A: Lynie's Picks
   * Products where isLyniePick = true
   */
  public static getLyniesPicks(products: Product[]): Product[] {
    return products.filter((p) => p.isLyniePick || p.lyniePick);
  }

  /**
   * Section B: Trending Beauty
   * Sorted strictly by sales / popularity
   */
  public static getTrendingBeauty(products: Product[]): Product[] {
    return [...products].sort((a, b) => {
      return this.parseSalesCount(b.sales) - this.parseSalesCount(a.sales);
    });
  }

  /**
   * Section C: Beauty Essentials
   * High sales + trusted stores + strong performance
   */
  public static getBeautyEssentials(products: Product[]): Product[] {
    return products.filter((p) => {
      const salesNum = this.parseSalesCount(p.sales);
      return salesNum >= 800 || (p.rating && p.rating >= 4.8);
    });
  }
}
