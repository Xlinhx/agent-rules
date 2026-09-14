# Context, Skill và MCP Routing

Load the smallest matching capability and never infer domain authority from words alone.
Keep living context cohesive, imperative, and useful to the current turn.

Skill Dependency Graph và nguyên lý phân định ranh giới:
- Nguyên lý tối thượng: "Same decision boundary → merge. Verification boundary → split."
  * GỘP trong cùng turn (Orthogonal Composite): Khi các kỹ năng cùng tham gia một quyết định sáng tác (cùng artifact, cùng pha compose, thẩm quyền trực giao, quyết định ràng buộc lẫn nhau). Ví dụ: bố cục (layout) + không gian 3D + công thức màu (OKLCH) + interaction feel.
  * TÁCH turn tuần tự (Phased Pipeline): Khi tồn tại trạng thái trung gian cần kiểm chứng bằng dữ liệu/mã nguồn thực tế (Evidence Gate). Các kỹ năng reviewer/auditor (như impeccable, review-animations, web-design-guidelines) bắt buộc nằm sau ranh giới kiểm chứng, không bao giờ gộp vào lượt tạo mới ban đầu.
- 5 Hard Gates ưu tiên tách turn:
  1. Authority Conflict Gate: Hai kỹ năng cùng tranh chấp một thẩm quyền quyết định (ví dụ 2 Art Director) → dùng exclusive_group để chọn đúng 1 đại diện.
  2. Evidence Gate: Kỹ năng sau cần nhìn thấy output/DOM thật của kỹ năng trước để đánh giá (Create → Critique / Motion → Motion QA).
  3. Verification Gate: Tồn tại phép đo trung gian có thể thay đổi hướng đi kỹ thuật (WebGL scene → GPU profile → optimize).
  4. Context Saturation Gate: Tổng context của các kỹ năng vượt ngân sách an toàn → cắt tỉa hoặc tách chặng.
  5. Blast-Radius Gate: Tránh gộp tái cấu trúc kiến trúc diện rộng với vi chỉnh chi tiết cục bộ trong cùng một lượt sửa đổi.

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
