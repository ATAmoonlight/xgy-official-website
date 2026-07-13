import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getProductBySlug, products } from "@/data/products";
import styles from "./page.module.css";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "产品详情｜新光扬电子设备有限公司",
    };
  }

  return {
    title: `${product.model} ${product.name}｜新光扬电子设备有限公司`,
    description: `${product.model} ${product.name}，${product.summary}`,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero} aria-labelledby="product-title">
          <div className={styles.inner}>
            <div className={styles.imagePanel}>
              <Image
                src={product.image}
                alt={`${product.model} ${product.name}`}
                width={760}
                height={570}
                className={styles.productImage}
                priority
              />
            </div>
            <div className={styles.content}>
              <Link href="/#products" className={styles.backLink}>
                返回产品中心
              </Link>
              <span className={styles.category}>{product.category}</span>
              <h1 id="product-title" className={styles.title}>
                {product.model}
              </h1>
              <p className={styles.name}>{product.name}</p>
              <p className={styles.summary}>{product.summary}</p>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>产品型号</span>
                  <span className={styles.infoValue}>{product.model}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>中文名称</span>
                  <span className={styles.infoValue}>{product.name}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>产品分类</span>
                  <span className={styles.infoValue}>{product.category}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
