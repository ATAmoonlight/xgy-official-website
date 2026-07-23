import styles from "./HomeSectionHeading.module.css";

type HomeSectionHeadingProps = {
  eyebrow: string;
  title: string;
  titleId: string;
  description?: string;
  align?: "left" | "center";
  size?: "default" | "large";
  tone?: "default" | "inverse";
  className?: string;
};

export default function HomeSectionHeading({
  eyebrow,
  title,
  titleId,
  description,
  align = "left",
  size = "default",
  tone = "default",
  className = "",
}: HomeSectionHeadingProps) {
  const headingClassName = [
    styles.heading,
    align === "center" ? styles.center : "",
    tone === "inverse" ? styles.inverse : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headingClassName}>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <h2
        id={titleId}
        className={`${styles.title} ${size === "large" ? styles.titleLarge : ""}`}
      >
        {title}
      </h2>
      {description ? (
        <p className={styles.description}>{description}</p>
      ) : null}
    </header>
  );
}
