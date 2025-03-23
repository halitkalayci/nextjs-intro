import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

        <div className="flex space-x-6">
          <Link href={"/"}>Ana Sayfa</Link>
          <Link href={"/"}>Hakkımızda</Link>
          <Link href={"/"}>Ürünler</Link>
        </div>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                Dil
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Dil Seçiniz</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Türkçe</DropdownMenuItem>
              <DropdownMenuItem>İngilizce</DropdownMenuItem>
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
