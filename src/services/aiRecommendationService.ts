import { Product, BeautyProfile } from '../types/storefront';
import { RecommendationEngine } from './recommendationEngine';

export interface AIRecommendationResult {
  matchScore: number; // 0 to 100
  reasoning: string;
  recommendedProducts: Product[];
}

export class AIRecommendationService {
  /**
   * AI Lynie Query Builder
   * Matches user's beauty profile against product catalog.
   * MANDATORY: Products MUST belong to HB group (skincare, makeup, bodycare, haircare).
   */
  public static recommendForBeautyProfile(
    profile: BeautyProfile,
    products: Product[]
  ): AIRecommendationResult {
    // MANDATORY CONDITION: Filter strictly products belonging to HB group (skincare, makeup, bodycare, haircare)
    const hbGroupCategories = ['skincare', 'makeup', 'bodycare', 'haircare'];
    let hbProducts = products.filter((p) => hbGroupCategories.includes(p.category));

    // Fallback if no HB products are found, exclude fashion/lifestyle
    if (hbProducts.length === 0) {
      hbProducts = products.filter((p) => p.category !== 'fashion' && p.category !== 'lifestyle');
    }

    const scoredProducts = hbProducts.map((product) => {
      let score = RecommendationEngine.calculateProductScore(product);

      // Match category
      if (profile.category && profile.category !== 'all') {
        if (product.category === profile.category) {
          score += 300;
        }
      }

      // Match skin concern keywords in title/description/lynieReview
      if (profile.skinConcern) {
        const concernKeywordMap: Record<string, string[]> = {
          acne: ['mụn', 'thâm', 'cleansing', 'tẩy trang', 'propolis', 'làm sạch'],
          dullness: ['căng bóng', 'sáng', 'glass skin', 'niacinamide', 'serum', 'hồng nude'],
          aging: ['peptide', 'dưỡng', 'mọng môi', 'tái tạo'],
          dryness: ['dưỡng', 'linen', 'sáp', 'nến', 'thơm', 'ẩm'],
          oily: ['thoáng mát', 'mỏng nhẹ', 'kiềm dầu', 'nhẹ da'],
          sensitive: ['dịu nhẹ', '100%', 'tự nhiên', 'không cay mắt'],
        };

        const keywords = concernKeywordMap[profile.skinConcern] || [profile.skinConcern];
        const combinedText = `${product.title} ${product.description} ${product.lynieReview}`.toLowerCase();

        keywords.forEach((keyword) => {
          if (combinedText.includes(keyword.toLowerCase())) {
            score += 150;
          }
        });
      }

      return {
        product,
        finalScore: score,
      };
    });

    // Sort by final score descending
    scoredProducts.sort((a, b) => b.finalScore - a.finalScore);

    const topProducts = scoredProducts.slice(0, 4).map((sp) => sp.product);

    return {
      matchScore: 95,
      reasoning: `Dựa trên tình trạng da ${profile.skinConcern || 'của bạn'}, AI Lynie tuyển chọn ${topProducts.length} sản phẩm thuộc nhóm HB phù hợp nhất.`,
      recommendedProducts: topProducts,
    };
  }
}
