// Ausführen mit: node scripts/create-png-icons.mjs
// Benötigt: npm install sharp
// Oder online-Tool: https://svgtopng.com/

// Manuelle Alternative: Öffne public/pwa-192x192.svg im Browser
// und mache einen Screenshot in der gewünschten Größe

import { readFileSync, writeFileSync } from 'fs'
console.log('Hinweis: Für PNG-Icons bitte sharp installieren:')
console.log('npm install --save-dev sharp')
console.log('Oder die SVG-Dateien manuell in PNG konvertieren.')
