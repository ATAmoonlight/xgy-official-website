import styles from "./CoreAdvantages.module.css";

const ADVANTAGES = [
  {
    title: "Professional Team",
    description:
      "Experienced engineers and production specialists dedicated to delivering excellence at every stage of the manufacturing process.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Advanced Manufacturing",
    description:
      "State-of-the-art production lines and automated processes ensure consistent output, high throughput, and precision assembly.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 12v4M10 14h4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Strict Quality Control",
    description:
      "Multi-stage inspection and testing protocols guarantee that every product meets international quality and safety standards.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Fast Delivery",
    description:
      "Optimized supply chain management and flexible production scheduling enable rapid turnaround without compromising quality.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <rect x="1" y="3" width="15" height="13" rx="2" />
        <path d="M16 8h4l3 5v5h-7V8z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
] as const;

export default function CoreAdvantages() {
  return (
    <section
      id="products"
      className={styles.section}
      aria-labelledby="advantages-title"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.label}>Core Advantages</span>
          <span id="manufacturing" className={styles.anchor} aria-hidden="true" />
          <h2 id="advantages-title" className={styles.title}>
            Why Choose XGY
          </h2>
          <p className={styles.description}>
            We combine technical expertise with modern manufacturing capabilities
            to deliver electronic equipment you can depend on.
          </p>
        </header>

        <div className={styles.grid}>
          {ADVANTAGES.map((item) => (
            <article key={item.title} className={styles.card}>
              <div className={styles.icon}>{item.icon}</div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardText}>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
