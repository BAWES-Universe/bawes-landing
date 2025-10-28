"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Rocket, Zap, Building, GraduationCap, Lightbulb } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { translations } from "@/lib/translations"

export default function TargetUsers() {
  const { language, dir } = useLanguage()
  const t = translations[language]
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const users = [
    {
      icon: <Rocket className="h-6 w-6" />,
      text: t.user1,
      color: "bg-bawes-gold/10",
      borderColor: "border-bawes-gold/30",
      iconColor: "text-bawes-gold",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      text: t.user2,
      color: "bg-bawes-red/10",
      borderColor: "border-bawes-red/30",
      iconColor: "text-bawes-red",
    },
    {
      icon: <Building className="h-6 w-6" />,
      text: t.user3,
      color: "bg-bawes-orange/10",
      borderColor: "border-bawes-orange/30",
      iconColor: "text-bawes-orange",
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      text: t.user4,
      color: "bg-bawes-brown/10",
      borderColor: "border-bawes-brown/30",
      iconColor: "text-bawes-brown",
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      text: t.user5,
      color: "bg-bawes-gold/10",
      borderColor: "border-bawes-gold/30",
      iconColor: "text-bawes-gold",
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
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <section id="target-users" ref={sectionRef} className="py-32 relative overflow-hidden bg-[#111]">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        {/* Geometric shapes based on BAWES logo */}
        <div className="absolute top-[5%] right-[10%] w-[30%] h-[30%] bg-bawes-red/10 rotate-45 blur-3xl" />
        <div className="absolute bottom-[20%] left-[10%] w-[40%] h-[40%] bg-bawes-brown/10 -rotate-12 blur-3xl" />

        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="rgba(255,255,255,0.5)" />
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#dots)" />
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
            <div className="inline-block mb-4">
              <div className="w-16 h-16 relative mx-auto">
                <img src="/images/bawes-logo.png" alt="BAWES" className="w-full h-full object-contain" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">{t.whoItsForTitle}</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div
                  className={`relative backdrop-blur-sm border ${user.borderColor} rounded-xl p-6 h-full overflow-hidden ${user.color}`}
                >
                  {/* Content */}
                  <div
                    className="flex items-center gap-4"
                    style={{ flexDirection: dir === "rtl" ? "row-reverse" : "row" }}
                  >
                    <div className={`p-3 rounded-lg flex-shrink-0 relative ${user.iconColor}`}>
                      {/* Icon background */}
                      <div className="absolute inset-0 bg-white/10 rounded-lg -z-10" />
                      {user.icon}
                    </div>
                    <span className="text-lg text-white/90">{user.text}</span>
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
