const PROJECTS_FOLDER = "04-projects";
const STATUSES = ["idea", "active", "complete"];
const STATUS_LABELS = ["Idea", "Active", "Complete"];

function notify(message) {
  if (typeof Notice !== "undefined") new Notice(message);
  else console.log(message);
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function timestamp() {
  const now = new Date();
  const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  return `${date} ${time}`;
}

function currentStatus(text) {
  const match = text.match(/^status:\s*(.+)$/m);
  return match ? match[1].trim() : undefined;
}

function setStatus(text, status) {
  return /^status:.*$/m.test(text)
    ? text.replace(/^status:.*$/m, `status: ${status}`)
    : text.replace(/^---\n/, `---\nstatus: ${status}\n`);
}

const CLOSING_HEADING = "## Closing Notes";

function addClosingNote(text, note) {
  const entry = `- ${timestamp()}: ${note}`;
  const headingIndex = text.indexOf(CLOSING_HEADING);

  if (headingIndex !== -1) {
    const afterHeading = headingIndex + CLOSING_HEADING.length;
    const nextHeadingMatch = text.slice(afterHeading).match(/\n##\s/);
    const insertPos = nextHeadingMatch ? afterHeading + nextHeadingMatch.index : text.length;
    const before = text.slice(0, insertPos).replace(/\s*$/, "");
    const after = text.slice(insertPos);
    return `${before}\n${entry}\n${after}`.replace(/\n{3,}/g, "\n\n");
  }

  const section = `${CLOSING_HEADING}\n\n${entry}\n`;
  const footerMatch = text.match(/\n---\n\n\*This overview helps/);
  if (footerMatch) {
    const insertAt = footerMatch.index + 1;
    return `${text.slice(0, insertAt)}${section}\n${text.slice(insertAt)}`;
  }
  return `${text.replace(/\s*$/, "")}\n\n${section}`;
}

const STATUS_BANNER = {
  idea: { type: "question", label: "Idea" },
  active: { type: "tip", label: "Active" },
  complete: { type: "success", label: "Complete" },
};

const STATUS_BANNER_PATTERN = /^> \[!\w+\] Status: .+$/m;

function statusBanner(status) {
  const entry = STATUS_BANNER[status] || { type: "note", label: status || "Unknown" };
  return `> [!${entry.type}] Status: ${entry.label}`;
}

function upsertStatusBanner(text, status) {
  const banner = statusBanner(status);
  if (STATUS_BANNER_PATTERN.test(text)) {
    return text.replace(STATUS_BANNER_PATTERN, banner);
  }
  const h1Match = text.match(/^# .+$/m);
  if (h1Match) {
    const insertAt = h1Match.index + h1Match[0].length;
    return `${text.slice(0, insertAt)}\n\n${banner}${text.slice(insertAt)}`;
  }
  return `${banner}\n\n${text}`;
}

module.exports = async ({ app, quickAddApi }) => {
  const activeFile = app.workspace.getActiveFile();
  if (!activeFile) {
    notify("No active file found.");
    return;
  }

  const folder = activeFile.parent;
  if (!folder || folder.path.split("/")[0] !== PROJECTS_FOLDER || folder.path === PROJECTS_FOLDER) {
    notify(`This button only works inside a project folder under ${PROJECTS_FOLDER}/.`);
    return;
  }

  const overviewPath = `${folder.path}/PROJECT-OVERVIEW.md`;
  const overviewFile = app.vault.getAbstractFileByPath(overviewPath);
  if (!overviewFile) {
    notify(`Could not find PROJECT-OVERVIEW.md in ${folder.path}.`);
    return;
  }

  let text = await app.vault.read(overviewFile);
  const status = currentStatus(text);

  const chosenLabel = await quickAddApi.suggester(STATUS_LABELS, STATUS_LABELS);
  if (!chosenLabel) return;
  const next = STATUSES[STATUS_LABELS.indexOf(chosenLabel)];

  if (next === status) {
    notify(`"${folder.name}" is already ${next}.`);
    return;
  }

  if (next === "complete") {
    const note = (await quickAddApi.inputPrompt("Closing note (what happened / outcome):")) || "";
    if (note.trim()) text = addClosingNote(text, note.trim());
  }

  text = setStatus(text, next);
  text = upsertStatusBanner(text, next);
  await app.vault.modify(overviewFile, text);

  const improvementsPath = `${folder.path}/improvements.md`;
  const improvementsFile = app.vault.getAbstractFileByPath(improvementsPath);
  if (improvementsFile) {
    const improvementsText = await app.vault.read(improvementsFile);
    await app.vault.modify(improvementsFile, upsertStatusBanner(improvementsText, next));
  }

  notify(`"${folder.name}" moved from ${status || "unset"} to ${next}.`);
};
