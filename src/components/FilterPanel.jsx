import { CATEGORIES, TRAITS } from '../utils/filterData'

export default function FilterPanel({ filters, onChange }) {
  const toggle = (group, value) => {
    const current = filters[group]
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    onChange({ ...filters, [group]: next })
  }

  const reset = () => onChange({ categories: [], traits: [] })
  const hasFilters = filters.categories.length > 0 || filters.traits.length > 0

  return (
    <section aria-label="Filter">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-baby-mint-400 uppercase tracking-wide">
          Lebenseinstellungen
        </h2>
        {hasFilters && (
          <button
            onClick={reset}
            className="text-xs text-baby-mint-400 hover:text-baby-mint-400 underline"
          >
            Zurücksetzen
          </button>
        )}
      </div>

      {/* Kategorie-Kacheln */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
        {CATEGORIES.map(({ id, label, icon, description }) => {
          const active = filters.categories.includes(id)
          return (
            <button
              key={id}
              onClick={() => toggle('categories', id)}
              aria-pressed={active}
              className={`text-left p-3 rounded-xl border-2 transition-all ${
                active
                  ? 'border-baby-mint-500 bg-baby-mint-50 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-baby-mint-300'
              }`}
            >
              <div className="text-lg mb-1">{icon}</div>
              <div className="text-sm font-semibold text-baby-mint-500">{label}</div>
              <div className="text-xs text-gray-500 mt-0.5 leading-snug">{description}</div>
            </button>
          )
        })}
      </div>

      {/* Charaktereigenschaften-Chips */}
      <h2 className="text-sm font-semibold text-baby-mint-400 uppercase tracking-wide mb-2">
        Charaktereigenschaften
      </h2>
      <div className="flex flex-wrap gap-2">
        {TRAITS.map(({ id, label, icon }) => {
          const active = filters.traits.includes(id)
          return (
            <button
              key={id}
              onClick={() => toggle('traits', id)}
              aria-pressed={active}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-all ${
                active
                  ? 'bg-baby-mint-500 border-baby-mint-500 text-white font-medium'
                  : 'bg-white border-gray-200 text-baby-mint-400 hover:border-baby-mint-400'
              }`}
            >
              <span>{icon}</span>
              <span>{label}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
