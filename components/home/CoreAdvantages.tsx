import styles from "./CoreAdvantages.module.css";

const ADVANTAGES = [
  {
    title: "专注研发",
    description:
      "长期专注电子元器件自动化设备领域，围绕电子制造行业生产需求，持续优化设备结构与自动化技术。",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "丰富产品",
    description:
      "产品覆盖自动成型、自动组装、自动焊接、自动穿管及非标自动化设备，满足不同生产环节的自动化需求。",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 12v4M10 14h4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "非标定制",
    description:
      "可根据客户产品特点、生产工艺及自动化需求，提供非标自动化设备研发及制造服务。",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "品质保障",
    description:
      "坚持严格质量管理，从产品设计、设备装配到整机调试，保障设备稳定可靠并支持连续生产。",
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
      id="manufacturing"
      className={styles.section}
      aria-labelledby="advantages-title"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <span className={styles.label}>产品与优势</span>
          <h2 id="advantages-title" className={styles.title}>
            覆盖电子元器件自动化生产多个环节
          </h2>
          <p className={styles.description}>
            新光扬产品涵盖自动散装元件成型机、三极管成型机、MOS 管成型机、IGBT 成型机、保险丝自动加工设备、自动组装焊接设备以及非标自动化设备，为客户提供稳定、高效、智能的自动化生产解决方案。
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
