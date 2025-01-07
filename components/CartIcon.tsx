'use client';
import useCartStore from '@/store/store';
import { ShoppingBasketIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
const CartIcon = () => {
    const [isClient, setIsClient] = useState(false);
    const groupedItems = useCartStore((state) => state.getGroupedItems());
    useEffect(() => {
        setIsClient(true);
    }, []);
    if (!isClient) {
        return null;
    }
    return (
        <Link
            href={'/cart'}
            className="hoverEffect flex items-center gap-2 rounded-md border border-gray-200 px-2 py-1 text-sm shadow-md hover:shadow-none"
        >
            <ShoppingBasketIcon className="text-2xl text-darkBlue" />
            <div className="flex flex-col">
                <p className="text-xs">
                    <span className="font-semibold">
                        {groupedItems?.length ? groupedItems.length : 0}{' '}
                    </span>
                    items
                </p>
                <p className="font-semibold">Cart</p>
            </div>
        </Link>
    );
};

export default CartIcon;
