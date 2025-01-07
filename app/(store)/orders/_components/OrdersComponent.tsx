'use client';
import PriceFormatter from '@/components/PriceFormatter';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ORDER_BY_USER_ID_QUERYResult } from '@/sanity.types';
import React from 'react';
import OrderDetailsDialog from './OrderDetailsDialog';

interface Props {
  orders: ORDER_BY_USER_ID_QUERYResult;
}
const OrdersComponent = ({ orders }: Props) => {
  const [selectedOrder, setSelectedOrder] = React.useState<
    ORDER_BY_USER_ID_QUERYResult[number] | null
  >(null);

  const handleOrderClicked = (
    order: ORDER_BY_USER_ID_QUERYResult[number]
  ) => {
    setSelectedOrder(order)
  };

  return (
    <>
      <TableBody>
        <TooltipProvider>
          {orders.map((order) => (
            <Tooltip key={order.orderNumber}>
              <TooltipTrigger asChild>
                <TableRow
                  className="h-12 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleOrderClicked(order)}
                >
                  <TableCell className="font-medium">
                    {order.orderNumber?.slice(-10) ?? 'N/A'}...
                  </TableCell>
                  <TableCell className="hidden -tracking-tighter md:table-cell">
                    {order.orderDate &&
                      new Date(order.orderDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order.email}
                  </TableCell>
                  <TableCell>
                    <PriceFormatter
                      className="font-medium text-black"
                      amount={order.totalPrice}
                    />
                  </TableCell>
                  <TableCell>
                    {order.status && (
                      <span
                        className={`rounded-full px-4 py-1 text-xs font-semibold capitalize ${order.status === 'paid' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-800'}`}
                      >
                        {order.status}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click to see order details</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </TableBody>
      <OrderDetailsDialog order={selectedOrder} isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} />
    </>
  );
};

export default OrdersComponent;
