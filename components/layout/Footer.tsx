import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
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
        </div>
        <div className={styles.companyBlock}>
          <h2 className={styles.footerHeading}>企业信息</h2>
          <p>深圳市新光扬电子设备有限公司</p>
          <p>东莞新光扬自动化设备有限公司</p>
        </div>
        <div className={styles.contactBlock}>
          <h2 className={styles.footerHeading}>联系我们</h2>
          <p>联系方式待补充</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <p className={styles.copyright}>
          &copy; 2026 新光扬电子设备有限公司 版权所有
        </p>
      </div>
    </footer>
  );
}
