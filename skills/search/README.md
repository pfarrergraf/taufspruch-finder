# Semantische Suche – FastAPI

## Lokale Entwicklung
```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```
API erreichbar unter http://localhost:8000

## Endpunkte
- GET /api/health — Statuscheck
- POST /api/search — Semantische Suche
  Body: `{"query": "Mut und Stärke", "top_k": 10}`

## Deployment auf Vercel
```bash
npm i -g vercel
vercel
```
Die `vercel.json` im Projekt-Root konfiguriert das Routing.

## Modell
`paraphrase-multilingual-MiniLM-L12-v2` — 120MB, unterstützt Deutsch und Englisch.
Der FAISS-Index wird beim ersten Request lazy gebaut und gecacht.
