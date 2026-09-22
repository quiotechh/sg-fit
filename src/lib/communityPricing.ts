// Display price for the Community membership. Every place that SHOWS the
// price (marketing page, checkout, manage page) reads this, so it can't drift
// out of sync across pages again.
//
// This is display-only. The amount actually charged is set in two places that
// must match it: PAYSTACK_COMMUNITY_PLAN_AMOUNT in .env (in cents — 16000 for
// R160) and the plan's amount on the Paystack dashboard.
export const COMMUNITY_PRICE_ZAR = 160
export const COMMUNITY_PRICE_LABEL = `R${COMMUNITY_PRICE_ZAR}`
