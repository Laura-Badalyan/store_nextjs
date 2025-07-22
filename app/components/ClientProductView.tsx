"use client";

import Image from "next/image";
import { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

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

function getStarCounts(rate: number) {
    if (rate >= 5) return { full: 5, half: 0, empty: 0 };
    const decimal = rate % 1;
    let full = Math.floor(rate);
    let half = 0;
    if (decimal >= 0.25 && decimal < 0.75) half = 1;
    else if (decimal >= 0.75) full += 1;
    const empty = 5 - full - half;
    return { full, half, empty };
}

export default function ClientProductView({ product }: { product: Product }) {
    const [isOpen, setIsOpen] = useState(false);
    const { full, half, empty } = getStarCounts(product.rating.rate);

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center ">
                    <div className="relative bg-white p-4 rounded-lg max-w-3xl w-full mx-4 shadow-xl shadow-blue-200 border-2 border-blue-200">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-2 right-3 text-3xl text-gray-600 hover:text-black z-50 cursor-pointer"
                            aria-label="Close image preview"
                        >
                            &times;
                        </button>
                        <div className="w-full h-[500px] relative">
                            <Image
                                src={product.image}
                                alt={product.title}
                                layout="fill"
                                objectFit="contain"
                                className="rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            )}

            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
                {product.title}
            </h1>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-10 shadow-lg shadow-blue-200 rounded-xl p-6 bg-white mb-10 transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
                <div
                    onClick={() => setIsOpen(true)}
                    className="w-64 h-64 relative overflow-hidden group rounded-lg shadow-lg cursor-zoom-in"
                >
                    <Image
                        src={product.image}
                        alt={product.title}
                        layout="fill"
                        objectFit="contain"
                    />
                </div>

                <div className="text-center lg:text-left p-4 rounded-md hover:bg-gray-50 hover:shadow-inner">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Price</h2>
                    <p className="text-3xl font-bold text-blue-900">${product.price}</p>
                </div>

                <div className="p-4 rounded-md hover:bg-gray-50 hover:shadow-inner">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Rating</h2>
                    <div className="flex items-center space-x-1 text-yellow-400 text-xl">
                        {Array(full)
                            .fill(0)
                            .map((_, i) => (
                                <FaStar
                                    key={`full-${i}`}
                                    className="hover:scale-125 transition-transform duration-300"
                                />
                            ))}

                        {half === 1 && (
                            <span className="relative w-5 h-5 inline-block hover:scale-125 transition-transform duration-300">
                                <span className="absolute left-0 top-0 w-1/2 overflow-hidden text-yellow-400">
                                    <FaStarHalfAlt />
                                </span>
                                <span className="text-gray-300">
                                    <FaStarHalfAlt />
                                </span>
                            </span>
                        )}

                        {Array(empty)
                            .fill(0)
                            .map((_, i) => (
                                <FaRegStar
                                    key={`empty-${i}`}
                                    className="text-gray-300 hover:scale-125 transition-transform duration-300"
                                />
                            ))}
                    </div>

                    <p className="text-sm text-gray-500 mt-1">{product.rating.count} ratings</p>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg shadow-blue-200 transition-shadow duration-300">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Description</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{product.description}</p>
            </div>
        </div>
    );
}
