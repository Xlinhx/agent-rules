---
name: presentation-design-contract
description: Presentation Information Design Doctrine and Art Direction for slide decks (`.pptx`). Governs narrative architecture, multi-vector visual hierarchy, Gestalt proximity grouping, visual semantics matrix, and perceptual design QA. Pair with the `slides` skill when creating new presentations, pitch decks, executive briefings, technical lectures, or substantial slide redesigns.
metadata:
  signals: "presentation design contract, slide design, pitch deck, slide deck, executive presentation, bài thuyết trình, thiết kế slide, slide đẹp, trình chiếu, keynote deck, powerpoint design"
  excludes: "web, frontend, react, dashboard, landing page, component"
  priority: "40"
  platform_scope: "all"
---

# Presentation Information Design Doctrine

## 1. Purpose & Scope

This doctrine governs narrative architecture, visual hierarchy, and art direction for presentation slide decks (`.pptx`).

It operates as the design authority paired with the `slides` skill (the PptxGenJS technical artifact owner). `slides` executes mechanical file operations; `presentation-design-contract` dictates information organization, visual semantics, and perceptual clarity.

### The Foundational Premise
> **Information density is not a design failure. Failure to organize density is the design failure.**
> (Edward Tufte / MIT Signal-to-Noise / Nancy Duarte Slidedocs).
> High-information decks do not require removing essential technical facts—they require establishing unmistakable visual dominance, multi-vector hierarchy, and scannable visual structures.

---

## 2. Authority Precedence

When design choices compete, follow this strict precedence:

1. **Explicit user instructions** (topic, constraints, branding, slide count).
2. **User-provided reference deck or template** (`.potx`, sample `.pptx`, approved slides).
3. **Project presentation contract / brand assets / design brief**.
4. **Existing deck's established visual language** (when editing or appending).
5. **Domain-specific presentation grammar** (Executive, Technical, Pitch, Data).
6. **Generic presentation design heuristics**.

*Invariant*: Generic aesthetic judgment must NEVER override an approved template or user-provided reference.

---

## 3. Reference-First: Decoding "Composition DNA"

When a reference deck, template, or sample slide is provided, extract its **Composition DNA**, not merely fonts and colors:

1. **Spatial zones**: Where does the title live? How wide are margins? How are content zones partitioned?
2. **Visual tension**: How do big stats contrast with supporting text? Where does whitespace create breathing room?
3. **Image-to-text balance**: Are visuals full-bleed, half-canvas, or inline spot diagrams?
4. **Density handling**: How does the reference handle complex multi-item comparisons without resorting to cluttered card grids?
5. **Chapter resets**: How are section breaks, chapter dividers, or climax slides visually distinguished?

---

## 4. The 10 Invariants of Presentation Information Design

> **Meta-Principle**: Principles are decision aids, not visual quotas. Reference deck DNA, communication purpose, content semantics, and delivery mode strictly outrank numeric heuristics. Do not repeat a design treatment merely to satisfy this doctrine.
### Principle 1 — Narrative Intent
Before writing PptxGenJS code, establish the narrative arc:
- Who is the audience? What is the core takeaway of this presentation?
- What is the logical sequence connecting slide $N$ to slide $N+1$?
- Avoid designing isolated slides and pasting them together; design a coherent story progression.

### Principle 2 — Delivery Mode & Density Strategy
Match slide density to the actual communication scenario:
- **Presenter-Led Mode** (Keynote, Pitch, Stage): Primary communication is spoken. Canvas holds high-impact claims, dominant visuals, and scannable assertions (**10–50 words**).
- **Document / Slidedoc Mode** (Executive Readout, Technical Spec, Self-guided Course): Audience reads without a speaker. Canvas holds complete technical rigor (**80–140 words**), structured strictly through multi-vector hierarchy.
- **Hybrid Lecture Mode** (University, Technical Training): Canvas presents structured technical takeaways, formulas, and architecture (**50–100 scannable words**); extended narrative and speech tracks live exclusively in `slide.addNotes()`.
- **Diagnostic heuristics, not hard caps**: These word ranges guide scannability. Approved reference decks, legibility, and pedagogical needs always override arbitrary word count limits.
### Principle 3 — One Dominant Entry Point
Within $<1$ second of looking at any content slide, the viewer must instantly identify the primary focal point:
- The dominant focal object may be: a prominent curve/plot, an unboxed horizontal timeline, an annotated confusion matrix, an architectural pipeline spanning the canvas, a massive statistical callout, or an editorial photograph.
- If the slide presents "3 or 4 equal-weight text blocks competing for attention", the hierarchy is broken—redesign it around one dominant entry point.

### Principle 4 — Multi-Vector Hierarchy
Never rely solely on font size to distinguish levels of information. Establish reading hierarchy through at least 3 coordinated vectors:
$$\text{Scale} + \text{Font Weight} + \text{Spatial Position} + \text{Color Contrast} + \text{Whitespace Buffer}$$
- **Primary (Takeaway/Claim)**: High contrast (100% ink), large scale, prominent placement.
- **Secondary (Direct Evidence)**: Medium-high contrast (80% ink), structured alignment.
- **Supporting (Body/Detail)**: Neutral tone (65–70% ink), standard scannable measure.
- **Annotation (Caveats/Notes)**: Muted tone (50% ink), distinct offset position.
- **Metadata (RFC, Source, Citation)**: Subtle hairline or low-contrast caption (35% ink) anchored at the perimeter.

### Principle 5 — Proximity Before Enclosure (Gestalt Law)
PowerPoint is an editorial medium, not a web dashboard.
- **Hierarchy of Grouping**: Group related content through:
  $$\text{Spatial Proximity} \longrightarrow \text{Alignment} \longrightarrow \text{Typography Scale} \longrightarrow \text{Subtle Background Tint} \longrightarrow \text{Border / Line Divider (Last Resort)}$$
- **Containers (`roundRect`, boxed outlines) are strictly exceptions**: Use a box only when the boundary represents a real physical entity (e.g. an encapsulated network frame or physical server). Never draw boxes merely to hold bullet points.
- **Proximity Rule**: If elements belong together, place them close together. If they are distinct, separate them with whitespace. Do not draw a card around them.

### Principle 6 — Semantic Composition Before Coordinates (Visual Semantics Matrix)
Before calculating slide coordinates, determine what geometric form the information naturally wants to become:

| Information Relationship | Natural Geometric / Semantic Form | PptxGenJS Execution Pattern |
| :--- | :--- | :--- |
| **Sequence / Lifecycle** | Continuous directional path | Horizontal axis with traveling hero token |
| **Encapsulation / Hierarchy** | Concentric nested sleeves | Nested translucent rectangles `[A [B [C]]]` |
| **Convergence (OSI $\rightarrow$ TCP/IP)**| Funnel / collapsing spectrum | Visual bands narrowing across canvas |
| **Comparison (Before vs. After)** | Opposing contrast fields | Two balanced zones with shared central axis |
| **Entity Decomposition** | Exploding / dissolving cluster | Central entity branching to categorized bars |
| **Classification Error** | Mismatched physical metaphor | Clean items falling into a warning container |
| **End-to-End System** | Full-canvas morphing pipeline | Continuous line connecting mutating nodes |
| **Trade-Off / Balance** | Opposing directional scale | Dial, spectrum, or two-pole continuum |

### Principle 7 — Two-Tier Headers & Action Assertions
- **Pitch / Executive decks**: Titles must state the **action takeaway** answering *"So what?"* (e.g., *"Edge OCR handles 85% of receipts locally, reserving LLMs for ambiguous scans"*).
- **Academic / Technical Lecture decks**: A **Two-Tier Header** is an authoritative, scannable option:
  - **Tier 1 (Concept Headline)**: Name the standard or domain (e.g., *"ISO/IEC 7498-1: The OSI Reference Model"*).
  - **Tier 2 (Declarative Thesis Subtitle)**: State the takeaway (e.g., *"Modular abstraction isolates hardware transceivers from application semantics"*).
- **Preferred grammar, not universal dogma**: Choose the title structure that maximizes audience clarity. Avoid naked category labels ("Overview", "Architecture", "Benefits") with no thesis.

### Principle 8 — Macro Visual Rhythm & Contrast Resets
Avoid deck-wide visual monotony:
- **Sub-sequence consistency is encouraged**: Multi-step technical walkthroughs (Step 1, Step 2, Step 3) SHOULD share layout skeletons so the viewer's mental model remains stable.
- **Deck-wide monotony is forbidden**: Do not repeat the exact same 2-column or 3-column layout across 10 unrelated slides.
- **Contrast Resets**: In a 15–20 slide deck, insert 2–3 high-contrast breathing slides to reset audience attention. Resets do not require dark backgrounds: an expansive field of whitespace, a full-bleed photograph, a single oversized stat, a minimal focal diagram, or a deep dark canvas (`#0C1620`) all achieve this cognitive reset.

### Principle 9 — Unifying Signature Device
Anchor the deck with a recognizable visual signature where appropriate:
- A unifying device may be: a recurring geometric language, an elegant annotation style, consistent photography framing, or an evolving narrative object (e.g. an email mutating into a packet wrapper, an optical pulse, a feature vector, and a prediction gate).
- Do not force a literal physical object to morph if the subject matter does not naturally support it.
### Principle 10 — Perceptual Design QA & Positive Design Review
A slide deliverable is NOT complete merely because `writeFile()` ran without exception. After rasterizing slides to PNGs with `render_slides.py`, execute this perceptual critique:

1. **Dominance**: Can the viewer identify the primary entry point in $<1$ second?
2. **Scan Path**: Does the eye move naturally through Primary $\rightarrow$ Secondary $\rightarrow$ Annotation?
3. **Proximity**: Would groups remain clear even if all borders were erased?
4. **Enclosure Check**: Did the agent fall back into drawing unnecessary rounded cards?
5. **Density Organization**: Is high density scannable via structured phrases, or does it drown in unbroken prose?
6. **Positive Art Direction**: Is there at least one deliberate, opinionated graphic design choice on this slide (asymmetric tension, prominent scale contrast, semantic geometry, or editorial whitespace)?

---

## 5. Typography & Palette Systems

### Option A: Editorial Academic (Lectures, Research, Technical Syllabi, Publications)
- **Display / Header**: `Georgia Bold` (authoritative, prestigious serif).
- **Body / Subtitle / Table**: `Aptos` or `Calibri` (crisp, modern legibility; native to Office).
- **Code / Protocol / Metrics**: `Consolas` (fixed-width technical precision).
- **Palette**:
  - Canvas (Crisp Ivory): `#FBF9F4`
  - Text (Charcoal Ink): `#18212A`
  - Primary (Academic Slate Blue): `#24587B`
  - Signal (Vibrant Coral): `#E45C43`
  - Secondary Accent (Electric Sky): `#68BDE3`
  - Muted (Graphite): `#666A70`
  - Contrast Reset Canvas: `#0C1620`

### Option B: Modern Technical / Cyber (DevOps, Cloud, Systems, AI Keynotes)
- **Display / Header**: `Aptos Display` / `Segoe UI Variable` (Bold Geometric Sans).
- **Body / Subtitle**: `Aptos` / `Segoe UI` (clean contemporary sans).
- **Code / Protocol**: `Consolas` / `Cascadia Code`.
- **Palette**:
  - Canvas (High-Luminosity White): `#FFFFFF` or `#FAFAFC`
  - Text (Deep Onyx): `#0A0E17`
  - Primary (Electric Cobalt): `#0066FF` / `#2563EB`
  - Signal (Vibrant Amber / Red): `#F59E0B` / `#EF4444`
  - Hairline Border: `#E2E8F0`
  - Contrast Reset Canvas: `#0A0E17`

---

## 6. Image Generation & Deterministic Visualization Capabilities

To avoid inflating the skill registry with separate agent skills, use project-level libraries directly within PptxGenJS scripts:

- **PptxGenJS (Upstream Owner `slides`)**: Core technical generation for native text, shapes, tables, and standard charts.
- **Graph & Diagram Layout CLIs (`tools/graphics/bin/`)**:
  - `tools/graphics/bin/dagre-layout.mjs`: Execute via Node to calculate coordinates for directed flows, sequential pipelines, and state machines (`{ direction: "LR", nodes, edges }` $\longrightarrow$ `{ nodes: [{ id, x, y, width, height }], edges: [{ points }] }`).
  - `tools/graphics/bin/elk-layout.mjs`: Execute via Node to compute layered, port-aware layout coordinates for complex network topologies and nested architectural modules.
- **Declarative Data Visualizations (`tools/graphics/bin/vega-svg.mjs`)**: Render complex Vega-Lite statistical specifications directly to crisp SVG vector visual assets when native PowerPoint charts lack expressive capability.
- **Semantic Icon Sets (Lucide)**: Use consistent, restrained vector icons for technical semantics; avoid mixing disparate clipart families.
- **AI Image Generation**: Use layout-first prompting (deciding negative space and composition before prompting) strictly for cover backgrounds, section dividers, and conceptual metaphors. Never generate full-slide flat raster images.
