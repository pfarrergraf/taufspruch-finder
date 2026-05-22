import { CATEGORIES } from '../../utils/filterData'

const CX = 150
const CY = 150
const OUTER_R = 120
const INNER_R = 52
const LABEL_R = (OUTER_R + INNER_R) / 2

const SEGMENT_COLORS = {
  'von-guten-maechten-geborgen': { idle: '#f0fdf9', active: '#2dd4bf', stroke: '#14b8a6', text: '#0f766e' },
  'mit-sich-anderen-im-reinen':  { idle: '#faf5ff', active: '#d8b4fe', stroke: '#a855f7', text: '#7e22ce' },
  'einen-unterschied-machen':    { idle: '#fff1f3', active: '#ffc8d0', stroke: '#f43f5e', text: '#be123c' },
  'auf-festem-fundament':        { idle: '#f0f9ff', active: '#7dcffd', stroke: '#0ea5e9', text: '#0369a1' },
  'von-liebe-umgeben':           { idle: '#fffbf0', active: '#ffd97a', stroke: '#d97706', text: '#92400e' },
  'in-weitem-raum-leben':        { idle: '#f0fdf9', active: '#86efac', stroke: '#22c55e', text: '#15803d' },
}

function toRad(deg) {
  return (deg - 90) * Math.PI / 180
}

function segmentPath(startAngle, endAngle) {
  const x1 = CX + OUTER_R * Math.cos(toRad(startAngle))
  const y1 = CY + OUTER_R * Math.sin(toRad(startAngle))
  const x2 = CX + OUTER_R * Math.cos(toRad(endAngle))
  const y2 = CY + OUTER_R * Math.sin(toRad(endAngle))
  const x3 = CX + INNER_R * Math.cos(toRad(endAngle))
  const y3 = CY + INNER_R * Math.sin(toRad(endAngle))
  const x4 = CX + INNER_R * Math.cos(toRad(startAngle))
  const y4 = CY + INNER_R * Math.sin(toRad(startAngle))
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  return [
    `M ${x1.toFixed(2)} ${y1.toFixed(2)}`,
    `A ${OUTER_R} ${OUTER_R} 0 ${largeArc} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`,
    `L ${x3.toFixed(2)} ${y3.toFixed(2)}`,
    `A ${INNER_R} ${INNER_R} 0 ${largeArc} 0 ${x4.toFixed(2)} ${y4.toFixed(2)}`,
    'Z',
  ].join(' ')
}

function labelPos(startAngle, endAngle) {
  const mid = (startAngle + endAngle) / 2
  return {
    x: CX + LABEL_R * Math.cos(toRad(mid)),
    y: CY + LABEL_R * Math.sin(toRad(mid)),
  }
}

export default function ClockWheel({ selectedSegments, onToggle, currentVerse, totalFound }) {
  const segmentAngle = 360 / CATEGORIES.length

  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        viewBox="0 0 300 300"
        className="w-full max-w-xs mx-auto"
        aria-label="Stimmungsuhr: Wähle Lebensthemen"
        role="group"
      >
        {CATEGORIES.map((cat, i) => {
          const startAngle = i * segmentAngle
          const endAngle = startAngle + segmentAngle - 1.5 // kleiner Spalt
          const isActive = selectedSegments.includes(cat.id)
          const colors = SEGMENT_COLORS[cat.id] || { idle: '#f3f4f6', active: '#9ca3af', stroke: '#6b7280', text: '#374151' }
          const pos = labelPos(startAngle, endAngle)

          return (
            <g key={cat.id}>
              <path
                d={segmentPath(startAngle, endAngle)}
                fill={isActive ? colors.active : colors.idle}
                stroke={colors.stroke}
                strokeWidth={isActive ? 2.5 : 1.5}
                style={{ cursor: 'pointer', transition: 'fill 0.2s ease' }}
                onClick={() => onToggle(cat.id)}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onToggle(cat.id)}
                role="button"
                aria-label={`${cat.label} ${isActive ? '(ausgewählt)' : ''}`}
                aria-pressed={isActive}
                tabIndex={0}
              />
              <text
                x={pos.x}
                y={pos.y - 6}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="18"
                style={{ pointerEvents: 'none', userSelect: 'none' }}
              >
                {cat.icon}
              </text>
              <text
                x={pos.x}
                y={pos.y + 12}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="7"
                fill={isActive ? colors.text : '#6b7280'}
                fontWeight={isActive ? '700' : '400'}
                style={{ pointerEvents: 'none', userSelect: 'none' }}
              >
                {cat.label.split(' ')[0]}
              </text>
            </g>
          )
        })}

        {/* Innerer Kreis (weißer Hintergrund für Text) */}
        <circle cx={CX} cy={CY} r={INNER_R - 2} fill="white" stroke="#e5e7eb" strokeWidth="1" />

        {/* Vers-Anzeige im Zentrum */}
        <foreignObject x={CX - 45} y={CY - 45} width="90" height="90">
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            style={{
              width: 90,
              height: 90,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '6px',
              overflow: 'hidden',
            }}
          >
            {currentVerse ? (
              <>
                <p style={{ fontSize: 8, fontStyle: 'italic', lineHeight: 1.4, color: '#374151', margin: 0 }}>
                  „{currentVerse.translations.luther2017.slice(0, 55)}…"
                </p>
                <p style={{ fontSize: 7.5, color: '#14b8a6', marginTop: 4, fontWeight: 700, margin: '4px 0 0' }}>
                  {currentVerse.book} {currentVerse.chapter},{currentVerse.verse}
                </p>
              </>
            ) : (
              <p style={{ fontSize: 8.5, color: '#9ca3af', margin: 0 }}>Thema wählen</p>
            )}
          </div>
        </foreignObject>
      </svg>

      {totalFound > 0 && (
        <p className="text-xs text-baby-mint-500 font-semibold">
          {totalFound} passende {totalFound === 1 ? 'Vers' : 'Verse'} gefunden
        </p>
      )}
    </div>
  )
}
