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

Self-contained, no heatmap plugin required, just Dataview. Counts braindumps, daily briefs, ideas, active/completed project overviews, completed tasks, and git commits (from `00-inbox/git-commit-counts.json`) per day, not whole-vault edits, so it actually reflects capture and shipping activity rather than every file touch. Renders its own 12-week grid directly in dataviewjs, with month labels on top and weekday labels on the left (the vault's installed **Codeless Heatmap Calendar** plugin is a different, Toggl-focused plugin with no code-block API, so nothing external is called here). Add as a **Dataview** card in Hearth, pasting only the code below (no fence lines). This is kept in sync with the live query stored in the Hearth card itself, so if you edit one, mirror the change in the other.

```dataviewjs
const counts = {};
const pages = dv.pages('"00-inbox" or "02-personal/braindumps" or "03-professional/braindumps" or "04-projects" or "01-daily/briefs"');
for (const p of pages) {
  let shouldCount = false;
  let d = p.date;
  if (!d && p.file.mtime) {
    d = p.file.mtime.toFormat ? p.file.mtime.toFormat("yyyy-MM-dd") : String(p.file.mtime);
  }
  if (!d) continue;
  if (typeof d !== "string") {
    d = d.toFormat ? d.toFormat("yyyy-MM-dd") : String(d);
  }
  if (p.type === "braindump" || p.type === "daily-brief" || p.type === "idea") shouldCount = true;
  if (p.type === "project-overview" && (p.status === "active" || p.status === "complete")) shouldCount = true;
  if (p.file && p.file.tasks) {
    const completed = p.file.tasks.filter(function(t) { return t.completed; }).length;
    if (completed > 0) {
      counts[d] = (counts[d] || 0) + completed;
      shouldCount = false;
    }
  }
  if (shouldCount) counts[d] = (counts[d] || 0) + 1;
}
try {
  const raw = await dv.io.load("00-inbox/git-commit-counts.json");
  if (raw) {
    const gitCounts = JSON.parse(raw);
    for (const d in gitCounts) {
      counts[d] = (counts[d] || 0) + gitCounts[d];
    }
  }
} catch (e) {}

const shades = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
function colorFor(n) {
  if (!n) return shades[0];
  if (n === 1) return shades[1];
  if (n === 2) return shades[2];
  if (n === 3) return shades[3];
  return shades[4];
}

const days = 84;
const today = new Date();
today.setHours(0, 0, 0, 0);
const start = new Date(today);
start.setDate(start.getDate() - (days - 1));
start.setDate(start.getDate() - start.getDay());

const weeks = [];
let cursor = new Date(start);
while (cursor <= today) {
  const week = [];
  for (let i = 0; i < 7; i++) {
    week.push(cursor <= today ? new Date(cursor) : null);
    cursor.setDate(cursor.getDate() + 1);
  }
  weeks.push(week);
}

const cols = `28px repeat(${weeks.length}, 12px)`;
const wrapper = this.container.createEl("div");
wrapper.style.display = "flex";
wrapper.style.flexDirection = "column";
wrapper.style.gap = "3px";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monthRow = wrapper.createEl("div");
monthRow.style.display = "grid";
monthRow.style.gridTemplateColumns = cols;
monthRow.style.gap = "3px";
monthRow.createEl("div");
let lastMonth = -1;
for (const week of weeks) {
  const firstValid = week.find(function(d) { return d; });
  const cell = monthRow.createEl("div");
  cell.style.fontSize = "9px";
  cell.style.color = "var(--text-muted)";
  if (firstValid && firstValid.getMonth() !== lastMonth && firstValid.getDate() <= 7) {
    cell.textContent = monthNames[firstValid.getMonth()];
    lastMonth = firstValid.getMonth();
  }
}

const bodyGrid = wrapper.createEl("div");
bodyGrid.style.display = "grid";
bodyGrid.style.gridTemplateColumns = cols;
bodyGrid.style.gridAutoFlow = "row";
bodyGrid.style.gap = "3px";

const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];
for (let row = 0; row < 7; row++) {
  const label = bodyGrid.createEl("div");
  label.textContent = dayLabels[row];
  label.style.fontSize = "9px";
  label.style.color = "var(--text-muted)";
  label.style.display = "flex";
  label.style.alignItems = "center";
  for (const week of weeks) {
    const d = week[row];
    const cell = bodyGrid.createEl("div");
    if (!d) {
      cell.style.width = "12px";
      cell.style.height = "12px";
      continue;
    }
    const key = d.toISOString().slice(0, 10);
    const n = counts[key] || 0;
    cell.style.width = "12px";
    cell.style.height = "12px";
    cell.style.borderRadius = "2px";
    cell.style.background = colorFor(n);
    cell.title = key + ": " + n + (n === 1 ? " entry" : " entries");
  }
}
```

## Quick Capture

The Buttons plugin's `button` code blocks don't work inside Hearth cards (Embed or otherwise). Buttons requires a real open Markdown editor view to find an "active file," which an embedded render inside Hearth's board never has, so clicks fail with "No active file found." Use Hearth's native **Commands** card type instead: Add card, then Commands, then Add command, then search for and pick `QuickAdd: New Improvement Idea`, then again for `QuickAdd: New Project Idea`. That card kind calls the command directly and isn't affected by the active-file requirement.

**New Improvement Idea** picks a project from `04-projects/`, prompts for idea text, and appends it as a checkbox with a timestamp to that project's `improvements.md`. **New Project Idea** prompts for a project name and one-line description, creates `04-projects/<slug>/PROJECT-OVERVIEW.md` and a matching `improvements.md`, and opens the new overview note.

## Recent Ideas

Shows the 5 most recently captured open improvement ideas across all projects. Add as a separate **Dataview** card if you want it visible alongside the Quick Capture buttons.

```dataviewjs
const pages = dv.pages('"04-projects"').where(function(p) { return p.type === "improvements-log"; });
const rows = [];
for (const p of pages) {
  const content = await dv.io.load(p.file.path);
  const lines = content.split("\n").filter(function(l) { return l.trim().startsWith("- [ ]"); });
  for (const l of lines) rows.push({ project: p.project || p.file.folder, line: l.trim() });
}
rows.sort(function(a, b) { return b.line.localeCompare(a.line); });
const shown = rows.slice(0, 5);
if (shown.length === 0) {
  dv.paragraph("*No open ideas yet.*");
} else {
  for (const r of shown) dv.paragraph(`**${r.project}** ${r.line.replace("- [ ] ", "")}`);
}
```

## Ideas Needing Action

One place for everything that needs a decision or a start: projects still in the idea phase (`status: idea` in `PROJECT-OVERVIEW.md`), plus every open improvement idea across all projects (unchecked lines under `## Open` in each project's `improvements.md` that haven't been triaged/actioned yet). Unlike Recent Ideas above, this is the full list, not capped at 5. Add as a **Dataview** card in Hearth.

```dataviewjs
function extractSection(content, heading) {
  const idx = content.indexOf(heading);
  if (idx === -1) return "";
  const after = idx + heading.length;
  const nextHeadingMatch = content.slice(after).match(/\n##\s/);
  const end = nextHeadingMatch ? after + nextHeadingMatch.index : content.length;
  return content.slice(after, end).trim();
}

const ideaProjects = dv.pages('"04-projects"').where(function(p) { return p.type === "project-overview" && p.status === "idea"; });
dv.header(4, "Idea-Phase Projects");
if (ideaProjects.length === 0) {
  dv.paragraph("*None.*");
} else {
  for (const p of ideaProjects.sort(function(p) { return p.project; })) {
    const content = await dv.io.load(p.file.path);
    const description = extractSection(content, "## What is this project?");
    dv.header(5, `[[${p.file.path}|${p.project}]]`);
    dv.paragraph(description || "*No description yet.*");
  }
}

const logPages = dv.pages('"04-projects"').where(function(p) { return p.type === "improvements-log"; });
const rows = [];
for (const p of logPages) {
  const content = await dv.io.load(p.file.path);
  const lines = content.split("\n").filter(function(l) { return l.trim().startsWith("- [ ]"); });
  for (const l of lines) rows.push({ project: p.project || p.file.folder, line: l.trim().replace("- [ ] ", "") });
}
dv.header(4, "Open Improvement Ideas");
if (rows.length === 0) {
  dv.paragraph("*None.*");
} else {
  for (const r of rows) dv.paragraph(`**${r.project}** ${r.line}`);
}
```

## Active Projects at a Glance

```dataview
TABLE WITHOUT ID link(file.path, project) AS "Project", status AS "Status"
FROM "04-projects"
WHERE type = "project-overview"
SORT project ASC
```

## Open Next Steps Across Projects

```dataviewjs
function titleCase(slug) {
  return slug.split("-").map(function(w) { return w.charAt(0).toUpperCase() + w.slice(1); }).join(" ");
}
const pages = dv.pages('"04-projects"');
const byFolder = {};
for (const p of pages) {
  for (const t of p.file.tasks) {
    if (t.completed) continue;
    const folder = p.file.folder;
    if (!byFolder[folder]) byFolder[folder] = [];
    byFolder[folder].push(t);
  }
}
const folders = Object.keys(byFolder).sort();
for (const folder of folders) {
  const slug = folder.replace(/^04-projects\//, "");
  dv.header(4, `${titleCase(slug)} (${byFolder[folder].length})`);
  dv.taskList(byFolder[folder], false);
}
```

---

*Edit the queries above as your folder structure or tagging conventions change. Each block is a standalone Dataview query, copy the query text (without the surrounding note) into a Hearth Dataview card if you don't want to embed this whole note.*
