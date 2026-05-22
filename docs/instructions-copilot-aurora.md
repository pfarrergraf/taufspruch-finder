# Instruktionen: Paket B — Aurora Visual Theme

**Für:** Copilot (empfohlenes Modell: **Claude Sonnet**)
**Repo:** `c:\ai\taufspruch-finder`
**Aufgabe:** Rein visuelles Restyling des Interview-Flows per CSS-Overrides. Keine React-Komponenten verändern.

---

## Kontext

Die App hat einen `ThemeContext` (bereits implementiert), der bei aktivem Aurora-Modus
das Attribut `data-theme="aurora"` auf das `<html>`-Element setzt.
Du fügst CSS-Overrides hinzu, die dieses Attribut als Selektor nutzen.

**Technologie:** Tailwind CSS + custom CSS in `src/index.css`
Die bestehenden Tailwind-Utility-Klassen (z.B. `bg-baby-mint-400`) können durch
`[data-theme="aurora"] .bg-baby-mint-400 { ... }` überschrieben werden.

---

## Aufgabe 1: `index.html` — DM Sans Font ergänzen

Datei: `c:\ai\taufspruch-finder\index.html`

Füge **nach dem bestehenden Nunito-Font-Link** ein:

```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500&display=swap" rel="stylesheet">
```

---

## Aufgabe 2: `src/index.css` — Aurora-Block ans Ende anhängen

Datei: `c:\ai\taufspruch-finder\src\index.css`

Hänge folgenden Block **am Ende der Datei** an (nach allen bestehenden Styles):

```css
/* ═══════════════════════════════════════════════════════════
   AURORA THEME  —  wird aktiviert wenn data-theme="aurora"
   auf <html> gesetzt ist (via ThemeContext.jsx).
   Regel: Keine Komponentenänderungen nötig — nur CSS.
   !important nur wo Tailwind-Inline-Klassen überschrieben werden müssen.
═══════════════════════════════════════════════════════════ */

/* Animierter Gradient-Mesh Hintergrund */
@keyframes auroraDrift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

[data-theme="aurora"] body {
  background: linear-gradient(-45deg, #ffffff, #faf5ff, #f0f9ff, #f0fdf9) !important;
  background-size: 400% 400% !important;
  animation: auroraDrift 12s ease infinite;
}

/* Glassmorphic Step-Cards */
[data-theme="aurora"] .step-card {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.75);
  box-shadow: 0 8px 32px rgba(168, 85, 247, 0.08);
}

/* Kategorie-Kacheln */
[data-theme="aurora"] .category-tile {
  background: rgba(255, 255, 255, 0.5);
  border-color: rgba(200, 200, 240, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
[data-theme="aurora"] .category-tile:hover {
  background: rgba(168, 85, 247, 0.06);
  border-color: rgba(168, 85, 247, 0.35);
  box-shadow: 0 4px 20px rgba(168, 85, 247, 0.12);
}

/* Aktiver Trait-Chip */
[data-theme="aurora"] .trait-chip.active {
  background: rgba(168, 85, 247, 0.12);
  border-color: rgba(168, 85, 247, 0.4);
  color: #7e22ce;
}

/* Gradient-Text für mint-500-Überschriften */
[data-theme="aurora"] .text-baby-mint-500 {
  background: linear-gradient(135deg, #a855f7 0%, #14b8a6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Primär-Buttons (bg-baby-mint-400 / bg-baby-mint-500) */
[data-theme="aurora"] .bg-baby-mint-400 {
  background: linear-gradient(135deg, #a855f7 0%, #14b8a6 100%) !important;
}
[data-theme="aurora"] .bg-baby-mint-500 {
  background: linear-gradient(135deg, #9333ea 0%, #0d9488 100%) !important;
}
[data-theme="aurora"] .bg-baby-mint-400:hover,
[data-theme="aurora"] .hover\:bg-baby-mint-500:hover {
  background: linear-gradient(135deg, #9333ea 0%, #0d9488 100%) !important;
  box-shadow: 0 4px 20px rgba(168, 85, 247, 0.3);
}

/* Sekundär-Akzent (lavender → Aurora-Violet) */
[data-theme="aurora"] .bg-baby-lavender-300 {
  background: rgba(168, 85, 247, 0.15) !important;
  color: #7e22ce !important;
}

/* Header Aurora-Gradient */
[data-theme="aurora"] header {
  background: linear-gradient(
    135deg,
    rgba(168, 85, 247, 0.9) 0%,
    rgba(20, 184, 166, 0.85) 100%
  ) !important;
  backdrop-filter: blur(10px);
}

/* Input-Felder Focus */
[data-theme="aurora"] input:focus,
[data-theme="aurora"] textarea:focus {
  border-color: rgba(168, 85, 247, 0.5) !important;
  box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1) !important;
}
[data-theme="aurora"] input:focus-visible,
[data-theme="aurora"] textarea:focus-visible {
  outline-color: #a855f7;
}

/* Globale Schrift */
[data-theme="aurora"],
[data-theme="aurora"] button,
[data-theme="aurora"] input,
[data-theme="aurora"] textarea {
  font-family: 'DM Sans', 'Nunito', system-ui, sans-serif;
}
/* Verse bleiben Serif */
[data-theme="aurora"] .verse-text {
  font-family: Georgia, Cambria, serif;
}

/* ProgressBar aktiver Schritt */
[data-theme="aurora"] .bg-baby-mint-500 {
  background: linear-gradient(135deg, #a855f7, #14b8a6) !important;
}

/* Vers-Referenz-Text in VerseCard */
[data-theme="aurora"] .text-baby-mint-500.font-semibold {
  background: linear-gradient(135deg, #a855f7, #14b8a6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Scroll-Leiste dezenter */
[data-theme="aurora"] ::-webkit-scrollbar { width: 6px; }
[data-theme="aurora"] ::-webkit-scrollbar-thumb {
  background: rgba(168, 85, 247, 0.2);
  border-radius: 3px;
}
```

---

## Checkliste

- [ ] `index.html` — DM Sans Font-Link eingefügt
- [ ] `src/index.css` — Aurora-Block am Ende ergänzt
- [ ] Verifikation: `npm run dev` starten
- [ ] Im Browser: ⊞-Button im Header klicken → "Interview Aurora" wählen
- [ ] Prüfen: Hintergrund animiert sich (Gradient-Drift sichtbar)
- [ ] Prüfen: Step-Cards sind glassmorphisch (transparent, Blur)
- [ ] Prüfen: Überschriften haben Gradient-Text (Violett → Türkis)
- [ ] Prüfen: Buttons sind Gradient statt Mint-Grün
- [ ] Prüfen: Schrift ist DM Sans (schlanker als Nunito)
- [ ] Zurück zu "Interview Standard" → Mint-Pastell-Design wiederhergestellt
- [ ] `npm run build` — kein Build-Fehler

---

## Hinweise

- **Keine** Komponenten-Dateien (`.jsx`) verändern
- **Keine** `tailwind.config.js` verändern
- Bei Spezifitätskonflikten: `!important` verwenden (bereits in Vorlage markiert)
- DM Sans ist nur im Aurora-Theme aktiv — Fallback auf Nunito wenn nicht geladen
- Der Aurora-Block darf **nicht** vor bestehenden CSS-Regeln stehen (immer ans Ende)
