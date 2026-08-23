import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import MemberSidebar from "@/components/MemberSidebar";
import MemberTopbar from "@/components/MemberTopbar";
import CartSidebar from "@/components/CartSidebar";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <MemberSidebar />
      <SidebarInset>
        <MemberTopbar />
        {children}
      </SidebarInset>
      <CartSidebar />
    </SidebarProvider>
  );
}
