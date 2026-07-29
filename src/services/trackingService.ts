import { Product, ClickEventLog, PageViewLog, FunnelAnalytics } from '../types/storefront';

const STORAGE_KEY_CLICKS = 'tiemglowy_click_logs_v1';
const STORAGE_KEY_VIEWS = 'tiemglowy_page_views_v1';

export class TrackingService {
  /**
   * Log page view event
   */
  static logPageView(type: 'landing' | 'collection' | 'product_detail', path: string, meta?: string): PageViewLog {
    const views = this.getPageViews();
    const newView: PageViewLog = {
      id: `view_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      type,
      path,
      timestamp: Date.now(),
      meta,
    };

    views.push(newView);
    try {
      localStorage.setItem(STORAGE_KEY_VIEWS, JSON.stringify(views));
    } catch (e) {
      console.warn('Unable to persist page view tracking:', e);
    }

    return newView;
  }

  /**
   * Get all page view logs
   */
  static getPageViews(): PageViewLog[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_VIEWS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  /**
   * Log click event for affiliate conversion funnel
   */
  static logClick(product: Product, source: string = 'homepage_cta'): ClickEventLog {
    const logs = this.getClickLogs();
    const newLog: ClickEventLog = {
      id: `clk_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      productId: product.id,
      timestamp: Date.now(),
      source,
      affiliateUrl: product.affiliateUrl,
    };

    logs.push(newLog);
    try {
      localStorage.setItem(STORAGE_KEY_CLICKS, JSON.stringify(logs));
    } catch (e) {
      console.warn('Unable to persist click tracking log:', e);
    }

    return newLog;
  }

  /**
   * Get all stored click logs
   */
  static getClickLogs(): ClickEventLog[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_CLICKS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  /**
   * Track click and redirect user to affiliate URL (/go/{productId})
   */
  static trackAndRedirect(product: Product, source: string = 'cta_button'): void {
    this.logClick(product, source);

    const redirectUrl = product.affiliateUrl;
    if (redirectUrl) {
      window.open(redirectUrl, '_blank', 'noopener,noreferrer');
    }
  }

  /**
   * Aggregated conversion funnel analytics
   */
  static getAnalytics(): FunnelAnalytics {
    const logs = this.getClickLogs();
    const pageViews = this.getPageViews();
    const productClicks: Record<string, number> = {};
    const sourceStats: Record<string, number> = {};
    const pageViewStats: Record<string, number> = {};

    logs.forEach((log) => {
      productClicks[log.productId] = (productClicks[log.productId] || 0) + 1;
      sourceStats[log.source] = (sourceStats[log.source] || 0) + 1;
    });

    pageViews.forEach((pv) => {
      pageViewStats[pv.path] = (pageViewStats[pv.path] || 0) + 1;
    });

    return {
      totalViews: pageViews.length,
      totalClicks: logs.length,
      productClicks,
      sourceStats,
      pageViews: pageViewStats,
    };
  }
}

