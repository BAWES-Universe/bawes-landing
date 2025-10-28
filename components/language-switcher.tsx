"use client"
import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { useAnalytics } from "@/hooks/use-analytics"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const { trackEvent } = useAnalytics()

  const toggleLanguage = () => {
    const newLang = language === "en" ? "ar" : "en"
    trackEvent("language_changed", { from: language, to: newLang })
    setLanguage(newLang)
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="text-white/70 hover:text-white hover:bg-white/10 rounded-full flex items-center gap-2"
        onClick={toggleLanguage}
      >
        <Globe className="h-4 w-4" />
        <span>{language === "en" ? "العربية" : "English"}</span>
      </Button>
    </div>
  )
}
