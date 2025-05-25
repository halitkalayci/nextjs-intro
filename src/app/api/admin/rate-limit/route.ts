import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler } from "@/lib/handler/with-error-handler";
import { RateLimitUtils } from "@/lib/utils/rateLimitUtils";

// Cache istatistiklerini getir
export const GET = withErrorHandler(async (req: NextRequest) => {
    const stats = RateLimitUtils.getCacheStats();
    
    return NextResponse.json({
        message: "Rate limit cache istatistikleri",
        stats,
        timestamp: new Date().toISOString()
    }, {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
});

// Cache'i temizle
export const DELETE = withErrorHandler(async (req: NextRequest) => {
    const url = new URL(req.url);
    const ip = url.searchParams.get('ip');
    
    if (ip) {
        // Belirli IP için cache'i temizle
        RateLimitUtils.clearCacheForIp(ip);
        return NextResponse.json({
            message: `IP ${ip} için rate limit cache'i temizlendi`,
            timestamp: new Date().toISOString()
        });
    } else {
        // Tüm cache'i temizle
        RateLimitUtils.clearAllCache();
        return NextResponse.json({
            message: "Tüm rate limit cache'i temizlendi",
            timestamp: new Date().toISOString()
        });
    }
});

// Süresi dolmuş girişleri temizle
export const PATCH = withErrorHandler(async (req: NextRequest) => {
    RateLimitUtils.cleanExpiredEntries();
    const stats = RateLimitUtils.getCacheStats();
    
    return NextResponse.json({
        message: "Süresi dolmuş cache girişleri temizlendi",
        stats,
        timestamp: new Date().toISOString()
    });
}); 