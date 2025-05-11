import ProductCard from "@/app/components/ProductCard";

export default function ProductsPage() {
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
      imageSrc: ["/images/a1.png", "/images/a2.png", "/images/a1.png"],
      title: "Siyah Topuklu Ayakkabı",
      description: "Klasik siyah topuklu ayakkabı, her kıyafete uygun",
      price: 39.99,
    },
    {
      id: 4,
      imageSrc: ["/images/a2.png", "/images/a1.png"],
      title: "Bordo Topuklu Ayakkabı",
      description: "Zarif bordo topuklu ayakkabı, şık davetler için ideal",
      price: 48.75,
    },
    {
      id: 5,
      imageSrc: ["/images/a2.png", "/images/a1.png", "/images/a2.png"],
      title: "Lacivert Topuklu Ayakkabı",
      description: "Ofis için uygun lacivert topuklu ayakkabı",
      price: 44.90,
    },
    {
      id: 6,
      imageSrc: ["/images/a1.png", "/images/a2.png"],
      title: "Gri Topuklu Ayakkabı",
      description: "Modern gri topuklu ayakkabı, günlük kullanım için uygun",
      price: 41.25,
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-8 text-3xl font-bold">Tüm Ayakkabı Modelleri</h1>
      
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
    </div>
  );
} 