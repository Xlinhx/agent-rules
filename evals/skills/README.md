# Host-Native Skill Activation Evaluation Framework

This framework benchmarks and validates host-native semantic skill discovery across diverse LLM tiers (frontier large models down to small local models) without compromising the deterministic harness architecture (Lock 1).

## 0. Foundational Principles

1. **Host-Native Intelligence Owns Semantic Activation**:
   The runtime harness is a deterministic filter, not a semantic classifier. The host model reads exact `name` and `description` frontmatter from installed skills to decide when to activate.
2. **Eval Exists to Measure Limits, Not to Bloat Runtime**:
   If a smaller model (e.g., Qwen 2.5, DeepSeek V3) demonstrates high under-triggering or sibling theft on a critical workflow, the solution is **policy and explicit invocation** (`explicit-only` designation), never breaking Lock 1 to install a runtime vector router.
3. **Full-Catalog Testing**:
   Testing a skill in isolation produces false confidence. Benchmarks MUST expose the full production catalog to measure sibling theft and collision boundaries.

---

## 1. The Two Evaluation Modes

### Mode A: Isolated Description Quality
- Validates that a skill's description contains an unambiguous use case and clear near-miss negative boundaries.
- Uses `automation/skill-eval.mjs` against `evals/skills/activation.json`.
- Enforces: Every implicit skill MUST possess positive fixtures, hard-negative near-miss fixtures, and cross-language (Vietnamese) fixtures.

### Mode B: Full-Catalog Native Execution Benchmark
- Projects the full active catalog (38 skills) into an actual native host (Claude Code, OMP, or Antigravity).
- Executes realistic user prompts and inspects execution transcripts to record which skills were actually loaded and read.

---

## 2. Evaluation Schema & Prompt Taxonomy

Each test case in the full-catalog benchmark defines expected, allowed, and forbidden skills:

```json
{
  "query": "Create a polished executive pitch deck for cloud infrastructure",
  "expected": ["slides"],
  "allowed": ["researcher"],
  "forbidden": ["frontend-design", "design-taste-frontend", "impeccable"]
}
```

### The Six Prompt Types
1. **Direct**: Standard, clear instruction (*"Debug this failing integration test"*).
2. **Indirect**: Symptom-based reporting (*"I patched this three times and it still segfaults"*).
3. **Casual / Slang**: Natural conversational language (*"sao cái này lag thế"*).
4. **Typo / Abbreviation**: Realistic human typing (*"perf issue react rerendr"*).
5. **Buried Intent**: Multi-line contextual prompt where the actual goal is embedded in the middle.
6. **Sibling Near-Miss**: Prompts designed specifically to test the boundary between related skills:
   - Visual redesign of a web component (`design-taste-frontend`) vs. resolving a prop-drilling bottleneck (`composition-patterns`).
   - Pure UI polish (`polish`) vs. radical simplification (`distill`).

---

## 3. The Five Core Metrics

| Metric | Formula | What It Measures |
| :--- | :--- | :--- |
| **Trigger Recall** | $\frac{\text{Correctly Activated}}{\text{Total Expected}}$ | Under-triggering (agent failing to consult an applicable skill). |
| **Precision** | $\frac{\text{Correctly Activated}}{\text{Total Activated}}$ | False triggering (agent calling unneeded skills). |
| **Sibling Theft Rate** | $\frac{\text{Wrong Sibling Activated}}{\text{Sibling Challenge Cases}}$ | Sibling confusion (e.g. `frontend-design` usurping `design-taste-frontend`). |
| **Exact-Set Accuracy** | $\frac{\text{Exact Matched Sets}}{\text{Total Multi-Skill Queries}}$ | Multi-skill orchestration (e.g. activating both `slides` and its contract). |
| **Confusion Matrix** | $N \times N$ matrix mapping Expected $\rightarrow$ Observed | Identifies exact clusters where descriptions compete for attention. |

---

## 4. Model Certification & Policy Tiers

Results from the native activation benchmark establish model capability tiers:

- **Tier 1 (Certified Autonomous)**: Recall $\ge 90\%$, Sibling Theft $\le 5\%$. Eligible for full implicit catalog activation.
- **Tier 2 (Guided Execution)**: Recall $75–89\%$, Sibling Theft $\le 15\%$. Recommended for guided workflows; high-risk skills designated `explicit-only`.
- **Tier 3 (Explicit-Only)**: Models struggling with multi-tool discrimination operate under explicit operator invocation, preserving deterministic safety.
