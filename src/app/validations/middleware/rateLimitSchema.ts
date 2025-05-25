import { z } from "zod";

export const rateLimitSchema = z.object({
  ip: z.string()
    .min(1, { message: "IP adresi gereklidir" })
    .refine((ip) => ip !== 'unknown', { message: "Geçerli bir IP adresi gereklidir" }),
  count: z.number()
    .min(0, { message: "İstek sayısı 0'dan küçük olamaz" })
    .max(5, { message: "Dakikada maksimum 5 istek atılabilir" }),
  resetTime: z.number()
    .min(0, { message: "Reset zamanı geçerli olmalıdır" }),
});

export const rateLimitResponseSchema = z.object({
  message: z.string(),
  error: z.string().optional(),
  retryAfter: z.number().optional(),
});

export type RateLimitData = z.infer<typeof rateLimitSchema>;
export type RateLimitResponse = z.infer<typeof rateLimitResponseSchema>; 