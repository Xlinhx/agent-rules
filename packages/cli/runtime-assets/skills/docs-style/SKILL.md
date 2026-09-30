---
name: docs-style
description: "Create/review/rewrite high-quality project docs (README, specs, doc architecture) with pragmatic, source-grounded standards."
metadata:
  signals: "README, README-vi, /docs/, documentation, tài liệu, docs cleanup, tech stack"
  excludes: "pure code implementation"
  priority: "50"
  platform_scope: "all"
---

# Docs Style — Cẩm nang viết tài liệu kỹ thuật thực dụng

Mục tiêu: Tạo ra tài liệu kỹ thuật chuẩn xác, ngắn gọn, đi thẳng vào bản chất hệ thống để người đọc và maintainer nắm bắt ngay lập tức mà không cần đào bới toàn bộ mã nguồn.

---

## 1. Nguyên tắc cốt lõi (Grounded & Pragmatic)

1. **Sự thật từ mã nguồn (Source-grounded)**: Mọi thông tin về stack, lệnh chạy, routes, env vars, kiến trúc đều phải được kiểm chứng trực tiếp từ manifests, configs, imports và runtime thực tế. Không suy đoán hay chém gió tính năng chưa có.
2. **Phân định rõ ràng Hiện tại vs Tàn dư**:
   - **Hiện tại (Current)**: Tính năng đang hoạt động, có route, có import.
   - **Tàn dư (Legacy)**: Code cũ, cấu hình cũ còn sót lại nhưng không còn dùng -> ghi chú rõ vị trí hoặc đề xuất dọn dẹp.
   - **Dự kiến (Planned)**: TODO hoặc roadmap -> ghi rõ là dự kiến.
3. **Ưu tiên "Tại sao" trước "Như thế nào"**: Giải thích bài toán kỹ thuật, lý do lựa chọn kiến trúc và các đánh đổi (tradeoffs).
4. **Văn phong chuyên nghiệp, súc tích**: Viết gãy gọn, không văn mẫu, không thuật lại nhật ký agent ("Tôi thấy...", "Dự án này có vẻ..."). Dùng tiếng Việt chuẩn xác cho docs tiếng Việt, giữ nguyên thuật ngữ kỹ thuật tiếng Anh tự nhiên.

---

## 2. Tiêu chuẩn cấu trúc README

README là bộ mặt của dự án, cần giải đáp nhanh gọn các trọng tâm (linh hoạt theo quy mô, không ép buộc một skeleton cứng nhắc cho mọi dự án):
1. **Dự án là gì và giải quyết bài toán gì?** (1-2 câu súc tích mở đầu).
2. **Trạng thái hiện tại**: Đang chạy production, alpha, hay nội bộ?
3. **Tech Stack đã kiểm chứng**: Bảng hoặc danh sách ngắn gọn các công nghệ cốt lõi thực tế.
4. **Kiến trúc & Luồng dữ liệu chính**: Diagram ngắn gọn (Mermaid) hoặc tóm tắt boundary các thành phần.
5. **Hướng dẫn khởi chạy (Quickstart)**: Yêu cầu môi trường, cài đặt, env vars tối thiểu và lệnh chạy dev/build/test.
6. **Mục lục tài liệu mở rộng**: Lựa chọn theo nhu cầu khi dự án có tài liệu sâu hơn trong `/docs/`, không phải skeleton bắt buộc cho mọi dự án nhỏ/vừa.

> [!TIP]
> Tránh phình to README bằng các bảng route chi tiết hay log quyết định dài. Hãy đưa chúng vào thư mục `/docs/`.

---

## 3. Cấu trúc tài liệu (Theo nhu cầu người đọc — Diátaxis)

Tổ chức tài liệu linh hoạt theo nhu cầu thực tế của người đọc, phân định rõ 4 góc độ (không ép buộc một skeleton cứng nhắc nếu không cần thiết):

- **Tutorial (Học tập)**: Bài học từng bước cho người mới bắt đầu, đi từ con số 0 đến một ví dụ chạy được.
- **How-to Guide (Giải quyết vấn đề)**: Các bước hướng dẫn theo kịch bản vận hành thực tế (setup môi trường, deploy, migrate dữ liệu, runbook sự cố).
- **Reference (Tra cứu kỹ thuật)**: Thông số kỹ thuật, API contracts, CLI flags, cấu hình schemas; bảo toàn nguyên vẹn URL và path public.
- **Explanation (Giải thích kiến trúc)**: Bối cảnh thiết kế, boundaries, data flow và các quyết định đánh đổi (tradeoffs).

---

## 4. Hình ảnh & Visuals (Thực dụng, không hình thức)

- **Khi có UI hoặc CLI trực quan**: Đính kèm ảnh chụp màn hình hoặc terminal output khi khả thi và giúp người đọc dễ hình dung kết quả.
- **Không ép buộc cứng nhắc**: Nếu môi trường headless hoặc đang phát triển logic nền tảng, không dừng lại đòi hỏi ảnh; ưu tiên diagrams (Mermaid) và text output chuẩn xác.
- Lưu trữ asset tài liệu trong `docs/assets/` với tên file rõ nghĩa.

---

## 5. Kiểm tra an toàn và dọn dẹp tài liệu cũ

- **Kiểm chứng an toàn (Safe Verification)**: Mọi lệnh CLI, URL và file path nêu trong tài liệu phải được kiểm chứng an toàn (dry-run, syntax check, hoặc inspect source). Không đưa các lệnh có side-effect phá hủy mà không cảnh báo.
- **Bảo toàn nội dung vận hành**: Giữ nguyên các URL/path public và thông số vận hành đang phục vụ người dùng.
- **Dọn dẹp có trách nhiệm**: Tuyệt đối không xóa tài liệu cũ nếu chưa đọc kỹ nội dung. Chỉ xóa các log debug tạm hoặc ghi chú quá độ sau khi đã hợp nhất các thông tin kỹ thuật cốt lõi vào tài liệu chính thức.
