import HomeSectionHeading from "./HomeSectionHeading";
import styles from "./BusinessPhilosophy.module.css";

export default function BusinessPhilosophy() {
  return (
    <section className={styles.section} aria-labelledby="philosophy-title">
      <div className={styles.inner}>
        <HomeSectionHeading
          eyebrow="经营理念"
          title="把工作交给机器，把时间留给自己"
          titleId="philosophy-title"
          align="center"
          tone="inverse"
          className={styles.heading}
        />
        <p className={styles.values}>客户满意 · 科技创新 · 持续改善 · 品质至上</p>
      </div>
    </section>
  );
}
