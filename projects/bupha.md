---
name: bupha
description: "Queue engine for event-driven jobs — shipped as CI"
website: https://9aia.com/bupha/
keywords: [rust, agents, ci, queue, llm]
status: deprecated
order: 4
---

A queue engine for event-driven jobs — ingest from pluggable sources, run
the effect (shell, dagger, http), report the outcome. Shipped as CI: pushes
queue per-sha pipeline runs and report commit statuses.

**Retired.** bupha has been replaced in production by peregrin campaigns —
the org's CI gate is the tamias-managed `ci-gate` campaign
(`peregrin campaign run ci-gate-full.yaml`) fed by the GitHub webhook
tunnel. This page and the repo are kept for history.
