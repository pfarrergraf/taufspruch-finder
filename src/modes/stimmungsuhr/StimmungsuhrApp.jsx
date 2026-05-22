import { useMemo, useState } from 'react'
import { useInterview } from '../../context/InterviewContext'
import { useVerseFilter } from '../../hooks/useVerseFilter'
import ClockWheel from './ClockWheel'
import ResultStep from '../../components/interview/ResultStep'
import ShareStep from '../../components/interview/ShareStep'
import verses from '../../../data/verses.json'

export default function StimmungsuhrApp() {
  const { childName, setChildName, goToStep, toggleOrientation, reset } = useInterview()
  const [localSegments, setLocalSegments] = useState([])
  const [phase, setPhase] = useState('intro') // 'intro' | 'clock' | 'result' | 'share'
  const [nameInput, setNameInput] = useState(childName)
  const randomVerse = useMemo(() => verses[Math.floor(Math.random() * verses.length)], [])

  const filtered = useVerseFilter(
    verses,
    { categories: localSegments, traits: [] },
    ''
  )

  const handleSegmentToggle = (segmentId) => {
    setLocalSegments(prev =>
      prev.includes(segmentId)
        ? prev.filter(s => s !== segmentId)
        : prev.length < 3 ? [...prev, segmentId] : prev
    )
  }

  const handleToResult = () => {
    const preservedName = childName || nameInput
    reset()
    setTimeout(() => {
      if (preservedName) setChildName(preservedName)
      localSegments.forEach(id => toggleOrientation(id))
      goToStep(5)
      setPhase('result')
    }, 0)
  }

  const displayVerse = localSegments.length === 0
    ? randomVerse
    : (filtered[0] || null)

  if (phase === 'intro') return (
    <div className="step-card step-enter max-w-lg mx-auto text-center space-y-6">
      <div className="text-6xl">🕰️</div>
      <div>
        <h2 className="text-2xl font-bold text-baby-mint-500">Stimmungsuhr</h2>
        <p className="text-gray-500 text-sm mt-2 leading-relaxed">
          Tippe auf die Segmente der Uhr und wähle die Lebensthemen,
          die zu {childName || 'eurem Kind'} passen.
          Der passende Vers erscheint sofort im Zentrum.
        </p>
      </div>

      {!childName && (
        <div className="text-left">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Wie heißt euer Kind? <span className="text-baby-rose-400">*</span>
          </label>
          <input
            type="text"
            value={nameInput}
            onChange={e => setNameInput(e.target.value)}
            placeholder="z.B. Emma, Luca, Marie…"
            maxLength={30}
            autoFocus
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-baby-mint-400 focus:outline-none text-base transition-colors"
          />
        </div>
      )}

      <button
        onClick={() => {
          if (nameInput && !childName) setChildName(nameInput)
          setPhase('clock')
        }}
        disabled={!childName && !nameInput.trim()}
        className="w-full py-3.5 rounded-2xl bg-baby-mint-400 text-white font-bold hover:bg-baby-mint-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-soft"
      >
        Uhr öffnen →
      </button>
    </div>
  )

  if (phase === 'clock') return (
    <div className="step-enter space-y-4">
      <div className="step-card text-center space-y-1">
        <h2 className="text-lg font-bold text-baby-mint-500">
          Was wünscht ihr {childName}?
        </h2>
        <p className="text-xs text-gray-400">Tippe auf Segmente — max. 3 auswählbar</p>
      </div>

      <ClockWheel
        selectedSegments={localSegments}
        onToggle={handleSegmentToggle}
        currentVerse={displayVerse}
        totalFound={filtered.length}
      />

      <div className="flex gap-3">
        <button
          onClick={() => setPhase('intro')}
          className="px-5 py-3 rounded-2xl border-2 border-gray-200 text-gray-500 hover:border-gray-300 font-semibold transition-colors"
        >
          ← Zurück
        </button>
        <button
          onClick={handleToResult}
          disabled={filtered.length === 0}
          className="flex-1 py-3 rounded-2xl bg-baby-mint-400 text-white font-bold hover:bg-baby-mint-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-soft"
        >
          {filtered.length > 0 ? `${filtered.length} Verse anzeigen →` : 'Kein Thema gewählt'}
        </button>
      </div>
    </div>
  )

  if (phase === 'result') return (
    <div className="step-enter">
      <ResultStep />
    </div>
  )

  return <ShareStep />
}
