# Agents – Rollen, Verantwortlichkeiten und Sub-Agenten

## Entwicklungs-Sub-Agenten (Claude Code / Copilot / Codex)

Diese Agenten wurden beim Umbau auf v2.0 eingesetzt und können bei Erweiterungen wieder aktiviert werden.

| Agent | Schwerpunkt | Status |
|---|---|---|
| Agent 1 | Design-Agent | ✅ Abgeschlossen |
| Agent 2 | Data-Agent | ✅ Abgeschlossen |
| Agent 3 | Bibelvers-Agent | ✅ Abgeschlossen |
| Agent 4 | Interview-UI-Agent | ✅ Abgeschlossen |
| Agent 5 | Docs-Agent | ✅ Abgeschlossen |

### Design-Agent

**Verantwortung:** Visuelles Design

**Input:** `tailwind.config.js`, `src/index.css`, alle `src/components/*.jsx`

**Output:** baby-* Farbpalette, Nunito-Font, neue CSS-Utilities (step-card, category-tile, trait-chip)

**Checklist:** `docs/MASTERPLAN.md` → Agent 1

### Data-Agent

**Verantwortung:** Kategorien und Traits

**Input:** Kategorien- und Traits-Tabellen aus MASTERPLAN.md

**Output:** `src/utils/filterData.js` mit 6 CATEGORIES + 12 TRAITS

**Checklist:** `docs/MASTERPLAN.md` → Agent 2

### Bibelvers-Agent

**Verantwortung:** Vers-Datenbasis

**Input:** `C:\ai\n8n\shared\app2\data\bibeltexte\luther.json`, Predigt-JSONs aus `Predigt_creator\output\sermons\`

**Output:** `data/verses.json` mit 100+ Versen, Übersetzungen, Kategorien, Traits, Tooltip

**Ergebnis:** Der Bibelvers-Agent nutzte 162 Verse aus Luther-JSON und Predigt-JSONs als kuratierte Datenbasis.

**Externe Quellen:** Luther 2017, Elberfelder, Theologie-Agent CLI

**Checklist:** `docs/MASTERPLAN.md` → Agent 3

### Interview-UI-Agent

**Verantwortung:** 6-Schritte Interview-Flow

**Input:** filterData.js (6 Kat./12 Traits), baby-* Tailwind-Klassen

**Output:** `src/context/InterviewContext.jsx`, `src/components/interview/*.jsx`, neues `src/App.jsx`

**Checklist:** `docs/MASTERPLAN.md` → Agent 4

### Docs-Agent

**Verantwortung:** Dokumentation

**Input:** Finaler Codestand

**Output:** `docs/Codex.md`, `docs/Agents.md`, `docs/Instructions.md`

**Checklist:** `docs/MASTERPLAN.md` → Agent 5

## Fachliche Rollen (Team)

| Rolle | Verantwortung |
|---|---|
| **Product Owner** | Anforderungen, Prioritäten, Pastorale Qualität |
| **Frontend Developer** | React/Vite/Tailwind, Interview-Komponenten |
| **Data Curator** | Vers-Auswahl, Tooltips, theologische Sorgfalt |
| **AI Engineer** | Semantische Suche (FAISS), Theologie-Agent |
| **DevOps** | GitHub Actions, GitHub Pages, Domain |
| **UX Designer** | Design-System, Pastel-Palette, Accessibility |

## Abhängigkeiten zwischen Sub-Agenten

```text
Design-Agent ──┐
               ├──► Interview-UI-Agent ──► Docs-Agent
Data-Agent ────┘
Bibelvers-Agent (parallel, Output in data/verses.json)
```
