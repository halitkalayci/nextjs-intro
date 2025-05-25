// Rate limiting business rules
import { RateLimitError } from "../handler/types/errorTypes";

export class RateLimitBusinessRules {
    static readonly MAX_REQUESTS_PER_MINUTE = 5;
    static readonly WINDOW_MS = 60 * 1000; // 1 dakika

    static checkRateLimitExceeded(currentCount: number): void {
        if (currentCount >= this.MAX_REQUESTS_PER_MINUTE) {
            const retryAfter = Math.ceil(this.WINDOW_MS / 1000);
            throw new RateLimitError(
                "Çok fazla istek gönderdiniz. Lütfen bekleyip tekrar deneyin.",
                retryAfter
            );
        }
    }

    static validateIpAddress(ip: string): void {
        if (!ip || ip === 'unknown') {
            throw new Error("INVALID_IP_ADDRESS");
        }
    }

    static calculateRetryAfter(resetTime: number): number {
        return Math.ceil((resetTime - Date.now()) / 1000);
    }

    static isWindowExpired(resetTime: number): boolean {
        return Date.now() > resetTime;
    }
} 