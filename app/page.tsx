import { Amenities } from "@/components/home/Amenities";
import { ApartmentTypes } from "@/components/home/ApartmentTypes";
import { Architecture } from "@/components/home/Architecture";
import { BenefitsIntro } from "@/components/home/BenefitsIntro";
import { BenefitsShowcase } from "@/components/home/BenefitsShowcase";
import { BookCallModal } from "@/components/home/BookCallModal";
import { ConceptSection } from "@/components/home/ConceptSection";
import { CookieNotice } from "@/components/home/CookieNotice";
import { FinalCta } from "@/components/home/FinalCta";
import { FloatingTips } from "@/components/home/FloatingTips";
import { Hero } from "@/components/home/Hero";
import { HomeExperience } from "@/components/home/HomeExperience";
import { Interiors } from "@/components/home/Interiors";
import { LocationMap } from "@/components/home/LocationMap";
import { MobileMenu } from "@/components/home/MobileMenu";
import { Preloader } from "@/components/home/Preloader";
import { ProjectDetails } from "@/components/home/ProjectDetails";
import { QuoteSection } from "@/components/home/QuoteSection";
import { ResidenceRange } from "@/components/home/ResidenceRange";
import { SiteFooter } from "@/components/home/SiteFooter";
import { SiteHeader } from "@/components/home/SiteHeader";

export default function Home() {
  return (
    <div className="transition-wrapper" data-barba="wrapper">
      <HomeExperience />
      <Preloader />
      <CookieNotice />
      <main
        className="transition-container"
        data-barba="container"
        data-barba-namespace="home"
      >
        <div className="theme_on-color">
          <SiteHeader />
          <Hero />
          <BenefitsIntro />
          <BenefitsShowcase />
          <QuoteSection />
          <ConceptSection />
          <LocationMap />
          <ApartmentTypes />
          <ResidenceRange />
          <Amenities />
          <Interiors />
          <Architecture />
          <ProjectDetails />
          <FinalCta />
          <SiteFooter />
        </div>
        <BookCallModal />
        <MobileMenu />
        <FloatingTips />
      </main>
    </div>
  );
}
