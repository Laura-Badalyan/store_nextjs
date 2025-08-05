'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

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

export default function Home() {
    const [page, setPage] = useState(1);
    const itemsPerPage = 6;
    const [query, setQuery] = useState('');
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('https://fakestoreapi.com/products');
                if (!res.ok) throw new Error("Failed to fetch data");
                const products: Products = await res.json();
                setProducts(products);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);


    const filtered = useMemo(() => products.filter(p => {

        return p.title.toLowerCase().includes(query.toLowerCase());
    }), [query, products])

    const totalPages = Math.ceil(filtered.length / itemsPerPage);

    const pagesArr = [];
    for (let i = 1; i <= totalPages; i++) pagesArr.push(i);

    const current = useMemo(() => {
        const start = (page - 1) * itemsPerPage;
        return filtered.slice(start, start + itemsPerPage)
    }, [page, filtered])

    const prev = () => { setPage(prev => Math.max(1, prev - 1)) };

    const next = () => { setPage(prev => Math.min(prev + 1, totalPages)) };



    return (
        <div className="container mx-auto">
            <h1 className=" text-3xl text-center p-4 font-bold text-blue-400 shadow-2xl shadow-blue-200">ONLINE SHOP</h1>

            <div className=" flex justify-end my-8">
                <input
                    type='text'
                    placeholder="Search ..."
                    value={query}
                    onChange={e => {
                        setQuery(e.target.value)
                        setPage(1)
                    }}
                    className=" flex justify-end px-8 py-1 border-2 border-blue-400 rounded-full bg-blue-50 focus:outline-0"
                />
            </div>

            <ul className="container grid sm:grid-cols-2 md:grid-cols-3 gap-4 mx-4 my-8">
                {current.map(product => <li
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
            <div className="flex justify-center w-full p-8 text-2xl text-blue-800">
                <button
                    onClick={prev}
                    disabled={page === 1}
                    className=" cursor-pointer disabled:text-blue-200 disabled:cursor-not-allowed"
                >{'<'}</button>
                {pagesArr.map(p => <button
                    key={p}
                    className={p === page ? " cursor-pointer px-3 border-2 border-blue-400 rounded-full bg-blue-50" : 'cursor-pointer p-1'}
                    onClick={() => setPage(p)}
                >
                    {p}
                </button>)}
                <button
                    onClick={next}
                    disabled={page === totalPages}
                    className=" cursor-pointer disabled:text-blue-200 disabled:cursor-not-allowed"
                >{'>'}</button>
            </div>
        </div>
    );
}
