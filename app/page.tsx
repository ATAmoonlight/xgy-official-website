import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import CompanyIntro from "@/components/home/CompanyIntro";
import ProductShowcase from "@/components/home/ProductShowcase";
import CoreAdvantages from "@/components/home/CoreAdvantages";
import Partners from "@/components/home/Partners";
import BusinessPhilosophy from "@/components/home/BusinessPhilosophy";
import ContactSection from "@/components/home/ContactSection";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar home />
      <main className={styles.main}>
        <Hero />
        <CompanyIntro />
        <ProductShowcase />
        <CoreAdvantages />
        <Partners />
        <BusinessPhilosophy />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
