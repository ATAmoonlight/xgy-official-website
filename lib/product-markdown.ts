import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import {
  classifyProduct,
  compareProductModels,
  type ProductCategoryId,
} from "@/lib/product-categories";

const PRODUCTS_DIRECTORY = path.join(process.cwd(), "public", "products");
const IMAGE_EXTENSION_PATTERN = /\.(?:jpe?g|png|webp)$/i;

export type ProductParameter = {
  name: string;
  value: string;
};

export type ProductImages = {
  cover?: string;
  details: string[];
  components: string[];
};

export type ProductDetailData = {
  status: "ready";
  folderName: string;
  slug: string;
  model: string;
  name: string;
  displayName: string;
  categoryId: ProductCategoryId;
  category: string;
  categoryWasFallback: boolean;
  hasRequiredIdentity: boolean;
  parameters: ProductParameter[];
  features: string[];
  images: ProductImages;
};

export type ProductUnavailableData = {
  status: "missing-markdown";
  folderName: string;
  slug: string;
  model: string;
};

export type ProductPageData = ProductDetailData | ProductUnavailableData;

function sortFileNames(fileNames: string[]) {
  return [...fileNames].sort((first, second) =>
    first.localeCompare(second, "zh-CN", {
      numeric: true,
      sensitivity: "case",
    }),
  );
}

async function getProductFolders() {
  const entries = await readdir(PRODUCTS_DIRECTORY, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((first, second) =>
      first.localeCompare(second, "zh-CN", { numeric: true }),
    );
}

export async function getAllProductSlugs() {
  const folders = await getProductFolders();

  return folders.map((folderName) => folderName.toLowerCase());
}

async function findProductFolder(slug: string) {
  const folders = await getProductFolders();
  const normalizedSlug = slug.toLocaleLowerCase("en-US");

  return folders.find(
    (folderName) => folderName.toLocaleLowerCase("en-US") === normalizedSlug,
  );
}

function parseMarkdownSections(markdown: string) {
  const sections = new Map<string, string[]>();
  let currentSection: string | undefined;

  for (const line of markdown.replace(/\r\n?/g, "\n").split("\n")) {
    const heading = line.match(/^##\s+(.+?)\s*$/);

    if (heading) {
      currentSection = heading[1];
      sections.set(currentSection, []);
      continue;
    }

    if (currentSection) {
      sections.get(currentSection)?.push(line);
    }
  }

  return sections;
}

function getFirstSectionValue(lines: string[] | undefined) {
  return lines?.map((line) => line.trim()).find(Boolean);
}

function formatInlineMarkdown(value: string) {
  return value.replace(/\$([^$]+)\$/g, (_match, expression: string) =>
    expression
      .replace(/\\rightarrow/g, "→")
      .replace(/\\mathrm\{([^}]+)\}/g, "$1")
      .replace(/\^\{\*\}/g, "×"),
  );
}

function parseParameters(lines: string[] | undefined) {
  if (!lines) {
    return [];
  }

  const rows = lines
    .map((line) => line.trim())
    .filter((line) => line.startsWith("|") && line.endsWith("|"))
    .map((line) =>
      line
        .slice(1, -1)
        .split("|")
        .map((cell) => cell.trim()),
    )
    .filter(
      (cells) =>
        cells.length >= 2 &&
        !cells.every((cell) => /^:?-{3,}:?$/.test(cell)),
    );

  if (rows[0]?.[0] === "参数" && rows[0]?.[1] === "内容") {
    rows.shift();
  }

  return rows.map(([name, ...values]) => ({
    name: formatInlineMarkdown(name),
    value: formatInlineMarkdown(values.join(" | ")),
  }));
}

function parseFeatures(lines: string[] | undefined) {
  if (!lines) {
    return [];
  }

  const features: string[] = [];

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      continue;
    }

    const listItem = trimmedLine.match(/^(?:[-*+]|\d+[.)])\s+(.+)$/);

    if (listItem) {
      features.push(formatInlineMarkdown(listItem[1]));
      continue;
    }

    if (features.length > 0) {
      features[features.length - 1] = `${features.at(-1)} ${formatInlineMarkdown(trimmedLine)}`;
    }
  }

  return features;
}

function getDisplayName(name: string, model: string) {
  const escapedModel = model.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const compoundModelPrefix = /^NS-\d+[A-Z]?(?:\s*\/\s*NS-\d+[A-Z]?)*\s*/i;
  const displayName = name
    .replace(compoundModelPrefix, "")
    .replace(new RegExp(`^${escapedModel}\\s*`, "i"), "")
    .replace(/^[/|｜:：\s-]+/, "");

  return displayName || name;
}

function toPublicImagePath(folderName: string, fileName: string) {
  return `/products/${folderName}/${fileName}`;
}

function scanProductImages(folderName: string, fileNames: string[]) {
  const imageFiles = sortFileNames(
    fileNames.filter((fileName) => IMAGE_EXTENSION_PATTERN.test(fileName)),
  );
  const lowerCaseCover = imageFiles.find((fileName) => /^cover\./.test(fileName));
  const upperCaseCover = imageFiles.find((fileName) => /^COVER\./.test(fileName));
  const coverFileName = lowerCaseCover ?? upperCaseCover;
  const detailFiles = imageFiles.filter((fileName) =>
    /^detail-\d{2}\.(?:jpe?g|png|webp)$/i.test(fileName),
  );
  const componentFiles = imageFiles.filter((fileName) =>
    /^component-\d{2}\.(?:jpe?g|png|webp)$/i.test(fileName),
  );

  return {
    cover: coverFileName
      ? toPublicImagePath(folderName, coverFileName)
      : undefined,
    details: detailFiles.map((fileName) =>
      toPublicImagePath(folderName, fileName),
    ),
    components: componentFiles.map((fileName) =>
      toPublicImagePath(folderName, fileName),
    ),
  } satisfies ProductImages;
}

export async function getProductPageData(
  slug: string,
): Promise<ProductPageData | null> {
  const folderName = await findProductFolder(slug);

  if (!folderName) {
    return null;
  }

  const productDirectory = path.join(PRODUCTS_DIRECTORY, folderName);
  const entries = await readdir(productDirectory, { withFileTypes: true });
  const fileNames = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name);

  if (!fileNames.includes("product.md")) {
    return {
      status: "missing-markdown",
      folderName,
      slug: folderName.toLowerCase(),
      model: folderName,
    };
  }

  const markdown = await readFile(
    path.join(productDirectory, "product.md"),
    "utf8",
  );
  const sections = parseMarkdownSections(markdown);
  const title = markdown.match(/^#\s+(.+?)\s*$/m)?.[1]?.trim();
  const parsedModel = getFirstSectionValue(sections.get("产品型号"));
  const model = parsedModel ?? folderName;
  const name = title ?? model;
  const features = parseFeatures(sections.get("产品特性"));
  const classification = classifyProduct(name, features);

  return {
    status: "ready",
    folderName,
    slug: folderName.toLowerCase(),
    model,
    name,
    displayName: getDisplayName(name, model),
    categoryId: classification.categoryId,
    category: classification.category.name,
    categoryWasFallback: classification.usedFallback,
    hasRequiredIdentity: Boolean(title && parsedModel),
    parameters: parseParameters(sections.get("设备参数")),
    features,
    images: scanProductImages(folderName, fileNames),
  };
}

export type ProductCatalog = {
  products: ProductDetailData[];
  missingMarkdown: string[];
  missingCover: string[];
  invalidIdentity: string[];
  fallbackCategory: string[];
};

export async function getProductCatalog(): Promise<ProductCatalog> {
  const folders = await getProductFolders();
  const entries = await Promise.all(
    folders.map((folderName) => getProductPageData(folderName.toLowerCase())),
  );
  const missingMarkdown: string[] = [];
  const missingCover: string[] = [];
  const invalidIdentity: string[] = [];
  const fallbackCategory: string[] = [];
  const products: ProductDetailData[] = [];

  for (const [index, entry] of entries.entries()) {
    const folderName = folders[index];

    if (!entry || entry.status === "missing-markdown") {
      missingMarkdown.push(folderName);
      continue;
    }

    if (!entry.hasRequiredIdentity) {
      invalidIdentity.push(folderName);
      continue;
    }

    if (!entry.images.cover) {
      missingCover.push(entry.model);
      continue;
    }

    if (entry.categoryWasFallback) {
      fallbackCategory.push(entry.model);
    }

    products.push(entry);
  }

  products.sort(compareProductModels);

  return {
    products,
    missingMarkdown,
    missingCover,
    invalidIdentity,
    fallbackCategory,
  };
}
