import React from "react";

const faqs = [
  {
    question: "What is SG Fit?",
    answer:
      "SG Fit is a fitness and wellness platform offering workout programs, nutrition guides, community membership, and merchandise through our Shopify-powered store.",
  },
  {
    question: "How do I purchase a program or membership?",
    answer:
      "Visit our shop, select the workout program, nutrition guide, or membership plan you want, then complete checkout with Stripe or Paystack. Your digital product will be available immediately after purchase.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Digital products, memberships, and physical merchandise are generally non-refundable. We review exceptions for unauthorized charges, duplicates, or damaged goods on a case-by-case basis.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept payments through Stripe and Paystack. All payments are securely processed by these providers, and your payment information is never stored on our site.",
  },
  {
    question: "How do I access my purchased digital products?",
    answer:
      "After purchase, you can access your workout programs and nutrition guides through your SG Fit account. If you have trouble, contact us at sgfitza@gmail.com.",
  },
  {
    question: "What are the community rules?",
    answer:
      "Community members must be respectful and avoid spam, explicit content, or any unlawful behavior. Content that violates our rules may be removed and accounts may be suspended.",
  },
  {
    question: "Do I need to be a certain age to use SG Fit?",
    answer:
      "Yes, users must be at least 13 years old to use SG Fit. If you are under 18, please get permission from a parent or guardian.",
  },
  {
    question: "Is SG Fit a medical service?",
    answer:
      "No. SG Fit is not a medical provider. Our content is for informational purposes only. Consult a doctor before beginning any new fitness program if you have existing health issues.",
  },
  {
    question: "How long does shipping take for merchandise?",
    answer:
      "Shipping times vary based on your location and the Shopify carrier selected at checkout. For tracking updates, check your order confirmation email or contact our support team.",
  },
  {
    question: "How can I contact SG Fit?",
    answer:
      "For support, refunds, or general questions, email us at sgfitza@gmail.com. We typically respond within 1-3 business days.",
  },
];

export default function FAQPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 lg:py-16">
      <div className="text-center mb-14">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
          Support
        </p>
        <h1 className="text-5xl lg:text-6xl font-black">
          Frequently Asked Questions
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          Find quick answers about SG Fit programs, membership, payments,
          community rules, and how to get help.
        </p>
      </div>

      <div className="grid gap-6">
        {faqs.map((faq) => (
          <div
            key={faq.question}
            className="rounded-3xl border border-border/70 bg-card/80 p-8 shadow-sm shadow-black/5"
          >
            <h2 className="text-2xl font-semibold mb-4">{faq.question}</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
