"use client"
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

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
          <Button className="cursor-pointer" variant="ghost" size="icon" onClick={toggleMenu}>
           {isMobileMenuOpen ? <X/> : <Menu />}
          </Button>
        </div>
        {/* Mobile Navbar Button*/}
        {/* Mobile Navbar */}

        {/* md:hidden -> Medium ve üstü ekranlarda hidden yani görünmez olması */}
        <div className={"fixed inset-0 top-16 bg-background z-50 md:hidden " + (isMobileMenuOpen ? "flex flex-col" : "hidden")}>
        <div className="flex flex-col space-y-4 p-6">
          <Link href={"/"}>Ana Sayfa</Link>
          <Link href={"/"}>Hakkımızda</Link>
          <Link href={"/"}>Ürünler</Link>
        </div>
        </div>
     
        {/* Mobile Navbar*/}

        <div className="hidden md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="cursor-pointer">
                Dil
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Dil Seçiniz</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">Türkçe</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">İngilizce</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>



      </div>
    </nav>
  );
}