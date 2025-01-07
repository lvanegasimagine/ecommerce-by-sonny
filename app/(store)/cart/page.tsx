'use client';
import Container from '@/components/Container';
import Loader from '@/components/Loader';
import NoAccessToCart from '@/components/NoAccessToCart';
import PriceFormatter from '@/components/PriceFormatter';
import QuantityButtons from '@/components/QuantityButtons';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { imageUrl } from '@/lib/imageUrl';
import useCartStore from '@/store/store';
import { useAuth, useUser } from '@clerk/nextjs';
import { ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import toast from 'react-hot-toast';
import EmptyCart from './_components/EmptyCart';
import { createCheckoutSession, Metadata } from '@/actions/createCheckoutSession';

const CartPage = () => {
    const {
        deleteCartProduct,
        getTotalPrice,
        getSubTotalPrice,
        getItemCount,
        resetCart,
    } = useCartStore();
    const [isClient, setIsClient] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const groupedItems = useCartStore((state) => state.getGroupedItems());
    console.log("🚀 ~ CartPage ~ groupedItems:", groupedItems)
    const { user } = useUser();
    const { isSignedIn } = useAuth();

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return <Loader />;

    const handleDeleteProduct = (productId: string) => {
        deleteCartProduct(productId);
        toast.success('Product removed from cart');
    };

    const handleResetCart = () => {
        const confirmed = window.confirm('Are you sure to reset your cart?');

        if (confirmed) {
            resetCart();
            toast.success('Cart reset successfully');
        }
    };

    const handleCheckout = async () => {
        setLoading(true)

        try {
            const metadata: Metadata = {
                orderNumber: crypto.randomUUID(),
                customerName: user?.fullName ?? 'Unknown',
                customerEmail: user?.emailAddresses[0].emailAddress ?? 'Unknown',
                clerkUserId: user!.id
            }

            const checkoutUrl = await createCheckoutSession(groupedItems, metadata)

            if (checkoutUrl) {
                window.location.href = checkoutUrl
            }
        } catch (error) {
            console.error('Error Creating Checkout Session:', error);
        } finally {
            setLoading(false)
        }
        toast.success('Checkout will apply soon');
    };

    return (
        <div className="bg-gray-50 pb-10">
            {isSignedIn ? (
                <Container>
                    {groupedItems.length ? (
                        <>
                            <div className="flex items-center gap-2 py-5">
                                <ShoppingBag className="h-6 w-6 text-primary" />
                                <h1 className="text-2xl font-semibold">Shopping Cart</h1>
                            </div>
                            <div className="grid gap-2 md:gap-8 lg:grid-cols-3">
                                <div className="lg:cols-span-1">
                                    <div className="w-full rounded-lg border bg-white p-6 md:inline-block">
                                        <h2 className="mb-4 text-xl font-semibold">
                                            Order Summary
                                        </h2>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span>Subtotal</span>
                                                <PriceFormatter amount={getSubTotalPrice()} />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span>Discount</span>
                                                <PriceFormatter
                                                    amount={getSubTotalPrice() - getTotalPrice()}
                                                />
                                            </div>
                                            <Separator />
                                            <div className="flex items-center justify-between">
                                                <span>Total</span>
                                                <PriceFormatter amount={getTotalPrice()} />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <Button onClick={handleCheckout} disabled={loading}>
                                                    {loading ? 'Processing...' : 'Proceed to Checkout'}
                                                </Button>
                                                <Link
                                                    href={'/'}
                                                    className="hoverEffect text-center text-primary hover:text-darkBlue hover:underline"
                                                >
                                                    Continue Shopping
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:col-span-2">
                                    <div className="grid grid-cols-5 rounded-tl-lg rounded-tr-lg border bg-white p-2.5 text-base font-semibold md:grid-cols-6">
                                        <h2 className="col-span-2 md:col-span-3">Product</h2>
                                        <h2>Price</h2>
                                        <h2 className="ml-4">Quantity</h2>
                                        <h2>Total</h2>
                                    </div>
                                    <div className="rounded-bl-lg rounded-br-lg border border-t-0 bg-white">
                                        {groupedItems.map(({ product }) => {
                                            const itemCount = getItemCount(product._id);
                                            return (
                                                <div
                                                    className="grid grid-cols-5 border-b p-2.5 last:border-b-0 md:grid-cols-6"
                                                    key={product._id}
                                                >
                                                    <div className="col-span-2 flex items-center md:col-span-3">
                                                        <Trash2
                                                            className="hoverEffect mr-1 h-4 w-4 text-gray-500 hover:text-red-600 md:h-5 md:w-5"
                                                            onClick={() => {
                                                                handleDeleteProduct(product._id);
                                                            }}
                                                        />
                                                        {product.image && (
                                                            <Link
                                                                href={`/product/${product.slug?.current}`}
                                                                className="group mr-2 overflow-hidden rounded-md border p-0.5 md:p-1"
                                                            >
                                                                <Image
                                                                    src={imageUrl(product.image).url()}
                                                                    alt="productImage"
                                                                    width={300}
                                                                    height={300}
                                                                    className="hoverEffect h-10 w-10 overflow-hidden object-cover transition-all duration-300 group-hover:scale-105 md:h-14 md:w-full"
                                                                />
                                                            </Link>
                                                        )}
                                                        <h2 className="text-sm">{product.name}</h2>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <PriceFormatter
                                                            amount={
                                                                product.price ? product.price * itemCount : 0
                                                            }
                                                        />
                                                    </div>
                                                    <QuantityButtons
                                                        product={product}
                                                        className="gap-0 text-sm md:gap-1"
                                                    />
                                                    <div className="flex items-center">
                                                        <PriceFormatter
                                                            amount={
                                                                product.price ? product.price * itemCount : 0
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        <Button
                                            variant={'destructive'}
                                            className="m-5 font-semibold"
                                            onClick={handleResetCart}
                                        >
                                            Reset Cart
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <EmptyCart />
                    )}
                </Container>
            ) : (
                <NoAccessToCart />
            )}
        </div>
    );
};

export default CartPage;
