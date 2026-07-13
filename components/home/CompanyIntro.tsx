import styles from "./CompanyIntro.module.css";

export default function CompanyIntro() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.label}>关于新光扬</span>
          <h2 id="about-title" className={styles.title}>
            电子元器件自动化设备专业制造商
          </h2>
        </header>

        <div className={styles.body}>
          <div className={styles.text}>
            <p>
              新光扬电子设备有限公司是一家专注于电子元器件自动化设备研发、制造、销售及技术服务的专业企业，长期深耕电子制造自动化领域，致力于为客户提供高品质、高效率、高稳定性的自动化设备及智能制造解决方案。
            </p>
            <p>
              公司产品体系涵盖电子元器件自动成型、自动组装、自动焊接、自动穿管及非标自动化设备，广泛应用于消费电子、汽车电子、新能源、工业控制、智能家电等行业，为电子制造企业提供稳定可靠的自动化生产支持。
            </p>
          </div>

          <div className={styles.stats} aria-label="主营业务">
            <div className={styles.statCard}>
              <div className={styles.statValue}>成型</div>
              <div className={styles.statLabel}>电子元件自动成型设备</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>组装</div>
              <div className={styles.statLabel}>自动组装与焊接设备</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>穿管</div>
              <div className={styles.statLabel}>自动穿管及保险丝设备</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>定制</div>
              <div className={styles.statLabel}>非标自动化解决方案</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
