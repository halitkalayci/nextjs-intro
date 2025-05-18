"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUserNameAsync } from "@/lib/jwtClient";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const pathname = usePathname();

  // Sayfa değiştiğinde veya ilk yüklemede token kontrolü yap
  useEffect(() => {
    const fetchUserName = async () => {
      setIsLoading(true);
      try {
        const name = await getUserNameAsync();
        setUserName(name);
      } catch (error) {
        console.error("Kullanıcı adı alınırken hata:", error);
        setUserName(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserName();
  }, [pathname]);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="border-b bg-background sticky top-0 z-50">
      <div
        className="container flex 
      items-center 
      h-16
      mx-auto
      px-4
      justify-between"
      >
        <Link className="font-bold text-xl" href={"/"}>
          ECommerce
        </Link>

        {/* Desktop Navbar */}
        {/* md:flex -> Medium ve üstü ekranlarda flex yapısıyla gözük. */}
        <div className="hidden md:flex space-x-6">
          <Link href={"/"}>Ana Sayfa</Link>
          <Link href={"/"}>Hakkımızda</Link>
          <Link href={"/"}>Ürünler</Link>
        </div>
        {/* Desktop Navbar */}

        {/* Mobile Navbar Button */}
        <div className="md:hidden">
          <Button
            className="cursor-pointer"
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {/* Mobile Navbar Button*/}
        {/* Mobile Navbar */}

        {/* md:hidden -> Medium ve üstü ekranlarda hidden yani görünmez olması */}
        <div
          className={
            "fixed inset-0 top-16 bg-background z-50 md:hidden " +
            (isMobileMenuOpen ? "flex flex-col" : "hidden")
          }
        >
          <div className="flex flex-col space-y-4 p-6">
            <Link href={"/"}>Ana Sayfa</Link>
            <Link href={"/"}>Hakkımızda</Link>
            <Link href={"/"}>Ürünler</Link>
            {isLoading ? (
              <div>Yükleniyor...</div>
            ) : !userName ? (
              <>
                <Link href={"/auth/login"}>Giriş Yap</Link>
                <Link href={"/auth/register"}>Kayıt Ol</Link>
              </>
            ) : (
              <div className="font-medium">Merhaba {userName}</div>
            )}
          </div>
        </div>

        {/* Mobile Navbar*/}

        <div className="hidden md:flex items-center space-x-4">
          {isLoading ? (
            <div>Yükleniyor...</div>
          ) : !userName ? (
            <>
              <Link href={"/auth/login"}>
                <Button variant="outline">Giriş Yap</Button>
              </Link>
              <Link href={"/auth/register"}>
                <Button>Kayıt Ol</Button>
              </Link>
            </>
          ) : (
            <div className="font-medium">Merhaba {userName}</div>
          )}
        
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="cursor-pointer" variant="outline">Dil</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Dil Seçiniz</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                Türkçe
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                İngilizce
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
