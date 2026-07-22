import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import CompanyIntro from "@/components/home/CompanyIntro";
import ProductShowcase from "@/components/home/ProductShowcase";
import CoreAdvantages from "@/components/home/CoreAdvantages";
import BusinessPhilosophy from "@/components/home/BusinessPhilosophy";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <Hero />
        <CompanyIntro />
        <ProductShowcase />
        <CoreAdvantages />
        <BusinessPhilosophy />
      </main>
      <Footer />
    </div>
  );
}
