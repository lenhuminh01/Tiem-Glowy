import React from 'react';
import { X, FileSpreadsheet, Code, CheckCircle } from 'lucide-react';

interface GoogleSheetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  productCount: number;
}

export const GoogleSheetsModal: React.FC<GoogleSheetsModalProps> = ({
  isOpen,
  onClose,
  productCount,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-[2.5rem] bg-white text-[#2D2A26] shadow-2xl border border-[#E8DED8] max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-[#E8DED8] bg-[#FAFAF8]">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-[#D89B8B]" />
            <h3 className="font-serif text-xl font-normal text-[#2D2A26]">
              Cấu trúc Cột dữ liệu Google Sheets CSV
            </h3>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#2D2A26] border border-[#E8DED8] hover:bg-[#2D2A26] hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-[#6B665F] leading-relaxed no-scrollbar">
          {/* Active Status */}
          <div className="rounded-[1.5rem] bg-[#F0EBE6] p-4 border border-[#E8DED8] flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[#2D2A26]">
                Đã kết nối trực tiếp Google Sheet CSV
              </p>
              <p className="text-xs text-[#6B665F] mt-1">
                Hiện đang nạp thành công <span className="font-bold text-[#2D2A26]">{productCount} sản phẩm</span> từ Google Sheet của bạn.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-[#2D2A26] flex items-center gap-2">
              <Code className="h-4 w-4 text-[#D89B8B]" />
              Các cột khuyên dùng bổ sung vào Google Sheet:
            </h4>
            <ul className="space-y-1.5 bg-[#FAFAF8] p-4 rounded-[1.25rem] border border-[#E8DED8] text-xs text-[#2D2A26] font-mono">
              <li>• <span className="text-[#D89B8B] font-bold">subCategory</span>: Phân loại chi tiết (fashion_tops, fashion_dresses, fashion_skirts, fashion_pants, fashion_sets).</li>
              <li>• <span className="text-[#D89B8B] font-bold">isLyniePick</span>: Điền TRUE để hiện ở mục Lynie's Picks.</li>
              <li>• <span className="text-[#D89B8B] font-bold">isHostPick</span>: Điền TRUE để làm Pick Trong Ngày nổi bật nhất.</li>
              <li>• <span className="text-[#D89B8B] font-bold">lynieReview</span>: Lời đánh giá/nhận xét ngắn của Lynie.</li>
              <li>• <span className="text-[#D89B8B] font-bold">price & originalPrice</span>: Giá bán và giá gốc.</li>
              <li>• <span className="text-[#D89B8B] font-bold">discountCode</span>: Mã giảm giá (ví dụ: LYNIE10K).</li>
              <li>• <span className="text-[#D89B8B] font-bold">badge</span>: Nhãn nổi bật (Best Seller, Hot Summer,...).</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-[#E8DED8] bg-[#FAFAF8] flex justify-end">
          <button
            onClick={onClose}
            className="rounded-full bg-[#2D2A26] px-6 py-2.5 text-xs uppercase tracking-[0.15em] font-bold text-white hover:bg-[#D89B8B] transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
