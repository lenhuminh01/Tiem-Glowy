import React from 'react';
import { CreatorProfile } from '../types/storefront';
import { Sparkles, Heart, Award, CheckCircle2 } from 'lucide-react';

interface AboutSectionProps {
  profile: CreatorProfile;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  return (
    <section className="py-12 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-white p-6 sm:p-10 border border-[#E8DED8] shadow-xl shadow-[#D89B8B]/5 relative overflow-hidden">
        {/* Soft Decorative Accent */}
        <div className="absolute top-0 right-0 -mr-12 -mt-12 h-48 w-48 rounded-full bg-[#D89B8B]/10 blur-2xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Creator Photo Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#FAFAF8] shadow-md border border-[#E8DED8]">
              <img
                src={profile.coverImage || profile.avatar}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="font-serif italic text-2xl font-normal">{profile.name}</p>
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/80 font-bold">Founder & Curator @ Tiệm Glowy</p>
              </div>
            </div>
          </div>

          {/* About Text Content */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F0EBE6] border border-[#E8DED8] px-3.5 py-1 text-[11px] uppercase tracking-[0.2em] font-bold text-[#A89086]">
              <Sparkles className="h-3.5 w-3.5 text-[#D89B8B]" />
              <span>Behind the Brand</span>
            </div>

            <h2 className="font-serif italic text-3xl sm:text-4xl font-normal text-[#2D2A26] leading-tight">
              A gentle space for curated glow & daily inspiration.
            </h2>

            <p className="font-sans text-xs sm:text-sm text-[#6B665F] leading-relaxed">
              {profile.aboutText}
            </p>

            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {profile.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="rounded-[1.25rem] bg-[#FAFAF8] p-3 text-center border border-[#E8DED8]"
                >
                  <p className="font-serif italic text-xl sm:text-2xl font-normal text-[#2D2A26]">
                    {stat.value}
                  </p>
                  <p className="text-[10px] font-bold text-[#A89086] uppercase tracking-[0.15em] mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Core Values */}
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-[#6B665F]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#D89B8B]" />
                Non-sponsored Honest Reviews
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="h-4 w-4 text-[#D89B8B]" />
                Exclusive Discount Vouchers
              </span>
              <span className="flex items-center gap-1.5">
                <Heart className="h-4 w-4 text-[#D89B8B]" />
                Daily TikTok Updates
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
