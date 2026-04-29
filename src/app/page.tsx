import Hero from "@/components/Hero"
import OfferCards from "@/components/OfferCards"
import Marquee from "@/components/Marquee"
import ShopSection from "@/components/ShopSection"
import Testimonials from "@/components/Testimonials"
import CTASection from "@/components/CTASection"

export default function Home() {
  return (
    <main>
      <Hero />
      <OfferCards />
      <Marquee />
      <ShopSection />
      <Testimonials />
      <CTASection />
    </main>
  )
}
