import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import Link from "next/link";

export default async function Home() {
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
        <div className="hidden md:flex space-x-6">
          <Link href={"/"}>Ana Sayfa</Link>
          <Link href={"/"}>Hakkımızda</Link>
          <Link href={"/"}>Ürünler</Link>
        </div>
        {/* Desktop Navbar */}

        {/* Mobile Navbar */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu/>
          </Button>
        </div>
        {/* Mobile Navbar */}


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

{
  /* <p class="abc"></p> */
}
