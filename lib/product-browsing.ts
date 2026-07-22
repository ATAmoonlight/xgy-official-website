import type { ProductFilterId } from "@/lib/product-categories";

export const PRODUCT_BROWSING_STORAGE_KEYS = {
  category: "products-selected-category",
  visibleCount: "products-visible-count",
  scrollPosition: "products-scroll-position",
  lastProduct: "products-last-product",
  returnPath: "products-return-path",
} as const;

export function getProductAnchorId(slug: string) {
  return `product-${slug}`;
}

export function getProductCenterPath(
  categoryId: ProductFilterId,
  slug?: string,
) {
  const query = categoryId === "all" ? "" : `?category=${categoryId}`;
  const hash = slug ? `#${getProductAnchorId(slug)}` : "";

  return `/products${query}${hash}`;
}
