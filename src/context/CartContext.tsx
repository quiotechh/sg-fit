"use client"

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  type ReactNode,
} from "react"

// ─── Types ────────────────────────────────────────────────────────────────

export interface CartItem {
  slug: string
  category: string
  title: string
  level: string
  duration: string
  price: number
  bgClass: string
}

interface AppliedCoupon {
  code: string
  discount: number
  type: "percent" | "fixed"
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  couponInput: string
  appliedCoupon: AppliedCoupon | null
  couponError: string
  email: string
}

type CartAction =
  | { type: "ADD_ITEM"; item: CartItem }
  | { type: "REMOVE_ITEM"; slug: string }
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "SET_COUPON_INPUT"; value: string }
  | { type: "APPLY_COUPON" }
  | { type: "REMOVE_COUPON" }
  | { type: "SET_EMAIL"; value: string }

// ─── Valid coupon codes ───────────────────────────────────────────────────

const COUPONS: Record<string, Omit<AppliedCoupon, "code">> = {
  SGFIT10:  { discount: 10, type: "percent" },
  WELCOME20: { discount: 20, type: "percent" },
  SG50:     { discount: 50, type: "fixed" },
}

// ─── Reducer ──────────────────────────────────────────────────────────────

const initialState: CartState = {
  items: [],
  isOpen: false,
  couponInput: "",
  appliedCoupon: null,
  couponError: "",
  email: "",
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      // Already in cart — just open the sidebar
      if (state.items.some((i) => i.slug === action.item.slug)) {
        return { ...state, isOpen: true }
      }
      return { ...state, isOpen: true, items: [...state.items, action.item] }
    }
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((i) => i.slug !== action.slug) }
    case "OPEN":
      return { ...state, isOpen: true }
    case "CLOSE":
      return { ...state, isOpen: false }
    case "SET_COUPON_INPUT":
      return { ...state, couponInput: action.value, couponError: "" }
    case "APPLY_COUPON": {
      const code = state.couponInput.trim().toUpperCase()
      const found = COUPONS[code]
      if (!found) return { ...state, couponError: "Invalid coupon code. Try SGFIT10." }
      return { ...state, appliedCoupon: { code, ...found }, couponError: "" }
    }
    case "REMOVE_COUPON":
      return { ...state, appliedCoupon: null, couponInput: "", couponError: "" }
    case "SET_EMAIL":
      return { ...state, email: action.value }
    default:
      return state
  }
}

// ─── Context ──────────────────────────────────────────────────────────────

interface CartContextValue {
  items: CartItem[]
  isOpen: boolean
  couponInput: string
  appliedCoupon: AppliedCoupon | null
  couponError: string
  email: string
  totalItems: number
  subtotal: number
  discountAmount: number
  total: number
  addItem: (item: CartItem) => void
  removeItem: (slug: string) => void
  openCart: () => void
  closeCart: () => void
  setCouponInput: (v: string) => void
  applyCoupon: () => void
  removeCoupon: () => void
  setEmail: (v: string) => void
}

const CartContext = createContext<CartContextValue | null>(null)

// ─── Provider ─────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const subtotal = state.items.reduce((sum, i) => sum + i.price, 0)

  const discountAmount = (() => {
    if (!state.appliedCoupon) return 0
    if (state.appliedCoupon.type === "percent") {
      return parseFloat(((subtotal * state.appliedCoupon.discount) / 100).toFixed(2))
    }
    return Math.min(state.appliedCoupon.discount, subtotal)
  })()

  const total = Math.max(0, subtotal - discountAmount)

  const addItem    = useCallback((item: CartItem) => dispatch({ type: "ADD_ITEM", item }), [])
  const removeItem = useCallback((slug: string)   => dispatch({ type: "REMOVE_ITEM", slug }), [])
  const openCart   = useCallback(()               => dispatch({ type: "OPEN" }), [])
  const closeCart  = useCallback(()               => dispatch({ type: "CLOSE" }), [])
  const setCouponInput = useCallback((v: string)  => dispatch({ type: "SET_COUPON_INPUT", value: v }), [])
  const applyCoupon    = useCallback(()           => dispatch({ type: "APPLY_COUPON" }), [])
  const removeCoupon   = useCallback(()           => dispatch({ type: "REMOVE_COUPON" }), [])
  const setEmail       = useCallback((v: string)  => dispatch({ type: "SET_EMAIL", value: v }), [])

  return (
    <CartContext.Provider
      value={{
        ...state,
        totalItems: state.items.length,
        subtotal,
        discountAmount,
        total,
        addItem,
        removeItem,
        openCart,
        closeCart,
        setCouponInput,
        applyCoupon,
        removeCoupon,
        setEmail,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used inside CartProvider")
  return ctx
}
