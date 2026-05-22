# Instructions - Setup, Deployment und Datenpflege

## Setup

Im Repository `C:\ai\taufspruch-finder` ausführen:

```powershell
npm install
npm run dev
```

Der Vite-Dev-Server ist danach unter `http://localhost:5173/taufspruch-finder/` erreichbar.

## Deployment

Der Produktionsbuild wird lokal mit folgendem Befehl erzeugt:

```powershell
npm run build
```

GitHub Pages wird anschließend über GitHub Actions deployed. Der Workflow baut den Inhalt aus `dist/` und veröffentlicht ihn auf dem `gh-pages`-Branch.

## Interview-Flow

Die App führt Eltern in sechs Schritten zu passenden Taufsprüchen:

1. `WelcomeStep`: Kindname und optionaler Elternwunsch.
2. `OrientationStep`: Lebenseinstellung oder Wunschrichtung auswählen.
3. `TraitsStep`: Charaktereigenschaften auswählen und optional Freitext ergänzen.
4. `SearchStep`: Thema oder Suchbegriff eingeben, optional semantische Suche aktivieren.
5. `ResultStep`: passende Verse mit Tooltip und Favoritenfunktion ansehen.
6. `ShareStep`: Auswahl teilen, kopieren, drucken oder neu starten.

Der zentrale State liegt in `src/context/InterviewContext.jsx`. Dort werden unter anderem `step`, `childName`, `parentWish`, `orientations`, `traits`, `customTrait`, `query`, `semanticMode` und `favorites` verwaltet.

## Neue Verse hinzufügen

Neue Verse werden in `data/verses.json` ergänzt. Jeder Eintrag muss diese Pflichtfelder enthalten:

```json
{
  "id": "roem-8-38",
  "book": "Römer",
  "chapter": 8,
  "verse": 38,
  "translations": {
    "luther2017": "Denn ich bin gewiss..."
  },
  "categories": ["von-guten-maechten-geborgen"],
  "traits": ["vertrauend", "hoffnungsvoll"],
  "tooltip": "Kurze, pastoral sensible Bedeutungserklärung."
}
```

Pflichtfelder:

- `id`: eindeutige Vers-ID.
- `book`: deutscher Bibelbuchname.
- `chapter`: Kapitelnummer.
- `verse`: Versnummer.
- `translations.luther2017`: Luther-Text.
- `categories[]`: mindestens eine Kategorie-ID.
- `traits[]`: passende Trait-IDs.
- `tooltip`: kurze Erklärung für Eltern.

Optionale, aber empfohlene Felder sind `translations.elberfelder`, `translations.gute_nachricht` als Paraphrase und `keywords[]`.

## Vers-ID Konvention

Die ID folgt dem Schema `buch-kapitel-vers`, zum Beispiel `ps-23-1`, `joh-15-9` oder `roem-8-38`.

Umlaute werden ersetzt:

- `ö` -> `oe`
- `ä` -> `ae`
- `ü` -> `ue`
- `ß` -> `ss`

## Externe Quellen

Die folgenden Quellen sind nur lokal unter `C:\ai\n8n\shared\app2\` verfügbar und gehören nicht zum Repository:

- `data\bibeltexte\luther.json`: Luther-JSON mit Bibeltexten.
- `data\bibeltexte\elberfelder.json`: Elberfelder-Texte, sofern lokal vorhanden und passend strukturiert.
- `Predigt_creator\output\sermons\`: Predigt-JSONs mit theologischen Analysen und Bibelreferenzen.
- `Theologie_agent\cli.py`: lokale Theologie-CLI, zum Beispiel für Exegese-Hinweise.

Diese Quellen dienen nur der lokalen Datenpflege. In das Repo gehören daraus abgeleitete, kuratierte Verse und Tooltips in `data/verses.json`.

## Bekannte Einschränkungen

- Gute Nachricht Bibel (GNB) ist urheberrechtlich geschützt. Im Repo nur Paraphrasen oder kurze sinngemäße Hinweise verwenden, keine längeren Wortzitate.
- Das FAISS-Backend für semantische Suche ist optional. Die PWA muss auch ohne laufendes Backend funktionieren.
- Lokale Quellen unter `C:\ai\n8n\shared\app2\` sind nicht Teil des GitHub-Repositories und in GitHub Actions nicht verfügbar.
