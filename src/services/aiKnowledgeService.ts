import { BeautyKnowledgeItem } from '../types/storefront';

export class AIKnowledgeService {
  private static KNOWLEDGE_BASE: BeautyKnowledgeItem[] = [
    {
      id: 'kb-niacinamide',
      topic: 'Glass Skin & Dưỡng Sáng',
      keyword: 'niacinamide',
      tipTitle: 'Niacinamide + Keo Ong Cho Làn Da Căng Bóng',
      explanation:
        'Niacinamide giúp làm mờ thâm mụn, mỏng nhẹ, hỗ trợ mờ lỗ chân lông và kết hợp keo ong cho lớp finish mọng nước chuẩn Glass Skin Hàn Quốc.',
      keyIngredients: ['Niacinamide 5%', 'Propolis Extract', 'Rice Germ'],
      recommendedRoutine: ['Serum Niacinamide', 'Sáp Tẩy Trang Mầm Gạo', 'Son Dưỡng Lip Tint'],
    },
    {
      id: 'kb-acne-care',
      topic: 'Chăm Sóc Da Mụn Dịu Nhẹ',
      keyword: 'acne',
      tipTitle: 'Quy Trình Làm Sạch Sâu Không Cay Mắt',
      explanation:
        'Da mụn nhạy cảm cần làm sạch bằng sáp tẩy trang dạng balm tự nhiên để nhũ hóa dầu thừa mà không làm tổn thương hàng rào bảo vệ da.',
      keyIngredients: ['Mầm Gạo', 'Rau má Centella', 'Tràm trà'],
      recommendedRoutine: ['Sáp Tẩy Trang Mầm Gạo', 'Serum Niacinamide Dịu Nhẹ'],
    },
    {
      id: 'kb-lip-care',
      topic: 'Dưỡng Ẩm & Mọng Môi MLBB',
      keyword: 'lip',
      tipTitle: 'Bí Quyết Môi Mọng Hồng Nude Tự Nhiên',
      explanation:
        'Peptide lip balm vừa cung cấp dưỡng chất làm đầy rãnh môi, vừa tạo hiệu ứng bóng tự nhiên MLBB không gây bết dính.',
      keyIngredients: ['Peptides', 'Shea Butter', 'Phyto-Squalane'],
      recommendedRoutine: ['Son Dưỡng Lip Tint Nude Bloom'],
    },
  ];

  public static getKnowledgeByKeyword(keyword: string): BeautyKnowledgeItem | null {
    const cleanKw = keyword.toLowerCase();
    return (
      this.KNOWLEDGE_BASE.find(
        (k) => k.keyword.includes(cleanKw) || cleanKw.includes(k.keyword)
      ) || this.KNOWLEDGE_BASE[0]
    );
  }

  public static getRoutineAdvice(skinConcern: string): { morning: string[]; evening: string[] } {
    if (skinConcern === 'acne' || skinConcern === 'oily') {
      return {
        morning: ['1. Sửa rửa mặt / Tẩy trang dịu nhẹ', '2. Serum kiềm dầu & Niacinamide', '3. Kem chống nắng ráo mịn'],
        evening: ['1. Sáp tẩy trang mầm gạo', '2. Serum làm mờ thâm', '3. Kem dưỡng ẩm khóa nước'],
      };
    }
    return {
      morning: ['1. Nước rửa mặt / Tẩy trang mỏng nhẹ', '2. Serum dưỡng căng bóng Glass Skin', '3. Son dưỡng Lip Tint'],
      evening: ['1. Sáp tẩy trang tan nhanh', '2. Serum tái tạo & Niacinamide', '3. Kem dưỡng phục hồi'],
    };
  }
}
