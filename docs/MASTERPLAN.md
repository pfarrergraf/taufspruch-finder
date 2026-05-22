# MASTERPLAN — Taufspruch-Finder Umbau v2.0
**Stand:** 2026-05-22 | **Autor:** Benjamin Graf + Claude Sonnet 4.6

> Dieses Dokument ist die vollständige Arbeitsgrundlage für alle Sub-Agenten (Claude Code, Copilot, Codex).
> Jede Aufgabe hat eine Checkbox. Abgehakt = fertig, offen = noch zu tun.
> Bei Kontextverlust: Lies dieses Dokument als erstes.

---

## Projektübersicht

Die App `taufspruch-finder` (React/Vite/Tailwind PWA) wird von einer **einstufigen Filter-Seite**
zu einem **warmherzigen 6-Schritte-Interview-Flow** umgebaut. Zielgruppe: frischgebackene Eltern
auf der Suche nach einem Taufspruch.

**Repo:** `c:\ai\taufspruch-finder`
**Dev-Server:** `http://localhost:5173/taufspruch-finder/`
**GitHub Pages:** wird per `npm run build` + GitHub Actions deployed

### Externe Quellen (nur lokal verfügbar)
| Quelle | Pfad | Inhalt |
|---|---|---|
| Bibeltexte | `C:\ai\n8n\shared\app2\data\bibeltexte\luther.json` | Luther 2017, Flat-Dict `"Buch Kap:Vers": "Text"` |
| Elberfelder | `C:\ai\n8n\shared\app2\data\bibeltexte\elberfelder.json` | Elberfelder-Übersetzung (gleiche Struktur prüfen) |
| Predigten | `C:\ai\n8n\shared\app2\Predigt_creator\output\sermons\` | ~50 JSON mit `pastor_analysis` pro Bibelvers |
| Theologie-CLI | `C:\ai\n8n\shared\app2\Theologie_agent\cli.py` | `python cli.py exegese --text "Röm 8:38" --no-save` |
| Theologie-PDFs | `M:\app2\knowledge\theology\` | 43 akademische Kommentare (Käsemann, Thyen, Wolter…) |

---

## Ziel-Datenstruktur: `data/verses.json`

Jeder Vers hat folgende Felder:

```json
{
  "id": "roem-8-38",
  "book": "Römer",
  "chapter": 8,
  "verse": 38,
  "translations": {
    "luther2017": "Denn ich bin gewiss…",
    "gute_nachricht": "Ich bin überzeugt…",
    "elberfelder": "Denn ich bin überzeugt…"
  },
  "categories": ["von-guten-maechten-geborgen"],
  "traits": ["vertrauend", "hoffnungsvoll"],
  "keywords": ["Liebe", "Gewissheit", "Trennung", "Gott"],
  "tooltip": "Paulus beschreibt eine unerschütterliche Gewissheit: Keine Macht der Welt kann das Kind von Gottes Liebe trennen — ein starkes Fundament für ein ganzes Leben."
}
```

**Ziel: 150+ Verse** (Phase 1: 80 solide, Phase 2: auf 150 erweitern)

---

## Neue Kategorien (6 statt 3)

| ID | Label | Icon | Beschreibung |
|---|---|---|---|
| `von-guten-maechten-geborgen` | Von guten Mächten geborgen | 🌿 | Schutz, Fürsorge, Gottesnähe |
| `mit-sich-anderen-im-reinen` | Mit sich & anderen im Reinen | 🤝 | Frieden, Versöhnung, Gemeinschaft |
| `einen-unterschied-machen` | Einen Unterschied machen | ✨ | Berufung, Licht, Nächstenliebe |
| `auf-festem-fundament` | Auf festem Fundament | 🪨 | Vertrauen, Stabilität, Halt |
| `von-liebe-umgeben` | Von Liebe umgeben | 💛 | Liebe, Zuneigung, Herzlichkeit |
| `in-weitem-raum-leben` | In weitem Raum leben | 🌅 | Freiheit, Entfaltung, Wachstum |

---

## Neue Traits (12 statt 6)

| ID | Label | Icon |
|---|---|---|
| `froehlich-dankbar` | Fröhlich & dankbar | ☀️ |
| `mutig` | Mutig | 🦁 |
| `verantwortungsvoll` | Verantwortungsvoll | ⚖️ |
| `vertrauend` | Vertrauend | 🌱 |
| `liebevoll` | Liebevoll | 💚 |
| `hoffnungsvoll` | Hoffnungsvoll | 🌈 |
| `friedliebend` | Friedliebend | 🕊️ |
| `neugierig` | Neugierig & wissbegierig | 🔍 |
| `stark` | Stark & belastbar | 🏔️ |
| `kreativ` | Kreativ & einzigartig | 🎨 |
| `mitfuehlend` | Mitfühlend & empathisch | 🤲 |
| `geborgen` | Geborgen & sicher | 🏡 |

---

## Neue Pastel-Farbpalette

```js
// tailwind.config.js — ersetzt "forest" und "parchment"
colors: {
  baby: {
    rose:     { 50:'#fff1f3', 100:'#ffe4e8', 200:'#ffc8d0', 300:'#ff9aaa', 400:'#ff6b82', 500:'#f43f5e' },
    sky:      { 50:'#f0f9ff', 100:'#e0f2fe', 200:'#b9e7fe', 300:'#7dcffd', 400:'#3bb3f8', 500:'#0ea5e9' },
    mint:     { 50:'#f0fdf9', 100:'#ccfbef', 200:'#99f6e0', 300:'#5eead4', 400:'#2dd4bf', 500:'#14b8a6' },
    lavender: { 50:'#faf5ff', 100:'#f3e8ff', 200:'#e9d5ff', 300:'#d8b4fe', 400:'#c084fc', 500:'#a855f7' },
    cream:    { 50:'#fffbf0', 100:'#fff4d6', 200:'#ffe9a8', 300:'#ffd97a' },
    gold:     { 400:'#f59e0b', 500:'#d97706' },
  },
  // Behalte "forest" als Alias für Rückwärtskompatibilität während Migration
  forest: { ... } // temporär
}
```

**Primärfarbe:** `baby-mint-500` (Hauptakzent)
**Hintergrund:** `baby-cream-50`
**Sekundär:** `baby-lavender-300` (Kategorien)
**Warm-Akzent:** `baby-rose-300` (Favoriten, CTAs)

---

## Interview-Flow: 6 Schritte

```
Step 1: WelcomeStep      → Kindname + Elternwunsch (optional)
Step 2: OrientationStep  → Lebenseinstellung wählen (1-2 von 6)
Step 3: TraitsStep       → Charaktereigenschaften (beliebig viele + Freitext)
Step 4: SearchStep       → Keyword / KI-Suche (optional, überspringbar)
Step 5: ResultStep       → Verse mit Tooltip + Favoriten
Step 6: ShareStep        → Teilen / Drucken / Favoriten-Liste
```

### InterviewContext-State

```js
{
  step: 1,                    // 1–6
  childName: '',              // string
  parentWish: '',             // string (optional)
  orientations: [],           // string[] — gewählte Kategorie-IDs
  traits: [],                 // string[] — gewählte Trait-IDs
  customTrait: '',            // string (Freitext)
  query: '',                  // string (Suchfeld)
  semanticMode: false,        // boolean
  favorites: [],              // string[] (verse IDs) — aus useFavorites hook
}
```

---

## Sub-Agenten: Verantwortlichkeiten

### Agent 1: Design-Agent
**Verantwortung:** Visuelles Design — Farben, Typographie, globale Styles
**Input:** Aktuelle `tailwind.config.js`, `src/index.css`, alle `src/components/*.jsx`
**Output:** Neue Farbpalette, alle Komponenten auf baby-* Klassen umgestellt

### Agent 2: Data-Agent
**Verantwortung:** `src/utils/filterData.js` — 6 Kategorien + 12 Traits definieren
**Input:** Kategorientabelle und Traits-Tabelle aus diesem Dokument
**Output:** Aktualisierte `filterData.js`

### Agent 3: Bibelvers-Agent
**Verantwortung:** `data/verses.json` mit 150+ annotierten Versen
**Input:** luther.json, elberfelder.json, Predigt-JSONs, Theologie-CLI
**Output:** Vollständige `data/verses.json` mit allen Feldern inkl. tooltip

### Agent 4: Interview-UI-Agent
**Verantwortung:** Alle 6 Step-Komponenten + InterviewContext + App.jsx-Umbau
**Input:** Neue Farbklassen (nach Agent 1), neue filterData.js (nach Agent 2), verses.json (nach Agent 3)
**Output:** Funktionsfähige Interview-App

### Agent 5: Docs-Agent
**Verantwortung:** Dokumentation aktualisieren
**Input:** Finaler Codestand
**Output:** `docs/Codex.md`, `docs/Agents.md`, `docs/Instructions.md`

---

## CHECKLISTE — Agent 1: Design-Agent

### Tailwind-Konfiguration
- [x] `tailwind.config.js` — baby-* Farbpalette hinzufügen (rose, sky, mint, lavender, cream, gold)
- [x] `tailwind.config.js` — Schriftart `'Nunito'` als `sans` ergänzen (Google Fonts, kindfreundlich)
- [x] `tailwind.config.js` — `borderRadius` Erweiterung: `xl: '1rem'`, `2xl: '1.5rem'`, `3xl: '2rem'`
- [x] `tailwind.config.js` — `boxShadow` Erweiterung: `soft: '0 2px 20px rgba(0,0,0,0.06)'`
- [x] `index.html` — Google Fonts Link für Nunito hinzufügen (`weights: 400, 600, 700, 800`)

### CSS-Variablen
- [x] `src/index.css` — CSS-Variablen auf baby-mint-500 als Primary umstellen
- [x] `src/index.css` — Hintergrund-Gradient: `linear-gradient(135deg, #f0fdf9 0%, #faf5ff 100%)`
- [x] `src/index.css` — `.verse-text` Font auf Georgia/Lora beibehalten (Serifen für Zitate)
- [x] `src/index.css` — Neue Klasse `.step-card` (weiß, soft-shadow, rounded-3xl, p-6)
- [x] `src/index.css` — Neue Klasse `.category-tile` (Hover-Effekt, active-state)
- [x] `src/index.css` — Neue Klasse `.trait-chip` (pill-style, Hover + active)

### Bestehende Komponenten updaten (forest → baby-*)
- [x] `src/components/VerseCard.jsx` — forest-* → baby-mint-* / baby-cream-*
- [x] `src/components/FilterPanel.jsx` — forest-* → baby-mint-* (wird später durch StepKomponenten ersetzt, aber kompatibel halten)
- [x] `src/components/SearchBar.jsx` — forest-* → baby-mint-*
- [x] `src/components/FavoritesDrawer.jsx` — forest-* → baby-mint-* / parchment → baby-cream-*
- [x] `src/components/ShareButton.jsx` — forest-* → baby-mint-*
- [x] `src/App.jsx` — Header-Farbe: forest-700 → baby-mint-500 Gradient
- [x] Verifikation: `npm run build` — keine ungültigen Tailwind-Klassen, kein Build-Fehler

---

## CHECKLISTE — Agent 2: Data-Agent

### filterData.js
- [x] 6 Kategorien mit ID, label, icon, description, extendedDescription (2-3 Sätze für Tooltip)
- [x] Kategorie `von-guten-maechten-geborgen` — bestehendes Icon + neue Beschreibung
- [x] Kategorie `mit-sich-anderen-im-reinen` — bestehendes Icon + neue Beschreibung
- [x] Kategorie `einen-unterschied-machen` — bestehendes Icon + neue Beschreibung
- [x] Kategorie `auf-festem-fundament` — NEU: Icon 🪨, Beschreibung
- [x] Kategorie `von-liebe-umgeben` — NEU: Icon 💛, Beschreibung
- [x] Kategorie `in-weitem-raum-leben` — NEU: Icon 🌅, Beschreibung
- [x] 12 Traits mit ID, label, icon, description (Einzeiler)
- [x] Bestehende 6 Traits beibehalten, 6 neue hinzufügen (friedliebend, neugierig, stark, kreativ, mitfuehlend, geborgen)
- [x] Export-Struktur kompatibel mit bestehendem `FilterPanel` und neuen Interview-Komponenten
- [x] Verifikation: `npm test` — `useVerseFilter.test.js` noch grün

---

## CHECKLISTE — Agent 3: Bibelvers-Agent

> **Wichtig:** Dieser Agent arbeitet mit externen Quellen außerhalb des taufspruch-finder Repos.
> Alle Ergebnisse landen in `c:\ai\taufspruch-finder\data\verses.json`.

### Vorbereitung
- [x] `C:\ai\n8n\shared\app2\data\bibeltexte\luther.json` lesen — Struktur verstehen
- [x] `C:\ai\n8n\shared\app2\data\bibeltexte\elberfelder.json` lesen — Struktur verstehen
- [x] Alle Sermon-JSONs in `C:\ai\n8n\shared\app2\Predigt_creator\output\sermons\` auflisten
- [x] Sermon-JSONs parsen: Feld `pastor_analysis` + `metadata.bible_reference` extrahieren

### Vers-Extraktion aus Predigt-Dateien
- [x] Alle ~50 Sermon-JSONs lesen, jeweils Bibelreferenz(en) + pastor_analysis extrahieren
- [x] Referenzen normalisieren: `"Mt 6,21"` → `{ book: "Matthäus", chapter: 6, verse: 21 }`
- [x] pastor_analysis auf max. 2-3 Sätze kürzen → wird zu `tooltip`
- [x] Duplikate erkennen und zusammenführen (gleicher Vers, unterschiedliche Predigten)
- [x] **Ziel aus Predigten: mindestens 50 Verse mit Tooltip**

### Vers-Text aus Luther.json
- [x] Für jede extrahierte Referenz: Vers-Text in luther.json nachschlagen
- [x] Fehlende Verse manuell ergänzen (aus Bibeltexten-Kenntnissen)
- [x] ID generieren: `buch-kap-vers` in lowercase, Umlaute ersetzen (ö→oe, ä→ae, ü→ue)

### Gute Nachricht & Elberfelder Übersetzungen
- [x] elberfelder.json Struktur prüfen — gibt es Verse-Texte oder nur Metadaten?
- [x] Falls vorhanden: Elberfelder-Texte zuordnen
- [x] Gute Nachricht: Texte aus eigener Kenntnis / öffentlichen Quellen ergänzen
  (GNB ist urheberrechtlich geschützt — nur Zitate < 50 Zeichen oder Umschreibungen!)
- [x] Fallback: Wenn GNB nicht verfügbar → Feld leer lassen oder Luther-Variante wiederholen

### Kategorisierung & Traits
- [x] Jeden Vers einer oder mehreren der 6 Kategorien zuordnen
- [x] Passende Traits aus den 12 zuordnen (mindestens 1, max. 4 pro Vers)
- [x] Keywords extrahieren (3-6 Stichworte pro Vers)

### Zusätzliche Verse (über Predigten hinaus)
- [x] Zusätzliche klassische Taufverse hinzufügen (Zielbereich: 150 Verse gesamt):
  - Psalmen: Ps 23, Ps 46, Ps 91, Ps 121, Ps 139
  - Evangelien: Mt 5 (Seligpreisungen), Joh 1, Joh 10, Joh 15, Mk 10,14
  - Paulus: Röm 8, Phil 4, 1 Kor 13, Gal 5, Eph 3
  - AT: Jes 43, Jer 29, Mi 6, Spr 3
  - NT: 1 Joh 4, Offb 21
- [x] Für Verse ohne Predigt-Tooltip: Kurztooltip aus eigenem theologischem Wissen schreiben
- [x] Optional: `python C:\ai\n8n\shared\app2\Theologie_agent\cli.py exegese --text "..." --no-save`
  für ausgewählte Verse aufrufen (max. 20 Aufrufe, zeitintensiv)

### Output
- [x] `data/verses.json` schreiben — valides JSON, kein Trailing Comma
- [x] Mindestens 80 Verse (Pflichtziel), Stretch-Ziel 150+
- [x] Alle 6 Kategorien abgedeckt (mind. 10 Verse pro Kategorie)
- [x] Alle 12 Traits verwendet (mind. 5 Verse pro Trait)
- [x] tooltip-Feld bei mind. 70% der Verse vorhanden
- [x] Verifikation: `node -e "require('./data/verses.json')"` — kein Parse-Fehler
- [x] Verifikation: `npm test` noch grün

---

## CHECKLISTE — Agent 4: Interview-UI-Agent

> **Abhängigkeit:** Design-Agent (baby-* Klassen) und Data-Agent (filterData.js) müssen fertig sein.
> Bibelvers-Agent kann parallel laufen — ResultStep nutzt verses.json.

### InterviewContext
- [x] `src/context/InterviewContext.jsx` anlegen
- [x] State: `step`, `childName`, `parentWish`, `orientations[]`, `traits[]`, `customTrait`, `query`, `semanticMode`
- [x] Actions: `setStep`, `nextStep`, `prevStep`, `setChildName`, `toggleOrientation`, `toggleTrait`, `setCustomTrait`, `setQuery`, `reset`
- [x] `useFavorites` hook in Context einbinden (nicht doppelt)
- [x] LocalStorage-Persistenz für `childName` (optional, mit Clear-Button)

### ProgressBar
- [x] `src/components/interview/ProgressBar.jsx` anlegen
- [x] Zeigt Schritte 1–6 mit Icon + Label
- [x] Aktiver Schritt hervorgehoben (baby-mint-500)
- [x] Vergangene Schritte: Häkchen ✓
- [x] Klickbar für Rücksprung (nur auf bereits besuchte Schritte)
- [x] Mobile: Nur aktiver Schritt-Name + "Schritt X von 6"
- [x] Accessibility: `aria-current="step"` auf aktivem Schritt

### WelcomeStep (Schritt 1)
- [x] `src/components/interview/WelcomeStep.jsx` anlegen
- [x] Herzliche Begrüßung mit Heading (z.B. "Willkommen — Für welches Kind suchst du?")
- [x] Input: Kindname (required, max 30 Zeichen)
- [x] Textarea: Elternwunsch / was wünscht ihr eurem Kind (optional, max 200 Zeichen)
- [x] Motivierender Subtitle: z.B. "In wenigen Schritten findet ihr den Vers, der zu eurem Kind passt."
- [x] Weiter-Button erst aktiv wenn Kindname eingegeben
- [x] Design: großes illustratives Emoji / SVG-Icon (Taufkerze 🕯️ oder Blume)
- [x] Accessibility: autofocus auf Kindname-Feld

### OrientationStep (Schritt 2)
- [x] `src/components/interview/OrientationStep.jsx` anlegen
- [x] Heading mit Kindname: "Was wünscht ihr [Name] für ihr/sein Leben?"
- [x] 6 Kategorie-Kacheln im Grid (2 Spalten mobile, 3 Spalten tablet+)
- [x] Jede Kachel: Icon (groß), Label, Description (1 Satz), Tooltip-Icon mit extendedDescription
- [x] Mehrfachauswahl möglich (1-3 Kategorien)
- [x] Aktive Kacheln: baby-mint Hintergrund + Checkmark
- [x] Tooltip-Overlay bei Klick auf Info-Icon (nicht bei Kachel-Klick)
- [x] Weiter-Button erst aktiv wenn mind. 1 Kategorie gewählt
- [x] Zurück-Button zu Schritt 1
- [x] Animierter Einzug (CSS transition)

### TraitsStep (Schritt 3)
- [x] `src/components/interview/TraitsStep.jsx` anlegen
- [x] Heading: "Welche Eigenschaften soll [Name] in sich tragen?"
- [x] 12 Trait-Chips als Pill-Buttons, Mehrfachauswahl
- [x] Aktive Chips: baby-rose-300 Hintergrund
- [x] Freitext-Eingabe: "+ Eigene Eigenschaft hinzufügen" (max 30 Zeichen)
- [x] Hinweis: "Keine Auswahl — alle Verse werden gezeigt" (wenn 0 Traits)
- [x] Weiter-Button immer aktiv (Traits optional)
- [x] Zurück-Button

### SearchStep (Schritt 4)
- [x] `src/components/interview/SearchStep.jsx` anlegen
- [x] Heading: "Gibt es ein Thema, das euch besonders am Herzen liegt?"
- [x] Suchfeld (bestehenden SearchBar wiederverwenden/anpassen)
- [x] Vorschläge als Chips: "Schutz", "Liebe", "Mut", "Frieden", "Freude", "Zukunft", "Licht"
- [x] Chip-Klick füllt Suchfeld
- [x] KI-Suche Toggle (nur wenn API verfügbar)
- [x] "Weiter ohne Suche" — Link/Button zum Überspringen
- [x] Weiter-Button immer aktiv
- [x] Zurück-Button

### ResultStep (Schritt 5)
- [x] `src/components/interview/ResultStep.jsx` anlegen
- [x] Personalisierter Intro-Text: "Für [Name] haben wir [n] passende Verse gefunden:"
- [x] Bestehende `VerseList` + `VerseCard` Komponenten wiederverwenden
- [x] VerseCard erweitern: Tooltip-Feld anzeigen (aufklappbar mit "Bedeutung ▼")
- [x] Filter-State aus InterviewContext an VerseList übergeben
- [x] Sortierung: nach Relevanz (Kategorien-Match zuerst, dann Traits)
- [x] Favoriten-Counter in Header sichtbar
- [x] Weiter-Button: "Zu meiner Favoriten-Liste" (nur aktiv wenn mind. 1 Favorit)
- [x] Weiter ohne Favorit trotzdem möglich ("Überspringen")
- [x] Zurück-Button
- [x] Neu-Suche-Button ("Filter anpassen")

### ShareStep (Schritt 6)
- [x] `src/components/interview/ShareStep.jsx` anlegen
- [x] Heading: "Eure Auswahl für [Name]"
- [x] Favoriten-Liste kompakt anzeigen (VerseCard light-Version)
- [x] Wenn 0 Favoriten: alle angezeigten Verse zeigen (Top 5)
- [x] Teilen-Optionen:
  - [x] WhatsApp: alle Favoriten als Text (bestehenden ShareButton erweitern)
  - [x] E-Mail: alle Favoriten
  - [x] Drucken: `window.print()` + Print-CSS (nur Verse, kein Header/Footer)
  - [x] Clipboard: Vers-Text kopieren
- [x] Print-CSS in `src/index.css`: `@media print { .no-print { display: none } }`
- [x] Neustart-Button: Interview zurücksetzen + zu Schritt 1
- [x] Abschluss-Text: kleiner Segen / Glückwunsch ("Alles Gute für [Name] zur Taufe!")
- [x] Accessibility: alle Buttons haben aria-labels

### App.jsx Umbau
- [x] `src/App.jsx` auf Interview-Flow umbauen
- [x] `<InterviewProvider>` als Root-Wrapper
- [x] Step-Router: `switch(step) { case 1: <WelcomeStep /> ... }`
- [x] `<ProgressBar>` immer sichtbar (außer Step 1)
- [x] Bestehender `<FavoritesDrawer>` beibehalten (als Overlay zu jedem Zeitpunkt öffenbar)
- [x] Bestehender Header: Favoriten-Button + ggf. Neustart-Icon
- [x] Sanfte Übergangs-Animation zwischen Steps (CSS: fade-in / slide)

### Verifikation
- [x] `npm run dev` — alle 6 Steps navigierbar
- [x] `npm test` — alle Tests grün (VerseCard.test.jsx, useVerseFilter.test.js)
- [x] `npm run build` — kein Build-Fehler
- [x] Mobile (375px): kein Overflow, Touch-Targets mind. 44px (Skip-Button py-3 gefixt)
- [x] Keyboard-Navigation: Tab + Enter auf allen Buttons funktioniert (keine div-als-Button Fallen)
- [x] Screenreader: aria-labels vollständig (ShareButton Referenz, ProgressBar Steps, aria-pressed auf Suggestion-Chips + ShareStep-Favorit)

---

## CHECKLISTE — Agent 5: Docs-Agent

### Codex.md aktualisieren
- [x] Neue Farbpalette dokumentieren (baby-* System)
- [x] Interview-Flow-Architektur beschreiben
- [x] Vers-Datenstruktur (mit tooltip-Feld) dokumentieren
- [x] Hinweis zu GNB Urheberrecht ergänzen

### Agents.md aktualisieren
- [x] Sub-Agenten-System beschreiben (Design, Data, Bibelvers, Interview-UI, Docs)
- [x] Input/Output pro Agent
- [x] Abhängigkeiten zwischen Agenten

### Instructions.md neu anlegen (`docs/Instructions.md`)
- [x] Setup-Anleitung: `npm install`, `npm run dev`
- [x] Externe Quellen erklären (luther.json, Predigt-JSONs, Theologie-CLI)
- [x] Neue Verse hinzufügen: Schritt-für-Schritt Anleitung
- [x] Deployment: `npm run build` → GitHub Pages
- [x] Bekannte Einschränkungen (GNB-Urheberrecht, FAISS-Backend optional)

### MASTERPLAN.md
- [x] Abgeschlossene Checkboxen als `[x]` markieren

---

## Technische Entscheidungen

| Thema | Entscheidung | Begründung |
|---|---|---|
| State Management | React Context (kein Redux) | Scope zu klein für Redux |
| Routing | State-Machine in Context | Kein React Router nötig für 6 Steps |
| Animationen | CSS transitions (kein Framer Motion) | Kein neues Dependency |
| GNB-Übersetzung | Nur wenn urheberrechtsfrei verfügbar | GNB © Deutsche Bibelgesellschaft |
| Tooltip-Quelle | pastor_analysis aus Predigten + eigene Texte | Qualität > Quantität |
| Bibelvers-Zahl | Pflichtziel 80, Stretch 150 | Qualität mit Tooltip wichtiger als Menge |
| Backend/FAISS | Unverändert (skills/search/ bleibt wie ist) | Out of scope für diesen Sprint |
| Neue Dependencies | Nur Google Fonts (Nunito) | Minimaler Footprint |

---

## Reihenfolge der Implementierung

```
Phase 1 (parallel):
  ├── Agent 1: Design (tailwind + CSS + Komponenten-Update)
  └── Agent 2: Data (filterData.js)

Phase 2 (parallel, kann mit Phase 1 überlappen):
  └── Agent 3: Bibelvers (verses.json — dauert am längsten!)

Phase 3 (nach Phase 1+2):
  └── Agent 4: Interview-UI (alle Komponenten + App.jsx)

Phase 4 (nach Phase 3):
  └── Agent 5: Docs
```

---

## Fortsetzungs-Hinweise für Copilot / Codex / neue Claude-Session

**Wenn du diese Datei liest und die Arbeit fortsetzt:**

1. Lies `MASTERPLAN.md` vollständig
2. Prüfe welche Checkboxen `[x]` bereits abgehakt sind
3. Lies die betroffenen Dateien mit `git diff` oder Read-Tool
4. Starte beim ersten offenen `[ ]` in der nächsten Phase
5. Nach jedem abgehakten Block: `npm test` ausführen
6. Commit-Nachrichten: `feat(design): pastel palette` / `feat(data): 6 categories` etc.

**Wichtige IDs / Namenskonventionen:**
- Kategorie-IDs: kebab-case, deutsch (z.B. `von-guten-maechten-geborgen`)
- Vers-IDs: `buch-kapitel-vers` (z.B. `roem-8-38`, `ps-23-1`, `joh-15-9`)
- Komponentenpfade: `src/components/interview/XxxStep.jsx`
- Context: `src/context/InterviewContext.jsx`

**Kritische Abhängigkeit:**
Interview-UI-Agent DARF NICHT starten bevor:
- `tailwind.config.js` die baby-* Farben hat (sonst falsche Klassen)
- `filterData.js` die 6 Kategorien hat (sonst fehlerhafte Imports)

---

*Zuletzt aktualisiert: 2026-05-21*
