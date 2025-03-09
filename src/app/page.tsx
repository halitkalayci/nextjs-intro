"use client"

import { ChangeEvent, useState } from "react";

export default function Home() {
  //let name:string = "Halit";
  let [name, setName] = useState<string>("Halit"); // React Hooks.

  const onBtnClick = () => {
    console.log("Butona tıklandı.")
    setName("Deniz")
    console.log(name);
  }

  return (
    <>
      <p>{name}</p>
      <button onClick={onBtnClick}>Değiştir</button>
      <input placeholder="İsminizi giriniz.." 
        value={name}
        onChange={
        (e: ChangeEvent<HTMLInputElement>) => {
          console.log(e.target.value)
          setName(e.target.value)
        }} />
      {/* Two way data binding */}
    </>
  );
}
// *-> Componentler tek wrappera sahip olmak zorundadır.
// React'in state mantığı.