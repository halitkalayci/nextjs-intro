import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { RateLimitBusinessRules } from "./lib/rules/rateLimitBusinessRules";
import { rateLimitResponseSchema } from "./app/validations/middleware/rateLimitSchema";
import { rateLimitCache } from "./lib/utils/rateLimitUtils";

const PUBLIC_PATHS = ['/api/auth/login', '/api/auth/register', '/api/public', '/api/auth/user', '/api/test/rate-limit']

// Rate limiting için in-memory cache
interface RateLimitData {
    count: number;
    resetTime: number;
}

// Rate limit kontrolü
function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetTime: number } {
    try {
        // IP adresini validate et
        RateLimitBusinessRules.validateIpAddress(ip);
    } catch (error) {
        // IP geçersizse, rate limit uygula
        return { allowed: false, remaining: 0, resetTime: Date.now() + RateLimitBusinessRules.WINDOW_MS };
    }

    const now = Date.now();
    const key = ip;
    const current = rateLimitCache.get(key);

    if (!current || RateLimitBusinessRules.isWindowExpired(current.resetTime)) {
        // Yeni pencere başlat
        const resetTime = now + RateLimitBusinessRules.WINDOW_MS;
        rateLimitCache.set(key, { count: 1, resetTime });
        return { allowed: true, remaining: RateLimitBusinessRules.MAX_REQUESTS_PER_MINUTE - 1, resetTime };
    }

    try {
        // Rate limit kontrolü
        RateLimitBusinessRules.checkRateLimitExceeded(current.count);
        
        // İsteği say
        current.count++;
        rateLimitCache.set(key, current);
        return { 
            allowed: true, 
            remaining: RateLimitBusinessRules.MAX_REQUESTS_PER_MINUTE - current.count, 
            resetTime: current.resetTime 
        };
    } catch (error) {
        // Limit aşıldı
        return { allowed: false, remaining: 0, resetTime: current.resetTime };
    }
}

// Tüm istekler için araya girer.

// Bu middleware'i belirli istekler için devreye alıp diğer istekler için almayacak şekilde güncelleyin. 
// Eğer istek ön yüzden geliyorsa middleware login sayfasına redirect etmeli.
export async function middleware(request: NextRequest) {
    console.log(request.nextUrl.pathname);

    // IP adresini al
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               request.headers.get('cf-connecting-ip') ||
               'unknown';

    // Rate limiting kontrolü
    const rateLimitResult = checkRateLimit(ip);
    
    if (!rateLimitResult.allowed) {
        const retryAfter = RateLimitBusinessRules.calculateRetryAfter(rateLimitResult.resetTime);
        
        // Response'u schema ile validate et
        const responseData = {
            message: "Çok fazla istek gönderdiniz. Lütfen bekleyip tekrar deneyin.",
            error: "RATE_LIMIT_EXCEEDED",
            retryAfter: retryAfter
        };

        // Schema validation (opsiyonel - development için)
        const validatedResponse = rateLimitResponseSchema.parse(responseData);
        
        return NextResponse.json(
            validatedResponse, 
            { 
                status: 429,
                headers: {
                    'X-RateLimit-Limit': RateLimitBusinessRules.MAX_REQUESTS_PER_MINUTE.toString(),
                    'X-RateLimit-Remaining': '0',
                    'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
                    'Retry-After': retryAfter.toString()
                }
            }
        );
    }

    // Rate limit başlıklarını ekle
    const response = NextResponse.next();
    response.headers.set('X-RateLimit-Limit', RateLimitBusinessRules.MAX_REQUESTS_PER_MINUTE.toString());
    response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString());
    response.headers.set('X-RateLimit-Reset', rateLimitResult.resetTime.toString());

    if (PUBLIC_PATHS.some(path => request.nextUrl.pathname.startsWith(path))) {
        return response;
    }

    const token = request.cookies.get("token")?.value!;

    console.log(`Token geldi: ${token}`);

    const secret = process.env.JWT_SECRET!;

    const secret_key = new TextEncoder().encode(secret);

    try {
        await jwtVerify(token, secret_key);
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    return response;
}

export const config = {
    matcher:['/api/:path*']
}

// composeMiddleware() -> Nextjs


export async function userMiddleware() {

}

export async function languageMiddleware() {

}
