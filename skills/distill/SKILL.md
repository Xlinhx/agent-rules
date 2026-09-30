---
name: distill
description: Reduce UI complexity to reveal clarity and purpose by stripping unnecessary visual noise and redundant elements.
metadata:
  signals: "distill, tinh giản, bỏ bớt chi tiết thừa, đơn giản hóa ui, strip complexity, tối giản giao diện"
  excludes: "complete redesign, new feature development, slides, backend reviews"
  priority: "50"
  platform_scope: "all"
---

Strip a design to its essence. Remove anything that doesn't earn its place: redundant elements, repeated information, decorative noise, cosmetic complexity.


---

## Assess Current State

Analyze what makes the design feel complex or cluttered:

1. **Identify complexity sources**:
   - **Too many elements**: Competing buttons, redundant information, visual clutter
   - **Excessive variation**: Too many colors, fonts, sizes, styles without purpose
   - **Information overload**: Everything visible at once, no progressive disclosure
   - **Visual noise**: Unnecessary borders, shadows, backgrounds, decorations
   - **Confusing hierarchy**: Unclear what matters most
   - **Feature creep**: Too many options, actions, or paths forward

2. **Find the essence**:
   - What are the primary workflow and key user goals?
   - What essential domain capabilities and business logic must be preserved?
   - What redundant presentation, visual noise, or duplicate controls can be eliminated?
   - What secondary actions can be cleanly tucked behind progressive disclosure without breaking user workflows?

If any of these are unclear from the codebase, do not guess. STOP and use Codex's structured user-input/question tool when available; if unavailable, ask directly in chat to clarify what you cannot infer.

**CRITICAL**: Simplicity is not about removing features. It's about removing obstacles between users and their goals. Every element should justify its existence.

## Plan Simplification

Create a ruthless editing strategy:

- **Core purpose**: What is the core workflow this interface delivers?
- **Essential elements**: What controls, information, and business actions are necessary to achieve that purpose?
- **Progressive disclosure**: What secondary details can be disclosed contextually rather than cluttering primary scan paths?
- **Consolidation opportunities**: What duplicate forms, buttons, or wrapper containers can be merged?

**IMPORTANT**: Simplification is hard. It requires distinguishing essential domain capability from cosmetic clutter. Focus on removing noise, not business value.

## Simplify the Design

Systematically remove complexity across these dimensions:

### Information Architecture
- **Clarify presentation**: Eliminate visual redundancy and decorative clutter; preserve essential domain capabilities, business logic, secondary actions, and optional features.
- **Progressive disclosure**: Organize complex options behind clear, accessible entry points (collapsible sections, menus, contextual flows) rather than deleting required capabilities.
- **Combine related actions**: Merge overlapping buttons, consolidate fragmented forms, and group related controls logically.
- **Clear hierarchy**: Prominent primary action, accessible secondary actions, and logical grouping for domain tools.
- **Remove redundancy**: Eliminate repeated text, duplicate status indicators, and redundant navigation elements.

### Visual Simplification
- **Reduce color palette**: Use 1-2 colors plus neutrals, not 5-7 colors
- **Limit typography**: One font family, 3-4 sizes maximum, 2-3 weights
- **Remove decorations**: Eliminate borders, shadows, backgrounds that don't serve hierarchy or function
- **Flatten structure**: Reduce nesting, remove unnecessary containers; never nest cards inside cards
- **Remove unnecessary cards**: Cards aren't needed for basic layout; use spacing and alignment instead
- **Consistent spacing**: Use one spacing scale, remove arbitrary gaps

### Layout Simplification
- **Linear flow**: Replace complex grids with simple vertical flow where possible
- **Remove sidebars**: Move secondary content inline or hide it
- **Full-width**: Use available space generously instead of complex multi-column layouts
- **Consistent alignment**: Pick left or center, stick with it
- **Generous white space**: Let content breathe, don't pack everything tight

### Interaction Simplification
- **Reduce choices**: Fewer buttons, fewer options, clearer path forward (paradox of choice is real)
- **Smart defaults**: Make common choices automatic, only ask when necessary
- **Inline actions**: Replace modal flows with inline editing where possible
- **Remove steps**: Can the flow lose a step?
- **Clear next action**: ONE obvious next action, not five competing ones

### Content Simplification
- **Shorter copy**: Cut every sentence in half, then do it again
- **Active voice**: "Save changes" not "Changes will be saved"
- **Remove jargon**: Plain language always wins
- **Scannable structure**: Short paragraphs, bullet points, clear headings
- **Essential information only**: Remove marketing fluff, legalese, hedging
- **Remove redundant copy**: No headers restating intros, no repeated explanations, say it once

### Code Simplification
- **Remove unused code**: Dead CSS, unused components, orphaned files
- **Flatten component trees**: Reduce nesting depth
- **Consolidate styles**: Merge similar styles, use utilities consistently
- **Reduce variants**: Does that component need 12 variations, or can 3 cover 90% of cases?

**NEVER**:
- Remove necessary functionality (simplicity ≠ feature-less)
- Sacrifice accessibility for simplicity (clear labels and ARIA still required)
- Make things so simple they're unclear (mystery ≠ minimalism)
- Remove information users need to make decisions
- Eliminate hierarchy completely (some things should stand out)
- Oversimplify complex domains (match complexity to actual task complexity)
- Forcibly compress multi-capability business or domain tools into artificial single-purpose minimalist templates
- Delete secondary actions, power-user shortcuts, or domain features under the pretext of simplification
- Force an Apple-like or consumer-minimalist aesthetic onto interfaces with deliberate high-density, analytical, or branded requirements

## Verify Simplification

Ensure simplification improves usability:

- **Faster task completion**: Can users accomplish goals more quickly?
- **Reduced cognitive load**: Is it easier to understand what to do?
- **Still complete**: Are all necessary features still accessible?
- **Clearer hierarchy**: Is it obvious what matters most?
- **Better performance**: Does simpler design load faster?

## Document Removed Complexity

If you removed features or options:
- Document why they were removed
- Consider if they need alternative access points
- Note any user feedback to monitor

When the cuts feel right, hand off to the `polish` skill for the final pass. As Antoine de Saint-Exupéry put it: "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away."
