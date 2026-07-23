import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import {
  getContactInfo,
  getSeoContent,
} from "@/lib/company-content";
import { getSiteUrl } from "@/lib/site-config";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoContent();
  const siteUrl = getSiteUrl();

  return {
    metadataBase: new URL(siteUrl),
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "zh_CN",
      url: "/",
      siteName: "新光扬电子设备有限公司",
      title: seo.title,
      description: seo.description,
      images: [
        {
          url: "/hero/hero-factory.png",
          width: 1672,
          height: 941,
          alt: "新光扬电子元器件自动化设备生产车间",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: ["/hero/hero-factory.png"],
    },
    icons: {
      icon: "/logo/logo.png",
      shortcut: "/logo/logo.png",
      apple: "/logo/logo.png",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contact = await getContactInfo();
  const siteUrl = getSiteUrl();
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: contact.companyNames[0],
    alternateName: contact.companyNames[1],
    url: siteUrl,
    logo: `${siteUrl}/logo/logo.png`,
    email: contact.email,
    telephone: contact.phone,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: contact.phone,
      email: contact.email,
      contactType: "customer service",
      availableLanguage: "zh-CN",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address,
      addressLocality: "东莞市",
      addressRegion: "广东省",
      addressCountry: "CN",
    },
  };

  return (
    <html lang="zh-CN">
      <body>
        <JsonLd data={organizationJsonLd} />
        {children}
      </body>
    </html>
  );
}
