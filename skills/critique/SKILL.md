---
name: critique
description: "Multi-lens UX and UI design critique evaluating intent alignment, visual hierarchy, typography, WCAG 2.1 AA accessibility, information density, and craft polish. Signals: review thiết kế, đánh giá UI, xem hộ giao diện, UX audit, critique layout, visual feedback, anti-slop check. Do NOT use for slide decks or backend API reviews."
metadata:
  signals: "review thiết kế, đánh giá UI, xem hộ giao diện, UX audit, critique layout, visual feedback, anti-slop check"
  excludes: "slide decks, presentations, backend API reviews, pure code implementation"
  priority: "50"
  platform_scope: "all"
---

# UI & UX Design Critique

## Purpose
Perform a rigorous, context-aware design critique of a web or mobile interface. This critique applies strict technical discipline while respecting the product's intended aesthetic direction, brand identity, and required information density.

## The Dual-Strength Critique Framework

### 1. Intent & Context Alignment
- **Audience & Tone**: Does the visual execution match the product's purpose and persona? Avoid forcing every product into a generic minimalist template. Editorial, vibrant, brutalist, high-density dashboard, and warm corporate styles are all valid when intentional.
- **Information Density**: Density must serve the user task:
  - *Compact density* (dashboards, developer tools, financial terminals): Prioritize scannability, compact row heights, tight spacing, and minimal decorative chrome.
  - *Spacious density* (landing pages, marketing, long-form editorial): Use generous breathing room between thematic blocks to guide reading pace.

### 2. Visual Hierarchy & Scannability
- **Primary Action (Focal Point)**: Is the single primary action unmistakable within 3 seconds? Never present competing CTAs of equal visual weight in the same viewport.
- **F-Pattern / Z-Pattern Flow**: Does the reading path flow naturally from highest to lowest priority information?
- **Container Hygiene**: Eliminate unnecessary wrapper cards, border stacking, and redundant nested containers. Group information by proximity and whitespace before resorting to outlines or background fills.

### 3. Typography, Ergonomics & Accessibility
- **WCAG 2.1 AA Compliance**:
  - Text contrast minimum: 4.5:1 for normal body text, 3:1 for large text (>= 18pt or >= 14pt bold).
  - Essential UI components and graphical objects minimum: 3:1 contrast against adjacent colors.
- **Type Hierarchy**: Distinct, intentional scale across Page Title, Section Heading, Subheading, Body, and Caption. Keep body line length between 45–75 characters with line height of 1.4–1.6 for comfortable reading.
- **Touch & Tap Targets**: Minimum 44×44px interactive bounding box for mobile / touch interfaces with adequate spacing between adjacent triggers.
- **Keyboard & Navigation Accessibility**: Visible, distinctive `:focus-visible` indicators on all interactive elements. Logical tab order that mirrors visual flow.

### 4. Craft, Affordances & Anti-Slop Discipline
- **Interactive Affordance & Full State Coverage**: Every interactive control must have distinct, designed states: `default`, `hover`, `active`, `focus-visible`, and `disabled`.
- **Transitions**: Purposeful, short durations (150ms–250ms) tied to specific properties (e.g., `opacity`, `transform`, `background-color`). Never use unqualified `transition: all`.
- **Anti-Slop Sanity Check**:
  - Eliminate generic, unprompted AI tropes (e.g., cliché purple-blue radial gradients, excessive ungrounded drop shadows, decorative background orbs that clutter reading).
  - Color palettes should have a deliberate semantic structure (clear neutrals, distinct primary, purposeful semantic alert colors for success/warning/error) rather than accidental random hues.
  - Align icon style, corner radii, and line weights consistently across the entire view.

## Output Format
Present feedback concisely and constructively:
1. **Executive Verdict**: 2–3 sentences capturing the core impression and strongest opportunity for improvement.
2. **Intent & Density Check**: Brief validation of whether density and style fit the stated goal.
3. **Priority Fixes (P0 / P1 / P2)**:
   - **P0 (Usability / Accessibility blocker)**: Issues causing confusion, unreadable text, or broken navigation.
   - **P1 (Visual hierarchy & rhythm)**: Layout clutter, competing focal points, card bloat, typography sizing.
   - **P2 (Craft polish)**: Micro-alignment, state polish, icon consistency, transition tuning.
4. **Actionable Handoff**:
   - For structural layout & component refactoring -> recommend `emil-design-eng`
   - For micro-interaction & transition tuning -> recommend `animation-vocabulary`
   - For final typography and surface detailing -> recommend `polish`
