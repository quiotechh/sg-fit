import { create } from "zustand";
import { persist } from "zustand/middleware";
import { COUPONS } from "@/lib/coupons";

export interface CartItem {
  slug: string;
  category: string;
  title: string;
  level: string;
  duration: string;
  price: number;
  bgClass: string;
}

interface AppliedCoupon {
  code: string;
  discount: number;
  type: "percent" | "fixed";
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  couponInput: string;
  appliedCoupon: AppliedCoupon | null;
  couponError: string;
  email: string;
  totalItems: number;
  subtotal: number;
  discountAmount: number;
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (slug: string) => void;
  openCart: () => void;
  closeCart: () => void;
  setCouponInput: (v: string) => void;
  applyCoupon: () => void;
  removeCoupon: () => void;
  setEmail: (v: string) => void;
  hydrateFromServer: (items: CartItem[]) => void;
  clearCart: () => void;
}

function computeTotals(items: CartItem[], appliedCoupon: AppliedCoupon | null) {
  const subtotal = items.reduce((sum, i) => sum + i.price, 0);
  const discountAmount = (() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.type === "percent") {
      return parseFloat(((subtotal * appliedCoupon.discount) / 100).toFixed(2));
    }
    return Math.min(appliedCoupon.discount, subtotal);
  })();
  const total = Math.max(0, subtotal - discountAmount);
  return { subtotal, discountAmount, total };
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      couponInput: "",
      appliedCoupon: null,
      couponError: "",
      email: "",
      totalItems: 0,
      subtotal: 0,
      discountAmount: 0,
      total: 0,

      addItem: (item) => {
        const { items, appliedCoupon } = get();
        if (items.some((i) => i.slug === item.slug)) {
          set({ isOpen: true });
          return;
        }
        const newItems = [...items, item];
        set({
          items: newItems,
          isOpen: true,
          ...computeTotals(newItems, appliedCoupon),
          totalItems: newItems.length,
        });
      },
      removeItem: (slug) => {
        const { items, appliedCoupon } = get();
        const newItems = items.filter((i) => i.slug !== slug);
        set({
          items: newItems,
          ...computeTotals(newItems, appliedCoupon),
          totalItems: newItems.length,
        });
      },
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      setCouponInput: (v) => set({ couponInput: v, couponError: "" }),
      applyCoupon: () => {
        const { couponInput, items } = get();
        const code = couponInput.trim().toUpperCase();
        const found = COUPONS[code];
        if (!found) {
          set({ couponError: "Invalid coupon code. Try SGFIT10." });
          return;
        }
        const appliedCoupon = { code, ...found };
        set({
          appliedCoupon,
          couponError: "",
          ...computeTotals(items, appliedCoupon),
        });
      },
      removeCoupon: () => {
        const { items } = get();
        set({
          appliedCoupon: null,
          couponInput: "",
          couponError: "",
          ...computeTotals(items, null),
        });
      },
      setEmail: (v) => set({ email: v }),
      hydrateFromServer: (items) => {
        const { appliedCoupon } = get();
        set({
          items,
          ...computeTotals(items, appliedCoupon),
          totalItems: items.length,
        });
      },
      clearCart: () => {
        set({
          items: [],
          appliedCoupon: null,
          couponInput: "",
          couponError: "",
          totalItems: 0,
          subtotal: 0,
          discountAmount: 0,
          total: 0,
        });
      },
    }),
    {
      name: "sg-fit-cart",
      partialize: (state) => ({
        items: state.items,
        appliedCoupon: state.appliedCoupon,
        email: state.email,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          const totals = computeTotals(state.items, state.appliedCoupon);
          state.subtotal = totals.subtotal;
          state.discountAmount = totals.discountAmount;
          state.total = totals.total;
          state.totalItems = state.items.length;
        }
      },
    },
  ),
);
