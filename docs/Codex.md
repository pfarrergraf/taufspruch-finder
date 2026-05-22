# Codex – Leitfaden und Regeln

Dieses Dokument beschreibt Richtlinien für die Entwicklung des Taufspruch Finders (v2.0).

## Allgemeine Prinzipien
- **Barrierefreiheit**: Responsive Design, Screenreader-Unterstützung, min. 44px Touch-Targets, aria-labels
- **Emotionale UX**: Die App spricht frischgebackene Eltern an — warmherzig, einladend, nie überladend
- **Theologische Sorgfalt**: Verse und Tooltips pastoral sensibel formuliert
- **Minimalismus**: Interview-Flow führt Schritt für Schritt — kein Info-Overload

## Farbsystem (baby-* Palette)
Definiert in `tailwind.config.js`:
- `baby-mint-*` — Primärfarbe (Akzent, Buttons, aktive Elemente)
- `baby-rose-*` — Warm-Akzent (Favoriten, Herz, CTAs)
- `baby-lavender-*` — Sekundär (Tooltips, KI-Suche, Abschluss)
- `baby-sky-*` — Suche, Info
- `baby-cream-*` — Hintergrund-Variante, Karten
- `baby-gold-*` — Badges, Highlights
- **Hintergrund:** Gradient `from-baby-mint-50 to-baby-lavender-50` (fixiert)

## Typographie
- **Sans:** Nunito (Google Fonts) — freundlich, rund, lesbar
- **Serif:** Georgia — für Vers-Zitate (.verse-text Klasse)

## Interview-Flow (6 Schritte)
```
1. WelcomeStep      → Kindname + Elternwunsch
2. OrientationStep  → Lebenseinstellung (1–3 von 6 Kategorien)
3. TraitsStep       → Charaktereigenschaften (12 Chips + Freitext)
4. SearchStep       → Keyword / KI-Suche (optional)
5. ResultStep       → Verse mit VerseList + Favoriten
6. ShareStep        → Teilen / Drucken / Neustart
```

State zentral in `src/context/InterviewContext.jsx`.

## Datenstruktur: `data/verses.json`
```json
{
  "id": "ps-23-1",
  "book": "Psalmen",
  "chapter": 23,
  "verse": 1,
  "translations": {
    "luther2017": "...",
    "gute_nachricht": "...",
    "elberfelder": "..."
  },
  "categories": ["von-guten-maechten-geborgen"],
  "traits": ["vertrauend", "geborgen"],
  "keywords": ["Hirte", "Fürsorge", "Vertrauen"],
  "tooltip": "Der Psalm beschreibt Gott als treuen Begleiter..."
}
```

## Neue Verse hinzufügen

Neue Verse werden in `data/verses.json` ergänzt. Pflichtfelder sind:

- `id`: eindeutige ID nach der Konvention `buch-kapitel-vers`.
- `book`: deutscher Bibelbuchname.
- `chapter`: Kapitelnummer.
- `verse`: Versnummer.
- `translations.luther2017`: Luther-Text.
- `categories[]`: mindestens eine passende Kategorie-ID.
- `traits[]`: passende Trait-IDs.
- `tooltip`: kurze, pastoral sensible Erklärung für Eltern.

Empfohlen sind außerdem `translations.elberfelder`, `translations.gute_nachricht` als Paraphrase und `keywords[]`.

**ID-Konvention:** lowercase, `buch-kapitel-vers`; Umlaute ersetzen (`ö` → `oe`, `ä` → `ae`, `ü` → `ue`, `ß` → `ss`). Beispiele: `ps-23-1`, `joh-15-9`, `roem-8-38`.

## Kategorien (6)
`von-guten-maechten-geborgen` | `mit-sich-anderen-im-reinen` | `einen-unterschied-machen`
`auf-festem-fundament` | `von-liebe-umgeben` | `in-weitem-raum-leben`

## Traits (12)
`froehlich-dankbar` | `mutig` | `verantwortungsvoll` | `vertrauend` | `liebevoll` | `hoffnungsvoll`
`friedliebend` | `neugierig` | `stark` | `kreativ` | `mitfuehlend` | `geborgen`

## Code-Qualität
- React Hooks + Functional Components
- Keine neuen Dependencies ohne Begründung
- CSS-Klassen: nur `baby-*` Palette (kein `forest-*` mehr)
- Tests: `npm test` (vitest) muss grün bleiben

## KI-Integration
- Semantische Suche: opt-in via Checkbox (SearchStep)
- API-Endpunkt: `VITE_API_URL` env-Variable (Standard: `/api`)
- Backend: `skills/search/` (FastAPI + sentence-transformers, optional)

## Vers-Sortierung
- `src/components/VerseList.jsx` sortiert die Ergebnisse nach Relevanz.
- Relevanz = Kategorie-Match × 2 + Trait-Match.
- Dadurch werden Verse zuerst angezeigt, die zur gewählten Lebensausrichtung passen; Traits verfeinern danach die Reihenfolge.

## Urheberrecht
- Luther 2017: frei verwendbare Arbeitsgrundlage für dieses Projekt.
- Elberfelder: prüfen — nur wenn Texte aus freien Quellen
- Gute Nachricht Bibel: geschützt — nur Paraphrasen/Umschreibungen

## Bekannte Einschränkungen / Out of Scope
- FAISS-Backend und semantische Suche bleiben optional. Die PWA darf nicht davon abhängen.
- GNB-Texte dürfen nicht als längere Originalzitate in `data/verses.json` landen.
- Externe Quellen unter `C:\ai\n8n\shared\app2\` sind lokal verfügbar, aber nicht Teil des Repositories oder der GitHub-Actions-Umgebung.
