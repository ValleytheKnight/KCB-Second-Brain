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
const pages = dv.pages('"00-inbox" or "02-personal/braindumps" or "03-professional/braindumps" or "04-projects"')
  .where(p => p.type === "braindump")
  .sort(p => p.date, 'desc')
  .limit(3);

for (const p of pages) {
  dv.header(4, p.file.link);
  dv.paragraph(`![[${p.file.path}]]`);
}
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
