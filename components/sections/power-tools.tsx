"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { ExternalLink, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"
import { translations } from "@/lib/translations"

export default function PowerTools() {
  const { language, dir } = useLanguage()
  const t = translations[language]
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const tools = [
    {
      logo: "/images/bawes-intel-logo.svg",
      emoji: "🧠",
      title: t.bawesIntelligenceTitle,
      description: t.bawesIntelligenceDesc,
      website: "https://intelligence.bawes.net",
      discord: null,
      color: "bg-bawes-gold/10",
      borderColor: "border-bawes-gold/30",
      iconColor: "text-bawes-gold",
    },
    {
      logo: "/images/studenthub-logo.svg",
      emoji: "🎓",
      title: t.studentHubTitle,
      description: t.studentHubDesc,
      website: "https://studenthub.co",
      discord: "https://discord.gg/CXceJWnwNT",
      color: "bg-bawes-red/10",
      borderColor: "border-bawes-red/30",
      iconColor: "text-bawes-red",
    },
    {
      logo: "/images/plugn-logo.svg",
      emoji: "🛒",
      title: t.plugnTitle,
      description: t.plugnDesc,
      website: "https://plugn.io",
      discord: "https://discord.gg/amjZaKAZ8X",
      color: "bg-bawes-orange/10",
      borderColor: "border-bawes-orange/30",
      iconColor: "text-bawes-orange",
    },
  ]

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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="power-tools" ref={sectionRef} className="py-32 relative overflow-hidden bg-black">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        {/* Geometric shapes based on BAWES logo */}
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-bawes-brown/10 rotate-45 blur-3xl" />
        <div className="absolute bottom-[10%] left-[5%] w-[40%] h-[40%] bg-bawes-orange/10 -rotate-12 blur-3xl" />

        {/* Diagonal pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-diagonal-pattern from-transparent via-white/10 to-transparent animate-diagonal" />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} dir={dir}>
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-block mb-4">
              <div className="w-16 h-16 relative mx-auto">
                <img src="/images/bawes-logo.png" alt="BAWES" className="w-full h-full object-contain" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">{t.powerToolsTitle}</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {tools.map((tool, index) => (
              <motion.div key={index} variants={itemVariants} className="group">
                <div
                  className={`relative h-full rounded-2xl p-8 backdrop-blur-lg border ${tool.borderColor} shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-opacity-50 hover:translate-y-[-5px] ${tool.color}`}
                >
                  {/* Content */}
                  <div className="flex flex-col h-full">
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl">{tool.emoji}</span>
                        <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                          <span className="text-white/70 text-xs font-medium">v1</span>
                        </div>
                      </div>

                      <div className="h-12 mb-4 relative flex items-center">
                        <Image
                          src={tool.logo || "/placeholder.svg"}
                          alt={tool.title}
                          width={150}
                          height={40}
                          className="object-contain max-h-full"
                        />
                      </div>

                      <p className="text-white/70 text-base mb-6">{tool.description}</p>
                    </div>

                    {/* Actions */}
                    <div className="mt-auto space-y-3">
                      {tool.website && (
                        <Button
                          variant="outline"
                          className={`w-full justify-between border-white/10 bg-white/5 hover:bg-white/10 text-white/90 group`}
                          onClick={() => window.open(tool.website, "_blank")}
                        >
                          <span>{t.visitWebsite}</span>
                          <ExternalLink
                            className={`h-4 w-4 ml-2 transition-transform group-hover:translate-x-1 ${tool.iconColor}`}
                          />
                        </Button>
                      )}
                      {tool.discord && (
                        <Button
                          variant="outline"
                          className={`w-full justify-between border-white/10 bg-white/5 hover:bg-white/10 text-white/90 group`}
                          onClick={() => window.open(tool.discord, "_blank")}
                        >
                          <span>{t.joinDiscord}</span>
                          <MessageSquare
                            className={`h-4 w-4 ml-2 transition-transform group-hover:translate-y-[-2px] ${tool.iconColor}`}
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
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-[#111] transform -skew-y-3" />
      </div>
    </section>
  )
}
