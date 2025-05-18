import { jwtVerify, JWTPayload } from "jose";
import { cookies } from "next/headers";

export interface JwtPayload extends JWTPayload {
  email: string;
  name: string;
}

export const getJwtPayload = async (): Promise<JwtPayload | null> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    
    if (!token) return null;
    
    const secret = process.env.JWT_SECRET!;
    const secretKey = new TextEncoder().encode(secret);
    
    const { payload } = await jwtVerify(token, secretKey);
    return payload as unknown as JwtPayload;
  } catch (error) {
    console.error("JWT doğrulama hatası:", error);
    return null;
  }
};

export const getUserName = async (): Promise<string | null> => {
  const payload = await getJwtPayload();
  return payload?.name || null;
}; 