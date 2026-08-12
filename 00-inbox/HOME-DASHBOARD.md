---
type: dashboard
created: 2026-08-12
tags: ["#dashboard", "#home"]
---

# Home Dashboard

Source note for Hearth cards. Embed the queries below as Dataview-query cards on your Hearth board (Arrange -> add card -> Dataview query -> paste the query, or embed this whole note as a note card).

## Latest Daily Brief

For a Hearth card that shows the actual brief text (not just a link), use Hearth's **Note** card type and point it at `01-daily/LATEST-BRIEF.md`. This file is a stable filename the daily-brief routine overwrites every morning with the current day's content, so the card always shows today's brief without needing to be re-pointed.

Embed reference (also works if you embed this whole dashboard note instead):

![[01-daily/LATEST-BRIEF]]

## Recent Braindumps

Shows the full text of your last 3 braindumps, newest first, not just links. Uses `dataviewjs` since braindumps live across several folders and get created ad hoc (no single stable filename to point a Note card at, unlike the daily brief above). Add this as a **Dataview** card in Hearth, or embed this whole dashboard note.

```dataviewjs
const pages = dv.pages('"00-inbox" or "02-personal/braindumps" or "03-professional/braindumps" or "04-projects"').where(function(p) { return p.type === "braindump"; }).sort(function(p) { return p.date; }, "desc").limit(3);
for (const p of pages) { dv.header(4, p.file.link); dv.paragraph("![[" + p.file.path + "]]"); }
```

If Hearth's input field mangles backticks (curly-quote autocorrect) even in this version, paste it as one single line exactly as shown, no line breaks, no smart quotes, plain straight double-quotes only.

## Activity Heatmap

Requires the **Heatmap Calendar** plugin (installed) plus Dataview. Counts braindumps and daily briefs per day, not whole-vault edits, so it actually reflects capture activity rather than every file touch. Add as a **Dataview** card in Hearth, pasting only the code below (no fence lines).

```dataviewjs
const counts = {};
const pages = dv.pages('"00-inbox" or "02-personal/braindumps" or "03-professional/braindumps" or "04-projects" or "01-daily/briefs"').where(function(p) { return p.type === "braindump" || p.type === "daily-brief"; });
for (const p of pages) {
  const d = p.date;
  if (!d) continue;
  counts[d] = (counts[d] || 0) + 1;
}
const entries = [];
for (const d in counts) {
  entries.push({ date: d, intensity: counts[d], content: String(counts[d]), color: "green" });
}
const calendarData = {
  colors: { green: ["#c6e48b", "#7bc96f", "#49af5d", "#2e8840", "#196127"] },
  entries: entries
};
renderHeatmapCalendar(this.container, calendarData);
```

## Active Projects at a Glance

```dataview
TABLE status, project
FROM "04-projects"
WHERE type = "project-overview"
SORT project ASC
```

## Open Next Steps Across Projects

```dataview
TASK
FROM "04-projects"
WHERE !completed
GROUP BY file.link
```

---

*Edit the queries above as your folder structure or tagging conventions change. Each block is a standalone Dataview query, copy the query text (without the surrounding note) into a Hearth Dataview card if you don't want to embed this whole note.*
