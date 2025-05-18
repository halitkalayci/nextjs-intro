import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string()
    .min(2, { message: "Ürün adı en az 2 karakter olmalıdır" }),
  price: z.number()
    .min(0, { message: "Fiyat 0'dan büyük olmalıdır" }),
  description: z.string().optional(),
  stock: z.number()
    .min(0, { message: "Stok miktarı 0'dan büyük olmalıdır" }),
});

export type ProductFormValues = z.infer<typeof productFormSchema>; 