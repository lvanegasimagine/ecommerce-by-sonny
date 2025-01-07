'use client';
import { Product } from '@/sanity.types';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';
import QuantityButtons from './QuantityButtons';
import PriceFormatter from './PriceFormatter';
import React from 'react';
import useCartStore from '@/store/store';

interface Props {
    product: Product;
    className?: string;
}

const AddToCartButton = ({ product, className }: Props) => {
    const [isClient, setIsClient] = React.useState<boolean>(false);
    const { addItem, getItemCount } = useCartStore();

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    const handleToCart = () => {
        addItem(product)
        toast.success(`${product.name?.substring(0, 12)} added to cart!`);
    };

    const itemsCount = getItemCount(product._id);

    return (
        <div>
            {itemsCount ? (
                <div className="text-sm">
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Quantity</span>
                        <QuantityButtons product={product} />
                    </div>
                    <div className="flex items-center justify-between border-t pt-2">
                        <span>Subtotal</span>
                        <PriceFormatter
                            amount={product?.price ? product.price * itemsCount : 0}
                        />
                    </div>
                </div>
            ) : (
                <Button
                    onClick={handleToCart}
                    disabled={product.stock === 0}
                    className={cn(
                        'hoverEffect hoverEffect mt-2 w-full rounded-md border border-darkBlue bg-darkBlue/10 py-2 font-medium text-black hover:bg-darkBlue hover:text-white disabled:border-darkBlue/10 disabled:bg-darkBlue/10 disabled:text-gray-400 disabled:hover:cursor-not-allowed disabled:hover:text-gray-400',
                        className
                    )}
                >
                    <ShoppingBag
                        className="h-6 w-6 text-muted-foreground hover:stroke-white"
                        fill="white"
                    />
                    Add To Cart
                </Button>
            )}
        </div>
    );
};

export default AddToCartButton;
