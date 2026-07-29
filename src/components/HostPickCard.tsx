import React from 'react';
import { Product } from '../types/storefront';
import { Sparkles, Store } from 'lucide-react';

interface HostPickCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
}

export const HostPickCard: React.FC<HostPickCardProps> = ({ product, onSelectProduct }) => {
  const productTitle = product.name || product.title;
  const shopDisplayName = product.shopName || product.shop || product.brand || 'Dottie Official Store';
  const quoteText = product.lynieReview || product.description || 'Lynie thực sự thích món này!';

  return (
    <section className="pt-1 pb-3 px-4 sm:px-6 max-w-xl mx-auto">
      {/* Section Header */}
      <div className="flex items-center gap-1.5 mb-2">
        <Sparkles className="h-4 w-4 text-[#D89B8B]" />
        <h2 className="font-sans font-bold text-xl text-[#2D2A26]">
          ✨ Lynie's Pick
        </h2>
      </div>

      {/* Hero Card */}
      <div 
        onClick={() => onSelectProduct(product)}
        className="group relative overflow-hidden rounded-[2rem] bg-white border border-[#E8DED8] shadow-xs transition-all duration-300 hover:shadow-md cursor-pointer"
      >
        <div className="flex flex-col sm:flex-row items-stretch">
          {/* Image */}
          {product.image ? (
            <div className="relative sm:w-1/2 aspect-square sm:aspect-auto overflow-hidden">
              <img
                src={product.image}
                alt={productTitle}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-[#2D2A26] px-2.5 py-1 text-[10px] uppercase tracking-widest font-bold text-white shadow-2xs">
                <Sparkles className="h-3 w-3 text-[#D89B8B]" />
                Host Pick
              </span>
            </div>
          ) : (
            <div className="relative sm:w-1/2 aspect-square flex flex-col justify-center items-center p-6 bg-gradient-to-br from-[#FAFAF8] to-[#F0EBE6]">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#2D2A26] px-3 py-1 text-[10px] uppercase tracking-widest font-bold text-white shadow-2xs mb-2">
                <Sparkles className="h-3 w-3 text-[#D89B8B]" />
                Host Pick
              </span>
              <p className="font-sans font-bold text-sm text-[#2D2A26] text-center">{shopDisplayName}</p>
            </div>
          )}

          {/* Details */}
          <div className="sm:w-1/2 p-4 flex flex-col justify-between bg-white">
            <div className="space-y-1.5">
              <div className="flex items-center gap-1 text-[10px] text-[#A89086] font-bold uppercase tracking-[0.12em]">
                <Store className="h-3 w-3 text-[#D89B8B]" />
                <span>{shopDisplayName}</span>
              </div>

              <h3 className="font-sans font-bold text-base text-[#2D2A26] leading-snug group-hover:text-[#D89B8B] transition-colors">
                {productTitle}
              </h3>

              {/* Quote box for Lynie thực sự thích món này! */}
              <div className="mt-1.5 rounded-xl bg-[#F0EBE6] p-2.5 border border-[#E8DED8]">
                <p className="font-serif italic text-xs text-[#2D2A26] leading-relaxed">
                  "{quoteText}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
