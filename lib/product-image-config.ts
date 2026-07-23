import type { CSSProperties } from "react";

export type ProductImageDisplayConfig = {
  listScale: number;
  detailScale: number;
  objectPosition: string;
  translateX: string;
  translateY: string;
};

export const DEFAULT_PRODUCT_IMAGE_CONFIG: ProductImageDisplayConfig = {
  listScale: 1,
  detailScale: 1,
  objectPosition: "center center",
  translateX: "0%",
  translateY: "0%",
};

export const productImageConfig = {
  "NS-300": {
    listScale: 1.35,
    detailScale: 1.45,
  },
  "NS-320": {
    listScale: 1.2,
    detailScale: 1.25,
  },
  "NS-330": {
    listScale: 1.3,
    detailScale: 1.4,
  },
} satisfies Record<string, Partial<ProductImageDisplayConfig>>;

type ProductImageCssProperties = CSSProperties & {
  "--product-image-scale": number;
  "--product-image-hover-scale": number;
  "--product-image-position": string;
  "--product-image-translate-x": string;
  "--product-image-translate-y": string;
};

export function getProductImageConfig(
  model: string,
): ProductImageDisplayConfig {
  return {
    ...DEFAULT_PRODUCT_IMAGE_CONFIG,
    ...productImageConfig[model as keyof typeof productImageConfig],
  };
}

export function getProductImageStyle(
  model: string,
  context: "list" | "detail",
): ProductImageCssProperties {
  const config = getProductImageConfig(model);
  const scale = context === "list" ? config.listScale : config.detailScale;

  return {
    "--product-image-scale": scale,
    "--product-image-hover-scale": Number((scale * 1.02).toFixed(4)),
    "--product-image-position": config.objectPosition,
    "--product-image-translate-x": config.translateX,
    "--product-image-translate-y": config.translateY,
  };
}
