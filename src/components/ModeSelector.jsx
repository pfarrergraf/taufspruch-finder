import { useState } from 'react'
import { useMode, MODES } from '../context/ModeContext'
import { useTheme, THEMES } from '../context/ThemeContext'
import { useInterview } from '../context/InterviewContext'

const EXPERIENCES = [
  { id: MODES.INTERVIEW_DEFAULT, icon: '🌿', label: 'Interview Standard', desc: 'Klassisch in 6 Schritten' },
  { id: MODES.INTERVIEW_AURORA,  icon: '✨', label: 'Interview Aurora',   desc: 'Glassmorphismus-Stil' },
  { id: MODES.STIMMUNGSUHR,      icon: '🕰️', label: 'Stimmungsuhr',      desc: 'Kreisförmige Auswahl' },
  { id: MODES.SWIPE,             icon: '👆', label: 'Swipe the Word',    desc: 'Wische Ja oder Nein' },
]

export default function ModeSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const { currentMode, setMode } = useMode()
  const { setTheme } = useTheme()
  const { goToStep } = useInterview()

  const handleSelect = (mode) => {
    setMode(mode)
    setTheme(mode === MODES.INTERVIEW_AURORA ? THEMES.AURORA : THEMES.DEFAULT)
    goToStep(1)
    setIsOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Erfahrung wählen"
        title="Erfahrung wählen"
        className="p-2 rounded-full hover:bg-white/20 transition-colors text-white/70 hover:text-white text-lg leading-none"
      >
        ⊞
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 max-w-sm w-full mx-4 shadow-card"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold text-gray-800 mb-4">Erfahrung wählen</h2>
            <div className="grid grid-cols-2 gap-3">
              {EXPERIENCES.map(exp => (
                <button
                  key={exp.id}
                  onClick={() => handleSelect(exp.id)}
                  aria-pressed={currentMode === exp.id}
                  className={`p-4 rounded-2xl border-2 text-left transition-all
                    ${currentMode === exp.id
                      ? 'border-baby-mint-400 bg-baby-mint-50 ring-2 ring-baby-mint-400 ring-offset-1'
                      : 'border-gray-200 hover:border-baby-mint-300 hover:bg-gray-50'
                    }`}
                >
                  <div className="text-2xl mb-1">{exp.icon}</div>
                  <div className="font-bold text-sm text-gray-800">{exp.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{exp.desc}</div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 w-full py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              Abbrechen
            </button>
          </div>
        </div>
      )}
    </>
  )
}
