import { z } from "zod";

export const registerFormSchema = z.object({
    name: z.string()
      .min(3, { message: "İsim en az 3 karakter olmalıdır" }),
    email: z.string()
      .min(3, { message: "E-posta en az 3 karakter olmalıdır" })
      .email({ message: "Geçerli bir e-posta adresi giriniz" }),
    password: z.string()
      .min(3, { message: "Şifre en az 3 karakter olmalıdır" })
      .regex(/[A-Z]/, { message: "Şifre en az bir büyük harf içermelidir" })
      .regex(/[a-z]/, { message: "Şifre en az bir küçük harf içermelidir" })
      .regex(/[0-9]/, { message: "Şifre en az bir sayı içermelidir" })
      .regex(/[^A-Za-z0-9]/, { message: "Şifre en az bir sembol içermelidir" }),
  });

  
export type RegisterFormValues = z.infer<typeof registerFormSchema>;