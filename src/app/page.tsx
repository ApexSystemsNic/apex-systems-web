import Header from "@/components/layout/01-header/Header";
import Footer from "@/components/layout/02-footer/Footer";
import Hero from "@/components/sections/01-hero/Hero";
import Audience from "@/components/sections/02-audience/Audience";
import Solutions from "@/components/sections/03-solutions/Solutions";
import WhyApex from "@/components/sections/04-why-apex/WhyApex";
import AboutApex from "@/components/sections/05-about/AboutApex";
import Process from "@/components/sections/06-process/Process";
import Maintenance from "@/components/sections/07-maintenance/Maintenance";
import FAQ from "@/components/sections/08-faq/FAQ";
import SocialContact from "@/components/sections/09-social-contact/SocialContact";
import Contact from "@/components/sections/10-contact/Contact";
import FinalCTA from "@/components/sections/11-final-cta/FinalCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main id="contenido" className="flex-1">
        <Hero />
        <Audience />
        <Solutions />
        <WhyApex />
        <AboutApex />
        <Process />
        <Maintenance />
        <FAQ />
        <SocialContact />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
