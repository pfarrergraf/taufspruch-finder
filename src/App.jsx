import { useState, useEffect } from 'react'
import FilterPanel from './components/FilterPanel'
import SearchBar from './components/SearchBar'
import VerseList from './components/VerseList'
import FavoritesDrawer from './components/FavoritesDrawer'
import { TranslationProvider } from './context/TranslationContext'
import { useFavorites } from './hooks/useFavorites'
import { useDebounce } from './hooks/useDebounce'
import { useSemanticSearch } from './hooks/useSemanticSearch'
import verses from '../data/verses.json'

export default function App() {
  const [filters, setFilters] = useState({ categories: [], traits: [] })
  const [query, setQuery] = useState('')
  const [favOpen, setFavOpen] = useState(false)
  const [semanticMode, setSemanticMode] = useState(false)
  const { favorites, toggleFavorite, isFavorite } = useFavorites()
  const { results: semanticIds, loading: semanticLoading, available: apiAvailable, searchSemantic, clearResults } = useSemanticSearch()

  const debouncedQuery = useDebounce(query, 500)

  useEffect(() => {
    if (semanticMode && debouncedQuery.trim()) {
      searchSemantic(debouncedQuery)
    } else {
      clearResults()
    }
  }, [semanticMode, debouncedQuery, searchSemantic, clearResults])

  return (
    <TranslationProvider>
      <div className="min-h-screen bg-forest-50">
        <header className="bg-forest-700 text-white px-4 py-4 shadow-md">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <h1 className="text-xl font-serif font-semibold">Taufspruch Finder</h1>
            <button
              onClick={() => setFavOpen(true)}
              aria-label={`Favoriten öffnen (${favorites.length})`}
              className="relative p-2 rounded-full hover:bg-forest-600 transition-colors"
            >
              <span className="text-xl">♥</span>
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-400 text-forest-900 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {favorites.length}
                </span>
              )}
            </button>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
          <FilterPanel filters={filters} onChange={setFilters} />
          <div className="space-y-2">
            <SearchBar value={query} onChange={setQuery} />
            {apiAvailable && (
              <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={semanticMode}
                  onChange={(e) => setSemanticMode(e.target.checked)}
                  className="accent-forest-600"
                />
                KI-Suche aktivieren (semantisch, nicht nur Stichwort)
                {semanticLoading && <span className="text-forest-500 animate-pulse">…</span>}
              </label>
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
        </main>

        <FavoritesDrawer
          open={favOpen}
          onClose={() => setFavOpen(false)}
          favorites={favorites}
          allVerses={verses}
          onToggleFavorite={toggleFavorite}
        />
      </div>
    </TranslationProvider>
  )
}
