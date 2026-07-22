import styles from "./BusinessPhilosophy.module.css";

export default function BusinessPhilosophy() {
  return (
    <section className={styles.section} aria-labelledby="philosophy-title">
      <div className={styles.inner}>
        <span className={styles.label}>经营理念</span>
        <h2 id="philosophy-title" className={styles.title}>
          把工作交给机器，把时间留给自己
        </h2>
        <p className={styles.values}>客户满意 · 科技创新 · 持续改善 · 品质至上</p>
      </div>
    </section>
  );
}
