import Image from "next/image";

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
};

type Params = {
    params: Promise<{ id: number }>
}

export default async function Product({ params }: Params) {
    const { id } = await params;

    const res = await fetch(`https://fakestoreapi.com/products/${id}`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Failed to fetch data");

    const data: Product = await res.json()

    console.log(data);


    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
                {data.title}
            </h1>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-10 shadow-lg rounded-xl p-6 bg-white mb-10">
                <div className="w-64 h-64 relative">
                    <Image
                        src={data.image}
                        alt={data.title}
                        layout="fill"
                        objectFit="contain"
                        className="shadow-2xl shadow-blue-400"
                    />
                </div>

                <div className="text-center lg:text-left">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Price</h2>
                    <p className="text-lg font-bold">${data.price}</p>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Rate</h2>
                    <p className="text-lg font-bold">{data.rating.rate} / 5</p>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Description</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{data.description}</p>
            </div>
        </div>
    )
};