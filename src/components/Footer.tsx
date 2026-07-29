import React from 'react';
import { CreatorProfile } from '../types/storefront';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  profile: CreatorProfile;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-8 border-t border-[#E8DED8] bg-white py-8 px-4 sm:px-6">
      <div className="mx-auto max-w-xl text-center space-y-4">
        {/* Brand & Copyright */}
        <div>
          <h3 className="font-serif italic text-xl font-normal text-[#2D2A26]">
            {profile.brand}
          </h3>
          <p className="text-[11px] font-medium text-[#A89086] mt-0.5">
            © {new Date().getFullYear()} {profile.brand}. Curated by {profile.name} ✨
          </p>
        </div>

        {/* Affiliate Link Disclaimer */}
        <p className="text-[10px] text-[#A89086] leading-relaxed max-w-md mx-auto italic">
          Trang web này tổng hợp các liên kết tiếp thị liên kết (affiliate links). Lynie có thể nhận được một khoản hoa hồng nhỏ khi bạn mua hàng qua các liên kết này mà bạn không tốn thêm bất kỳ chi phí nào.
        </p>

        {/* Back to top button */}
        <div className="pt-2">
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#F0EBE6] px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#2D2A26] hover:bg-[#D89B8B] hover:text-white transition-colors"
          >
            <span>Về đầu trang</span>
            <ArrowUp className="h-3 w-3" />
          </button>
        </div>
      </div>
    </footer>
  );
};
