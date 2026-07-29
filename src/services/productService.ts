import { SHEET_URL } from '../config';
import { Product, MainCategory, SubCategory, TikTokPost } from '../types/storefront';

/**
 * Parses raw CSV text respecting quotes, escaped quotes (""), and commas inside quotes.
 */
export function parseCSV(csvText: string): Record<string, string>[] {
  const lines: string[] = [];
  let cur = '';
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      lines.push(cur);
      cur = '';
    } else {
      cur += char;
    }
  }
  if (cur.trim()) {
    lines.push(cur);
  }

  if (lines.length === 0) return [];

  const parseLine = (line: string): string[] => {
    const fields: string[] = [];
    let field = '';
    let inside = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      const next = line[i + 1];
      if (c === '"') {
        if (inside && next === '"') {
          field += '"';
          i++;
        } else {
          inside = !inside;
        }
      } else if (c === ',' && !inside) {
        fields.push(field.trim());
        field = '';
      } else {
        field += c;
      }
    }
    fields.push(field.trim());
    return fields;
  };

  const headers = parseLine(lines[0]).map((h) => h.trim().toLowerCase());

  const rows: Record<string, string>[] = [];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const values = parseLine(lines[i]);
    const rowObj: Record<string, string> = {};
    headers.forEach((h, idx) => {
      rowObj[h] = values[idx] ?? '';
    });
    rows.push(rowObj);
  }

  return rows;
}

function getValue(row: Record<string, string>, ...keys: string[]): string {
  for (const k of keys) {
    const lowered = k.toLowerCase().trim();
    if (row[lowered] !== undefined && row[lowered] !== '') {
      return row[lowered].trim();
    }
  }
  return '';
}

function parseBoolean(val: string): boolean {
  if (!val) return false;
  const s = val.trim().toUpperCase();
  return s === 'TRUE' || s === '1' || s === 'YES';
}

function detectPlatform(url: string, explicitPlatform?: string): 'Shopee' | 'TikTok Shop' | 'Lazada' | 'Brand Store' {
  if (explicitPlatform && ['Shopee', 'TikTok Shop', 'Lazada', 'Brand Store'].includes(explicitPlatform)) {
    return explicitPlatform as any;
  }
  const lowered = (url || '').toLowerCase();
  if (lowered.includes('shopee') || lowered.includes('shp.ee')) return 'Shopee';
  if (lowered.includes('tiktok') || lowered.includes('vt.tiktok.com')) return 'TikTok Shop';
  if (lowered.includes('lazada') || lowered.includes('lzd.co')) return 'Lazada';
  return 'Shopee';
}

function convertDriveUrl(url: string): string {
  if (!url) return '';
  const trimmed = url.trim();
  if (trimmed.includes('drive.google.com') || trimmed.includes('docs.google.com')) {
    const matchPath = trimmed.match(/\/d\/([\w-]{25,})/);
    if (matchPath && matchPath[1]) {
      return `https://lh3.googleusercontent.com/d/${matchPath[1]}`;
    }
    const matchQuery = trimmed.match(/id=([\w-]{25,})/);
    if (matchQuery && matchQuery[1]) {
      return `https://lh3.googleusercontent.com/d/${matchQuery[1]}`;
    }
  }
  return trimmed;
}

function inferCategoryFromTitle(title: string, rawCategory?: string): MainCategory {
  if (rawCategory && ['skincare', 'makeup', 'bodycare', 'haircare', 'fashion', 'lifestyle', 'grocery', 'snacks'].includes(rawCategory.toLowerCase())) {
    return rawCategory.toLowerCase() as MainCategory;
  }
  const t = title.toLowerCase();
  if (t.includes('bách hóa') || t.includes('tạp hóa') || t.includes('gia dụng')) return 'grocery';
  if (t.includes('ăn vặt') || t.includes('bánh') || t.includes('kẹo') || t.includes('trà') || t.includes('snack')) return 'snacks';
  if (t.includes('áo') || t.includes('đầm') || t.includes('váy') || t.includes('quần') || t.includes('dottie') || t.includes('yếm') || t.includes('set')) {
    return 'fashion';
  }
  if (t.includes('son') || t.includes('cushion') || t.includes('phấn') || t.includes('kem nền') || t.includes('makeup')) {
    return 'makeup';
  }
  if (t.includes('tóc') || t.includes('gội') || t.includes('xả')) {
    return 'haircare';
  }
  if (t.includes('body') || t.includes('tắm') || t.includes('nước hoa')) {
    return 'bodycare';
  }
  if (t.includes('serum') || t.includes('kem dưỡng') || t.includes('tẩy trang') || t.includes('chống nắng') || t.includes('mặt nạ')) {
    return 'skincare';
  }
  return 'fashion';
}

function mapSubCategory(rawSub: string, category: MainCategory, title: string): SubCategory | undefined {
  const s = (rawSub || '').toLowerCase().trim();
  if (s) {
    if (s === 'fashion_tops' || s.includes('áo')) return 'fashion_tops';
    if (s === 'fashion_dresses' || s.includes('đầm')) return 'fashion_dresses';
    if (s === 'fashion_skirts' || s.includes('chân váy') || s.includes('váy')) return 'fashion_skirts';
    if (s === 'fashion_pants' || s.includes('quần') || s.includes('short')) return 'fashion_pants';
    if (s === 'fashion_sets' || s.includes('set') || s.includes('yếm')) return 'fashion_sets';
    if (['cleanser', 'serum', 'sunscreen', 'moisturizer', 'lip', 'cushion', 'foundation', 'blush', 'body_lotion', 'body_scrub', 'fragrance', 'hair_care'].includes(s)) {
      return s as SubCategory;
    }
  }

  // Fallback to title-based inference
  const t = title.toLowerCase();
  if (category === 'fashion') {
    if (t.includes('đầm') || t.includes('dress')) return 'fashion_dresses';
    if (t.includes('chân váy') || t.includes('skirt')) return 'fashion_skirts';
    if (t.includes('quần') || t.includes('short') || t.includes('pant')) return 'fashion_pants';
    if (t.includes('set') || t.includes('yếm')) return 'fashion_sets';
    if (t.includes('áo')) return 'fashion_tops';
    return 'fashion_tops';
  }
  if (category === 'skincare') {
    if (t.includes('tẩy trang') || t.includes('rửa mặt')) return 'cleanser';
    if (t.includes('serum') || t.includes('tinh chất')) return 'serum';
    if (t.includes('chống nắng') || t.includes('sun')) return 'sunscreen';
    if (t.includes('dưỡng ẩm') || t.includes('cream')) return 'moisturizer';
  }
  if (category === 'makeup') {
    if (t.includes('son') || t.includes('lip')) return 'lip';
    if (t.includes('cushion')) return 'cushion';
    if (t.includes('kem nền') || t.includes('foundation')) return 'foundation';
    if (t.includes('phấn')) return 'blush';
  }
  return undefined;
}

export async function fetchProducts(): Promise<Product[]> {
  const url = SHEET_URL || "https://docs.google.com/spreadsheets/d/e/2PACX-1vT5bwwUn9WBcDA28UyM6f9inDgu-9s18XzT_x5vCIIKVi_mM6teMt4D_GRUL0b0CcEC5IiYqCtYKFw6/pub?output=csv";
  let rawRows: Record<string, string>[] = [];
  const seenIds = new Set<string>();

  try {
    const response = await fetch(url, { cache: 'no-cache' });
    if (response.ok) {
      const csvText = await response.text();
      rawRows = parseCSV(csvText);
    }
  } catch (err) {
    console.error("Error fetching merged Summary sheet CSV:", err);
  }

  const products: Product[] = rawRows
    .map((row, index): Product | null => {
      const title = getValue(row, 'name', 'title', 'productname', 'ten_san_pham');
      const id = getValue(row, 'id', 'productid', 'stt') || `summary-${index + 1}`;

      const rawPickVal = getValue(row, 'islyniepick', 'lyniepick', 'lynie_pick', 'khuyen_dung');
      const isLyniePick = parseBoolean(rawPickVal);
      if (!isLyniePick) {
        return null;
      }

      const affiliateUrl = getValue(row, 'affiliateurl', 'url', 'link', 'affiliatelink', 'lien_ket') || 'https://shopee.vn';
      if (!title || title.toLowerCase().includes('loading...')) {
        if (!affiliateUrl || affiliateUrl === 'https://shopee.vn') {
          return null;
        }
      }

      const displayTitle = (title && !title.toLowerCase().includes('loading...')) 
        ? title 
        : `Sản phẩm Lynie Selection #${index + 1}`;

      const uniqueId = String(id);
      if (seenIds.has(uniqueId)) {
        return null;
      }
      seenIds.add(uniqueId);

      const shopName = getValue(row, 'shopname', 'shop', 'brand', 'ten_shop') || 'Dottie Official Store';
      let rawImage = getValue(row, 'image', 'img', 'thumbnail', 'hinhanh', 'hinh_anh');

      if (!rawImage || rawImage.toLowerCase().includes('loading...')) {
        rawImage = '';
      } else {
        rawImage = convertDriveUrl(rawImage);
      }

      const isHostPick = parseBoolean(getValue(row, 'ishostpick', 'hostpick', 'host_pick', 'top_pick'));
      const isTrending = parseBoolean(getValue(row, 'istrending', 'trending'));
      const isFeatured = parseBoolean(getValue(row, 'isfeatured', 'featured'));

      const category = inferCategoryFromTitle(displayTitle, getValue(row, 'category', 'danh_muc'));
      const rawSubcate = getValue(row, 'subcate', 'subcategory', 'sub_category');
      const subCategory = mapSubCategory(rawSubcate, category, displayTitle);

      const collectionId = getValue(row, 'collectionid', 'collection_id') || category;
      const collectionName = getValue(row, 'collectionname', 'collection_name') || (category === 'fashion' ? 'Thời Trang Dottie Selection' : 'Tiệm Glowy Selection');
      
      const description = getValue(row, 'description', 'mo_ta', 'mota') || '';
      const lynieReview = getValue(row, 'lyniereview', 'review', 'danh_gia') || description;
      const badge = getValue(row, 'badge', 'nhan') || 'Lynie khuyên dùng';
      const discountCode = getValue(row, 'discountcode', 'voucher', 'ma_giam_gia') || undefined;
      const price = getValue(row, 'price', 'gia') || undefined;
      const originalPrice = getValue(row, 'originalprice', 'gia_goc') || undefined;
      const sales = getValue(row, 'sales', 'da_ban') || undefined;
      const platform = detectPlatform(affiliateUrl, getValue(row, 'platform', 'san_thuong_mai'));

      return {
        id: uniqueId,
        title: displayTitle,
        name: displayTitle,
        brand: shopName,
        shopName,
        shop: shopName,
        sheetOrigin: 'Summary',
        image: rawImage,
        affiliateUrl,
        isLyniePick: true,
        lyniePick: true,
        pickValue: rawPickVal.trim(),
        isHostPick,
        isTrending,
        isFeatured,
        category,
        subCategory,
        collectionId,
        collectionName,
        description,
        lynieReview,
        badge,
        discountCode,
        price,
        originalPrice,
        sales,
        platform,
      };
    })
    .filter((p): p is Product => p !== null);

  return products;
}

/**
 * Fetches featured TikTok videos from sheet tab Vid (VidLink, ThumbLink, ProductLink, Caption)
 */
export async function fetchTikTokVideos(): Promise<TikTokPost[]> {
  try {
    const vidUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT5bwwUn9WBcDA28UyM6f9inDgu-9s18XzT_x5vCIIKVi_mM6teMt4D_GRUL0b0CcEC5IiYqCtYKFw6/pub?gid=575349429&single=true&output=csv";
    const response = await fetch(vidUrl, { cache: 'no-cache' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const csvText = await response.text();
    const rows = parseCSV(csvText);

    const posts: TikTokPost[] = rows
      .map((row, idx): TikTokPost | null => {
        const vidLink = getValue(row, 'vidlink', 'video_link', 'link') || getValue(row, 'video_url');
        if (!vidLink || !vidLink.startsWith('http')) {
          return null;
        }

        const rawThumb = getValue(row, 'thumblink', 'thumbnail', 'thumb');
        let thumbLink = convertDriveUrl(rawThumb);

        // Fallback only if no thumb link provided
        if (!thumbLink) {
          thumbLink = idx % 2 === 0
            ? "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
            : "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80";
        }
            
        const productLink = getValue(row, 'productlink', 'product_link', 'product');
        const caption = getValue(row, 'caption', 'title', 'mo_ta') || `Video nổi bật #${idx + 1} @prettyglowprincess ✨`;

        return {
          id: `vid-${idx + 1}`,
          videoTitle: caption,
          thumbnail: thumbLink,
          videoUrl: vidLink,
          productLink: productLink || undefined,
          taggedProductIds: []
        };
      })
      .filter((p): p is TikTokPost => p !== null);

    if (posts.length > 0) {
      return posts;
    }
  } catch (error) {
    console.warn('Could not fetch Vid sheet tab, fallback to default featured videos:', error);
  }

  return [
    {
      id: "vid-1",
      videoTitle: "Video nổi bật @prettyglowprincess ✨",
      thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://www.tiktok.com/@prettyglowprincess/video/7662518475038018824",
      taggedProductIds: []
    },
    {
      id: "vid-2",
      videoTitle: "Outfit & Beauty Inspiration ✨",
      thumbnail: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://www.tiktok.com/@prettyglowprincess/video/7654366690850983176",
      taggedProductIds: []
    }
  ];
}
