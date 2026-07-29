import React from 'react';
import { MainCategory, SubCategory } from '../types/storefront';
import { Sparkles, Heart, Droplets, Smile, Wind, Shirt, Compass, Store, Cookie } from 'lucide-react';

interface CategoryNavProps {
  activeCategory: MainCategory;
  activeSubCategory?: SubCategory | 'all';
  onSelectCategory: (category: MainCategory, subCategory?: SubCategory | 'all') => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  activeSubCategory = 'all',
  onSelectCategory,
}) => {
  const mainCategories: { id: MainCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'Tất cả', icon: <Sparkles className="h-3.5 w-3.5" /> },
    { id: 'fashion', label: 'Thời trang', icon: <Shirt className="h-3.5 w-3.5" /> },
    { id: 'skincare', label: 'Skincare', icon: <Droplets className="h-3.5 w-3.5" /> },
    { id: 'makeup', label: 'Makeup', icon: <Smile className="h-3.5 w-3.5" /> },
    { id: 'bodycare', label: 'Body Care', icon: <Heart className="h-3.5 w-3.5" /> },
    { id: 'haircare', label: 'Hair Care', icon: <Wind className="h-3.5 w-3.5" /> },
    { id: 'lifestyle', label: 'Lifestyle', icon: <Compass className="h-3.5 w-3.5" /> },
    { id: 'grocery', label: 'Bách hóa', icon: <Store className="h-3.5 w-3.5" /> },
    { id: 'snacks', label: 'Đồ ăn vặt', icon: <Cookie className="h-3.5 w-3.5" /> },
  ];

  const subCategoryMap: Record<MainCategory, { id: SubCategory; label: string }[]> = {
    all: [],
    fashion: [
      { id: 'fashion_tops', label: 'Áo kiểu & Top' },
      { id: 'fashion_dresses', label: 'Đầm & Dress' },
      { id: 'fashion_skirts', label: 'Chân váy & Skirt' },
      { id: 'fashion_pants', label: 'Quần & Short' },
      { id: 'fashion_sets', label: 'Set phối & Yếm' },
    ],
    skincare: [
      { id: 'cleanser', label: 'Tẩy trang & Sữa rửa mặt' },
      { id: 'serum', label: 'Serum & Tinh chất' },
      { id: 'sunscreen', label: 'Kem chống nắng' },
      { id: 'moisturizer', label: 'Kem dưỡng ẩm' },
    ],
    makeup: [
      { id: 'lip', label: 'Son môi & Tint' },
      { id: 'cushion', label: 'Cushion' },
      { id: 'foundation', label: 'Kem nền' },
      { id: 'blush', label: 'Phấn hồng' },
    ],
    bodycare: [
      { id: 'body_lotion', label: 'Dưỡng thể' },
      { id: 'body_scrub', label: 'Tẩy tế bào chết' },
      { id: 'fragrance', label: 'Nến & Nước hoa' },
    ],
    haircare: [
      { id: 'hair_care', label: 'Dưỡng tóc & Shampoo' },
    ],
    lifestyle: [],
    grocery: [],
    snacks: [],
  };

  const currentSubCategories = subCategoryMap[activeCategory] || [];

  return (
    <div className="space-y-2.5 my-3">
      {/* Main Categories Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {mainCategories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id, 'all')}
              className={`inline-flex items-center gap-1.5 shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all duration-300 ${
                isActive
                  ? 'bg-[#2D2A26] text-white shadow-xs scale-[1.02]'
                  : 'bg-white text-[#6B665F] border border-[#E8DED8] hover:bg-[#D89B8B] hover:text-white hover:border-[#D89B8B]'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Sub-categories Pills */}
      {currentSubCategories.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5 pb-1">
          <button
            onClick={() => onSelectCategory(activeCategory, 'all')}
            className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold transition-all ${
              activeSubCategory === 'all'
                ? 'bg-[#D89B8B] text-white'
                : 'bg-[#F0EBE6] text-[#A89086] hover:text-[#2D2A26]'
            }`}
          >
            Tất cả {mainCategories.find((c) => c.id === activeCategory)?.label}
          </button>

          {currentSubCategories.map((sub) => {
            const isSubActive = activeSubCategory === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => onSelectCategory(activeCategory, sub.id)}
                className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold transition-all ${
                  isSubActive
                    ? 'bg-[#D89B8B] text-white shadow-2xs'
                    : 'bg-[#F0EBE6] text-[#6B665F] hover:bg-[#E8DED8]'
                }`}
              >
                {sub.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
