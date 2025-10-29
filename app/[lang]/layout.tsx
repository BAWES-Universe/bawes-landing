import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/context/language-context"
import { PostHogProvider } from "@/components/providers/posthog-provider"
import ScrollProgress from "@/components/ui/scroll-progress"
import ScrollToTop from "@/components/scroll-to-top"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return (
    <PostHogProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
        <LanguageProvider>
          <ScrollToTop />
          <Navbar />
          {children}
          <Footer />
          <ScrollProgress />
        </LanguageProvider>
      </ThemeProvider>
    </PostHogProvider>
  )
}
