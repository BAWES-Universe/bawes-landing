import type React from "react"
import type { Metadata } from "next"
import { Inter, Noto_Sans_Arabic } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/context/language-context"
import { PostHogProvider } from "@/components/providers/posthog-provider"
import ScrollProgress from "@/components/ui/scroll-progress"
import ScrollToTop from "@/components/scroll-to-top"

// Load Inter with all weights to ensure proper display
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-noto-sans-arabic",
})

export const metadata: Metadata = {
  title: "BAWES Universe - Build Your Own Universe",
  description: "One platform to launch, manage, and grow your entire operation.",
  alternates: {
    languages: {
      en: "/en",
      ar: "/ar",
    },
  },
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const isArabic = params.lang === "ar"

  return (
    <html
      lang={params.lang}
      dir={isArabic ? "rtl" : "ltr"}
      suppressHydrationWarning
      className={`${inter.variable} ${notoSansArabic.variable}`}
    >
      <body className={isArabic ? "font-arabic" : "font-sans"}>
        <PostHogProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <LanguageProvider>
              <ScrollToTop />
              {children}
              <ScrollProgress />
            </LanguageProvider>
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  )
}
