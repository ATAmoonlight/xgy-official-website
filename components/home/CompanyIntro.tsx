import { getCompanyIntroduction } from "@/lib/company-content";
import HomeSectionHeading from "./HomeSectionHeading";
import styles from "./CompanyIntro.module.css";

export default async function CompanyIntro() {
  const paragraphs = await getCompanyIntroduction();

  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <div className={styles.inner}>
        <HomeSectionHeading
          eyebrow="关于新光扬"
          title="PCBA智能制造整体解决方案制造商"
          titleId="about-title"
          size="large"
          className={styles.heading}
        />

        <div className={styles.body}>
          <div className={styles.text}>
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
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
