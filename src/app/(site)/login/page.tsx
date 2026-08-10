import { Suspense } from "react"
import LoginForm from "./LoginForm"

export default function LoginPage() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      <section className="flex-1 flex items-center justify-center px-6 py-16 sm:py-24">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-2 mb-8 text-center">
            <p
              className="text-[10px] font-black uppercase tracking-[0.25em] [font-family:var(--font-barlow)]"
              style={{
                background: "linear-gradient(135deg, #C9953A, #F0CC72, #B8841F)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Welcome Back
            </p>
            <h1 className="font-black uppercase leading-none tracking-tight [font-family:var(--font-barlow)] text-3xl sm:text-4xl text-zinc-950">
              Login to SG Fit
            </h1>
          </div>
          <div className="bg-white border-2 border-zinc-100 rounded-3xl p-7 xl:p-10">
            <Suspense fallback={null}>
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  )
}
