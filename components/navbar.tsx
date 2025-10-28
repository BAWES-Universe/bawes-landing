"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import LanguageSwitcher from "./language-switcher"
import { useLanguage } from "@/context/language-context"
import { translations } from "@/lib/translations"
import { useAnalytics } from "@/hooks/use-analytics"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language, dir } = useLanguage()
  const t = translations[language]
  const { trackEvent } = useAnalytics()
  const navRef = useRef<HTMLElement>(null)
  const router = useRouter()
  const pathname = usePathname()

  const { scrollY } = useScroll()
  const backgroundColor = useTransform(scrollY, [0, 100], ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"])
  const backdropBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(10px)"])
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.1])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  const isHomePage = pathname === `/${language}` || pathname === `/${language}/`

  const handleNavLinkClick = (section: string) => {
    trackEvent("nav_link_clicked", { section, language })

    // Close the mobile menu if it's open
    if (isMenuOpen) {
      setIsMenuOpen(false)
    }

    // If we're on the home page, just scroll to the section
    if (isHomePage) {
      const element = document.getElementById(section)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      // If we're on another page, navigate to the home page with the hash
      router.push(`/${language}#${section}`)
    }
  }

  const handleEnterUniverseClick = () => {
    trackEvent("enter_universe_clicked", { section: "navbar", language })
    window.open("https://discord.gg/QnYt5AFGxS", "_blank")
  }

  const handleMenuToggle = () => {
    trackEvent("mobile_menu_toggled", { isOpen: !isMenuOpen, language })
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <motion.nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4"
        style={{
          backgroundColor,
          backdropFilter: backdropBlur,
          borderBottom: `1px solid rgba(159, 126, 47, ${borderOpacity.get()})`,
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link
              href={`/${language}`}
              className="flex items-center space-x-2 z-50"
              style={{ gap: "0.5rem" }}
              onClick={() => trackEvent("logo_clicked", { language })}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 relative">
                  <img src="/images/bawes-logo.png" alt="BAWES" className="w-full h-full object-contain" />
                </div>
                <div>
                  <span className="text-2xl font-bold text-white">BAWES</span>
                  <span className="text-xl font-light bg-clip-text text-transparent bg-gradient-to-r from-bawes-gold via-bawes-red to-bawes-orange ml-1">
                    Universe
                  </span>
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8" style={{ gap: "2rem" }}>
              <button
                className="relative text-white/70 hover:text-white transition-colors group"
                onClick={() => handleNavLinkClick("what-is")}
              >
                {t.whatIsUniverse}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-bawes-gold via-bawes-red to-bawes-orange transition-all duration-300 group-hover:w-full" />
              </button>

              <button
                className="relative text-white/70 hover:text-white transition-colors group"
                onClick={() => handleNavLinkClick("universe-components")}
              >
                {t.universeComponents}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-bawes-gold via-bawes-red to-bawes-orange transition-all duration-300 group-hover:w-full" />
              </button>

              <button
                className="relative text-white/70 hover:text-white transition-colors group"
                onClick={() => handleNavLinkClick("target-users")}
              >
                {t.whoItsFor}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-bawes-gold via-bawes-red to-bawes-orange transition-all duration-300 group-hover:w-full" />
              </button>

              <Button
                className="bg-gradient-to-r from-bawes-gold via-bawes-red to-bawes-orange hover:opacity-90 text-white"
                onClick={handleEnterUniverseClick}
              >
                {t.enterUniverse}
              </Button>
              <LanguageSwitcher />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4 z-50">
              <LanguageSwitcher />
              <button
                className="text-white p-1"
                onClick={handleMenuToggle}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/95 backdrop-blur-lg z-40 flex flex-col justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="flex flex-col items-center gap-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <button
                className="text-2xl font-light text-white/80 hover:text-white transition-colors relative group"
                onClick={() => handleNavLinkClick("what-is")}
              >
                {t.whatIsUniverse}
                <span className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-bawes-gold via-bawes-red to-bawes-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>

              <button
                className="text-2xl font-light text-white/80 hover:text-white transition-colors relative group"
                onClick={() => handleNavLinkClick("universe-components")}
              >
                {t.universeComponents}
                <span className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-bawes-gold via-bawes-red to-bawes-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>

              <button
                className="text-2xl font-light text-white/80 hover:text-white transition-colors relative group"
                onClick={() => handleNavLinkClick("target-users")}
              >
                {t.whoItsFor}
                <span className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-bawes-gold via-bawes-red to-bawes-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>

              <div className="flex flex-col gap-4 w-64 mt-4">
                <Button
                  className="bg-gradient-to-r from-bawes-gold via-bawes-red to-bawes-orange hover:opacity-90 text-white w-full"
                  onClick={() => {
                    handleEnterUniverseClick()
                    setIsMenuOpen(false)
                  }}
                >
                  {t.enterUniverse}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
