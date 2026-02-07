import { createContext, useContext, useState, useEffect } from 'react'

const STORAGE_KEY = 'valentines-timeline-theme'

const defaultTheme = {
  accentColor: '#ec4899',
  fontFamily: 'serif',
  backgroundTheme: 'gradient-rose',
}

const TimelineThemeContext = createContext(null)

export function TimelineThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? { ...defaultTheme, ...JSON.parse(saved) } : defaultTheme
    } catch {
      return defaultTheme
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(theme))
    } catch (e) {
      console.warn('Could not save theme', e)
    }
  }, [theme])

  const setTheme = (updates) => setThemeState((prev) => ({ ...prev, ...updates }))

  return (
    <TimelineThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </TimelineThemeContext.Provider>
  )
}

export function useTimelineTheme() {
  const ctx = useContext(TimelineThemeContext)
  if (!ctx) throw new Error('useTimelineTheme must be used within TimelineThemeProvider')
  return ctx
}
