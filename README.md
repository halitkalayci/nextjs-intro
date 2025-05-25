This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

### Rate Limiting
Bu proje IP bazlı rate limiting özelliği içerir:
- **Limit**: Dakikada maksimum 5 istek
- **Kapsam**: Tüm API endpoint'leri
- **Headers**: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`
- **Error Response**: 429 status kodu ile `RATE_LIMIT_EXCEEDED` hatası

#### Rate Limiting Test Endpoint'leri
- `GET /api/test/rate-limit` - Rate limiting'i test etmek için
- `GET /api/admin/rate-limit` - Cache istatistiklerini görüntüle
- `DELETE /api/admin/rate-limit` - Tüm cache'i temizle
- `DELETE /api/admin/rate-limit?ip=<IP>` - Belirli IP için cache'i temizle
- `PATCH /api/admin/rate-limit` - Süresi dolmuş cache girişlerini temizle

#### Rate Limiting Mimarisi
- **Business Rules**: `src/lib/rules/rateLimitBusinessRules.ts`
- **Schema Validation**: `src/app/validations/middleware/rateLimitSchema.ts`
- **Error Handling**: `src/lib/handler/types/errorTypes.ts` (RateLimitError)
- **Utilities**: `src/lib/utils/rateLimitUtils.ts`
- **Middleware**: `src/middleware.ts`

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
