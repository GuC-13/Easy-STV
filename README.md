# 🎲 Stellvertretung

Spiele und fertige Lektionsabläufe für Stellvertretungen (7.–9. Klasse): lustig, lehrreich, ohne Vorbereitung.
Ein Gerät am Beamer genügt. Keine Anmeldung, keine Schülerdaten, funktioniert auch offline.

## In 60 Sekunden startklar

1. App im Browser öffnen (Safari, Chrome, Edge) und das Gerät an den Beamer hängen.
2. **⚡ 45 Minuten – los!** antippen, Klasse, Fach und Anzahl Teams wählen, **Starten**.
3. Die App führt durch die Lektion: Teams bilden → Teamquiz → Schätzduell → Siegerehrung.
   Oben steht bei jedem Schritt in einer Zeile, was zu tun ist; «Nächste Phase ▸» geht weiter.

Fächer: Gemischt, Allgemeinwissen, Mathe & Logik, Deutsch, Französisch, Englisch, Natur & Technik,
Geografie & Geschichte, Medien & Informatik.

Wer selber zusammenstellen will (30/90 Minuten, kreative Lektionen, Breakout-Room), öffnet
**Mehr: Klasse, Teams und alle Spiele einzeln** und wählt **🧭 Lektion planen** oder ein einzelnes Spiel:

| Format | Wofür |
|---|---|
| 🎯 Teamquiz | Spielfeld mit Kategorien und Punktwerten, in allen Fächern oben |
| 📏 Schätzduell | Teams schätzen Zahlen, wer am nächsten liegt, gewinnt |
| 📱 Klassenrunde | Alle spielen auf dem eigenen iPad mit (QR-Code scannen) |
| 🎨 Teamauftrag | Kreative Gruppenarbeit mit Präsentation und Abstimmung |
| 🗣️ Begriffe raten | Erklären oder Pantomime |
| 🕵️ Wer bin ich? | Hinweis um Hinweis |
| 🧠 Logikrätsel | Knobeln im Team |
| 🚪 Breakout-Room | Rätselstationen, Tür für Tür (auch zum Ausdrucken) |

**🤫 Spickzettel:** Lösungen per QR-Code aufs eigene Handy. Vorher die Bildschirmspiegelung beenden.

## Aufs iPad holen

Seite öffnen → Teilen → **Zum Home-Bildschirm**. Danach startet die App wie eine normale App und läuft auch ohne Internet
(mindestens einmal mit Internet öffnen).

## Hosting

Reine statische Seite, kein Server-Code. Beliebig hosten, z. B. mit GitHub Pages (Settings → Pages → Branch wählen).
Dateien: `index.html` (die ganze App), `sw.js` (Offline-Cache), `manifest.webmanifest` und Icons.

## Datenschutz

Gespeichert werden nur Teamnamen, Punkte und Spielstände im Browser des jeweiligen Geräts (`localStorage`).
Nichts wird an einen Server geschickt. Bei der Klassenrunde stecken die Fragen im QR-Code, die Ergebnisse
kommen per QR-Code zurück zur Lehrperson. Fantasienamen verwenden, keine Namen von Schülerinnen und Schülern.

## Stolpersteine

- **Klassenrunde im Takt braucht richtige Uhren.** Alle iPads rechnen die aktuelle Frage aus der Uhrzeit aus.
  Steht die Uhr eines iPads falsch, ist es im Takt verschoben → «Datum & Uhrzeit» auf automatisch stellen.
- **Klassenrunde: gleiche App-Version.** Die Fragen werden auf jedem Gerät aus dem QR-Code neu erzeugt. Haben
  Lehrperson und SuS verschiedene Versionen, meldet das iPad «Andere App-Version» → neu laden, nochmals scannen.
  Darum Fragenbanken nie mitten im Schuljahr umsortieren (Fragen und Kategorien werden über ihre Position
  referenziert); neue Fragen immer **ans Ende** einer Kategorie anhängen, neue Kategorien ans Ende von `CATS`.
  Eine Kategorie kann mit `also: ["nt"]` zusätzlich in einem weiteren Fach erscheinen.
- **Geteilte iPads:** Im eigenen Tempo kann nach dem Einsammeln «Nächste Person auf diesem iPad» gewählt werden.
- **Offline:** Der Service Worker holt zuerst aus dem Netz und fällt ohne Verbindung auf den Cache zurück.
  Ohne diesen Rückfall startet die App offline nicht.
- **Leere Eingabe ist nicht 0:** `Number("")` ergibt 0. Darum prüft `parseNum` leere Eingaben zuerst.
- **Neue Version veröffentlichen:** `CACHE_NAME` in `sw.js` hochzählen und `#appVersionLabel` in `index.html`
  anpassen, sonst sehen Geräte die alte Version länger als nötig.

## Lizenzen

QR-Lesen per Kamera: [jsQR](https://github.com/cozmo/jsQR) 1.4.0, Apache License 2.0 (in `index.html` eingebunden).
QR-Erzeugung: eigener Code nach ISO/IEC 18004.
