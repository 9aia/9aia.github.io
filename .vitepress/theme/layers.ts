import { data as projects } from './projects.data.ts'

// Shared layer catalog: index.md ("The Stack"/"The Organisms") and
// ecosystem.md ("The layers" grid + StackGraph) both derive from this.
// `blurb` is rendered on /ecosystem; index only uses `key`/`title`.
export const layerMeta = [
  {
    key: 'delivery',
    title: 'Delivery',
    blurb: 'How artifacts and state move: tamias installs and dispenses packs, scarab loads config and templates, tarsi cuts releases, bupha gates every push, hypha syncs entities across nodes.',
  },
  {
    key: 'memory',
    title: 'Memory',
    blurb: 'What persists as knowledge: myco keeps the work ledger, kuda the verified code maps.',
  },
  {
    key: 'process',
    title: 'Process',
    blurb: 'How work is governed and run: sturn coordinates, cuora brokers secrets, tardigrada holds identity, mimus verifies claims, cicada schedules, lasius manages the workspace, sepia runs sessions, peregrin drives campaigns on the hypha plane.',
  },
  {
    key: 'interface',
    title: 'Interface',
    blurb: 'What renders for humans and agents: pavo draws every ViewNode IR the drivers emit, across CLI, TUI, and web.',
  },
]

export const layerTitle = Object.fromEntries(layerMeta.map((l) => [l.key, l.title]))

// Deprecated projects are excluded everywhere the layers are shown.
export const layers = layerMeta.map((l) => ({
  ...l,
  projects: projects.filter((p) => p.layer === l.key && p.status !== 'deprecated'),
}))
