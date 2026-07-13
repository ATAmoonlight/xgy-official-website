export type Product = {
  slug: string;
  model: string;
  name: string;
  category: string;
  image: string;
  summary: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    slug: "ns-317",
    model: "NS-317",
    name: "自动散装立式元件成型机",
    category: "电子元件成型设备",
    image: "/products/NS-317.png",
    summary: "用于散装立式电子元件的自动成型加工，适合电子元器件批量生产场景。",
    featured: true,
  },
  {
    slug: "ns-800a",
    model: "NS-800A",
    name: "自动多管供料三极管成型机",
    category: "电子元件成型设备",
    image: "/products/NS-800A.png",
    summary: "面向三极管等管装元件的自动供料与成型加工设备。",
    featured: true,
  },
  {
    slug: "ns-800b",
    model: "NS-800B",
    name: "自动散装 MOS 管成型机",
    category: "电子元件成型设备",
    image: "/products/NS-800B.png",
    summary: "用于散装 MOS 管元件的自动化成型加工，提升元件处理效率。",
    featured: true,
  },
  {
    slug: "ns-806a",
    model: "NS-806A",
    name: "自动管装气动式 IGBT 成型机",
    category: "电子元件成型设备",
    image: "/products/NS-806A.png",
    summary: "用于 IGBT 元件自动成型加工，适用于新能源、汽车电子及电力电子相关生产场景。",
    featured: true,
  },
  {
    slug: "ns-810",
    model: "NS-810",
    name: "自动散装桥堆成型机",
    category: "电子元件成型设备",
    image: "/products/NS-810.png",
    summary: "用于散装桥堆元件自动成型，适合电源及电力电子类产品生产。",
    featured: true,
  },
  {
    slug: "ns-850",
    model: "NS-850",
    name: "元件和端子自动组装机",
    category: "自动组装设备",
    image: "/products/NS-850.jpg",
    summary: "用于电子元件与端子的自动组装及焊接工艺，覆盖自动组装设备应用需求。",
    featured: true,
  },
  {
    slug: "ns-860",
    model: "NS-860",
    name: "电阻保险丝穿管成型机",
    category: "保险丝加工设备",
    image: "/products/NS-860（2）.png",
    summary: "用于电阻、保险丝等元器件的自动穿管与成型加工。",
    featured: true,
  },
  {
    slug: "ns-865",
    model: "NS-865",
    name: "方形物料自动穿套热缩管剪脚成型机",
    category: "自动组装设备",
    image: "/products/NS-865.png",
    summary: "面向方形物料的自动穿套热缩管、剪脚与成型加工设备。",
    featured: true,
  },
  {
    slug: "ns-800t",
    model: "NS-800T",
    name: "管装三极管成型机",
    category: "电子元件成型设备",
    image: "/products/NS-800T.png",
    summary: "用于管装三极管元件成型加工。",
  },
  {
    slug: "ns-806",
    model: "NS-806",
    name: "管装三极管成型机",
    category: "电子元件成型设备",
    image: "/products/NS-806.png",
    summary: "用于管装三极管元件成型加工。",
  },
  {
    slug: "ns-807",
    model: "NS-807",
    name: "管装 MOS 成型装管机",
    category: "电子元件成型设备",
    image: "/products/NS-807.png",
    summary: "用于 MOS 管元件成型及装管加工。",
  },
  {
    slug: "ns-816",
    model: "NS-816",
    name: "自动散装三极管成型装管机",
    category: "电子元件成型设备",
    image: "/products/NS-816.png",
    summary: "用于散装三极管自动成型与装管加工。",
  },
  {
    slug: "ns-830",
    model: "NS-830",
    name: "单边带式零件穿管成型机",
    category: "电子元件成型设备",
    image: "/products/NS-830.jpg",
    summary: "用于单边带式零件的穿管与成型加工。",
  },
];

export const featuredProducts = products.filter((product) => product.featured);

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
