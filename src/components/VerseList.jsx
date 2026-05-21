import { useMemo } from 'react'
import { useVerseFilter } from '../hooks/useVerseFilter'
import { useDebounce } from '../hooks/useDebounce'
import VerseCard from './VerseCard'

export default function VerseList({ verses, filters, query, semanticIds, isFavorite, onToggleFavorite }) {
  const debouncedQuery = useDebounce(query, 300)
  const keywordFiltered = useVerseFilter(verses, filters, debouncedQuery)

  const filtered = useMemo(() => {
    if (semanticIds) {
      const byId = Object.fromEntries(verses.map((v) => [v.id, v]))
      const semantic = semanticIds
        .map((id) => byId[id])
        .filter(Boolean)
      if (filters.categories.length > 0 || filters.traits.length > 0) {
        return semantic.filter(
          (v) =>
            (filters.categories.length === 0 || filters.categories.some((c) => v.categories.includes(c))) &&
            (filters.traits.length === 0 || filters.traits.some((t) => v.traits.includes(t)))
        )
      }
      return semantic
    }
    return keywordFiltered
  }, [semanticIds, keywordFiltered, verses, filters])

  if (filtered.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400" aria-live="polite">
        <div className="text-4xl mb-3">📖</div>
        <p className="text-sm">Keine Verse gefunden.</p>
        <p className="text-xs mt-1">Probiere andere Filter oder Suchbegriffe.</p>
      </div>
    )
  }

  return (
    <section aria-live="polite" aria-label={`${filtered.length} Vers${filtered.length !== 1 ? 'e' : ''} gefunden`}>
      <p className="text-xs text-gray-400 mb-3">
        {filtered.length} Vers{filtered.length !== 1 ? 'e' : ''}
        {semanticIds ? ' (KI-Suche)' : ' gefunden'}
      </p>
      <div className="space-y-4">
        {filtered.map((verse) => (
          <VerseCard
            key={verse.id}
            verse={verse}
            isFavorite={isFavorite}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </section>
  )
}
