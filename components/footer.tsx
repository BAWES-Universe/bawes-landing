"use client"

import type React from "react"

import Link from "next/link"
import { useLanguage } from "@/context/language-context"
import { translations } from "@/lib/translations"

export default function Footer() {
  const { language, dir } = useLanguage()
  const t = translations[language]

  return (
    <footer className="relative pt-24 pb-12 overflow-hidden bg-black">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bawes-gold/20 to-transparent" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16" dir={dir}>
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center space-x-2 mb-6" style={{ gap: "0.5rem" }}>
              <div className="w-10 h-10 relative">
                <img src="/images/bawes-logo.png" alt="BAWES" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="text-2xl font-bold text-white">BAWES</span>
                <span className="text-xl font-light text-bawes-orange ml-1">Universe</span>
              </div>
            </Link>
            <p className="text-white/60 mb-8 max-w-md">
              {language === "en"
                ? "We are not building an app. We are building a universe. A fully integrated, people-first universe designed to help you think, act, build, and grow."
                : "نحن لا نبني تطبيقًا. نحن نبني كونًا. كون متكامل بالكامل، يركز على الناس، مصمم لمساعدتك على التفكير والعمل والبناء والنمو."}
            </p>
          </div>

          <div className="md:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <FooterColumn title={t.products}>
                <FooterLink href="https://intelligence.bawes.net">{t.bawesIntelligenceTitle}</FooterLink>
                <FooterLink href="https://studenthub.co">{t.studentHubTitle}</FooterLink>
                <FooterLink href="https://plugn.io">{t.plugnTitle}</FooterLink>
                <FooterLink href="https://universe.bawes.net">{t.universePlatform}</FooterLink>
              </FooterColumn>

              <FooterColumn title={t.company}>
                <FooterLink href={`/${language}/join`}>{t.contact}</FooterLink>
              </FooterColumn>
            </div>
          </div>
        </div>

        <div className="pt-8 text-center text-white/40 text-sm">
          <p>
            © {new Date().getFullYear()} BAWES Universe. {t.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-white/90">{title}</h3>
      <ul className="space-y-3">{children}</ul>
    </div>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-white/60 hover:text-bawes-orange transition-colors inline-block relative group">
        <span>{children}</span>
        <span className="absolute -bottom-1 left-0 w-0 h-px bg-bawes-orange/30 transition-all duration-300 group-hover:w-full"></span>
      </Link>
    </li>
  )
}
