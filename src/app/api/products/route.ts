// HTTP Request Anatomy araştırılacak.

import { productFormSchema } from "@/app/validations/product/productFormSchema";
import { Product } from "@/lib/db/models/Product";
import { connectToDatabase } from "@/lib/db/mongodb";
import { withErrorHandler } from "@/lib/handler/with-error-handler";
import { productBusinessRules } from "@/lib/rules/productBusinessRules";
import { NextRequest, NextResponse } from "next/server";

// Ödev 1: Bir search endpointi yazıp gelen name değeri ile arama yapılmalı. "kla" -> klavye ürünü klarnet ürünü listelenmeli.
// Ödev 2: Mongodb ve mongoose fonksiyonları araştırıp kullanalım.
// Ödev 3: Geçen ödevde tasarladığımız product-cardları backendden veritabanındaki ürünleri listeleyecek şekilde CSR sayfada gösteriniz.

// JWT
export async function GET() {
  await connectToDatabase();

  const products = await Product.find();

  return new Response(JSON.stringify(products), {
    headers: { "Content-Type": "application/json" },
  });
}

export const POST = withErrorHandler(async (req: NextRequest) => {
  await connectToDatabase();
  const body = await req.json();
  const result = productFormSchema.safeParse(body);
  
  if(!result.success) {
    return NextResponse.json(result.error.format(), {status:400});
  }
  
  // Ürün adı benzersizlik kontrolü
  await productBusinessRules.checkNameUniqueness(result.data.name);
  
  const addedProduct = await Product.create(result.data);

  return NextResponse.json(addedProduct, {
    status: 201,
    headers: { "Content-Type": "application/json" }
  });
});

// 1- RDBMS - NOSQL (PostgreSQL - MongoDB)
// Prisma - Mongoose
