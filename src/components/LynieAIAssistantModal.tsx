import React, { useState, useEffect } from 'react';
import { Product, MainCategory, BeautyProfile } from '../types/storefront';
import { AIRecommendationService, AIRecommendationResult } from '../services/aiRecommendationService';
import { AIKnowledgeService } from '../services/aiKnowledgeService';
import { TrackingService } from '../services/trackingService';
import { ProductCard } from './ProductCard';
import {
  Sparkles,
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sun,
  Moon,
  Bot,
  RefreshCw,
  Heart,
} from 'lucide-react';

interface LynieAIAssistantModalProps {
  isOpen: boolean;
  products: Product[];
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const LynieAIAssistantModal: React.FC<LynieAIAssistantModalProps> = ({
  isOpen,
  products,
  onClose,
  onSelectProduct,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Category, 2: Concern, 3: Preference, 4: Routine Result
  const [selectedCategory, setSelectedCategory] = useState<MainCategory>('skincare');
  const [selectedConcern, setSelectedConcern] = useState<
    'acne' | 'dullness' | 'aging' | 'dryness' | 'oily' | 'sensitive'
  >('dullness');
  const [selectedPreference, setSelectedPreference] = useState<string>('dưỡng mỏng nhẹ');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AIRecommendationResult | null>(null);

  useEffect(() => {
    if (isOpen) {
      TrackingService.logPageView('landing', '/ai-assistant', 'beauty_quiz_started');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const categories: { id: MainCategory; label: string; icon: string }[] = [
    { id: 'skincare', label: 'Skincare', icon: '💧' },
    { id: 'makeup', label: 'Makeup', icon: '💄' },
    { id: 'bodycare', label: 'Body Care', icon: '✨' },
    { id: 'haircare', label: 'Hair Care', icon: '🌿' },
  ];

  const concerns: {
    id: 'acne' | 'dullness' | 'aging' | 'dryness' | 'oily' | 'sensitive';
    label: string;
    description: string;
  }[] = [
    { id: 'dullness', label: 'Da xỉn màu & Căng bóng', description: 'Muốn da mọng nước chuẩn Hàn' },
    { id: 'acne', label: 'Mụn & Thâm sau mụn', description: 'Cần dịu nhẹ, mờ thâm' },
    { id: 'oily', label: 'Da dầu & Bóng nhờn', description: 'Cần kiềm dầu, thoáng nhẹ' },
    { id: 'dryness', label: 'Da khô & Thiếu ẩm', description: 'Cần cấp nước sâu, mềm da' },
    { id: 'sensitive', label: 'Da nhạy cảm & Dễ kích ứng', description: 'Thành phần 100% dịu nhẹ' },
    { id: 'aging', label: 'Chống lão hóa & Nếp nhăn', description: 'Phục hồi, mọng mịn' },
  ];

  const preferences = [
    'Thành phần thiên nhiên & Lành tính',
    'Căng bóng Glass Skin chuẩn Hàn',
    'Dưỡng mỏng nhẹ không bí tắc',
    'Học sinh / Sinh viên giá hợp lý',
  ];

  const handleGenerateRecommendation = () => {
    setIsAnalyzing(true);
    TrackingService.logPageView('landing', '/ai-assistant/analyzing', 'beauty_quiz_completed');

    setTimeout(() => {
      const profile: BeautyProfile = {
        category: selectedCategory,
        skinConcern: selectedConcern,
        tags: [selectedPreference],
      };

      const res = AIRecommendationService.recommendForBeautyProfile(profile, products);
      setResult(res);
      setIsAnalyzing(false);
      setStep(4);
    }, 1000);
  };

  const handleResetQuiz = () => {
    setStep(1);
    setResult(null);
  };

  const routineAdvice = AIKnowledgeService.getRoutineAdvice(selectedConcern);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      {/* Modal Container */}
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-t-[2.5rem] sm:rounded-[2.5rem] bg-[#FAFAF8] text-[#2D2A26] shadow-2xl border border-[#E8DED8] max-h-[92vh] flex flex-col animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-[#E8DED8] bg-white/90 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D89B8B] text-white font-serif italic text-base shadow-2xs">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#A89086]">
                AI Beauty Advisor
              </span>
              <h3 className="font-serif italic text-base font-normal text-[#2D2A26] leading-none">
                Lynie AI Assistance ✨
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

        {/* Body Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-5 no-scrollbar">
          {/* Step 1 to 3 Form View */}
          {step < 4 && (
            <div className="space-y-5">
              {/* Persona Greeting Header */}
              <div className="rounded-[1.75rem] bg-white p-5 border border-[#E8DED8] shadow-2xs space-y-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#D89B8B] text-white text-xs font-serif italic font-bold">
                    L
                  </span>
                  <p className="font-serif italic text-lg text-[#2D2A26]">
                    "Hi, mình là Lynie ✨ Mình giúp bạn tìm sản phẩm phù hợp."
                  </p>
                </div>
                <p className="text-xs text-[#6B665F] leading-relaxed">
                  Trả lời 3 câu hỏi ngắn bên dưới để Lynie xây dựng routine làm đẹp dành riêng cho bạn.
                </p>

                {/* Progress Indicators */}
                <div className="pt-2 flex items-center justify-between gap-1.5">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={`h-1.5 flex-1 rounded-full transition-all ${
                        step >= s ? 'bg-[#D89B8B]' : 'bg-[#E8DED8]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* STEP 1: CATEGORY */}
              {step === 1 && (
                <div className="space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-[#A89086] uppercase tracking-[0.15em]">
                      Bước 1: Chọn ngành hàng làm đẹp
                    </h4>
                    <span className="text-[11px] text-[#A89086] font-semibold">1/3</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all ${
                          selectedCategory === cat.id
                            ? 'bg-[#2D2A26] text-white border-[#2D2A26] shadow-2xs scale-[1.02]'
                            : 'bg-white text-[#2D2A26] border-[#E8DED8] hover:border-[#D89B8B]'
                        }`}
                      >
                        <span className="text-xl">{cat.icon}</span>
                        <span className="text-xs font-bold">{cat.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setStep(2)}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-[#2D2A26] py-3 text-xs uppercase tracking-[0.15em] font-bold text-white shadow-2xs hover:bg-[#D89B8B] transition-colors"
                    >
                      <span>Tiếp tục: Nhu cầu làn da</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: CONCERN */}
              {step === 2 && (
                <div className="space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-[#A89086] uppercase tracking-[0.15em]">
                      Bước 2: Tình trạng da & Nhu cầu chính
                    </h4>
                    <span className="text-[11px] text-[#A89086] font-semibold">2/3</span>
                  </div>

                  <div className="space-y-2">
                    {concerns.map((con) => (
                      <button
                        key={con.id}
                        onClick={() => setSelectedConcern(con.id)}
                        className={`flex w-full items-center justify-between p-3.5 rounded-2xl border text-left transition-all ${
                          selectedConcern === con.id
                            ? 'bg-[#2D2A26] text-white border-[#2D2A26] shadow-2xs'
                            : 'bg-white text-[#2D2A26] border-[#E8DED8] hover:border-[#D89B8B]'
                        }`}
                      >
                        <div>
                          <p className="text-xs font-bold">{con.label}</p>
                          <p
                            className={`text-[11px] mt-0.5 ${
                              selectedConcern === con.id ? 'text-white/80' : 'text-[#6B665F]'
                            }`}
                          >
                            {con.description}
                          </p>
                        </div>
                        {selectedConcern === con.id && (
                          <CheckCircle2 className="h-4 w-4 text-[#D89B8B] shrink-0 ml-2" />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => setStep(1)}
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-white border border-[#E8DED8] text-[#2D2A26] shrink-0 hover:bg-[#F0EBE6]"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="flex-1 flex items-center justify-center gap-2 rounded-full bg-[#2D2A26] py-3 text-xs uppercase tracking-[0.15em] font-bold text-white shadow-2xs hover:bg-[#D89B8B] transition-colors"
                    >
                      <span>Tiếp tục: Sở thích</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: PREFERENCE */}
              {step === 3 && (
                <div className="space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-[#A89086] uppercase tracking-[0.15em]">
                      Bước 3: Ghi chú & Sở thích của bạn
                    </h4>
                    <span className="text-[11px] text-[#A89086] font-semibold">3/3</span>
                  </div>

                  <div className="space-y-2">
                    {preferences.map((pref) => (
                      <button
                        key={pref}
                        onClick={() => setSelectedPreference(pref)}
                        className={`flex w-full items-center justify-between p-3.5 rounded-2xl border text-left transition-all ${
                          selectedPreference === pref
                            ? 'bg-[#2D2A26] text-white border-[#2D2A26] shadow-2xs'
                            : 'bg-white text-[#2D2A26] border-[#E8DED8] hover:border-[#D89B8B]'
                        }`}
                      >
                        <span className="text-xs font-bold">{pref}</span>
                        {selectedPreference === pref && (
                          <CheckCircle2 className="h-4 w-4 text-[#D89B8B] shrink-0 ml-2" />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => setStep(2)}
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-white border border-[#E8DED8] text-[#2D2A26] shrink-0 hover:bg-[#F0EBE6]"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleGenerateRecommendation}
                      disabled={isAnalyzing}
                      className="flex-1 flex items-center justify-center gap-2 rounded-full bg-[#2D2A26] py-3 text-xs uppercase tracking-[0.15em] font-bold text-white shadow-2xs hover:bg-[#D89B8B] transition-colors disabled:opacity-50"
                    >
                      {isAnalyzing ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin text-[#D89B8B]" />
                          <span>AI Lynie đang phân tích...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 text-[#D89B8B]" />
                          <span>Xem Routine Lynie khuyên dùng</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: ROUTINE RESULT PAGE */}
          {step === 4 && result && (
            <div className="space-y-5 animate-fadeIn">
              {/* Routine Title Banner */}
              <div className="rounded-[1.75rem] bg-white p-5 border border-[#E8DED8] shadow-2xs space-y-2 text-center">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F0EBE6] px-3.5 py-1 text-[10px] uppercase tracking-[0.15em] font-bold text-[#A89086]">
                  <Sparkles className="h-3 w-3 text-[#D89B8B]" />
                  <span>Dành riêng cho bạn</span>
                </div>
                <h3 className="font-serif italic text-2xl font-normal text-[#2D2A26]">
                  Lynie chọn routine phù hợp cho bạn ✨
                </h3>
                <p className="text-xs text-[#6B665F] leading-relaxed max-w-sm mx-auto">
                  {result.reasoning}
                </p>

                <div className="pt-2 flex items-center justify-center gap-2">
                  <button
                    onClick={handleResetQuiz}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#A89086] hover:text-[#2D2A26]"
                  >
                    <RefreshCw className="h-3 w-3" />
                    <span>Làm lại trắc nghiệm</span>
                  </button>
                </div>
              </div>

              {/* Routine Schedule Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Morning Routine */}
                <div className="rounded-2xl bg-white p-4 border border-[#E8DED8] space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D2A26]">
                    <Sun className="h-4 w-4 text-amber-500" />
                    <span>Morning Routine (Sáng)</span>
                  </div>
                  <ul className="space-y-1 text-xs text-[#6B665F]">
                    {routineAdvice.morning.map((stepItem, idx) => (
                      <li key={idx} className="line-clamp-1">{stepItem}</li>
                    ))}
                  </ul>
                </div>

                {/* Evening Routine */}
                <div className="rounded-2xl bg-white p-4 border border-[#E8DED8] space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D2A26]">
                    <Moon className="h-4 w-4 text-indigo-400" />
                    <span>Evening Routine (Tối)</span>
                  </div>
                  <ul className="space-y-1 text-xs text-[#6B665F]">
                    {routineAdvice.evening.map((stepItem, idx) => (
                      <li key={idx} className="line-clamp-1">{stepItem}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recommended Product List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif italic text-xl text-[#2D2A26]">
                    Top {result.recommendedProducts.length} sản phẩm gợi ý
                  </h4>
                  <span className="text-[10px] font-bold text-[#A89086] uppercase tracking-wider">
                    Độ tương thích {result.matchScore}%
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {result.recommendedProducts.map((product) => (
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
          )}
        </div>
      </div>
    </div>
  );
};
