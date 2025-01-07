import Image from 'next/image';
import React from 'react';
import logo from '@/assets/logo.png';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const NoAccessToCart = () => {
    return (
        <div className="flex items-center justify-center p-4 py-12 md:py-32">
            <Card className="w-full max-w-xl">
                <CardHeader className="space-y-1">
                    <div className="flex justify-center">
                        <Image
                            src={logo}
                            alt="Company logo"
                            width={80}
                            height={80}
                            className="mb-4"
                        />
                    </div>
                    <CardTitle className="text-center text-2xl font-bold">
                        Welcome Back!
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-center text-muted-foreground">
                        Log in to view your cart items and checkout. Don&rsquo;t miss out on
                        your favorite products!
                    </p>
                    <SignInButton mode="modal">
                        <Button className="w-full" size="lg">
                            Sign in
                        </Button>
                    </SignInButton>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                    <div className="text-center text-sm text-muted-foreground">
                        Don&rsquo;t have an account?
                    </div>
                    <SignUpButton mode="modal">
                        <Button variant="outline" className="w-full" size="lg">
                            Create an account
                        </Button>
                    </SignUpButton>
                </CardFooter>
            </Card>
        </div>
    );
};

export default NoAccessToCart;
