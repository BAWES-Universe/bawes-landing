"use client"

import { useCallback } from "react"
import { trackEvent as trackEventLib } from "@/lib/analytics"

// Safe analytics hook that works on client only
export function useAnalytics() {
  const trackEvent = useCallback((eventName: string, properties?: Record<string, any>) => {
    trackEventLib(eventName, properties || {})
  }, [])

  const identifyUser = useCallback((userId: string, properties?: Record<string, any>) => {
    if (typeof window === "undefined") return

    // Track identify event
    trackEventLib("$identify", {
      distinct_id: userId,
      $set: properties,
    })
  }, [])

  return {
    trackEvent,
    identifyUser,
  }
}
