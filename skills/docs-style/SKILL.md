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

README là bộ mặt của dự án, cần trả lời nhanh 6 câu hỏi:
1. **Dự án là gì và giải quyết bài toán gì?** (1-2 câu súc tích mở đầu).
2. **Trạng thái hiện tại**: Đang chạy production, alpha, hay nội bộ?
3. **Tech Stack đã kiểm chứng**: Bảng hoặc danh sách ngắn gọn các công nghệ cốt lõi thực tế.
4. **Kiến trúc & Luồng dữ liệu chính**: Diagram ngắn gọn (Mermaid) hoặc tóm tắt boundary các thành phần.
5. **Hướng dẫn khởi chạy (Quickstart)**: Yêu cầu môi trường, cài đặt, env vars tối thiểu và lệnh chạy dev/build/test.
6. **Mục lục tài liệu sâu hơn**: Trỏ tới `/docs` nếu có.

> [!TIP]
> Tránh phình to README bằng các bảng route chi tiết hay log quyết định dài. Hãy đưa chúng vào thư mục `/docs/`.

---

## 3. Cấu trúc thư mục `/docs`

Tổ chức tài liệu theo nhu cầu thực tế của người đọc, không tạo các file trống rỗng:

- **Ứng dụng / Dịch vụ (Full Product / Backend / Web)**:
  - `docs/architecture.md`: Kiến trúc tổng quan, boundaries, data flow.
  - `docs/api-contracts.md`: Chi tiết routes, events, payload schemas (nếu không dùng OpenAPI/Swagger tự sinh).
  - `docs/operations.md`: Cấu hình production, deployment, migrations, monitoring, runbooks.
- **Thư viện / Tooling**:
  - `docs/getting-started.md`: Hướng dẫn tích hợp.
  - `docs/api-reference.md`: Chi tiết public API.

---

## 4. Hình ảnh & Visuals (Thực dụng, không hình thức)

- **Khi có UI hoặc CLI trực quan**: Đính kèm ảnh chụp màn hình hoặc terminal cast khi khả thi và giúp người đọc dễ hình dung giao diện/kết quả.
- **Không ép buộc cứng nhắc**: Nếu môi trường chạy không có browser, thiếu headless display, hoặc đang trong giai đoạn dev backend/headless, không cần dừng lại ép người dùng cung cấp ảnh. Ưu tiên diagrams (Mermaid) và text output chuẩn xác.
- Lưu trữ asset tài liệu trong `docs/assets/` với tên file rõ nghĩa.

---

## 5. Dọn dẹp tài liệu cũ (Docs Cleanup)

Khi tái cấu trúc tài liệu dự án:
- Gom các file markdown rải rác ở root vào `docs/` nếu hợp lý.
- Xóa bỏ các ghi chú migration đã hoàn thành từ lâu, log debug tạm, task artifacts tạm sau khi đã giữ lại các thông tin kỹ thuật quan trọng vào docs chính thức.
- Tuyệt đối không xóa tài liệu nếu chưa đọc kỹ nội dung.
