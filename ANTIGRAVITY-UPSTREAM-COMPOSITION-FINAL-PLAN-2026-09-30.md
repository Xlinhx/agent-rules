# Plan chốt: dùng upstream theo nhóm phụ thuộc, thay và dọn sạch

## 1. Quyết định mới nhất của chủ sở hữu

Thực hiện trên `P:\agent-rules`. Bản này thay thế các yêu cầu mâu thuẫn trong ba plan bàn giao trước. Không khởi động lại những phần đã đúng.

Chủ sở hữu chốt:

> Cho phép kết hợp skills. Skills cần nhau thì đưa theo cùng nhau. Không cố custom lại upstream; chỉ chấp nhận một số thay đổi nhỏ cần thiết để phù hợp pattern agent-rules. Người dùng prompt tự nhiên; agent tự chọn, đọc, sử dụng và chuyển qua các skills phù hợp.

Vì vậy, bỏ việc loại một workflow chỉ vì nó tham chiếu skill khác. Danh sách bảy skills Superpowers từng loại không còn là lệnh cấm tuyệt đối đối với dependency thực sự cần cho chuỗi được chọn. Đây không phải yêu cầu nhập mọi skill upstream: chỉ đưa những thành phần phục vụ chức năng đã chọn và các phụ thuộc bắt buộc/nhánh thực thi được hỗ trợ. Các ví dụ, gợi ý tùy chọn, test upstream và tài liệu nhắc tên không tự trở thành dependency runtime.

Kết hợp skills không đồng nghĩa nạp toàn bộ vào mỗi turn; cài đủ, khám phá tự nhiên, đọc sâu khi giai đoạn cần. Không bắt người dùng nhớ tên skill, slash command hoặc câu kích hoạt đặc biệt.

Không mở thêm vòng tìm bộ planning thay Superpowers. Đích là dùng chuỗi Superpowers và slide-maker hiện đã chọn, hoàn chỉnh tích hợp và dọn đường cũ. Không chuyển ngược về custom chỉ vì integration khó.

## 2. Baseline và phạm vi bảo toàn

Baseline đã đọc: commit `5d5a5fd9c716c99b36c70d9e301600342eb3a56e`, working tree sạch trước khi tạo plan này. Đọc lại HEAD/status khi nhận để bảo vệ công việc đến sau. Không reset/clean toàn kho. Các release cũ đã push; cuối đợt tạo một commit mới liên quan, không amend/rebase/force-push lịch sử đã chia sẻ.

Giữ tuyệt đối `profiles/5fedu/`, `5fedu-project`, `5fedu-module-parity`, profile đã chọn, dữ liệu và MCP cá nhân. Không sửa `.env` hay tạo credentials. Chỉ update các host agent-rules đã quản lý, không cài ứng dụng host bên thứ ba chưa có. Không tự thay model, không dựng tầng agent cao/thấp. Việc cài skill delegation không đồng nghĩa giao mọi việc cho subagents; áp dụng theo workflow, công cụ và quyền hiện có của host. Không tạo agent mới chỉ để lập hoặc thực hiện plan này nếu không có chỉ dẫn áp dụng cho phép.

Nguồn canonical nằm ở rules/skills/registry và source packages. Generated/runtime-assets/host mirrors phải sinh qua pipeline và CLI, không chỉnh tay. Tôn trọng ownership, collisions và rollback.

## 3. Danh sách thêm, thay, giữ và xóa

| Nhóm | Quyết định | Kết quả phải có |
|---|---|---|
| brainstorming | RESTORE từ Superpowers cùng dependency cần thiết | Khám phá yêu cầu khi cần; không đứng một mình rồi gọi writing-plans không tồn tại |
| writing-plans | ADD từ Superpowers | Lập kế hoạch có thể thực hiện; nối được tới đường thực thi đã hỗ trợ |
| executing-plans | ADD từ Superpowers | Thực hiện kế hoạch đến kiểm chứng, không mất ngữ cảnh/consumer |
| requesting-code-review | ADD từ Superpowers | Đường yêu cầu reviewer hoạt động trên host hỗ trợ; phân biệt fallback được upstream cho phép với giả lập đã có reviewer độc lập |
| receiving-code-review, TDD, verification-before-completion, systematic-debugging | PRESERVE/ALIGN | Chọn các pin tương thích với chuỗi vừa nhập; không cập nhật vô cớ hoặc bỏ kỹ năng hữu ích |
| Phụ thuộc Superpowers | ADD khi chuỗi thực sự cần | Bao gồm using-superpowers, using-git-worktrees, finishing-a-development-branch, subagent-driven-development hoặc thành phần khác nếu source đã chọn yêu cầu. Ghi lý do/consumer từng mục; không mặc định cấm vì danh sách cũ |
| task-decomposer | REPLACE rồi RETIRE | Chuyển authority planning sang chuỗi Superpowers; dọn ID active, routing, host copies và consumers. Không giữ làm planner thứ hai |
| plan-and-handoff custom | KEEP RETIRED | Không phục hồi, không sao chép nội dung sang rules để giữ một planner custom ẩn |
| slide-maker | PRESERVE + INTEGRATE | Dùng workflow và tài nguyên upstream đầy đủ; giải quyết host tools, checkpoint, review và deliverable theo mục 5 |
| slides custom | KEEP RETIRED | Không phục hồi và không viết lại workflow 7 bước cạnh tranh slide-maker |
| deep-research / database-migrations / differential-review | PRESERVE | Giữ các thay thế đúng. Sources lần lượt arjunprabhulal/agent-skills, affaan-m/ECC, trailofbits/skills; không đổi nguồn trong báo cáo |
| docs-style | MODIFY nhỏ | Giữ source-grounding và Diátaxis; mục lục README là lựa chọn theo nhu cầu, không skeleton bắt buộc mọi dự án |
| verification-router | REDUCE | Chỉ chọn bằng chứng theo claim/risk/change; chuyển provider routing về integration/host layer, completion discipline về rules và verification-before-completion |
| quieter/distill/critique/polish | PRESERVE vai trò có ích | Giữ provenance derived; chỉ sửa mâu thuẫn bảo toàn nghiệp vụ hoặc scope thật. Không thay cả nhóm nếu không có lý do |
| context-evolution-protocol / skill-source-governance và các customs đã thay | KEEP RETIRED | Trách nhiệm bảo trì cơ học ở CLI/docs maintainer; không còn active projection |
| Các skills React/Expo/Prisma/browser/design/3D khác | PRESERVE | Không lôi vào đợt thay thế mới; chỉ sửa conflict trực tiếp nếu phát hiện trong tích hợp |

Khả năng điều phối việc độc lập, quản lý worktree và hoàn thiện nhánh được cài khi có consumer upstream; không tự cấp quyền commit/push/merge/deploy ở các công việc tương lai. Quyền phát hành của đợt này đã được chủ sở hữu cho phép, khác với quyền chung của mọi prompt.

## 4. Cách tích hợp upstream, không biến thành custom mới

Đọc toàn bộ yêu cầu bắt buộc của skills được chọn và supporting files trước khi import. Phân biệt: dependency bắt buộc, dependency của nhánh tùy chọn, reference/tool/script, và mention minh họa. Chọn một revision Superpowers nhất quán cho chuỗi mới nếu phù hợp; kiểm tra các skills cũ pin khác có cần đồng bộ để tương thích không. Không lấy latest tự động mà không đọc thay đổi.

Giữ bản vendor nguyên bản, pin commit, license và hash. Ưu tiên cấu hình/extension points chính thức và adapter host. Quyết định mới cho phép các chỉnh nhỏ để chuẩn pattern, nhưng không cho phép âm thầm làm giả hash/provenance.

Nếu phải có patch nhỏ trong projection: lưu patch khai báo minh bạch, nguồn/pin gốc và hash hiệu lực riêng, áp dụng xác định qua build, kiểm tra patch chỉ áp dụng đúng phiên bản. Tận dụng cơ chế có sẵn; không dựng framework patch mới cồng kềnh. Không sửa tay vendor hoặc host mirrors rồi gọi nguyên bản. Cập nhật policy và audit đang nói bất biến tuyệt đối để phản ánh ngoại lệ hẹp này, không mở quyền sửa tùy ý.

Được coi là adaptation nhỏ: tên công cụ native, đường dẫn resources, prefix gọi skill, định dạng metadata/frontmatter host, mapping trạng thái sang native progress và ranh giới quyền người dùng đã chốt. Phải có bảng giải thích cho từng adaptation.

Không phải adaptation nhỏ: viết lại thuật toán planning, xóa phần review để import cho qua, thay toàn bộ workflow bằng hướng dẫn tự chế, thêm keyword router, bịa model tiers hoặc bỏ checks quan trọng. Khi cần thay đổi sâu, tìm cấu hình/phiên bản upstream phù hợp trong cùng nguồn trước; nếu vẫn không có thì báo đúng xung đột, không giả hoàn thành. Blocker chỉ chặn phần phụ thuộc, không bỏ các việc độc lập.

Tôn trọng thứ tự chỉ dẫn: yêu cầu và quyền đã có của người dùng cao hơn mặc định upstream. Không hỏi lại điều đã rõ hoặc đã được giao chỉ vì một checklist generic. Tuy nhiên không được bỏ tất cả checkpoints rồi nhận rằng đã tuân nguyên bản; ghi rõ preference/adapter áp dụng và giữ những bước thực sự cần thông tin hay quyền.

## 5. Hai đường sử dụng chính

### Công việc phát triển

Prompt tự nhiên → hiểu yêu cầu/brainstorming nếu còn quyết định → writing-plans khi độ phức tạp cần → executing-plans hoặc nhánh upstream phù hợp → debugging/TDD theo tình huống → requesting/receiving review → verification → hoàn thiện nhánh trong quyền cho phép.

Đây là quan hệ chức năng, không pipeline bắt mọi việc đi qua mọi skill. Một sửa nhỏ không phải làm lại thiết kế từ đầu. Khi chuyển bước, agent tự nạp skill cần; không dừng để người dùng gọi tên. Nếu một nhánh cần công cụ không có, dùng fallback upstream hỗ trợ và nói rõ phạm vi; không tuyên bố có independent review khi chỉ self-review. Không đổi model âm thầm.

Tích hợp continuity vào native progress theo host. Dọn mâu thuẫn `.agent/current` hiện còn trong `rules/40-maintainer.md`. Nếu upstream cần dữ liệu máy đọc cho cơ chế riêng, phân biệt dữ liệu thực sự được script tiêu thụ với shadow plan trùng; chỉ giữ cái có consumer và vòng đời rõ. Không hứa bỏ ledger rồi để nguyên một nguồn state cạnh tranh.

### PowerPoint

Prompt tự nhiên → slide-maker tự hiểu brief → xem tham chiếu thật khi cần → thiết kế/nội dung → hình ảnh theo công cụ thực có → dựng PPTX → render/critic → sửa và giao file.

Giữ slide-maker và các agents/reference/scripts của nó thay vì coi chúng là lý do loại cả skill. Dùng lựa chọn tự động của upstream cho yêu cầu giao trọn kết quả; chủ sở hữu đã chọn mặc định tự chủ, không cần mỗi deck gõ câu kích hoạt đặc biệt. Adapter/preference phải thể hiện lựa chọn này rõ, giữ thông tin checkpoint cần cho công cụ kiểm tra mà không ép người dùng duyệt từng bước đã giao. Nếu pin hiện tại không biểu đạt được preference này bằng adaptation nhỏ, xác định phần xung đột cụ thể thay vì lén xóa quy trình.

Chỉ hỏi khi thiếu nội dung/brand quyết định, dữ liệu không thể suy ra hoặc quyền chưa có. Không bắt chọn lại những điều đã nêu. Reviewer/content planner upstream dùng theo host và quyền, không phải bắt toàn hệ thống lập worker tiers.

PPTX là deliverable cuối, chỉnh sửa được text/table/chart khi phù hợp. Không thay bằng HTML/PDF/ảnh phẳng. Script và assets là đồ hỗ trợ, không bắt giao thêm. Preview HTML upstream có thể là công cụ trung gian, không phải sản phẩm thay PPTX.

Tham chiếu: ưu tiên mẫu người dùng; khi chưa có định hướng, tự tìm và mở xem mẫu phù hợp ở Canva, Slidesgo hoặc nguồn công khai khác. Không Microsoft mặc định, không quota nguồn, không kho mẫu theo ngành. Tài liệu tổ chức chỉ khi thực sự liên quan. Không nói đã tham khảo khi mới lấy link.

Thiết kế phù hợp mục đích và người xem; không cố định mọi deck ở body 11–14pt, một margin, một kiểu cards hay một aspect ratio. Render để xem phân cấp, readability, nhịp bố cục, chất lượng hình và độ chính xác nội dung, không chỉ overflow. Ảnh gen bằng tool có thật của host, không buộc OpenAI API/key trên mọi nền tảng, không biến illustration thành dữ liệu đo.

## 6. Discovery, phối hợp và dọn sạch

Mỗi skill công việc active phải có native description discovery; không explicit-only để né trigger kém. Các resources/helper không phải entry point không cần giả làm skill độc lập. Không tự thay quyền của provider/profile explicit-only ngoài phạm vi.

Registry ghi quan hệ và provenance; dependency graph kiểm tra missing/conflict/cycle, không làm bộ não ngữ nghĩa. Không tự động nạp mọi supports hay dependency vào context trước khi cần. Dependency phải sẵn có ở đúng host surface để lời gọi tiếp theo resolve thật. Khi host không đọc metadata graph, dùng discovery/adapter thực có, không coi YAML là enforcement.

Xử lý chồng vai trò với skills do host/plugin cung cấp: xác định owner cho tác vụ và kiểm tra đường chọn thực. Không xóa plugin/user skill ngoài ownership; không báo độc quyền authority nếu host vẫn expose owner khác mà chưa có cách phân định.

Dọn đồng bộ source active, registry, graph sinh ra, mode routing, packaging, docs, tests có tên cũ và installed projections. Có thể giữ tombstone tối thiểu có consumer phục vụ migration/cleanup; không giữ active body, dependency trỏ qua planner đã retire hoặc chuỗi superseded_by lỗi. Bỏ tombstone không còn consumer khi phù hợp, không dựa grep xóa mọi nhắc lịch sử.

Rules: bỏ yêu cầu “tách turn” nếu nó buộc người dùng gửi prompt mới để review; dùng chặng liên tiếp trong cùng phiên. Cho nạp thêm skill khi ngữ cảnh/giai đoạn đổi, không khóa inventory một lần thành khóa chuyên môn cả phiên. Bỏ guidance custom trùng vai trò planning upstream; giữ scope, preservation, quyền và tiêu chí hoàn thành chung.

Code: phân định catalog/projection/installer/host adapter/diagnostics/proof; sửa phụ thuộc sai hoặc logic trùng ở seam đang thay, giữ public exports/consumer. Không refactor cả kho hoặc tạo package chỉ để đẹp cây thư mục. Không mở rộng graph/keyword/benchmark để bù việc model chưa chọn đúng.

## 7. Kiểm chứng thực dụng và điểm dừng

Không tạo corpus/eval chất lượng skills, điểm phần trăm hoặc chạy lặp nhiều model. Giữ tests phần mềm hiện có và thêm focused regression chỉ cho lỗi thực ở dependency/adapter/migration.

Kiểm chứng phải phân biệt bốn mức: file đã cài; host expose được; agent tự chọn và đọc từ prompt tự nhiên; agent áp dụng vào kết quả thật. Không lấy mức đầu chứng minh mức cuối.

Dùng chính công việc triển khai để quan sát chuỗi planning sau khi nạp nguồn mới; ghi những bước thật đã chạy. Kiểm tra entry point natural-language trên host khả dụng, không gọi tên skill để “chứng minh trigger”. Nếu không quan sát được host nào thì ghi giới hạn, không dựng transcript. Một đường chạy không chứng minh trigger mọi prompt; báo đúng điều đã quan sát.

Với PPTX, tạo một deck từ brief chung đủ thể hiện narrative, dữ liệu và thiết kế, dùng tham chiếu đã xem. Xem toàn deck và các trang chi tiết, sửa lỗi; trình thumbnail và vài slide đọc được. Không lấy LAB1 hoặc deck quảng cáo nội bộ agent-rules làm tiêu chuẩn chất lượng. Dữ liệu minh họa ghi minh họa, số đo thật dẫn nguồn; không lặp lỗi báo cáo 315 nhưng ảnh 367 tests.

Chạy typecheck/focused tests cho seam thay; chạy `npm run verify:all` ở candidate tích hợp. Không lặp broad gate nếu không có thay đổi/failure khiến bằng chứng mất hiệu lực. Không audit lại nhóm đã đủ bằng chứng chỉ để kéo dài review. Chỉ mở việc mới nếu ảnh hưởng yêu cầu hoặc lỗi thực.

## 8. Cài lại, phát hành, báo cáo

Build bằng pipeline chuẩn; inventory và reconcile toàn bộ host agent-rules đang quản lý qua CLI, dự kiến chín host hiện có. Giữ profile và config cá nhân, báo collision đúng, dọn stale-owned files. Giữ rollback hợp lệ, dọn snapshot thừa có ownership sau readback; kiểm tra đường dẫn tuyệt đối trước recursive cleanup.

Đọc lại từng host: candidate/source, skill mới có, skill cũ biến mất, dependency resolve, giới hạn tool/native surfaces. Static HEALTHY không có nghĩa workflow đã chạy trên host đó. Provider login/lỗi phải ghi riêng, không sửa user config cho xanh.

Kiểm tra diff/secrets/temp artifacts; xác minh remote, tạo một commit mới cho đợt này rồi push nhánh được xác minh, không force. Không sửa các commit đã push trước đây. Quyền commit/push của đợt này đã có; không cần hỏi lại.

Giao báo cáo tại `ANTIGRAVITY-UPSTREAM-COMPOSITION-RESULTS-2026-09-30.md`, chứa:

1. **Skills trước → sau:** mỗi skill/nhóm một dòng, thêm/thay/giữ/xóa, repo/pin/license, dependency đi kèm và lý do, consumer mới, trạng thái thật. Ghi rõ brainstorming đã quay lại và những phụ thuộc nào từ danh sách cũ được thêm theo quyết định mới.
2. **Adaptations:** từng chỉnh nhỏ, vị trí, lý do, source pin/hash và hiệu lực; tách rõ vendor gốc với projection. Không gọi bản đã patch là nguyên bản.
3. **Cơ chế:** rules/routing/graph/continuity/proof/installer, thay gì và vì sao; phần đã đúng ghi giữ nguyên, không kể công sửa không có.
4. **Sử dụng thật:** prompt không gọi tên skill, host, skill thực sự đọc, output và giới hạn quan sát. Không chỉ bảng inventory.
5. **PPTX trực quan:** link file, ảnh overview/slide đại diện, tham chiếu và cách áp dụng, editability và renderer. Không tự chấm “100% đẹp”.
6. **Host:** candidate, inventory/dependency, stale cleanup, phần đã chạy thật, giới hạn còn lại.
7. **Bảo toàn/Git:** 5fedu không đổi, không đụng cấu hình cá nhân, checks thực đã chạy, SHA/branch/remote và push.

Mỗi mục dùng trạng thái rõ: đã thay và kiểm chứng; giữ nguyên đã xác minh; đã xóa sạch trong phạm vi ownership; chưa hoàn tất; blocker cụ thể. Không ẩn mục thiếu khỏi báo cáo.

## 9. Điều kiện hoàn thành

Chuỗi Superpowers được tích hợp đủ phụ thuộc và dùng được; task-decomposer/custom planning không còn cạnh tranh. Slide-maker được dùng như workflow thực, phối hợp các thành phần của nó đúng host/preferences, tạo PPTX đã xem. Skills active được khám phá tự nhiên và có bằng chứng ứng dụng cho các đường chính vừa thay; không yêu cầu người dùng nhớ lệnh. Rules/metadata/host projections hết mâu thuẫn và cặn cũ liên quan; nhóm đã đúng ổn định; 5fedu nguyên vẹn; full host readback và phát hành được báo trung thực.

Không còn lý do “skill này dính skill kia nên quay lại custom”. Cài và tích hợp dependency đúng là công việc của đợt này. Chỉ xung đột thực sự ngoài khả năng adaptation nhỏ hoặc thiếu quyền/công cụ mới là blocker; không tự tuyên bố hoàn tất khi nó còn chặn kết quả bắt buộc.
