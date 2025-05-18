export interface JwtPayload {
  email: string;
  name: string;
  iat: number;
  exp: number;
}

export interface UserData {
  authenticated: boolean;
  user?: {
    name: string;
    email: string;
  };
  error?: string;
}

// Client tarafında JWT kontrolü için
export const getJwtPayloadClient = (): JwtPayload | null => {
  try {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];
    
    if (!token) return null;
    
    // Base64 ile encode edilmiş payload kısmını al
    const base64Payload = token.split('.')[1];
    // Base64'ü decode et
    const payload = JSON.parse(atob(base64Payload));
    return payload as JwtPayload;
  } catch (error) {
    console.error("JWT çözümleme hatası:", error);
    return null;
  }
};

export const getUserNameClient = (): string | null => {
  const payload = getJwtPayloadClient();
  return payload?.name || null;
};

// Client tarafında kullanıcı bilgilerini getiren fonksiyon
export const getUserData = async (): Promise<UserData> => {
  try {
    const response = await fetch('/api/auth/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Credentials önemli - cookie'leri göndermek için gerekli
      credentials: 'include',
    });

    if (!response.ok) {
      return { authenticated: false, error: 'Kullanıcı bilgileri alınamadı' };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Kullanıcı bilgileri alınırken hata:", error);
    return { authenticated: false, error: 'Bağlantı hatası' };
  }
};

// Kullanıcı adını getiren yardımcı fonksiyon
export const getUserNameAsync = async (): Promise<string | null> => {
  const data = await getUserData();
  return data.authenticated ? data.user?.name || null : null;
}; 