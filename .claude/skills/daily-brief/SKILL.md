---
name: daily-brief
description: Generate personalized news intelligence with verified sources (7-day freshness requirement)
roles: [all]
integrations: [web-search]
---

# COG Daily Brief Skill

## Purpose
Find verified, relevant news for personalized daily briefings with strict verification standards and strategic relevance analysis tailored to user's specific interests and projects.

## When to Invoke
- User wants their daily news briefing
- User says "daily brief", "news", "what's happening", "morning brief"
- User says "pull the daily brief", "check the cloud brief", "did the daily brief run" (see Cloud Routine Check below; this is a pull-existing-output request, not a re-run request)
- User wants to stay updated on their interests
- Morning routine or regular check-in time

## Cloud Routine Check (ALWAYS run first)

**This skill has a cloud twin.** A scheduled cloud routine named "Daily Brief" (`trig_01Q556EFWNooEE4QwDLmL564`, environment `env_019q1mmBhyqxfMaT6psBRXm8`) runs this skill daily at 13:00 UTC (8am America/Chicago) against `https://github.com/ValleytheKnight/KCB-Second-Brain`, writes `01-daily/briefs/daily-brief-YYYY-MM-DD.md` and overwrites `01-daily/LATEST-BRIEF.md`, then commits and pushes to `main`. Manage it via `/schedule` or the `RemoteTrigger` tool directly (see `.claude/skills/schedule/SKILL.md`).

**Never assume whether the cloud routine has run. Check the actual current time.**

1. Get the real current time (`date -u '+%Y-%m-%d %H:%M'` via Bash, never guess it). Compare against the cron schedule (13:00 UTC / 8am America/Chicago).
   - If current UTC time is **before** 13:00 today: the routine has not fired yet today. Don't check for today's file; tell the user it's not due yet (and give the local time it will run), then offer a local run if they want one now anyway.
   - If current UTC time is **at or after** 13:00 today: the routine should have fired. Proceed to step 2 to confirm and pull it in.
2. **Sync local work first, unconditionally, no permission prompt.** Chris works in the vault throughout the day, so uncommitted local changes are the expected state, not a blocker:
   - `git status --porcelain` to see what's there. If anything is staged, unstaged, or untracked, `git add -A` and commit it (e.g. `chore(vault): sync daily work before pulling cloud daily brief`).
   - `git push origin main`.
3. **Pull in the cloud brief:**
   - `git fetch origin main`, then `git pull origin main --no-rebase`.
   - If the push in step 2 was rejected as non-fast-forward, that confirms the cloud routine already pushed its own commit; pull (as above) to bring it in.
   - `LATEST-BRIEF.md` is the one file expected to conflict, since both local edits and the incoming cloud commit touch it. Resolve with `git checkout --theirs 01-daily/LATEST-BRIEF.md && git add 01-daily/LATEST-BRIEF.md`. It's a stable filename meant to be fully overwritten by each day's brief, so local edits to it are always stale leftovers from a previous day, never worth preserving. Commit the merge and push.
   - If a conflict shows up in any file other than `LATEST-BRIEF.md`, stop and ask the user before resolving; that means real work is at risk.
4. **Confirm the result:** check whether `01-daily/briefs/daily-brief-<today>.md` now exists locally.
   - If it exists: that's today's brief. Show it to the user instead of re-running research from scratch. Only fall through to a full local run if the user explicitly asks for a fresh/local run, or flags the cloud output as weak or wrong.
   - If it's still missing despite the time check saying it should have run: say so plainly, check the routine's status with `RemoteTrigger {action: "get", trigger_id: "trig_01Q556EFWNooEE4QwDLmL564"}` and `list_runs`/`get_run_log` to see if it failed or was disabled, then offer to run the local version now.

**Quality note:** the cloud routine runs on `claude-haiku-4-5-20251001` by default, which has produced weaker source verification than a local run (citing homepage/index URLs as sources, mislabeling tier). Per the Model Routing table in `CLAUDE.md`, data-collection and research work should run on Sonnet; if the cloud output looks weak, either fix it locally (this skill, full rigor) or update the routine's `session_context.model` to `claude-sonnet-5` via `RemoteTrigger {action: "update", ...}`.

## Agent Mode Awareness

**Check `agent_mode` in `00-inbox/MY-PROFILE.md` frontmatter:**
- If `agent_mode: team` — delegate news research across different interest areas to parallel sub-agents (e.g., one agent per topic cluster). Each agent searches, verifies sources, and returns findings. Combine and synthesize results into the final brief.
- If `agent_mode: solo` (default) — handle all research and synthesis directly in the conversation. No delegation.

## Pre-Flight Check

**Before executing, check for user profile:**

1. Look for `00-inbox/MY-PROFILE.md` and `00-inbox/MY-INTERESTS.md` in the vault
2. If NOT found:
   ```
   Welcome to COG! Daily briefs work best when personalized.

   Let's quickly set up your profile (takes 2 minutes).

   Would you like to run onboarding first, or should I generate a general brief?
   ```
3. If found:
   - Read `MY-INTERESTS.md` to get topics for news curation
   - Read `MY-PROFILE.md` to get user's name and active projects
   - Read `03-professional/COMPETITIVE-WATCHLIST.md` if exists for competitive tracking
   - Use topics to curate relevant news
   - Connect news to user's active projects when relevant

**Get current timestamp (REQUIRED before generating any files):**

1. Run `date '+%Y-%m-%d %H:%M'` using Bash to get the actual current date and time
2. Store this value and use it for the `created:` frontmatter field
3. NEVER guess or fabricate the time — always use the value returned by the `date` command
4. Compute the **freshness cutoff** = today's date minus 7 days. Write it down (e.g. "cutoff: 2026-08-05") and hold every candidate against this literal date, not a vibe of "recent."

## Process Flow

### 1. Gather Context

Collect the information needed for personalized curation:

- Read `00-inbox/MY-PROFILE.md` for:
  - User's name
  - User's role/job
  - Active projects

- Read `00-inbox/MY-INTERESTS.md` for:
  - Topics they're interested in
  - Preferred news sources

- Read `03-professional/COMPETITIVE-WATCHLIST.md` (if exists) for:
  - Companies/people to track

- Read every `04-projects/*/PROJECT-OVERVIEW.md` for:
  - Current status and any unchecked items under each project's "Next Steps"
  - This is the project-side input for the Recommended Actions section (Step 3.5)

#### Deduplication — Previous Brief Scan

Read up to 3 most recent daily briefs from `01-daily/briefs/` (most recent first):
- Extract `dedup_urls` from their frontmatter (if present)
- Also scan their headlines/story titles as semantic fallback for cross-source matching
- Build a set of **covered stories** to avoid repeating

**Matching rules (in priority order):**
1. **URL match (primary):** If a candidate story's main source URL already appears in `dedup_urls`, it's a known story
2. **Headline match (fallback):** If the URL is different but the headline describes the same event as a previous story, treat as duplicate — this catches the same story reported by different outlets

During news research (Step 2), apply dedup rules:
- **Skip** stories already covered unless there is a **material update** (new data, resolution, escalation, reversal)
- If including an update, prefix with "**Update:** _first covered [date]_"
- Stories older than 3 briefs are eligible for re-inclusion if still developing

### 2. News Research and Curation

Apply comprehensive news research methodology:

#### Interest-Based Research
- Search based on user's current interest profile
- Focus on strategic relevance to user's role and projects
- Identify emerging patterns and developments
- Diversify sources for balanced perspective

#### Verification Standards (MANDATORY)

**Date Verification:**
- ALL news MUST be from last 7 days ONLY (on/after the computed cutoff date)
- Verify publication dates with verified timestamps
- NEVER include older news without explicit disclosure

**Mechanical fetch-and-date-check (MANDATORY, no exceptions):**
- Every candidate source MUST be a **permalink to a specific article/post**, one that has a slug, a date, or an ID in the URL. Homepage and index URLs (`anthropic.com/news`, `openai.com/news/company-announcements/`, `news.ycombinator.com`, `agentic.ai/news`, `obsidian.md/changelog/`) are **never valid sources**; they're where you find permalinks, not something you cite. If WebSearch only returns an index page, click through and cite the actual article.
- Before a candidate can be included, run **WebFetch on its permalink** and extract the real publish/byline date printed on the page. Do not rely on training-data memory of when something "probably" shipped, and do not accept a vague month-only date like "August 2026"; if the fetched page doesn't show a specific date, the source fails verification and is dropped.
- Compare the fetched date against the cutoff computed in Pre-Flight. If it's before the cutoff, discard the candidate, no exceptions, no "still relevant" override. (A source failing this check is exactly how a month-old JetBrains post ended up in a past brief despite the 7-day rule; don't repeat that.)
- Aggregator mentions (Hacker News, Reddit, etc.) may support a story only as a secondary corroboration link, and only when a real dated permalink is doing the primary citation. They never substitute for a primary source.

**Source Credibility Assessment:**
- **Tier 1 Sources (Highest Credibility):** Major news organizations (Reuters, AP, Bloomberg, WSJ, NYT), official company announcements, government statements
- **Tier 2 Sources (High Credibility):** Industry publications, credible tech/business blogs, research reports from reputable firms
- **Tier 3 Sources (Moderate - Verify Carefully):** Social media from verified accounts, company blogs, community discussions
- Minimum 2 credible sources for any claim
- Cross-reference key facts and figures

**Fact Cross-Reference:**
- Verify claims across multiple independent sources
- Use WebFetch to verify any statistics before including them
- Identify potential bias and provide balanced perspective

#### Strategic Relevance Analysis

Assess impact on user:

**Direct Impact (High Priority):**
- News directly affecting user's projects or companies
- Regulatory changes affecting user's industry
- Competitive moves by direct competitors
- Technology developments affecting user's tech stack

**Strategic Impact (Medium Priority):**
- Market trends affecting user's target customers
- Investment patterns in user's industry
- Talent market changes affecting hiring
- Partnership opportunities or threats

**Contextual Impact (Lower Priority):**
- Broader economic trends affecting business climate
- Technology trends affecting future planning
- Industry thought leadership and opinion
- Educational content for professional development

#### Opportunity and Threat Identification

**Opportunities:**
- Market Opportunities: New markets or customer segments opening
- Technology Opportunities: New tools or platforms to leverage
- Partnership Opportunities: Potential collaboration partners
- Competitive Opportunities: Competitor weaknesses or market gaps

**Threats:**
- Competitive Threats: New competitors or competitive advantages
- Technology Threats: Disruptive technologies or obsolescence risks
- Market Threats: Market shifts or customer behavior changes
- Regulatory Threats: New regulations or compliance requirements

### 3. Generate Daily Brief

Create structured briefing document:

```markdown
---
type: "daily-brief"
domain: "shared"
date: "YYYY-MM-DD"
created: "YYYY-MM-DD HH:MM"
sources_verified: true
news_age_verified: true
confidence: "high"
tags: ["#daily-brief", "#news", "#strategic-intelligence"]
interests: ["interest1", "interest2"]
projects_referenced: ["project1"]
items_count: [number]
dedup_urls: ["https://primary-source-url-for-each-story-covered"]
---

# Daily Brief - [Date]

**Good [morning/afternoon], [Name]!**

## Executive Summary
[2-3 sentences highlighting the most important developments across all your interest areas]

---

## Recommended Actions Today

Synthesized from both today's news (above research) and the current state of every `04-projects/*/PROJECT-OVERVIEW.md`. Not a generic to-do list, each one earns its place by a stated reason. Target at least 3, but **0 is a valid and honest output** if nothing genuinely rises to the level of a recommended action today, if so, write "No specific actions recommended today, nothing urgent surfaced from news or project state." instead of padding with busywork.

Draw from two sources, mixed together and ranked by actual priority, not grouped by source:
- **News-driven:** a story from today's research that has a concrete, near-term implication for one of the user's projects or interests (not "read more about X", a real next action).
- **Project-driven:** an unchecked item under a project's "Next Steps" that's stale, blocking something else, or newly relevant given today's news.

```markdown
### 1. [Action, imperative voice]
**Why:** [news story it connects to, OR project + which Next Steps item, OR both if it's a genuine intersection]
**Project(s):** [if applicable]
📅 [YYYY-MM-DD, today or a reasonable near-term date]

### 2. [Action]
**Why:** [...]
**Project(s):** [if applicable]
📅 [date]

### 3. [Action]
**Why:** [...]
**Project(s):** [if applicable]
📅 [date]
```

(add a 4th/5th only if genuinely warranted, don't force a round number)

---

## High Impact News

### [News Item 1 - Direct Impact]
**Relevance:** [Why this matters to you specifically]

[Detailed summary of the news]

**Impact Assessment:**
- **Projects Affected:** [Which of your projects this impacts]
- **Potential Effects:** [Specific implications]
- **Action Suggested:** [Recommended response or follow-up]

**Sources:**
- [Source Name 1] (Tier [1/2/3]) - [Publication Date] - [Link]
- [Source Name 2] (Tier [1/2/3]) - [Publication Date] - [Link]

**Confidence:** [High/Medium/Low] - [Reasoning]

---

### [News Item 2 - Direct Impact]
[Same structure as above]

---

## Strategic Developments

### [News Item 3 - Strategic Impact]
**Relevance:** [Why this matters strategically]

[Detailed summary]

**Strategic Implications:**
- [Implication 1]
- [Implication 2]
- [Implication 3]

**Sources:**
- [Source listings with credibility tiers and links]

**Confidence:** [High/Medium/Low] - [Reasoning]

---

## Market Intelligence

### [News Item 4 - Market Trends]
**Relevance:** [Why this market trend matters]

[Detailed summary]

**Market Impact:**
- [Impact on target customers]
- [Industry trends]
- [Investment patterns]

**Sources:**
- [Source listings with credibility tiers and links]

**Confidence:** [High/Medium/Low] - [Reasoning]

---

## Technology Watch

### [News Item 5 - Tech Developments]
**Relevance:** [Why this technology matters]

[Detailed summary]

**Technology Implications:**
- [Impact on tech stack]
- [New tools or platforms]
- [Emerging technologies]

**Sources:**
- [Source listings with credibility tiers and links]

**Confidence:** [High/Medium/Low] - [Reasoning]

---

## Competitive Landscape

### [Competitor/Company Name - From Watchlist]
**Recent Activity:**

[Summary of competitive intelligence gathered]

**Competitive Implications:**
- [What this means for your projects]
- [Opportunities or threats]
- [Recommended responses]

**Sources:**
- [Source listings with credibility tiers and links]

**Confidence:** [High/Medium/Low] - [Reasoning]

---

## Opportunities & Recommendations

**Note:** Calculate actual due dates from today's date and append Obsidian Tasks emoji format.

### Immediate Actions (Today/This Week)
- [ ] [Specific action item 1] 📅 [YYYY-MM-DD = today's date]
- [ ] [Specific action item 2] 📅 [YYYY-MM-DD = today's date]
- [ ] [Specific action item 3] 📅 [YYYY-MM-DD = end of this week]

### Research Needed
- [Area 1 requiring deeper investigation]
- [Area 2 to monitor closely]

### People to Inform/Consult
- [Stakeholder 1]: [About what]
- [Stakeholder 2]: [About what]

---

## Risks & Threats

### Active Threats
- **Threat 1:** [Description and mitigation approach]
- **Threat 2:** [Description and mitigation approach]

### Emerging Risks to Monitor
- [Risk 1 to watch]
- [Risk 2 to watch]

---

## Verification Report

### Source Analysis
- **Tier 1 Sources:** [count] - [list main ones]
- **Tier 2 Sources:** [count] - [list main ones]
- **Cross-References Performed:** [number]

### Fact-Checking Results
- **Verified Claims:** [count]
- **Unverified Claims:** [count with explanation if any]
- **Conflicting Information:** [count with resolution approach if any]

### Freshness Verification
- ✅ All news items verified within 7-day window
- Publication date range: [Oldest date] to [Newest date]

### Confidence Assessment
- **Overall Confidence:** [percentage]%
- **High Confidence Items:** [count]
- **Medium Confidence Items:** [count]
- **Low Confidence Items:** [count] - [reasons if any]

---

## Complete Sources

### Strategic News
1. [Full source citation with link]
2. [Full source citation with link]

### Market Intelligence
1. [Full source citation with link]
2. [Full source citation with link]

### Technology Watch
1. [Full source citation with link]
2. [Full source citation with link]

### Competitive Intelligence
1. [Full source citation with link]
2. [Full source citation with link]

---

*Curated by COG News Curator | All news verified within 7-day freshness window | Sources cross-referenced for accuracy*
```

Save to: `01-daily/briefs/daily-brief-YYYY-MM-DD.md`

### 4. Handle Special Cases

**When No Recent News Found:**
If no relevant news found in last 7 days for a particular interest area:

```markdown
### [Interest Area]
**No significant news found in last 7 days**

Last significant development was [date if known] regarding [topic if known].

**Suggestions:**
- Consider expanding search criteria
- Check [alternative sources suggested]
- This area may be experiencing a quiet period
```

**NEVER fabricate or use older news without explicit date disclosure.**

**When Information Cannot Be Verified:**
```markdown
### [Potential News Item]
**⚠️ Unable to verify from independent sources**

**Original Source:** [source] - Credibility: [assessment]

**What We Know:**
[What can be stated based on single source]

**What's Uncertain:**
[Specific claims that couldn't be verified]

**Recommendation:** Monitor for additional confirmation before acting

**Confidence:** Low - [reasoning]
```

**When Sources Conflict:**
```markdown
### [News Item with Conflicting Reports]
**⚠️ Conflicting information from multiple sources**

**Perspective 1:**
[Summary] - **Source:** [source with credibility tier]

**Perspective 2:**
[Summary] - **Source:** [source with credibility tier]

**Areas of Agreement:**
- [What sources agree on]

**Areas of Disagreement:**
- [Where sources conflict]

**Recommendation:** [Approach for resolution or further research]

**Confidence:** Medium - [reasoning]
```

### 5. Confirm Completion
- Confirm file was created
- Show user: "Daily brief saved to [file path]"
- Optionally show executive summary
- Ask if they want to explore any topic deeper or capture thoughts via braindump skill

## Loop Engineering

Daily brief is a **verify-retry loop**, not a single search. See `.claude/skills/loop-engineering/SKILL.md` for the shared vocabulary.

**The loop (per interest area):** search → fetch a candidate → run the verifier → keep it or discard and re-search with an adjusted query → repeat until enough verified items or a stop condition fires. In `agent_mode: team`, run one loop per interest cluster as isolated workers (orchestrator-workers), then synthesize.

**The verifier (deterministic, runs every candidate):**
- Source is a permalink (not a homepage/index URL), fetched with WebFetch, with a real date printed on the page. If it doesn't resolve to a permalink or the fetch doesn't turn up a specific date, it fails here and never reaches the next checks.
- That fetched publication date is on/after the freshness cutoff computed in Pre-Flight. Mechanical comparison against the stored cutoff date, not a guess or training-data recollection.
- At least 2 independent credible sources for the claim.
- Source tier is identified (1 / 2 / 3). Tier 3 needs cross-reference before it survives.
- Not already seen (story dedup): a candidate whose URL or headline is already in the brief is dropped.

A candidate that fails any check is discarded, not softened. This is COG's verification-first rule applied inside the loop: never let an item in on the agent's own "this looks recent enough."

**Termination conditions (layered):**
- **Goal met:** target item count reached for the interest area.
- **Hard cap:** stop after ~5 searches per interest area.
- **No-progress:** 2 consecutive searches surface nothing new (after dedup) → emit the "No significant news found" block (see Handle Special Cases) and move on. Never backfill with older or fabricated news.
- **Budget guard:** overall fetch budget across all areas.

**Patterns:** evaluator-optimizer (each item scored against the verifier) + reflect-retry (a failed search informs the next query) + orchestrator-workers (team mode).

**In-loop context:** write verified items straight into the brief file as they pass; drop raw fetched page text once the summary and sources are extracted.

## Integration with Other Skills

### Follow-up Actions
After daily brief, suggest:
- **braindump skill** - Capture thoughts sparked by news
- **weekly-checkin skill** - Reflect on news patterns over the week
- Project-specific analysis if news impacts active projects

## Performance Metrics

### Verification Quality
- Source Credibility Score: Average credibility rating of sources used
- Fact Accuracy Rate: Percentage of facts that remain accurate over time
- Cross-Reference Rate: Percentage of claims verified through multiple sources
- Date Accuracy: 100% compliance with 7-day freshness requirement (MANDATORY)

### Relevance Quality
- User Engagement: Percentage of news items user finds valuable
- Action Generation: Percentage of news items leading to user action
- Strategic Value: User assessment of strategic importance
- Timing Relevance: How well news timing aligns with user needs

## Learning and Adaptation

### Interest Profile Refinement
- Monitor which news items user finds most valuable
- Incorporate user feedback on relevance and importance
- Identify patterns in user interest evolution
- Anticipate interest changes based on project evolution

### Source Quality Learning
- Track accuracy of different sources over time
- Build understanding of source reliability patterns
- Learn to identify and account for source bias patterns
- Continuously improve source selection criteria

### Relevance Algorithm Improvement
- Improve ability to predict news impact on user
- Learn optimal framing for different types of news
- Better understanding of user's strategic context
- Improve identification of actionable news items

## Success Criteria
- All news within 7-day window (100% compliance)
- All sources verified and linked
- User finds briefing relevant and actionable
- Confidence levels clearly stated
- Opportunities and risks identified
- Follow-up actions suggested

## Philosophy

The daily brief skill embodies COG's verification-first approach:
- No AI hallucinations - everything sourced and verified
- Transparency in confidence levels
- Explicit uncertainty when information can't be verified
- User empowered to make informed decisions based on reliable intelligence
