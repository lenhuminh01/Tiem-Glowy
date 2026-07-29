import React from 'react';
import { CreatorProfile } from '../types/storefront';

interface HeroProps {
  profile: CreatorProfile;
  onExploreClick?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section className="relative overflow-hidden pt-3 pb-3 px-4 sm:px-6">
      <div className="mx-auto max-w-lg text-center flex flex-col items-center">
        {/* Short Category Line */}
        <p className="text-xs font-semibold text-[#2D2A26] tracking-wide">
          Fashion • Beauty • Lifestyle
        </p>

        {/* Short Description */}
        <p className="mt-1 max-w-xs text-xs text-[#6B665F] leading-snug">
          Những món đồ xinh được Lynie chọn lọc và trải nghiệm
        </p>
      </div>
    </section>
  );
};
