import { useState } from 'react'
import { useInterview } from '../../context/InterviewContext'
import { CATEGORIES } from '../../utils/filterData'

export default function OrientationStep() {
  const { childName, orientations, toggleOrientation, nextStep, prevStep } = useInterview()
  const [tooltip, setTooltip] = useState(null)

  return (
    <div className="step-card step-enter space-y-6">
      <div>
        <h2 className="text-xl font-bold text-baby-mint-500 mb-1">
          Was wünscht ihr {childName || 'eurem Kind'} für ihr/sein Leben?
        </h2>
        <p className="text-sm text-gray-400">Wählt 1–3 Lebensthemen (ihr könnt mehrere auswählen)</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {CATEGORIES.map(cat => {
          const active = orientations.includes(cat.id)
          return (
            <div key={cat.id} className="relative">
              <button
                onClick={() => toggleOrientation(cat.id)}
                aria-pressed={active}
                className={`category-tile w-full text-left p-4 rounded-2xl border-2 transition-all
                  ${active
                    ? 'border-baby-mint-400 bg-baby-mint-50 shadow-soft'
                    : 'border-gray-200 bg-white hover:border-baby-mint-300'}
                `}
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <div className="font-bold text-sm text-gray-800 mb-0.5">{cat.label}</div>
                <div className="text-xs text-gray-500">{cat.description}</div>
                {active && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-baby-mint-400 flex items-center justify-center text-white text-xs">✓</div>
                )}
              </button>
              <button
                onClick={e => { e.stopPropagation(); setTooltip(tooltip === cat.id ? null : cat.id) }}
                aria-label={`Mehr über "${cat.label}" erfahren`}
                className="absolute bottom-3 right-3 w-5 h-5 rounded-full bg-gray-100 text-gray-400 text-xs hover:bg-baby-lavender-100 hover:text-baby-lavender-500 transition-colors flex items-center justify-center"
              >
                ?
              </button>
            </div>
          )
        })}
      </div>

      {/* Tooltip-Overlay */}
      {tooltip && (() => {
        const cat = CATEGORIES.find(c => c.id === tooltip)
        return (
          <div className="bg-baby-lavender-50 border border-baby-lavender-200 rounded-2xl p-4 text-sm text-gray-600 leading-relaxed">
            <span className="font-semibold text-baby-lavender-500">{cat.icon} {cat.label}:</span>{' '}
            {cat.extendedDescription}
          </div>
        )
      })()}

      <div className="flex gap-3">
        <button onClick={prevStep} className="px-5 py-3 rounded-2xl border-2 border-gray-200 text-gray-500 hover:border-gray-300 font-semibold transition-colors">
          ← Zurück
        </button>
        <button
          onClick={nextStep}
          disabled={orientations.length === 0}
          className="flex-1 py-3 rounded-2xl bg-baby-mint-400 text-white font-bold hover:bg-baby-mint-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-soft"
        >
          Weiter → {orientations.length > 0 && `(${orientations.length} gewählt)`}
        </button>
      </div>
    </div>
  )
}
