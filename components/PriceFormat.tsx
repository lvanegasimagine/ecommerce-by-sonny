import React from 'react';
import PriceFormatter from './PriceFormatter';
import { cn } from '@/lib/utils';
interface Props {
    price: number | undefined;
    discount: number | undefined;
    className?: string;
    label?: string;
}
const PriceFormat = ({ price, discount, className, label }: Props) => {
    if (!price || !discount) return null;

    return (
        <div className="flex items-center justify-between gap-5">
            <div className="flex items-center gap-2">
                <PriceFormatter amount={price} className={className} />
                {price && discount && (
                    <PriceFormatter
                        amount={(price as number) + (discount * price) / 100}
                        className={cn("text-xs font-medium line-through", className)}
                    />
                )}
            </div>
            <p className="text-gray-500">{label}</p>
        </div>
    );
};

export default PriceFormat;
