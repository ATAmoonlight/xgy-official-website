import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ProductCenter, {
  type CatalogProduct,
} from "@/components/products/ProductCenter";
import {
  ALL_PRODUCTS_CATEGORY_ID,
  isProductFilterId,
} from "@/lib/product-categories";
import { getProductCatalog } from "@/lib/product-markdown";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "产品中心｜新光扬电子设备有限公司",
  description:
    "新光扬电子元器件成型、剪脚、穿管、装配、焊接及生产辅助设备产品中心。",
};

type ProductCenterPageProps = {
  searchParams: Promise<{
    category?: string | string[];
  }>;
};

export default async function ProductsPage({
  searchParams,
}: ProductCenterPageProps) {
  const params = await searchParams;
  const categoryParam = Array.isArray(params.category)
    ? params.category[0]
    : params.category;
  const initialCategory =
    categoryParam && isProductFilterId(categoryParam)
      ? categoryParam
      : ALL_PRODUCTS_CATEGORY_ID;
  const catalog = await getProductCatalog();
  const products: CatalogProduct[] = catalog.products.map((product) => ({
    slug: product.slug,
    model: product.model,
    displayName: product.displayName,
    categoryId: product.categoryId,
    category: product.category,
    image: product.images.cover!,
  }));

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <ProductCenter
          products={products}
          initialCategory={initialCategory}
        />
      </main>
      <Footer />
    </div>
  );
}
