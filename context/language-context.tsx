"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  dir: "ltr" | "rtl"
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  // Get the direction based on the language
  const dir = language === "ar" ? "rtl" : "ltr"

  // Set the language and store it in localStorage
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("language", newLanguage)

    // Update the HTML lang and dir attributes
    document.documentElement.lang = newLanguage
    document.documentElement.dir = newLanguage === "ar" ? "rtl" : "ltr"

    // Redirect to the localized version of the current page
    const currentPath = window.location.pathname
    const newPath =
      currentPath.startsWith("/ar") || currentPath.startsWith("/en")
        ? `/${newLanguage}${currentPath.substring(3)}`
        : `/${newLanguage}${currentPath}`

    window.history.pushState({}, "", newPath)
  }

  // Initialize language from localStorage or URL on client side
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language | null
    const urlLanguage = window.location.pathname.startsWith("/ar")
      ? "ar"
      : window.location.pathname.startsWith("/en")
        ? "en"
        : null

    const detectedLanguage = urlLanguage || savedLanguage || "en"

    if (detectedLanguage !== language) {
      setLanguageState(detectedLanguage as Language)
      document.documentElement.lang = detectedLanguage
      document.documentElement.dir = detectedLanguage === "ar" ? "rtl" : "ltr"
    }
  }, [language])

  return <LanguageContext.Provider value={{ language, setLanguage, dir }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
