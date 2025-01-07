import { Blend, FileQuestion, Share, Truck } from 'lucide-react'
import React from 'react'

const DATA_INFO_PRODUCTS = [
    {
        title: 'compare color',
        icon: Blend
    },
    {
        title: 'ask a question',
        icon: FileQuestion
    },
    {
        title: 'delivery & return',
        icon: Truck
    },
    {
        title: 'share',
        icon: Share
    }
]

const InfoProductsAditional = () => {
    return (
        <div className='flex items-center justify-between flex-wrap gap-2.5 border-b border-b-gray-200 py-5 -mt-2'>
            {DATA_INFO_PRODUCTS.map((item, index) => (
                <div key={index} className='flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect'>
                    <item.icon className='h-6 w-6' />
                    <p className='text-sm capitalize'>{item.title}</p>
                </div>
            ))}
        </div>
    )
}

export default InfoProductsAditional