export default async function Home() {
  // Fetch -> Bir backendden veri çekme.
  const response = await fetch("http://localhost:3000/api/products");
  const data = await response.json();
  console.log(data)

  return (
    <>
      <p>Merhaba</p>
      <p>{data.length}</p>
      {data.map((product:any) => <p>{product.name} {product.price}</p>)}
    </>
  );
}
