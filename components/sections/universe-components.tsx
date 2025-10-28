"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { ExternalLink, MessageSquare, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"
import { translations } from "@/lib/translations"

export default function UniverseComponents() {
  const { language, dir } = useLanguage()
  const t = translations[language]
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360])

  const components = [
    {
      emoji: "🧠",
      title: t.bawesIntelligenceTitle,
      description: t.bawesIntelligenceDesc,
      website: "https://intelligence.bawes.net",
      discord: null,
      color: "bg-bawes-gold/10",
      borderColor: "border-bawes-gold/30",
      iconColor: "text-bawes-gold",
      isLive: true,
      gradientFrom: "from-bawes-gold/20",
      gradientTo: "to-bawes-gold/5",
    },
    {
      emoji: "🎓",
      title: t.studentHubTitle,
      description: t.studentHubDesc,
      website: "https://studenthub.co",
      discord: "https://discord.gg/CXceJWnwNT",
      color: "bg-bawes-red/10",
      borderColor: "border-bawes-red/30",
      iconColor: "text-bawes-red",
      isLive: true,
      gradientFrom: "from-bawes-red/20",
      gradientTo: "to-bawes-red/5",
    },
    {
      emoji: "🛒",
      title: t.plugnTitle,
      description: t.plugnDesc,
      website: "https://plugn.io",
      discord: "https://discord.gg/amjZaKAZ8X",
      color: "bg-bawes-orange/10",
      borderColor: "border-bawes-orange/30",
      iconColor: "text-bawes-orange",
      isLive: true,
      gradientFrom: "from-bawes-orange/20",
      gradientTo: "to-bawes-orange/5",
    },
    {
      emoji: "易",
      title: t.thoughtProcessorTitle,
      description: t.thoughtProcessorDesc,
      website: "https://thought.bawes.net",
      discord: null,
      color: "bg-purple-600/10",
      borderColor: "border-purple-600/30",
      iconColor: "text-purple-600",
      isLive: false,
      gradientFrom: "from-purple-600/20",
      gradientTo: "to-purple-600/5",
    },
    {
      emoji: "👥",
      title: t.tribeTitle,
      description: t.tribeDesc,
      website: "https://tribe.bawes.net",
      discord: null,
      color: "bg-green-500/10",
      borderColor: "border-green-500/30",
      iconColor: "text-green-500",
      isLive: false,
      gradientFrom: "from-green-500/20",
      gradientTo: "to-green-500/5",
    },
    {
      emoji: "🔄",
      title: t.tamrTitle,
      description: t.tamrDesc,
      website: null,
      discord: null,
      color: "bg-blue-600/10",
      borderColor: "border-blue-600/30",
      iconColor: "text-blue-600",
      isLive: false,
      gradientFrom: "from-blue-600/20",
      gradientTo: "to-blue-600/5",
    },
    {
      emoji: "💼",
      title: t.walletTitle,
      description: t.walletDesc,
      website: null,
      discord: null,
      color: "bg-indigo-500/10",
      borderColor: "border-indigo-500/30",
      iconColor: "text-indigo-500",
      isLive: false,
      gradientFrom: "from-indigo-500/20",
      gradientTo: "to-indigo-500/5",
    },
    {
      emoji: "💰",
      title: t.cryptoTitle,
      description: t.cryptoDesc,
      website: null,
      discord: null,
      color: "bg-amber-500/10",
      borderColor: "border-amber-500/30",
      iconColor: "text-amber-500",
      isLive: false,
      gradientFrom: "from-amber-500/20",
      gradientTo: "to-amber-500/5",
    },
    {
      emoji: "🧪",
      title: t.sandboxTitle,
      description: t.sandboxDesc,
      website: null,
      discord: null,
      color: "bg-teal-500/10",
      borderColor: "border-teal-500/30",
      iconColor: "text-teal-500",
      isLive: false,
      gradientFrom: "from-teal-500/20",
      gradientTo: "to-teal-500/5",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="universe-components" ref={sectionRef} className="py-32 relative overflow-hidden bg-[#050505]">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        {/* 3D rotating diamond */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <motion.div style={{ rotateY }} className="w-[500px] h-[500px] opacity-10">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M50 5 L95 50 L50 95 L5 50 Z" fill="none" stroke="url(#componentGradient)" strokeWidth="0.5" />
              <path
                d="M50 5 L95 50 L50 95 L5 50 Z"
                fill="none"
                stroke="url(#componentGradient)"
                strokeWidth="0.5"
                transform="rotate(45 50 50)"
              />
              <path
                d="M50 5 L95 50 L50 95 L5 50 Z"
                fill="none"
                stroke="url(#componentGradient)"
                strokeWidth="0.5"
                transform="rotate(90 50 50)"
              />
              <path
                d="M50 5 L95 50 L50 95 L5 50 Z"
                fill="none"
                stroke="url(#componentGradient)"
                strokeWidth="0.5"
                transform="rotate(135 50 50)"
              />
              <defs>
                <linearGradient id="componentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9F7E2F" />
                  <stop offset="50%" stopColor="#F03E2F" />
                  <stop offset="100%" stopColor="#F7941D" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} dir={dir}>
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-block mb-4 p-2 bg-gradient-to-r from-bawes-gold/20 via-bawes-red/20 to-bawes-orange/20 rounded-xl backdrop-blur-sm border border-white/10">
              <div className="w-12 h-12 relative">
                <img src="/images/bawes-logo.png" alt="BAWES" className="w-full h-full object-contain" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              {t.componentsTitle}
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              {language === "en"
                ? "Discover and connect powerful components to enhance your Universe experience."
                : "اكتشف وقم بتوصيل مكونات قوية لتحسين تجربة الكون الخاصة بك."}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {components.map((component, index) => (
              <motion.div key={index} variants={itemVariants} className="group">
                <div
                  className={`relative h-full rounded-2xl p-8 backdrop-blur-lg border ${component.borderColor} shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-opacity-50 hover:translate-y-[-5px] ${component.color} ${
                    component.isHighlighted ? "ring-2 ring-purple-600/50 ring-offset-2 ring-offset-black" : ""
                  }`}
                >
                  {/* Gradient background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${component.gradientFrom} ${component.gradientTo} -z-10`}
                  />

                  {/* Animated particles */}
                  <div className="absolute inset-0 overflow-hidden -z-5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-1 h-1 rounded-full ${component.iconColor} opacity-30`}
                        initial={{
                          x: Math.random() * 100 + "%",
                          y: Math.random() * 100 + "%",
                        }}
                        animate={{
                          x: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
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

                  {/* Content */}
                  <div className="flex flex-col h-full relative z-10">
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl">{component.emoji}</span>
                        <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                          {component.isLive ? (
                            <span className="text-white/70 text-xs font-medium">v1</span>
                          ) : (
                            <Clock className="h-4 w-4 text-white/50" />
                          )}
                        </div>
                      </div>

                      <h3 className={`text-xl font-bold mb-4 ${component.iconColor}`}>{component.title}</h3>

                      <p className="text-white/70 text-base mb-6">{component.description}</p>
                    </div>

                    {/* Actions */}
                    <div className="mt-auto space-y-3">
                      {component.website ? (
                        <Button
                          variant="outline"
                          className={`w-full justify-between border-white/10 bg-white/5 hover:bg-white/10 text-white/90 group`}
                          onClick={() => window.open(component.website, "_blank")}
                        >
                          <span>{t.visitWebsite}</span>
                          <ExternalLink
                            className={`h-4 w-4 ml-2 transition-transform group-hover:translate-x-1 ${component.iconColor}`}
                          />
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          className={`w-full justify-between border-white/10 bg-white/5 text-white/70 cursor-not-allowed opacity-80`}
                          disabled
                        >
                          <span>{t.comingSoon}</span>
                          <Clock className="h-4 w-4 ml-2" />
                        </Button>
                      )}
                      {component.discord && (
                        <Button
                          variant="outline"
                          className={`w-full justify-between border-white/10 bg-white/5 hover:bg-white/10 text-white/90 group`}
                          onClick={() => window.open(component.discord, "_blank")}
                        >
                          <span>{t.joinDiscord}</span>
                          <MessageSquare
                            className={`h-4 w-4 ml-2 transition-transform group-hover:translate-y-[-2px] ${component.iconColor}`}
                          />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
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
