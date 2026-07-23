"use client";

import { useEffect, useRef, useState } from "react";
import type { CompanyStat } from "@/lib/company-content";
import styles from "./CompanyStats.module.css";

export default function CompanyStats({ stats }: { stats: CompanyStat[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={`${styles.shell} ${visible ? styles.visible : ""}`}
      aria-label="企业概况"
    >
      <div className={styles.inner}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.item}>
            <strong className={styles.value}>{stat.value}</strong>
            <span className={styles.label}>{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
