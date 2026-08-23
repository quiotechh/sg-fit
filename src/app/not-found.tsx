import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export const metadata = {
  title: "Page Not Found — SG Fit",
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5 text-center px-6 bg-white">
      <Link href="/">
        <Image
          src="/logo/sg-fit-logo-1.png"
          alt="SG FIT"
          width={80}
          height={80}
          className="h-16 w-auto drop-shadow-xl"
          priority
        />
      </Link>

      <div className="flex flex-col gap-2">
        <p
          className="text-[10px] font-black uppercase tracking-[0.28em] [font-family:var(--font-barlow)]"
          style={{
            background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Error 404
        </p>
        <h1 className="text-4xl sm:text-6xl font-black uppercase leading-none tracking-tight text-zinc-950 [font-family:var(--font-barlow)]">
          Page Not Found
        </h1>
        <p className="text-sm sm:text-base font-medium text-zinc-500 [font-family:var(--font-barlow)] max-w-sm mx-auto mt-1">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2 text-zinc-950 text-sm font-black uppercase tracking-widest px-8 py-4 rounded-lg active:scale-95 transition-all duration-150 [font-family:var(--font-barlow)] mt-2"
        style={{ background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)" }}
      >
        Back to Home
        <ArrowRight className="size-4" />
      </Link>
    </div>
  )
}
