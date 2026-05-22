import { createContext, useContext, useState } from 'react'

export const MODES = {
  INTERVIEW_DEFAULT: 'interview-default',
  INTERVIEW_AURORA:  'interview-aurora',
  STIMMUNGSUHR:      'stimmungsuhr',
  SWIPE:             'swipe',
}

const ModeContext = createContext(null)

export function ModeProvider({ children }) {
  const [currentMode, setCurrentModeState] = useState(
    () => localStorage.getItem('tf-mode') || MODES.INTERVIEW_DEFAULT
  )

  const setMode = (mode) => {
    setCurrentModeState(mode)
    localStorage.setItem('tf-mode', mode)
  }

  return (
    <ModeContext.Provider value={{ currentMode, setMode }}>
      {children}
    </ModeContext.Provider>
  )
}

export function useMode() {
  const ctx = useContext(ModeContext)
  if (!ctx) throw new Error('useMode must be used inside ModeProvider')
  return ctx
}
