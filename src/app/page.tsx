import AboutSection from "@/components/AboutSection";
import CommunityBanner from "@/components/CommunityBanner";
import CTASection from "@/components/CTASection";
import FeaturedPrograms from "@/components/FeaturedPrograms";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import OfferCards from "@/components/OfferCards";
import RetreatBanner from "@/components/RetreatSection";
import ShopSection from "@/components/ShopSection";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen gap-4">
      <Hero />
      <OfferCards />
      <AboutSection />
      <Marquee />
      <FeaturedPrograms />
      <ShopSection />
      <CommunityBanner />
      <Testimonials />
      <RetreatBanner />
      <CTASection />
    </main>
  );
}
