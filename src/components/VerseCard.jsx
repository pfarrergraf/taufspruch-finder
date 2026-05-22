import { useState } from 'react'
import { useTranslation, TRANSLATIONS } from '../context/TranslationContext'
import ShareButton from './ShareButton'

export default function VerseCard({ verse, isFavorite, onToggleFavorite }) {
  const { translation } = useTranslation()
  const [localTranslation, setLocalTranslation] = useState(translation)

  const text = verse.translations[localTranslation]
  const ref = `${verse.book} ${verse.chapter},${verse.verse}`
  const fav = isFavorite(verse.id)

  return (
    <article
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-3"
      aria-label={`Vers ${ref}`}
    >
      {/* Vers-Text */}
      <blockquote className="verse-text text-gray-800 text-base leading-relaxed">
        {'„'}{text}{'“'}
      </blockquote>

      {/* Referenz */}
      <p className="text-sm text-baby-mint-500 font-semibold">{ref}</p>

      {/* Tooltip */}
      {verse.tooltip && (
        <details className="text-xs text-gray-500 leading-relaxed">
          <summary className="cursor-pointer text-baby-lavender-400 font-semibold hover:text-baby-lavender-500">
            Bedeutung &#9660;
          </summary>
          <p className="mt-1 pl-2 border-l-2 border-baby-lavender-200">{verse.tooltip}</p>
        </details>
      )}

      {/* Übersetzungs-Toggle */}
      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Übersetzung wählen">
        {Object.entries(TRANSLATIONS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setLocalTranslation(key)}
            aria-pressed={localTranslation === key}
            className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
              localTranslation === key
                ? 'bg-baby-mint-500 text-white border-baby-mint-500'
                : 'bg-white text-gray-500 border-gray-200 hover:border-baby-mint-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Aktions-Buttons */}
      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={() => onToggleFavorite(verse.id)}
          aria-label={fav ? 'Aus Favoriten entfernen' : 'Zu Favoriten hinzufügen'}
          aria-pressed={fav}
          className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full border transition-all ${
            fav
              ? 'bg-rose-50 border-rose-300 text-rose-600'
              : 'bg-white border-gray-200 text-gray-500 hover:border-rose-300 hover:text-rose-500'
          }`}
        >
          {fav ? '♥' : '♡'} {fav ? 'Gespeichert' : 'Merken'}
        </button>
        <ShareButton text={text} reference={ref} />
      </div>
    </article>
  )
}
