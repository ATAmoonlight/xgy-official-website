import Image from "next/image";
import Link from "next/link";
import { getContactInfo } from "@/lib/company-content";
import styles from "./Footer.module.css";

const QUICK_LINKS = [
  { label: "产品中心", href: "/products" },
  { label: "关于新光扬", href: "/#about" },
  { label: "制造能力", href: "/#manufacturing" },
  { label: "联系我们", href: "/#contact" },
] as const;

export default async function Footer() {
  const contact = await getContactInfo();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Image
            src="/logo/logo-white.png"
            alt="新光扬电子设备有限公司企业标志"
            width={200}
            height={100}
            className={styles.logoImage}
          />
          <p className={styles.tagline}>
            DIP元件成型、剪脚、穿管及装配自动化设备
          </p>
          <div className={styles.companyNames}>
            {contact.companyNames.map((name) => (
              <p key={name}>{name}</p>
            ))}
          </div>
        </div>

        <nav className={styles.quickLinks} aria-label="页脚快速导航">
          <h2 className={styles.footerHeading}>快速导航</h2>
          <div className={styles.linkList}>
            {QUICK_LINKS.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className={styles.contactBlock}>
          <h2 className={styles.footerHeading}>联系我们</h2>
          <a href={`tel:${contact.phone}`}>{contact.phone}</a>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <p>{contact.address}</p>
          {contact.workTime ? <p>{contact.workTime}</p> : null}
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; 2026 新光扬电子设备有限公司 版权所有</p>
        {contact.icp ? <p>{contact.icp}</p> : null}
      </div>
    </footer>
  );
}
