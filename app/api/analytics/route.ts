import { type NextRequest, NextResponse } from "next/server"

// In-memory store for deduplication (in production, use Redis or similar)
const recentEvents = new Map<string, number>()
const DEDUP_WINDOW = 1000 // 1 second

// Clean up old events periodically
setInterval(() => {
  const now = Date.now()
  for (const [key, timestamp] of recentEvents.entries()) {
    if (now - timestamp > DEDUP_WINDOW) {
      recentEvents.delete(key)
    }
  }
}, 5000) // Clean every 5 seconds

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event, properties, distinct_id, timestamp } = body

    // Create a deduplication key
    const dedupKey = `${distinct_id}_${event}_${JSON.stringify(properties)}`
    const now = Date.now()

    // Check if we've seen this event recently
    const lastSeen = recentEvents.get(dedupKey)
    if (lastSeen && now - lastSeen < DEDUP_WINDOW) {
      // Duplicate event, silently ignore
      return NextResponse.json({ success: true, deduplicated: true })
    }

    // Record this event
    recentEvents.set(dedupKey, now)

    // Only send to PostHog if we have the API key
    const apiKey = process.env.POSTHOG_API_KEY
    const host = process.env.POSTHOG_HOST || "https://us.i.posthog.com"

    if (apiKey) {
      // Forward to PostHog
      const response = await fetch(`${host}/capture/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: apiKey,
          event,
          properties: {
            ...properties,
            distinct_id,
            timestamp,
          },
        }),
      })

      if (!response.ok) {
        console.error("PostHog API error:", await response.text())
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Analytics API error:", error)
    return NextResponse.json({ error: "Failed to process analytics event" }, { status: 500 })
  }
}
