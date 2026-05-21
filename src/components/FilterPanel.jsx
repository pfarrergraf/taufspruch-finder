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
        <h2 className="text-sm font-semibold text-forest-700 uppercase tracking-wide">
          Lebenseinstellungen
        </h2>
        {hasFilters && (
          <button
            onClick={reset}
            className="text-xs text-forest-500 hover:text-forest-700 underline"
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
                  ? 'border-forest-600 bg-forest-50 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-forest-300'
              }`}
            >
              <div className="text-lg mb-1">{icon}</div>
              <div className="text-sm font-semibold text-forest-800">{label}</div>
              <div className="text-xs text-gray-500 mt-0.5 leading-snug">{description}</div>
            </button>
          )
        })}
      </div>

      {/* Charaktereigenschaften-Chips */}
      <h2 className="text-sm font-semibold text-forest-700 uppercase tracking-wide mb-2">
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
                  ? 'bg-forest-600 border-forest-600 text-white font-medium'
                  : 'bg-white border-gray-200 text-forest-700 hover:border-forest-400'
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
