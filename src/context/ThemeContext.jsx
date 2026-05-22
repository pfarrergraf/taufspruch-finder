import { createContext, useContext, useState, useEffect } from 'react'

export const THEMES = {
  DEFAULT: 'default',
  AURORA:  'aurora',
}

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentThemeState] = useState(
    () => localStorage.getItem('tf-theme') || THEMES.DEFAULT
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme)
  }, [currentTheme])

  const setTheme = (theme) => {
    setCurrentThemeState(theme)
    localStorage.setItem('tf-theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
