---
title: "How I run a company of one — and it ships like a team"
date: 2026-08-11
description: "One person, a whole company. The AI system I actually run — engineering, QA, marketing, legal, finance, and the board that runs my attention — every department, in public, with the receipts."
---

<div class="video-embed" style="position:relative;padding-top:56.25%;margin:0 0 2rem;border-radius:10px;overflow:hidden;">
  <iframe src="https://www.youtube-nocookie.com/embed/zvZWd_P_pXE" title="How I run a company of one — and it ships like a team"
    style="position:absolute;inset:0;width:100%;height:100%;border:0;" loading="lazy" allowfullscreen
    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
</div>

geekdojo is one person. Under it I ship an operating system, a control plane, and a
firewall image — and I also run the marketing, the legal filings, the finances, and the
grant applications. That's a company's worth of departments, and it's me plus an AI agent:
the agent does the labor, I keep every decision.

The video above walks the whole machine on one diagram. This is the written version — one
department at a time, with the links to steal.

## Two things at the center — and two ways they get paid

Me and Claude. I orchestrate the loops; Claude researches, designs, and executes. Wash,
rinse, repeat across every part of the company — I'll routinely have coding, marketing, ops,
and finance sessions running in parallel without drowning, because the *patterns* do the
load-bearing work: [Karpathy's LLM-wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)
(my "brain"), [spec-driven development](https://github.com/github/spec-kit), and the kind of
agentic CI/CD [Boris Cherny describes](https://www.ycombinator.com/library/UN-boris-cherny-building-claude-code).

There are exactly two ways Claude gets paid, and I'm upfront about both because this
audience deserves the real cost:

- **Interactive subscription — flat.** My hands-on sessions and the agents that run on a
  schedule. It's a flat Max fee, so I push the heavy scheduled work to off-hours — charge
  the EV at night. I rarely hit the five-hour limit, and I've hit the monthly cap exactly once.
- **Metered API key — per token.** The quality agents that run in CI bill per run. A real
  line item, every time.

## The one rule: nothing ships itself

The agent does the work and opens the pull request; I merge it. The agent drafts the reply;
I send it. The agent does the research; I validate. Every consequential action is a human
clicking the button, and every one of them leaves a commit or a doc behind. That's what
keeps geekdojo and Rasputin out of the AI-slop bin — and it all happens in the open. Anyone
can read every PR that ever went into Rasputin.

## Engineering: building Rasputin with agents

The flagship is [Rasputin](https://github.com/geekdojo) — an open-source homelab cluster
system: the node OS, the control plane, and a firewall image. I start a product with a
vision doc and let Claude tear into it; if you know spec-kit, my process is close. Once the
work items get dense enough, I have the agent organize them into the epics you can see on
the [public roadmap](https://rasputin.geekdojo.com/docs/roadmap/). To build one, the agent
pulls the epic from the brain, researches the current state of the code, and executes —
verbosely, so I can watch its stream of consciousness and hit the stop button the instant it
drifts. I set the targets (test coverage, "use SOLID," "don't duplicate") and the
guardrails; the agent writes the code and files the PR.

I've written code since 1985 — I was nine. I barely write it now. Claude writes it; I review
it at the PR, and a fleet of workflows keeps it honest.

## QA, security, release: the metered agent fleet

This is the quality team, and it's the lane that costs money. Six agents run in CI: they
sweep for duplicated code, review every PR for security, write fault-detecting tests,
mutation-test the tests themselves, fuzz the parsers, and watch for CVEs. Each one had to
earn its place by catching something real before I trusted it — a planted vulnerability, a
silently-dead scanner, a kernel CVE from 1999. It's the same shape Boris Cherny describes
running across Anthropic's own code, and it's an area you should expect to grow: start with a
couple of CI checks, add linting and coverage gates, fold hardening epics into your planning,
and let it compound.

## Marketing: the part most builders skip

Marketing is the thing talented geeks overlook, and the thing that decides whether any of the
rest matters. If no one knows your cure for cancer exists, does it? So I opened a
deep-research session: *"I have no money — how do I tell people about this without pissing
them off? Give me ten to twenty options, ranked by time commitment."* I worked the list with
the agent and landed on a content-value approach with social funnels. This very piece is part
of that plan — drafted, storyboarded, and diagrammed the same way everything else here gets
made.

## Legal & IP

Any serious effort has legal needs: AGPL versus MIT, whether you can relicense later, how to
wire CLA signing in GitHub to protect the copyright. Claude is excellent at reading the
jargon, translating it to plain terms, and building the automation that satisfies it — the
CLA workflow on the Rasputin repos is exactly that, specced in the backlog and shipped like
any other epic. It's also superb at *tracking* the commitments. Trademarking Rasputin so a
corporation can't hijack it is roughly eighteen months of appointments and about $1,400 — I
don't want to burn brain-cycles tracking that. I push it onto the agent and spend my cycles
building.

## Finance & fundraising

A project like this isn't cheap. Software and test hardware run me north of $50k — tooling,
plus LattePandas, Turing Pis, CWWKs, Raspberry Pis; I buy all of it — and the custom hardware
is an order of magnitude past that, around $300k. I used AI to plan those numbers and to
track them now that we're shipping. And I'd still like to retire in fifteen years, so there
has to be income. Another deep-research session — *"find funding with no ownership strings,
ranked by plausibility"* — surfaced grants, sponsorships, monetization, and more (NLnet,
Fediversity, and others). I worked each option with the agent, shaped the grant applications,
and charted a prioritized path, same as development.

## The board that runs my attention

Here's the part that makes all of it survivable. Every morning, before I'm even at my desk, a
set of scheduled agents run — they scan my mail, poll the repos for anyone who touched them,
pull the community threads worth answering, audit the docs, and check every money-and-legal
deadline. They all feed one surface. It doesn't do my work; it tells me exactly where to
point my attention across every department above.

Two things make it trustworthy instead of just another dashboard. First, it's a *render* over
canonical ledgers — delete the board tonight and I lose nothing; it rebuilds tomorrow. Second
— the part we worked hardest to reach — nothing hits the board until it needs me. I mean
nothing. (There were a couple of hangry weeks of "why are you showing me that, I don't need it
yet.") There's a trademark declaration I have to file in 2028; it's on file, the board knows
about it, and it refuses to show it to me until it's actually due. An AI that produces a wall
of everything is easy — and ultimately worse. Getting to a board you can trust — provably
recorded, provably not shown, provably scheduled to arrive — is a life-altering moment. It
lets you actually focus on the work.

## The foundation: the brain and the config

None of this works without two load-bearing pieces. The first is the **brain** — a private
repo that's a live snapshot of geekdojo's state at any moment. The key insight: the brain is
not for me, it's for the AI. I let the agent organize it, structure it, decide what goes in
and how to track status. It's Karpathy's LLM-wiki concept, and it needs maintenance —
GitHub routines look for mismatched state, scan the code to keep the brain honest, and lint
it, because individual sessions miss counts and nuances. Every new session is pointed at the
brain by an `agents.md` / `claude.md` file. (You can read it in Obsidian; I render it with
DocFx and browse it through a `take-a-look` skill.)

The second piece is **skills and routines** — the lifeblood of both Claude and Codex. It's
hard to have too many skills; routines automate the rest and run off-hours. Check all of it
into GitHub. I keep a plugin inside the brain that hosts a marketplace of my internal skills —
if geekdojo ever grows past me, someone installs Claude, installs the plugin, and has the whole
brain. Same story if my Mac dies: two reinstalls, a few `git clone`s, and I'm back.

## Check me

One person did a company's work because the agent did the labor and I kept the judgment — the
merges, the sends, the calls at the forks. It all runs on my own hardware, and it's headed for
the cluster it was built for: Rasputin. Every box on that map could be its own piece — tell me
which one you want next.

Everything here is public:

- **Steal the patterns:** [Karpathy's LLM-wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) ·
  [spec-kit](https://github.com/github/spec-kit) ·
  [Boris Cherny — "Building Claude Code"](https://www.ycombinator.com/library/UN-boris-cherny-building-claude-code)
- **The receipts:** [all the repos](https://github.com/geekdojo) · the
  [Rasputin roadmap](https://rasputin.geekdojo.com/docs/roadmap/), kept honest by a linter that
  fails the commit. The quality agents are GitHub Actions in those repos — read the workflows.

*This is the long-form layer of geekdojo's [Developing with AI](/developing-with-ai/) pillar;
the short build-in-public log lives on the [Rasputin devlog](https://rasputin.geekdojo.com/devlog/).
Rasputin is open-source (AGPL-3.0) — and where all of this is headed: self-hosted, on the cluster
it was built for.*
