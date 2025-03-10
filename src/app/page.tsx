"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Example from "./components/example-component/Example";
import Link from "next/link";

export default function Home() {
  let name2:string = "Halit";
  // Generic Yapılar
  let [name, setName] = useState<string>("Halit"); // React Hooks.

  const onBtnClick = () => {
    console.log("Butona tıklandı.");
    setName("Deniz"); // -> Async?
  };

  // hook -> useEffect eğer dep list boş ise sayfa açıldığında 1 kere çalışır.
  useEffect(() => {
    console.log("abc");
  }, []); //dep.list

  // name değişkeninin değişikliklerini izler.
  useEffect(() => {
    console.log(name);
  }, [name]);

  return (
    <>
      {/* <a href="/about-us">Hakkımızda</a>  YASAK !!*/}
      <Link href={"/about-us"}> Hakkımızda Sayfası </Link>
      <p>{name}</p>
      <button
        onClick={(e) => {
          console.log(e);
          onBtnClick();
        }}
      >
        Değiştir
      </button>
      <input
        placeholder="İsminizi giriniz.."
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          console.log(e.target.value);
          setName(e.target.value);
        }}
      />
      {/* Two way data binding */}

      <Example
        name="Halit"
        surname="Kalaycı"
        onClick={(message: string) => alert(message)}
      />
      <Example name="Deniz" surname="Özaltay"></Example>
      <Example name="Ali Kemal" surname="Çalak" />
      <Example name="Berfin" surname="Özer" />
      <Example name="Erdal" surname="Sarı" />
    </>
  );
}
// *-> Componentler tek wrappera sahip olmak zorundadır.
// React'in state mantığı.
// 16:00
