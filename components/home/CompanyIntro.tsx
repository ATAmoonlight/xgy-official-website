import styles from "./CompanyIntro.module.css";

export default function CompanyIntro() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.label}>关于新光扬</span>
          <h2 id="about-title" className={styles.title}>
            PCBA智能制造整体解决方案制造商
          </h2>
        </header>

        <div className={styles.body}>
          <div className={styles.text}>
            <p>
              深圳市新光扬电子设备有限公司创立于2012年，总部位于深圳宝安福永，下设深圳、东莞两家工厂，是一家集研发、生产、销售、服务于一体的PCBA智能制造整体解决方案制造商。
            </p>
            <p>
              公司专注于电子元器件成型、剪脚、穿管及装配自动化设备，持续配合客户的工艺需求改进设备，为客户节省人工、提高生产效率。
            </p>
          </div>

          <div className={styles.capabilities} aria-label="业务能力">
            <article className={styles.capabilityCard}>
              <span className={styles.cardIndex}>01</span>
              <h3>元件成型与剪脚</h3>
              <p>电子元器件自动成型、折弯及剪脚设备</p>
            </article>
            <article className={styles.capabilityCard}>
              <span className={styles.cardIndex}>02</span>
              <h3>穿管与热缩</h3>
              <p>电阻、保险丝、电容及方形物料穿套管设备</p>
            </article>
            <article className={styles.capabilityCard}>
              <span className={styles.cardIndex}>03</span>
              <h3>自动组装与焊接</h3>
              <p>元件、端子及五金件自动组装焊接设备</p>
            </article>
            <article className={styles.capabilityCard}>
              <span className={styles.cardIndex}>04</span>
              <h3>非标自动化</h3>
              <p>根据客户产品与生产工艺提供定制方案</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
