"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { translations } from "@/lib/translations"

export default function WhatIs() {
  const { language, dir } = useLanguage()
  const t = translations[language]
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50])
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 10])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -10])
  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const opacity2 = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

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
    <section id="what-is" ref={sectionRef} className="py-32 relative overflow-hidden bg-black">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-black" />

        {/* Animated geometric shapes */}
        <motion.div
          className="absolute w-[40vw] h-[40vw] rounded-full bg-bawes-gold/5 blur-3xl"
          style={{
            top: "10%",
            left: "5%",
            y: y1,
            rotate: rotate1,
            opacity: opacity1,
          }}
        />

        <motion.div
          className="absolute w-[30vw] h-[30vw] rounded-full bg-bawes-red/5 blur-3xl"
          style={{
            bottom: "10%",
            right: "5%",
            y: y2,
            rotate: rotate2,
            opacity: opacity2,
          }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[linear-gradient(rgba(159,126,47,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(159,126,47,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
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
            <div className="inline-block mb-4 p-2 bg-gradient-to-r from-bawes-gold/20 via-bawes-red/20 to-bawes-orange/20 rounded-xl backdrop-blur-sm border border-white/10">
              <div className="w-12 h-12 relative">
                <img src="/images/bawes-logo.png" alt="BAWES" className="w-full h-full object-contain" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              {t.whatIsTitle}
            </h2>

            <p className="text-xl text-white/70 max-w-3xl mx-auto">{t.whatIsDescription}</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative z-10 bg-gradient-to-br from-black/80 to-black/40 rounded-2xl p-10 backdrop-blur-lg border border-white/10 shadow-2xl"
          >
            <h3 className="text-2xl font-medium mb-8 text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              {t.useItTo}
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-4"
                  style={{ flexDirection: dir === "rtl" ? "row-reverse" : "row" }}
                >
                  <div className="p-2 bg-gradient-to-br from-bawes-gold/20 via-bawes-red/20 to-bawes-orange/20 rounded-lg border border-white/10 flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-white" />
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

      {/* Diagonal divider */}
      <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-[#050505] transform -skew-y-3" />
      </div>
    </section>
  )
}
