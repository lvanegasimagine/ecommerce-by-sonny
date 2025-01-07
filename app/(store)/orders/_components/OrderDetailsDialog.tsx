import React from 'react';
import { ORDER_BY_USER_ID_QUERYResult } from '@/sanity.types';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import { imageUrl } from '@/lib/imageUrl';
import PriceFormatter from '@/components/PriceFormatter';

interface Props {
    order: ORDER_BY_USER_ID_QUERYResult[number] | null;
    isOpen: boolean;
    onClose: () => void;
}
const OrderDetailsDialog: React.FC<Props> = ({ order, isOpen, onClose }) => {
    if (!order) return null;
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Order Details - {order.orderNumber}</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                    <p>
                        <strong>Customer:</strong> {order.customerName}
                    </p>
                    <p>
                        <strong>Email:</strong> {order.email}
                    </p>
                    <p>
                        <strong>Date:</strong>{' '}
                        {order.orderDate && new Date(order.orderDate).toLocaleDateString()}
                    </p>
                    <p>
                        <strong>Status:</strong> {order.status}
                    </p>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Price</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {order.products?.map((product, index) => (
                            <TableRow key={index}>
                                <TableCell className="flex items-center gap-2">
                                    {product?.product?.image && (
                                        <Image
                                            src={imageUrl(product?.product?.image).url()}
                                            alt="productImage"
                                            width={50}
                                            height={50}
                                            className="rounded-sm border"
                                        />
                                    )}

                                    {product?.product && product?.product?.name}
                                </TableCell>
                                <TableCell>{product?.quantity}</TableCell>
                                <TableCell>
                                    <PriceFormatter
                                        amount={product?.product?.price}
                                        className="font-medium text-black"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="mt-4 text-right">
                    <strong>Total: </strong>
                    <PriceFormatter
                        amount={order?.totalPrice}
                        className="font-bold text-black"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default OrderDetailsDialog;