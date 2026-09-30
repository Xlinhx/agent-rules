---
name: slides
description: "End-to-end professional presentation workflow: brief understanding, visual design references (Canva, Slidesgo), narrative editing, host-native visuals, editable PPTX authoring within strict 16:9 canvas bounds, and real rendered verification."
metadata:
  signals: "powerpoint, pptx, slides, slide deck, presentation, làm slide, bài thuyết trình, tạo slide, pitch deck"
  excludes: "pure code scripts, web landing pages, text-only summaries, non-presentation documents"
  priority: "60"
  platform_scope: "all"
---

# Professional Slides Workflow

A complete, end-to-end presentation authoring procedure. Covers every phase from content brief and visual referencing to PowerPoint-native editable authoring and real rendered proof.

## Deliverable Contract

- **Primary deliverable:** `.pptx` presentation file. Text boxes, simple charts, and data tables MUST remain editable in PowerPoint whenever possible.
- **Support files:** Generator script (JavaScript via PptxGenJS or Python via `python-pptx`) and generated visual assets for rebuildability.
- **Never substitute:** Do NOT substitute HTML, Markdown slides, or PDF in place of the requested `.pptx`.

---

## The 7-Step Authoring Procedure

### 1. Hiểu brief (Understand the Brief)
Clarify key dimensions without burdensome questionnaires:
- **Purpose:** Pitch deck, executive report, technical architecture, educational explainer, or product update.
- **Audience & Context:** Live presentation (spacious, visual, low text density) vs. self-reading / leave-behind document (dense, structured, data-complete).
- **Brand & Tone:** Corporate enterprise, technical minimal, warm editorial, or vibrant modern.
- **Invariants:** Preserve real facts, source metrics, and branding guidelines. Never fabricate benchmarks or ungrounded statistics.

### 2. Tự tìm và nhìn tham chiếu (Visual Discovery)
When visual direction is not already provided, look up professional design references:
- **Primary sources:** Canva (`https://www.canva.com/presentations/templates/`), Slidesgo (`https://slidesgo.com/`), or user-provided templates.
- **Look at actual layouts:** Inspect slide grid structures, typography contrasts, color accents, and whitespace rhythm.
- If references cannot be fetched online, adopt standard professional design patterns and clearly declare baseline choices.

### 3. Áp dụng tham chiếu (Apply Design System)
Extract concrete design rules from the reference:
- **Slide Canvas:** Default to 16:9 widescreen standard: `13.333 x 7.5` inches (or `10 x 5.625` inches).
- **Safe Margins:** Strict boundary enforcement:
  - Left / Right margin: >= `0.8` inches.
  - Top margin: >= `0.6` inches.
  - Bottom margin: >= `0.6` inches.
  - Absolute element bounds: `x + w <= slide_width` and `y + h <= slide_height`. Never allow elements to bleed outside the canvas.
- **Color Palette:** 1 dominant background (e.g. clean light or dark slate), 1-2 primary content tones, and 1 high-contrast accent.
- **Typography Scale:** Intentional contrast:
  - Slide Header: 24–32pt bold.
  - Subheaders / Section labels: 14–18pt semibold.
  - Body text & metrics: 11–14pt regular.
  - Captions / footnotes: 9–10pt.

### 4. Biên tập câu chuyện (Narrative Structure)
Every slide conveys ONE clear message or answers ONE key question:
- **Layout diversity:** Match visual form to content type:
  - *Comparison:* Side-by-side columns with symmetric metric callouts.
  - *Process / Timeline:* Horizontal milestone tracks or numbered stages.
  - *Architecture / System:* Clean layered blocks with clear directional flows.
  - *Data / Metrics:* Large stat callouts (36–48pt) paired with explanatory labels.
- **Anti-slop:** Never turn every slide into generic bulleted lists or cards nested inside cards. Avoid cliché AI purple gradients and ungrounded drop shadows.

### 5. Tạo hình (Host-Native Visuals)
When illustrations, diagrams, or icons strengthen comprehension:
- Use capabilities actually present on the current host (e.g. native image tools, vector icons, or procedural SVGs).
- Never hardcode external proprietary endpoints (e.g. OpenAI DALL-E) unless explicitly requested.
- Critical facts, data tables, metrics, and text must NEVER be rasterized into images; keep them editable.

### 6. Dựng PPTX (Authoring & Geometry Discipline)
Use either PptxGenJS (Node.js) or `python-pptx` (Python):
- **Set canvas explicitly:**
  - In PptxGenJS: `pptx.layout = 'LAYOUT_WIDE';` (13.333" x 7.5").
  - In python-pptx: `prs.slide_width = Inches(13.333); prs.slide_height = Inches(7.5);`
- **Safe coordinates:**
  - Header: `x = 0.8`, `y = 0.6`, `w = 11.7`, `h = 0.8`.
  - Main content: `x = 0.8`, `y = 1.6`, `w = 11.7`, `h = 5.2`.
  - Bottom boundary: content `y + h` must not exceed `7.0`.
- **Editable elements:** Use native PowerPoint tables, shapes, and text boxes rather than flat screenshots.
- **Technical helpers:** Use bundled helpers under `assets/pptxgenjs_helpers/` or standalone python-pptx scripts as needed.

### 7. Render và kiểm tra thực tế (Render & Inspect)
Exit code 0 is NEVER proof of visual quality. Run actual rendering to verify:
- **Windows environment:** Use PowerPoint COM (`win32com.client`) or LibreOffice/python tools to export each slide to high-resolution PNG:
  ```python
  import win32com.client, os
  ppt = win32com.client.Dispatch("PowerPoint.Application")
  prs = ppt.Presentations.Open(os.path.abspath("deck.pptx"))
  prs.SaveAs(os.path.abspath("rendered/slide.png"), 17) # 17 = ppSaveAsPNG
  prs.Close()
  ppt.Quit()
  ```
- **Visual inspection checklist:**
  - [ ] No right-edge or bottom-edge clipping (all text boxes fit within canvas).
  - [ ] No overlapping text boxes or misaligned column headers.
  - [ ] Line wraps occur at natural syntactic boundaries.
  - [ ] Adequate contrast against background fills.
- Fix all geometry and overlap defects before delivering the final `.pptx`.
