import { getJwtPayload } from "@/lib/jwtServer";
import { NextResponse } from "next/server";

// Mevcut oturum bilgilerini döndüren endpoint
export async function GET() {
  try {
    const payload = await getJwtPayload();
    
    if (!payload) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
    
    // Kullanıcı bilgilerini döndür (hassas bilgileri çıkararak)
    return NextResponse.json({
      authenticated: true,
      user: {
        name: payload.name,
        email: payload.email
      }
    });
    
  } catch (error) {
    console.error("Kullanıcı bilgileri alınırken hata:", error);
    return NextResponse.json({ authenticated: false, error: "Kimlik doğrulama hatası" }, { status: 401 });
  }
} 