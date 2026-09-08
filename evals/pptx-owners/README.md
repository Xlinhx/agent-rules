# PPTX Owner A/B Evaluation Protocol

This framework governs the empirical benchmarking and potential replacement of upstream presentation skills (e.g. OpenAI `slides` vs. Anthropic `pptx` or `siril9/presentation-skill`).

## 0. Non-Regression & Pareto Replacement Rule

An upstream skill is an immutable vendor artifact. It cannot be patched; it can only be retained, supplemented via explicit-only specialist designation, or replaced verbatim.

**A candidate skill replaces the default owner ONLY if:**
1. It achieves **100% pass on all Hard Gates** (zero regressions on validity, editability, or geometry).
2. It demonstrates a **consistent material advantage across repeated controlled runs** on core task families without disproportionate operational or token cost inflation.
3. It wins in **blind, order-swapped pairwise human/VLM review**.

A single weighted score (e.g., 88/100 vs. 86/100) is **strictly prohibited** as a replacement justification.

---

## 1. The Four-Stage Evaluation Process

```
[Stage 1: Hard Gates] ──── Fail ──> [Reject / Keep as Explicit Specialist]
         │ Pass
[Stage 2: 12 Canonical Task Families]
         │
[Stage 3: Frozen Controlled Runs (3–5x)]
         │
[Stage 4: Multi-Axis Scoring & Blind Pairwise Review]
         │
[Decision: Pareto Dominance Assessment]
```

### Stage 1 — Hard Gates (Fail-Closed)
A candidate that fails any single gate is immediately disqualified from replacing the default owner:

| Gate | Verification Mechanism | Acceptance Threshold |
| :--- | :--- | :--- |
| **Artifact Validity** | Render via LibreOffice / PowerPoint smoke test | Zero XML repair prompts, zero render crashes |
| **Task Correctness** | Slide count, required sections, prompt adherence | 100% required elements present |
| **Data Integrity** | Fact checking against input sources | Zero hallucinated citations or inverted metrics |
| **Geometry** | Automated overflow detection (`slides_test.py`) | Zero text/shape canvas boundary overflows |
| **Editability** | PptxGenJS native object inspection | All text/tables are native, unflattened shapes |
| **Preservation** | Structural diff on edit tasks | Zero unrequested alterations to existing slides |

### Stage 2 — Twelve Canonical Task Families
Benchmark candidates across a balanced corpus representing real-world usage:

1. `greenfield-technical`: Academic lectures, protocol architectures, deep technical topics.
2. `executive-briefing`: Board updates, C-suite summaries, high-whitespace business memos.
3. `data-dense`: Financial models, KPI reporting, confusion matrices, analytical plots.
4. `editorial-keynote`: Single-idea stage slides, high-impact typography, visual pacing.
5. `dense-slidedoc`: High-information documents designed to be read without a presenter.
6. `existing-deck-edit`: Modifying 2–3 slides while preserving corporate design language.
7. `template-driven`: Building on top of an existing branded `.potx` / `.pptx` template.
8. `reference-recreation`: Accurately reconstructing a slide from a provided screenshot/PDF.
9. `chart-heavy`: Complex native multi-series bar, line, and scatter visualizations.
10. `diagram-heavy`: Complex network graphs, microservice architectures, layered flows.
11. `image-integrated`: Editorial photographic visuals with layout-first prompt placement.
12. `multilingual-vietnamese`: Vietnamese typography, tone accents, and font stability.

### Stage 3 — Frozen Controlled Execution
To isolate the effect of the skill artifact itself, hold all other variables constant:
- **Model & Version**: Identical model snapshot (e.g. Claude 3.7 Sonnet or GPT-4o).
- **Host Harness**: Same host runtime (e.g., OMP or Claude Code).
- **Environment**: Identical workstation, Node.js version, and LibreOffice build.
- **Trial Count**: Minimum 3 runs per task family; 5 runs for critical benchmark cases.

### Stage 4 — Four Scoring Axes

#### Axis A: Deterministic Machine Audit (Automated)
- XML validity, LibreOffice exit codes, overflow bounding boxes, missing font fallback rate, execution wall time, token consumption.

#### Axis B: Task-Specific Rubric (Factual Accuracy)
- Each task family carries a dedicated point rubric evaluating technical correctness, parameter accuracy, and formula derivation.

#### Axis C: Perceptual Visual Quality (Blind Pairwise Review)
- Anonymized comparison: `Candidate X` vs. `Candidate Y`.
- Order-swapped: Evaluate both $(X, Y)$ and $(Y, X)$ to eliminate position bias.
- Rubric: Visual dominance, multi-vector hierarchy, Gestalt proximity, visual rhythm, anti-slop compliance.

#### Axis D: Operational Burden
- Tool execution failures, retry rate, output bundle size, external system dependencies.

---

## 2. Benchmark Case Definitions

See `cases/canonical-cases.json` for prompt definitions, input source artifacts, and task-specific rubrics.
