"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { translations } from "@/lib/translations"
import { useAnalytics } from "@/hooks/use-analytics"

export default function Manifesto() {
  const { language, dir } = useLanguage()
  const t = translations[language]
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
  const { trackEvent } = useAnalytics()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100])
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 10])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -10])

  const handleReadManifestoClick = () => {
    trackEvent("read_manifesto_clicked", { language })
  }

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden bg-black">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        {/* Animated geometric shapes */}
        <motion.div
          className="absolute w-[40vw] h-[40vw] rounded-full bg-bawes-gold/5 blur-3xl"
          style={{
            top: "10%",
            right: "5%",
            y: y1,
            rotate: rotate1,
          }}
        />

        <motion.div
          className="absolute w-[30vw] h-[30vw] rounded-full bg-bawes-red/5 blur-3xl"
          style={{
            bottom: "10%",
            left: "5%",
            y: y2,
            rotate: rotate2,
          }}
        />

        {/* Document-like pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:100%_24px]" />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
          dir={dir}
        >
          <div className="text-center mb-16">
            <div className="inline-block mb-4 p-2 bg-gradient-to-r from-bawes-gold/20 via-bawes-red/20 to-bawes-orange/20 rounded-xl backdrop-blur-sm border border-white/10">
              <div className="w-12 h-12 relative">
                <img src="/images/bawes-logo.png" alt="BAWES" className="w-full h-full object-contain" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              {t.manifestoTitle}
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">{t.manifestoDesc}</p>
          </div>

          <div className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 mb-12 relative overflow-hidden">
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-bawes-gold/30 via-bawes-red/30 to-bawes-orange/30 opacity-20"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 10,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              />
            </div>

            <div className="relative z-10 space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-1 h-full min-h-[24px] bg-gradient-to-b from-bawes-gold to-bawes-red rounded-full" />
                <p className="text-xl text-white/90">
                  {language === "ar"
                    ? "نحن لا نبني تطبيقًا. نحن نبني كونًا."
                    : "We are not building an app. We are building a universe."}
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-1 h-full min-h-[24px] bg-gradient-to-b from-bawes-gold to-bawes-red rounded-full" />
                <p className="text-xl text-white/90">
                  {language === "ar"
                    ? "كون متكامل بالكامل، يركز على الناس، مصمم لمساعدتك على التفكير والعمل والبناء والنمو - بشكل أسرع وأذكى وبأقل قدر من الاحتكاك."
                    : "A fully integrated, people-first universe designed to help you think, act, build, and grow — faster, smarter, and with less friction."}
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-1 h-full min-h-[24px] bg-gradient-to-b from-bawes-gold to-bawes-red rounded-full" />
                <p className="text-xl text-white/90">
                  {language === "ar" ? "نحن لا ندعم التنفيذ فقط." : "We don't just support execution."}
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-1 h-full min-h-[24px] bg-gradient-to-b from-bawes-gold to-bawes-red rounded-full" />
                <p className="text-xl text-white/90">
                  {language === "ar"
                    ? "نحن التنفيذ - يتم نشره عند الطلب، مدعومًا بالبشر الحقيقيين، ومدعومًا بأنظمة ذكية."
                    : "We are execution — deployed on-demand, backed by real humans, and powered by smart systems."}
                </p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gradient-to-r from-black/80 via-black/60 to-black/80 rounded-lg border border-white/10 relative overflow-hidden">
              {/* Animated gradient background */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-bawes-gold/10 via-bawes-red/10 to-bawes-orange/10"
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    ease: "linear",
                  }}
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                />
              </div>

              <p className="text-lg font-mono text-center relative z-10">
                {language === "ar" ? (
                  <>
                    <span className="text-bawes-red">(المهارة × الجاهزية × التوفر)</span> × الوقت ={" "}
                    <span className="text-bawes-gold">التنفيذ في الوقت الحقيقي</span>
                  </>
                ) : (
                  <>
                    <span className="text-bawes-red">(Skill × Readiness × Availability)</span> × Time ={" "}
                    <span className="text-bawes-gold">Real-time Execution</span>
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link href={`/${language}/manifesto`} onClick={handleReadManifestoClick}>
              <Button className="bg-gradient-to-r from-bawes-gold via-bawes-red to-bawes-orange hover:opacity-90 text-white font-medium group">
                {t.readManifesto}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Diagonal divider */}
      <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-[#050505] transform -skew-y-3" />
      </div>
    </section>
  )
}
