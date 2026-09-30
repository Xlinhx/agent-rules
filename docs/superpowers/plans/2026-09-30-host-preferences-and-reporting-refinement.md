# Host Preferences, PPTX Transparency & Reporting Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Resolve host mapping and preference contradictions in Antigravity overlay, make slide-maker benchmark data transparently labeled as synthetic architecture telemetry, and correct factual inaccuracies in the completion report.

**Architecture:** Update canonical `platforms/antigravity/antigravity-overlay.md` to establish definitive host precedence over upstream model tiers, text ledgers, and interactive checkpoints. Refactor `build_general_deck.py` and re-export slide renders with explicit synthetic labels. Rebuild runtime assets and compile CLI/kernel. Run targeted contract verification. Perform code review and update report.

**Tech Stack:** TypeScript, Node.js v24, Python 3.12, PowerPoint COM, Vitest.

**Spec:** User feedback review on `ANTIGRAVITY-UPSTREAM-COMPOSITION-FINAL-PLAN-2026-09-30.md`.

## Global Constraints

- PRESERVE `profiles/5fedu/` with 0-byte modifications.
- Upstream skills are immutable vendor artifacts: do NOT edit `skills/executing-plans/SKILL.md` or `skills/slide-maker/SKILL.md` directly.
- The harness never selects or changes models, invents worker tiers, or requires role handoffs.
- Use Antigravity native progress surfaces; do not create shadow ledgers or ticket files.
- Single commit at release gate; no forced gate rerun if targeted tests pass.

## Review Focus

- Host overlay must explicitly resolve model delegation (`executing-plans:357` -> active session model).
- Host overlay must explicitly resolve text ledger tracking (`executing-plans:330` -> native progress).
- Host overlay must explicitly resolve slide-maker interactive checkpoints (`slide-maker:161` -> per-deck auto waiver).
- Slide-maker deck must label telemetry as synthetic illustrative architecture models, not unproven k6 production benchmarks.
- Report must correctly cite `task-decomposer` origin (`Mathews-Tom/armory`, MIT) and `slide-maker` pin (`9fbe0a...`).

---

### Task 1: Update Antigravity Overlay Host Precedence

**Files:**
- Modify: `platforms/antigravity/antigravity-overlay.md:8-14`

- [ ] **Step 1:** Edit `platforms/antigravity/antigravity-overlay.md` to remove `Economy/standard/expert` model tiers and "wait for execute pivot".
- [ ] **Step 2:** Add explicit mapping rules:
  1. Single model ownership end-to-end; upstream requests for external or "most capable" models execute directly in active session model.
  2. Native progress authority; plan execution proceeds autonomously across dependency-ready slices without upstream text ledgers.
  3. Slide-maker autonomous lifecycle under documented per-deck auto-waiver, recording decisions into `.deck-gates.json` without interactive stops.
- [ ] **Step 3:** Verify overlay syntax and integrity with `git diff platforms/antigravity/antigravity-overlay.md`.

---

### Task 2: Make Slide-Maker PPTX Telemetry Transparently Illustrative

**Files:**
- Modify: `C:\Users\ADMIN\.gemini\antigravity\brain\50341142-4ee9-49bb-8f37-d4114487ca44\scratch\build_general_deck.py:120-175`

- [ ] **Step 1:** Update Slide 3 kicker, body text, and source note in `build_general_deck.py` to state that latency numbers [8, 16, 28, 45, 92] are synthetic illustrative architecture telemetry for reference design, not unverified production k6 measurements.
- [ ] **Step 2:** Update Slide 4 source note to state "Khung so sánh kiến trúc giả định (Architectural Capability Model)".
- [ ] **Step 3:** Run `build_general_deck.py` to regenerate `cloud_architecture_briefing.pptx`.
- [ ] **Step 4:** Re-render to PNGs via `render_cloud_deck_com.ps1` and verify with `lint_deck.py --renders`. Confirm 0 hard layout findings.

---

### Task 3: Rebuild Runtime Assets and Compile CLI

**Files:**
- Build outputs: `packages/cli/runtime-assets/`, `packages/cli/dist/`, `packages/kernel/dist/`

- [ ] **Step 1:** Run `npm run build` to package runtime assets and compile TypeScript projects.
- [ ] **Step 2:** Verify that `packages/cli/runtime-assets/platforms/antigravity/antigravity-overlay.md` is synchronized with canonical source.
- [ ] **Step 3:** Run `npm run check` (typecheck) to ensure clean build.

---

### Task 4: Targeted Verification

**Files:**
- Test: `packages/cli/test/host-adapters-contract.test.ts`
- Audit: `npm run skills:audit`

- [ ] **Step 1:** Run `npm run skills:audit` to verify 49 active skills and catalog budget.
- [ ] **Step 2:** Run `npx vitest run packages/cli/test/host-adapters-contract.test.ts` to confirm host adapter contracts pass.
- [ ] **Step 3:** Verify `git diff --stat profiles/5fedu/` remains exactly 0 bytes.

---

### Task 5: Requesting Code Review Pass

- [ ] **Step 1:** Inspect the diff against `HEAD` using git diff.
- [ ] **Step 2:** Evaluate against `requesting-code-review` standard:
  - Check for unintended edits to vendor skills.
  - Verify absence of forbidden model tiers or shadow ledgers.
  - Verify complete consistency between code, slide deck, and documentation.

---

### Task 6: Correct Factual Errors and Finalize Report

**Files:**
- Modify: `P:\agent-rules\ANTIGRAVITY-UPSTREAM-COMPOSITION-RESULTS-2026-09-30.md`
- Mirror: `C:\Users\ADMIN\.gemini\antigravity\brain\50341142-4ee9-49bb-8f37-d4114487ca44\ANTIGRAVITY-UPSTREAM-COMPOSITION-RESULTS-2026-09-30.md`

- [ ] **Step 1:** Fix `task-decomposer` origin: change "Internal / Apache-2.0" to upstream `Mathews-Tom/armory@ca902da10b1ec95702c2869fb9c04d8a9a387c55` (MIT).
- [ ] **Step 2:** Fix `slide-maker` pin: change `f112e...` to `9fbe0a79dec27751f3a0f5a63426037a7b905cd8`.
- [ ] **Step 3:** Update Section 3, 4, 5 with real execution evidence and transparent description of synthetic PPTX data.
- [ ] **Step 4:** Mirror report to artifact dir.
