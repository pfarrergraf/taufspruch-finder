# Instruktionen: Paket C+D — Stimmungsuhr & Swipe Mode

**Für:** Codex
**Repo:** `c:\ai\taufspruch-finder`
**Aufgabe:** Die Basis-Implementierung für Stimmungsuhr und Swipe ist bereits angelegt.
Deine Aufgabe ist, fehlende Details zu ergänzen, Edge Cases zu behandeln und die Modi vollständig spielbar zu machen.

---

## Shared Contract (bereits implementiert — nicht verändern)

```js
// ModeContext (src/context/ModeContext.jsx)
import { useMode, MODES } from '../../context/ModeContext'
const { currentMode, setMode } = useMode()
// MODES.INTERVIEW_DEFAULT | MODES.INTERVIEW_AURORA | MODES.STIMMUNGSUHR | MODES.SWIPE

// ThemeContext (src/context/ThemeContext.jsx)
import { useTheme, THEMES } from '../../context/ThemeContext'
const { currentTheme, setTheme } = useTheme()

// InterviewContext (src/context/InterviewContext.jsx) — NICHT VERÄNDERN
import { useInterview } from '../../context/InterviewContext'
const { childName, setChildName, favorites, toggleFavorite, isFavorite,
        goToStep, orientations, toggleOrientation, traits, toggleTrait } = useInterview()

// useVerseFilter (src/hooks/useVerseFilter.js) — NICHT VERÄNDERN
// Signatur: useVerseFilter(verses, { categories: string[], traits: string[] }, query: string)
import { useVerseFilter } from '../../hooks/useVerseFilter'
import verses from '../../../data/verses.json'
const filtered = useVerseFilter(verses, { categories: ['von-guten-maechten-geborgen'], traits: [] }, '')

// filterData (src/utils/filterData.js)
import { CATEGORIES, TRAITS } from '../../utils/filterData'
// CATEGORIES[i]: { id, label, icon, description, extendedDescription }
// TRAITS[i]:     { id, label, icon, description }
```

---

## Paket C — Stimmungsuhr

### Bestehende Dateien (bereits angelegt)
- `src/modes/stimmungsuhr/StimmungsuhrApp.jsx` ✓
- `src/modes/stimmungsuhr/ClockWheel.jsx` ✓

### Aufgaben

**C1: ClockWheel.jsx — Touch-Performance verbessern**

Das SVG hat `touchAction: 'none'` noch nicht auf dem `<svg>`-Element.
Ergänze auf dem `<svg>`-Tag:
```jsx
<svg ... style={{ touchAction: 'none' }}>
```

**C2: ClockWheel.jsx — Aktiv-Zustand visuell stärker**

Wenn ein Segment aktiv ist, soll es zusätzlich einen `filter: drop-shadow(...)` bekommen:
```jsx
// Im <path> style-Attribut ergänzen:
filter: isActive ? `drop-shadow(0 0 6px ${colors.stroke}80)` : 'none',
```

**C3: StimmungsuhrApp.jsx — Segment-Selektion auch in InterviewContext synchronisieren**

`handleToResult` überträgt aktuell die localSegments in den InterviewContext.
Problem: Die bestehenden `orientations` im Context könnten Altdaten von einem vorherigen
Interview-Durchlauf enthalten.

Ersetze `handleToResult` durch:
```js
const handleToResult = () => {
  // Alte Orientierungen löschen, neue setzen
  // Da toggleOrientation ein Toggle ist: erst alle deaktivieren, dann neue aktivieren
  // Einfachste Lösung: reset() aufrufen + dann setzen
  reset() // importiere reset aus useInterview
  setTimeout(() => {
    localSegments.forEach(id => toggleOrientation(id))
    goToStep(5)
    setPhase('result')
  }, 0)
}
```
Dafür `reset` aus `useInterview` importieren.

**C4: Wenn 0 Segmente aktiv — Zufallsvers im Zentrum zeigen**

In `StimmungsuhrApp.jsx`:
```js
// Statt filtered[0] einen zufälligen Vers nehmen wenn keine Segmente gewählt
const displayVerse = localSegments.length === 0
  ? verses[Math.floor(Math.random() * verses.length)]
  : (filtered[0] || null)
```
Übergib `displayVerse` statt `filtered[0]` an `<ClockWheel>`.

---

## Paket D — Swipe Mode

### Bestehende Dateien (bereits angelegt)
- `src/modes/swipe/SwipeApp.jsx` ✓
- `src/modes/swipe/SwipeCard.jsx` ✓

### Aufgaben

**D1: SwipeCard.jsx — Karte fliegt beim Swipe raus**

Derzeit setzt `dragX` sich nach `handleEnd` auf 0 zurück. Das lässt die Karte
abrupt einrasten. Stattdessen soll sie beim Swipe-Trigger aus dem Viewport fliegen:

```jsx
// Statt setDragX(0) bei positiven Swipes:
const handleEnd = () => {
  if (!isDragging) return
  setIsDragging(false)
  if (dragX > 80) {
    setDragX(400) // fliegt nach rechts raus
    setTimeout(() => { onSwipe('right'); setDragX(0) }, 300)
  } else if (dragX < -80) {
    setDragX(-400) // fliegt nach links raus
    setTimeout(() => { onSwipe('left'); setDragX(0) }, 300)
  } else {
    setDragX(0) // snap back
  }
}
```
Stelle sicher, dass `transition` auch beim Fly-Out aktiv ist (nicht `isDragging` prüfen,
sondern einen eigenen `isFlying`-State verwenden oder die Transition direkt setzen).

**D2: SwipeApp.jsx — Deck neu mischen wenn alle Karten durch**

Falls `cardIndex >= deck.length` vor MAX_CARDS erreicht ist, soll das Deck neu gemischt werden
anstatt `reveal` zu zeigen wenn noch keine Votes da sind:
```js
if (newIndex >= deck.length && newYesVotes.length === 0) {
  // kein einziges Ja — Neustart des Decks (unwahrscheinlich, aber Edge Case)
  setCardIndex(0)
  return
}
```

**D3: SwipeApp.jsx — Keyboard-Unterstützung**

Ergänze im `swipe`-Phase einen `useEffect` für Tastatur-Events:
```js
useEffect(() => {
  if (phase !== 'swipe') return
  const handler = (e) => {
    if (e.key === 'ArrowRight') handleSwipe('right')
    if (e.key === 'ArrowLeft') handleSwipe('left')
    if (e.key === 'Enter') handleSwipe('right')
  }
  window.addEventListener('keydown', handler)
  return () => window.removeEventListener('keydown', handler)
}, [phase, cardIndex]) // cardIndex als Dependency damit handler aktuell ist
```

**D4: SwipeApp.jsx — Reveal-Animation mit Ja-Wörtern**

Die Reveal-Phase zeigt aktuell statische Chips. Ergänze eine CSS-Animation:

In `src/index.css` hinzufügen:
```css
@keyframes floatIn {
  from { opacity: 0; transform: scale(0.5) translateY(20px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
.swipe-reveal-chip {
  animation: floatIn 0.4s ease forwards;
}
```

In `SwipeApp.jsx` den Reveal-Chips die Klasse `swipe-reveal-chip` geben
und jeden Chip mit einer CSS `animation-delay` versehen:
```jsx
{yesVotes.map((v, i) => (
  <span
    key={v.id}
    className="swipe-reveal-chip text-sm px-3 py-1 bg-baby-mint-50 border border-baby-mint-200 rounded-full text-baby-mint-600 font-semibold"
    style={{ animationDelay: `${i * 80}ms`, opacity: 0 }}
  >
    {v.icon} {v.word}
  </span>
))}
```

---

## Checkliste — Stimmungsuhr

- [x] `ClockWheel.jsx` — `touchAction: 'none'` auf `<svg>` ergänzt
- [x] `ClockWheel.jsx` — `drop-shadow` auf aktive Segmente ergänzt
- [x] `StimmungsuhrApp.jsx` — `handleToResult` mit `reset()` + `setTimeout`
- [x] `StimmungsuhrApp.jsx` — Zufallsvers wenn keine Segmente gewählt
- [x] Verifikation: Im Browser "Stimmungsuhr" wählen → Uhr rendert
- [x] Verifikation: Segmente anklicken → Farbe ändert sich, Vers im Zentrum ändert sich
- [x] Verifikation: "X Verse anzeigen" → ResultStep erscheint mit gefilterten Versen
- [x] Verifikation: Mobile (Touchscreen) — Segmente per Touch klickbar

## Checkliste — Swipe

- [x] `SwipeCard.jsx` — Fly-Out-Animation bei Swipe-Trigger
- [x] `SwipeApp.jsx` — Edge Case wenn Deck komplett ohne Votes
- [x] `SwipeApp.jsx` — Keyboard-Navigation (Pfeil links/rechts)
- [x] `src/index.css` — `floatIn`-Keyframe + `.swipe-reveal-chip`-Klasse
- [x] `SwipeApp.jsx` — Reveal-Chips mit `animation-delay`
- [x] Verifikation: Swipe per Maus-Drag funktioniert
- [x] Verifikation: Swipe per Touch funktioniert (Mobile)
- [x] Verifikation: Pfeil-Tasten funktionieren (Desktop)
- [x] Verifikation: Nach 10 Karten → Reveal-Animation → ResultStep
- [x] Verifikation: "Zeig mir jetzt" → sofort zu ResultStep
- [x] `npm run build` — kein Fehler

---

## Hinweise

- `ResultStep` und `ShareStep` (aus `src/components/interview/`) werden direkt wiederverwendet
- `reset` aus `useInterview` importieren wenn nötig: `const { ..., reset } = useInterview()`
- Keine neuen npm-Pakete installieren
- Die `useVerseFilter`-Signatur ist `(verses, { categories, traits }, query)` — nicht `orientations`!
- Alle neuen CSS-Regeln in `src/index.css` einfügen, nicht in separate Dateien
