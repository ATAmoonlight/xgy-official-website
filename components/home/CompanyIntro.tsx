import styles from "./CompanyIntro.module.css";

export default function CompanyIntro() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.label}>About Us</span>
          <h2 id="about-title" className={styles.title}>
            Trusted Partner in Electronic Equipment Manufacturing
          </h2>
        </header>

        <div className={styles.body}>
          <div className={styles.text}>
            <p>
              Xinguangyang Electronic Equipment Co., Ltd. is a professional
              manufacturer specializing in the design, production, and delivery
              of high-quality electronic equipment. With years of industry
              experience, we serve clients across telecommunications, industrial
              automation, and consumer electronics sectors.
            </p>
            <p>
              Our commitment to precision engineering, rigorous quality
              standards, and responsive customer service has made us a reliable
              partner for businesses seeking dependable manufacturing solutions
              at scale.
            </p>
          </div>

          <div className={styles.stats} aria-label="Company highlights">
            <div className={styles.statCard}>
              <div className={styles.statValue}>15+</div>
              <div className={styles.statLabel}>Years of Experience</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>500+</div>
              <div className={styles.statLabel}>Global Clients Served</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>ISO</div>
              <div className={styles.statLabel}>Certified Quality Systems</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>24/7</div>
              <div className={styles.statLabel}>Technical Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
