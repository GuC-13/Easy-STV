// Erzeugt FRAGEN.md: Übersicht über alle Quizfragen und Schätzfragen in index.html.
// Aufruf im Projektordner: node tools/fragen-tabelle.mjs
import { readFileSync, writeFileSync } from "node:fs";
import vm from "node:vm";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
// Hilfsfunktionen, Inhalte und Generatoren stehen vor dem Abschnitt «Zustand» und brauchen kein DOM
const start = html.indexOf('"use strict";');
const end = html.indexOf("/* =====================================================================\n   Zustand");
if (start < 0 || end < 0) throw new Error("Abschnitte in index.html nicht gefunden");
const code = html.slice(start, end) + "\n;({ CATS, BANK, EST, FOCI })";
const { CATS, BANK, EST, FOCI } = vm.runInNewContext(code, { Intl, Math, Number, String, Array, Object, JSON, Set, Map });

const cell = (v) => String(v ?? "").replace(/<[^>]+>/g, "").replace(/\|/g, "\\|").replace(/\n/g, " ");
const focusName = (id) => (FOCI.find((f) => f.id === id) || { name: id }).name;
const fociOf = (c) => [c.focus, ...(c.also || [])];
const levels = (items) => [1, 2, 3, 4, 5].map((l) => items.filter((it) => it[0] === l).length).join(" · ");

let md = `# Fragenübersicht

Automatisch erzeugt aus \`index.html\` mit \`node tools/fragen-tabelle.mjs\`. Nicht von Hand bearbeiten.

**Schwierigkeit 1–5:** Das Teamquiz wählt pro Zeile eine Schwierigkeit (100 Punkte = leicht, 400/500 = schwer)
und passt sie an die Klasse an (7. Klasse eher leichter, 9. Klasse eher schwerer).
**Typ:** «Fragenbank» = feste Fragen; «automatisch» = die App erzeugt bei jedem Spiel neue Aufgaben.
**Antwortart:** Mit Falschantworten erscheinen die Fragen als Multiple Choice (A–D), sonst als offene Frage.

## Übersicht

| Fach | Kategorie | Typ | Anzahl | pro Schwierigkeit 1 · 2 · 3 · 4 · 5 |
|---|---|---|---:|---|
`;
for (const f of FOCI.filter((f) => f.id !== "mix")) {
  for (const c of CATS.filter((c) => fociOf(c).includes(f.id))) {
    const items = BANK[c.id] || [];
    md += `| ${f.name} | ${c.icon} ${cell(c.name)} | ${c.gen ? "automatisch" : "Fragenbank"} | ${c.gen ? "∞" : items.length} | ${c.gen ? "–" : levels(items)} |\n`;
  }
}
const bankTotal = CATS.reduce((s, c) => s + (c.gen ? 0 : (BANK[c.id] || []).length), 0);
md += `\n**Total:** ${bankTotal} feste Quizfragen in ${CATS.filter((c) => !c.gen).length} Kategorien, `
  + `${CATS.filter((c) => c.gen).length} automatische Kategorien, ${EST.length} Schätzfragen.\n`;

for (const f of FOCI.filter((f) => f.id !== "mix")) {
  const cats = CATS.filter((c) => c.focus === f.id);
  if (!cats.length) continue;
  md += `\n## ${f.name}\n`;
  for (const c of cats) {
    const also = (c.also || []).map(focusName);
    md += `\n### ${c.icon} ${cell(c.name)}${also.length ? ` <sub>(auch in: ${also.join(", ")})</sub>` : ""}\n\n`;
    if (c.gen) {
      // Beispiele mit festem Zufall, damit die Datei nur bei echten Änderungen anders aussieht
      let seed = 12345;
      const orig = Math.random;
      Math.random = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
      md += "Automatisch erzeugt, bei jedem Spiel neu. Beispiele:\n\n| Schwierigkeit | Beispielaufgabe | Lösung |\n|---|---|---|\n";
      try {
        for (const L of [1, 2, 3, 4, 5]) for (let k = 0; k < 2; k++) {
          const g = c.gen(L);
          md += `| ${L} | ${cell(g.q)} | ${cell(typeof g.a === "number" ? g.a + (g.unit ? " " + g.unit : "") : g.a)} |\n`;
        }
      } finally { Math.random = orig; }
      continue;
    }
    md += "| Nr. | Schw. | Frage | Antwort | Falschantworten |\n|---:|:---:|---|---|---|\n";
    (BANK[c.id] || []).map((it, i) => ({ it, i })).sort((a, b) => a.it[0] - b.it[0] || a.i - b.i)
      .forEach(({ it, i }) => { md += `| ${i + 1} | ${it[0]} | ${cell(it[1])} | ${cell(it[2])} | ${it[3] ? it[3].map(cell).join(" · ") : "–"} |\n`; });
  }
}

md += "\n## 📏 Schätzduell\n\n| Nr. | Frage | Antwort | Einheit |\n|---:|---|---:|---|\n";
EST.forEach((e, i) => { md += `| ${i + 1} | ${cell(e[0])} | ${cell(e[1])} | ${cell(e[2]) || (e[4] ? "Jahr" : "")} |\n`; });

writeFileSync(new URL("../FRAGEN.md", import.meta.url), md);
console.log(`FRAGEN.md geschrieben: ${bankTotal} Quizfragen, ${EST.length} Schätzfragen.`);
