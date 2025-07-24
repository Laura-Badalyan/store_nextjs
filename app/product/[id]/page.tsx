import ClientProductView from "@/components/ClientProductView";

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
  };
};

type Params = {
  params: { id: string };
};

export default async function Product({ params }: Params) {
  const res = await fetch(`https://fakestoreapi.com/products/${params?.id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to fetch product");

  const product: Product = await res.json();

  return <ClientProductView product={product} />;
}
