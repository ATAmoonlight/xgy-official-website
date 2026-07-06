import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.background} aria-hidden="true" />
      <div className={styles.content}>
        <span className={styles.eyebrow}>Xinguangyang Electronic Equipment</span>
        <h1 id="hero-title" className={styles.title}>
          Professional Electronic Equipment Manufacturer
        </h1>
        <p className={styles.subtitle}>
          Reliable Quality · Precision Manufacturing · Innovative Solutions
        </p>
        <div className={styles.actions}>
          <a href="#products" className={styles.buttonPrimary}>
            View Products
          </a>
          <a href="#about" className={styles.buttonSecondary}>
            About Us
          </a>
        </div>
      </div>
    </section>
  );
}
