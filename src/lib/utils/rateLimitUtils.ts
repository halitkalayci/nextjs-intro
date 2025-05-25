// Rate limiting utility fonksiyonları

interface RateLimitData {
    count: number;
    resetTime: number;
}

// Global cache - production'da Redis kullanılmalı
export const rateLimitCache = new Map<string, RateLimitData>();

export class RateLimitUtils {
    /**
     * Belirli bir IP için rate limit cache'ini temizler
     */
    static clearCacheForIp(ip: string): void {
        rateLimitCache.delete(ip);
    }

    /**
     * Tüm rate limit cache'ini temizler
     */
    static clearAllCache(): void {
        rateLimitCache.clear();
    }

    /**
     * Süresi dolmuş cache girişlerini temizler
     */
    static cleanExpiredEntries(): void {
        const now = Date.now();
        for (const [ip, data] of rateLimitCache.entries()) {
            if (now > data.resetTime) {
                rateLimitCache.delete(ip);
            }
        }
    }

    /**
     * Cache istatistiklerini döndürür
     */
    static getCacheStats(): { totalEntries: number; activeEntries: number } {
        const now = Date.now();
        let activeEntries = 0;
        
        for (const [, data] of rateLimitCache.entries()) {
            if (now <= data.resetTime) {
                activeEntries++;
            }
        }

        return {
            totalEntries: rateLimitCache.size,
            activeEntries
        };
    }

    /**
     * Belirli bir IP'nin mevcut durumunu döndürür
     */
    static getIpStatus(ip: string): RateLimitData | null {
        return rateLimitCache.get(ip) || null;
    }
} 