import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <p className={styles.companyName}>
            Xinguangyang Electronic Equipment Co., Ltd.
          </p>
          <p className={styles.tagline}>
            Professional Electronic Equipment Manufacturer
          </p>
        </div>
        <p className={styles.copyright}>
          &copy; {year} Xinguangyang Electronic Equipment Co., Ltd. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
