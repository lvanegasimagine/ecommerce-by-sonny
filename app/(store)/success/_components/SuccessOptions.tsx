import { Home, Package, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const DATA_BUTTON_SUCCESS = [
    {
        title: 'Home',
        href: '/',
        icon: Home,
    },
    {
        title: 'Orders',
        href: '/orders',
        icon: Package,
    },
    {
        title: 'Shopping',
        href: '/shopping',
        icon: ShoppingBag,
    },
];
const SuccessOptions = () => {
    return (
        <>
            {DATA_BUTTON_SUCCESS.map((item, index) => (
                <Link
                    key={index}
                    href={item.href}
                    className="hoverEffect flex items-center justify-center rounded-lg bg-green-500 px-4 py-3 font-semibold text-white shadow-md hover:bg-green-600 capitalize"
                >
                    <item.icon className="mr-2 h-5 w-5" />
                    {item.title}
                </Link>
            ))}
        </>
    );
};

export default SuccessOptions;
