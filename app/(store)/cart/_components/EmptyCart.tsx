import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import emptyCart from '@/assets/emptyCart.png';
import Link from 'next/link';
const EmptyCart = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-3 bg-white py-20 rounded-lg shadow-lg">
            <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="inline-block"
            >
                <ShoppingCart size={64} className="mx-auto text-gray-400" />
            </motion.div>
            <Image
                src={emptyCart}
                alt="Empty Shopping Bag"
                width={200}
                height={200}
                className="mx-auto rounded-lg shadow"
            />
            <div className="text-3xl font-bold text-gray-800">
                Your cart is empty!
            </div>
            <div className="mx-auto max-w-md text-gray-600">
                Looks like you haven&rsquo;t added anything to your cart yet. Explore
                our products and find something you love!
            </div>
            <Link
                href={'/'}
                className="py-3 inline-block rounded-lg bg-blue-600 px-6 font-semibold text-white transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Start Shopping
            </Link>
        </div>
    );
};

export default EmptyCart;
