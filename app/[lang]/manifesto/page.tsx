import type { Metadata } from "next"
import { translations } from "@/lib/translations"
import ManifestoClientPage from "./ManifestoClientPage"

type Props = {
  params: { lang: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = params.lang || "en"
  const t = translations[lang as keyof typeof translations]

  return {
    title: `${t.manifestoTitle} | BAWES Universe`,
    description: t.manifestoDesc,
    openGraph: {
      title: `${t.manifestoTitle} | BAWES Universe`,
      description: t.manifestoDesc,
      locale: lang,
    },
  }
}

export default function ManifestoPage({ params }: Props) {
  return <ManifestoClientPage params={params} />
}
