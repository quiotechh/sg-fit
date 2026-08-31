import AnnouncementBar from "@/components/AnnouncementBar"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import CartSidebar from "@/components/CartSidebar"
import PaymentIssueBanner from "@/components/PaymentIssueBanner"

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <PaymentIssueBanner />
      {children}
      <Footer />
      <CartSidebar />
    </>
  )
}
