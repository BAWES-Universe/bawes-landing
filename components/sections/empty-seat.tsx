"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { translations } from "@/lib/translations"
import { useAnalytics } from "@/hooks/use-analytics"

export default function EmptySeat() {
  const { language, dir } = useLanguage()
  const t = translations[language]
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
  const { trackEvent } = useAnalytics()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5])

  const handleLearnMoreClick = () => {
    trackEvent("empty_seat_learn_more_clicked", { language })
  }

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden bg-[#050505]">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        {/* Animated pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-[radial-gradient(circle,rgba(159,126,47,0.2)_1px,transparent_1px)] bg-[size:20px_20px]" />
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
              <span className="text-3xl">🪑</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              {language === "ar" ? "المقعد الفارغ" : "The Empty Seat"}
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              {language === "ar"
                ? "قرار رمزي وهيكلي داخل كون BAWES."
                : "A symbolic and structural decision within the BAWES Universe."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: dir === "rtl" ? 50 : -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: dir === "rtl" ? 50 : -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-8 relative overflow-hidden"
            >
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

              <div className="relative z-10 space-y-6">
                <p className="text-lg text-white/90">
                  {language === "ar"
                    ? "لا يملك أي فرد السلطة المطلقة. لا أحد هو القائد الدائم. كل السلطة مستعارة، وليست مملوكة."
                    : "No individual owns the throne. No one is the permanent ruler. All power is borrowed, not held."}
                </p>
                <p className="text-lg text-white/80">
                  {language === "ar"
                    ? "بينما قد يكون هناك مؤسس أو قائد مؤقت يوجه النظام، يمثل المقعد الفارغ الاعتقاد بأنه لا ينبغي أن يكون أي شخص في مركز العالم - بل الأفكار والهيكل والغرض."
                    : "While there may be a founder or temporary leader guiding the system, the Empty Seat represents the belief that no person should be at the center of the world — the ideas, structure, and purpose are."}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: dir === "rtl" ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: dir === "rtl" ? -50 : 50 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="aspect-square relative rounded-2xl overflow-hidden border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-br from-black to-black/80 z-10" />

                {/* Animated throne */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center z-20"
                  style={{
                    rotate,
                    scale,
                    opacity,
                  }}
                >
                  <div className="relative w-64 h-64">
                    {/* Outer diamond */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-bawes-gold/20 via-bawes-red/20 to-bawes-orange/20 rounded-lg transform rotate-45"
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(159, 126, 47, 0.3)",
                          "0 0 40px rgba(159, 126, 47, 0.3)",
                          "0 0 20px rgba(159, 126, 47, 0.3)",
                        ],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Middle diamond */}
                    <motion.div
                      className="absolute inset-[15%] bg-gradient-to-br from-bawes-red/20 via-bawes-orange/20 to-bawes-gold/20 rounded-lg transform rotate-45"
                      animate={{
                        boxShadow: [
                          "0 0 10px rgba(240, 62, 47, 0.3)",
                          "0 0 20px rgba(240, 62, 47, 0.3)",
                          "0 0 10px rgba(240, 62, 47, 0.3)",
                        ],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 0.5,
                      }}
                    />

                    {/* Inner diamond - the empty seat */}
                    <motion.div
                      className="absolute inset-[30%] bg-black rounded-lg transform rotate-45 border border-white/10"
                      animate={{
                        boxShadow: [
                          "0 0 5px rgba(255, 255, 255, 0.3)",
                          "0 0 10px rgba(255, 255, 255, 0.3)",
                          "0 0 5px rgba(255, 255, 255, 0.3)",
                        ],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 1,
                      }}
                    />

                    {/* Text label */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white/80 text-lg font-light">
                        {language === "ar" ? "المقعد الفارغ" : "The Empty Seat"}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Animated particles */}
                <div className="absolute inset-0 overflow-hidden z-10">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-white opacity-30"
                      initial={{
                        x: Math.random() * 100 + "%",
                        y: Math.random() * 100 + "%",
                      }}
                      animate={{
                        x: [
                          Math.random() * 100 + "%",
                          Math.random() * 100 + "%",
                          Math.random() * 100 + "%",
                          Math.random() * 100 + "%",
                        ],
                        y: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
                      }}
                      transition={{
                        duration: 10 + Math.random() * 20,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="text-center mt-12">
            <Link href={`/${language}/empty-seat`} onClick={handleLearnMoreClick}>
              <Button className="bg-gradient-to-r from-bawes-gold via-bawes-red to-bawes-orange hover:opacity-90 text-white group">
                {t.learnMoreEmptySeat || "Learn More About The Empty Seat"}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Diagonal divider */}
      <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-black transform -skew-y-3" />
      </div>
    </section>
  )
}
