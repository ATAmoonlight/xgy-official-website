import Image from "next/image";
import type { CSSProperties } from "react";
import { getPartnerLogoConfig } from "@/lib/partner-logo-config";
import HomeSectionHeading from "./HomeSectionHeading";
import styles from "./Partners.module.css";

const PARTNER_LOGOS = [
  { id: "casio", name: "Casio", src: "/partner-logos/casiologo.jpg" },
  { id: "bull", name: "公牛", src: "/partner-logos/bulllogo.png" },
  { id: "jlc", name: "嘉立创", src: "/partner-logos/jlclogo.jpg" },
  { id: "longood", name: "朗科智能", src: "/partner-logos/longoodlogo.jpg" },
  { id: "leili", name: "雷利", src: "/partner-logos/leililogo.jpg" },
  {
    id: "leapmotor",
    name: "零跑汽车",
    src: "/partner-logos/leapmotorlogo.jpg",
  },
  { id: "foxess", name: "麦田能源", src: "/partner-logos/foxlogo.jpg" },
  {
    id: "panasonic",
    name: "松下电器",
    src: "/partner-logos/panasonicogo.png",
  },
  { id: "star", name: "星帅尔", src: "/partner-logos/starogo.png" },
  { id: "sinee", name: "正弦科技", src: "/partner-logos/sineelogo.jpg" },
] as const;

type Partner = (typeof PARTNER_LOGOS)[number];

function PartnerLogo({ partner }: { partner: Partner }) {
  const config = getPartnerLogoConfig(partner.id);
  const logoStyle = {
    "--partner-logo-scale": config.scale,
    "--partner-logo-x": config.translateX,
    "--partner-logo-y": config.translateY,
    "--partner-logo-max-width": config.maxWidth,
    "--partner-logo-max-height": config.maxHeight,
  } as CSSProperties;

  return (
    <div className={styles.logoCard}>
      <Image
        src={partner.src}
        alt={`${partner.name}合作客户标志`}
        width={360}
        height={160}
        sizes="(max-width: 768px) 168px, 216px"
        className={styles.logoImage}
        style={logoStyle}
      />
    </div>
  );
}

function LogoGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div
      className={`${styles.logoGroup} ${hidden ? styles.duplicateGroup : ""}`}
      aria-hidden={hidden || undefined}
    >
      {PARTNER_LOGOS.map((partner) => (
        <PartnerLogo key={partner.src} partner={partner} />
      ))}
    </div>
  );
}

export default function Partners() {
  return (
    <section
      id="partners"
      className={styles.section}
      aria-labelledby="partners-title"
    >
      <div className={styles.headingInner}>
        <HomeSectionHeading
          eyebrow="合作客户"
          title="携手行业客户，共建高效制造"
          titleId="partners-title"
          description="长期服务电子制造行业客户，为合作伙伴提供稳定可靠的自动化设备与技术支持。"
          align="center"
          className={styles.heading}
        />
      </div>

      <div className={styles.marquee} aria-label="合作客户标志">
        <div className={styles.marqueeViewport}>
          <div className={`${styles.track} ${styles.trackForward}`}>
            <LogoGroup />
            <LogoGroup hidden />
          </div>
        </div>
        <div
          className={`${styles.marqueeViewport} ${styles.secondaryViewport}`}
          aria-hidden="true"
        >
          <div className={`${styles.track} ${styles.trackReverse}`}>
            <LogoGroup hidden />
            <LogoGroup hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
