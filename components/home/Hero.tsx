import Image from "next/image";
import { getCompanyStats } from "@/lib/company-content";
import CompanyStats from "./CompanyStats";
import styles from "./Hero.module.css";

export default async function Hero() {
  const stats = await getCompanyStats();

  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-title">
      <Image
        src="/hero/hero-factory.png"
        alt="新光扬电子元器件自动化设备生产车间"
        fill
        priority
        sizes="100vw"
        className={styles.backgroundImage}
      />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.content}>
        <span className={styles.eyebrow}>
          DIP元件成型 · 剪脚 · 穿管 · 装配自动化设备
        </span>
        <h1 id="hero-title" className={styles.title}>
          <span className={styles.desktopTitle}>
            <span>专注电子元器件自动化设备</span>
            <span>研发与制造</span>
          </span>
          <span className={styles.mobileTitle}>
            <span>专注电子元器件自动化</span>
            <span>设备研发与制造</span>
          </span>
        </h1>
        <p className={styles.subtitle}>
          新光扬专注于电子元器件成型、剪脚、穿管、装配及非标自动化设备，为电子制造企业提供稳定、高效的智能制造解决方案。
        </p>
        <div className={styles.actions}>
          <a href="#products" className={styles.buttonPrimary}>
            浏览产品
          </a>
          <a href="#about" className={styles.buttonSecondary}>
            了解新光扬
          </a>
        </div>
      </div>
      {stats.length ? <CompanyStats stats={stats} /> : null}
    </section>
  );
}
