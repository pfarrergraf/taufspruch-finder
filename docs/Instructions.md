# Instructions – Entwicklung und Deployment

Dieses Dokument beschreibt, wie du das Projekt lokal einrichtest, entwickelst und bereitstellst.

## Voraussetzungen
- Node.js ab Version 18 (für das Frontend).
- Python 3.11 oder 3.12, falls du die semantische Suche lokal entwickeln möchtest.
- Paketmanager: `uv` (statt `pip`) für Python, `npm` oder `yarn` für JavaScript.
- GitHub‑Account für Deployment via GitHub Pages.

## Lokale Entwicklung (Frontend)
1. Klone dieses Repository:
   ```bash
   git clone <repo-url>
   cd taufspruch-finder
   ```
2. Installiere die Node‑Abhängigkeiten:
   ```bash
   npm install
   ```
3. Starte die Entwicklungsumgebung:
   ```bash
   npm run dev
   ```
   Die App ist dann unter `http://localhost:5173` erreichbar.

## Deployment auf GitHub Pages
1. Baue die Anwendung:
   ```bash
   npm run build
   ```
   Dadurch entsteht das Verzeichnis `dist/`.
2. Verschiebe den Build in den Branch `gh-pages` (GitHub Action oder manuell).
3. Aktiviere GitHub Pages in den Repository‑Einstellungen und wähle den `gh-pages`‑Branch aus.
4. Optional: Für eine eigene Domain lege bei deinem Domain‑Registrar einen `CNAME`‑Record an, der auf `<username>.github.io` zeigt, und trage die Domain in den Pages‑Einstellungen ein.

## Optional: Backend oder KI‑Funktion
Falls du eine semantische Suche oder Auslegungen anbieten möchtest, kannst du einen serverlosen Dienst einrichten:
1. Installiere Python‑Abhängigkeiten via `uv`:
   ```bash
   python -m venv .venv
   source .venv/bin/activate
   uv pip install -r requirements.txt
   ```
2. Entwickle eine API mit FastAPI im Verzeichnis `skills/` oder `backend/`.
3. Deploye die API auf Vercel/Netlify Functions.

Weitere Details findest du in den jeweiligen Markdown‑Dateien.

