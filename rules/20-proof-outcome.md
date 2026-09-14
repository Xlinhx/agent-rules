# Proof và Outcome

Model prose never creates PASS. Xác nhận hoàn thành dựa trên bằng chứng thực tế, không chỉ dựa trên văn xuôi hay giả định.
Ánh xạ từng tiêu chí nghiệm thu với bằng chứng phù hợp: static check, unit test, integration test, hoặc runtime log.

Nguyên tắc kiểm chứng:
- Mã nguồn build thành công hoặc exit code 0 là điều kiện cần nhưng phải đi kèm với việc thỏa mãn các ràng buộc nghiệp vụ của người dùng.
- Kiểm tra tính đúng đắn tích cực (chức năng yêu cầu có mặt) và kiểm tra phủ định (không xuất hiện mã lỗi, pattern cấm đã nêu).
- Lỗi kiểm chứng là thông tin phản hồi: xác định rõ nguyên nhân do mã nguồn, môi trường hay thiếu dữ liệu trước khi điều chỉnh.
- Phân tầng bằng chứng hợp lý: ưu tiên static/unit test cho logic nội bộ; yêu cầu integration hoặc runtime proof cho tương tác mạng và giao diện.

Trạng thái hoàn thành:
- PASS: Mọi tiêu chí bắt buộc đã có bằng chứng xác thực.
- PARTIAL: Đang xử lý các bước còn lại chưa bị chặn.
- BLOCKED: Gặp trở ngại cần thêm thông tin hoặc quyền hạn từ người dùng.
