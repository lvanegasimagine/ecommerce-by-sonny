import Container from '@/components/Container';
import ProductGrid from '@/components/ProductGrid';
import { searchProductsByName } from '@/sanity/lib/products/searchProductsByName';
import React from 'react';

export default async function SearchPage({
    searchParams,
}: {
    searchParams: { query: string };
}) {
    const { query } = await searchParams;
    console.log("🚀 ~ query:", query)
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
        <div className="flex min-h-screen flex-col items-center justify-top bg-gray-100 p-4">
            <Container>
                <div className="w-full mt-3 rounded-lg bg-white p-8 shadow-md">
                    <h1 className="mb-3 text-center text-3xl font-bold">
                        Search results for {query}
                    </h1>
                    <ProductGrid products={products} />
                </div>
            </Container>
        </div>
    );
}
