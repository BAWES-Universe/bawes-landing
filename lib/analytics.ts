// Safe way to check if we're in browser
export const isBrowser = () => typeof window !== "undefined"

// Safe way to get distinct ID
export const getDistinctId = (): string => {
  if (!isBrowser()) return "server-side"

  try {
    const stored = localStorage.getItem("distinct_id")
    if (stored) return stored

    // Generate new ID
    const newId = `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    localStorage.setItem("distinct_id", newId)
    return newId
  } catch {
    return `temp_${Date.now()}`
  }
}

// Safe way to set distinct ID
export const setDistinctId = (id: string): void => {
  if (!isBrowser()) return

  try {
    localStorage.setItem("distinct_id", id)
  } catch (error) {
    console.warn("Failed to set distinct_id:", error)
  }
}

// Safe way to clear distinct ID
export const clearDistinctId = (): void => {
  if (!isBrowser()) return

  try {
    localStorage.removeItem("distinct_id")
  } catch (error) {
    console.warn("Failed to clear distinct_id:", error)
  }
}

// Check if analytics is enabled (only in production)
export const isAnalyticsEnabled = (): boolean => {
  if (!isBrowser()) return false

  // Use a flag we can check safely on client
  try {
    return window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1"
  } catch {
    return false
  }
}
