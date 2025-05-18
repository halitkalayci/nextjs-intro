import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string()
    .min(3, { message: "E-posta en az 3 karakter olmalıdır" })
    .email({ message: "Geçerli bir e-posta adresi giriniz" }),
  password: z.string()
    .min(3, { message: "Şifre en az 3 karakter olmalıdır" }),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>; 