import Container from '@/components/Container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getOrderByUserId } from '@/sanity/lib/orders/getOrderByUserId';
import { auth } from '@clerk/nextjs/server';
import { FileX } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import OrdersComponent from './_components/OrdersComponent';

const OrdersPage = async () => {
    const { userId } = await auth();

    if (!userId) {
        return redirect('/');
    }

    const orders = await getOrderByUserId(userId);

    if (!orders.length) {
        return (
            <div className="flex flex-col items-center justify-center px-4 py-12">
                <FileX className="mb-4 h-24 w-24 text-gray-400 hoverEffect" />
                <h3 className="text-2xl font-semibold text-gray-900">
                    No Orders Found
                </h3>
                <p className="mt-2 max-w-md text-center text-sm text-gray-600">
                    It looks like you haven&apos;t places any orders yet. Start shopping
                    to see your orders here!
                </p>
                <Button asChild className="mt-6 hover:bg-gray-600 hover:animate-pulse">
                    <Link href={'/'}>Browse Products</Link>
                </Button>
            </div>
        );
    }

    return (
        <div>
            <Container className="py-10">
                <Card className='w-full'>
                    <CardHeader>
                        <CardTitle>Order List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className='w-full'>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className='w-[100px] md:w-auto'>Order Number</TableHead>
                                        <TableHead className='hidden md:table-cell'>Date</TableHead>
                                        <TableHead>Customer</TableHead>
                                        <TableHead className='hidden md:table-cell'>Email</TableHead>
                                        <TableHead>Total</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <OrdersComponent orders={orders} />
                            </Table>
                            <ScrollBar orientation='horizontal' />
                        </ScrollArea>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
};

export default OrdersPage;
