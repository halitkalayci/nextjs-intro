import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler } from "@/lib/handler/with-error-handler";

export const GET = withErrorHandler(async (req: NextRequest) => {
    const timestamp = new Date().toISOString();
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 
               req.headers.get('x-real-ip') || 
               req.headers.get('cf-connecting-ip') ||
               'unknown';

    return NextResponse.json({
        message: "Rate limit test endpoint",
        timestamp,
        ip,
        info: "Bu endpoint rate limiting'i test etmek için kullanılır. Dakikada maksimum 5 istek atabilirsiniz."
    }, {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
}); 