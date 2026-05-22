import { useState, useRef } from 'react'

export default function SwipeCard({ card, onSwipe, stackIndex }) {
  const [dragX, setDragX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const startX = useRef(0)

  const handleStart = (clientX) => {
    startX.current = clientX
    setIsDragging(true)
  }

  const handleMove = (clientX) => {
    if (!isDragging) return
    setDragX(clientX - startX.current)
  }

  const handleEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    if (dragX > 80) onSwipe('right')
    else if (dragX < -80) onSwipe('left')
    setDragX(0)
  }

  const rotation = dragX * 0.06
  const isTopCard = stackIndex === 0
  const scale = 1 - stackIndex * 0.04
  const translateY = stackIndex * 8

  return (
    <div
      style={{
        transform: isTopCard
          ? `translateX(${dragX}px) rotate(${rotation}deg)`
          : `translateY(${translateY}px) scale(${scale})`,
        transition: isDragging ? 'none' : 'transform 0.3s ease',
        zIndex: 10 - stackIndex,
        position: 'absolute',
        width: '100%',
        cursor: isTopCard ? (isDragging ? 'grabbing' : 'grab') : 'default',
        userSelect: 'none',
        touchAction: 'none',
      }}
      onTouchStart={isTopCard ? e => handleStart(e.touches[0].clientX) : undefined}
      onTouchMove={isTopCard ? e => handleMove(e.touches[0].clientX) : undefined}
      onTouchEnd={isTopCard ? handleEnd : undefined}
      onMouseDown={isTopCard ? e => handleStart(e.clientX) : undefined}
      onMouseMove={isTopCard ? e => handleMove(e.clientX) : undefined}
      onMouseUp={isTopCard ? handleEnd : undefined}
      onMouseLeave={isTopCard ? handleEnd : undefined}
    >
      {/* Ja-Overlay */}
      {isTopCard && dragX > 30 && (
        <div
          style={{ opacity: Math.min((dragX - 30) / 50, 1) }}
          className="absolute top-4 left-4 text-green-500 font-black text-xl border-3 border-green-500 rounded-xl px-3 py-1 -rotate-12 z-10 pointer-events-none"
        >
          JA ✓
        </div>
      )}
      {/* Nein-Overlay */}
      {isTopCard && dragX < -30 && (
        <div
          style={{ opacity: Math.min((-dragX - 30) / 50, 1) }}
          className="absolute top-4 right-4 text-gray-400 font-black text-xl border-3 border-gray-400 rounded-xl px-3 py-1 rotate-12 z-10 pointer-events-none"
        >
          NEIN ✗
        </div>
      )}

      <div className="step-card text-center space-y-4 select-none">
        <div className="text-6xl">{card.icon}</div>
        <h2 className="text-3xl font-extrabold text-gray-800">{card.word}</h2>
        <p className="text-sm text-gray-500 leading-relaxed">{card.context}</p>
        {isTopCard && (
          <p className="text-xs text-gray-300 pt-2">← Nein · Ja →</p>
        )}
      </div>
    </div>
  )
}
