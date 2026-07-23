"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

const NAV_ITEMS = [
  { label: "首页", href: "/" },
  { label: "关于新光扬", href: "/#about" },
  { label: "产品中心", href: "/products" },
  { label: "制造能力", href: "/#manufacturing" },
  { label: "联系我们", href: "/#contact" },
] as const;

type NavbarProps = {
  home?: boolean;
};

export default function Navbar({ home = false }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!home) {
      return;
    }

    const updateScrolledState = () => setScrolled(window.scrollY > 24);
    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrolledState);
  }, [home]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header
      className={`${styles.header} ${home ? styles.homeHeader : ""} ${scrolled ? styles.homeScrolled : ""}`}
    >
      <div className={`${styles.inner} ${home ? styles.homeInner : ""}`}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <Image
            src="/logo/logo.png"
            alt="新光扬电子设备有限公司企业标志"
            width={200}
            height={100}
            className={`${styles.logoImage} ${home ? styles.homeLogoImage : ""}`}
            priority
          />
        </Link>

        <button
          type="button"
          className={`${styles.menuToggle} ${menuOpen ? styles.menuToggleOpen : ""}`}
          aria-label={menuOpen ? "关闭导航菜单" : "打开导航菜单"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={styles.menuBar} />
          <span className={styles.menuBar} />
          <span className={styles.menuBar} />
        </button>

        <nav
          id="main-navigation"
          className={`${styles.nav} ${home ? styles.homeNav : ""} ${menuOpen ? styles.navOpen : ""}`}
          aria-label="主导航"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${home && item.href === "/" ? styles.navLinkActive : ""} ${home && item.label === "联系我们" ? styles.contactLink : ""}`}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
