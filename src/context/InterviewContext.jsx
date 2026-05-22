import { createContext, useContext, useState, useCallback } from 'react'
import { useFavorites } from '../hooks/useFavorites'

const InterviewContext = createContext(null)

export function InterviewProvider({ children }) {
  const [step, setStep] = useState(1)
  const [childName, setChildName] = useState('')
  const [parentWish, setParentWish] = useState('')
  const [orientations, setOrientations] = useState([])
  const [traits, setTraits] = useState([])
  const [customTrait, setCustomTrait] = useState('')
  const [query, setQuery] = useState('')
  const [semanticMode, setSemanticMode] = useState(false)
  const { favorites, toggleFavorite, isFavorite } = useFavorites()

  const nextStep = useCallback(() => setStep(s => Math.min(s + 1, 6)), [])
  const prevStep = useCallback(() => setStep(s => Math.max(s - 1, 1)), [])
  const goToStep = useCallback((n) => setStep(n), [])

  const toggleOrientation = useCallback((id) => {
    setOrientations(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }, [])

  const toggleTrait = useCallback((id) => {
    setTraits(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }, [])

  const reset = useCallback(() => {
    setStep(1)
    setChildName('')
    setParentWish('')
    setOrientations([])
    setTraits([])
    setCustomTrait('')
    setQuery('')
    setSemanticMode(false)
  }, [])

  return (
    <InterviewContext.Provider value={{
      step, nextStep, prevStep, goToStep,
      childName, setChildName,
      parentWish, setParentWish,
      orientations, toggleOrientation,
      traits, toggleTrait,
      customTrait, setCustomTrait,
      query, setQuery,
      semanticMode, setSemanticMode,
      favorites, toggleFavorite, isFavorite,
      reset,
    }}>
      {children}
    </InterviewContext.Provider>
  )
}

export function useInterview() {
  const ctx = useContext(InterviewContext)
  if (!ctx) throw new Error('useInterview must be used inside InterviewProvider')
  return ctx
}
