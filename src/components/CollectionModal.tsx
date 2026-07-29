import React, { useEffect } from 'react';
import { Product } from '../types/storefront';
import { ProductCard } from './ProductCard';
import { X, Sparkles, Flame, Heart, ArrowLeft } from 'lucide-react';
import { TrackingService } from '../services/trackingService';

interface CollectionModalProps {
  slug: string | null; // e.g. 'lynie-picks', 'trending', 'beauty-essentials'
  products: Product[];
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const CollectionModal: React.FC<CollectionModalProps> = ({
  slug,
  products,
  onClose,
  onSelectProduct,
}) => {
  useEffect(() => {
    if (slug) {
      TrackingService.logPageView('collection', `/collections/${slug}`);
    }
  }, [slug]);

  if (!slug) return null;

  const collectionInfo: Record<
    string,
    { title: string; subtitle: string; description: string; icon: React.ReactNode; tag: string }
  > = {
    'lynie-picks': {
      title: "✨ Lynie's Picks",
      subtitle: 'Bộ sưu tập tuyển chọn cá nhân',
      description:
        'Những sản phẩm Lynie thật sự dùng mỗi ngày, cực kỳ yêu thích và tự tin giới thiệu đến bạn.',
      icon: <Sparkles className="h-5 w-5 text-[#D89B8B]" />,
      tag: 'Cá nhân chọn lọc',
    },
    trending: {
      title: '🔥 Trending Beauty',
      subtitle: 'Sản phẩm hot xu hướng',
      description:
        'Những món mỹ phẩm và thời trang đang được săn đón nhiều nhất, lượt mua và phản hồi cực kỳ cao.',
      icon: <Flame className="h-5 w-5 text-[#D89B8B] fill-[#D89B8B]" />,
      tag: 'Xu hướng TikTok',
    },
    'beauty-essentials': {
      title: '💗 Beauty Essentials',
      subtitle: 'Món đồ không thể thiếu',
      description:
        'Dòng sản phẩm dịu nhẹ, chính hãng từ các cửa hàng uy tín giúp bạn duy trì vẻ căng bóng mỗi ngày.',
      icon: <Heart className="h-5 w-5 text-[#D89B8B] fill-[#D89B8B]" />,
      tag: 'Must-Have Items',
    },
  };

  const currentInfo = collectionInfo[slug] || {
    title: `Bộ sưu tập: ${slug}`,
    subtitle: 'Tuyển chọn bởi Tiệm Glowy',
    description: 'Danh sách các sản phẩm chất lượng cao được tuyển chọn.',
    icon: <Sparkles className="h-5 w-5 text-[#D89B8B]" />,
    tag: 'Collection',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-t-[2.5rem] sm:rounded-[2.5rem] bg-[#FAFAF8] text-[#2D2A26] shadow-2xl border border-[#E8DED8] max-h-[92vh] flex flex-col animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-[#E8DED8] bg-white/90 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FAFAF8] text-[#2D2A26] border border-[#E8DED8] hover:bg-[#2D2A26] hover:text-white transition-colors mr-1"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#A89086]">
                {currentInfo.tag}
              </span>
              <h3 className="font-serif italic text-lg font-normal text-[#2D2A26] leading-none">
                {currentInfo.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FAFAF8] text-[#2D2A26] border border-[#E8DED8] hover:bg-[#2D2A26] hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Collection Body */}
        <div className="overflow-y-auto p-5 space-y-4 no-scrollbar">
          {/* Header Banner */}
          <div className="rounded-[1.75rem] bg-white p-5 border border-[#E8DED8] shadow-2xs space-y-2">
            <div className="flex items-center gap-2">
              {currentInfo.icon}
              <h2 className="font-serif italic text-2xl font-normal text-[#2D2A26]">
                {currentInfo.title}
              </h2>
            </div>
            <p className="text-xs text-[#6B665F] leading-relaxed">
              {currentInfo.description}
            </p>
            <div className="pt-1 flex items-center justify-between text-[11px] text-[#A89086] font-semibold">
              <span>{products.length} sản phẩm tuyển chọn</span>
              <span>Tiệm Glowy Official</span>
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => {
                  onClose();
                  onSelectProduct(p);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
