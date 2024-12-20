import { COUPON_CODES } from '@/sanity/lib/sales/couponCodes';
import { getActiveSaleByCouponCode } from '@/sanity/lib/sales/getActiveSaleByCouponCode';
import React from 'react';

export default async function BlackFridayBanner() {
    const sale = await getActiveSaleByCouponCode(COUPON_CODES.BFRIDAY);

    if (!sale?.isActive) {
        return null;
    }

    return (
        <div className="mx-4 mt-2 rounded-lg bg-gradient-to-r from-red-600 to-black px-6 py-10 text-white shadow-lg">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex-1">
                    <h2 className="mb-4 text-left text-3xl font-extrabold sm:text-5xl">
                        {sale.title}
                    </h2>
                    <p className="mb-6 text-left text-xl font-semibold sm:text-3xl">
                        {sale.description}
                    </p>
                    <div className="flex">
                        <div className="bg-white text-black py-4 px-6 rounded-full shadow-md transform hover:scale-105 transition duration-300">
                            <span className='font-bold text-base sm:text-xl'>
                                Use code:
                                <span className='text-red-600'>{sale.couponCode}</span>
                            </span>
                            <span className='ml-2 font-bold text-base sm:text-xl'>
                                for {sale.discountAmount}% OFF
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
