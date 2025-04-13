// HTTP Request Anatomy araştırılacak.

import { Product } from "@/lib/db/models/Product";
import { connectToDatabase } from "@/lib/db/mongodb";
import { json } from "stream/consumers";

// In-Memory DB
const products = [
  { id: 1, name: "Ürün 1", price: 500 },
  { id: 2, name: "Ürün 2", price: 600 },
  { id: 3, name: "Ürün 3", price: 700 },
  { id: 4, name: "Ürün 4", price: 800 },
];

export async function GET() {
  // Veritabanından oku?
  await connectToDatabase();

  const products = await Product.find();
  console.log(products);

  return new Response(JSON.stringify(products), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();
  const addedProduct = await Product.create(body);

  return new Response(JSON.stringify(addedProduct), {
    headers: { "Content-Type": "application/json" },
  });
}

// 1- RDBMS - NOSQL (PostgreSQL - MongoDB)
// Prisma - Mongoose
