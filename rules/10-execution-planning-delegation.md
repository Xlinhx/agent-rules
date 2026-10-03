# Execution, Planning và Handoff

Follow the accepted outcome, scope, contracts, preservation and acceptance. Inspect source before assuming behavior. Work the next dependency-ready slice; keep the host-native plan and active task frontier current.

Vòng đời thực thi và luân chuyển kỹ năng tự chủ:
- Chọn skill từ mục đích, artifact, việc sắp làm và bằng chứng cần đạt; không chỉ từ stack/từ khóa. Nạp tập kỹ năng nhỏ nhất đủ dùng, đọc đủ sections/references trước khi làm.
- Chu trình tự chủ: Compose (gộp kỹ năng trực giao cùng pha sáng tác; tránh tranh chấp thẩm quyền) -> Evidence Gate (tách kỹ năng kiểm chứng Create → Critique/Audit; thu thập runtime/test proof) -> Refine & Audit.
- Luân chuyển theo chặng: Trước mỗi chuyển dịch có ý nghĩa trong phiên (bắt đầu code, gặp lỗi/fail test, nghiên cứu đa nguồn, nhận feedback, audit, chuẩn bị nghiệm thu), xét lại `<skills>` và nạp bổ sung kỹ năng chuyên môn.
- "Resolve once" ở intake chỉ chốt facts/mentions đầu việc, không khóa cứng chuyên môn cả phiên; không quét lại catalog sau mỗi lệnh và không đọc lại skill không đổi.
- Bề mặt tiến độ native: Dùng bề mặt host; không tạo shadow ledger files/tickets. Checkpoint tự ghi nhận metadata (.deck-gates.json) khi có auto-waiver.

Kế hoạch, điểm vào và phạm vi:
- Điểm vào linh hoạt: Nhận plan đã duyệt (kể cả plan portable từ nơi khác) để triển khai ngay, không viết lại plan; chạy inline chọn `executing-plans`, không ép delegation vì host có subagent. Task code trực tiếp đã rõ ràng thì triển khai ngay với process skills (như TDD); chỉ lập plan (`writing-plans`, `brainstorming`) khi độ phức tạp/rủi ro thực sự cần.
- Plans are constraint-complete. Classify material work as CREATE, MODIFY, REPLACE, RETIRE, MIGRATE or PRESERVE.
- Sửa đổi hoặc thay thế yêu cầu: preservation of public behavior, data/contracts, consumers, operational capability and user-visible states. Tự do cấu trúc file cục bộ; dừng xác nhận trước khi đổi kiến trúc lớn, API contract công khai hoặc phá hủy dữ liệu.

Kiểm chứng, bàn giao và delegation đa host:
- Sau mỗi thay đổi quan trọng, chạy kiểm tra nhỏ nhất đủ xác thực. A blocker affects only its dependency closure (pending unblocked acceptance is PARTIAL).
- Chuẩn bị kết luận: Xét `verification-before-completion` và `verification-router` trước khi tuyên bố xong/fixed/passing; proof phải thỏa mãn cả ràng buộc phủ định và yêu cầu cụ thể từ raw prompt.
- Model changes are handoffs. Ghi nhận quyết định vào kế hoạch native để phiên sau kế thừa. The harness never selects a model, creates worker tiers or delegates by default. Subagents default to zero.
- Subagent Delegation: Cho phép điều phối workers khi quy trình yêu cầu (`subagent-driven-development`, `requesting-code-review`), người dùng cho phép và host hỗ trợ native delegation (`invoke_subagent`, Agent, workers).
- Tính trung thực trong Review: `requesting-code-review` khi chạy inline hoặc thiếu subagent tool phải báo cáo trung thực là self-review, không ngụy xưng độc lập. `receiving-code-review` chỉ dùng khi có feedback thật, không tạo reviewer/feedback giả.
