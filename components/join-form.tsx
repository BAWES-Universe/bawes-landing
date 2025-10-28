"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle, Loader2, AlertCircle } from "lucide-react"
import { useAnalytics } from "@/hooks/use-analytics"
import { translations } from "@/lib/translations"
import { sendJoinEmail } from "@/app/actions/send-email"
import type { FormData } from "@/app/actions/send-email"

export default function JoinForm({ lang }: { lang: string }) {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [formData, setFormData] = useState<Omit<FormData, "language">>({
    name: "",
    email: "",
    organization: "",
    role: "",
    interests: "",
    message: "",
  })
  const { trackEvent } = useAnalytics()
  const t = translations[lang as keyof typeof translations]
  const isRtl = lang === "ar"

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("submitting")
    setErrorMessage(null)
    trackEvent("join_ecosystem_form_submitted", { language: lang })

    try {
      // Send the form data to the server action
      const result = await sendJoinEmail({
        ...formData,
        language: lang,
      })

      if (result.success) {
        setFormState("success")
        trackEvent("join_ecosystem_form_success", { language: lang })
      } else {
        setFormState("error")
        setErrorMessage(result.error || t.formError)
        trackEvent("join_ecosystem_form_error", { language: lang, error: result.error })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setFormState("error")
      setErrorMessage(t.formError)
      trackEvent("join_ecosystem_form_error", { language: lang, error: "Unknown error" })
    }
  }

  if (formState === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-white">{t.formSuccess}</h2>
        <p className="text-white/70 mb-6">{t.formSuccessMessage}</p>
        <Button
          onClick={() => {
            setFormState("idle")
            setFormData({
              name: "",
              email: "",
              organization: "",
              role: "",
              interests: "",
              message: "",
            })
          }}
          className="bg-gradient-to-r from-bawes-gold via-bawes-red to-bawes-orange hover:opacity-90 text-white"
        >
          {t.formSubmitAnother}
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12"
      onSubmit={handleSubmit}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white/90">
              {t.formName}
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
              placeholder={t.formNamePlaceholder}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/90">
              {t.formEmail}
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
              placeholder={t.formEmailPlaceholder}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="organization" className="text-white/90">
              {t.formOrganization}
            </Label>
            <Input
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
              placeholder={t.formOrganizationPlaceholder}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="text-white/90">
              {t.formRole}
            </Label>
            <Input
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
              placeholder={t.formRolePlaceholder}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="interests" className="text-white/90">
            {t.formInterests}
          </Label>
          <Input
            id="interests"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
            placeholder={t.formInterestsPlaceholder}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-white/90">
            {t.formMessage}
          </Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 resize-none"
            placeholder={t.formMessagePlaceholder}
          />
        </div>

        {formState === "error" && errorMessage && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-200">{errorMessage}</p>
          </div>
        )}

        <Button
          type="submit"
          disabled={formState === "submitting"}
          className="w-full bg-gradient-to-r from-bawes-gold via-bawes-red to-bawes-orange hover:opacity-90 text-white h-12 text-lg"
        >
          {formState === "submitting" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t.formSubmitting}
            </>
          ) : (
            t.formSubmit
          )}
        </Button>
      </div>
    </motion.form>
  )
}
