import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getOrderByUserId = async (userId: string) => {
    if (!userId) {
        throw new Error("User ID is required");
    }
    const ORDER_BY_USER_ID_QUERY =
        defineQuery(`*[_type == 'order' && clerkUserId == $userId] | order(orderData desc){
        ...,products[]{
          ...,product->
        }
      }`);

    try {
        const order = await sanityFetch({
            query: ORDER_BY_USER_ID_QUERY,
            params: {
                userId,
            },
        });
        return order.data || [];
    } catch (error) {
        console.error('Error fetching order by user ID:', error);
        return [];
    }
};
