export const PRODUCT_CATEGORIES = [
  {
    id: "forming",
    name: "元件成型设备",
    description: "电子元器件自动送料、整型、弯脚及成型设备",
  },
  {
    id: "cutting",
    name: "元件剪脚设备",
    description: "电容、LED、IC、PCB及带式元件剪脚设备",
  },
  {
    id: "tubing",
    name: "穿管与热缩设备",
    description: "电阻、保险丝、电容及方形物料穿套管和热缩设备",
  },
  {
    id: "assembly",
    name: "自动组装与焊接设备",
    description: "元件、端子及五金件自动装配、焊接和摆盘设备",
  },
  {
    id: "pcb-support",
    name: "PCB分板及生产辅助设备",
    description: "PCB分板、清洗、炉温测试及防错料辅助设备",
  },
  {
    id: "custom",
    name: "非标自动化设备",
    description: "根据客户产品与生产工艺定制自动化方案",
  },
] as const;

export type ProductCategoryId = (typeof PRODUCT_CATEGORIES)[number]["id"];

export const ALL_PRODUCTS_CATEGORY_ID = "all" as const;
export type ProductFilterId =
  | typeof ALL_PRODUCTS_CATEGORY_ID
  | ProductCategoryId;

type ClassificationRule = {
  categoryId: ProductCategoryId;
  patterns: RegExp[];
};

// 规则按核心功能优先级排列。穿管、组装等复合设备先于通用“成型”关键词。
const PRODUCT_CLASSIFICATION_RULES: ClassificationRule[] = [
  {
    categoryId: "custom",
    patterns: [/非标定制/i, /非标自动化/i, /非标准自动化/i],
  },
  {
    categoryId: "tubing",
    patterns: [/穿管/i, /套管/i, /热缩管/i, /铁氟龙管/i, /穿套/i],
  },
  {
    categoryId: "assembly",
    patterns: [/自动组装/i, /组装机/i, /焊接机/i, /点胶/i, /摆盘/i, /套磁环/i, /装配/i],
  },
  {
    categoryId: "pcb-support",
    patterns: [/分板机/i, /刷板机/i, /炉温测试仪/i, /条码扫描比对器/i, /PCB辅助设备/i],
  },
  {
    categoryId: "cutting",
    patterns: [/选择性剪脚/i, /剪脚机/i, /切脚机/i, /元件剪脚/i, /数码管剪脚/i, /电容剪脚/i],
  },
  {
    categoryId: "forming",
    patterns: [/成型机/i, /整型机/i, /弯脚/i, /K脚/i, /IC成型/i, /LED成型/i, /MOS成型/i, /IGBT成型/i, /三极管成型/i, /电容成型/i, /桥堆成型/i, /晶振.*成型/i],
  },
];

export function getProductCategory(categoryId: ProductCategoryId) {
  return PRODUCT_CATEGORIES.find((category) => category.id === categoryId)!;
}

export function isProductFilterId(value: string): value is ProductFilterId {
  return (
    value === ALL_PRODUCTS_CATEGORY_ID ||
    PRODUCT_CATEGORIES.some((category) => category.id === value)
  );
}

export function classifyProduct(name: string, features: string[]) {
  const sourceText = [name, ...features].join("\n");
  const matchedRule = PRODUCT_CLASSIFICATION_RULES.find((rule) =>
    rule.patterns.some((pattern) => pattern.test(sourceText)),
  );
  const categoryId = matchedRule?.categoryId ?? "custom";

  return {
    categoryId,
    category: getProductCategory(categoryId),
    usedFallback: !matchedRule,
  };
}

const PRODUCT_MODEL_COLLATOR = new Intl.Collator("zh-CN", {
  numeric: true,
  sensitivity: "base",
});

export function compareProductModels(
  first: { model: string },
  second: { model: string },
) {
  return PRODUCT_MODEL_COLLATOR.compare(first.model, second.model);
}
