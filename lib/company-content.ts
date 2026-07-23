import { access, readFile } from "node:fs/promises";
import path from "node:path";

const DEFAULT_SEO = {
  title: "深圳市新光扬电子设备有限公司｜电子元器件自动化设备制造商",
  description:
    "深圳市新光扬电子设备有限公司专注电子元器件自动化设备研发与制造，产品涵盖电子元件成型、剪脚、穿管、装配、焊接及非标自动化设备，为电子制造企业提供稳定可靠的智能制造解决方案。",
  keywords: [
    "电子元件成型机",
    "电子元器件自动化设备",
    "剪脚机",
    "穿管机",
    "自动装配设备",
    "非标自动化",
    "PCBA自动化设备",
    "深圳自动化设备厂家",
    "东莞自动化设备",
    "电子制造自动化",
  ],
} as const;

export type CompanyStat = {
  value: string;
  label: string;
};

export type ContactInfo = {
  companyNames: string[];
  phone: string;
  email: string;
  address: string;
  workTime?: string;
  icp?: string;
  wechatQrCode?: string;
};

export type SeoContent = {
  title: string;
  description: string;
  keywords: string[];
};

type CompanyDocName =
  | "company-facts"
  | "contact-info"
  | "website-content"
  | "partner-list"
  | "seo";

const DOC_PATHS: Record<CompanyDocName, readonly [string, string]> = {
  "company-facts": [
    path.join(process.cwd(), "docs", "company-facts.md"),
    path.join(process.cwd(), "docs", "company-facts.md.txt"),
  ],
  "contact-info": [
    path.join(process.cwd(), "docs", "contact-info.md"),
    path.join(process.cwd(), "docs", "contact-info.md.txt"),
  ],
  "website-content": [
    path.join(process.cwd(), "docs", "website-content.md"),
    path.join(process.cwd(), "docs", "website-content.md.txt"),
  ],
  "partner-list": [
    path.join(process.cwd(), "docs", "partner-list.md"),
    path.join(process.cwd(), "docs", "partner-list.md.txt"),
  ],
  seo: [
    path.join(process.cwd(), "docs", "seo.md"),
    path.join(process.cwd(), "docs", "seo.md.txt"),
  ],
};

async function readDoc(baseName: CompanyDocName) {
  const candidates = DOC_PATHS[baseName];

  for (const candidate of candidates) {
    try {
      return await readFile(candidate, "utf8");
    } catch {
      // Continue to the compatible filename.
    }
  }

  return "";
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getSection(markdown: string, heading: string) {
  const match = markdown.match(
    new RegExp(
      `^##\\s+${escapeRegExp(heading)}\\s*$([\\s\\S]*?)(?=^##\\s+|(?![\\s\\S]))`,
      "m",
    ),
  );

  return match?.[1]?.trim() ?? "";
}

function getSectionLines(markdown: string, heading: string) {
  return getSection(markdown, heading)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && line !== "---" && !line.startsWith("#"));
}

function firstValue(markdown: string, heading: string) {
  return getSectionLines(markdown, heading)[0] ?? "";
}

function findInlineField(markdown: string, field: string) {
  const match = markdown.match(
    new RegExp(`^${escapeRegExp(field)}[：:]\\s*(.+)$`, "im"),
  );
  return match?.[1]?.trim() ?? "";
}

function splitKeywords(value: string) {
  return value
    .split(/[,，、\n]/)
    .map((keyword) => keyword.trim().replace(/^[-*]\s*/, ""))
    .filter(Boolean);
}

async function findWechatQrCode() {
  const candidates = [
    {
      filePath: path.join(
        process.cwd(),
        "public",
        "qrcode",
        "wechat.jpg",
      ),
      publicPath: "/qrcode/wechat.jpg",
    },
    {
      filePath: path.join(
        process.cwd(),
        "public",
        "qrcode",
        "wechat.png",
      ),
      publicPath: "/qrcode/wechat.png",
    },
    {
      filePath: path.join(
        process.cwd(),
        "public",
        "qrcode",
        "wechat.webp",
      ),
      publicPath: "/qrcode/wechat.webp",
    },
  ];

  for (const candidate of candidates) {
    try {
      await access(candidate.filePath);
      return candidate.publicPath;
    } catch {
      // Continue until an actual file is found.
    }
  }

  return undefined;
}

export async function getCompanyStats(): Promise<CompanyStat[]> {
  const facts = await readDoc("company-facts");
  const founded = facts.match(/创立于(\d{4})年/)?.[1];
  const bases = /深圳、东莞(?:两个|2个)制造基地/.test(facts) ? "2" : undefined;
  const productionSpace = facts.match(/生产空间约(\d+)\s*平方米/)?.[1];
  const annualOutput = facts.match(/年产值约(\d+)\s*万元/)?.[1];

  return [
    founded ? { value: founded, label: "创立年份" } : undefined,
    bases ? { value: bases, label: "深圳、东莞制造基地" } : undefined,
    productionSpace
      ? { value: `${productionSpace}㎡`, label: "东莞制造基地生产空间" }
      : undefined,
    annualOutput
      ? { value: `${annualOutput}万`, label: "年产值" }
      : undefined,
  ].filter((stat): stat is CompanyStat => stat !== undefined);
}

export async function getContactInfo(): Promise<ContactInfo> {
  const [contact, facts, seo] = await Promise.all([
    readDoc("contact-info"),
    readDoc("company-facts"),
    readDoc("seo"),
  ]);
  const contactNames = getSectionLines(contact, "公司名称");
  const officialShenzhenName =
    facts.match(/深圳市新光扬电子设备有限公司/)?.[0] ??
    "深圳市新光扬电子设备有限公司";
  const dongguanName =
    contactNames.find((name) => name.includes("东莞")) ??
    "东莞新光扬自动化设备有限公司";
  const workTimeLines = getSectionLines(contact, "工作时间");
  const icp =
    [contact, seo]
      .join("\n")
      .match(/[^\n]*ICP备[^\n]*/)?.[0]
      ?.replace(/^[-*\s]+/, "")
      .trim() || undefined;

  return {
    companyNames: [officialShenzhenName, dongguanName],
    phone: firstValue(contact, "联系电话"),
    email: firstValue(contact, "联系邮箱"),
    address: firstValue(contact, "地址"),
    workTime: workTimeLines.length
      ? workTimeLines.join(" ")
      : undefined,
    icp,
    wechatQrCode: await findWechatQrCode(),
  };
}

export async function getSeoContent(): Promise<SeoContent> {
  const seo = await readDoc("seo");
  const title =
    firstValue(seo, "Title") ||
    firstValue(seo, "标题") ||
    findInlineField(seo, "Title") ||
    DEFAULT_SEO.title;
  const description =
    firstValue(seo, "Description") ||
    firstValue(seo, "描述") ||
    findInlineField(seo, "Description") ||
    DEFAULT_SEO.description;
  const keywordSource =
    getSection(seo, "Keywords") ||
    getSection(seo, "关键词") ||
    findInlineField(seo, "Keywords");
  const keywords = splitKeywords(keywordSource);

  return {
    title,
    description,
    keywords: keywords.length ? keywords : [...DEFAULT_SEO.keywords],
  };
}

export async function getCompanyIntroduction() {
  const websiteContent = await readDoc("website-content");
  const productSource = await readFile(
    path.join(process.cwd(), "docs", "products-source.md"),
    "utf8",
  );
  const source = websiteContent.trim() || productSource;
  const companyProfile =
    source.match(
      /^##\s+(?:COMPANY PROFILE\s*)?公司介绍\s*$([\s\S]*?)(?=^##\s+|(?![\s\S]))/m,
    )?.[1] ?? source;
  const paragraphs = companyProfile
    .split(/\r?\n\s*\r?\n/)
    .map((paragraph) => paragraph.replace(/\r?\n/g, " ").trim())
    .filter(
      (paragraph) =>
        paragraph &&
        !paragraph.startsWith("#") &&
        !paragraph.startsWith("![") &&
        !paragraph.startsWith("<"),
    );

  return paragraphs.slice(0, 2);
}
