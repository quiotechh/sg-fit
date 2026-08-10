export interface CouponDef {
  discount: number
  type: "percent" | "fixed"
}

export const COUPONS: Record<string, CouponDef> = {
  SGFIT10: { discount: 10, type: "percent" },
  WELCOME20: { discount: 20, type: "percent" },
  SG50: { discount: 50, type: "fixed" },
}

export function calculateDiscount(subtotal: number, code: string | null | undefined): number {
  if (!code) return 0
  const coupon = COUPONS[code.trim().toUpperCase()]
  if (!coupon) return 0
  if (coupon.type === "percent") {
    return parseFloat(((subtotal * coupon.discount) / 100).toFixed(2))
  }
  return Math.min(coupon.discount, subtotal)
}
