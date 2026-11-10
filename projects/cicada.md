---
name: cicada
description: "Scheduled-work engine: declare calendars in YAML, plan and apply them against live providers with drift detection, ship calendar bundles through tamias, drive them from peregrin campaigns, plus an MCP server so agents can reconcile them."
website: https://9aia.com/cicada/
keywords: [rust, agents, scheduling, calendar, llm, tamias, peregrin]
status: recent
stage: beta
order: 9
---

Calendars as code — declare your calendars in YAML, plan, apply, and detect
drift against live providers, the same way you manage infrastructure.
Calendar bundles distribute as tamias `type: cicada` packages
(`tamias-driver-cicada`), and peregrin campaigns compose cicada verbs —
`range`, `drift`, `plan`, `apply` — into scheduled workflows.
