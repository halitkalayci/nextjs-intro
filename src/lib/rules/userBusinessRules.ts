import { User } from "../db/models/User";
import { NextResponse } from "next/server";

export const userBusinessRules = {
    /**
     * Verilen email adresi ile kayıtlı kullanıcı var mı kontrol eder
     * @param email Kontrol edilecek email adresi
     * @returns Varsa kullanıcı objesi, yoksa null
     */
    async checkIfUserExistsByEmail(email: string) {
        return await User.findOne({ email });
    },

    /**
     * Email adresi ile kayıtlı kullanıcı varsa hata döndürür
     * @param email Kontrol edilecek email adresi
     * @returns Hata response veya null
     */
    async checkEmailUniqueness(email: string) {
        const existingUser = await this.checkIfUserExistsByEmail(email);
        if (existingUser) {
            throw new Error();
            return NextResponse.json({ message: "Bu email adresi zaten kullanılıyor." }, { status: 400 });
        }
        return null;
    }
}; 