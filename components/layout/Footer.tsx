import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Image
            src="/logo/logo-white.png"
            alt="新光扬电子设备有限公司"
            width={177}
            height={100}
            className={styles.logoImage}
          />
          <p className={styles.companyName}>
            新光扬电子设备有限公司
          </p>
          <p className={styles.tagline}>
            专注电子元器件自动化设备研发与制造
          </p>
        </div>
        <p className={styles.copyright}>
          &copy; {year} 新光扬电子设备有限公司 版权所有
        </p>
      </div>
    </footer>
  );
}
