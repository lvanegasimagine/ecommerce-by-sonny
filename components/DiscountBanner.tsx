import { getActiveSaleByCouponCode } from '@/sanity/lib/sales/getActiveSaleByCouponCode';
import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from './ui/carousel';
import { Sale } from '@/sanity.types';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import Image from 'next/image';
import { imageUrl } from '@/lib/imageUrl';
import { Button } from './ui/button';

const DiscountBanner = async () => {
    const sales = await getActiveSaleByCouponCode();

    if (!sales) {
        return null;
    }

    return (
        <Carousel className="mx-auto my-10 w-full max-w-screen-xl" opts={{ loop: true }}>
            <CarouselContent>
                {sales.map((sale: Sale) => (
                    <CarouselItem key={sale._id}>
                        <Card>
                            <CardContent className="p-0">
                                <div className="flex flex-col items-center md:flex-row">
                                    <div className="flex-1 gap-2 p-6 md:gap-4 md:px-12">
                                        <Badge
                                            variant={'secondary'}
                                            className="text-darkBlue mb-2 capitalize md:mb-4"
                                        >
                                            {sale.badge} {sale.discountAmount}% off
                                        </Badge>
                                        <h2 className="mb-2 text-2xl font-bold tracking-tight md:mb-4 md:text-3xl lg:text-4xl">
                                            {sale.title}
                                        </h2>
                                        <div className="mb-2 text-muted-foreground md:mb-4">
                                            {sale.description}
                                        </div>
                                        <p className="mb-2">
                                            Use code:{' '}
                                            <span className="font-semibold uppercase text-primary">
                                                {sale.couponCode}
                                            </span>{' '}
                                            for{' '}
                                            <span className="font-semibold">
                                                {sale.discountAmount}%
                                            </span>{' '}
                                            OFF
                                        </p>
                                        <Button>Shop Now</Button>
                                    </div>
                                    {sale.image && (
                                        <div className="flex h-auto w-full items-center justify-center py-2 md:w-1/2">
                                            <Image
                                                src={imageUrl(sale?.image).url()}
                                                alt="bannerImage"
                                                width={500}
                                                height={500}
                                                style={{ objectFit: "cover" }}
                                                className="h-full transition-transform duration-500 ease-in-out hover:scale-105"
                                            />
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2" />
            <CarouselNext className="absolute right-2" />
        </Carousel>
    );
};

export default DiscountBanner;
