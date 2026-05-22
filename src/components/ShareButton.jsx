import { useState } from 'react'

export default function ShareButton({ text, reference }) {
  const [open, setOpen] = useState(false)
  const message = `„${text}“ — ${reference}`
  const waUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
  const mailUrl = `mailto:?subject=${encodeURIComponent(`Taufspruch: ${reference}`)}&body=${encodeURIComponent(message)}`

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={`${reference} teilen`}
        aria-expanded={open}
        className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full border border-gray-200 bg-white text-gray-500 hover:border-baby-mint-300 hover:text-baby-mint-500 transition-all"
      >
        ↗ Teilen
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} aria-hidden />
          <div className="absolute bottom-full left-0 mb-2 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20 min-w-[160px]">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-baby-mint-50"
              onClick={() => setOpen(false)}
            >
              <span>💬</span> WhatsApp
            </a>
            <a
              href={mailUrl}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-baby-mint-50"
              onClick={() => setOpen(false)}
            >
              <span>✉️</span> E-Mail
            </a>
          </div>
        </>
      )}
    </div>
  )
}
