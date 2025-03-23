import { Card } from "@/components/ui/card";
import Link from "next/link";

export default async function Home() {

  return (
    <>
    <p>Ana Sayfa</p>
    <Link href={"/csr-fetch"}>CSR Fetch Sayfası</Link>
    {/* Güzel bir product card tasarımı component olarak projeye ekle. */}
    <Card className="w-full max-w-xs overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative overflow-hidden">
        <img src="https://mylifebox.com/img/blog/blog18/3.png"/>
      </div>
    </Card>
    {/* Güzel bir product card tasarımı */}
    </>
  );
}

