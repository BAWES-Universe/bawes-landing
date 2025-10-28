"use client"

import { useCallback } from "react"
import { isAnalyticsEnabled } from "@/lib/analytics"

// Safe analytics hook that works on client only
export function useAnalytics() {
  const trackEvent = useCallback((eventName: string, properties?: Record<string, any>) => {
    if (!isAnalyticsEnabled()) return

    // Use the global posthog client if available
    if (typeof window !== "undefined" && (window as any).posthog) {
      ;(window as any).posthog.capture(eventName, properties)
    }
  }, [])

  const identifyUser = useCallback((userId: string, properties?: Record<string, any>) => {
    if (!isAnalyticsEnabled()) return

    if (typeof window !== "undefined" && (window as any).posthog) {
      ;(window as any).posthog.identify(userId, properties)
    }
  }, [])

  return {
    trackEvent,
    identifyUser,
  }
}
