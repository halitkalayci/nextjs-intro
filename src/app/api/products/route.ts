// HTTP Request Anatomy araştırılacak.

const products = [
  { id: 1, name: "Ürün 1", price: 500 },
  { id: 2, name: "Ürün 2", price: 600 },
  { id: 3, name: "Ürün 3", price: 700 },
  { id: 4, name: "Ürün 4", price: 800 },
];

export async function GET() {
  // Veritabanından oku?
  return new Response(JSON.stringify(products), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.name || !body.price)
    return new Response(
      JSON.stringify({ error: "Name ve price alanı zorunludur." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );

   const newProduct = {
    id: products.length + 1,
    name: body.name,
    price: body.price
   };

   products.push(newProduct)

   return new Response(JSON.stringify({message:"Ürün başarıyla eklendi", product: newProduct}), {
    status: 201,
    headers: {"Content-Type":"application/json"}
   })
}

// 1- RDBMS - NOSQL (PostgreSQL - MongoDB)
// Prisma - Mongoose
