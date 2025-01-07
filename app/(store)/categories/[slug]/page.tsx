import Container from '@/components/Container';
import ProductsView from '@/components/ProductsView';
import { getAllCategories } from '@/sanity/lib/products/getAllCategories';
import { getProductsByCategory } from '@/sanity/lib/products/getProductsByCategory';
import Link from 'next/link';
import React from 'react';

async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const products = await getProductsByCategory(slug);
    const categories = await getAllCategories();

    if (!products.length) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
                <div className="w-full max-w-4xl rounded-lg bg-white p-8 shadow-lg">
                    <h1 className="mb-6 text-center text-3xl font-bold">
                        No Categories found for: {slug}
                    </h1>
                    <p className="pt-4 text-center text-gray-600">
                        <Link href="/" className="rounded-lg bg-blue-500 p-4 text-white">
                            Home
                        </Link>
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="justify-top flex min-h-screen flex-col items-center bg-gray-100 p-4">
            <Container>
                <div className="w-full rounded-lg bg-white p-8 shadow-md">
                    <h1 className="mb-6 text-center text-3xl font-bold">
                        {slug
                            .split('-')
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ')}{' '}
                        Collection
                    </h1>
                    <ProductsView products={products} categories={categories} />
                </div>
            </Container>
        </div>
    );
}

export default CategoryPage;
