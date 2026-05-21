import { createContext, useContext, useState } from 'react'

const TranslationContext = createContext()

export const TRANSLATIONS = {
  luther2017: 'Lutherbibel 2017',
  gute_nachricht: 'Gute Nachricht',
  elberfelder: 'Elberfelder',
}

export function TranslationProvider({ children }) {
  const [translation, setTranslation] = useState('luther2017')
  return (
    <TranslationContext.Provider value={{ translation, setTranslation, TRANSLATIONS }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  return useContext(TranslationContext)
}
