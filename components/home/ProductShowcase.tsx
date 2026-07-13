import Image from "next/image";
import Link from "next/link";
import { featuredProducts } from "@/data/products";
import styles from "./ProductShowcase.module.css";

export default function ProductShowcase() {
  return (
    <section
      id="products"
      className={styles.section}
      aria-labelledby="products-title"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.label}>产品中心</span>
          <h2 id="products-title" className={styles.title}>
            代表设备展示
          </h2>
          <p className={styles.description}>
            以下产品均来自新光扬现有产品资料与项目真实图片，覆盖电子元件成型设备、自动组装设备及保险丝加工设备等核心产品方向。
          </p>
        </header>

        <div className={styles.grid}>
          {featuredProducts.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className={styles.card}
              aria-label={`查看${product.model} ${product.name}详情`}
            >
              <div className={styles.imageWrap}>
                <Image
                  src={product.image}
                  alt={`${product.model} ${product.name}`}
                  width={560}
                  height={420}
                  className={styles.image}
                  sizes="(max-width: 560px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className={styles.cardBody}>
                <span className={styles.category}>{product.category}</span>
                <h3 className={styles.model}>{product.model}</h3>
                <p className={styles.name}>{product.name}</p>
                <span className={styles.more}>查看产品详情</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
