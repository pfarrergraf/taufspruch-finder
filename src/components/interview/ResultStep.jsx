import { useEffect } from 'react'
import { useInterview } from '../../context/InterviewContext'
import { useSemanticSearch } from '../../hooks/useSemanticSearch'
import { useDebounce } from '../../hooks/useDebounce'
import VerseList from '../VerseList'
import verses from '../../../data/verses.json'

export default function ResultStep() {
  const {
    childName, orientations, traits, query, semanticMode,
    favorites, toggleFavorite, isFavorite,
    nextStep, prevStep, goToStep,
  } = useInterview()

  const { results: semanticIds, loading: semanticLoading, searchSemantic, clearResults } = useSemanticSearch()
  const debouncedQuery = useDebounce(query, 500)

  useEffect(() => {
    if (semanticMode && debouncedQuery.trim()) {
      searchSemantic(debouncedQuery)
    } else {
      clearResults()
    }
  }, [semanticMode, debouncedQuery, searchSemantic, clearResults])

  const filters = {
    categories: orientations,
    traits: traits,
  }

  return (
    <div className="step-enter space-y-4">
      <div className="step-card">
        <h2 className="text-xl font-bold text-baby-mint-500 mb-1">
          {childName ? `Für ${childName} haben wir gefunden:` : 'Passende Taufverse'}
        </h2>
        {favorites.length > 0 && (
          <p className="text-sm text-baby-rose-400 font-semibold">
            ♥ {favorites.length} Vers{favorites.length !== 1 ? 'e' : ''} gemerkt
          </p>
        )}
        {semanticLoading && (
          <p className="text-xs text-baby-lavender-400 animate-pulse">KI sucht…</p>
        )}
      </div>

      <VerseList
        verses={verses}
        filters={filters}
        query={semanticMode ? '' : query}
        semanticIds={semanticMode ? semanticIds : null}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
      />

      <div className="step-card flex gap-3 no-print">
        <button onClick={prevStep} className="px-5 py-3 rounded-2xl border-2 border-gray-200 text-gray-500 hover:border-gray-300 font-semibold transition-colors">
          ← Zurück
        </button>
        <button
          onClick={() => goToStep(2)}
          className="px-4 py-3 rounded-2xl border-2 border-baby-mint-200 text-baby-mint-500 hover:bg-baby-mint-50 font-semibold transition-colors text-sm"
        >
          Filter anpassen
        </button>
        <button
          onClick={nextStep}
          className="flex-1 py-3 rounded-2xl bg-baby-rose-300 text-white font-bold hover:bg-baby-rose-400 transition-all shadow-soft"
        >
          Zu meinen Favoriten →
        </button>
      </div>
    </div>
  )
}
