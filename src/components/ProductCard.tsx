import React, { useState } from 'react';
import { Product } from '../types/storefront';
import { Sparkles, Heart, Store, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  showBadge?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  showBadge = true,
}) => {
  const [liked, setLiked] = useState(false);

  const shopDisplayName = product.shopName || product.shop || product.brand || 'Dottie Official Store';
  const productTitle = product.name || product.title;

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-white p-3.5 border border-[#E8DED8] transition-all duration-300 ease-out hover:border-[#D89B8B]/50 hover:shadow-xl hover:shadow-[#D89B8B]/10 cursor-pointer"
    >
      <div>
        {/* Product Image Container (Render only if image is available) */}
        {product.image ? (
          <div className="relative aspect-square w-full overflow-hidden rounded-[1.5rem] bg-[#FAFAF8]">
            <img
              src={product.image}
              alt={productTitle}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Badges Overlay */}
            <div className="absolute top-2.5 left-2.5 right-2.5 flex items-start justify-between gap-1.5">
              {showBadge ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#2D2A26]/90 px-2.5 py-1 text-[9px] uppercase tracking-[0.12em] font-bold text-white shadow-2xs backdrop-blur-md">
                  <Sparkles className="h-2.5 w-2.5 text-[#D89B8B]" />
                  Lynie khuyên dùng
                </span>
              ) : (
                <div />
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLiked(!liked);
                }}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-[#2D2A26] backdrop-blur-md transition-transform active:scale-90 hover:bg-white ml-auto"
              >
                <Heart
                  className={`h-3.5 w-3.5 transition-colors ${
                    liked ? 'fill-[#D89B8B] text-[#D89B8B]' : 'text-[#A89086]'
                  }`}
                />
              </button>
            </div>
          </div>
        ) : (
          /* Sleek Minimalist Typography Card when No Image is provided */
          <div className="relative aspect-[4/3] w-full flex flex-col justify-between p-4 rounded-[1.5rem] bg-gradient-to-br from-[#FAFAF8] to-[#F0EBE6] border border-[#E8DED8]">
            <div className="flex items-center justify-between">
              {showBadge ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#2D2A26] px-2 py-0.5 text-[9px] uppercase tracking-[0.12em] font-bold text-white">
                  <Sparkles className="h-2.5 w-2.5 text-[#D89B8B]" />
                  Lynie Pick
                </span>
              ) : (
                <div />
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLiked(!liked);
                }}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#2D2A26] ml-auto"
              >
                <Heart
                  className={`h-3 w-3 ${
                    liked ? 'fill-[#D89B8B] text-[#D89B8B]' : 'text-[#A89086]'
                  }`}
                />
              </button>
            </div>
            <div className="my-auto text-center py-2">
              <ShoppingBag className="mx-auto h-6 w-6 text-[#D89B8B] mb-1 opacity-80" />
              <span className="text-[10px] uppercase font-bold text-[#A89086] tracking-wider block">
                {shopDisplayName}
              </span>
            </div>
          </div>
        )}

        {/* Product Details Section */}
        <div className="mt-3 px-0.5 space-y-1.5">
          {/* Shop/Store Name */}
          <div className="flex items-center gap-1 text-[10px] text-[#A89086] font-bold uppercase tracking-[0.12em] truncate">
            <Store className="h-3 w-3 text-[#D89B8B] shrink-0" />
            <span className="truncate">{shopDisplayName}</span>
          </div>

          {/* Product Title */}
          <h4 className="font-sans font-bold text-sm text-[#2D2A26] leading-snug line-clamp-2 group-hover:text-[#D89B8B] transition-colors">
            {productTitle}
          </h4>

          {/* Description (Cột I trong Google Sheet) */}
          {product.description && (
            <p className="text-[11px] text-[#6B665F] line-clamp-2 mt-1">
              {product.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
