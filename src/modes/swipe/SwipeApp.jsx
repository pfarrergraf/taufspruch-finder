import { useCallback, useEffect, useState } from 'react'
import { useInterview } from '../../context/InterviewContext'
import { CATEGORIES, TRAITS } from '../../utils/filterData'
import SwipeCard from './SwipeCard'
import ResultStep from '../../components/interview/ResultStep'
import ShareStep from '../../components/interview/ShareStep'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildDeck() {
  const catCards = CATEGORIES.map(c => ({
    type: 'category', id: c.id, word: c.label, icon: c.icon, context: c.description,
  }))
  const traitCards = TRAITS.map(t => ({
    type: 'trait', id: t.id, word: t.label, icon: t.icon, context: t.description,
  }))
  return shuffle([...catCards, ...traitCards])
}

const MAX_CARDS = 10
const MAX_YES = 6

export default function SwipeApp() {
  const { childName, setChildName, goToStep, toggleOrientation, toggleTrait, reset } = useInterview()
  const [nameInput, setNameInput] = useState(childName)
  const [phase, setPhase] = useState('intro') // 'intro' | 'swipe' | 'reveal' | 'result' | 'share'
  const [deck, setDeck] = useState(() => buildDeck())
  const [cardIndex, setCardIndex] = useState(0)
  const [yesVotes, setYesVotes] = useState([])

  const applyVotesToInterview = useCallback((votes) => {
    const preservedName = childName || nameInput
    reset()
    setTimeout(() => {
      if (preservedName) setChildName(preservedName)
      votes.forEach(v => {
        if (v.type === 'category') toggleOrientation(v.id)
        if (v.type === 'trait') toggleTrait(v.id)
      })
      goToStep(5)
      setPhase('result')
    }, 0)
  }, [childName, goToStep, nameInput, reset, setChildName, toggleOrientation, toggleTrait])

  const handleSwipe = useCallback((direction) => {
    const card = deck[cardIndex]
    if (!card) {
      setDeck(buildDeck())
      setCardIndex(0)
      return
    }

    const newYesVotes = direction === 'right' ? [...yesVotes, card] : yesVotes
    const newIndex = cardIndex + 1

    if (newIndex >= deck.length && newYesVotes.length === 0) {
      setDeck(buildDeck())
      setCardIndex(0)
      return
    }

    setYesVotes(newYesVotes)
    setCardIndex(newIndex)

    const shouldReveal = newIndex >= MAX_CARDS || newYesVotes.length >= MAX_YES || newIndex >= deck.length
    if (shouldReveal) {
      setPhase('reveal')
      setTimeout(() => applyVotesToInterview(newYesVotes), 1800)
    }
  }, [applyVotesToInterview, cardIndex, deck, yesVotes])

  useEffect(() => {
    if (phase !== 'swipe') return undefined
    const handler = (e) => {
      if (e.key === 'ArrowRight') handleSwipe('right')
      if (e.key === 'ArrowLeft') handleSwipe('left')
      if (e.key === 'Enter') handleSwipe('right')
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [phase, handleSwipe])

  const handleSkipToResult = () => {
    applyVotesToInterview(yesVotes)
  }

  if (phase === 'intro') return (
    <div className="step-card step-enter max-w-lg mx-auto text-center space-y-6">
      <div className="text-6xl">👆</div>
      <div>
        <h2 className="text-2xl font-bold text-baby-mint-500">Swipe the Word</h2>
        <p className="text-gray-500 text-sm mt-2 leading-relaxed">
          Wische Karten nach rechts für Ja und links für Nein.
          Aus deinen Ja-Worten suchen wir den passenden Vers.
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
          setPhase('swipe')
        }}
        disabled={!childName && !nameInput.trim()}
        className="w-full py-3.5 rounded-2xl bg-baby-mint-400 text-white font-bold hover:bg-baby-mint-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-soft"
      >
        Los geht’s →
      </button>
    </div>
  )

  if (phase === 'swipe') {
    const progress = (cardIndex / Math.min(MAX_CARDS, deck.length)) * 100

    return (
      <div className="step-enter space-y-4">
        <div className="text-center space-y-1">
          <p className="text-sm text-gray-400">
            Karte {cardIndex + 1} von {Math.min(MAX_CARDS, deck.length)} · {yesVotes.length} Ja
          </p>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-baby-mint-400 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="relative mx-auto max-w-sm" style={{ height: 280 }}>
          {[2, 1, 0].map(offset => {
            const idx = cardIndex + offset
            if (idx >= deck.length || idx >= cardIndex + 3) return null
            return (
              <SwipeCard
                key={deck[idx].id}
                card={deck[idx]}
                stackIndex={offset}
                onSwipe={offset === 0 ? handleSwipe : () => {}}
              />
            )
          })}
        </div>

        <div className="flex items-center justify-center gap-6 pt-2">
          <button
            onClick={() => handleSwipe('left')}
            aria-label="Nein"
            className="w-14 h-14 rounded-full border-2 border-gray-300 text-xl hover:bg-gray-50 hover:border-gray-400 transition-colors"
          >
            ✗
          </button>
          <button
            onClick={handleSkipToResult}
            className="px-4 py-2 text-xs text-gray-400 hover:text-gray-600 underline transition-colors"
          >
            Zeig mir jetzt
          </button>
          <button
            onClick={() => handleSwipe('right')}
            aria-label="Ja"
            className="w-14 h-14 rounded-full border-2 border-green-400 text-xl hover:bg-green-50 hover:border-green-500 transition-colors"
          >
            ♥
          </button>
        </div>
      </div>
    )
  }

  if (phase === 'reveal') return (
    <div className="step-card step-enter max-w-lg mx-auto text-center space-y-6 py-10">
      <div className="text-5xl animate-bounce">✨</div>
      <h2 className="text-xl font-bold text-baby-mint-500">Wir suchen deinen Vers…</h2>
      <div className="flex flex-wrap gap-2 justify-center">
        {yesVotes.map((v, i) => (
          <span
            key={v.id}
            className="swipe-reveal-chip text-sm px-3 py-1 bg-baby-mint-50 border border-baby-mint-200 rounded-full text-baby-mint-600 font-semibold"
            style={{ animationDelay: `${i * 80}ms`, opacity: 0 }}
          >
            {v.icon} {v.word}
          </span>
        ))}
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
