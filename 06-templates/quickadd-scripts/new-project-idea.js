const PROJECTS_FOLDER = "04-projects";

function slugify(name) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function timestamp() {
  const now = new Date();
  const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  return { date, stamp: `${date} ${time}` };
}

function overviewContent(name, slug, stamp, description, currentStatus, projectResources, nextSteps) {
  return [
    "---",
    "type: project-overview",
    `project: ${name}`,
    `slug: ${slug}`,
    `created: ${stamp}`,
    "status: idea",
    'tags: ["#project", "#overview"]',
    "---",
    "",
    `# ${name}`,
    "",
    "> [!question] Status: Idea",
    "",
    `*Created: ${stamp}*`,
    "",
    "```button",
    "name Promote Project",
    "type command",
    "action QuickAdd: Promote Project",
    "```",
    "",
    "## What is this project?",
    description || "",
    "",
    "## Current Status",
    currentStatus || "",
    "",
    "## Project Resources",
    projectResources || "",
    "",
    "## Next Steps",
    nextSteps || "- [ ] ",
    "",
    "---",
    "",
    `*This overview helps COG organize your ${name}-related thoughts and updates.*`,
    "",
  ].join("\n");
}

function improvementsContent(slug, date) {
  return [
    "---",
    "title: Improvement Ideas",
    `project: ${slug}`,
    "type: improvements-log",
    `created: ${date}`,
    "---",
    "",
    "# Improvement Ideas",
    "",
    "> [!question] Status: Idea",
    "",
    "Running log of improvement ideas for this project as they come up. Add a dated entry when an idea strikes; triage periodically (promote to a task, discard, or leave open).",
    "",
    "## Open",
    "",
    "- ",
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

module.exports = async ({ app, quickAddApi }) => {
  const name = (await quickAddApi.inputPrompt("Project name:")) || "";
  if (!name.trim()) return;

  const slug = slugify(name);
  if (!slug) {
    notify("Project name didn't produce a usable folder name.");
    return;
  }

  const folderPath = `${PROJECTS_FOLDER}/${slug}`;
  if (app.vault.getAbstractFileByPath(folderPath)) {
    notify(`A project folder already exists at "${folderPath}".`);
    return;
  }

  const description = (await quickAddApi.inputPrompt("One-line description:")) || "";
  const currentStatus = (await quickAddApi.inputPrompt("Current status:")) || "";
  const projectResources = (await quickAddApi.inputPrompt("Project resources (e.g. links, folders):")) || "";
  const nextSteps = (await quickAddApi.inputPrompt("Next steps (first item):")) || "";

  const { date, stamp } = timestamp();
  await app.vault.createFolder(folderPath);
  const overviewFile = await app.vault.create(
    `${folderPath}/PROJECT-OVERVIEW.md`,
    overviewContent(
      name.trim(),
      slug,
      stamp,
      description.trim(),
      currentStatus.trim(),
      projectResources.trim(),
      nextSteps.trim() ? `- [ ] ${nextSteps.trim()}` : undefined
    )
  );
  await app.vault.create(`${folderPath}/improvements.md`, improvementsContent(slug, date));

  notify(`Created project "${name.trim()}" at ${folderPath}.`);
};
