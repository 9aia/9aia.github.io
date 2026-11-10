---
name: bupha
description: "The CI integration for tamias: pluggable push sources queue per-sha pipeline runs on your box — GitHub first, GitLab later — with GitHub Actions workflows as a runner dialect. Ships as type: bupha tamias bundles."
website: https://9aia.com/bupha/
keywords: [rust, agents, ci, queue, llm]
status: recent
stage: alpha
order: 4
---

The CI integration for tamias — pushes from pluggable sources queue
per-sha pipeline runs on your box and report commit statuses back.
Ships as `type: bupha` tamias bundles; single binary, one systemd
unit, no YAML DSL required: the pipeline is a
script (`ci.sh`) or a dagger function — or a real
`.github/workflows/*.yml`, via the `gha` runner dialect.

- **Forge-agnostic by ports** — webhook triggers and status sinks sit
  behind traits; GitHub today, GitLab impls on the roadmap.
- **GHA dialect** — `runner.kind = "gha"` executes workflow YAML
  natively (explicit supported subset; unsupported syntax errors
  loudly).
- **tamias-native** — `tamias-driver-bupha` makes fleets
  tamias-installable (`type: bupha` bundles deploy the watcher,
  tunnel, and forge hooks).
- **Queue semantics built for CI** — latest-wins batching,
  superseded shas get honest statuses, persistent ACID queue.
