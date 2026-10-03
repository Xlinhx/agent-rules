# Plan bàn giao Antigravity: skills tự kích hoạt đúng ngữ cảnh và chuyển chặng

> **For agentic workers:** Dùng `executing-plans` để triển khai tuần tự trong session của model người dùng đã chọn. Chỉ dùng `subagent-driven-development` khi phương thức delegation đã được người dùng cho phép và host có công cụ thật. Không tự đổi model, đặt worker tiers hoặc yêu cầu người dùng gọi skills bằng tên.

**Goal:** Prompt tự nhiên và trạng thái công việc phải đủ để agent chọn, đọc và áp dụng skills phù hợp, kể cả lúc code trực tiếp, nhận plan từ nơi khác, chuyển sang nghiên cứu/review và chuẩn bị báo hoàn thành.

**Architecture:** Native discovery của host tiếp tục chọn skills từ catalog upstream nguyên bản. Rules luôn nạp cung cấp chỉ dẫn ngắn về điểm vào và việc xét lại skills khi công việc chuyển chặng; compiler/installer chỉ đảm bảo chỉ dẫn và catalog được chiếu đúng. Không thêm runtime router, keyword matcher, hook, dịch vụ quan sát hoặc một workflow custom thay upstream.

**Tech Stack:** Rules Markdown/YAML; CLI và kernel TypeScript; Node build; Vitest; native instruction/skill surfaces của các host đã cài.

**Spec:** Toàn bộ yêu cầu và quyết định nằm trong file này. `SKILL-TRIGGER-AUDIT-2026-10-02.md` là bằng chứng hỗ trợ, không phải bộ quy tắc cho các dự án ứng dụng.

**Baseline đã đọc:** `65d436bac4051600e1e681fce3f24c78252431b1`, nhánh `main`, ngày 03/10/2026. Khi nhận việc phải đọc lại HEAD và working tree; không reset về baseline hoặc ghi đè công việc đang có.

## 1. Phạm vi đã chốt và những gì thực sự thay đổi

Đây là đợt bổ sung cho hệ thống đã nhập Superpowers. Không thực hiện lại các plan thay skills/PPTX trước, không khôi phục các custom đã retire, không mở audit toàn bộ repository.

| Loại | Thành phần | Kết quả phải đạt |
|---|---|---|
| MODIFY | `rules/10-execution-planning-delegation.md` | Chỉ dẫn chọn skill theo mục đích và chặng công việc nằm trên bề mặt luôn nạp; tiếp nhận plan từ chat/host khác và code trực tiếp rõ ràng |
| MODIFY | `rules/30-context-skill-mcp.md` | Đồng nhất với rule 10; giữ chi tiết governance/build, không giữ một bản chỉ dẫn thực thi cạnh tranh |
| MODIFY nếu có mâu thuẫn | `AGENTS.md`, overlay Antigravity, câu intake do installer sinh | “Resolve once” không được hiểu là khóa skills cho cả turn/session; không nhân bản workflow hoặc policy chung trong overlay |
| MODIFY khi có lỗi được chứng minh | Compiler/installer/readback hiện hữu | Sửa đúng seam làm mất chỉ dẫn/catalog; không xây cơ chế routing mới |
| PRESERVE | Toàn bộ upstream skills, pins, descriptions và dependencies hợp lệ | Vendor không thay nội dung; skills phù hợp tiếp tục implicit và có mặt trong native discovery |
| PRESERVE | Skills custom còn hoạt động | Không thay/xóa hàng loạt `docs-style`, `verification-router`, `critique`, `polish`, `quieter`, `distill` trong đợt này |
| RETIRE phần dư nếu gặp trong seam sửa | Chỉ dẫn intake khóa cứng, câu trùng, yêu cầu gọi skill thủ công hoặc mở lại plan đã chốt | Loại bỏ ở canonical source và rebuild mirrors; không xóa lịch sử/tài liệu người dùng |
| UPDATE | Toàn bộ host đã được cài | Cùng nhận candidate cuối; giữ profile, cấu hình cá nhân và ownership |
| CREATE | Chỉ test hồi quy cần thiết nếu sửa seam code/projection | Dùng suite có sẵn; không tạo benchmark, prompt corpus hoặc hệ thống đo trigger |

**Không thêm skill mới và không xóa skill active chỉ vì ít được dùng.** Đợt này sửa việc tiếp cận và sử dụng các skills hiện có.

### Ràng buộc tuyệt đối

- Không sửa `profiles/5fedu/`, `5fedu-project`, `5fedu-module-parity`; giữ nguyên cả source và lựa chọn profile đã cài. Không dùng `--clear-profiles`.
- Không sửa/trim/patch `skills/*` thuộc upstream, kể cả frontmatter description. Không cập nhật pin, viết alias hay custom wrapper để lách yêu cầu này.
- Không hồi sinh `plan-and-handoff`, `task-decomposer`, custom `slides`, `researcher`, `schema-migration`, `security-review` hoặc các authority đã retire.
- Không thêm triết lý phát triển mới. Củng cố chỉ dẫn đã có bằng ngôn ngữ ngắn, trực tiếp, phổ quát.
- Không thêm dashboard, trigger counter, scoring, quotas, model leaderboard, eval corpus, prompt fixtures mô phỏng người dùng, hoặc file lịch sử quan sát. Không dùng số lượt đọc skill làm KPI.
- Không thêm regex/keyword để suy ý định, LLM router, startup callback, bắt agent chạy `route-native`, hoặc phải gọi skill bằng tên mới làm được việc.
- Không sửa hai repository ứng dụng đã dùng để audit và không nhắn sang conversation khác. Không đưa raw transcript hoặc nội dung riêng tư vào Git.
- Dùng tiến độ native. Không tạo bản plan thứ hai, ticket, ledger, PASS certificate hay evidence packet.
- Quyền tự chủ vẫn chịu phạm vi người dùng: không tự cấp phép push/deploy ở các task tương lai, mở quyền explicit-only hoặc thay cấu hình MCP/`.env`.
- Trong đợt bàn giao này, thực hiện cập nhật toàn bộ host đã cài và gom thay đổi liên quan vào **một commit mới**, push GitHub theo yêu cầu đã có của người dùng. Không rewrite các commit đã phát hành, không force push, không commit từng task.

## 2. Sự thật hiện tại cần giải quyết

1. `rules/manifest.yaml` chỉ always-load các rules 00/10/20. Rule 30 là `build-diagnostic`, rule 40 là `repo-local`.
2. Rule 30 có `Dynamic Progression`: cho phép nạp thêm skill khi ngữ cảnh/giai đoạn đổi. `renderCanonicalRules()` trong `packages/cli/src/services/native-installer.ts` lọc theo manifest; phần này **không nằm trong core luôn nạp**. Rule 10 đã có Compose → Evidence → Refine nhưng thiếu chỉ dẫn cụ thể cho lựa chọn lại ở các điểm vào khác.
3. Installer còn sinh câu intake “resolve ... once”; AGENTS cũng nói “once for the current turn”. Phải phân biệt giải quyết facts/mentions ban đầu với đánh giá lại nhu cầu skill khi công việc đổi. Không quét toàn bộ catalog sau mỗi tool call.
4. `executing-plans` upstream mô tả inline execution và trong body nhắc plan từ `writing-plans`. Plan đã được chấp nhận từ chat/host khác vẫn là một điểm vào triển khai hợp lệ; không buộc viết lại bằng chính skill đó để nhận việc.
5. Audit hai chat chỉ chứng minh các lượt đọc đã quan sát và một số chặng bỏ sót. Các chat bắt đầu trước khi nhập đủ chuỗi Superpowers; chưa có catalog snapshot từng turn. Không quy toàn bộ nguyên nhân cho Gemini hoặc khẳng định cài lại sẽ tự sửa hành vi.

**Không làm:** đổi manifest để luôn nạp cả rule 30/40. Chuyển/tinh gọn phần chỉ dẫn thực thi cần thiết vào rule 10; giữ global core nhỏ.

## 3. Các skills đáng lưu tâm và điểm vào đúng

Bảng này là hướng dẫn triển khai/kiểm tra cho người nhận plan, **không phải bảng keyword phải chép nguyên vào global rules**. Một chặng chỉ nạp phần cần thiết; dependency thực sự được phép đi cùng nhau.

| Ngữ cảnh công việc | Skills cần xét | Giới hạn để tránh dùng sai |
|---|---|---|
| Bắt đầu một công việc trong phiên | `using-superpowers` | Giữ vai trò discovery của upstream; không dùng nó làm router custom, không nạp toàn bộ catalog |
| Còn lựa chọn thiết kế/yêu cầu chưa chốt | `brainstorming` | Không brainstorm lại concept đã được chốt hoặc bị người dùng cấm thay đổi |
| Yêu cầu nhiều bước nhưng chưa có plan đủ rõ | `writing-plans` | Không bắt mọi sửa nhỏ phải có file plan; không viết lại plan portable đã được chấp nhận |
| Triển khai plan đã chấp nhận, kể cả nhận từ nơi khác | `executing-plans`; hoặc `subagent-driven-development` theo phương thức được phép | Hai cách thực thi là lựa chọn theo công cụ/quyền/ngữ cảnh, không phải bắt buộc chạy cả hai |
| Implement feature/bugfix trực tiếp từ prompt | `test-driven-development` và skills đúng stack | Không cần plan mới để được code; tuân thủ ngoại lệ/ràng buộc người dùng và skill, không tạo test hình thức cho chỉnh sửa docs/format |
| Có bug, test fail hoặc hành vi bất ngờ | `systematic-debugging` | Tìm nguyên nhân trước sửa; test pass cuối không tự chứng minh đã làm TDD |
| Hoàn thiện thay đổi đáng kể/cần review | `requesting-code-review` | Dùng reviewer thật khi được phép và có công cụ; inline phải gọi đúng là self-review |
| Nhận phản hồi review cần xử lý | `receiving-code-review` | Kiểm tra đúng/sai và phạm vi trước sửa; không tự động nhận mọi đề xuất |
| Chuẩn bị tuyên bố xong/fixed/passing | `verification-before-completion`; `verification-router` khi cần chọn loại proof | Không đồng nhất đọc skill/chạy build với đáp ứng yêu cầu thực tế |
| Đã có UI cần đánh giá và sửa chất lượng | `critique`, sau đó `polish` nếu phù hợp; `review-animations` nếu có motion | Không kích hoạt toàn bộ nhóm thiết kế trên mọi UI; không tạo lại concept đã chốt |
| Câu hỏi nghiên cứu/so sánh cần nhiều nguồn | `deep-research` | Không ép research cho câu hỏi đơn giản đủ trả lời từ nguồn hiện có; không coi search call là tự động đã áp skill |
| Diff ảnh hưởng auth/tenant/security boundaries | `differential-review` | Đây là review bảo mật theo diff, không dùng thay mọi loại review |
| Migration/schema/data change thực sự | `database-migrations` và DB skill đúng stack | Không suy cần migration từ một chữ database trong prompt |
| Làm/review deck PPTX | `slide-maker` | Giữ workflow upstream đã chọn; không dùng `critique` UI thay slide critique; không dựng deck chỉ để kiểm trigger đợt này |

`using-git-worktrees`, `finishing-a-development-branch`, các skills chuyên Expo/3D/slides và các nhóm chuyên biệt ít xuất hiện có thể hoàn toàn hợp lý. Kiểm tra sự phù hợp, không yêu cầu mọi skill phải thường xuyên chạy.

### Review focus

- Session cũ giữ catalog trước cập nhật: xử lý ở Tasks 1/5/6; disk readback không chứng minh session đã refresh.
- Plan từ chat/host khác không được nhận hoặc bị viết lại: xử lý ở Task 3; không sửa description vendor để chữa.
- Code trực tiếp bị ép tạo plan hoặc bỏ qua process skills: xử lý ở Tasks 2/3/6; kiểm tra đúng việc đang làm.
- Nạp đúng tên nhưng không áp workflow, hoặc self-review được gọi independent: xử lý ở Tasks 3/6/7; cần output/trace thật.
- Projection mới gây mất profile/user-owned config hoặc sửa vendor: kiểm tra ở Tasks 4/5/7; dùng test/readback và preservation diff, không suy từ exit code.

## 4. Task 1 — Xác minh source → projection → catalog hiện tại

**Read:** `AGENTS.md`, `rules/manifest.yaml`, rules 10/20/30, audit đã có, `registry/skills.yaml`, `platforms/platform-contracts.json`, overlay Antigravity, `native-installer.ts`, `automation/build-runtime.mjs`, `packages/cli/src/runtime/health-coordinator.ts`.

**Deliverable:** Kết luận ngắn trong tiến độ native: lỗi nằm ở chỉ dẫn luôn nạp, projection, session cũ hay chưa đủ bằng chứng. Không tạo báo cáo audit mới.

- [ ] Đọc `git status --short`, HEAD và branch. Giữ thay đổi không thuộc task; file audit hiện đang untracked là tài liệu do người dùng yêu cầu, không xóa nó.
- [ ] Xác nhận danh sách skills active/implicit từ registry và thư mục thật. Baseline là 49 active skills; không hardcode 49 vào production logic hoặc biến count thành chỉ số thành công.
- [ ] Đọc native readback Antigravity và bề mặt instruction/skill thực tế. Phân biệt catalog trên ổ đĩa với catalog session thực sự nhận.
- [ ] Nếu host UI/tool có thể xem catalog phiên hiện tại thì đối chiếu trực tiếp. Nếu không thể, ghi rõ chưa quan sát được; không dựng snapshot giả hoặc receipt mới để lấp thiếu bằng chứng.
- [ ] Với chat cũ còn thấy skill retired, xác minh stale context trước. Reload/phiên mới chỉ theo khả năng host thực sự hỗ trợ và khi không làm mất việc đang chạy; không dừng conversation khác tự ý.
- [ ] Kiểm tra active upstream process skills có implicit exposure và các bundle/references cần thiết được chiếu đúng. `requires` đi cùng khi thực sự cần; không biến toàn bộ `supports` thành dependencies.

**Acceptance:** Chỉ ra được đường source → always-load projection và catalog cài đặt; các giới hạn quan sát session được nói rõ. Không tuyên bố model bỏ qua một skill nếu chưa biết phiên đó có skill.

## 5. Task 2 — Sửa chỉ dẫn chọn skills ở tầng luôn nạp

**Modify:** `rules/10-execution-planning-delegation.md`, phần liên quan của `rules/30-context-skill-mcp.md`; `AGENTS.md` product contract mục 3 nếu cần thống nhất.

**Consumes:** Load policy và discovery contract xác nhận ở Task 1.

**Produces:** Một chỉ dẫn chung, ngắn, có mặt trong core 00/10/20; không tạo API/state mới.

- [ ] Hợp nhất chỉ dẫn vào phần lifecycle đang có của rule 10, thay câu yếu/trùng thay vì thêm một chương triết lý mới.
- [ ] Nội dung phải nói rõ: chọn skill từ mục đích người dùng, trạng thái artifact, công việc sắp làm và bằng chứng cần có; không chỉ từ lĩnh vực/stack hoặc từ khóa xuất hiện.
- [ ] Trước một chặng mới có ý nghĩa — bắt đầu implement, phát hiện lỗi, chuyển nghiên cứu, nhận feedback, review/refine, chuẩn bị kết luận — xét lại tập skills liên quan, nạp bổ sung đúng phần còn thiếu trong cùng session.
- [ ] “Resolve once” áp dụng cho facts/explicit mentions ở intake của turn. Không giới hạn chuyên môn cả turn/session; không yêu cầu discovery lại sau mỗi lệnh hoặc đọc lại skill không đổi chỉ để biểu diễn.
- [ ] Skills được dùng trước hành động mà workflow hướng dẫn. Đọc đủ sections/references phục vụ chặng; không cắt cố định N dòng và mặc định đã áp dụng cả workflow. Giữ progressive disclosure.
- [ ] Cho phép kết hợp skills bổ trợ và dependency thật; tránh hai skill tranh cùng một quyết định. Không hardcode combo 4–5 skills cho mọi tác vụ.
- [ ] Giữ phần kiến trúc registry/dependency/compatibility và governance ở rule 30. Gỡ diễn đạt trùng hoặc sai số lượng gates khi chỉnh phần đó; không mở refactor toàn tài liệu.
- [ ] Không chép toàn bộ bảng ở mục 3 vào global prompt, không thêm danh sách keywords hoặc priority scores theo model.

**Acceptance:** Chỉ đọc global core đã thấy nghĩa “chọn theo chặng và xét lại khi chặng đổi”. Rule 30 không phải nguồn duy nhất cho hành vi này; AGENTS không còn câu có thể hiểu là khóa skills. Ngân sách rules theo audit hiện có vẫn đạt, không tăng trần để hợp thức hóa nội dung dài.

## 6. Task 3 — Làm rõ triển khai từ plan portable và prompt trực tiếp

**Modify:** Phần execution trong rule 10; overlay Antigravity chỉ khi có chỉ dẫn mâu thuẫn. **Preserve:** vendor `executing-plans`, `writing-plans`, `subagent-driven-development` và mọi description của chúng.

- [ ] Quy định plan đã được người dùng chấp nhận là đầu vào hợp lệ, không phụ thuộc chat/host/model hoặc tên skill đã tạo nó. Nhận đủ phạm vi, ràng buộc và acceptance rồi triển khai; chỉ làm rõ thiếu sót material, không viết lại để đạt “đúng xuất xứ”.
- [ ] Người dùng giao plan triển khai inline thì chọn `executing-plans`; không biến việc host có subagent tool thành lý do bắt buộc delegation hoặc bỏ qua skill này.
- [ ] Người dùng yêu cầu code trực tiếp, task đủ rõ thì thực hiện ngay với process/domain skills phù hợp. Chỉ cần planning khi độ phức tạp/điểm chưa chốt thực sự đòi hỏi; không áp `executing-plans` cho mọi edit không có plan.
- [ ] Giữ nguyên quyền tự chủ đã có, native progress, không shadow ledger và không yêu cầu execute pivot/“continue” giả tạo.
- [ ] `requesting-code-review` không được biến thành bằng chứng reviewer độc lập nếu session tự xem diff. `receiving-code-review` dùng khi có feedback thật; không tạo reviewer hoặc feedback giả để kích hoạt.
- [ ] Giữ các policy chung trong rules; overlay chỉ ánh xạ host/tool. Không thêm model-specific policy cho Gemini/Opus/Astra và không tự chọn model thay người dùng.

**Acceptance:** Các điểm vào “implement plan từ nơi khác” và “code trực tiếp theo prompt” đều được xử lý rõ mà không hồi sinh custom planning hoặc sửa vendor. Quyền delegation/commit/push vẫn theo người dùng.

## 7. Task 4 — Sửa projection seam nếu cần và kiểm tra nhỏ nhất

**Read/Modify khi cần:** `packages/cli/src/services/native-installer.ts`, `automation/build-runtime.mjs`, `packages/cli/test/host-adapters-contract.test.ts`, `packages/cli/test/install.test.ts`, `automation/test-global-behavior.mjs`.

- [ ] Đối chiếu câu intake do installer sinh với rule đã sửa. Nếu trùng/thể hiện giới hạn “once” sai, bỏ phần trùng hoặc thống nhất câu này; giữ instruction projection self-contained.
- [ ] Không đưa rule 30/40 toàn bộ vào always-load để chữa nhanh; không sửa native-turn-router cho prompt semantics. Nó tiếp tục chỉ phục vụ build/diagnostic như contract hiện tại.
- [ ] Chỉ sửa compiler/catalog nếu Task 1 chứng minh lỗi exposure. Metadata registry chưa được native host dùng không tự làm trigger tốt hơn; không thêm `signals`/`routing_hints` hàng loạt rồi báo đã sửa.
- [ ] Nếu thay projection code, mở rộng test hiện có ở seam đó: installed core nhận canonical execution rule; scoped rules không bị nâng thành always-load; upstream skill body/description giữ nguyên qua projection; profile selection và user-owned instructions không bị mất khi update. Dùng fixtures/seams đã có, không tạo fake live host.
- [ ] Nếu chỉ sửa Markdown và code path hiện tại đã chiếu đúng, dùng checks/audit/projection tests sẵn có. Không thêm tests chỉ đếm từ/câu rồi gọi đó là semantic activation proof.

**Lệnh kiểm tra từ repo root, chọn theo seam đã sửa:**

```powershell
npm run check
npm run skills:audit
npm test -w packages/cli -- test/host-adapters-contract.test.ts
# Chạy thêm install.test.ts nếu thay update/profile/ownership seam:
npm test -w packages/cli -- test/install.test.ts
```

Build trước các test nếu contract hiện tại cần runtime-assets mới. Không chạy lại suite rộng sau mỗi đoạn Markdown.

**Acceptance:** Source và bề mặt cài thử nhất quán; vendor invariant được giữ. Test projection chứng minh projection, **không** chứng minh model tự lựa chọn đúng.

## 8. Task 5 — Build, cập nhật đầy đủ host và đọc lại candidate cuối

**Scope:** 9 host canonical: `antigravity`, `codex`, `claude`, `cursor`, `opencode`, `omp`, `grok`, `command-code`, `deepseek-harness`. Chỉ cập nhật host đã cài; không cài ứng dụng bên thứ ba đang thiếu.

- [ ] Build từ source canonical và chạy release gate rộng **một lần** cho candidate tích hợp:

```powershell
npm run verify:all
```

- [ ] Sau gate, dùng CLI build mới để xem và cập nhật toàn bộ host đã cài, không dùng CLI global cũ không rõ assets:

```powershell
node packages/cli/dist/index.js --json status
node packages/cli/dist/index.js --json update --all --no-integrations --dry-run
node packages/cli/dist/index.js --json update --all --no-integrations
node packages/cli/dist/index.js --json doctor --all
```

- [ ] Omit `--profile` để giữ selection hiện có. `--no-integrations` giữ đợt sửa này tập trung rules/skills, không đổi MCP registrations.
- [ ] Kiểm tra từng host: instruction source/candidate, `canonical_library_valid`, `global_base_valid`, missing/stale owned IDs, profile selection, vendor readback. Không dùng một host khỏe đại diện cả chín.
- [ ] Cài lại ở nghĩa reconcile projection sạch theo ownership; không blanket uninstall và không xóa thư mục host/user. Collision không thuộc Agent Rules phải giữ nguyên và báo component/action.
- [ ] Missing optional MCP, signed-out model surface và host chưa cài được báo đúng trạng thái/thành phần. Không đổi health logic chỉ để doctor tổng xanh; static rules/skills khỏe không chứng minh model-turn behavior.
- [ ] Nếu host cần reload để nhận catalog, nói đúng thao tác thật của host. Không tuyên bố update đã refresh mọi chat đang mở khi không có evidence.

**Acceptance:** Mọi host đã cài nhận candidate cuối và không còn stale owned projection thuộc đợt này. Host thiếu/không quan sát được được ghi riêng với giới hạn cụ thể, không fake PASS chín host.

## 9. Task 6 — Quan sát thực tế vừa đủ, không dựng hệ đo trigger

Chính công việc triển khai plan này là một tác vụ thật để quan sát execution và completion. Các tình huống UI/research chỉ được quan sát khi có việc thật tương ứng, không tạo app/deck/demo/câu hỏi giả nhằm đạt điểm nghiệm thu.

- [ ] Khi bắt đầu triển khai, native discovery đọc được skill thực thi tương ứng mà không yêu cầu chủ sở hữu nhắc tên từng skill. Ghi nhận liệu việc đọc xuất phát từ header bàn giao này hay được lựa chọn tự nhiên; hai loại bằng chứng khác nhau.
- [ ] Trong implementation thật, dùng tool trace có sẵn và kết quả task để đối chiếu: đã đọc skill cần thiết trước hành động, và đã thực hiện hướng dẫn liên quan hay chỉ nêu tên.
- [ ] Nếu phát sinh lỗi/feedback/chuyển miền trong công việc thật, xét lại skills theo rule mới. Không chủ động gây lỗi, tạo feedback hoặc dispatch reviewer chỉ để có trace.
- [ ] Trước kết luận, proof đúng raw prompt phải có, kể cả yêu cầu phủ định: không sửa vendor, không thay 5fedu, không hệ đo trigger, không mở routing runtime và không skill retired trở lại.
- [ ] Nếu chưa có công việc UI/research thật sau cập nhật, ghi “chưa quan sát sau thay đổi”; không yêu cầu người dùng chạy một bộ benchmark, không chặn phát hành source/projection chỉ vì chưa có các tình huống đó.
- [ ] Nếu prompt tự nhiên ở catalog mới vẫn bỏ qua skill cần thiết: xử lý đúng một nguyên nhân cụ thể trong phạm vi đợt này, recheck seam/hành vi bị ảnh hưởng. Không quay lại audit toàn hệ thống, không thay upstream bằng custom, không review loop và không chấp nhận report “đã sửa 100%” chỉ vì thêm câu rule.

**Acceptance phân lớp:** Source/projection/host installation có thể nghiệm thu bằng build/readback. Automatic selection có kết luận riêng theo những chặng thực sự quan sát. Không hứa các model sẽ tuân thủ đồng đều hoặc mọi prompt đều trigger đúng.

## 10. Task 7 — Bảo toàn, phát hành và báo cáo rõ sau thay đổi

- [ ] Đối chiếu toàn bộ diff trước stage. So với HEAD nhận việc, upstream bundles không có content diff và vùng 5fedu không đổi. Kiểm tra thêm 5fedu so với baseline bảo toàn cũ `bb1120a53cac5a399e811cae79e32f733c1e4e61` nếu baseline đó còn hợp lệ; tree `profiles/5fedu` đã biết là `b900fc50821da2847e237ba85b36fb518ae35ad2`.
- [ ] Chỉ stage canonical changes, generated outputs đúng quy ước tracked hiện có và tài liệu bàn giao/audit liên quan. Không stage native homes, raw conversations, secrets hoặc artifacts thử nghiệm. Giữ nguyên thay đổi ngoài phạm vi.
- [ ] Gom đúng một commit mới cho đợt này, ví dụ `fix(skills): clarify native activation across task stages`. Push nhánh được phép theo trạng thái repo hiện có; không force push hay squash các commit lịch sử.
- [ ] Xác minh remote HEAD chứa commit. Nếu fingerprint của lifecycle hiện có đổi sau commit, reconcile candidate cuối và đọc lại host bằng cơ chế hiện hữu; không sửa fingerprint để ép bằng nhau và không tạo commit thứ hai chỉ ghi receipt.
- [ ] Báo kết quả trong chat/native artifact đã có; không bắt tạo thêm một report file để đạt PASS. Không chạy lại suite rộng khi chỉ thêm commit metadata hoặc readback; có material code changes sau gate thì chạy lại kiểm chứng phù hợp.

### Mẫu báo cáo bắt buộc cho người dùng

**A. Thêm / sửa / xóa / giữ:** Bảng file/thành phần → trước → sau → bằng chứng. Nói rõ không nhập skill mới, không xóa skill active trong đợt này; nếu thực tế khác phải nêu lý do và phạm vi được phép.

**B. Cách hoạt động sau thay đổi:** Prompt code trực tiếp; nhận plan portable; chuyển sang debug/review/research; chuẩn bị completion. Nêu những behavior nào đã thấy thật, những cái nào mới được chỉ dẫn hỗ trợ.

**C. Cài host:** Một hàng mỗi host, candidate/readback/profile preservation/missing-stale IDs và giới hạn. Không đưa “9/9 PASS” nếu có host chưa quan sát hoặc chỉ có static proof.

**D. Kiểm chứng:** Các lệnh thực sự đã chạy và kết quả; vendor/5fedu negative proof; self-review hay independent review đúng bản chất.

**E. Phát hành:** Commit SHA, branch, remote verification, working tree còn gì nếu có.

**F. Còn chưa biết:** Chỉ các giới hạn có thật, đặc biệt tự kích hoạt trong session cũ và chặng chưa có việc thật. Không biến chúng thành dashboard, benchmark hoặc một kế hoạch mới mặc định.

## 11. Điều kiện kết thúc và tránh review loop

Hoàn tất đợt triển khai khi các thay đổi canonical trong phạm vi đã xong; vendor và vùng bảo toàn nguyên vẹn; checks cần thiết đạt; host đã cài được reconcile/readback; một commit mới đã push; báo cáo phân biệt static proof với hành vi quan sát.

Không mở vòng review mới vì skill chuyên biệt ít dùng, formatting không ảnh hưởng contract, số lượng lượt invocation hoặc chưa có task thật của mọi lĩnh vực. Chỉ sửa tiếp khi có lỗi ảnh hưởng trực tiếp phạm vi/acceptance của plan này. Giới hạn model còn chưa chứng minh phải báo trung thực, không che bằng tuyên bố đã tối ưu semantic hoàn toàn.
