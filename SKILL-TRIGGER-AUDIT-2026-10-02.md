# Audit sử dụng skills trong hai conversation Antigravity

Ngày: 02/10/2026. Phạm vi: đọc transcript/tool calls và artifacts của hai chat do người dùng chỉ định; không sửa rules, skills, host hay các dự án của chat. Không tạo benchmark/corpus.

## Kết luận

Có bằng chứng bỏ sót việc nạp skills phù hợp, đặc biệt ở chuyển giai đoạn. Không có căn cứ kết luận tất cả skills ít trigger hoặc quy mọi thiếu sót cho chuỗi Superpowers mới: hai chat bắt đầu trước khi chuỗi đó được nhập. Cũng không được đồng nhất không đọc SKILL.md với không hề làm công việc kiểm tra tương ứng.

Nguồn: `.system_generated/logs/transcript.jsonl` và `transcript_full.jsonl` trong hai thư mục `C:\Users\ADMIN\.gemini\antigravity\brain\<conversation-id>`. Hai bản cho cùng danh sách tool calls đọc SKILL.md ở thời điểm đối chiếu. Chat đầu đang tiếp tục ghi log trong lúc audit, nên đây là ảnh chụp trạng thái, không phải tổng kết chat đã đóng. Chỉ trích user prompt, tool calls và artifacts; không dùng suy nghĩ nội bộ làm bằng chứng.

## 1. Mốc phiên bản

- Cả hai chat bắt đầu khoảng 13:16–13:18 ngày 30/09, giờ Việt Nam, và thực sự đọc plan-and-handoff cũ.
- Research/migration và một phần Superpowers được phát hành trong commit b6981c3 lúc 15:10 ngày 30/09.
- Chuỗi planning Superpowers đầy đủ được phát hành trong 3adf6ce lúc 19:35 cùng ngày.
- Chat ZaloAI trong trace kết thúc khoảng 18:50 cùng ngày, trước chuỗi planning đầy đủ.
- Chat frontend tiếp tục ngày 02/10 sau khi hệ thống đã cập nhật. Không có snapshot inventory từng turn trong dữ liệu đã đọc để chứng minh nó nhận catalog mới hay giữ catalog cũ. Không dùng thời điểm commit thay cho thời điểm host/session thực sự nhận bản cài.

## 2. Chat frontend — 94291263-a2fe-413c-ac03-08b8b902ffd4

Ngữ cảnh: thực hiện full frontend Iris Focus tại P:/client-acquisition-os, thiết kế đã được chọn. Prompt đầu yêu cầu rõ đọc plan-and-handoff, apple-design, composition-patterns, react-best-practices, một skill browser và critique/polish khi review; cấm gen lại concept bằng image-to-code.

Đã quan sát đọc trực tiếp sáu IDs: plan-and-handoff, agent-browser, composition-patterns, react-best-practices, apple-design, emil-design-eng. Có đọc lại một số skill, không phải sáu lần gọi. Phần lớn lần đọc đầu được user chỉ định đích danh nên không thể coi chúng là bằng chứng discovery hoàn toàn tự nhiên.

| Điểm vào / giai đoạn | Bằng chứng | Đánh giá |
|---|---|---|
| Bắt đầu triển khai | Steps 1,69,71,73,75 đọc planning/browser/React/composition/Apple | Có dùng discovery để tìm đường dẫn và đọc skills được yêu cầu |
| Review UI và sửa sau phản hồi | User steps 727,1069,1338 phản ánh lỗi và bác nghiệm thu; không thấy đọc critique/polish trong trace | Bỏ sót nạp skill đáng chú ý: đây là yêu cầu rõ từ đầu, không chỉ gợi ý do người audit suy ra |
| Motion/animation | Ngày 02/10 user nêu rõ vấn đề; tiếp theo có đọc emil-design-eng và apple-design | Có nạp skill theo ngữ cảnh mới; cơ chế không hoàn toàn chết, nhưng phản ứng muộn sau nhắc lại |
| Review motion | Không thấy đọc review-animations | Phù hợp khi đã có animation/code cần thẩm tra; không bắt buộc đọc ngay khi chưa có output |
| Browser | Có đọc agent-browser và tool calls browser/MCP | Không kết luận toàn bộ browser QA đã đủ chỉ vì có calls |
| Superpowers mới | Không thấy tool đọc brainstorming/writing/executing/TDD/verification/requesting/receiving | Phần ngày 30/09 chịu giới hạn thời điểm cài; phần tiếp tục 02/10 cần phân biệt catalog cũ với bỏ qua lựa chọn |
| image-to-code / brainstorming lại concept | Concept đã chốt, prompt cấm gen lại | Không dùng image-to-code là đúng; không cần brainstorm lại chỉ để tăng số lần trigger |

Nhiều lượt view_file chỉ đọc 60–150 dòng đầu của skill. Đọc từng phần không tự là lỗi; phải kiểm tra phần workflow/reference cần cho nhiệm vụ có được đọc tiếp không. Không dùng giới hạn số dòng như quy tắc mới cho mọi skill.

## 3. Chat ZaloAI — 2015d950-1e2c-4efe-b85a-338be07b3847

Ngữ cảnh: planning rồi triển khai pipeline, workflow graph/state, tenant boundaries và sandbox của ZaloAI-Ecommerce; sau đó user yêu cầu deploy/test và nghiên cứu lựa chọn model giá rẻ.

Trong 1.381 transcript rows tại audit, chỉ thấy một tool call đọc SKILL.md: plan-and-handoff, step 1. Có nhiều source reads, edits, commands và 11 search_web calls; không được nói chat không kiểm tra hay không nghiên cứu. Findings là thiếu nạp chuyên môn tương ứng, không phải thiếu mọi hành vi hữu ích.

| Giai đoạn | Skill phù hợp cần xét | Kết luận |
|---|---|---|
| Debug các lỗi runtime/behavior | systematic-debugging | Không thấy lượt đọc trực tiếp. Không xác nhận đã sử dụng chỉ từ việc có sửa lỗi |
| Kiểm thử, deploy, tuyên bố kết quả | verification-router; verification-before-completion nếu session đã có | Không thấy lượt đọc. Kiểm tra thực đã xảy ra, nhưng chưa chứng minh đã áp workflow kiểm chứng đầy đủ |
| Sửa tenant/tool/state boundaries | differential-review | Có ngữ cảnh rõ cho review diff bảo mật; không thấy đọc |
| Migration/database | database-migrations hoặc skill DB đúng stack | Chỉ cần nếu có thao tác schema/data thuộc phạm vi; không suy từ chữ database trong plan rằng mọi lượt đều phải nạp |
| Nghiên cứu model/giá và kiểm chứng thông tin | researcher cũ hoặc deep-research sau migration | 11 search calls nhưng không thấy đọc skill research. Đây là một chuyển miền rõ, đáng nạp chuyên môn nghiên cứu |
| Brainstorming/writing/executing-plans mới | Chuỗi Superpowers | Chat kết thúc trước commit nhập chuỗi; không coi việc thiếu chúng là regression của release mới |

## 4. Vì sao skills ít xuất hiện

1. **Đã thấy: tập trung nạp đầu việc, thiếu nạp ở chuyển giai đoạn.** Prompt ban đầu dẫn vào bộ planning/implementation; review, security, nghiên cứu và completion không được nạp tương ứng trong trace.
2. **Đã thấy: các lượt gọi được chỉ định chiếm phần lớn bằng chứng.** Đọc skills vì user liệt kê tên không chứng minh lựa chọn tự động mạnh.
3. **Có thể xảy ra, chưa chứng minh: session cũ không refresh catalog sau update.** Cả hai chat bắt đầu với skill nay đã retire. Cần xác minh catalog của turn/session, không cài lại thêm lần nữa để đoán.
4. **Có thể xảy ra: rules/model tự làm hành vi tương tự mà không mở skill.** Không có tool read không chứng minh không chạy test/review; nhưng cũng không được nói upstream workflow đã được áp dụng.
5. **Tần suất thấp hợp lý với skill chuyên biệt.** Slides, 3D, Expo, schema migration, animation naming, worktree/finishing chỉ dùng khi có công việc tương ứng. Không muốn mọi skill chạy trong mọi prompt.
6. **Description/overlap cần đánh giá theo điểm vào.** Các skills dùng thuật ngữ hẹp có thể kém được chọn; chưa đủ dữ liệu để quy nguyên nhân chính cho description hay lượng catalog. Không thêm hàng trăm keywords hoặc sửa vendor theo suy đoán.

## 5. Hướng xử lý ưu tiên, không mở review loop

- Giữ nguồn upstream và các nhóm đã chọn, không thay bộ mới chỉ vì ít lượt đọc.
- Với chat tiếp tục sau update, xác minh native catalog session thực sự nhận trước khi sửa routing. Nếu host chỉ cập nhật context ở phiên mới/reload thì thực hiện một lần theo khả năng thật; không yêu cầu người dùng gọi skill bằng tên làm workaround thường trực.
- Củng cố sử dụng tại các điểm chuyển việc: bắt đầu sửa code, xuất hiện lỗi, chuyển sang review UI/security, chuyển sang nghiên cứu và trước kết luận hoàn thành. Đây là ngữ nghĩa công việc, không keyword matcher hoặc combo cứng cho mọi prompt. Rule dynamic progression hiện đã có trong source; phải xác minh nó được host nhận và agent áp dụng, không thêm một câu tương tự rồi tuyên bố sửa xong.
- Ưu tiên sửa chỗ bị bỏ qua thật: critique/polish trong frontend, research trong câu hỏi so sánh nguồn, verification và security review trong thay đổi có rủi ro. Không ép brainstorming/writing-plans khi plan đã rõ hoặc phát sinh sửa nhỏ.
- Bằng chứng thực dụng là tool đọc skill cần thiết và output áp dụng được hướng dẫn đó trong tác vụ đang làm. Không bắt agent diễn thuyết tên skill liên tục, không thêm logging framework/corpus/điểm số.
- Không kết luận TDD đã chạy chỉ từ tests pass: cần thấy trình tự test phát hiện lỗi trước sửa khi TDD phù hợp. Audit này chưa phân tích từng diff để chứng minh hoặc bác TDD behavior.
- Không thay đổi hai repo ứng dụng hoặc nhắn sang chat khác trong lượt audit này.

## Giới hạn

Không có đầy đủ system prompt/skill catalog từng turn hoặc trace bên trong mọi subagent. Vì thế dùng cụm “không thấy lượt đọc skill trong trace được kiểm tra”, không tuyên bố tuyệt đối “model chưa từng biết skill”. Các số đọc chỉ phục vụ truy bằng chứng, không KPI. Hai chat không đại diện tần suất toàn hệ thống.
