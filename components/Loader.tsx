import React from 'react'
import loaderImage from '@/assets/loaderImage.png';
import Image from 'next/image';

const Loader = () => {
    return (
        <div className="fixed left-0 top-0 z-50 flex min-h-screen w-full items-center justify-center bg-white p-10">
            <div className="relative flex h-24 w-24 items-center justify-center">
                <div className="absolute inset-0 animate-spin-slow rounded-full border-2 border-dotted border-gray-400" />
                <Image
                    src={loaderImage}
                    alt="loaderImage"
                    className="h-14 w-14 object-cover"
                />
            </div>
        </div>
    )
}

export default Loader