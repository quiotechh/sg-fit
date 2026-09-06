"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/store/cartStore";
import { authClient } from "@/lib/auth-client";
import { getInitials } from "@/lib/utils";
import DeleteAccountDialog from "@/components/DeleteAccountDialog";

export default function MemberTopbar() {
  const { totalItems, openCart } = useCart();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [hasCredentialAccount, setHasCredentialAccount] = useState(false);

  useEffect(() => {
    if (!user) return;
    authClient.listAccounts().then(({ data }) => {
      setHasCredentialAccount(!!data?.some((a) => a.providerId === "credential"));
    });
  }, [user]);

  async function handleSignOut() {
    await fetch("/api/auth-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "auth.signout" }),
    });
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  }

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between pl-6 pr-10 md:pr-12 py-4 border-b border-zinc-100 bg-white">
      <SidebarTrigger className="text-zinc-600 hover:text-zinc-950" />

      <div className="flex items-center gap-6">
        <button
          onClick={openCart}
          aria-label="Open cart"
          className="relative text-zinc-500 hover:text-zinc-950 transition-colors duration-200 p-1"
        >
          <ShoppingCart className="size-5.5" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-zinc-950 text-white text-[9px] font-black flex items-center justify-center [font-family:var(--font-barlow)]">
              {totalItems}
            </span>
          )}
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button aria-label="My profile" className="focus:outline-none">
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user.name ?? "Profile"}
                  className="size-8 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="size-8 rounded-full flex items-center justify-center text-[10px] font-black text-zinc-950 [font-family:var(--font-barlow)] bg-[linear-gradient(135deg,#C9953A,#F0CC72,#B8841F)]">
                  {getInitials(user?.name)}
                </div>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={12}
            className="w-56 p-0 rounded-xl border border-zinc-100 shadow-[0_16px_48px_rgba(0,0,0,0.10)] overflow-hidden"
          >
            {hasCredentialAccount && (
              <DropdownMenuItem asChild className="rounded-none px-6 py-3.5 text-[13px] font-bold uppercase tracking-wider [font-family:var(--font-barlow)] cursor-pointer text-zinc-700 hover:bg-zinc-50 focus:bg-zinc-50">
                <Link href="/forgot-password">Reset Password</Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              onSelect={handleSignOut}
              className="rounded-none px-6 py-3.5 text-[13px] font-bold uppercase tracking-wider [font-family:var(--font-barlow)] cursor-pointer text-zinc-700 hover:text-red-500 hover:bg-zinc-50 focus:bg-zinc-50 focus:text-red-500"
            >
              Sign Out
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                setDeleteOpen(true);
              }}
              className="rounded-none px-6 py-3.5 text-[13px] font-bold uppercase tracking-wider [font-family:var(--font-barlow)] cursor-pointer text-red-500 hover:bg-red-50 focus:bg-red-50 focus:text-red-500"
            >
              Delete Account
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <DeleteAccountDialog open={deleteOpen} onOpenChange={setDeleteOpen} />
    </div>
  );
}
