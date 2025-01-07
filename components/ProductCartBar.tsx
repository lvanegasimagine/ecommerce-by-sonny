import React from 'react';
import { Star, Eye, ArrowRightLeft, ShoppingBag } from 'lucide-react';

const icons = [Star, Eye, ArrowRightLeft, ShoppingBag];

const ProductCartBar = () => {
    return (
        <div className="flex items-center justify-center gap-2.5 text-lg text-gray-500">
            {icons.map((Icon, index) => (
                <div
                    key={index}
                    className="hoverEffect rounded-xl border bg-white p-2 shadow-md hover:bg-darkBlue hover:text-white"
                >
                    <Icon />
                </div>
            ))}
        </div>
    );
};

export default ProductCartBar;
