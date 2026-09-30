# Bàn giao bổ sung: hoàn thiện workflow và tinh gọn agent-rules

Ngày: 2026-09-30. Repository: `P:\agent-rules`.

## 1. Phạm vi và quyền thực hiện

Đây là kế hoạch tiếp nối, thay thế những yêu cầu mâu thuẫn của `ANTIGRAVITY-HANDOFF-2026-09-30.md`, không chạy lại plan cũ. Chủ sở hữu đã yêu cầu kiểm tra kết quả Antigravity, lập plan mới chứa cả các bổ sung đã bàn, rồi hoàn thiện, cài lại full host, gom một commit và push GitHub. Bản này được lập sau review; chưa triển khai các thay đổi bên dưới.

Kết quả cần đạt: hệ thống dùng chung cho nhiều người, nhiều ngành, nhiều host; skills tự được chọn theo ngữ cảnh; workflow PPTX tạo sản phẩm chuyên nghiệp, chỉnh sửa được; cấu trúc và vận hành gọn, trung thực về giới hạn. Không lấy ví dụ nội bộ làm chuẩn sản phẩm, không xây dự án benchmark chất lượng agent.

Agent được giao plan này thực hiện liên tục đến nghiệm thu và phát hành trong phạm vi đã chốt. Dùng tiến độ native; không thêm task ledger, bộ chứng nhận PASS hay worker tiers. Subagents mặc định bằng không. Không cần xin lại quyền kiểm chứng, cập nhật các host đã có, commit và push đã được chủ sở hữu cho phép. Chỉ hỏi khi thật sự cần quyết định mới về public contract, thay đổi kiến trúc lớn, dữ liệu người dùng hoặc quyền chưa được cấp.

PRESERVE tuyệt đối `profiles/5fedu/`, `5fedu-project`, `5fedu-module-parity`; giữ lựa chọn profile đang cài, không `--clear-profiles`. Không sửa `.env`, credentials, MCP cá nhân, file không thuộc agent-rules; không cài ứng dụng host bên thứ ba chưa có. Không sửa tay `generated/`, runtime-assets hay host mirrors; dùng build và CLI canonical. Không sửa nội dung/description upstream, không ngụy trang fork thành vendor nguyên bản.

Baseline tại review: `main`, HEAD `bb1120a53cac5a399e811cae79e32f733c1e4e61`; origin `https://github.com/initforge/agent-rules.git`. Thay đổi Antigravity còn uncommitted. Khi nhận plan phải đọc lại git status/diff để tránh ghi đè thay đổi đến sau, không reset/clean hoặc tái import cả bộ. Không amend/rebase/force-push lịch sử đã chia sẻ để đạt yêu cầu một commit.

## 2. Kết quả review và giới hạn bằng chứng

Nguồn báo cáo được kiểm tra: `C:\Users\ADMIN\.gemini\antigravity\brain\50341142-4ee9-49bb-8f37-d4114487ca44\ANTIGRAVITY-HANDOFF-COMPLETION-REPORT.md`.

Những phần có thể giữ:

- Vùng 5fedu không có diff so với baseline tại review; HEAD chưa đổi.
- Researcher/schema-migration/security-review cũ đã bị retire; deep-research/database-migrations và các skills Superpowers mới đã có trong source và runtime-assets.
- Đối chiếu trực tiếp SKILL.md của sáu skills mới với raw GitHub tại đúng commit registry: nội dung khớp sau chuẩn hóa CRLF. Đây chưa phải kiểm chứng toàn bộ thư mục, license hay khả năng phối hợp.
- Các sửa docs-style, bỏ tham chiếu context.mjs trong polish và sửa khuyến nghị motion trong critique có ích; không hoàn tác chỉ vì thay hướng kế hoạch.
- `npm run check` qua. Chạy đúng cwd `packages/kernel`, `node ../../node_modules/vitest/vitest.mjs run test/skill-contract-and-routing.test.ts test/native-turn-router.test.ts`: 26 tests qua. Lần gọi đầu từ root không tìm thấy tests, không phải lỗi sản phẩm. `git diff --check` qua, có cảnh báo CRLF.
- Readback `doctor --all --json`: rules, skills, installer và host-adapter được báo HEALTHY trên cả chín host. Điều này xác nhận phần cài đặt tương ứng, không xác nhận agent dùng skills tốt.

Khoảng trống đã thấy trực tiếp:

1. **Dependency chưa khép kín:** `skills/brainstorming/SKILL.md:49,185,265` bắt buộc chuyển sang writing-plans, trong khi writing-plans không được cài. Nó còn yêu cầu nhiều vòng duyệt và commit spec. Không thể gọi bộ này là hoàn toàn tương thích chỉ vì bảy skill bị loại không tồn tại trong thư mục.
2. **Planning cũ chưa giải quyết:** plan-and-handoff vẫn cho phép/mời ghi `.agent/current`, trái yêu cầu dùng tiến độ native và không shadow ledger. Giữ nguyên là phương án tạm, không phải hoàn tất nâng cấp.
3. **Routing còn heuristic:** `routing.ts::inferCapabilities` vẫn regex nhận diện SQL, email, phủ định. Repository có schema có thể tự đưa database.query vào trước nhánh phủ định. requestedCapabilities mới chỉ có ở broker; NativeTurnRequest/routeNativeTurn chưa truyền vào. Những test đang qua không chứng minh semantic routing toàn diện.
4. **PPTX chưa thay workflow:** `skills/slides` và rules không có diff. slides hiện được registry ghi là upstream openai/skills, không được sửa tay như skill nội bộ. Bốn slide dựng riêng trong scratch không chứng minh nâng cấp workflow hoặc đa host.
5. **Bằng chứng PPTX không đạt như báo cáo:** ảnh `scratch/pptx-eval/rendered_rebuilt/slide_1.png` và slide_3 bị cắt nội dung ở mép phải/dưới. XML presentation có khổ 10 x 5.625 inch, trong khi script đặt nhiều phần tử ngoài khổ đó, ví dụ header x=0.8,w=11.5. Đây là lỗi kích thước thật, không phải chỉ nhận xét thẩm mỹ. Script dòng 352 ghi throughput 14,200 req/s, context switch 1.8µs là số đo; chưa có nguồn đo kèm theo trong bằng chứng đã kiểm tra. Không được tiếp tục dùng làm chứng nhận hoàn thành.
6. **Static audit chưa tinh gọn:** skill-eval chỉ đổi schema kết quả; vẫn buộc corpus positive/negative/non-English. verify-all vẫn gọi nó là skill activation evaluation. Không có bằng chứng runtime activation từ việc đếm fixture.
7. **Custom UI còn mâu thuẫn:** distill vừa nói không bỏ tính năng, vừa hướng dẫn bỏ secondary actions/optional features và ép một mục đích. Cần sửa để bảo toàn nghiệp vụ, không biến mọi UI thành tối giản.
8. **Sức khỏe host cần phân loại:** doctor tổng thể DEGRADED; MCP BROKEN ở codex/claude/opencode, NEEDS_USER ở antigravity/cursor/omp; các bề mặt plan/proof/permissions/sandbox phần lớn DEGRADED, plan của grok UNSUPPORTED. Review chưa quy lỗi các trạng thái này cho đợt Antigravity. Phải đọc nguyên nhân trước khi sửa, không gọi toàn bộ host là PASS hoặc tự đổi nhãn để xanh.

Không chạy lại broad release gate trong bước review này. Báo cáo cũ nói verify:all qua nhưng review hiện tại chỉ xác nhận những lệnh đã nêu. Kiểm chứng release cuối thực hiện sau khi sửa xong.

## 3. Ma trận thay đổi skills

| Nhóm | Hành động và kết quả phải có |
|---|---|
| deep-research, database-migrations | PRESERVE các thay thế có ích; xác minh toàn thư mục, license tại đúng pin, metadata và dependencies thực. Không nhập lại nếu đã đúng. |
| differential-review | PRESERVE cho security review của diff. Không tuyên bố nó thay mọi loại kiểm tra bảo mật. Giữ nhận diện ranh giới auth/secret/data trong rules và chọn kiểm tra phù hợp khi không có diff; không ép một security skill mới cho mọi tác vụ. |
| brainstorming | REPLACE bản đang active bằng upstream tương thích thật nếu có pin phù hợp được kiểm tra. Nếu không, RETIRE bản không tương thích khỏi discovery; chuyển phần làm rõ mục đích cần thiết vào plan-and-handoff nội bộ đã nâng cấp. Không thêm writing-plans hoặc bảy skill đã loại để cứu dependency, không sửa vendor, không chuyển explicit-only để né vấn đề. |
| plan-and-handoff | MODIFY làm authority planning duy nhất trong phạm vi hiện tại: dùng mục tiêu/ràng buộc/việc còn lại và tiến độ native, kế hoạch tùy độ phức tạp, bàn giao đủ ngữ cảnh, bỏ shadow state và lễ nghi lặp. Giữ khả năng viết portable plan khi người dùng yêu cầu. |
| test-driven-development, verification-before-completion, receiving-code-review, systematic-debugging | PRESERVE nếu tương thích sau khi xem toàn bộ yêu cầu bắt buộc. Giữ kiểm thử có ích, bằng chứng thật, phản biện review; không để quy trình chung ép tests cho sửa nhỏ không đáng hoặc ngăn các phần độc lập tiếp tục. Xung đột cứng không giải quyết bằng âm thầm patch upstream; chọn pin khác hoặc retire riêng phần không hợp. |
| docs-style, verification-router | MODIFY phần còn thiếu; docs theo người đọc và nội dung thực, proof-router chỉ chọn bằng chứng theo claim/risk, không quản lý model/handoff hoặc sinh chứng nhận chất lượng. |
| quieter, distill, critique, polish | MODIFY phần mâu thuẫn/phụ thuộc hỏng; giữ provenance derived. Bảo toàn tính năng, hành động phụ cần thiết, mật độ phù hợp, nhận diện và accessibility. Không ép tối giản, một layout hay style Apple vào mọi sản phẩm. Không dùng nhóm này làm reviewer slide mặc định. |
| context-evolution-protocol, skill-source-governance | MIGRATE trách nhiệm maintainer sang hướng dẫn bảo trì và các kiểm tra cơ học đã có; RETIRE hai skills sau khi chuyển consumer. Giữ generic khả năng task projection đang có, không xóa cả cơ chế chỉ vì tests dùng tên hai skills làm fixture. Phân biệt fixture với phụ thuộc sản phẩm. |
| slides | REPLACE workflow thiếu thiết kế bằng một authority PPTX duy nhất đáp ứng mục 5; migration rõ ràng từ ID cũ, không mount hai skills tranh cùng vai trò. Vendor cũ giữ nguyên nếu còn dùng làm thư viện kỹ thuật; nội dung vendor không được biến thành bản fork không khai báo. |

Không nhập bảy skills: using-git-worktrees, finishing-a-development-branch, dispatching-parallel-agents, subagent-driven-development, writing-skills, diagnosing-superpowers, using-superpowers. Kiểm tra cả dependency trong nội dung, không chỉ requires trong YAML. Cho phép nhắc tên trong tài liệu giải thích loại trừ; không biến lệnh grep tên thành một tiêu chí chất lượng giả.

Mặc định mọi skill phục vụ công việc thông thường phải implicit qua mô tả ngữ nghĩa. Không tạo entry point bắt người dùng nhớ gọi tên. Không thay đổi explicit-only của provider/profile người dùng chưa chọn chỉ vì đang cải thiện discovery skills.

## 4. Rules, routing, graph và ranh giới mã nguồn

MODIFY rules thành hướng dẫn ngắn, không trùng skills: hiểu mục đích, bảo toàn phạm vi, chọn năng lực cần thiết, thực hiện, kiểm chứng đúng chỗ và sửa lỗi. Chu trình theo giai đoạn diễn ra trong cùng phiên, không bắt người dùng gửi một tin mới để sang review. Reviewer được cung cấp output sau khi có output; có thể dùng các ràng buộc thiết kế/kiểm tra từ đầu để tránh lỗi.

MODIFY semantic discovery: host hiểu mục tiêu + artifact + giai đoạn + ràng buộc qua native description discovery. Chỉ nạp tập nhỏ đủ dùng; khi ý định đổi, có bằng chứng mới hoặc bước sau cần chuyên môn mới thì bổ sung skill. “Một lần mỗi turn” áp dụng tránh đọc lại inventory vô ích, không khóa bộ kỹ năng suốt công việc. Không hứa trigger 100% trên mọi host.

RETIRE regex prompt đang đóng vai trò quyết định intent trong diagnostic broker. Repository facts dùng xác định môi trường và tính tương thích, không cấp quyền gọi database hay công cụ khác chỉ vì dependency tồn tại. Input có cấu trúc phải có đường truyền thực qua boundary đang được hỗ trợ nếu giữ nó; nếu không có consumer thì bỏ field chết. Giữ public compatibility: khi cần mở rộng diagnostic request, ưu tiên field tùy chọn tương thích; không âm thầm đổi public schema. Kiểm thử tại entry point thực, không chỉ gọi helper. Không thêm router LLM, ontology, scoring, hook runtime hoặc wrapper điều phối mới.

MODIFY registry/graph chỉ giữ nguồn, pin, license, lifecycle, compatibility, requires/conflicts và thông tin có consumer rõ ràng. Kiểm tra consumer trước khi gộp các bản lặp requires/routing/provenance hoặc bỏ signals/excludes. Graph là đầu ra kỹ thuật sinh từ canonical source, không phải semantic brain. Không tự kích hoạt supports hoặc profile theo keyword. Các xung đột authority cần xử lý ở projection/discovery thực, không chỉ metadata trong graph mà host không đọc.

MODIFY tổ chức code theo trách nhiệm, không chạy refactor toàn kho:

- Catalog/registry sở hữu provenance, lifecycle và dependency.
- Projection/compiler tạo rules, skills và profile projection.
- Installer sở hữu transaction, ownership, update, rollback và cleanup.
- Host adapter sở hữu khác biệt đường dẫn/capability của host, không chứa policy nghiệp vụ trùng kernel.
- Diagnostics quan sát, phân loại và chỉ dẫn sửa; CLI điều phối, không chôn policy trong formatter/command.
- Proof selection và kiểu dữ liệu liên quan có một nơi sở hữu rõ ràng. Hiện harness/evidence import northstar/proof-testing; facade northstar/proof-router không đồng nghĩa có logic trùng. Chỉ di chuyển khi xác định phụ thuộc, giữ export tương thích đang có consumer.
- Automation dành cho build/kiểm tra bảo trì, không trở thành runtime bắt buộc của người dùng.

Không tách package chỉ để làm đẹp cây thư mục. Không xóa task-state/public CLI còn dùng khi chưa có chuyển tiếp tương thích. Gộp reducer/validator trùng chỉ khi chứng minh cùng trách nhiệm và không mất trạng thái vận hành.

## 5. Workflow PPTX chung, chuyên nghiệp và đa host

CREATE/REPLACE một workflow end-to-end, từ hiểu nội dung đến thiết kế và xuất file. Có thể dùng upstream nguyên bản nếu thật sự thỏa contract; ứng viên đã nêu trước là `https://github.com/addsumtech/slides_maker`, chưa được chấp nhận mặc định. Kiểm tra pin/license/dependency/công cụ bắt buộc, checkpoint thừa và chi phí quy trình, không mở chiến dịch benchmark. Nếu không có ứng viên tương thích, triển khai owner workflow nội bộ gọn với nguồn thiết kế và thư viện kỹ thuật có provenance rõ; khai báo trung thực là nội bộ, không gọi là upstream. Ưu tiên thay chủ sở hữu hoàn toàn, không chồng một bộ điều phối lên một bộ điều phối khác.

Nguồn kỹ thuật có thể giữ dưới dạng helper/library bất biến, tải khi cần; không để skill cũ tiếp tục cạnh tranh implicit. Không cần đổi engine chỉ để đổi engine. Đừng dùng việc có PptxGenJS hay python-pptx làm bằng chứng đẹp.

Workflow phải cụ thể:

1. **Hiểu brief:** mục đích (thuyết phục, quyết định, báo cáo, giải thích...), người xem, trình chiếu hay tự đọc, nội dung/dữ liệu thật, brand, giới hạn file và mức chỉnh sửa. Suy luận khi đủ rõ; chỉ hỏi thiếu sót ảnh hưởng quyết định. Không checklist dài bắt buộc, không một skill/template cho mỗi ngành.
2. **Tự tìm và nhìn tham chiếu:** khi cần định hướng mới, tự browse mẫu phù hợp và mở xem các slide/layout thực. Canva (`https://www.canva.com/presentations/templates/`) và Slidesgo (`https://slidesgo.com/`) là điểm tìm gợi ý, không whitelist. Bỏ Microsoft khỏi nguồn mặc định. Template người dùng cung cấp được ưu tiên; tài liệu tổ chức chỉ dùng khi công việc thực sự liên quan brand/tổ chức đó. Không tìm web lại nếu reference đã đủ rõ.
3. **Áp dụng tham chiếu:** rút ra grid, phân cấp chữ, palette, khoảng trắng, nhịp trang, crop ảnh, cách biểu diễn dữ liệu và mức mật độ. Link/trang kết quả tìm kiếm không thay việc nhìn thiết kế. Không truy cập được thì dùng mẫu công khai khác và nói giới hạn, không giả vờ đã xem. Không quota số nguồn; thêm tham chiếu chỉ để giải quyết quyết định chưa rõ.
4. **Biên tập câu chuyện:** mỗi slide có thông điệp rõ; chọn bố cục theo quan hệ nội dung. So sánh, quy trình, bảng số liệu, biểu đồ và ảnh lớn được dùng đúng chỗ. Không biến mọi trang thành bullet, các thẻ lồng nhau hoặc cùng một bố cục. Deck báo cáo dày dữ liệu vẫn có thể chuyên nghiệp; không bắt tất cả tối giản.
5. **Tạo hình:** dùng công cụ native thực có ở host để gen ảnh khi ảnh giúp truyền đạt; không hardcode OpenAI hay đoán một lệnh Antigravity không tồn tại. Có thể dùng ảnh có quyền sử dụng, biểu tượng hoặc sơ đồ native khi phù hợp. Tôn trọng template license; công khai xem được không tự có quyền phân phối. Không vẽ chữ/số liệu quan trọng thành ảnh nếu cần chỉnh sửa. Không dùng ảnh gen để giả dữ kiện hoặc số đo.
6. **Dựng PPTX:** slide size và đơn vị thống nhất; style nhất quán nhưng bố cục đủ đa dạng; text/table/chart giữ editable khi phù hợp. Không làm toàn bộ slide thành screenshot để che thiếu khả năng authoring. Deliverable cho người dùng là PPTX; JS/Python/assets dùng nội bộ để sửa/rebuild, chỉ giao thêm khi được yêu cầu. Không đổi sản phẩm cuối thành HTML/PDF.
7. **Render và sửa:** chọn renderer thật có ở môi trường, ví dụ PowerPoint COM trên Windows hoặc backend tương thích khác. Xem overview và các slide thực, kiểm tra clipping/overlap/font/readability, logic câu chuyện, dữ liệu và editability. Không chỉ thấy script exit 0 rồi tuyên bố đẹp. Không nhận render trên Windows làm bằng chứng tất cả host đã được chạy. Nếu không thể render ở host hiện tại, nêu rõ giới hạn và tiếp tục phần làm được; không cài cả ứng dụng host mới để lấp chỗ trống.

Tham chiếu là input của công việc đang làm, không tạo kho template nội bộ theo ngành, database assets có scoring hay graph thiết kế. Không dùng LAB1 làm baseline chung, không dựng lại bộ slide cũ để chấm workflow.

Validation lúc triển khai: một công việc PPTX thực tế nhỏ, brief đủ rõ và khác chuẩn nội bộ cũ, chạy end-to-end với tham chiếu đã xem; kiểm tra file và render thật, sửa đến khi dùng được. Đây là xác minh đường chạy vừa thay, không corpus/benchmark, không yêu cầu lặp nhiều model. Chỉ chạy thử host thứ hai nếu cần xác minh khác biệt adapter đã sửa và host khả dụng; ghi rõ gì thực sự đã chạy.

## 6. Bỏ eval hình thức, giữ bằng chứng thực dụng

RETIRE nghĩa vụ duy trì `evals/skills/activation.json`, positive/hard-negative/non-English fixtures cho mọi skill, bảng điểm/model tiers/repeated benchmark và chương trình `evals/pptx-owners` nếu không có consumer kỹ thuật độc lập cần giữ. Chuyển các kiểm tra cấu trúc có ích sang audit catalog đang có; cập nhật scripts/docs/CI gọi chúng. Không giữ một chương trình cũ chỉ bằng cách đổi tên output thành static audit.

PRESERVE tests của parser, dependency, routing boundary, ownership, collisions, transaction, rollback, packaging và public behavior. Gỡ assertions khóa cứng câu văn/skill names lịch sử khi không bảo vệ yêu cầu còn hiệu lực. Chỉ thêm regression nhỏ cho lỗi thực có ý nghĩa, không sinh bộ dữ liệu chất lượng agent. Không chạy lặp toàn suite sau từng chỉnh markdown; chạy proof nhỏ cho seam đã sửa, rồi release gate một lần khi tích hợp xong (chạy lại nếu có lỗi hoặc thay đổi sau đó làm mất hiệu lực).

Không giữ các sample scratch có số đo không nguồn như evidence sản phẩm. Không xóa tài liệu gốc trong Downloads hoặc báo cáo riêng của người dùng. Các scratch mới do đợt triển khai tạo và không có consumer có thể dọn sau khi xác minh quyền sở hữu; không đưa chúng vào commit phát hành.

## 7. Diagnostics, cài lại full host và phát hành

MODIFY diagnostics để tách đúng: integrity/cài đặt, khả dụng của provider, khả năng quan sát hành vi native. HEALTHY rules không chứng minh autonomy hoặc trigger; thiếu phép đo không chứng minh host hỏng. Missing optional surface là NOT_APPLICABLE khi contract thực sự optional; provider đã cấu hình mà handshake hỏng phải giữ lỗi và chỉ dẫn sửa, không đổi nhãn cho xanh. Login/key cần người dùng là NEEDS_USER, không giả cài đặt rules thất bại.

Đọc nguyên nhân các trạng thái doctor hiện tại trước khi sửa. Chỉ sửa lỗi thuộc agent-rules, không đổi cấu hình MCP cá nhân hay tạo credentials để làm báo cáo đẹp. Phân biệt lỗi mới, lỗi có sẵn và giới hạn host.

Trình tự cuối:

1. Đọc diff tổng hợp, đối chiếu tất cả preserve/negative constraints. Chạy typecheck + tests seam; sau tích hợp chạy `npm run verify:all` với cấu hình kiểm tra đã tinh gọn. Xử lý lỗi thật, không xóa test để ép qua.
2. Build một candidate thống nhất. Inventory các host/profile hiện có; cập nhật/cài lại toàn bộ host agent-rules đang quản lý bằng CLI transactional. Danh sách hiện tại: codex, claude, grok, opencode, antigravity, cursor, deepseek-harness, command-code, omp. Không cài thêm ứng dụng host bên thứ ba.
3. Dọn stale skills/projections và snapshot thừa do agent-rules sở hữu theo cơ chế lifecycle. Giữ rollback hợp lệ của lần cập nhật, không xóa mọi snapshot trước khi readback. Kiểm tra đường dẫn tuyệt đối và ownership trước mọi recursive cleanup; không dọn thư mục rộng của người dùng.
4. Readback từng host: source/candidate phù hợp, active implicit skills đúng, các skill retire đã biến mất, profile/MCP cá nhân được bảo toàn, collisions được báo đúng. Nêu riêng limitations của integrations và native surfaces; không quy chúng thành PASS toàn hệ thống.
5. Kiểm tra staged diff chỉ gồm thay đổi liên quan, không secrets, artifacts thử, absolute paths cá nhân ngoài tài liệu handoff cần thiết hoặc build output không được repo theo dõi. Giữ generated/runtime-assets theo chính sách tracking hiện có và regenerate, không sửa tay.
6. Gom toàn bộ thay đổi liên quan chưa commit của đợt Antigravity và đợt bổ sung vào một commit mô tả trạng thái cuối. Fetch/kiểm tra remote trước push; không force-push. Nếu remote tiến lên thì hòa giải an toàn và kiểm chứng seam ảnh hưởng, không ghi đè công việc khác. Push lên nhánh/remote được xác minh; mặc định nhánh hiện tại nếu không có chỉ dẫn mới. Báo SHA, nhánh, kết quả push.

## 8. Điều kiện hoàn thành

- Một authority rõ cho từng workflow; không dependency bắt buộc trỏ vào skill không cài; không bảy skills bị loại và không ép gọi thủ công để né discovery kém.
- Planning gọn, không shadow ledger; rules cho phép bổ sung chuyên môn khi ngữ cảnh đổi, không bắt tương tác duyệt thừa.
- Routing không dùng keyword làm ý định/quyền; field giữ lại có consumer và kiểm chứng ở boundary thật; graph không giữ duplication vô dụng sau migration consumer.
- PPTX workflow thật đã thay đổi, có lựa chọn/áp dụng tham chiếu trực quan, image tools theo host, file editable và render được kiểm tra. Không lấy bốn slide lỗi làm bằng chứng hoàn thành, không giả dữ liệu đo.
- Không corpus/benchmark riêng hoặc chuẩn nội bộ áp lên mọi người. Các kiểm tra kỹ thuật và output thực vẫn có hiệu lực.
- Ranh giới mã nguồn rõ hơn tại các seam đã sửa, public consumers/operational behavior còn hoạt động; không refactor hình thức.
- 5fedu không đổi; file/cấu hình người dùng được giữ; full host được reconcile và báo trung thực những mặt chưa khả dụng.
- Một commit liên quan đã push thành công, không sửa lịch sử remote. Nếu bị chặn bởi quyền/auth/network, hoàn thành các phần độc lập và báo chính xác bước còn thiếu, không tuyên bố phát hành xong.

Không thể bảo đảm tuyệt đối một model luôn tạo slide đẹp hay luôn trigger đúng. Nghiệm thu phải nói rõ thay đổi đã làm, đường chạy đã kiểm tra và giới hạn còn lại; cải thiện tiếp từ công việc sử dụng thực tế, không từ một bảng điểm tự dựng.
