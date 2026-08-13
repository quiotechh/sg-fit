"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  X,
  ShoppingCart,
  Trash2,
  Tag,
  ArrowRight,
  Shield,
} from "lucide-react";
import { useCart } from "@/store/cartStore";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";


export default function CartSidebar() {

  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    couponInput,
    appliedCoupon,
    couponError,
    setCouponInput,
    applyCoupon,
    removeCoupon,
    totalItems,
    subtotal,
    discountAmount,
    total,
  } = useCart();

   const { data: session } = authClient.useSession();
   const router = useRouter();

  // Trap focus and prevent body scroll when open
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      panelRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeCart();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeCart]);

  return (
    <div
      className={`fixed inset-0 z-100 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      {/* ── Backdrop ─────────────────────────────────────────────── */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeCart}
      />

      {/* ── Sidebar panel ────────────────────────────────────────── */}
      <div
        ref={panelRef}
        tabIndex={-1}
        className={`absolute top-0 right-0 h-full w-full sm:max-w-105 bg-white shadow-2xl flex flex-col outline-none transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="shrink-0 flex items-center justify-between px-5 sm:px-6 py-4 bg-zinc-950">
          <div className="flex items-center gap-3">
            <h2
              className="text-sm font-black uppercase tracking-[0.25em] [font-family:var(--font-barlow)]"
              style={{
                background:
                  "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Your Cart
            </h2>
            {totalItems > 0 && (
              <span className="text-[11px] font-black text-white/50 bg-white/10 px-2.5 py-0.5 rounded-full [font-family:var(--font-barlow)]">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="text-white/50 hover:text-white transition-colors p-1 -mr-1"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* ── Scrollable content ───────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto">
          {/* Empty state */}
          {items.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-5 h-full px-8 text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-zinc-100 flex items-center justify-center">
                <ShoppingCart className="size-7 text-zinc-300" />
              </div>
              <div>
                <p className="font-black uppercase text-zinc-950 [font-family:var(--font-barlow)] text-base mb-1">
                  Your cart is empty
                </p>
                <p className="text-sm font-medium text-zinc-400 [font-family:var(--font-barlow)] leading-relaxed">
                  Pick a program and start your transformation.
                </p>
              </div>
              <Link
                href="/programs"
                onClick={closeCart}
                className="inline-flex items-center gap-2 bg-zinc-950 text-white text-xs font-black uppercase tracking-widest px-6 py-3 rounded-lg hover:bg-zinc-800 active:scale-95 transition-all [font-family:var(--font-barlow)]"
              >
                Browse Programs
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          )}

          {/* Cart items */}
          {items.length > 0 && (
            <div className="px-5 sm:px-6 pt-4 pb-2 flex flex-col divide-y divide-zinc-100">
              {items.map((item) => (
                <div key={item.slug} className="flex items-center gap-4 py-4">
                  {/* Thumbnail — gradient placeholder, swap for real image later */}
                  <div
                    className={`w-15 h-15 rounded-xl shrink-0 bg-linear-to-br ${item.bgClass}`}
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black uppercase tracking-tight text-zinc-950 [font-family:var(--font-barlow)] leading-tight">
                      {item.title}
                    </p>
                    <p className="text-xs font-medium text-zinc-400 [font-family:var(--font-barlow)] mt-0.5">
                      {item.level} &nbsp;·&nbsp; {item.duration}
                    </p>
                  </div>

                  {/* Price + remove */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="text-sm font-black text-zinc-950 [font-family:var(--font-barlow)]">
                      ${item.price}
                    </span>
                    <button
                      onClick={() => {
                        removeItem(item.slug);
                        if (session) {
                          fetch(`/api/cart/${item.slug}`, { method: "DELETE" });
                        }
                      }}
                      aria-label={`Remove ${item.title}`}
                      className="text-zinc-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Footer — only when cart has items ───────────────────── */}
        {items.length > 0 && (
          <div className="shrink-0 border-t border-zinc-100 flex flex-col gap-4 px-5 sm:px-6 py-5">
            {/* Coupon code */}
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500 [font-family:var(--font-barlow)]">
                <Tag className="size-3" />
                Coupon Code
              </label>

              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5">
                  <div>
                    <span className="text-xs font-black uppercase tracking-wide text-zinc-950 [font-family:var(--font-barlow)]">
                      {appliedCoupon.code}
                    </span>
                    <span
                      className="ml-2 text-xs font-semibold [font-family:var(--font-barlow)]"
                      style={{ color: "#B8841F" }}
                    >
                      {appliedCoupon.type === "percent"
                        ? `−${appliedCoupon.discount}%`
                        : `−$${appliedCoupon.discount}`}{" "}
                      applied
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-zinc-400 hover:text-zinc-700 transition-colors text-xs font-bold [font-family:var(--font-barlow)] uppercase tracking-wide"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                      placeholder="e.g. SGFIT10"
                      className="flex-1 border-2 border-zinc-200 focus:border-zinc-950 rounded-xl px-4 py-2.5 text-sm font-semibold text-zinc-950 placeholder:text-zinc-300 [font-family:var(--font-barlow)] outline-none transition-colors"
                    />
                    <button
                      onClick={applyCoupon}
                      className="shrink-0 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest text-zinc-950 border-2 border-zinc-950 hover:bg-zinc-950 hover:text-white transition-all [font-family:var(--font-barlow)]"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-xs font-semibold text-red-500 [font-family:var(--font-barlow)]">
                      {couponError}
                    </p>
                  )}
                </>
              )}
            </div>

            {/* Order summary */}
            <div className="flex flex-col gap-1.5 py-3 border-t border-zinc-100">
              <div className="flex items-center justify-between text-sm [font-family:var(--font-barlow)]">
                <span className="font-semibold text-zinc-400">Subtotal</span>
                <span className="font-black text-zinc-950">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              {appliedCoupon && (
                <div className="flex items-center justify-between text-sm [font-family:var(--font-barlow)]">
                  <span className="font-semibold text-zinc-400">
                    Discount ({appliedCoupon.code})
                  </span>
                  <span className="font-black" style={{ color: "#B8841F" }}>
                    −${discountAmount.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 mt-1 border-t border-zinc-100">
                <span className="text-base font-black uppercase tracking-wide text-zinc-950 [font-family:var(--font-barlow)]">
                  Total
                </span>
                <span className="text-xl font-black text-zinc-950 [font-family:var(--font-barlow)]">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout button */}
            <button
              onClick={() => {
                closeCart();
                if (session) {
                  router.push("/checkout");
                } else {
                  router.push("/login?redirect=/checkout");
                }
              }}
              className="w-full inline-flex items-center justify-center gap-3 text-zinc-950 text-sm font-black uppercase tracking-widest px-6 py-4 rounded-xl active:scale-[0.98] transition-all duration-150 [font-family:var(--font-barlow)] group"
              style={{
                background:
                  "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)",
              }}
            >
              {session ? `Checkout — $${total.toFixed(2)}` : "Sign In to Checkout"}
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>

            {/* Guarantee */}
            <div className="flex items-center justify-center gap-1.5 text-zinc-400">
              <Shield className="size-3.5 shrink-0" />
              <p className="text-[11px] font-medium [font-family:var(--font-barlow)]">
                14-day money-back guarantee
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
