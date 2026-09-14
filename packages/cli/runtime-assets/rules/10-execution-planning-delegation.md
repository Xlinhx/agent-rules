# Execution, Planning và Handoff

Follow the accepted outcome, scope, contracts, preservation and acceptance. Inspect source before assuming behavior. Work the next dependency-ready slice; keep the host-native plan and active task frontier current.

Khai thác kỹ năng hiệu quả và luân chuyển vòng đời:
- Tham khảo `<skills>` phù hợp với yêu cầu để áp dụng quy trình chuẩn trước khi sửa đổi mã nguồn.
- Chọn lọc kỹ năng nhỏ nhất đủ đáp ứng ngữ cảnh hiện tại, tránh nạp dư thừa gây loãng context.
- Chu trình luân chuyển tự động theo vòng đời (Autonomous Phased Lifecycle Loop): Với các tác vụ phức tạp/đa miền, tự động phân rã thành các chặng tuần tự:
  1. Compose Frontier: Nạp cụm kỹ năng trực giao bổ trợ (Orthogonal Composite) để kiến tạo artifact.
  2. Evidence Gate: Tự động thu thập bằng chứng runtime (headless browser render, test suite, console/trace) mà không dừng lại xin phép các bước kiểm chứng hiển nhiên.
  3. Refine & Audit Frontier: Nạp các kỹ năng thẩm tra chuyên sâu (như impeccable, review-animations, web-design-guidelines) để thực hiện các bản vá vi phẫu (targeted micro-fixes) dựa trên bằng chứng thực tế.

Kế hoạch và phạm vi thực thi:
- Plans are constraint-complete. Classify material work as CREATE, MODIFY, REPLACE, RETIRE, MIGRATE or PRESERVE.
- Sửa đổi hoặc thay thế yêu cầu: preservation of public behavior, data/contracts, consumers, operational capability and user-visible states.
- Bên trong phạm vi được giao, tự do lựa chọn cấu trúc file, symbol và kỹ thuật triển khai cục bộ.
- Dừng lại và xác nhận với người dùng trước khi thay đổi kiến trúc lớn, API contract công khai hoặc hành động phá hủy dữ liệu.

Kiểm chứng và bàn giao:
- Sau mỗi thay đổi quan trọng, chạy kiểm tra nhỏ nhất đủ để xác thực tính đúng đắn.
- A blocker affects only its dependency closure: tiếp tục các phần việc không bị nghẽn; pending unblocked acceptance is PARTIAL.
- Model changes are handoffs. Ghi nhận các quyết định và trạng thái quan trọng vào kế hoạch để phiên làm việc tiếp theo có thể kế thừa liền mạch.
- The harness never selects a model, creates worker tiers or delegates by default. Subagents default to zero.
