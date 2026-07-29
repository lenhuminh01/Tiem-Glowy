import React from 'react';
import { Collection } from '../types/storefront';
import { ArrowUpRight } from 'lucide-react';

interface CollectionCardProps {
  collection: Collection;
  isSelected?: boolean;
  onSelect: (slug: Collection['slug']) => void;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({
  collection,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      onClick={() => onSelect(collection.slug)}
      className={`group relative cursor-pointer overflow-hidden rounded-[2rem] bg-white p-3.5 transition-all duration-300 ease-out border ${
        isSelected
          ? 'border-[#D89B8B] shadow-md ring-2 ring-[#D89B8B]/30'
          : 'border-[#E8DED8] hover:border-[#D89B8B]/50 hover:shadow-lg'
      }`}
    >
      {/* Cover Image */}
      <div className="relative aspect-[16/9] sm:aspect-[2/1] w-full overflow-hidden rounded-[1.5rem] bg-[#FAFAF8]">
        <img
          src={collection.image}
          alt={collection.title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Product Count Pill */}
        <div className="absolute top-3 right-3">
          <span className="rounded-full bg-black/50 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-md">
            {collection.itemCount} sản phẩm
          </span>
        </div>

        {/* Collection Title & Subtitle */}
        <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
          <h3 className="font-serif italic text-xl sm:text-2xl font-normal text-white leading-tight">
            {collection.title}
          </h3>
          <p className="text-[11px] text-white/80 line-clamp-1 font-light mt-0.5">
            {collection.subtitle}
          </p>
        </div>
      </div>

      {/* Pinterest Board Style: Overlapping Featured Thumbnails & Description */}
      <div className="mt-3 px-1 flex items-center justify-between gap-2">
        {/* Overlapping Thumbnails */}
        {collection.featuredThumbnails && collection.featuredThumbnails.length > 0 && (
          <div className="flex items-center -space-x-3 shrink-0">
            {collection.featuredThumbnails.map((thumb, idx) => (
              <div
                key={idx}
                className="h-10 w-10 rounded-full border-2 border-white overflow-hidden shadow-xs bg-[#F0EBE6]"
              >
                <img
                  src={thumb}
                  alt={`thumbnail-${idx}`}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        <p className="text-[11px] text-[#6B665F] line-clamp-2 leading-tight flex-1">
          {collection.description}
        </p>

        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F0EBE6] text-[#2D2A26] transition-all group-hover:bg-[#D89B8B] group-hover:text-white">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </div>
  );
};
