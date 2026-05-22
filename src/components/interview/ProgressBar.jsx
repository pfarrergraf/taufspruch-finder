import { useInterview } from '../../context/InterviewContext'

const STEPS = [
  { n: 1, label: 'Begrüßung',     icon: '👋' },
  { n: 2, label: 'Lebensweg',     icon: '🌿' },
  { n: 3, label: 'Eigenschaften', icon: '✨' },
  { n: 4, label: 'Suche',         icon: '🔍' },
  { n: 5, label: 'Verse',         icon: '📖' },
  { n: 6, label: 'Teilen',        icon: '💛' },
]

export default function ProgressBar() {
  const { step, goToStep } = useInterview()

  return (
    <nav aria-label="Interview-Fortschritt" className="no-print">
      {/* Mobile: compact */}
      <div className="flex items-center justify-between sm:hidden px-4 py-2 text-sm text-baby-mint-500 font-semibold">
        <span>{STEPS[step - 1].icon} {STEPS[step - 1].label}</span>
        <span className="text-gray-400">Schritt {step} von 6</span>
      </div>

      {/* Desktop: full steps */}
      <ol className="hidden sm:flex items-center justify-between">
        {STEPS.map(({ n, label, icon }) => {
          const past = n < step
          const active = n === step
          return (
            <li key={n} className="flex-1 flex flex-col items-center gap-1">
              <button
                onClick={() => past && goToStep(n)}
                disabled={!past}
                aria-current={active ? 'step' : undefined}
                aria-label={`Schritt ${n}: ${label}`}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-base transition-all
                  ${active ? 'bg-baby-mint-400 text-white shadow-card scale-110' : ''}
                  ${past ? 'bg-baby-mint-100 text-baby-mint-500 hover:bg-baby-mint-200 cursor-pointer' : ''}
                  ${!active && !past ? 'bg-gray-100 text-gray-300 cursor-default' : ''}
                `}
              >
                {past ? '✓' : icon}
              </button>
              <span className={`text-xs font-medium ${active ? 'text-baby-mint-500' : past ? 'text-baby-mint-400' : 'text-gray-300'}`}>
                {label}
              </span>
            </li>
          )
        })}
      </ol>

      {/* Progress line */}
      <div className="hidden sm:block h-1 bg-gray-100 rounded-full mt-2 mx-4">
        <div
          className="h-full bg-gradient-to-r from-baby-mint-300 to-baby-lavender-300 rounded-full transition-all duration-500"
          style={{ width: `${((step - 1) / 5) * 100}%` }}
        />
      </div>
    </nav>
  )
}
