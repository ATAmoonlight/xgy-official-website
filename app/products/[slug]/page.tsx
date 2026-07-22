import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ProductBreadcrumb from "@/components/products/ProductBreadcrumb";
import {
  getAllProductSlugs,
  getProductCatalog,
  getProductPageData,
} from "@/lib/product-markdown";
import styles from "./page.module.css";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductPageData(slug);

  if (!product) {
    return {
      title: "产品详情｜新光扬电子设备有限公司",
    };
  }

  if (product.status === "missing-markdown") {
    return {
      title: `${product.model} 产品资料｜新光扬电子设备有限公司`,
    };
  }

  return {
    title: `${product.name}｜新光扬电子设备有限公司`,
    description: product.name,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductPageData(slug);

  if (!product) {
    notFound();
  }

  if (product.status === "missing-markdown") {
    return (
      <div className={styles.page}>
        <Navbar />
        <main className={styles.main}>
          <section className={styles.missingSection}>
            <div className={styles.missingCard}>
              <p className={styles.eyebrow}>{product.model}</p>
              <h1 className={styles.missingTitle}>产品资料暂未完善</h1>
              <Link href="/#products" className={styles.primaryButton}>
                返回产品中心
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  const hasGallery =
    product.images.details.length > 0 || product.images.components.length > 0;
  const catalog = await getProductCatalog();
  const categoryProducts = catalog.products.filter(
    (catalogProduct) => catalogProduct.categoryId === product.categoryId,
  );
  const navigationProducts =
    categoryProducts.length > 1 ? categoryProducts : catalog.products;
  const navigationIndex = navigationProducts.findIndex(
    (catalogProduct) => catalogProduct.slug === product.slug,
  );
  const previousProduct =
    navigationIndex > 0 ? navigationProducts[navigationIndex - 1] : undefined;
  const nextProduct =
    navigationIndex >= 0 && navigationIndex < navigationProducts.length - 1
      ? navigationProducts[navigationIndex + 1]
      : undefined;
  const categoryIndex = categoryProducts.findIndex(
    (catalogProduct) => catalogProduct.slug === product.slug,
  );
  const relatedProducts =
    categoryIndex >= 0
      ? [
          ...categoryProducts.slice(categoryIndex + 1),
          ...categoryProducts.slice(0, categoryIndex),
        ].slice(0, 3)
      : categoryProducts
          .filter((catalogProduct) => catalogProduct.slug !== product.slug)
          .slice(0, 3);

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero} aria-labelledby="product-title">
          <div className={styles.heroOuter}>
            <ProductBreadcrumb
              currentSlug={product.slug}
              currentName={product.displayName}
              categoryId={product.categoryId}
              categoryName={product.category}
            />
            <div className={styles.heroInner}>
              <div className={styles.imagePanel}>
                {product.images.cover ? (
                  <Image
                    src={product.images.cover}
                    alt={`${product.name}主图`}
                    width={760}
                    height={570}
                    className={styles.productImage}
                    priority
                  />
                ) : (
                  <p className={styles.imageFallback}>产品主图暂未提供</p>
                )}
              </div>

              <div className={styles.heroContent}>
                <span className={styles.category}>{product.category}</span>
                <p className={styles.model}>产品型号 · {product.model}</p>
                <h1 id="product-title" className={styles.title}>
                  {product.name}
                </h1>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="parameters-title">
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>PRODUCT PARAMETERS</p>
              <h2 id="parameters-title" className={styles.sectionTitle}>
                设备参数
              </h2>
            </div>

            {product.parameters.length > 0 ? (
              <div className={styles.tableFrame}>
                <table className={styles.parameterTable}>
                  <thead>
                    <tr>
                      <th scope="col">参数</th>
                      <th scope="col">内容</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.parameters.map((parameter, index) => (
                      <tr key={`${parameter.name}-${index}`}>
                        <th scope="row">{parameter.name}</th>
                        <td>{parameter.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className={styles.emptyState}>暂无公开参数</p>
            )}
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.mutedSection}`}
          aria-labelledby="features-title"
        >
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>PRODUCT FEATURES</p>
              <h2 id="features-title" className={styles.sectionTitle}>
                产品特性
              </h2>
            </div>

            {product.features.length > 0 ? (
              <ol className={styles.featureList}>
                {product.features.map((feature, index) => (
                  <li key={index} className={styles.featureItem}>
                    <span className={styles.featureNumber} aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p>{feature}</p>
                  </li>
                ))}
              </ol>
            ) : (
              <p className={styles.emptyState}>暂无公开产品特性</p>
            )}
          </div>
        </section>

        {hasGallery ? (
          <section className={styles.section} aria-labelledby="gallery-title">
            <div className={styles.sectionInner}>
              <div className={styles.sectionHeading}>
                <p className={styles.eyebrow}>PRODUCT IMAGES</p>
                <h2 id="gallery-title" className={styles.sectionTitle}>
                  产品图片
                </h2>
              </div>

              {product.images.details.length > 0 ? (
                <div className={styles.galleryGroup}>
                  <h3 className={styles.galleryTitle}>设备细节</h3>
                  <div className={styles.galleryGrid}>
                    {product.images.details.map((image, index) => (
                      <figure key={image} className={styles.galleryCard}>
                        <Image
                          src={image}
                          alt={`${product.name}设备细节图${index + 1}`}
                          width={900}
                          height={675}
                          className={styles.galleryImage}
                        />
                      </figure>
                    ))}
                  </div>
                </div>
              ) : null}

              {product.images.components.length > 0 ? (
                <div className={styles.galleryGroup}>
                  <h3 className={styles.galleryTitle}>加工元件</h3>
                  <div className={styles.galleryGrid}>
                    {product.images.components.map((image, index) => (
                      <figure key={image} className={styles.galleryCard}>
                        <Image
                          src={image}
                          alt={`${product.name}加工元件图${index + 1}`}
                          width={900}
                          height={675}
                          className={styles.galleryImage}
                        />
                      </figure>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        <section
          className={`${styles.section} ${styles.browseSection}`}
          aria-label="产品浏览导航"
        >
          <div className={styles.sectionInner}>
            {relatedProducts.length > 0 ? (
              <div className={styles.relatedBlock}>
                <div className={styles.sectionHeading}>
                  <p className={styles.eyebrow}>RELATED EQUIPMENT</p>
                  <h2
                    id="related-products-title"
                    className={styles.sectionTitle}
                  >
                    同类设备推荐
                  </h2>
                </div>
                <div className={styles.relatedGrid}>
                  {relatedProducts.map((relatedProduct) => (
                    <Link
                      key={relatedProduct.slug}
                      href={`/products/${relatedProduct.slug}`}
                      className={styles.relatedCard}
                    >
                      <div className={styles.relatedImageWrap}>
                        <Image
                          src={relatedProduct.images.cover!}
                          alt={`${relatedProduct.model} ${relatedProduct.displayName}产品主图`}
                          width={560}
                          height={420}
                          className={styles.relatedImage}
                          sizes="(max-width: 700px) 76vw, (max-width: 1000px) 45vw, 30vw"
                        />
                      </div>
                      <div className={styles.relatedBody}>
                        <span className={styles.relatedModel}>
                          {relatedProduct.model}
                        </span>
                        <h3>{relatedProduct.displayName}</h3>
                        <span className={styles.relatedMore}>
                          了解设备详情 <span aria-hidden="true">→</span>
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            {previousProduct || nextProduct ? (
              <nav className={styles.productPager} aria-label="相邻产品导航">
                {previousProduct ? (
                  <Link
                    href={`/products/${previousProduct.slug}`}
                    className={styles.pagerLink}
                  >
                    <span className={styles.pagerDirection}>← 上一款设备</span>
                    <span className={styles.pagerModel}>
                      {previousProduct.model}
                    </span>
                    <span className={styles.pagerName}>
                      {previousProduct.displayName}
                    </span>
                  </Link>
                ) : null}
                {nextProduct ? (
                  <Link
                    href={`/products/${nextProduct.slug}`}
                    className={`${styles.pagerLink} ${styles.nextPagerLink}`}
                  >
                    <span className={styles.pagerDirection}>下一款设备 →</span>
                    <span className={styles.pagerModel}>{nextProduct.model}</span>
                    <span className={styles.pagerName}>
                      {nextProduct.displayName}
                    </span>
                  </Link>
                ) : null}
              </nav>
            ) : null}
          </div>
        </section>

        <section className={styles.contactSection} aria-labelledby="contact-title">
          <div className={styles.contactInner}>
            <div>
              <p className={styles.contactEyebrow}>CONTACT US</p>
              <h2 id="contact-title" className={styles.contactTitle}>
                获取设备方案
              </h2>
              <p className={styles.contactText}>
                欢迎联系我们了解设备配置、适用物料及定制需求。
              </p>
            </div>
            <Link href="/#contact" className={styles.contactButton}>
              联系我们
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
