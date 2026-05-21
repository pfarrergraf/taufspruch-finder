# Cloud – Hosting und Infrastruktur

Das Taufspruch Finder Projekt ist zunächst als statische PWA ausgelegt. Diese Datei beschreibt Hosting‑Optionen und spätere Erweiterungen.

## GitHub Pages (Standard)
- Statisches Hosting über GitHub Pages ist kostenlos und erfordert keinen eigenen Server.
- Das Projekt wird in den Branch `gh-pages` deployt.
- HTTPS wird automatisch konfiguriert.
- Für eine eigene Domain kannst du einen DNS‑CNAME‑Record setzen und sie in den Pages‑Einstellungen eintragen.

## Vercel/Netlify (Optional)
- Unterstützen statische Sites und serverlose Funktionen (Edge Functions).
- Einfaches Deployment per CLI oder GitHub Integration.
- Nützlich, wenn du eine API (FastAPI) oder KI‑Service bereitstellen möchtest.
- Kostenloser Plan für Hobbyprojekte, mit Limits.

## Serverless Functions
- Für semantische Suche und Tracking kannst du serverlose Funktionen einsetzen (Vercel Function, Netlify Function oder AWS Lambda).
- FastAPI + Uvicorn kann in einer serverlosen Umgebung laufen, beachte Kaltstartzeiten.
- Alternativ kannst du Dritten wie Pinecone, Supabase oder Typesense verwenden, um Vektor‑Datenbanken zu hosten.

## Datenhaltung
- Kleine Datenmengen (Verse, Kategorien) können als JSON im Repo gespeichert werden.
- Für häufige Updates oder Nutzungsstatistiken ist eine externe Datenbank empfehlenswert (z. B. Supabase, Firebase).

