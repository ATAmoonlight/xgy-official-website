import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.background} aria-hidden="true" />
      <div className={styles.content}>
        <span className={styles.eyebrow}>新光扬电子设备有限公司官方网站</span>
        <h1 id="hero-title" className={styles.title}>
          专注电子元器件自动化设备研发与制造
        </h1>
        <p className={styles.subtitle}>
          新光扬电子设备有限公司致力于电子元器件自动化设备研发、制造与销售，产品涵盖自动成型设备、自动组装设备、自动焊接设备及非标自动化设备，为客户提供高效率、高稳定性的智能制造解决方案。
        </p>
        <div className={styles.actions}>
          <a href="#products" className={styles.buttonPrimary}>
            浏览产品
          </a>
          <a href="#about" className={styles.buttonSecondary}>
            关于我们
          </a>
        </div>
      </div>
    </section>
  );
}
