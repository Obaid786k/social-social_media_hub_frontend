// Global API configuration with fallback to dummy data
const API_BASE_URL = import.meta.env.VITE_API_URL || null
const API_ENABLED = !!API_BASE_URL

console.log(`[API Service] API Status: ${API_ENABLED ? "CONNECTED to " + API_BASE_URL : "DISABLED - Using dummy data"}`)

export const apiCall = async (endpoint, options = {}) => {
  if (!API_ENABLED) {
    console.warn(`[API Service] API not configured. Skipping call to ${endpoint}`)
    return null
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`[API Service] Error calling ${endpoint}:`, error)
    return null
  }
}

export { API_ENABLED }
