import AnnouncementBar from "@/components/AnnouncementBar"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import CartSidebar from "@/components/CartSidebar"

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      {children}
      <Footer />
      <CartSidebar />
    </>
  )
}
