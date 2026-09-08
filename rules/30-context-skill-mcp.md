# Context, Skill và MCP Routing

Load the smallest matching capability and never infer domain authority from words alone.
Keep living context cohesive, imperative, and useful to the current turn.

SKILL.md owns exact skill content, name and description. `registry/skills.yaml`
owns provenance, role, activation, dependencies, conflicts and lifecycle.
Upstream skills are immutable vendor artifacts: pinned to upstream commit,
verified by content hash, and vendored verbatim. The harness governs their
projection, mounting, lifecycle, and routing boundaries; it never rewrites,
splits, trims, patches, or optimizes upstream content or descriptions.
Progressive disclosure authoring guidelines apply strictly to internal skills
we author, never as a mandate to refactor third-party upstream skills.
Oversized or ill-suited upstream skills are governed strictly through exposure
policy (such as explicit-only activation, deterministic compatibility
filtering, or complete upstream replacement), never by in-place modification.
Global installation projects only active implicit skills. The complete library
stays in runtime-assets; an accepted task may transactionally project selected
explicit-only skills and true `requires` dependencies into a supported
repository-local skill surface. `supports` never activates. Replacement/close
removes only Agent Rules-owned task projections and preserves user files.

Keep one IntegrationRegistry with capability, transport, auth requirement, side effects, approval policy, supported hosts and probe.
Normal install registers the approved standard MCP providers in each supported native host. Registration is not a tool call and must preserve user-owned entries and an explicit user disable.
Each turn selects whether to use a registered MCP once from explicit capability or deterministic project fact. A turn without MCP need must not call a provider or mutate host config.
Task-local config is only for genuine isolation, has lease, timeout and cleanup, and never overwrites global user config.
Explicit-only providers never auto-route. Provider needing login/key reports Needs action, not native host install failure.

Native installation consists of self-contained rules, skills, explicitly selected profiles and native MCP registrations. Host lifecycle adapters invoke canonical turn routing or native discovery to project active domain skills into the turn prompt without persistent session wrappers.
Check the native static receipt before operator-driven install/update/doctor work; drift is never hidden by a prompt wrapper.
At intake, resolve implicit skills through native description discovery and
exact explicit skills from accepted task state. Repository facts only filter
compatibility. If the host cannot expose repository-local task skills, report
UNSUPPORTED/NEEDS_USER; never fall back to global explicit projection. Activate
profiles only from explicit owner selection or structured project fact.

Enforcement: portable compiler, generated context graph checks, native skill discovery, and static doctor readback.
