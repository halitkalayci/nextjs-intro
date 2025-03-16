"use client";

import { useEffect, useState } from "react";

export default function CsrFetchPage() {
  const [toDos, setToDos] = useState<any>([]);
  const fetchToDos = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    setToDos(data);
  };

  useEffect(() => {
    fetchToDos();
    console.log("abc");
  }, []);

  return (
    <>
      {toDos.map((todo: any) => (
        <p key={todo.id}>{todo.title}</p>
      ))}
    </>
  );
}
