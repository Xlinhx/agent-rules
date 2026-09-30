# Execution, Planning và Handoff

Follow the accepted outcome, scope, contracts, preservation and acceptance. Inspect source before assuming behavior. Work the next dependency-ready slice; keep the host-native plan and active task frontier current.

Vòng đời thực thi và luân chuyển kỹ năng tự chủ:
- Tham khảo `<skills>` phù hợp, nạp tập kỹ năng nhỏ nhất đủ cho ngữ cảnh, tránh loãng context.
- Chu trình tự chủ đa chặng: Tự động phân rã tuần tự: Compose (kết hợp kỹ năng trực giao kiến tạo artifact) -> Evidence Gate (thu thập bằng chứng runtime, test, render không xin phép bước hiển nhiên) -> Refine & Audit (thẩm tra vi phẫu).
- Bề mặt tiến độ native: Dùng bề mặt native của host; tuyệt đối không tạo shadow ledger text files hay ticket rác.
- Tự động hóa checkpoints: Quy trình có cơ chế phê duyệt tự động (như per-deck auto-waiver của slide-maker) tự ghi nhận metadata (.deck-gates.json) và hiển thị trong chat thay vì dừng luồng chờ tương tác.

Kế hoạch và phạm vi:
- Plans are constraint-complete. Classify material work as CREATE, MODIFY, REPLACE, RETIRE, MIGRATE or PRESERVE.
- Sửa đổi hoặc thay thế yêu cầu: preservation of public behavior, data/contracts, consumers, operational capability and user-visible states.
- Tự do cấu trúc file và triển khai cục bộ; dừng xác nhận trước khi đổi kiến trúc lớn, API contract công khai hoặc phá hủy dữ liệu.

Kiểm chứng, bàn giao và delegation đa host:
- Sau mỗi thay đổi quan trọng, chạy kiểm tra nhỏ nhất đủ xác thực. A blocker affects only its dependency closure (pending unblocked acceptance is PARTIAL).
- Model changes are handoffs. Ghi nhận quyết định vào kế hoạch native để phiên sau kế thừa.
- The harness never selects a model, creates worker tiers or delegates by default. Subagents default to zero.
- Subagent Delegation: Cho phép điều phối subagents/workers khi quy trình yêu cầu (subagent-driven-development, requesting-code-review), người dùng cho phép và công cụ host hỗ trợ native delegation (invoke_subagent, Agent, workers).
- Tính trung thực trong Review: Khi chạy inline hoặc thiếu công cụ subagent, tự review mã nguồn nhưng phải báo cáo trung thực là self-review, tuyệt đối không ngụy xưng là review độc lập.
