import React, { useState } from 'react';
import { Product } from '../types/storefront';
import { X, ExternalLink, Copy, Check, Sparkles, Share2, Tag, ShieldCheck, Store, HeartHandshake } from 'lucide-react';
import { TrackingService } from '../services/trackingService';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!product) return null;

  const handleCopyCode = () => {
    if (product.discountCode) {
      navigator.clipboard.writeText(product.discountCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleCopyShareLink = () => {
    const shareUrl = `${window.location.origin}/#product/${product.id}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleBuyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    TrackingService.trackAndRedirect(product, 'detail_modal_cta');
  };

  const productTitle = product.name || product.title;
  const shopDisplayName = product.shopName || product.shop || product.brand || 'Tiệm Glowy Official';

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Modal Container */}
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-t-[2.5rem] sm:rounded-[2.5rem] bg-[#FAFAF8] text-[#2D2A26] shadow-2xl border border-[#E8DED8] max-h-[92vh] flex flex-col animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-[#E8DED8] bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#D89B8B] animate-ping" />
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#A89086]">
              {product.collectionName || 'Chi tiết sản phẩm'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FAFAF8] text-[#2D2A26] border border-[#E8DED8] hover:bg-[#2D2A26] hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-5 no-scrollbar">
          {/* Large Product Image */}
          <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] bg-white border border-[#E8DED8]">
            <img
              src={product.image}
              alt={productTitle}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-center"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-[10px] uppercase tracking-[0.15em] font-bold text-[#2D2A26] shadow-2xs backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-[#D89B8B]" />
                {product.badge}
              </span>
            )}
            <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-md">
              Chính hãng {product.platform}
            </span>
          </div>

          {/* Title & Store Info */}
          <div>
            <div className="flex items-center gap-1 text-xs text-[#A89086] font-bold tracking-[0.15em] uppercase mb-1">
              <Store className="h-3.5 w-3.5 text-[#D89B8B]" />
              <span>{shopDisplayName}</span>
            </div>
            <h2 className="font-serif italic text-2xl font-normal text-[#2D2A26] leading-snug">
              {productTitle}
            </h2>
          </div>

          {/* Voucher Block (if discount code exists) */}
          {product.discountCode && (
            <div className="flex items-center justify-between rounded-[1.5rem] bg-white p-4 border border-[#E8DED8] shadow-2xs">
              <div>
                <p className="text-[10px] text-[#A89086] font-bold uppercase tracking-[0.15em]">
                  Mã giảm giá độc quyền
                </p>
                <p className="text-xs text-[#6B665F] mt-0.5">Sao chép mã để dùng khi thanh toán</p>
              </div>
              <button
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#F0EBE6] border border-[#E8DED8] px-3.5 py-1.5 text-xs font-bold text-[#A89086] hover:bg-[#D89B8B] hover:text-white transition-all"
              >
                {copiedCode ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Đã chép mã!</span>
                  </>
                ) : (
                  <>
                    <Tag className="h-3.5 w-3.5" />
                    <span>{product.discountCode}</span>
                    <Copy className="h-3 w-3 ml-1 opacity-70" />
                  </>
                )}
              </button>
            </div>
          )}

          {/* Why Lynie Recommends This Box */}
          <div className="rounded-[1.5rem] bg-[#F0EBE6] p-4 border border-[#E8DED8]">
            <div className="flex items-center gap-2 mb-2">
              <HeartHandshake className="h-4 w-4 text-[#D89B8B]" />
              <span className="text-xs font-bold text-[#2D2A26] uppercase tracking-wider">
                Vì sao Lynie khuyên dùng
              </span>
            </div>
            <p className="font-serif italic text-sm text-[#6B665F] leading-relaxed">
              "{product.lynieReview}"
            </p>
          </div>

          {/* Product Benefits & Overview */}
          <div className="space-y-1.5">
            <h4 className="text-[10px] font-bold text-[#A89086] uppercase tracking-[0.15em]">
              Công dụng & Đặc điểm nổi bật
            </h4>
            <p className="text-xs text-[#6B665F] leading-relaxed bg-white p-4 rounded-[1.25rem] border border-[#E8DED8]">
              {product.description}
            </p>
          </div>

          {/* Verification Guarantee */}
          <div className="flex items-center gap-2 rounded-full bg-[#F0EBE6] p-3 text-xs text-[#6B665F] border border-[#E8DED8]">
            <ShieldCheck className="h-4 w-4 text-[#D89B8B] shrink-0" />
            <span>Liên kết tiếp thị chính hãng được xác thực bởi Tiệm Glowy.</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 px-6 border-t border-[#E8DED8] bg-white space-y-2 sticky bottom-0">
          <button
            onClick={handleBuyClick}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#2D2A26] py-3.5 px-4 text-xs uppercase tracking-[0.15em] font-bold text-white shadow-md hover:bg-[#D89B8B] active:scale-[0.99] transition-all"
          >
            <span>Xem sản phẩm trên {product.platform}</span>
            <ExternalLink className="h-4 w-4" />
          </button>

          <button
            onClick={handleCopyShareLink}
            className="flex w-full items-center justify-center gap-1.5 text-xs text-[#A89086] py-1.5 font-bold uppercase tracking-wider hover:text-[#2D2A26] transition-colors"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>{copiedLink ? 'Đã chép liên kết!' : 'Chia sẻ sản phẩm này'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

