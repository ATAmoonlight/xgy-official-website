import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "新光扬电子设备有限公司｜电子元器件自动化设备制造商",
  description:
    "新光扬电子设备有限公司专注于电子元器件自动化设备研发与制造，产品涵盖元件成型设备、自动组装设备、自动焊接设备及非标自动化设备，为全球客户提供智能制造解决方案。",
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
    <html lang="zh-CN" className={`${geistSans.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
