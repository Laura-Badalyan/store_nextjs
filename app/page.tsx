import Image from "next/image";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  }
}

type Products = Product[];

export default async function Home() {

  const res = await fetch('https://fakestoreapi.com/products', { next: { revalidate: 60 } });

  if (!res.ok) throw new Error("Failed to fetch data");

  const data: Products = await res.json();

  return (
    <div className="container mx-auto">
      <h1 className=" text-3xl text-center p-4 font-bold text-blue-400 shadow-2xl shadow-blue-200">ONLINE SHOP</h1>
      <ul className="container grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-4 my-8">
        {data.map(product => <li
          key={product.id}
          className="border-1 border-blue-200 rounded-b-2xl shadow-2xl shadow-blue-300"
        >
          <p className=" text-xl text-blue-50 bg-blue-900 rounded-b-2xl text-center">{product.category}</p>
          <div className="h-100 m-4 flex flex-col items-center justify-between">
            <Link href={`/product/${product.id}`} className="w-[200px] flex justify-center cursor-pointer">
              <Image
                src={product.image}
                alt={product.title}
                className="object-cover"
                width={100}
                height={50}
              />
            </Link>
            <p className="text-[14px] text-center my-4 text-blue-900">{product.title}</p>
            <div className=" w-full flex justify-between">
              <p className="text-center my-4 text-blue-400">{product.rating.rate} / 5 </p>
            <p className=" text-xl text-center my-4 text-blue-900 font-bold">${product.price}</p>
              <p className="text-center my-4 text-blue-400">Rated: {product.rating.count} </p>
            </div>
          </div>
        </li>)}
      </ul>
    </div>
  );
}
