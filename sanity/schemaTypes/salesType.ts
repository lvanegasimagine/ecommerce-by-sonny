import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const salesType = defineType({
    name: 'sale',
    title: 'Sale',
    type: 'document',
    icon: TagIcon,
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            title: 'Sale title'
        }),
        defineField({
            name: 'description',
            type: 'text',
            title: 'Sale description'
        }),
        defineField({
            name: 'badge',
            title: 'Discount Badge',
            type: 'string',
            description: 'Discount Badge Ratio'
        }),
        defineField({
            name: 'discountAmount',
            type: 'number',
            title: 'Discount amount',
            description: 'Amount off in percentage or fixed value'
        }),
        defineField({
            name: 'couponCode',
            type: 'string',
            title: 'Coupon Code'
        }),
        defineField({
            name: 'validFrom',
            type: 'datetime',
            title: 'Valid from'
        }),
        defineField({
            name: 'validUntil',
            type: 'datetime',
            title: 'Valid Until'
        }),
        defineField({
            name: 'isActive',
            type: 'boolean',
            title: 'Is Active',
            description: 'Toggle to activate/deactivate the sale',
            initialValue: true
        }),
        defineField({
            name: 'image',
            title: 'Product Image',
            type: 'image',
            options: {
                hotspot: true
            },
            validation: (Rule) => Rule.required()
        })
    ],
    preview: {
        select: {
            title: 'title',
            discountAmount: 'discountAmount',
            couponCode: 'couponCode',
            isActive: 'isActive'
        },
        prepare(selection) {
            const { title, discountAmount, couponCode, isActive } = selection
            const status = isActive ? 'Active' : 'Inactive'

            return {
                title,
                subtitle: `${discountAmount}% off - Code: ${couponCode} - ${status}`,
            }
        }
    }
})