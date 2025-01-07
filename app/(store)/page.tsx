// import BlackFridayBanner from "@/components/BlackFridayBanner";
import Container from '@/components/Container';
import DiscountBanner from '@/components/DiscountBanner';
import ProductsView from '@/components/ProductsView';
import { getAllCategories } from '@/sanity/lib/products/getAllCategories';
import { getAllProducts } from '@/sanity/lib/products/getAllProducts';

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return (
    <Container>
      {/* <BlackFridayBanner /> */}
      <DiscountBanner />
      <ProductsView
        products={products}
        title
        categories={categories}
      />
    </Container>
  );
}
