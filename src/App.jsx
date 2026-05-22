import { useState } from 'react'
import { TranslationProvider } from './context/TranslationContext'
import { InterviewProvider, useInterview } from './context/InterviewContext'
import { ModeProvider, useMode, MODES } from './context/ModeContext'
import { ThemeProvider } from './context/ThemeContext'
import ModeSelector from './components/ModeSelector'
import ProgressBar from './components/interview/ProgressBar'
import WelcomeStep from './components/interview/WelcomeStep'
import OrientationStep from './components/interview/OrientationStep'
import TraitsStep from './components/interview/TraitsStep'
import SearchStep from './components/interview/SearchStep'
import ResultStep from './components/interview/ResultStep'
import ShareStep from './components/interview/ShareStep'
import FavoritesDrawer from './components/FavoritesDrawer'
import StimmungsuhrApp from './modes/stimmungsuhr/StimmungsuhrApp'
import SwipeApp from './modes/swipe/SwipeApp'
import verses from '../data/verses.json'

const INTERVIEW_STEPS = [null, WelcomeStep, OrientationStep, TraitsStep, SearchStep, ResultStep, ShareStep]

function AppShell() {
  const { step, favorites, toggleFavorite } = useInterview()
  const { currentMode } = useMode()
  const [favOpen, setFavOpen] = useState(false)

  const isInterviewMode = currentMode === MODES.INTERVIEW_DEFAULT || currentMode === MODES.INTERVIEW_AURORA
  const InterviewStepComponent = isInterviewMode ? INTERVIEW_STEPS[step] : null

  return (
    <>
      <header className="bg-gradient-to-r from-baby-mint-400 to-baby-lavender-300 text-white px-4 py-4 shadow-soft no-print">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold font-sans">🕯️ Taufspruch-Finder</h1>
            <p className="text-xs text-white/70">Den richtigen Vers für euer Kind</p>
          </div>
          <div className="flex items-center gap-1">
            <ModeSelector />
            <button
              onClick={() => setFavOpen(true)}
              aria-label={`Favoriten öffnen (${favorites.length})`}
              className="relative p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <span className="text-xl">♥</span>
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-baby-rose-300 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {favorites.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {isInterviewMode && step > 1 && (
        <div className="max-w-2xl mx-auto px-4 pt-4 no-print">
          <ProgressBar />
        </div>
      )}

      <main className="max-w-2xl mx-auto px-4 py-6">
        {isInterviewMode && InterviewStepComponent && <InterviewStepComponent />}
        {currentMode === MODES.STIMMUNGSUHR && <StimmungsuhrApp />}
        {currentMode === MODES.SWIPE && <SwipeApp />}
      </main>

      <FavoritesDrawer
        open={favOpen}
        onClose={() => setFavOpen(false)}
        favorites={favorites}
        allVerses={verses}
        onToggleFavorite={toggleFavorite}
      />
    </>
  )
}

export default function App() {
  return (
    <TranslationProvider>
      <ThemeProvider>
        <ModeProvider>
          <InterviewProvider>
            <div className="min-h-screen">
              <AppShell />
            </div>
          </InterviewProvider>
        </ModeProvider>
      </ThemeProvider>
    </TranslationProvider>
  )
}
