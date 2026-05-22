import { useInterview } from '../../context/InterviewContext'

export default function WelcomeStep() {
  const { childName, setChildName, parentWish, setParentWish, nextStep } = useInterview()

  return (
    <div className="step-card step-enter max-w-lg mx-auto text-center space-y-6">
      <div className="text-6xl">🕯️</div>
      <div>
        <h1 className="text-2xl font-bold text-baby-mint-500 mb-2">
          Willkommen beim Taufspruch-Finder
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          In wenigen Schritten findet ihr den Bibelvers, der zu eurem Kind und euren Wünschen passt.
          Nehmt euch einen Moment — es lohnt sich.
        </p>
      </div>

      <div className="text-left space-y-4">
        <div>
          <label htmlFor="childName" className="block text-sm font-semibold text-gray-700 mb-1">
            Wie heißt euer Kind? <span className="text-baby-rose-400">*</span>
          </label>
          <input
            id="childName"
            type="text"
            value={childName}
            onChange={e => setChildName(e.target.value)}
            placeholder="z.B. Emma, Luca, Marie…"
            maxLength={30}
            autoFocus
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-baby-mint-400 focus:outline-none text-base transition-colors"
          />
        </div>

        <div>
          <label htmlFor="parentWish" className="block text-sm font-semibold text-gray-700 mb-1">
            Was wünscht ihr eurem Kind für sein Leben?
            <span className="text-gray-400 font-normal ml-1">(optional)</span>
          </label>
          <textarea
            id="parentWish"
            value={parentWish}
            onChange={e => setParentWish(e.target.value)}
            placeholder="z.B. Glück, Geborgenheit, den Mut eigene Wege zu gehen…"
            maxLength={200}
            rows={3}
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-baby-mint-400 focus:outline-none text-sm transition-colors resize-none"
          />
        </div>
      </div>

      <button
        onClick={nextStep}
        disabled={!childName.trim()}
        className="w-full py-3.5 rounded-2xl bg-baby-mint-400 text-white font-bold text-base
          hover:bg-baby-mint-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all
          shadow-soft hover:shadow-card"
      >
        Weiter →
      </button>
    </div>
  )
}
