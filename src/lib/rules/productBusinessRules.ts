import { Product } from "../db/models/Product";
import { BusinessError } from "../handler/types/errorTypes";

export const productBusinessRules = {
    /**
     * Verilen isim ile kayıtlı ürün var mı kontrol eder
     * @param name Kontrol edilecek ürün adı
     * @returns Varsa ürün objesi, yoksa null
     */
    async checkIfProductExistsByName(name: string) {
        return await Product.findOne({ name });
    },

    /**
     * Ürün adı ile kayıtlı ürün varsa hata döndürür
     * @param name Kontrol edilecek ürün adı
     */
    async checkNameUniqueness(name: string) {
        const existingProduct = await this.checkIfProductExistsByName(name);
        if (existingProduct) {
            throw new BusinessError("Bu isimle kayıtlı bir ürün zaten mevcut.");
        }
    }
}; 