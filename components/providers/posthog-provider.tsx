"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { PostHogProvider as Provider } from "posthog-js/react"
import { getDistinctId, setDistinctId, clearDistinctId, isBrowser, isAnalyticsEnabled } from "@/lib/analytics"

// Track if we've already logged errors to prevent spam
const errorLog = new Set<string>()

const logOnce = (message: string, error?: any) => {
  if (!errorLog.has(message)) {
    errorLog.add(message)
    // Only log in development
    if (isBrowser() && window.location.hostname === "localhost") {
      console.warn(message, error)
    }
  }
}

// Create a simple analytics client that uses our proxy
const analyticsClient = {
  __loaded: true,

  // Capture events through our proxy
  capture: async (eventName: string, properties: any = {}) => {
    if (!isAnalyticsEnabled()) {
      return
    }

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)

      const response = await fetch("/api/analytics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event: eventName,
          properties,
          distinct_id: getDistinctId(),
          timestamp: new Date().toISOString(),
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        logOnce(`Analytics event failed: ${eventName}`)
      }
    } catch (error: any) {
      // Only log each error type once to prevent spam
      if (error.name === "AbortError") {
        logOnce("Analytics request timed out")
      } else {
        logOnce("Analytics error", error)
      }
    }
  },

  // Identify users
  identify: (id: string, properties: any = {}) => {
    if (!isAnalyticsEnabled()) return

    setDistinctId(id)
    analyticsClient.capture("$identify", {
      distinct_id: id,
      $set: properties,
    })
  },

  // Reset user
  reset: () => {
    clearDistinctId()
  },
}

// Only add to window in development for debugging
if (isBrowser() && window.location.hostname === "localhost") {
  // @ts-ignore
  window.posthog = analyticsClient
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const lastTrackedPath = useRef<string>("")

  // Track pageviews with debouncing
  useEffect(() => {
    if (!pathname || !isBrowser()) return

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

    // Track pageview with a small delay to batch multiple rapid navigation events
    const timeoutId = setTimeout(() => {
      analyticsClient.capture("$pageview", {
        $current_url: url,
      })
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [pathname, searchParams])

  return <Provider client={analyticsClient as any}>{children}</Provider>
}
