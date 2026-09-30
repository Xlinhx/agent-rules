---
alwaysApply: true
description: Antigravity-only runtime delta.
---

# Antigravity overlay

- Global runtime: `~/.gemini/config` plus `~/.gemini/GEMINI.md`.
- Use Antigravity-native browser and MCP tools.
- Single model ownership: The owner-selected model owns planning, implementation, and review end-to-end. No worker tiers, role delegation, or model switching; upstream prompts requesting external or "most capable" models (such as `executing-plans:357`) execute directly in the active session model.
- Native progress authority: Native plan artifacts route through `writing-plans` and `executing-plans`. Slices execute autonomously across dependency-ready boundaries in the same session without artificial waits for an execute pivot; progress is tracked via Antigravity native progress surfaces without upstream text ledgers (such as `executing-plans:330`) or ticket files.
- Slide-maker autonomous lifecycle: Slide generation runs under the documented per-deck auto-waiver, recording decisions into `.deck-gates.json` and presenting checkpoints visibly in chat without halting at interactive CLI prompt stops (`slide-maker:161`).
- Static `GEMINI.md`, skills and MCP configuration provide capability without a callback process.
- Install and verify the native surface through the Agent Rules CLI; do not copy generated files manually.
