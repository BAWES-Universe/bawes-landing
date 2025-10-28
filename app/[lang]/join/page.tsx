import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { translations } from "@/lib/translations"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import JoinForm from "@/components/join-form"

type Props = {
  params: { lang: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = params.lang || "en"
  const t = translations[lang as keyof typeof translations]

  return {
    title: `${t.joinTitle} | BAWES Universe`,
    description: t.joinDesc,
    openGraph: {
      title: `${t.joinTitle} | BAWES Universe`,
      description: t.joinDesc,
      locale: lang,
    },
  }
}

export default function JoinPage({ params }: Props) {
  const lang = params.lang || "en"
  const t = translations[lang as keyof typeof translations]
  const isRtl = lang === "ar"

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 bg-black min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto" dir={isRtl ? "rtl" : "ltr"}>
            <Link href={`/${lang}`}>
              <Button variant="ghost" className="mb-8 text-white/70 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t.backToHome}
              </Button>
            </Link>

            <div className="flex justify-center mb-8">
              <div className="relative w-20 h-20">
                <img src="/images/bawes-logo.png" alt="BAWES" className="w-full h-full object-contain" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-white">{t.joinTitle}</h1>

            <p className="text-xl text-white/70 text-center mb-12">{t.joinDesc}</p>

            <JoinForm lang={lang} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
