"use client";

import { useEffect, useState } from "react";

export default function CsrFetchPage() {
  const [products, setProducts] = useState<any>([]);
  const fetchProducts = async () => {
    const response = await fetch("/api/products");
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
    console.log("abc");
  }, []);

  return (
    <>
      {products.map((todo: any) => (
        <p key={todo.id}>{todo.name} {todo.price}</p>
      ))}
    </>
  );
}
