import mongoose from "mongoose";

// Mongodb -> NoSQL DB
// Mongoose -> ODM


// .env dosyasından MONGODB_URI'yi string olarak oku.
const MONGODB_URI:string = process.env.MONGODB_URI as string; 


if(!MONGODB_URI)
{
    throw new Error("⚠️ MONGODB_URI is not defined.")
}



// //
let cached = (global as any).mongoose;

if(!cached)
{
    cached = (global as any).mongoose = {conn:null, promise:null}
}
//
export async function connectToDatabase() {
    // Cachede daha önce bağlantı varsa hiç diğer satırlara gitme "return cache" yani cachedeki bağlantıyı döndür.
    if(cached.conn) return cached.conn;

    // Cachede daha önce bir bağlantı yok. 

    // Cachede şu an bağlanmaya çalışan bir "promise" (async işlem) var mı? Yoksa yeni işlem başlat
    if(!cached.promise)
    {
        cached.promise = mongoose.connect(MONGODB_URI, { dbName:'ecommerce' });
    }
    
    // Varsa o işlemi bekle cachedeki bağlantıyı o bağlantı haline getir.
    cached.conn = await cached.promise;
    return cached.conn;
}