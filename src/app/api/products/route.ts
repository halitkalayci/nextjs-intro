// HTTP Request Anatomy araştırılacak.
export async function GET()
{
    // Veritabanından oku?
    const products = [
        { id:1, name:"Ürün 1", price:500 },
        { id:2, name:"Ürün 2", price:600 },
        { id:3, name:"Ürün 3", price:700 },
        { id:4, name:"Ürün 4", price:800 },
    ]

    return new Response(JSON.stringify(products), {
        headers: {"Content-Type":"application/json"}
    })
}