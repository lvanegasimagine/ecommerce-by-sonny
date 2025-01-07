import { imageUrl } from '@/lib/imageUrl';
import { Product } from '@/sanity.types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ProductCartBar from './ProductCartBar';
import { Star } from 'lucide-react';
import PriceFormat from './PriceFormat';
import AddToCartButton from './AddToCartButton';

function ProductThumb({ product }: { product: Product }) {
    const isOutOfStock = product.stock != null && product.stock <= 0;

    if (!product) return null;

    return (
        <div className="group overflow-hidden rounded-lg border border-gray-300 text-sm">
            <div className="relative overflow-hidden border-b border-gray-300">
                {product.image && (
                    <Link href={`/product/${product.slug?.current}`}>
                        <Image
                            src={imageUrl(product.image).url()}
                            alt={product.name || 'Product Image'}
                            width={500}
                            height={500}
                            loading="lazy"
                            className={`max-h-96 w-full overflow-hidden object-cover transition-transform duration-300 ${!isOutOfStock && 'group-hover:scale-110'}`}
                            sizes="(max-width:768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </Link>
                )}
                {isOutOfStock && (
                    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
                        <div className="text-lg font-bold text-white">Out of Stock</div>
                    </div>
                )}
                {product.status && product.stock !== 0 && (
                    <div className="absolute left-2 top-2 z-10 flex flex-col items-center space-y-1 transition-opacity duration-300 group-hover:opacity-0">
                        {product.status.split('').map((char, index) => (
                            <span key={index} className="font-semibold uppercase">
                                {char}
                            </span>
                        ))}
                    </div>
                )}
                {!isOutOfStock && (
                    <div className="hoverEffect absolute bottom-0 left-0 w-full translate-y-12 group-hover:-translate-y-4">
                        <ProductCartBar />
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-2 p-5">
                <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-500">Rating</p>
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
                </div>
                <p className="line-clamp-1 text-base font-semibold capitalize tracking-wide text-gray-600">
                    {product.name}
                </p>
                <PriceFormat
                    price={product.price}
                    discount={product.discount}
                    label={product.label}
                />

                <AddToCartButton product={product} />
            </div>
        </div>
    );
}

export default ProductThumb;
