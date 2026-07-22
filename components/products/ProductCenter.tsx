"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ALL_PRODUCTS_CATEGORY_ID,
  getProductCategory,
  isProductFilterId,
  PRODUCT_CATEGORIES,
  type ProductCategoryId,
  type ProductFilterId,
} from "@/lib/product-categories";
import {
  getProductCenterPath,
  PRODUCT_BROWSING_STORAGE_KEYS,
} from "@/lib/product-browsing";
import ProductCard, { type ProductCardData } from "./ProductCard";
import styles from "./ProductCenter.module.css";

const PRODUCTS_PER_PAGE = 12;

export type CatalogProduct = ProductCardData & {
  categoryId: ProductCategoryId;
};

type ProductCenterProps = {
  products: CatalogProduct[];
  initialCategory: ProductFilterId;
};

type RestoreRequest = {
  scrollPosition: number;
  lastProduct: string | null;
};

export default function ProductCenter({
  products,
  initialCategory,
}: ProductCenterProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<ProductFilterId>(initialCategory);
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);
  const [restoreRequest, setRestoreRequest] =
    useState<RestoreRequest | null>(null);
  const listHeadingRef = useRef<HTMLDivElement>(null);
  const hasInitializedRef = useRef(false);

  const categorySummaries = useMemo(
    () =>
      PRODUCT_CATEGORIES.map((category) => {
        const categoryProducts = products.filter(
          (product) => product.categoryId === category.id,
        );

        return {
          ...category,
          count: categoryProducts.length,
          representative: categoryProducts[0],
        };
      }),
    [products],
  );

  const filteredProducts = useMemo(
    () =>
      selectedCategory === ALL_PRODUCTS_CATEGORY_ID
        ? products
        : products.filter(
            (product) => product.categoryId === selectedCategory,
          ),
    [products, selectedCategory],
  );
  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const selectedCategoryName =
    selectedCategory === ALL_PRODUCTS_CATEGORY_ID
      ? "全部产品"
      : getProductCategory(selectedCategory).name;

  useEffect(() => {
    if (hasInitializedRef.current) {
      return;
    }

    const storedCategory = sessionStorage.getItem(
      PRODUCT_BROWSING_STORAGE_KEYS.category,
    );
    const storedReturnPath = sessionStorage.getItem(
      PRODUCT_BROWSING_STORAGE_KEYS.returnPath,
    );
    const storedLastProduct = sessionStorage.getItem(
      PRODUCT_BROWSING_STORAGE_KEYS.lastProduct,
    );
    const canRestore = Boolean(
      storedReturnPath?.startsWith("/products") && storedLastProduct,
    );
    const restoredCategory =
      canRestore && storedCategory && isProductFilterId(storedCategory)
        ? storedCategory
        : initialCategory;
    const storedVisibleCount = Number.parseInt(
      sessionStorage.getItem(PRODUCT_BROWSING_STORAGE_KEYS.visibleCount) ?? "",
      10,
    );
    const restoredVisibleCount =
      canRestore && Number.isFinite(storedVisibleCount)
        ? Math.max(PRODUCTS_PER_PAGE, storedVisibleCount)
        : PRODUCTS_PER_PAGE;
    const storedScrollPosition = Number.parseFloat(
      sessionStorage.getItem(PRODUCT_BROWSING_STORAGE_KEYS.scrollPosition) ??
        "",
    );

    const initializationFrame = window.requestAnimationFrame(() => {
      if (hasInitializedRef.current) {
        return;
      }

      hasInitializedRef.current = true;
      setSelectedCategory(restoredCategory);
      setVisibleCount(restoredVisibleCount);

      if (canRestore) {
        setRestoreRequest({
          scrollPosition: storedScrollPosition,
          lastProduct: storedLastProduct,
        });
        sessionStorage.removeItem(PRODUCT_BROWSING_STORAGE_KEYS.lastProduct);
        sessionStorage.removeItem(PRODUCT_BROWSING_STORAGE_KEYS.returnPath);
      }
    });

    return () => window.cancelAnimationFrame(initializationFrame);
  }, [initialCategory]);

  useEffect(() => {
    if (!restoreRequest) {
      return;
    }

    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        const maxScroll = Math.max(
          0,
          document.documentElement.scrollHeight - window.innerHeight,
        );
        const hasValidScrollPosition =
          Number.isFinite(restoreRequest.scrollPosition) &&
          restoreRequest.scrollPosition >= 0 &&
          restoreRequest.scrollPosition <= maxScroll + 120;

        if (hasValidScrollPosition) {
          window.scrollTo({ top: restoreRequest.scrollPosition, behavior: "auto" });
        } else if (restoreRequest.lastProduct) {
          document
            .getElementById(`product-${restoreRequest.lastProduct}`)
            ?.scrollIntoView({ block: "center", behavior: "auto" });
        }

        setRestoreRequest(null);
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [restoreRequest, selectedCategory, visibleProducts.length]);

  function selectCategory(categoryId: ProductFilterId) {
    setSelectedCategory(categoryId);
    setVisibleCount(PRODUCTS_PER_PAGE);
    setRestoreRequest(null);
    sessionStorage.setItem(
      PRODUCT_BROWSING_STORAGE_KEYS.category,
      categoryId,
    );
    sessionStorage.setItem(
      PRODUCT_BROWSING_STORAGE_KEYS.visibleCount,
      String(PRODUCTS_PER_PAGE),
    );
    window.history.replaceState(
      window.history.state,
      "",
      getProductCenterPath(categoryId),
    );

    window.requestAnimationFrame(() => {
      listHeadingRef.current?.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    });
  }

  function loadMore() {
    const nextVisibleCount = Math.min(
      visibleCount + PRODUCTS_PER_PAGE,
      filteredProducts.length,
    );

    setVisibleCount(nextVisibleCount);
    sessionStorage.setItem(
      PRODUCT_BROWSING_STORAGE_KEYS.visibleCount,
      String(nextVisibleCount),
    );
  }

  return (
    <>
      <section className={styles.hero} aria-labelledby="products-page-title">
        <div className={styles.inner}>
          <p className={styles.eyebrow}>PRODUCT CENTER</p>
          <h1 id="products-page-title" className={styles.pageTitle}>
            产品中心
          </h1>
          <p className={styles.pageDescription}>
            覆盖电子元器件成型、剪脚、穿管、装配、焊接及生产辅助设备等多个产品方向。
          </p>
        </div>
      </section>

      <section className={styles.categorySection} aria-labelledby="category-title">
        <div className={styles.inner}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>PRODUCT CATEGORIES</p>
            <h2 id="category-title" className={styles.sectionTitle}>
              按设备方向浏览
            </h2>
          </div>

          <div className={styles.categoryGrid}>
            {categorySummaries.map((category) => {
              const isSelected = selectedCategory === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  className={`${styles.categoryCard} ${isSelected ? styles.categoryCardActive : ""}`}
                  aria-pressed={isSelected}
                  onClick={() => selectCategory(category.id)}
                >
                  <span className={styles.categoryContent}>
                    <span className={styles.categoryName}>{category.name}</span>
                    <span className={styles.categoryDescription}>
                      {category.description}
                    </span>
                    <span className={styles.categoryCount}>
                      {category.count} 款设备
                    </span>
                  </span>
                  <span className={styles.categoryImageWrap}>
                    {category.representative ? (
                      <Image
                        src={category.representative.image}
                        alt={`${category.name}代表设备${category.representative.model}`}
                        width={280}
                        height={210}
                        className={styles.categoryImage}
                      />
                    ) : (
                      <span className={styles.emptyCategoryImage}>
                        暂无在库产品
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.productsSection} aria-labelledby="product-list-title">
        <div className={styles.inner}>
          <div
            ref={listHeadingRef}
            className={styles.listHeading}
            id="product-list"
          >
            <div>
              <p className={styles.eyebrow}>EQUIPMENT LIST</p>
              <h2 id="product-list-title" className={styles.sectionTitle}>
                {selectedCategoryName}
              </h2>
              <p className={styles.resultCount}>
                共 {filteredProducts.length} 款设备
              </p>
            </div>

            <div
              className={styles.filterTabs}
              role="tablist"
              aria-label="产品分类筛选"
            >
              <button
                type="button"
                role="tab"
                aria-selected={
                  selectedCategory === ALL_PRODUCTS_CATEGORY_ID
                }
                className={`${styles.filterTab} ${selectedCategory === ALL_PRODUCTS_CATEGORY_ID ? styles.filterTabActive : ""}`}
                onClick={() => selectCategory(ALL_PRODUCTS_CATEGORY_ID)}
              >
                全部产品
              </button>
              {PRODUCT_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === category.id}
                  className={`${styles.filterTab} ${selectedCategory === category.id ? styles.filterTabActive : ""}`}
                  onClick={() => selectCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {visibleProducts.length > 0 ? (
            <div className={styles.productGrid} aria-live="polite">
              {visibleProducts.map((product) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  browsingState={{
                    category: selectedCategory,
                    visibleCount,
                  }}
                />
              ))}
            </div>
          ) : (
            <p className={styles.emptyResult}>该分类暂无可展示产品</p>
          )}

          {visibleCount < filteredProducts.length ? (
            <div className={styles.loadMoreWrap}>
              <button
                type="button"
                className={styles.loadMoreButton}
                onClick={loadMore}
              >
                加载更多
                <span aria-hidden="true">＋</span>
              </button>
              <p className={styles.loadStatus}>
                已显示 {visibleProducts.length} / {filteredProducts.length}
              </p>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
