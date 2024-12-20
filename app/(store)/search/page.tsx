import ProductGrid from '@/components/ProductGrid';
import { searchProductsByName } from '@/sanity/lib/products/searchProductsByName';
import React from 'react';

export default async function SearchPage({
    searchParams,
}: {
    searchParams: { query: string };
}) {
    const { query } = await searchParams;
    const products = await searchProductsByName(query);

    if (!products.length) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
                <div className="w-full max-w-4xl rounded-lg bg-white p-8 shadow-lg">
                    <h1 className="mb-6 text-center text-3xl font-bold">
                        No Products found for: {query}
                    </h1>
                    <p className="text-center text-gray-600">
                        Try searching with different keywords
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
                <h1 className='text-3xl font-bold mb-6 text-center'>Search results for {query}</h1>
                <ProductGrid products={products} />
            </div>
        </div>
    );
}
