---
name: cuora
description: "Secrets broker for agents: code carries cuora:// references instead of values, the CLI injects secrets as env vars at run time, and every materialization is audited."
website: https://9aia.com/cuora/
keywords: [rust, agents, secrets, security, llm]
status: recent
stage: beta
order: 8
---

A secrets broker built for agents: `cuora://` references live in code and
config; values materialize as env vars at runtime — sealed, age-encrypted,
audited on every access.
