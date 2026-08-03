---
title: "AI wrote the fix. I asked the question that made it right."
date: 2026-08-02
description: "A weekly CVE scanner was green on every run it ever made — and had never scanned a single package. The human-AI loop that caught it, killed the broken approach, and shipped the fix in an afternoon."
---

<div class="video-embed" style="position:relative;padding-top:56.25%;margin:0 0 2rem;border-radius:10px;overflow:hidden;">
  <iframe src="https://www.youtube-nocookie.com/embed/8viuMRVpe5o" title="AI wrote the fix. I asked the question that made it right."
    style="position:absolute;inset:0;width:100%;height:100%;border:0;" loading="lazy" allowfullscreen
    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
</div>

A weekly CVE scan ran against my firewall image for months. Every run came back green.
Every run scanned nothing — a build step three stages earlier compressed the image in
place and deleted the file the scanners were pointed at, and the error went to `stderr`
in a step written not to fail on scanner errors. Nothing failed. Nothing was checked.

This is the whole story of finding that, killing it, and shipping what replaced it. It
matters less as a bug report than as a worked example of how I develop with an AI agent —
who did what, at which fork, and how little calendar it took.

## One person, a standing arrangement

geekdojo is one person. Rasputin — a cluster OS, a control plane, a firewall image —
ships at a pace that looks like a team because of a standing arrangement: AI agents
research, build, and open pull requests; I direct, decide, and merge. Every merge is a
human clicking the button.

The work item here was one line from one day: *the shipped images need a CVE watch.*
Simple ask. It did not stay simple.

## Ask the space — with research that has to disprove itself

Step one was research, not code. I had the agent survey how teams actually watch CVEs on
embedded images in 2026, under one rule I insist on: the research has to try to disprove
itself.

Twenty-four sources went in. The top twenty-five claims each got adversarially verified —
separate passes attacking each claim, not collecting support for it. Twenty-three
survived; two were refuted outright. One refutation mattered: a promising CVE tool whose
data source could not be confirmed to query the real vulnerability databases. The claim
died in verification, so we never built on the tool. Research that only gathers
supporting evidence is marketing — this step exists to kill bad plans while they are
still cheap.

## Recon before the build

Before writing anything, the agent mapped what already existed. The firewall repo already
had a weekly CVE job — trivy and osv-scanner, wired in and running. The actual gap was
the node OS, which had nothing. So the plan adjusted: build the OS watch fresh, and audit
the firewall's existing arm instead of duplicating it.

The audit came back with a flag worth reading almost verbatim, because it is the hinge of
the whole story: *the scanners are being fed the raw image file; likely a near no-op;
needs a validation run before trusting — or changing — anything.* An audit that says
"I suspect this is broken, verify before acting" is worth ten that say "looks good."

## Verify, then measure

So we went back and forth. I said: run the verification.

It found something worse than the flag suggested. A GRUB-patching step compressed the
image in place, deleting the uncompressed file the scanners were pointed at. The scanners'
complaint went to `stderr`, in a step built not to fail on scanner errors. Green every
week; scanned nothing, ever. Zero findings looks exactly like a healthy run when there is
no baseline and nothing expected.

The obvious move is to fix the path. The instruction that actually mattered was the
second one: fix the path, *and* re-run to measure what the scanners see against a real,
intact image. Measured that way, trivy flags the whole image as an unsupported OS and
hands back an empty report. It can see the packages — it just can't scan OpenWrt's format
for a single one. Zero findings, and not because the image was clean.

The path bug had been hiding a capability gap. Fixing it alone would have produced a
scanner that was honestly useless instead of accidentally useless. Both instructions I
gave in that stretch had the same shape — don't trust it, verify it — and the insistence
on *measuring* was the human contribution.

## The question that changed the problem

Looking at that measurement, I asked the agent one question: since we're building on
OpenWrt's base here, don't they own the majority of the packages?

The agent checked. The manifest is about two hundred packages, and every one is
OpenWrt's; my repo contributes configuration and zero packages. OpenWrt's security team
already tracks CVEs across that set and ships fixes as point releases. Scanning packages I
don't patch, with tools that can't read them, was the wrong question entirely.

The right watch is: am I building on their latest release? The agent retired the scanners
and built the replacement inside the hour — read the pinned version, ask the release
server for the newest in the series, compare, open an issue on drift. A few lines of
shell.

I want to be precise about the division of labor, because this is the honest part. The
agent found the dead scanner, and the agent would have happily shipped a better scanner.
Reframing whether scanning was the job at all came from me. Domain judgment picked the
destination; the agent made it real and validated it before the day ended.

## Ship, then make it prove itself

Both watches — the firewall's and the node OS's — shipped the same shape: detect only,
open an issue on change, a human decides. Both had to pass one house rule: no watch is
trusted until it catches something real.

- The **firewall currency check** caught a point release we were behind on the day it
  went live — pinned `25.12.4` against a published `25.12.5`.
- The **node-OS watch**, built on Buildroot's own `pkg-stats` tooling, returned **541
  findings** on its first run. 456 were kernel version-string noise, including a CVE filed
  in 1999 flagged against a 2026 kernel. My calls, the agent's implementation: exclude the
  kernel, track kernel currency through the LTS tag instead, and gate everything behind a
  checked-in baseline so the job only speaks on change. Result: **85 real findings**, and
  a flag that the pinned LTS was one point release behind — `2025.02.15` against
  `2025.02.16`.

Two watches, two first runs, two real catches. The issues they opened are bench work with
my name on it — the watches find the work; they don't do it.

## The loop, named

That is the whole method, visible in one problem:

- ask about the space with research that attacks its own claims;
- recon before building;
- audit what exists;
- verify what the audit suspects;
- measure before trusting a fix;
- bring human judgment to the fork in the road;
- ship detect-only, and make it catch something real before you believe it.

The agent did every search, every run, and every build in this story. I contributed
direction, one reframing question, a handful of judgment calls, and every merge. Neither
half ships this alone: I wasn't going to read `stderr` on a green job, and the agent
wasn't going to question whether scanning was the point to begin with.

## One afternoon

One number, because it's the economic argument. Everything after the research pass
happened inside a single day, and the elapsed time is padded by me — I stepped away for
lunch in the middle of it. The agent's turnaround on each exchange was minutes. The
biggest gap in the timeline is a human eating. For the first time in my career, the
schedule bottleneck was me answering questions, not the work getting done.

## Check me

Everything above is public.

- **Watch it:** [the video](https://youtu.be/8viuMRVpe5o) (7 min).
- **Steal the workflows:** the [OpenWrt base-currency check](https://github.com/geekdojo/rasputin-openwrt-firewall/blob/main/.github/workflows/canary.yml)
  that replaced the scanner, and the [Buildroot CVE watch](https://github.com/geekdojo/rasputin-os/blob/main/.github/workflows/cve-watch.yml)
  for the node OS.
- **Read the diffs:** firewall [#14](https://github.com/geekdojo/rasputin-openwrt-firewall/pull/14)
  (the path fix) and [#16](https://github.com/geekdojo/rasputin-openwrt-firewall/pull/16)
  (the reframe); rasputin-os [#14](https://github.com/geekdojo/rasputin-os/pull/14) (the
  CVE watch).
- **All the repos:** [github.com/geekdojo](https://github.com/geekdojo).

Developing with AI gets pictured as autocomplete or as autopilot. This is neither — it's
a loop: ask, verify, measure, reframe, ship, verify again, with a human steering and an
agent doing the miles. Green is not the same as checked. Judge the method by its output.

*This is the long-form layer of geekdojo's [Developing with AI](/developing-with-ai/)
pillar; the short build-in-public log lives on the [Rasputin devlog](https://rasputin.geekdojo.com/devlog/).
Rasputin is open-source (AGPL-3.0).*
