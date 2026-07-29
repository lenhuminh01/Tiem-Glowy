import { Product, GeneratedContent } from '../types/storefront';

export class ContentGeneratorEngine {
  /**
   * Generate TikTok video hooks, review scripts, captions, and SEO summaries from a product
   */
  public static generateContentForProduct(product: Product): GeneratedContent {
    const title = product.name || product.title;
    const review = product.lynieReview || 'Sản phẩm siêu mê được Lynie trực tiếp dùng mỗi ngày.';
    const shop = product.shopName || product.shop || product.brand || 'Tiệm Glowy';

    const tikTokHook = `🔥 ${title.includes('Serum') ? 'Muốn da chuẩn Glass Skin bóng mượt Hàn Quốc?' : 'Trời ơi em này đỉnh xỉu luôn mọi người ơi!'} Test thử em ${title} của nhà ${shop} cùng Lynie nghen!`;

    const reviewScript = `
[0:00 - 0:03] Hook: ${tikTokHook}
[0:03 - 0:12] Review trải nghiệm: "${review}"
[0:12 - 0:22] Chi tiết công dụng: ${product.description}
[0:22 - 0:30] Call-to-action: Nhấp ngay góc trái màn hình hoặc link bio Tiệm Glowy để xem chi tiết em nó nha! ✨
`.trim();

    const beautyCaption = `
✨ ${title} - Món đồ không thể thiếu trong tủ đồ nhà Lynie!
💖 Review chân thật: "${review}"
🛍️ Ghé ngay bio Tiệm Glowy để rước em nó về nhé!
#TiemGlowy #LyniePicks #BeautyReview #OOTD #SkincareRoutine #${product.category}
`.trim();

    const seoArticleSummary = `
Lynie Review: ${title} chính hãng từ ${shop}. Đánh giá chi tiết công dụng: ${product.description}. Lý do Lynie khuyên dùng: ${review}. Mua chính hãng trực tiếp qua liên kết xác thực Tiệm Glowy.
`.trim();

    return {
      productId: product.id,
      productName: title,
      tikTokHook,
      reviewScript,
      beautyCaption,
      seoArticleSummary,
    };
  }
}
