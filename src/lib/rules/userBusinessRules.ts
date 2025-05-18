import { User } from "../db/models/User";
import { NextResponse } from "next/server";
import { BusinessError } from "../handler/types/errorTypes";

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
     */
    async checkEmailUniqueness(email: string) {
        const existingUser = await this.checkIfUserExistsByEmail(email);
        if (existingUser) {
            throw new BusinessError("Bu email ile kayıtlı bir kullanıcı zaten mevcut.");
        }
    }
}; 