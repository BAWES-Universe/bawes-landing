import type { Metadata } from "next"
import Hero from "@/components/sections/hero"
import WhatIs from "@/components/sections/what-is"
import UniverseComponents from "@/components/sections/universe-components"
import Manifesto from "@/components/sections/manifesto"
import EmptySeat from "@/components/sections/empty-seat"
import TargetUsers from "@/components/sections/target-users"
import FinalCta from "@/components/sections/final-cta"
import { translations } from "@/lib/translations"
import Cursor from "@/components/ui/cursor"

type Props = {
  params: { lang: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = params.lang || "en"
  const t = translations[lang as keyof typeof translations]

  return {
    title: "BAWES Universe | Build Your Own Universe",
    description: t.metaDescription,
    keywords: "BAWES, Universe, digital ecosystem, talent platform, business tools",
    openGraph: {
      title: "BAWES Universe | Build Your Own Universe",
      description: t.metaDescription,
      locale: lang,
      type: "website",
      siteName: "BAWES Universe",
      images: [
        {
          url: "/images/bawes-logo.png",
          width: 1200,
          height: 630,
          alt: "BAWES Universe Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "BAWES Universe | Build Your Own Universe",
      description: t.metaDescription,
      images: ["/images/bawes-logo.png"],
    },
    alternates: {
      languages: {
        en: "/en",
        ar: "/ar",
      },
    },
  }
}

export default function Home({ params }: Props) {
  return (
    <main className="bg-black">
      <Hero />
      <WhatIs />
      <UniverseComponents />
      <Manifesto />
      <EmptySeat />
      <TargetUsers />
      <FinalCta />
      <Cursor />
    </main>
  )
}
