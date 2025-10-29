"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const lastTrackedPath = useRef<string>("")

  // Only run on client after hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Track pageviews only after mounted
  useEffect(() => {
    if (!mounted || !pathname) return

    // Only track in production
    if (typeof window === "undefined" || window.location.hostname === "localhost") {
      return
    }

    // Create URL
    let url = window.origin + pathname
    if (searchParams.toString()) {
      url = url + `?${searchParams.toString()}`
    }

    // Prevent tracking the same page multiple times
    if (lastTrackedPath.current === url) {
      return
    }

    lastTrackedPath.current = url

    // Track pageview with a small delay
    const timeoutId = setTimeout(() => {
      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "$pageview",
          properties: { $current_url: url },
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {
        // Silently fail
      })
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [mounted, pathname, searchParams])

  return <>{children}</>
}
