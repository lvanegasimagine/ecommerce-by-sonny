import { Product } from '@/sanity.types';
import React from 'react';
import AddToBasketButton from './AddToBasketButton';

interface Props {
    product: Product;
    className?: string;
    borderStyle?: string;
}
const QuantityButtons = ({ product }: Props) => {
    return <AddToBasketButton product={product} />;
};

export default QuantityButtons;
