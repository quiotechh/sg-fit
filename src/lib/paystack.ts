import crypto from "crypto"

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!
const PAYSTACK_BASE_URL = "https://api.paystack.co"

interface InitializeTransactionParams {
  email: string
  amount?: number // smallest currency unit — cents for ZAR. Omit when passing `plan` — Paystack charges the plan's amount.
  plan?: string // plan code — attaches this transaction to a subscription plan
  reference?: string
  callback_url?: string
  metadata?: Record<string, unknown>
}

interface InitializeTransactionResponse {
  status: boolean
  message: string
  data: {
    authorization_url: string
    access_code: string
    reference: string
  }
}

export async function initializeTransaction(params: InitializeTransactionParams): Promise<InitializeTransactionResponse> {
  const res = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ currency: "ZAR", ...params }),
  })
  if (!res.ok) {
    throw new Error(`Paystack initialize failed: ${await res.text()}`)
  }
  return res.json()
}

interface VerifyTransactionResponse {
  status: boolean
  message: string
  data: {
    status: string
    reference: string
    amount: number
    currency: string
    metadata: Record<string, unknown>
    customer: { email: string; customer_code?: string }
    plan?: string | null // plan code — present on subscription-related charges, absent on one-time purchases
    paid_at?: string
  }
}

export async function verifyTransaction(reference: string): Promise<VerifyTransactionResponse> {
  const res = await fetch(`${PAYSTACK_BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` },
  })
  if (!res.ok) {
    throw new Error(`Paystack verify failed: ${await res.text()}`)
  }
  return res.json()
}

export function verifyWebhookSignature(rawBody: string, signature: string | null): boolean {
  if (!signature) return false
  const hash = crypto.createHmac("sha512", PAYSTACK_SECRET_KEY).update(rawBody).digest("hex")
  return hash === signature
}

interface DisableSubscriptionResponse {
  status: boolean
  message: string
}

export async function disableSubscription(code: string, token: string): Promise<DisableSubscriptionResponse> {
  const res = await fetch(`${PAYSTACK_BASE_URL}/subscription/disable`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code, token }),
  })
  if (!res.ok) {
    throw new Error(`Paystack disable subscription failed: ${await res.text()}`)
  }
  return res.json()
}
