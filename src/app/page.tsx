export default async function Home() {
  // Fetch -> Bir backendden veri çekme.
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await response.json();
  console.log(data)

  return (
    <>
      <p>Merhaba</p>
      <p>{data.length}</p>
      {data.map((todo:any) => <p>{todo.title}</p>)}
    </>
  );
}
