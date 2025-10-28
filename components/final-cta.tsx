"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"
import { translations } from "@/lib/translations"

export default function FinalCta() {
  const { language, dir } = useLanguage()
  const t = translations[language]

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
          dir={dir}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-blue-400">📢</span> {t.finalCtaTitle}
          </h2>

          <p className="text-xl text-slate-300 mb-10">{t.finalCtaDesc}</p>

          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-6 h-auto"
          >
            {t.getStarted}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
