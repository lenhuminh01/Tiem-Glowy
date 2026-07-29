import React, { useState } from 'react';
import { TikTokPost, Product } from '../types/storefront';
import { Play, ShoppingBag, Sparkles, ExternalLink, X } from 'lucide-react';

interface TikTokSectionProps {
  posts: TikTokPost[];
  products: Product[];
  onQuickViewProduct: (product: Product) => void;
}

export const TikTokSection: React.FC<TikTokSectionProps> = ({
  posts,
  products,
  onQuickViewProduct,
}) => {
  const [activeVideo, setActiveVideo] = useState<TikTokPost | null>(null);

  const getProductsForPost = (postId: string) => {
    const post = posts.find((p) => p.id === postId);
    if (!post) return [];
    return products.filter((p) => post.taggedProductIds.includes(p.id));
  };

  return (
    <section className="py-6 px-4 sm:px-6">
      <div className="mx-auto max-w-xl">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-[#A89086] mb-1">
              <Sparkles className="h-3 w-3 text-[#D89B8B]" />
              <span>@prettyglowprincess</span>
            </div>
            <h2 className="font-sans font-bold text-xl text-[#2D2A26]">
              ✨ Video nổi bật
            </h2>
          </div>

          <a
            href="https://www.tiktok.com/@prettyglowprincess"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs uppercase tracking-wider font-bold text-[#D89B8B] hover:underline"
          >
            <span>TikTok</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        {/* Horizontal Swipe Carousel for TikTok Videos */}
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar snap-x snap-mandatory">
          {posts.map((post) => {
            const tagged = getProductsForPost(post.id);
            return (
              <div
                key={post.id}
                className="snap-start shrink-0 w-[240px] sm:w-[260px] group relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-white p-3 border border-[#E8DED8] transition-all hover:border-[#D89B8B]/50 hover:shadow-md"
              >
                {/* Thumbnail Aspect 9:14 vertical video style */}
                <div
                  onClick={() => setActiveVideo(post)}
                  className="relative aspect-[9/13] w-full cursor-pointer overflow-hidden rounded-[1.5rem] bg-black"
                >
                  <img
                    src={post.thumbnail}
                    alt={post.videoTitle}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-center opacity-90 transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/20" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/30 backdrop-blur-md border border-white/40 text-white transition-all group-hover:scale-110 group-hover:bg-[#D89B8B]">
                      <Play className="h-5 w-5 fill-white ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom Video Title / Caption */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs font-bold leading-snug line-clamp-2 drop-shadow-xs">
                      {post.videoTitle}
                    </p>
                  </div>
                </div>

                {/* Tagged Product Link or Products Drawer */}
                <div className="mt-2.5 px-0.5">
                  {post.productLink ? (
                    <a
                      href={post.productLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between w-full p-2 rounded-xl bg-[#FAFAF8] border border-[#E8DED8] text-xs font-bold text-[#2D2A26] hover:bg-[#D89B8B] hover:text-white transition-colors"
                    >
                      <span className="flex items-center gap-1.5 truncate">
                        <ShoppingBag className="h-3.5 w-3.5 text-[#D89B8B] shrink-0" />
                        <span>Sản phẩm trong video</span>
                      </span>
                      <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                    </a>
                  ) : tagged.length > 0 ? (
                    <div className="flex items-center justify-between text-[10px] font-bold text-[#2D2A26]">
                      <span className="flex items-center gap-1 text-[#D89B8B]">
                        <ShoppingBag className="h-3 w-3" />
                        Sản phẩm ({tagged.length})
                      </span>
                      <button
                        onClick={() => setActiveVideo(post)}
                        className="text-[#A89086] hover:text-[#2D2A26]"
                      >
                        Xem chi tiết
                      </button>
                    </div>
                  ) : (
                    <a
                      href={post.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 text-xs font-bold text-[#D89B8B] hover:underline"
                    >
                      <span>Xem trên TikTok</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Video Modal Preview */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div
            className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-[#2D2A26] text-white shadow-2xl border border-white/10 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between p-3.5 px-5 border-b border-white/10 bg-black/40">
              <span className="text-xs font-bold text-white/90">Xem video TikTok nổi bật</span>
              <button
                onClick={() => setActiveVideo(null)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Video Thumbnail simulated player */}
            <div className="relative aspect-[9/13] w-full bg-black overflow-hidden">
              <img
                src={activeVideo.thumbnail}
                alt={activeVideo.videoTitle}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <a
                  href={activeVideo.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-[#D89B8B] text-white shadow-xl transition-transform hover:scale-110 active:scale-95 ml-1"
                >
                  <Play className="h-7 w-7 fill-white ml-1" />
                </a>
                <p className="mt-3 text-xs font-medium text-white/80">
                  Nhấn để mở và xem trên TikTok
                </p>
              </div>

              {/* Title overlay */}
              <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10">
                <p className="text-xs font-bold text-white leading-snug">
                  {activeVideo.videoTitle}
                </p>
              </div>
            </div>

            {/* Product Link CTA in Modal */}
            {activeVideo.productLink && (
              <div className="p-4 bg-[#1F1815] border-t border-white/10">
                <a
                  href={activeVideo.productLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full p-3 rounded-xl bg-[#D89B8B] text-white text-xs uppercase font-bold tracking-wider hover:bg-white hover:text-[#2D2A26] transition-colors"
                >
                  <span>Xem sản phẩm trong video</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
