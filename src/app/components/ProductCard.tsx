"use client"

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

interface ProductCardProps {
  imageSrc: string | string[];
  title: string;
  description: string;
  price: number;
  colors?: Array<string>;
  logo?: string;
}

export default function ProductCard({
  imageSrc,
  title,
  description,
  price,
  colors = ["#FF6B6B", "#4ECDC4", "#FFD166"],
  logo = "YourLogo",
}: ProductCardProps) {
  // İmaj dizisini hazırla
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // Tek bir resim veya resim dizisi olabilir
    if (typeof imageSrc === "string") {
      setImages([imageSrc]);
    } else {
      setImages(imageSrc);
    }
  }, [imageSrc]);

  return (
    <Card className="w-72 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
      <CardHeader className="relative bg-amber-100 p-4 pb-16">
        <div className="absolute right-4 top-4 z-10 font-medium text-gray-700">
          {logo}
        </div>
        <div className="h-56">
          <Carousel opts={{loop:true}} className="h-full w-full">
            <CarouselContent className="h-full">
              {images.map((img, index) => (
                <CarouselItem key={index} className="h-full flex items-center justify-center">
                  <Image
                    src={img}
                    alt={`${title} - Görsel ${index + 1}`}
                    width={200}
                    height={200}
                    className="object-contain"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
        <div className="absolute left-4 bottom-4">
          <div className="flex gap-1">
            {colors.map((color, index) => (
              <div
                key={index}
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
        <div className="absolute right-4 bottom-4">
          <svg
            width="24"
            height="8"
            viewBox="0 0 24 8"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-400"
          >
            <path
              d="M1 4C1 4 5 1 12 1C19 1 23 4 23 4C23 4 19 7 12 7C5 7 1 4 1 4Z"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-center text-xl font-semibold text-gray-800">
          {title}
        </h3>
        <p className="mt-2 text-center text-sm text-gray-600">{description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4">
        <div className="text-xl font-bold text-gray-800">${price.toFixed(2)}</div>
        <Button variant="outline" className="rounded-md border border-gray-300 px-4">
          ADD TO CART
        </Button>
      </CardFooter>
    </Card>
  );
} 

// Hakkımızda,
// Ürünler (Backend bağlı. Resimlerle birlikte.),
// Sepet ekranlarını tasarlamak.