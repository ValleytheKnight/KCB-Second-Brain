const PROJECTS_FOLDER = "04-projects";
const OPEN_HEADING = "## Open";

function pad(n) {
  return String(n).padStart(2, "0");
}

function timestamp() {
  const now = new Date();
  const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  return { date, stamp: `${date} ${time}` };
}

const STATUS_BANNER = {
  idea: { type: "question", label: "Idea" },
  active: { type: "tip", label: "Active" },
  complete: { type: "success", label: "Complete" },
};

function statusBanner(status) {
  const entry = STATUS_BANNER[status] || STATUS_BANNER.idea;
  return `> [!${entry.type}] Status: ${entry.label}`;
}

function newFileContent(project, date, line, status) {
  return [
    "---",
    "title: Improvement Ideas",
    `project: ${project}`,
    "type: improvements-log",
    `created: ${date}`,
    "---",
    "",
    "# Improvement Ideas",
    "",
    statusBanner(status),
    "",
    "Running log of improvement ideas for this project as they come up. Add a dated entry when an idea strikes; triage periodically (promote to a task, discard, or leave open).",
    "",
    "```button",
    "name Promote Project",
    "type command",
    "action QuickAdd: Promote Project",
    "```",
    "",
    OPEN_HEADING,
    "",
    line,
    "",
    "## Triaged / Actioned",
    "",
    "- ",
    "",
  ].join("\n");
}

function notify(message) {
  if (typeof Notice !== "undefined") new Notice(message);
  else console.log(message);
}

function insertUnderOpen(text, line) {
  const headingIndex = text.indexOf(OPEN_HEADING);
  if (headingIndex === -1) {
    return text.replace(/\s*$/, "") + `\n\n${OPEN_HEADING}\n\n${line}\n`;
  }
  const afterHeading = headingIndex + OPEN_HEADING.length;
  const nextHeadingMatch = text.slice(afterHeading).match(/\n##\s/);
  const insertPos = nextHeadingMatch ? afterHeading + nextHeadingMatch.index : text.length;
  const before = text.slice(0, insertPos).replace(/\s*$/, "");
  const after = text.slice(insertPos);
  return `${before}\n${line}\n${after}`.replace(/\n{3,}/g, "\n\n");
}

module.exports = async ({ app, quickAddApi }) => {
  const folder = app.vault.getAbstractFileByPath(PROJECTS_FOLDER);
  if (!folder || !folder.children) {
    notify(`No "${PROJECTS_FOLDER}" folder found.`);
    return;
  }

  const projects = folder.children
    .filter((f) => f.children !== undefined)
    .map((f) => f.name)
    .sort();

  if (projects.length === 0) {
    notify(`No project folders found under "${PROJECTS_FOLDER}".`);
    return;
  }

  const project = await quickAddApi.suggester(projects, projects);
  if (!project) return;

  const idea = (await quickAddApi.inputPrompt("Improvement idea:")) || "";
  if (!idea.trim()) return;

  const { date, stamp } = timestamp();
  const line = `- [ ] ${stamp}: ${idea.trim()}`;
  const targetPath = `${PROJECTS_FOLDER}/${project}/improvements.md`;

  const file = app.vault.getAbstractFileByPath(targetPath);
  if (!file) {
    const overviewFile = app.vault.getAbstractFileByPath(`${PROJECTS_FOLDER}/${project}/PROJECT-OVERVIEW.md`);
    let status = "idea";
    if (overviewFile) {
      const overviewText = await app.vault.read(overviewFile);
      const match = overviewText.match(/^status:\s*(.+)$/m);
      if (match) status = match[1].trim();
    }
    await app.vault.create(targetPath, newFileContent(project, date, line, status));
    notify(`Created improvements.md for ${project} and logged idea.`);
    return;
  }

  const text = await app.vault.read(file);
  await app.vault.modify(file, insertUnderOpen(text, line));
  notify(`Logged improvement idea to ${project}.`);
};
