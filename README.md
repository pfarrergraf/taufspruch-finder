# Taufspruch Finder

Dies ist der Projektprototyp für eine moderne, interaktive Web‑App, die Familien bei der Auswahl eines Taufspruchs unterstützt. Die App basiert auf den Kernfunktionen von taufspruch.de, erweitert sie jedoch um eine übersichtliche Benutzerführung, mehr Bibelverse und eine spielerische Filter‑ und Suchfunktion.

## Vision
- Nutzer wählen ihre Lebenseinstellungen und Charakterzüge des Kindes aus einem intuitiven Set an Filtern. Die Filter orientieren sich an bestehenden Kategorien wie „Mit sich selbst & anderen im Reinen“, „Von guten Mächten geborgen“, „Einen Unterschied machen“ sowie an Charaktereigenschaften wie „Fröhlich und dankbar“, „Mutig“ oder „Verantwortungsvoll“.
- Eine semantische Suche bietet intelligente Vorschläge und erlaubt Stichwortsuche mit verschiedenen Übersetzungen (Luther 2017, Gute Nachricht, revidierte Elberfelder etc.).
- Die App läuft als Progressive Web App (PWA) offline auf Smartphones, speichert Favoriten lokal und ermöglicht das Teilen per Link oder Messenger.

## Aufbau
Dieses Repository enthält nur das Grundgerüst. Die eigentliche App wird im `src/`‑Verzeichnis entwickelt. Weitere Informationen:
- `assets/` – statische Dateien (Bilder, Icons).
- `data/` – vorbereitete JSON‑Dateien mit Bibelversen und Metadaten.
- `docs/` – Dokumentation und Leitfäden (siehe Codex, Instructions, Cloud etc.).
- `skills/` – späterer Ort für AI‑Skills oder serverlose Funktionen.
- `requirements.txt` und `pyproject.toml` – optionale Python‑Abhängigkeiten für den semantischen Suchdienst.
- Weitere Markdown‑Dateien enthalten Rollenbeschreibungen, Richtlinien und Planung.

## Deployment
Die App kann als statische Website über GitHub Pages bereitgestellt werden. Eine eigene Domain (z. B. *taufspruch‑finder.de*) lässt sich durch Hinzufügen eines `CNAME`-Eintrags beim Domain‑Registrar konfigurieren. Die DNS‑Konfiguration für Subdomains erfolgt über einen `CNAME`‑Record. Alternativ lässt sich das Projekt auf Vercel oder Netlify deployen, wenn serverlose Funktionen benötigt werden.

## Lizenz
Bitte ergänzen Sie eine geeignete Open‑Source‑Lizenz (z. B. MIT oder GPL), falls Sie den Code veröffentlichen.



## Entwicklung

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
# → http://localhost:5173/taufspruch-finder/

# Tests ausführen
npm run test

# Production-Build erstellen
npm run build
```

Das Deployment auf **GitHub Pages** erfolgt automatisch per GitHub Actions: Jeder Push auf den `main`-Branch triggert den Workflow `.github/workflows/deploy.yml`, der die App baut und in den `gh-pages`-Branch deployt. Pull Requests werden durch `.github/workflows/lint-pr.yml` automatisch gelinted und getestet.