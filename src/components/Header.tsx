import React, { useState } from 'react';
import { CreatorProfile } from '../types/storefront';
import { Share2, Check, Instagram, Sparkles } from 'lucide-react';

interface HeaderProps {
  profile: CreatorProfile;
  onOpenAIAssistant?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ profile, onOpenAIAssistant }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E8DED8] bg-[#FAFAF8]/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-xl items-center justify-between px-4 py-2.5 sm:px-6">
        {/* Brand Title & Subtitle with Avatar */}
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-full border border-[#D89B8B] overflow-hidden shrink-0 shadow-2xs">
            <img
              src={profile.avatar}
              alt={profile.name}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div>
            <h1 className="font-serif italic text-xl font-normal tracking-tight text-[#2D2A26] leading-none">
              Tiệm Glowy
            </h1>
          </div>
        </div>

        {/* Action Icons: AI Assistant, TikTok, Instagram, Share */}
        <div className="flex items-center gap-1.5">
          {/* Lynie AI Trigger Pill */}
          <button
            onClick={onOpenAIAssistant}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#2D2A26] px-3 py-1.5 text-[11px] font-bold text-white shadow-2xs hover:bg-[#D89B8B] transition-all active:scale-95"
            title="Lynie AI Beauty Advisor"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#D89B8B]" />
            <span className="hidden sm:inline">Ask</span>
            <span>Lynie AI</span>
          </button>

          {/* TikTok */}
          <a
            href={profile.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#2D2A26] border border-[#E8DED8] hover:bg-[#D89B8B] hover:text-white transition-colors shadow-2xs"
            title="TikTok @prettyglowprincess"
          >
            <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-2.83V7.65a6.34 6.34 0 0 0-3.56 1.08 6.34 6.34 0 0 0-2.82 4.9 6.34 6.34 0 0 0 10.86 4.39V12a8.28 8.28 0 0 0 5.63 2.19V10.7a4.81 4.81 0 0 1-3.45-1.51z"/>
            </svg>
          </a>

          {/* Instagram */}
          <a
            href={profile.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#2D2A26] border border-[#E8DED8] hover:bg-[#D89B8B] hover:text-white transition-colors shadow-2xs"
            title="Instagram @lynieglowup"
          >
            <Instagram className="h-3.5 w-3.5" />
          </a>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#2D2A26] border border-[#E8DED8] hover:bg-[#D89B8B] hover:text-white transition-colors shadow-2xs"
            title="Chia sẻ cửa hàng"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
    </header>
  );
};

