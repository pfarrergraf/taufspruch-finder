import { useInterview } from '../../context/InterviewContext'
import { useSemanticSearch } from '../../hooks/useSemanticSearch'

const SUGGESTIONS = ['Schutz', 'Liebe', 'Mut', 'Frieden', 'Freude', 'Zukunft', 'Licht', 'Hoffnung', 'Stärke', 'Geborgenheit']

export default function SearchStep() {
  const { query, setQuery, semanticMode, setSemanticMode, nextStep, prevStep } = useInterview()
  const { available: apiAvailable } = useSemanticSearch()

  return (
    <div className="step-card step-enter space-y-6">
      <div>
        <h2 className="text-xl font-bold text-baby-mint-500 mb-1">
          Gibt es ein Thema, das euch besonders am Herzen liegt?
        </h2>
        <p className="text-sm text-gray-400">Optional — oder überspringt diesen Schritt einfach.</p>
      </div>

      <div className="relative">
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="z.B. Vertrauen, Geborgenheit, Licht…"
          className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-baby-sky-400 focus:outline-none text-base transition-colors"
        />
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
      </div>

      {/* Vorschlags-Chips */}
      <div>
        <p className="text-xs text-gray-400 mb-2">Oder wähle ein Thema:</p>
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map(s => (
            <button
              key={s}
              onClick={() => setQuery(s)}
              aria-pressed={query === s}
              className={`px-3 py-1.5 rounded-full text-sm border transition-colors
                ${query === s
                  ? 'bg-baby-sky-100 border-baby-sky-400 text-baby-sky-500 font-semibold'
                  : 'bg-white border-gray-200 text-gray-500 hover:border-baby-sky-300'}
              `}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {apiAvailable && (
        <label className="flex items-center gap-3 p-3 bg-baby-lavender-50 rounded-xl cursor-pointer">
          <input
            type="checkbox"
            checked={semanticMode}
            onChange={e => setSemanticMode(e.target.checked)}
            className="w-4 h-4 accent-baby-lavender-400"
          />
          <div>
            <div className="text-sm font-semibold text-baby-lavender-500">KI-Suche aktivieren</div>
            <div className="text-xs text-gray-400">Findet auch sinnverwandte Verse, nicht nur Stichworte</div>
          </div>
        </label>
      )}

      <div className="flex gap-3">
        <button onClick={prevStep} className="px-5 py-3 rounded-2xl border-2 border-gray-200 text-gray-500 hover:border-gray-300 font-semibold transition-colors">
          ← Zurück
        </button>
        <button
          onClick={nextStep}
          className="flex-1 py-3 rounded-2xl bg-baby-mint-400 text-white font-bold hover:bg-baby-mint-500 transition-all shadow-soft"
        >
          {query ? 'Suchen & Verse zeigen →' : 'Alle Verse zeigen →'}
        </button>
      </div>

      <button onClick={nextStep} className="w-full py-3 text-xs text-gray-400 hover:text-gray-600 underline">
        Diesen Schritt überspringen
      </button>
    </div>
  )
}
