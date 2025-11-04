import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, Noto_Sans_Arabic } from "next/font/google"

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
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${notoSansArabic.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}
