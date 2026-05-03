import Image from "next/image";
import Link from "next/link";
import React from "react";

const affiliateProducts = [
  {
    name: "The Herbalist",
    description:
      "Shop trusted wellness and beauty products from The Herbalist with our affiliate link. Discover natural formulas for hair care, skin, and wellness.",
    href: "https://theherbalist.co.za/?sca_ref=6467721.wMEXb9W4Ba&utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGneSuOprbEezLqQyLtPsMwF9AqW39Pk_ogHmZhcfCstk-Us9zL7xPVqnkDROQ_aem_TFUoq5E-zJSkh9xBP4YGjQ",
    image: "/affiliates/sgfit-affiliate-luvmehair.webp",
    label: "Natural beauty essentials",
  },
  {
    name: "Luv Me Hair",
    description:
      "Explore premium hair extensions and wigs from Luv Me Hair. Shop this affiliate link for luxury hair pieces, expert styling, and long-lasting results.",
    href: "https://za.luvmehair.com/products/sharon_gambus-special-link-naturemax%E2%84%A2-pre-lagos-hairline-flexi-fit-invisi-drawstring-cap-silky-straight-bob-13x4-frontal-hd-lace-wig-pre-cut-lace?utm_source=instagram&utm_medium=kol&utm_campaign=KOLARON&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGn8a3cslqOUVTEA1AsXClnRcGv_n4fb1ic0T6FP0USYwagBIayGlhXRT-BGao_aem_mFChWZI02KzCg13jzfCn2Q",
    image: "/affiliates/sgfit-affiliate-herbal.png",
    label: "Premium wig and extension styles",
  },
];

export default function AffiliatesPage() {
  return (
    <div>
      <section className="relative">
        <div className="relative h-[52vh] overflow-hidden">
          <Image
            src="/sharon-about.jpeg"
            alt="Fitness equipment and gym"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="bg-white py-16"></div>
        <div className="absolute inset-x-0 lg:top-[40vh] top-[43vh] flex justify-center px-6">
          <div className="w-full max-w-md lg:max-w-xl rounded-2xl bg-gray-50 p-8 shadow-lg ring-1 ring-gray-200">
            <h1 className="text-center text-2xl font-black [font-family:var(--font-barlow)] leading-none uppercase tracking-wider text-zinc-950 mb-4">
              WELCOME TO{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                MY SHOP{" "}
              </span>
            </h1>
            <p className="text-center text-sm sm:text-base font-bold text-zinc-600 leading-relaxed [font-family:var(--font-barlow)]">
              Discover products I recommend from trusted partners. Browse the
              curated items below and shop directly through the affiliate links.
            </p>
          </div>
        </div>
      </section>

      <main id="products" className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
        <div className="mb-14 text-center">
          <p
            style={{
              background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            className="text-sm lg:text-base font-bold uppercase tracking-[0.35em] mb-4"
          >
            Featured partners
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-950">
            Shop the latest affiliate picks
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
            These recommended products bring quality and convenience to your
            routine. Click through to shop and support SG Fit at no extra cost.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {affiliateProducts.map((product) => (
            <article
              key={product.name}
              className="group overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-2xl shadow-slate-900/10 transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative h-85 overflow-hidden bg-slate-100 sm:h-80">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 sm:p-7">
                <p
                  style={{
                    background:
                      "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                  className="mb-4 text-xs uppercase tracking-[0.26em] font-black [font-family:var(--font-barlow)]"
                >
                  Affiliate
                </p>
                <h3 className="text-2xl sm:text-3xl font-black uppercase [font-family:var(--font-barlow)] text-slate-950 mb-4">
                  {product.name}
                </h3>
                <p className="text-base leading-relaxed text-zinc-600 mb-6 [font-family:var(--font-barlow)]">
                  {product.description}
                </p>
                <div
                  style={{
                    border: "2px solid transparent",
                    borderRadius: "8px",
                    background: `
    linear-gradient(white, white) padding-box,
    linear-gradient(135deg, #C9953A, #F0CC72, #B8841F) border-box
  `,
                  }}
                  className="mb-8 inline-flex rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm uppercase tracking-[0.22em] text-zinc-500 font-medium [font-family:var(--font-barlow)]"
                >
                  {product.label}
                </div>
                <Link
                  href={product.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full bg-zinc-950 px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition hover:bg-zinc-800 [font-family:var(--font-barlow)]"
                >
                  Shop now
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
