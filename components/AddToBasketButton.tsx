'use client';
import { Product } from '@/sanity.types';
import useCartStore from '@/store/store';
import { MinusCircleIcon, PlusCircleIcon } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface Props {
    product: Product;
    disabled?: boolean;
    className?: string;
}
export default function AddToBasketButton({ product, disabled, className }: Props) {
    const { addItem, removeItem, getItemCount } = useCartStore();
    const itemCount = getItemCount(product._id);
    const [isClient, setIsClient] = React.useState<boolean>(false);

    // * Use useEffect to set isClient to true after component mounts
    // * This ensures that the component only renders on the client-side
    // * preventing hydration errors due to server/client mismatch

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <div className={cn("flex items-center justify-center gap-1 pb-1 text-base", className)}>
            <Button
                onClick={() => removeItem(product._id)}
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 ${itemCount === 0 ? 'cursor-not-allowed bg-gray-100' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
                <span
                    className={`text-xl font-bold ${itemCount === 0 ? 'text-gray-400' : 'text-gray-600'}`}
                >
                    <MinusCircleIcon />
                </span>
            </Button>
            <span className='w-8 text-center font-semibold'>{itemCount}</span>
            <button onClick={() => addItem(product)} className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}>
                <span className='text-xl font-bold text-white'>
                    <PlusCircleIcon />
                </span>
            </button>
        </div>
    );
}
