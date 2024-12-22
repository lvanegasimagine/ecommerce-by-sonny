// import BlackFridayBanner from "@/components/BlackFridayBanner";
import DiscountBanner from '@/components/DiscountBanner';
import ProductsView from '@/components/ProductsView';
import { getAllCategories } from '@/sanity/lib/products/getAllCategories';
import { getAllProducts } from '@/sanity/lib/products/getAllProducts';

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return (
    <div>
      {/* <BlackFridayBanner /> */}
      <DiscountBanner />
      <div className="flex min-h-screen flex-col items-center justify-between bg-gray-100 p-4">
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}
