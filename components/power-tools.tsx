"use client"

import type React from "react"
import { motion } from "framer-motion"

interface Tool {
  emoji: string
  title: string
  logo?: string
  description: string
  borderColor: string
  color: string
}

interface PowerToolsProps {
  tools: Tool[]
}

const PowerTools: React.FC<PowerToolsProps> = ({ tools }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
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
                  <img
                    src={tool.logo || "/images/bawes-logo.png"}
                    alt={tool.title}
                    className="object-contain max-h-full max-w-[150px]"
                  />
                </div>

                <p className="text-white/70 text-base mb-6">{tool.description}</p>
              </div>

              {/* rest of the component */}
              <div className="mt-auto">
                <button className="bg-primary-gradient w-full rounded-xl py-3 text-white font-medium shadow-xl hover:bg-primary-gradient-hover transition-all duration-200">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default PowerTools
