import Link from 'next/link';
import React from 'react';
import Form from 'next/form';
import { ClerkLoaded, SignedIn, SignInButton, UserButton } from '@clerk/nextjs';
import { auth, currentUser } from '@clerk/nextjs/server';
import Container from './Container';
import Image from 'next/image';
import logo from '@/assets/logo.png';
// import CartIcon from "./CartIcon";
import { User, ShoppingBasket } from 'lucide-react';
import CartIcon from './CartIcon';
import { getOrderByUserId } from '@/sanity/lib/orders/getOrderByUserId';

const Header = async () => {
    const user = await currentUser();
    const { userId } = await auth();
    let orders = null;
    if (userId) {
        orders = await getOrderByUserId(userId);
    }

    return (
        <div className="sticky top-0 z-50 border-b border-b-gray-200 bg-white py-1">
            <Container>
                <header className="flex flex-wrap items-center justify-between gap-2 py-2">
                    <Link href={'/'}>
                        <Image src={logo} alt="logo" className="w-24" priority />
                    </Link>
                    <Form
                        action="/search"
                        className="w-full sm:mx-4 sm:mt-0 sm:w-auto sm:flex-1"
                    >
                        <input
                            type="text"
                            name="query"
                            placeholder="Search for products"
                            className="hoverEffect w-full max-w-4xl rounded-md border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        />
                    </Form>
                    <div className="flex flex-1 items-center space-x-4 sm:mt-0 sm:flex-none">
                        <CartIcon />
                        {/* User icons */}
                        <ClerkLoaded>
                            <SignedIn>
                                <Link
                                    href={'/orders'}
                                    className="hoverEffect flex items-center gap-2 rounded-md border border-gray-200 px-2 py-1 text-sm shadow-md hover:shadow-none"
                                >
                                    <ShoppingBasket className="text-2xl text-darkBlue" />
                                    <div className="flex flex-col">
                                        <p className="text-xs">
                                            <span className="font-semibold">
                                                {orders && orders?.length > 0 ? orders?.length : 0}
                                            </span>{' '}
                                            items
                                        </p>
                                        <p className="font-semibold">Orders</p>
                                    </div>
                                </Link>
                            </SignedIn>

                            {user ? (
                                <div className="hoverEffect flex items-center gap-2 rounded-md border border-gray-200 px-2 py-1 text-sm shadow-md hover:shadow-none">
                                    <UserButton />
                                    <div className="text-xs">
                                        <p className="text-gray-400">Welcome Back</p>
                                        <p className="font-bold">{user?.fullName}</p>
                                    </div>
                                </div>
                            ) : (
                                <SignInButton mode="modal">
                                    <div className="hoverEffect flex cursor-pointer items-center gap-2 rounded-md border border-gray-200 px-2 py-1 text-sm shadow-md hover:shadow-none">
                                        <User className="text-2xl text-darkBlue" />
                                        <div className="flex flex-col">
                                            <p className="text-xs">Account</p>
                                            <p className="font-semibold">Login</p>
                                        </div>
                                    </div>
                                </SignInButton>
                            )}
                        </ClerkLoaded>
                    </div>
                </header>
            </Container>
        </div>
    );
};

export default Header;
