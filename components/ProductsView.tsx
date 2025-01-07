import React from 'react';
import { Category, Product } from '@/sanity.types';
import ProductGrid from './ProductGrid';
import { CategorySelectorComponent } from './ui/category-selector';
// import CategorySelectorComponent from './CategorySelectorComponent';

interface ProductsViewProps {
    products: Product[];
    categories: Category[];
    title?: boolean;
}

export default function ProductsView({
    products,
    // title,
    categories,
}: ProductsViewProps) {
    return (
        <div className="pb-32">
            <CategorySelectorComponent categories={categories} />
            <div className="pb-5 mt-5">
                <h2 className="text-2xl font-semibold text-gray-600">
                    Day of the <span className="text-lightBlue">Deal</span>
                </h2>
                <p className="text-sm text-gray-500">
                    Don&apos;t wait. The time will never be just right!
                </p>
            </div>
            <div>
                <ProductGrid products={products} />
            </div>
        </div>
    );
}
