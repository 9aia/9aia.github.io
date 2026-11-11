---
name: lasius
description: "Git & workspace expertise for GitHub orgs: workspace gardener CLI (clone, sync, inspect, workspace files) plus the shared lasius-vcs port."
website: https://9aia.com/lasius/
keywords: [rust, github, cli, devtools, workspace]
status: recent
stage: beta
order: 11
---

Git & workspace expertise for GitHub orgs: `lasius.toml` is the only
config — it clones every repo of an org under one root, fast-forward
syncs them all, reports drift, and generates the editor workspace
file. The shared `lasius-vcs` port carries the git primitives other
repos build on.
