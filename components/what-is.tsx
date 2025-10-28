"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { translations } from "@/lib/translations"

export default function WhatIs() {
  const { language, dir } = useLanguage()
  const t = translations[language]
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  const features = [t.feature1, t.feature2, t.feature3, t.feature4]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="what-is" ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-slate-900/80" />
        <div className="absolute w-full h-full">
          <svg className="w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <radialGradient id="grid-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="rgba(147, 51, 234, 0.3)" />
                <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
              </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-gradient)" />
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            {Array.from({ length: 10 }).map((_, i) => (
              <line
                key={`h-${i}`}
                x1="0"
                y1={i * 10}
                x2="100"
                y2={i * 10}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="0.2"
              />
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <line
                key={`v-${i}`}
                x1={i * 10}
                y1="0"
                x2={i * 10}
                y2="100"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="0.2"
              />
            ))}
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-5xl mx-auto"
          dir={dir}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-block mb-4 p-2 bg-purple-500/10 rounded-xl backdrop-blur-sm border border-purple-500/20">
              <span className="text-3xl">💡</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              {t.whatIsTitle}
            </h2>

            <p className="text-xl text-white/70 max-w-3xl mx-auto">{t.whatIsDescription}</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative z-10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-10 backdrop-blur-lg border border-white/5 shadow-2xl"
          >
            <h3 className="text-2xl font-medium mb-8 text-white">{t.useItTo}</h3>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-4"
                  style={{ flexDirection: dir === "rtl" ? "row-reverse" : "row" }}
                >
                  <div className="p-2 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg border border-purple-500/30 flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-lg text-white/90">{feature}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
