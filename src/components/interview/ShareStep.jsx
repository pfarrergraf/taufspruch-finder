import { useInterview } from '../../context/InterviewContext'
import { useTranslation } from '../../context/TranslationContext'
import verses from '../../../data/verses.json'
import ShareButton from '../ShareButton'

export default function ShareStep() {
  const { childName, favorites, toggleFavorite, isFavorite, reset, prevStep } = useInterview()
  const { translation } = useTranslation()

  const favVerses = verses.filter(v => favorites.includes(v.id))
  const displayVerses = favVerses.length > 0
    ? favVerses
    : verses.slice(0, 5)

  const allText = displayVerses
    .map(v => `„${v.translations[translation]}“ — ${v.book} ${v.chapter},${v.verse}`)
    .join('\n\n')

  const handlePrint = () => window.print()

  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(allText)
    } catch {
      // silent fail
    }
  }

  return (
    <div className="step-enter space-y-6">
      <div className="step-card text-center space-y-2">
        <div className="text-5xl">💛</div>
        <h2 className="text-xl font-bold text-baby-mint-500">
          Eure Auswahl für {childName || 'das Taufkind'}
        </h2>
        <p className="text-sm text-gray-400">
          Alles Gute zur Taufe — möge {childName || 'euer Kind'} von diesen Worten begleitet werden.
        </p>
      </div>

      {/* Vers-Liste */}
      <div className="space-y-3">
        {displayVerses.map(verse => (
          <div key={verse.id} className="bg-white rounded-2xl shadow-soft border border-gray-100 p-4">
            <blockquote className="verse-text text-gray-800 text-sm leading-relaxed mb-2">
              „{verse.translations[translation]}“
            </blockquote>
            <div className="flex items-center justify-between">
              <span className="text-xs text-baby-mint-500 font-semibold">
                {verse.book} {verse.chapter},{verse.verse}
              </span>
              <div className="flex items-center gap-2">
                <ShareButton text={verse.translations[translation]} reference={`${verse.book} ${verse.chapter},${verse.verse}`} />
                <button
                  onClick={() => toggleFavorite(verse.id)}
                  aria-label={isFavorite(verse.id) ? 'Aus Favoriten entfernen' : 'Zu Favoriten hinzufügen'}
                  aria-pressed={isFavorite(verse.id)}
                  className={`text-sm px-2 py-1 rounded-full border transition-colors
                    ${isFavorite(verse.id) ? 'text-rose-500 border-rose-200 bg-rose-50' : 'text-gray-400 border-gray-200'}
                  `}
                >
                  {isFavorite(verse.id) ? '♥' : '♡'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Aktions-Buttons */}
      <div className="step-card no-print space-y-3">
        <p className="text-sm font-semibold text-gray-700">Verse teilen oder speichern:</p>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleCopyAll}
            className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-gray-200 text-sm text-gray-600 hover:border-baby-mint-300 hover:text-baby-mint-500 transition-colors font-semibold"
          >
            📋 Alle kopieren
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-gray-200 text-sm text-gray-600 hover:border-baby-sky-300 hover:text-baby-sky-500 transition-colors font-semibold"
          >
            🖨️ Drucken
          </button>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(allText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-gray-200 text-sm text-gray-600 hover:border-green-300 hover:text-green-600 transition-colors font-semibold"
          >
            💬 WhatsApp
          </a>
          <a
            href={`mailto:?subject=${encodeURIComponent(`Taufspruch für ${childName}`)}&body=${encodeURIComponent(allText)}`}
            className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-gray-200 text-sm text-gray-600 hover:border-baby-sky-300 hover:text-baby-sky-500 transition-colors font-semibold"
          >
            ✉️ E-Mail
          </a>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 no-print">
        <button onClick={prevStep} className="px-5 py-3 rounded-2xl border-2 border-gray-200 text-gray-500 hover:border-gray-300 font-semibold transition-colors">
          ← Zurück
        </button>
        <button
          onClick={reset}
          className="flex-1 py-3 rounded-2xl bg-baby-lavender-300 text-white font-bold hover:bg-baby-lavender-400 transition-all shadow-soft"
        >
          🔄 Neu beginnen
        </button>
      </div>
    </div>
  )
}
