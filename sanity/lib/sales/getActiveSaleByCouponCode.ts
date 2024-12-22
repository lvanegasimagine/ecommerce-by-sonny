import { defineQuery } from 'next-sanity';
// import { CouponCode } from './couponCodes';
import { sanityFetch } from '../live';

// TODO: FUNCTION SONNY SANGHA

// export const getActiveSaleByCouponCode = async (couponCode: CouponCode) => {
//     const ACTIVE_SALE_BY_COUPON_QUERY = defineQuery(`
//             *[
//                 _type == 'sale'
//                 && isActive == true
//                 && couponCode == $couponCode
//             ] | order(validFrom desc)[0]
//     `);

//     try {
//         const activeSale = await sanityFetch({
//             query: ACTIVE_SALE_BY_COUPON_QUERY,
//             params: {
//                 couponCode,
//             }
//         })

//         return activeSale ? activeSale.data : null
//     } catch (error) {
//         console.error("Error fetching active sale by coupon code:", error);
//         return null;
//     }
// };

export const getActiveSaleByCouponCode = async () => {
    const ACTIVE_SALE_BY_COUPON_QUERY = defineQuery(`
            *[
                _type == 'sale'
                && isActive == true
            ] | order(validFrom desc)
    `);

    try {
        const activeSale = await sanityFetch({
            query: ACTIVE_SALE_BY_COUPON_QUERY,
        })
        console.log("🚀 ~ getActiveSaleByCouponCode ~ activeSale:", activeSale)

        return activeSale ? activeSale.data : [];
    } catch (error) {
        console.error("Error fetching active sale by coupon code:", error);
        return null;
    }
};

