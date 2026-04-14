# Architecture and Structure

## Main Idea

```
scripts → entry points (start here) - Scripts to run on the game (Automation and Manual)
services → decision making (brains)
lib → tools (no intelligence)
models → data shapes (types)
config → constants
ui → display layer (React Components for later)
```

### Simple rule

If a file contains “decisions” → keep it on HOME
If a file contains “actions” → it can go to TARGETS

## Structure

```
src/
│
├── scripts/              # (formerly bin) entry scripts
│   ├── manager.ts
│   ├── hack.ts
│   ├── grow.ts
│   └── weaken.ts
│
├── lib/                  # utilities (pure functions)
│   ├── network.ts
│   ├── servers.ts
│   └── format.ts
│
├── services/             # game logic / orchestration
│   ├── target-service.ts
│   ├── deploy-service.ts
│   └── batch-service.ts
│
├── models/               # types/interfaces
│   └── target.ts
│
├── config/               # tuning values
│   └── hacking.ts
│
└── ui/                   # future React UI
```
