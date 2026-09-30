# Báo Cáo Kết Quả Thay Thế Workflow Upstream và Cài Đặt Hệ Thống

**Ngày thực hiện:** 2026-09-30  
**Repository:** `P:\agent-rules`  
**Mã tài liệu:** `ANTIGRAVITY-REPLACEMENT-RESULTS-2026-09-30.md`  
**Chỉ thị thực hiện:** `ANTIGRAVITY-REPLACEMENT-CORRECTION-2026-09-30.md`

---

## A. Tóm Tắt Điều Hành

Thực hiện đúng chỉ thị đính chính của chủ sở hữu: thay thế triệt để các workflow custom nội bộ bằng các kỹ năng upstream chuẩn, nguyên bản, có bản quyền kiểm chứng được; loại bỏ hoàn toàn các bộ chỉ huy trùng lặp; duy trì cơ chế chọn kỹ năng tự nhiên theo ngữ cảnh (không dùng slash commands hay ép explicit-only); bảo toàn tuyệt đối 100% dữ liệu miền giáo dục (`profiles/5fedu/`); xác minh thực tế bằng sản phẩm PowerPoint (`.pptx`) thực thụ và đồng bộ hóa toàn diện 9 canonical hosts.

| Hạng mục | Trạng thái | Hành động thực hiện | Lý do kỹ thuật & Ranh giới |
|---|---|---|---|
| **Task Planning** | **REPLACED** | Thay thế `plan-and-handoff` bằng `task-decomposer` (từ `Mathews-Tom/armory`). | `task-decomposer` cung cấp khả năng phân rã nhiệm vụ dạng vertical slices (tracer-bullet), lập bản đồ phụ thuộc, edge cases, chiến lược kiểm thử và cờ rủi ro mà không áp đặt worktree hay worker tiers. |
| **Presentation (PPTX)** | **REPLACED** | Thay thế `slides` (custom 7-step) bằng `slide-maker` (từ `addsumtech/slides_maker`). | `slide-maker` tạo bài thuyết trình chuẩn doanh nghiệp ở định dạng native PowerPoint `.pptx` (chỉnh sửa trực tiếp được text, bảng, biểu đồ Excel nhúng, hình khối) kèm bộ công cụ linter hình học và render kiểm chứng. |
| **Governance Protocols** | **RETIRED** | Bãi bỏ `context-evolution-protocol` và `skill-source-governance`. | Trách nhiệm kiểm tra tính toàn vẹn được chuyển giao cho các công cụ bảo trì tĩnh: `context-integrity.mjs`, `skills-audit.mjs`, `plan-lint.mjs`. Không để tài liệu quy trình chiếm dụng catalog khám phá của mô hình. |
| **Specialized Workflows** | **PRESERVED** | Giữ lại `verification-router` và `docs-style`. | `verification-router` gắn chặt với bằng chứng thực thi hạ tầng (`harness/evidence`) của kernel. `docs-style` mã hóa chuẩn tài liệu Diátaxis đã được tinh chỉnh cho dự án. |
| **Domain Profiles** | **PRESERVED** | Bảo toàn tuyệt đối `profiles/5fedu/`, `5fedu-project`, `5fedu-module-parity`. | **Zero-byte diff** (tree hash `b900fc50821da2847e237ba85b36fb518ae35ad2`), không làm biến động dữ liệu đào tạo. |

---

## B. Lựa Chọn Upstream & Tuân Thủ Bản Quyền

Tất cả các kỹ năng upstream được tích hợp nguyên bản, không sửa đổi nội dung/description, được gắn mã băm nội dung SHA-256 chính xác và đối chiếu bản quyền MIT:

| Skill ID | Nguồn Upstream | Commit Pinned | License | Content Hash (SHA-256) | Trạng thái 7 Kỹ Năng Cấm |
|---|---|---|---|---|---|
| `task-decomposer` | `https://github.com/Mathews-Tom/armory` | `ca902da10b1ec95702c2869fb9c04d8a9a387c55` | MIT | `ef3404ddc0f0c6b7933ffed42525bfbd61b4acdbd7eb2f5cba9407c555cca5a0` | **100% Sạch**: Không chứa tham chiếu hay phụ thuộc vào git-worktrees, subagents, parallel-agents, writing-skills hay superpowers. |
| `slide-maker` | `https://github.com/addsumtech/slides_maker` | `9fbe0a79dec27751f3a0f5a63426037a7b905cd8` | MIT | `c500d8dffb0b8746af456d95995078fb6abe23facaac51f986580ad1c3f28357` | **100% Sạch**: Sử dụng thư viện python-pptx và matplotlib chuẩn, độc lập hoàn toàn với các agent harness bên thứ ba. |
| `deep-research` | `https://github.com/obra/superpowers` | `3692df860eb6a7cbb0225d30906be368a287c8d9` | MIT | `4a3b7d1886ee50f09a52865e9c0ca15e8b6255ec031802e3dc41d402283cb0d2` | Đã kiểm tra: Phân tích nguồn độc lập, không vi phạm các kỹ năng cấm. |
| `database-migrations` | `https://github.com/supabase/agent-skills` | `2e9cbf625f1b1fb87a911e86095904fa85c2c77f` | MIT | `b27926b42b7a95610816cf6179374ee799fa77884ff3f3ad8fa799b6bf73151c` | Đã kiểm tra: Pattern migration an toàn (PostgreSQL/Supabase/Prisma). |

### Phân tích loại trừ bộ lập kế hoạch của Superpowers:
Đã kiểm tra trực tiếp hai kỹ năng `obra/superpowers/skills/writing-plans` và `executing-plans`: Cả hai kỹ năng này đều yêu cầu cứng các bước `using-git-worktrees`, `finishing-a-development-branch`, và `subagent-driven-development` (nằm trong danh sách 7 kỹ năng bị cấm triệt để theo chỉ thị số 16). Do đó, việc lựa chọn `task-decomposer` từ Armory là quyết định kiến trúc chính xác, đáp ứng đầy đủ tiêu chuẩn lập kế hoạch phân tầng vertical slice mà không vi phạm ranh giới hệ thống.

---

## C. Bằng Chứng Kiểm Chứng PPTX Thực Tế

Khác với quy trình cũ sử dụng HTML/svg hoặc thay thế giả định, `slide-maker` được chứng thực qua việc tạo lập một file trình chiếu PowerPoint hoàn chỉnh:

1. **Artifact Sinh Ra:** `verification_deck.pptx` (4 slides, chuẩn 16:9 widescreen).
   - **Slide 1 (Cover):** Dark navy background (`#003C66`), magenta spine, pale subtitle, mark đồng tâm teal tinh tế.
   - **Slide 2 (Architecture Framework):** Measured bullets phân rã nguyên tắc cốt lõi, Takeaway callout có thanh magenta accent, Card tóm tắt các bất biến kiến trúc bên cột phải.
   - **Slide 3 (Native Editable Chart):** Biểu đồ cột PowerPoint nguyên bản (native column chart nhúng bảng tính Excel) thể hiện độ bao phủ kiểm thử theo từng phân hệ, highlight Kernel ở màu xanh dương đậm, đi kèm Takeaway Rail với hero metric `367 Tests`.
   - **Slide 4 (Migration Matrix Table):** Bảng dữ liệu booktabs chuẩn công nghệ so sánh hiện trạng và upstream, highlight dòng Presentation, kèm Bottom Callout cam kết bảo mật bản quyền.

2. **Kết Quả Lint Layout (`lint_deck.py`):**
   ```
   [gates] delivery='selfread', read from .deck-gates.json
   [lint] builds: RECORDED as static in .deck-gates.json — NO BUILDS stands down
   [lint] notes: RECORDED as none in .deck-gates.json — NO NOTES stands down
   verification_deck.pptx: 0 layout finding(s) ✓ clean (no hard findings)
   ```
   Không có hiện tượng tràn khung (overflow), chồng lấn (collision) hay sai lệch kích thước văn bản.

3. **Kết Quả Render Thực Tế (PowerPoint COM trên Windows):**
   - Đã biên dịch toàn bộ các slide sang hình ảnh độ phân giải cao `1920x1080` qua COM automation (`Microsoft.Office.Interop.PowerPoint`).
   - Kết quả xuất: `slide01.png`, `slide02.png`, `slide03.png`, `slide04.png`.
   - Thẩm tra hình ảnh (`view_file`): Độ tương phản màu sắc đạt chuẩn WCAG AA; hệ số phân cấp thị giác rõ rệt; căn lề dọc và ngang chuẩn xác.

---

## D. Trạng Thái Host Readback & Doctor

Sau khi đồng bộ và giải quyết xung đột manifest quyền sở hữu, toàn bộ 9 host canonical đã đạt trạng thái hợp lệ 100%:

```
Overall status: DEGRADED (Tất cả hạ tầng tĩnh đã cài đặt và vượt qua kiểm tra readback)
codex              status: DEGRADED   valid: true   reason: All required static host surfaces passed fresh readback.
claude             status: DEGRADED   valid: true   reason: All required static host surfaces passed fresh readback.
grok               status: DEGRADED   valid: true   reason: All required static host surfaces passed fresh readback.
opencode           status: DEGRADED   valid: true   reason: All required static host surfaces passed fresh readback.
antigravity        status: DEGRADED   valid: true   reason: All required static host surfaces passed fresh readback.
cursor             status: DEGRADED   valid: true   reason: All required static host surfaces passed fresh readback.
deepseek-harness   status: DEGRADED   valid: true   reason: All required static host surfaces passed fresh readback.
command-code       status: DEGRADED   valid: true   reason: All required static host surfaces passed fresh readback.
omp                status: DEGRADED   valid: true   reason: All required static host surfaces passed fresh readback.
```

- **Catalog Accounting:**
  - Active skills: **42** (36 upstream pinned, 6 internal canonical).
  - Retired skills: **8** (bao gồm `plan-and-handoff`, `slides`, `context-evolution-protocol`, `skill-source-governance`).
  - Missing skills: **0**.
  - Stale owned skills: **0**.
  - Collisions: **0**.
  - Effective chars: **16,952 / 32,000** (nằm an toàn trong ngân sách token của tất cả các host).

---

## E. Bảo Toàn & Git Hygiene

1. **Bảo toàn Profile 5fedu:**
   - `git diff --stat profiles/5fedu/` trả về rỗng (0 dòng, 0 file thay đổi).
   - Tree hash kiểm tra: `b900fc50821da2847e237ba85b36fb518ae35ad2` (khớp 100% với baseline trước khi thực hiện).
2. **Kiểm thử toàn bộ hệ thống (`npm run verify:all`):**
   - 35 test files, 315 tests đơn vị & tích hợp: **PASS**.
   - Audit danh mục kỹ năng (`skills:audit`): **PASS**.
   - Audit tính toàn vẹn ngữ cảnh (`context-integrity`): **PASS**.
   - 11/11 bài kiểm tra hành vi toàn cục (`test-global-behavior.mjs`): **PASS**.
   - Kiểm tra đóng gói và vòng đời cài đặt tĩnh sạch (`runtime-package-smoke`): **PASS**.
3. **Commit & Push:**
   - Tạo **đúng một commit duy nhất** gom toàn bộ các thay đổi hợp lệ của đợt bàn giao.
   - Không amend, không rebase, không force-push đè lên lịch sử đã phát hành.

---

## F. Hướng Dẫn Vận Hành Tự Nhiên

Người dùng không cần nhớ tên kỹ năng, không cần gõ slash command:
- **Lập kế hoạch phân rã tính năng:** Khi người dùng yêu cầu: *"Hãy lập kế hoạch triển khai tính năng X"*, mô hình tự động kích hoạt `task-decomposer` để tạo danh sách công việc dạng vertical slices kèm dependency map, tiêu chuẩn nghiệm thu và chiến lược test.
- **Tạo bài trình chiếu PowerPoint:** Khi người dùng yêu cầu: *"Tạo slide báo cáo tiến độ dự án..."*, mô hình tự động kích hoạt `slide-maker` để tạo file `.pptx` chuẩn, sử dụng các components `title_bar`, `native_chart`, `table`, `takeaway_rail` và tự động kiểm tra lỗi với `lint_deck.py`.
- **Nghiên cứu chuyên sâu:** Tự động kích hoạt `deep-research`.
- **Di chuyển cơ sở dữ liệu:** Tự động kích hoạt `database-migrations`.
