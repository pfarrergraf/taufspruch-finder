import { useInterview } from '../../context/InterviewContext'
import { TRAITS } from '../../utils/filterData'

export default function TraitsStep() {
  const { childName, traits, toggleTrait, customTrait, setCustomTrait, nextStep, prevStep } = useInterview()

  return (
    <div className="step-card step-enter space-y-6">
      <div>
        <h2 className="text-xl font-bold text-baby-mint-500 mb-1">
          Welche Eigenschaften wünscht ihr {childName || 'eurem Kind'}?
        </h2>
        <p className="text-sm text-gray-400">Wählt so viele ihr möchtet — oder lasst alles offen.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {TRAITS.map(trait => {
          const active = traits.includes(trait.id)
          return (
            <button
              key={trait.id}
              onClick={() => toggleTrait(trait.id)}
              aria-pressed={active}
              title={trait.description}
              className={`trait-chip flex items-center gap-1.5 px-4 py-2 rounded-full text-sm border-2 font-semibold transition-all
                ${active
                  ? 'bg-baby-rose-100 border-baby-rose-300 text-rose-700'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-baby-rose-200'}
              `}
            >
              <span>{trait.icon}</span>
              <span>{trait.label}</span>
            </button>
          )
        })}
      </div>

      {/* Freitext */}
      <div>
        <label htmlFor="customTrait" className="block text-sm font-semibold text-gray-700 mb-1">
          Noch eine eigene Eigenschaft hinzufügen?
        </label>
        <input
          id="customTrait"
          type="text"
          value={customTrait}
          onChange={e => setCustomTrait(e.target.value)}
          placeholder="z.B. Abenteuerlustig, Bodenständig…"
          maxLength={30}
          className="w-full px-4 py-2.5 rounded-xl border-2 border-dashed border-gray-200 focus:border-baby-rose-300 focus:outline-none text-sm transition-colors"
        />
      </div>

      {traits.length === 0 && !customTrait && (
        <p className="text-xs text-gray-400 text-center">
          💡 Keine Auswahl? Kein Problem — wir zeigen dann alle passenden Verse.
        </p>
      )}

      <div className="flex gap-3">
        <button onClick={prevStep} className="px-5 py-3 rounded-2xl border-2 border-gray-200 text-gray-500 hover:border-gray-300 font-semibold transition-colors">
          ← Zurück
        </button>
        <button
          onClick={nextStep}
          className="flex-1 py-3 rounded-2xl bg-baby-mint-400 text-white font-bold hover:bg-baby-mint-500 transition-all shadow-soft"
        >
          Weiter →
        </button>
      </div>
    </div>
  )
}
