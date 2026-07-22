import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "新光扬电子设备有限公司｜DIP元件自动化设备制造商",
  description:
    "新光扬专注于电子元器件成型、剪脚、穿管、装配及非标自动化设备，为电子制造企业提供稳定、高效的智能制造解决方案。",
  keywords: [
    "电子自动化设备",
    "元件成型机",
    "IGBT成型机",
    "MOS成型机",
    "自动焊接设备",
    "自动组装设备",
    "非标自动化设备",
    "新光扬",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
