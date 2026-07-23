import Link from "next/link";
import ProductCard from "@/components/products/ProductCard";
import { getProductCatalog } from "@/lib/product-markdown";
import HomeSectionHeading from "./HomeSectionHeading";
import styles from "./ProductShowcase.module.css";

const FEATURED_PRODUCT_SLUGS = [
  "ns-317",
  "ns-800b",
  "ns-806a",
  "ns-810",
  "ns-830",
  "ns-850",
  "ns-860",
  "ns-865",
] as const;

export default async function ProductShowcase() {
  const catalog = await getProductCatalog();
  const featuredProducts = FEATURED_PRODUCT_SLUGS.map((slug) =>
    catalog.products.find((product) => product.slug === slug),
  ).filter((product) => product !== undefined);

  return (
    <section
      id="products"
      className={styles.section}
      aria-labelledby="products-title"
    >
      <div className={styles.inner}>
        <HomeSectionHeading
          eyebrow="产品中心"
          title="代表设备展示"
          titleId="products-title"
          description="覆盖元器件成型、剪脚、穿管、组装、焊接及生产辅助设备等多个产品方向。"
          className={styles.heading}
        />

        <div className={styles.grid}>
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.slug}
              variant="featured"
              product={{
                slug: product.slug,
                model: product.model,
                displayName: product.displayName,
                category: product.category,
                image: product.images.cover!,
              }}
            />
          ))}
        </div>

        <div className={styles.allProductsWrap}>
          <Link href="/products" className={styles.allProductsLink}>
            查看全部产品
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
