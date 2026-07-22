"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import type { ProductCategoryId } from "@/lib/product-categories";
import {
  getProductCenterPath,
  PRODUCT_BROWSING_STORAGE_KEYS,
} from "@/lib/product-browsing";
import styles from "./ProductBreadcrumb.module.css";

type ProductBreadcrumbProps = {
  currentSlug: string;
  currentName: string;
  categoryId: ProductCategoryId;
  categoryName: string;
};

export default function ProductBreadcrumb({
  currentSlug,
  currentName,
  categoryId,
  categoryName,
}: ProductBreadcrumbProps) {
  const router = useRouter();
  const fallbackPath = getProductCenterPath(categoryId, currentSlug);

  function returnToProductCenter(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    const lastProduct = sessionStorage.getItem(
      PRODUCT_BROWSING_STORAGE_KEYS.lastProduct,
    );
    const returnPath = sessionStorage.getItem(
      PRODUCT_BROWSING_STORAGE_KEYS.returnPath,
    );
    const hasProductCenterHistory = Boolean(
      lastProduct === currentSlug &&
        returnPath?.startsWith("/products") &&
        window.history.length > 1,
    );

    if (hasProductCenterHistory) {
      router.back();
      return;
    }

    router.push(fallbackPath);
  }

  return (
    <nav className={styles.breadcrumb} aria-label="面包屑导航">
      <ol className={styles.list}>
        <li>
          <Link href="/">首页</Link>
        </li>
        <li aria-hidden="true" className={styles.separator}>
          /
        </li>
        <li>
          <a href={fallbackPath} onClick={returnToProductCenter}>
            产品中心
          </a>
        </li>
        <li aria-hidden="true" className={styles.separator}>
          /
        </li>
        <li>
          <Link href={getProductCenterPath(categoryId)}>{categoryName}</Link>
        </li>
        <li aria-hidden="true" className={styles.separator}>
          /
        </li>
        <li className={styles.current} aria-current="page" title={currentName}>
          {currentName}
        </li>
      </ol>
    </nav>
  );
}
