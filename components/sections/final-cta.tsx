"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { translations } from "@/lib/translations"
import { useAnalytics } from "@/hooks/use-analytics"

export default function FinalCta() {
  const { language, dir } = useLanguage()
  const t = translations[language]
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
  const { trackEvent } = useAnalytics()

  const handleEnterUniverseClick = () => {
    trackEvent("enter_universe_clicked", { section: "final_cta", language })
    window.open("https://discord.gg/QnYt5AFGxS", "_blank")
  }

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden bg-black">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        {/* Geometric shapes based on BAWES logo */}
        <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] bg-bawes-gold/10 rotate-45 blur-3xl" />
        <div className="absolute bottom-[10%] right-[10%] w-[50%] h-[50%] bg-bawes-red/10 -rotate-12 blur-3xl" />

        {/* Animated particles */}
        <div className="absolute inset-0">
          <Particles />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
          dir={dir}
        >
          <div className="inline-block mb-6">
            <div className="w-20 h-20 relative mx-auto">
              <img src="/images/bawes-logo.png" alt="BAWES" className="w-full h-full object-contain" />
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight text-white">
            {t.finalCtaTitle}
          </h2>

          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">{t.finalCtaDesc}</p>

          <Button
            size="lg"
            className="group relative overflow-hidden bg-bawes-red text-white hover:bg-bawes-red/90 text-lg px-8 h-14"
            onClick={handleEnterUniverseClick}
          >
            <span className="relative z-10 flex items-center gap-2">
              {t.getStarted}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

function Particles() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white/30"
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.3,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}
