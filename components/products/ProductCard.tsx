"use client";

import Image from "next/image";
import Link from "next/link";
import type { ProductFilterId } from "@/lib/product-categories";
import {
  getProductAnchorId,
  PRODUCT_BROWSING_STORAGE_KEYS,
} from "@/lib/product-browsing";
import { getProductImageStyle } from "@/lib/product-image-config";
import styles from "./ProductCard.module.css";

export type ProductCardData = {
  slug: string;
  model: string;
  displayName: string;
  category: string;
  image: string;
};

type ProductCardProps = {
  product: ProductCardData;
  variant?: "default" | "featured";
  browsingState?: {
    category: ProductFilterId;
    visibleCount: number;
  };
};

export default function ProductCard({
  product,
  variant = "default",
  browsingState,
}: ProductCardProps) {
  function rememberBrowsingState() {
    if (!browsingState) {
      return;
    }

    const returnPath = `${window.location.pathname}${window.location.search}`;

    sessionStorage.setItem(
      PRODUCT_BROWSING_STORAGE_KEYS.category,
      browsingState.category,
    );
    sessionStorage.setItem(
      PRODUCT_BROWSING_STORAGE_KEYS.visibleCount,
      String(browsingState.visibleCount),
    );
    sessionStorage.setItem(
      PRODUCT_BROWSING_STORAGE_KEYS.scrollPosition,
      String(window.scrollY),
    );
    sessionStorage.setItem(
      PRODUCT_BROWSING_STORAGE_KEYS.lastProduct,
      product.slug,
    );
    sessionStorage.setItem(
      PRODUCT_BROWSING_STORAGE_KEYS.returnPath,
      returnPath,
    );
  }

  return (
    <article
      id={getProductAnchorId(product.slug)}
      className={`${styles.cardShell} ${variant === "featured" ? styles.featuredCard : ""}`}
    >
      <Link
        href={`/products/${product.slug}`}
        className={styles.card}
        aria-label={`了解${product.model} ${product.displayName}设备详情`}
        onClick={rememberBrowsingState}
      >
        <div className={styles.imageWrap}>
          <Image
            src={product.image}
            alt={`${product.model} ${product.displayName}产品主图`}
            width={720}
            height={540}
            className={styles.image}
            style={getProductImageStyle(product.model, "list")}
            sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) 50vw, (max-width: 1240px) 33vw, 25vw"
          />
        </div>
        <div className={styles.body}>
          <span className={styles.category}>{product.category}</span>
          <p className={styles.model}>{product.model}</p>
          <h3 className={styles.name}>{product.displayName}</h3>
          <span className={styles.more}>
            了解设备详情
            <span className={styles.arrow} aria-hidden="true">
              →
            </span>
          </span>
        </div>
      </Link>
    </article>
  );
}
