"use client"

import { motion } from "framer-motion"
import { Rocket, Zap, Building, GraduationCap, Lightbulb } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { translations } from "@/lib/translations"

export default function TargetUsers() {
  const { language, dir } = useLanguage()
  const t = translations[language]

  const users = [
    {
      icon: <Rocket className="h-6 w-6" />,
      text: t.user1,
    },
    {
      icon: <Zap className="h-6 w-6" />,
      text: t.user2,
    },
    {
      icon: <Building className="h-6 w-6" />,
      text: t.user3,
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      text: t.user4,
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      text: t.user5,
    },
  ]

  return (
    <section id="target-users" className="py-20 bg-slate-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
          dir={dir}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="text-teal-400">⚙️</span> {t.whoItsForTitle}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 flex items-center gap-4 hover:border-slate-600 transition-all hover:translate-y-[-4px]"
                style={{ flexDirection: dir === "rtl" ? "row-reverse" : "row" }}
              >
                <div className="p-3 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg text-white">
                  {user.icon}
                </div>
                <span className="text-lg text-slate-200">{user.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
