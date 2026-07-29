import React from 'react';
import { CreatorProfile } from '../types/storefront';
import { ExternalLink } from 'lucide-react';

interface AboutLynieProps {
  profile: CreatorProfile;
}

export const AboutLynie: React.FC<AboutLynieProps> = ({ profile }) => {
  return (
    <section className="py-6 px-4 sm:px-6 max-w-xl mx-auto">
      <div className="rounded-[2rem] bg-white border border-[#E8DED8] p-5 text-center shadow-xs">
        <div className="mx-auto h-16 w-16 rounded-full overflow-hidden border-2 border-[#D89B8B] mb-3">
          <img
            src={profile.avatar}
            alt={profile.name}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
        </div>

        <h2 className="font-sans font-bold text-xl text-[#2D2A26]">
          Về Lynie
        </h2>

        <p className="mt-2 text-xs text-[#6B665F] leading-relaxed max-w-md mx-auto">
          Lynie yêu thích thời trang, makeup & phong cách sống tối giản. Tất cả sản phẩm được chia sẻ tại Tiệm Glowy đều do Lynie trực tiếp chọn lọc và trải nghiệm.
        </p>

        {/* Social Buttons */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <a
            href={profile.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#2D2A26] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#D89B8B] transition-colors"
          >
            <span>TikTok</span>
            <ExternalLink className="h-3 w-3" />
          </a>
          <a
            href={profile.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-[#2D2A26] border border-[#E8DED8] hover:bg-[#D89B8B] hover:text-white transition-colors"
          >
            <span>Instagram</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </section>
  );
};
