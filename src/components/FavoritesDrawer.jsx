import { useEffect } from 'react'
import { useTranslation } from '../context/TranslationContext'

export default function FavoritesDrawer({ open, onClose, favorites, allVerses, onToggleFavorite }) {
  const { translation } = useTranslation()
  const favVerses = allVerses.filter((v) => favorites.includes(v.id))

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 transition-opacity"
          onClick={onClose}
          aria-hidden
        />
      )}

      {/* Drawer */}
      <aside
        role="dialog"
        aria-label="Meine Favoriten"
        aria-modal="true"
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-40 shadow-2xl transition-transform duration-300 flex flex-col ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <h2 className="font-serif font-semibold text-forest-800 text-lg">
            Meine Favoriten ({favVerses.length})
          </h2>
          <button
            onClick={onClose}
            aria-label="Favoriten schließen"
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
          >
            ✕
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {favVerses.length === 0 ? (
            <p className="text-center text-gray-400 text-sm mt-8">
              Noch keine Favoriten gespeichert.<br />
              Klicke auf ♡, um Verse zu merken.
            </p>
          ) : (
            favVerses.map((verse) => (
              <div key={verse.id} className="bg-parchment-50 rounded-xl p-3 border border-parchment-200">
                <blockquote className="verse-text text-forest-900 text-sm leading-relaxed mb-2">
                  „{verse.translations[translation]}“
                </blockquote>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-forest-600 font-semibold">
                    {verse.book} {verse.chapter},{verse.verse}
                  </span>
                  <button
                    onClick={() => onToggleFavorite(verse.id)}
                    aria-label="Aus Favoriten entfernen"
                    className="text-xs text-rose-400 hover:text-rose-600"
                  >
                    Entfernen
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </aside>
    </>
  )
}
