import React, { useState, useMemo, useEffect } from 'react';
import {
  initialCollections,
  initialTikToks,
  initialProfile,
  filterProductsByCategory,
} from './data/storefrontData';
import { fetchProducts, fetchTikTokVideos } from './services/productService';
import { MainCategory, SubCategory, Product, Collection, TikTokPost } from './types/storefront';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HostPickCard } from './components/HostPickCard';
import { CollectionModal } from './components/CollectionModal';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { LynieAIAssistantModal } from './components/LynieAIAssistantModal';
import { TikTokSection } from './components/TikTokSection';
import { AboutLynie } from './components/AboutLynie';
import { Footer } from './components/Footer';
import { CategoryNav } from './components/CategoryNav';
import { TrackingService } from './services/trackingService';
import { Flame, Shirt, ChevronDown } from 'lucide-react';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [tikTokPosts, setTikTokPosts] = useState<TikTokPost[]>(initialTikToks);
  const [selectedMainCategory, setSelectedMainCategory] = useState<MainCategory>('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | 'all'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCollectionSlug, setSelectedCollectionSlug] = useState<string | null>(null);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  // Section 1: Lynie's Pick (top featured item with value = 1 in Column F)
  const hostPickProduct = useMemo(() => {
    const pickOne = products.find((p) => p.pickValue === '1');
    if (pickOne) return pickOne;
    return products.find((p) => p.isHostPick) || products[0];
  }, [products]);

  // Section 2: Fashion Show (Products ticked in FA sheet)
  const fashionShowProducts = useMemo(() => {
    const faItems = products.filter((p) => p.sheetOrigin === 'FA');
    if (faItems.length > 0) return faItems;
    return products.filter((p) => p.category === 'fashion');
  }, [products]);

  // Section 3: Trending Beauty (Products ticked in HB sheet)
  const trendingBeautyProducts = useMemo(() => {
    const hbItems = products.filter((p) => p.sheetOrigin === 'HB');
    if (hbItems.length > 0) return hbItems;
    return products.filter(
      (p) =>
        p.category === 'makeup' ||
        p.category === 'skincare' ||
        p.category === 'bodycare' ||
        p.category === 'haircare'
    );
  }, [products]);

  // Filter products by active category & subcategory for All Products
  const categoryProducts = useMemo(() => {
    let list = filterProductsByCategory(products, selectedMainCategory as any);
    if (selectedSubCategory && selectedSubCategory !== 'all') {
      list = list.filter((p) => p.subCategory === selectedSubCategory);
    }
    return list;
  }, [products, selectedMainCategory, selectedSubCategory]);

  useEffect(() => {
    fetchProducts().then(setProducts);
    fetchTikTokVideos().then(setTikTokPosts);
  }, []);

  useEffect(() => {
    TrackingService.logPageView('landing', '/');

    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#product/')) {
        const productId = hash.replace('#product/', '');
        const found = products.find((p) => p.id === productId);
        if (found) {
          setSelectedProduct(found);
          TrackingService.logPageView('product_detail', `/product/${productId}`);
        }
      } else if (hash.startsWith('#collections/')) {
        const slug = hash.replace('#collections/', '');
        setSelectedCollectionSlug(slug);
        TrackingService.logPageView('collection', `/collections/${slug}`);
      } else if (hash === '#ai-assistant') {
        setIsAIAssistantOpen(true);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [products]);

  const handleOpenCollection = (slug: string) => {
    setSelectedCollectionSlug(slug);
    window.location.hash = `collections/${slug}`;
  };

  const handleCloseCollection = () => {
    setSelectedCollectionSlug(null);
    if (window.location.hash.startsWith('#collections/')) {
      history.pushState('', document.title, window.location.pathname + window.location.search);
    }
  };

  const getCollectionProductsForSlug = (slug: string | null): Product[] => {
    if (!slug) return [];
    if (slug === 'fashion-show') return fashionShowProducts;
    if (slug === 'trending') return trendingBeautyProducts;
    return products.filter((p) => p.category === slug || p.collectionId === slug);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#2D2A26] font-sans antialiased flex flex-col justify-between relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="fixed -top-16 -right-16 w-96 h-96 bg-[#D89B8B] rounded-full blur-[140px] opacity-15 pointer-events-none z-0" />
      <div className="fixed top-1/2 -left-16 w-80 h-80 bg-[#B0ADA8] rounded-full blur-[140px] opacity-15 pointer-events-none z-0" />

      <div className="relative z-10">
        {/* Header */}
        <Header
          profile={initialProfile}
          onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
        />

        {/* Main Content (Mobile-First Funnel Layout) */}
        <main className="mx-auto max-w-xl">
          {/* HERO */}
          <Hero
            profile={initialProfile}
            onExploreClick={() => setIsAIAssistantOpen(true)}
          />

          {/* SECTION 1: ✨ LYNIE'S PICK (Product ticked in Summary sheet) */}
          {hostPickProduct && (
            <HostPickCard
              product={hostPickProduct}
              onSelectProduct={setSelectedProduct}
            />
          )}

          {/* SECTION 2: 💃 FASHION SHOW (Products ticked in FA sheet) */}
          {fashionShowProducts.length > 0 && (
            <section className="py-5 px-4 sm:px-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <Shirt className="h-4 w-4 text-[#D89B8B]" />
                  <h2 className="font-sans font-bold text-xl text-[#2D2A26]">
                    💃 Fashion Show
                  </h2>
                </div>
                <button
                  onClick={() => handleOpenCollection('fashion-show')}
                  className="text-xs font-bold text-[#D89B8B] uppercase tracking-wider hover:underline"
                >
                  Xem tất cả ›
                </button>
              </div>

              {/* Horizontal Carousel */}
              <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar snap-x snap-mandatory">
                {fashionShowProducts.map((product) => (
                  <div key={product.id} className="snap-start shrink-0 w-[200px] sm:w-[220px]">
                    <ProductCard
                      product={product}
                      showBadge={false}
                      onQuickView={setSelectedProduct}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SECTION 3: 🔥 TRENDING BEAUTY (Products ticked in HB sheet - Placed between Fashion Show and Video nổi bật) */}
          {trendingBeautyProducts.length > 0 && (
            <section className="py-5 px-4 sm:px-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <Flame className="h-4 w-4 text-[#D89B8B] fill-[#D89B8B]" />
                  <h2 className="font-sans font-bold text-xl text-[#2D2A26]">
                    🔥 Trending Beauty
                  </h2>
                </div>
                <button
                  onClick={() => handleOpenCollection('trending')}
                  className="text-xs font-bold text-[#D89B8B] uppercase tracking-wider hover:underline"
                >
                  Xem tất cả ›
                </button>
              </div>

              {/* Horizontal Carousel */}
              <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar snap-x snap-mandatory">
                {trendingBeautyProducts.map((product) => (
                  <div key={product.id} className="snap-start shrink-0 w-[200px] sm:w-[220px]">
                    <ProductCard
                      product={product}
                      showBadge={false}
                      onQuickView={setSelectedProduct}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SECTION 4: ✨ VIDEO NỔI BẬT (Vid sheet) */}
          <TikTokSection
            posts={tikTokPosts}
            products={products}
            onQuickViewProduct={setSelectedProduct}
          />

          {/* SECTION 5: TẤT CẢ SẢN PHẨM & DYNAMIC CATEGORY NAVIGATION */}
          <section id="all-products-section" className="py-5 px-4 sm:px-6 scroll-mt-16">
            <div className="flex flex-col gap-2 mb-3">
              <div className="flex items-center justify-between">
                <h2 className="font-sans font-bold text-xl text-[#2D2A26]">
                  Tất cả sản phẩm
                </h2>
                <span className="text-xs font-bold text-[#A89086] bg-white px-3 py-1 rounded-full border border-[#E8DED8]">
                  {categoryProducts.length} sản phẩm
                </span>
              </div>

              {/* Category & Subcategory Navigation Bar */}
              <CategoryNav
                activeCategory={selectedMainCategory}
                activeSubCategory={selectedSubCategory}
                onSelectCategory={(main, sub) => {
                  setSelectedMainCategory(main);
                  setSelectedSubCategory(sub || 'all');
                  setVisibleCount(12);
                }}
              />
            </div>

            {/* Product Cards Grid */}
            {categoryProducts.length > 0 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {categoryProducts.slice(0, visibleCount).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      showBadge={false}
                      onQuickView={setSelectedProduct}
                    />
                  ))}
                </div>

                {categoryProducts.length > visibleCount && (
                  <div className="pt-2 text-center">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 12)}
                      className="inline-flex items-center gap-2 rounded-full bg-[#2D2A26] px-6 py-2.5 text-xs uppercase tracking-[0.15em] font-bold text-white shadow-2xs hover:bg-[#D89B8B] active:scale-95 transition-all"
                    >
                      <span>Xem thêm sản phẩm (Còn {categoryProducts.length - visibleCount})</span>
                      <ChevronDown className="h-4 w-4 text-[#D89B8B]" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-[2rem] bg-white p-8 text-center border border-[#E8DED8] space-y-2">
                <h3 className="font-sans font-bold text-base text-[#2D2A26]">
                  Chưa có sản phẩm
                </h3>
                <p className="text-xs text-[#6B665F]">
                  Chưa có sản phẩm nào trong danh mục này.
                </p>
                <button
                  onClick={() => {
                    setSelectedMainCategory('all');
                    setSelectedSubCategory('all');
                  }}
                  className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#2D2A26] px-5 py-2 text-xs font-bold text-white hover:bg-[#D89B8B] transition-colors"
                >
                  Xem tất cả
                </button>
              </div>
            )}
          </section>

          {/* VỀ LYNIE */}
          <AboutLynie profile={initialProfile} />
        </main>

        {/* FOOTER */}
        <Footer profile={initialProfile} />
      </div>

      {/* Lynie AI Assistant Modal */}
      <LynieAIAssistantModal
        isOpen={isAIAssistantOpen}
        products={products}
        onClose={() => setIsAIAssistantOpen(false)}
        onSelectProduct={setSelectedProduct}
      />

      {/* Collection Modal Page (/collections/:slug) */}
      <CollectionModal
        slug={selectedCollectionSlug}
        products={getCollectionProductsForSlug(selectedCollectionSlug)}
        onClose={handleCloseCollection}
        onSelectProduct={setSelectedProduct}
      />

      {/* Product Detail Modal Page (/product/:id) */}
      <ProductModal
        product={selectedProduct}
        onClose={() => {
          setSelectedProduct(null);
          if (window.location.hash.startsWith('#product/')) {
            history.pushState('', document.title, window.location.pathname + window.location.search);
          }
        }}
      />
    </div>
  );
}
