# Thực hiện thay thế đúng mục tiêu và báo cáo kết quả từng mục

## 1. Chỉ thị có hiệu lực

Đọc và thực hiện bản này trên `P:\agent-rules`. Đây là đính chính mục tiêu cho hai plan trước, không yêu cầu làm lại những phần đã đúng. Khi có mâu thuẫn, bản này và chỉ dẫn trực tiếp mới nhất của chủ sở hữu được ưu tiên.

Chủ sở hữu yêu cầu thay các workflows custom yếu bằng skills upstream phù hợp, đặc biệt planning và PPTX; không chấp nhận việc tự viết thêm quy trình custom rồi báo đã hoàn thành thay thế. Các ngoại lệ trong plan trước cho phép “giữ/nâng cấp custom là đã hoàn tất” bị thu hồi. Người dùng không cần gọi skill bằng tên hoặc lệnh thủ công. Hệ thống phải dùng chung, đa host, nhiều lĩnh vực, gọn và hữu ích trong công việc thực tế.

Phạm vi hiện tại là nghiên cứu nguồn để chọn, triển khai thay thế, xác minh thực tế, cài lại toàn bộ host đã có, commit/push và báo cáo rõ từng mục. Không chỉ trả về một kế hoạch nghiên cứu khác. Việc tìm và chọn upstream theo contract dưới đây là công việc được giao cho agent, không đẩy lại cho chủ sở hữu.

Baseline vừa đọc: HEAD `b6981c334f182b50533a93aeeb72fce02c410542`, working tree sạch trước khi tạo bản này. Commit đó đã được push theo báo cáo trước; phải kiểm tra remote khi phát hành. Không reset/hoàn tác toàn bộ, không sửa lịch sử đã push. Đợt này tạo một commit mới chứa các thay đổi liên quan; yêu cầu gom commit không có nghĩa force-push để gộp với commit cũ.

## 2. Những quyết định không được tự đổi

- PRESERVE tuyệt đối `profiles/5fedu/`, `5fedu-project`, `5fedu-module-parity`; giữ profile đang cài và dữ liệu người dùng.
- Không nhập/mount bảy skills đã loại: using-git-worktrees, finishing-a-development-branch, dispatching-parallel-agents, subagent-driven-development, writing-skills, diagnosing-superpowers, using-superpowers. Kiểm tra cả phụ thuộc trong nội dung, không chỉ YAML.
- Không tự tạo worker tiers, chọn model, bắt buộc subagents hoặc handoff qua nhiều agents. Dùng native plan/progress, không shadow ledger.
- Upstream phải nguyên bản, pin commit và có license kiểm chứng được. Không patch description/nội dung; không đổi tên custom để giả upstream; không gọi một file “internal canonical” là kết quả thay upstream.
- Một workflow có một authority rõ; skills trực giao có thể phối hợp theo mục đích và giai đoạn. Không giữ hai bộ lập kế hoạch hoặc hai art director cạnh tranh trong discovery.
- Không dùng explicit-only, slash command hoặc hidden manual activation để cứu skill không trigger đúng. Profile/provider explicit-only không liên quan vẫn giữ nguyên quyền lựa chọn.
- Không dựng benchmark, corpus chất lượng agent, bảng điểm, quota nguồn tham chiếu hay thư viện template theo ngành. Giữ software tests có ích và kiểm chứng sản phẩm thực tế.
- Không sửa `.env`, credentials, MCP cá nhân, file ngoài quyền quản lý; không cài ứng dụng host bên thứ ba chưa có. Thực hiện cài đặt global qua CLI, không copy vào host homes thủ công.

## 3. Tình trạng thật và ma trận công việc

Các mục ngoài hai file đã đọc phải được đối chiếu với source/diff hiện tại, không chỉ tin báo cáo trước.

| Phạm vi | Hiện tại / vấn đề | Hành động bắt buộc | Kết quả đích |
|---|---|---|---|
| Planning | `plan-and-handoff` vẫn là custom đã mở rộng | REPLACE bằng upstream hoặc bộ upstream tương thích, sau đó RETIRE custom khỏi active discovery và host | Năng lực hiểu yêu cầu, lập kế hoạch, thực hiện và bàn giao được bao phủ, không dependency thiếu |
| PPTX | `slides` đã chuyển thành custom 7 bước | REPLACE authority custom bằng upstream phù hợp hoặc các skills upstream trực giao | Workflow thiết kế và dựng PPTX có nguồn, được dùng thực tế, không chỉ đổi văn bản |
| Research | Đã chuyển researcher sang deep-research | PRESERVE thay thế nếu nội dung, provenance và discovery đúng; sửa integration nếu thiếu | Nghiên cứu có nguồn, mâu thuẫn và giới hạn, không quay lại researcher |
| Migration | Đã chuyển schema-migration sang database-migrations | PRESERVE và kiểm tra coverage/dependencies | Giữ an toàn dữ liệu, tương thích và phục hồi thực tế |
| Security | differential-review thay security-review | PRESERVE review diff; khép phần coverage thiếu bằng upstream đúng phạm vi khi thật sự thiếu | Không tuyên bố review diff bao phủ cả threat modeling hay audit không có diff |
| Superpowers còn lại | systematic-debugging, TDD, receiving-code-review, verification-before-completion đã hiện diện | Kiểm tra tương thích toàn bộ nội dung và đường phối hợp, giữ phần dùng được | Không gỡ chỉ vì cùng nguồn; không cài đủ bộ bất chấp loại trừ |
| docs-style / verification-router | Custom còn tồn tại | Xác định trách nhiệm riêng. Thay bằng upstream nếu trùng chức năng và không có ràng buộc riêng đáng giữ; phần adapter/proof selection đặc thù giữ tối thiểu, có lý do cụ thể | Không giữ chỉ vì “đang chạy”, cũng không xóa chức năng đặc thù để đạt số lượng retire |
| quieter / distill / critique / polish | Có nguồn derived, khác custom vô nguồn | Đối chiếu upstream tương thích, ưu tiên thay bản derived khi không mất trách nhiệm riêng; giữ attribution/license | Bảo toàn nghiệp vụ, không ép tối giản hay một phong cách cố định |
| Governance customs | Plan trước yêu cầu migrate/retire | Xác nhận thực tế đã migrate; nếu chưa thì chuyển trách nhiệm cơ học sang maintainer tooling và retire | Không phục hồi skills explicit-only để báo đủ chức năng |
| Routing, graph, rules, code boundaries | Báo cáo nói đã tinh gọn | Kiểm tra kết quả đối chiếu mục 6; sửa chỗ thiếu, giữ phần đã đúng | Không làm lại chỉ để đổi cấu trúc |
| Full host / Git | Đã có một release trước | Reconcile bản cuối của đợt này, readback rồi commit/push mới | Cài đúng bản đã kiểm chứng, không chỉ dẫn lại kết quả cũ |

Giữ các skills chuyên môn khác ngoài phạm vi nếu không có xung đột cụ thể. Không biến đợt sửa này thành thay toàn bộ catalog bất kể giá trị.

## 4. Chọn upstream và thay thế thật

### Planning

Tìm và đọc nguồn upstream thực tế, bao gồm file phụ và yêu cầu bắt buộc. Superpowers là nguồn ưu tiên đã bàn, không phải nghĩa vụ cài bằng mọi giá. Nếu phiên bản/phần lựa chọn của Superpowers không đáp ứng các loại trừ, tìm bộ upstream khác. Không tiếp tục thử một bộ không tương thích rồi kết luận custom là đáp án.

So sánh ứng viên theo những trách nhiệm cần giữ: làm rõ mục đích khi thiếu; bảo toàn ràng buộc khi làm dài; chia việc theo phụ thuộc; thực hiện liên tục; phản hồi bằng chứng; bàn giao tự đủ ngữ cảnh khi người dùng cần. Kiểm tra xem skill có ép approval cho mọi bước, commit tự động, file ledger, model tiers, subagents hoặc gọi skill không cài hay không. Đánh giá dependency closure trước khi chọn.

Ghi kết luận ngắn với URL, commit, file liên quan và lý do nhận/loại thực tế. Không đặt quota số ứng viên, không dùng stars/README quảng cáo thay việc đọc. Tên bộ thay thế là SOURCE_DISCOVERABLE: agent phải tìm và quyết định theo contract, không tự bịa tên trong kế hoạch.

Sau khi chọn, import nguyên bản qua cơ chế repo, chuyển consumers/registry/discovery và dọn custom cũ theo lifecycle. Các nguyên tắc chung như bảo vệ dữ liệu/quyền commit nằm ở rules; không sao chép toàn bộ plan-and-handoff sang rules để giả đã retire. Adapter host chỉ giải quyết khác biệt công cụ/đường dẫn, không tái tạo custom workflow phía sau upstream.

### PPTX

Nghiên cứu nguồn chuyên làm PPTX thật; `https://github.com/addsumtech/slides_maker` là ứng viên đã bàn, chưa được phê duyệt là phù hợp. Không mặc định dùng chỉ vì có nhiều bước hoặc ví dụ đẹp. Xem nguồn, dependency, license, engine, khả năng editable, render và việc buộc API/model cụ thể. Có thể kết hợp skills upstream riêng cho nghiên cứu/tham chiếu, visual assets, authoring và kiểm tra nếu trách nhiệm không trùng; không phát minh thêm một bộ điều phối custom thay công việc chọn nguồn.

Pin và license phải đủ để người khác tái tạo. Khi giữ helper từ bộ cũ, bảo toàn nguồn/license của helper và khai báo là thư viện kỹ thuật; nó không được giữ authority cũ trong discovery.

### Khi chưa tìm được ứng viên đáp ứng

Không có bảo đảm rằng thị trường có một bộ đáp ứng mọi điều kiện. Phải nghiên cứu nguồn thay thế liên quan trước khi kết luận, ghi cụ thể yêu cầu nào xung đột với dòng/source nào. Nếu vẫn không tìm được, mục đó là CHƯA HOÀN TẤT/BLOCKED bởi lựa chọn chưa giải quyết; giữ bản hiện tại tạm để tránh mất khả năng nhưng không gọi nó là kết quả thay thế. Không tự hạ mục tiêu, sửa upstream trái contract hay xin lại quyền nghiên cứu. Tiếp tục các phần độc lập; chỉ trình chủ sở hữu xung đột thật cần đổi ràng buộc. Không được báo hoàn tất toàn bộ khi planning hoặc PPTX chưa đạt.

## 5. Kết quả PPTX phải đẹp và dùng được

Các yêu cầu dưới đây là tiêu chí lựa chọn và nghiệm thu workflow, không phải chỉ viết lại thành bảy bước custom.

- Deliverable cho người dùng là `.pptx`, text/table/chart đơn giản chỉnh sửa được. Script/asset phục vụ nội bộ; không bắt giao thêm khi không được yêu cầu. Không thay bằng HTML/PDF hoặc ảnh phẳng toàn trang.
- Hiểu mục đích, người xem, trình chiếu hay tự đọc, mật độ thông tin, brand và độ chính xác cần thiết. Dùng được nhiều ngành, không lấy LAB1 hay dự án nội bộ làm chuẩn.
- Tự tìm web và nhìn mẫu thực khi cần định hướng. Canva và Slidesgo là điểm tìm gợi ý; không có Microsoft mặc định, không whitelist. Template người dùng ưu tiên; tài liệu tổ chức chỉ khi thực sự liên quan. Không có quota nguồn; một mẫu phù hợp có thể đủ. Nếu trang không truy cập được, tìm nguồn công khai khác, không nói đã tham khảo chỉ vì đã lấy link.
- Chuyển tham chiếu thành lựa chọn nhìn thấy được: grid, typography, tương phản, khoảng trắng, màu, crop ảnh, dữ liệu và nhịp giữa các trang. Không copy tài sản khi thiếu quyền sử dụng.
- Bố cục theo nội dung, không mọi trang cùng cards/bullets. Không áp 16:9, margin 0.8 inch hay body 11–14pt thành luật phổ quát. Tôn trọng khổ/template đã yêu cầu; kích thước chữ phụ thuộc cách sử dụng và khả năng đọc. Cho phép bleed trang trí có chủ ý, không cắt nội dung quan trọng.
- Image generation dùng khả năng thật có trên host; không hardcode OpenAI hoặc bịa lệnh Antigravity. Ảnh phải có mục đích, không gen bắt buộc mỗi trang. Số liệu minh họa ghi là minh họa, không gọi là số đo thực.
- Render và nhìn sản phẩm: cả bố cục tổng thể và slide chi tiết. Đánh giá phân cấp, nhịp, tính nhất quán, chất lượng hình, cách kể chuyện và phù hợp brief, cùng với clipping/overlap/font. Không đồng nhất “0 clipping” với đẹp.

Kiểm chứng bằng một công việc PPTX hoàn chỉnh, quy mô vừa đủ quan sát workflow vừa thay. Brief chung, không LAB1, không sinh một thư viện đề thi. Dùng tham chiếu đã mở xem, làm ra deck, render, sửa lỗi thật. Báo cáo phải cho người dùng xem thumbnail tổng thể và các trang đại diện, kèm tham chiếu và giải thích ngắn chúng đã ảnh hưởng thiết kế ra sao. Không tự chấm điểm phần trăm. Phân biệt host đã chạy thật và host mới chỉ cài/readback; không bắt gen ảnh chỉ để đủ checklist nếu deck không cần.

## 6. Các cơ chế ngoài skills vẫn thuộc phạm vi nghiệm thu

Giữ những cải thiện đã đúng của commit trước; không lấy việc tập trung thay skills làm lý do bỏ các mục đã thống nhất:

| Cơ chế | Đích cần xác minh |
|---|---|
| Semantic discovery | Chọn theo ý định/artifact/giai đoạn/ràng buộc qua native descriptions; không keyword authority. Nạp thêm chuyên môn khi ngữ cảnh đổi, không khóa bộ kỹ năng suốt phiên. Không hứa trigger 100%. |
| Diagnostic routing | Structured input có consumer và truyền qua public entry point; repository facts xác định compatibility, không tự cấp quyền gọi provider. Không thêm LLM router riêng. |
| Graph/registry | Phục vụ provenance/dependency/lifecycle; gộp metadata trùng sau khi chuyển consumer, không ontology hay graph chấm điểm chất lượng. |
| Rules | Ngắn, không lặp nội dung skills; tạo rồi xem output và sửa trong cùng phiên, không bắt người dùng gửi tin để chuyển pha. |
| Tổ chức code | Catalog, projection, installer, host adapter, diagnostics và proof có trách nhiệm riêng. Refactor chỗ có phụ thuộc sai/trùng thực, giữ public exports/consumer; không tách package hình thức. |
| Eval/tests | Không corpus/benchmark skills hay PPTX. Giữ tests phần mềm và validation output thực; regression nhỏ cho lỗi có thật. |
| Diagnostics | Phân biệt cài đặt khỏe, provider lỗi/login và host không có bề mặt quan sát. Không đổi lỗi thành xanh, không diễn dịch thiếu quan sát thành agent không hoạt động. |
| Continuity | Native progress, bàn giao gọn khi cần; không shadow plans, ledger hoặc certificate. |
| Lifecycle | Transaction, ownership, collision safety, stale cleanup, rollback dùng được và bảo toàn user config. |

Nếu một mục đã đủ, báo GIỮ NGUYÊN — ĐÃ XÁC MINH, không chỉnh để có diff. Nếu không refactor vì ranh giới hiện tại đã hợp lý, nêu căn cứ consumer cụ thể; không báo “tối ưu toàn diện” chỉ vì đã xem cây thư mục.

## 7. Trình tự thực hiện và phát hành

1. Đọc source/diff hiện tại và báo cáo trước; ghi tiến độ native theo các mục trên. Xác nhận vùng bảo toàn và inventory host thực, không dựa tên thư mục để kết luận ứng dụng host có sẵn.
2. Chọn upstream và khép dependency cho planning/PPTX trước khi retire authority cũ. Không xóa trước rồi để chức năng mất trong lúc tìm nguồn.
3. Import/migrate consumers, projection và metadata. Thực hiện các phần còn thiếu của nhóm customs/cơ chế đã nêu; build generated outputs bằng pipeline chuẩn.
4. Chạy kiểm chứng nhỏ đúng seam, và tác vụ thực dùng workflow mới. Planning phải tạo/tiếp tục được một công việc nhiều bước mà không phụ thuộc custom cũ hoặc gọi skill thiếu. Không dựng corpus benchmark. Có thể dùng chính công việc triển khai này sau khi nguồn mới được chọn và nạp, ghi rõ phần nào đã quan sát.
5. Chạy `npm run check`, focused tests liên quan, `npm run verify:all` một lần ở candidate tích hợp; sửa lỗi và chỉ chạy lại phần cần thiết hoặc release gate khi thay đổi làm mất hiệu lực kết quả.
6. Cài lại/reconcile global toàn bộ host agent-rules đã có bằng CLI. Dọn skill retire và tàn dư do hệ thống sở hữu; giữ profile, MCP cá nhân và rollback hợp lệ. Không sửa generated hoặc mirrors bằng tay. Đọc lại từng host, ghi rõ missing/stale/collision và phần không hỗ trợ.
7. Review staged diff/secrets/temporary artifacts; kiểm tra remote, tạo một commit mới cho đợt này và push không force. Không đưa deck thử, ảnh render lớn, log hay paths cá nhân vào repository phát hành mặc định. Nếu phát hành bị chặn, báo đúng bước; không nói đã push khi chưa xác minh.
8. Báo cáo theo mục 8, dùng trạng thái thật. Phần nào chưa đạt vẫn giữ ở bảng, không biến mất khỏi báo cáo.

## 8. Báo cáo sau thay đổi — bắt buộc rõ và trực quan

Giao một báo cáo cuối có thể đọc độc lập. Đặt tại `ANTIGRAVITY-REPLACEMENT-RESULTS-2026-09-30.md` hoặc artifact tương đương có đường dẫn truy cập; đây là báo cáo người dùng yêu cầu, không hệ thống ledger. Không điền trước “hoàn tất”.

### A. Tóm tắt kết quả thực

Nêu ngay đã thay được những workflow nào, còn thiếu gì, host nào có giới hạn, commit/push ra sao. Không dùng “100%” hoặc “toàn bộ PASS” nếu có mục thiếu. Phân biệt thay thế và nâng cấp; tên skill mới và nguồn phải hiện rõ.

### B. Bảng skills trước/sau

| Nhóm | Trước | Sau: ID và link upstream/pin | Thêm / thay / sửa / xóa / giữ | Authority cũ còn active không? | Năng lực giữ được / giới hạn | Bằng chứng | Trạng thái |
|---|---|---|---|---|---|---|---|

Mỗi workflow ở mục 3 có một dòng riêng; nhóm UI ghi riêng từng skill khi kết quả khác nhau. Ghi rõ file/folder/ID nào retire, consumer chuyển đi đâu. Custom được giữ phải nêu trách nhiệm đặc thù và vì sao không thể xóa; riêng planning/PPTX giữ tạm nghĩa là chưa đạt mục tiêu thay thế, không được dùng lý do chung “upstream không hợp”.

### C. Bảng cơ chế ngoài skills

| Cơ chế | Trước | Sau | File/module chịu trách nhiệm | Thay đổi có ích cho người dùng | Kiểm chứng đã chạy | Còn thiếu |
|---|---|---|---|---|---|---|

Điền đủ các nhóm mục 6. Có thể dùng một sơ đồ luồng ngắn từ yêu cầu → native skill discovery → workflows/công cụ host → sản phẩm → kiểm tra, nhưng sơ đồ phải mô tả code/host thật, không vẽ một semantic engine không tồn tại.

### D. PPTX nhìn thấy được

- Link file PPTX dùng kiểm chứng, ảnh overview và vài slide đại diện ở kích thước đọc được; ảnh tham chiếu được phép hiển thị hoặc link tới đúng mẫu kèm mô tả cái đã xem.
- Chỉ ra lựa chọn thiết kế cụ thể và cách nó phù hợp brief; không chỉ nói “chuyên nghiệp”.
- Nêu text/chart/table nào editable, asset nào raster, renderer/host nào đã chạy, vấn đề phát hiện và sửa. Không tạo số đo hoặc lời khen tự chấm thay hình ảnh.

### E. Bảng host

| Host | Candidate/version cài | Skill mới hiện diện | Skill cũ đã dọn | Rules/skills readback | Provider/native limits | Việc còn cần |
|---|---|---|---|---|---|---|

Ghi đủ host đã quản lý. “Cài thành công” không đồng nghĩa “đã chạy workflow trên host này”; đánh dấu rõ đã chạy thật ở đâu.

### F. Bảo toàn và Git

Nêu đối chiếu 5fedu, kiểm tra user-owned config không bị thay trái phép, tests thật đã chạy, SHA/branch/remote và kết quả push. Không công bố secrets hoặc dump cấu hình cá nhân. Liệt kê yêu cầu chưa hoàn thành và nguyên nhân chính xác nếu có.

Trạng thái cho từng mục: **ĐÃ THAY — ĐÃ KIỂM CHỨNG**, **ĐÃ SỬA — ĐÃ KIỂM CHỨNG**, **GIỮ NGUYÊN — ĐÃ XÁC MINH**, **CHƯA HOÀN TẤT**, hoặc **BLOCKED: lý do cụ thể**. Không gộp các loại thành một nhãn PASS chung.

## 9. Điều kiện đóng công việc

Planning và PPTX có upstream authority phù hợp đang active, authority custom cũ đã retire sau migration; dependency đầy đủ, không skills loại trừ hoặc workflow điều phối ẩn. Các customs/cơ chế còn lại được xử lý theo phạm vi và báo cáo riêng. Có bằng chứng tác vụ thật, sản phẩm PPTX nhìn được, readback các host, bảo toàn dữ liệu và commit mới đã push. Báo cáo cho thấy chính xác hệ thống đã thêm/sửa/xóa gì và giới hạn gì còn tồn tại.

Không sửa mục tiêu hoặc acceptance chỉ vì lựa chọn đầu tiên khó tích hợp. Nếu một điều kiện không thể đáp ứng trong các ràng buộc đã chốt, công việc chưa được đóng là hoàn tất; giữ phần đã làm đúng và trình xung đột cụ thể, không tự chuyển về “custom cải tiến là đủ”.
