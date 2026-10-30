---
title: "Developing with AI"
description: "Deep dives on how a one-person shop ships like a bigger one — AI agents doing the quality work, a human accountable for every merge, receipts in public repos."
---

geekdojo is one person. The output — a cluster OS, a control plane, a firewall
image, and the quality system around them — looks like a team, and the difference
is a system: AI agents that sweep for duplicated code, review every pull request
for security, write fault-detecting tests, watch CVEs, and fuzz the parsers.
Agents propose; a human merges. Every mechanism here had to catch something real
before it earned trust.

These are the deep dives: how each piece works, how it failed on the way in, and
where to find the receipts — everything referenced runs in
[public repos](https://github.com/geekdojo). Rasputin itself is on its
[product site](https://rasputin.geekdojo.com/), with [docs](https://rasputin.geekdojo.com/docs/),
[learn](https://rasputin.geekdojo.com/learn/), and the short-form
[devlog](https://rasputin.geekdojo.com/devlog/); this is the long-form layer.
