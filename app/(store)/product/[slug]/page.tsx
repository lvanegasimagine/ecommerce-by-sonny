import AddToCartButton from '@/components/AddToCartButton';
import Container from '@/components/Container';
import PriceFormat from '@/components/PriceFormat';
import { imageUrl } from '@/lib/imageUrl';
import { getProductBySlug } from '@/sanity/lib/products/getProductBySlug';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';
import InfoProductsAditional from '../_components/InfoProductsAditional';

export default async function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        return notFound();
    }

    const isOutOfStock = product.stock !== null && product.stock! <= 0;

    return (
        <div>
            <Container>
                <div className="grid grid-cols-1 gap-10 py-10 lg:grid-cols-2">
                    <div
                        className={`relative aspect-square overflow-hidden rounded-lg shadow-lg ${isOutOfStock ? 'opacity-50' : ''}`}
                    >
                        {product.image && (
                            <Image
                                src={imageUrl(product.image).url()}
                                alt={product.name || 'Product image'}
                                fill
                                priority
                                className="object-contain transition-transform duration-300 hover:scale-105"
                            />
                        )}
                        {isOutOfStock && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <span className="text-lg font-bold text-white">
                                    Out of Stock
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="flex w-full flex-col gap-5 p-4">
                        <div>
                            <p className="mb-2 text-4xl font-bold">{product.name}</p>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 text-gray-500">
                                    {Array.from({ length: 5 }).map((_, index) => {
                                        const isLastStar = index === 4;
                                        return (
                                            <Star
                                                key={index}
                                                fill={!isLastStar ? '#fca99b' : 'transparent'}
                                                className={`${isLastStar ? 'text-gray-300' : 'text-lightOrange'}`}
                                            />
                                        );
                                    })}
                                </div>
                                <div className="">
                                    <p className="text-sm font-medium text-gray-500">{`(25 reviews)`}</p>
                                </div>
                            </div>
                        </div>
                        <PriceFormat
                            price={product.price ?? 0}
                            discount={product.discount}
                            label={product.label}
                            className="text-lg font-bold"
                        />
                        {product.stock && (
                            <p className="w-24 rounded-lg bg-green-100 py-2.5 text-center text-sm font-semibold text-green-600">
                                In Stock
                            </p>
                        )}
                        <p className="text-base text-gray-800">
                            <span className="mr-2 rounded-md bg-black px-3 py-1 text-sm font-semibold text-white">
                                20
                            </span>
                            People are viewing this right now
                        </p>
                        <p className="text-sm tracking-wide text-gray-600">
                            {product?.description}
                        </p>
                        <AddToCartButton product={product} />
                        <InfoProductsAditional />
                        <div className="flex flex-wrap items-center justify-center gap-5">
                            <div className="hoverEffect rounded-md border border-darkBlue/20 p-3 text-center hover:border-darkBlue">
                                <p className="text-base font-semibold text-black">
                                    Free Shiping
                                </p>
                                <p className="text-sm text-gray-500">
                                    Free Shipping over order $120
                                </p>
                            </div>
                            <div className="hoverEffect rounded-md border border-darkBlue/20 p-3 text-center hover:border-darkBlue">
                                <p className="text-base font-semibold text-black">
                                    Flexible Payment
                                </p>
                                <p className="text-sm text-gray-500">
                                    Pay with multiple Credit Cards
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
