import Link from "next/link";
import ProductCard from "./components/ProductCard";

export default async function Home() {
  // Örnek ürün verileri
  const products = [
    {
      id: 1,
      imageSrc: ["/images/a1.png", "/images/a2.png"],
      title: "Kırmızı Topuklu Ayakkabı",
      description: "Özel tasarım, yüksek kaliteli deri kırmızı topuklu ayakkabı",
      price: 45.00,
    },
    {
      id: 2,
      imageSrc: ["/images/a2.png", "/images/a1.png"],
      title: "Mavi Topuklu Ayakkabı",
      description: "Konforlu ve şık tasarımlı mavi topuklu ayakkabı",
      price: 42.50,
    },
    {
      id: 3,
      imageSrc: ["/images/a1.png", "/images/a2.png"],
      title: "Siyah Topuklu Ayakkabı",
      description: "Klasik siyah topuklu ayakkabı, her kıyafete uygun",
      price: 39.99,
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-8 text-3xl font-bold">Ürünlerimiz</h1>
      
      <div className="flex flex-wrap gap-6 justify-center md:justify-start">
        {products.map((product) => (
          <ProductCard 
            key={product.id}
            imageSrc={product.imageSrc}
            title={product.title}
            description={product.description}
            price={product.price}
          />
        ))}
      </div>
      
      <div className="mt-8">
        <Link href="/csr-fetch" className="text-blue-600 hover:underline">
          CSR Fetch Sayfasına Git
        </Link>
      </div>
    </div>
  );
}

