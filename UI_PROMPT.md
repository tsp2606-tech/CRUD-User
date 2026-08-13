# Prompt Tạo Giao Diện Cho Dự Án CRUD User API

*Sử dụng nội dung dưới đây làm prompt (câu lệnh) cho các AI tạo code UI (như v0.dev, Claude 3.5 Sonnet, ChatGPT) để tự động sinh ra mã nguồn Frontend hoàn chỉnh.*

---

## 📌 Nội Dung Prompt (Copy phần bên dưới)

**Nhiệm vụ của bạn:**
Hãy đóng vai một chuyên gia phát triển Frontend và UI/UX Designer. Dựa trên các API mô tả dưới đây, hãy tạo một ứng dụng web (Single Page Application) sử dụng React.js (hoặc Next.js) kết hợp với TailwindCSS.

**Yêu cầu về Thiết kế (UI/UX - Cực kỳ quan trọng):**
- Sử dụng phong cách thiết kế **hiện đại, cao cấp (Premium)**. Tránh các thiết kế quá cơ bản hoặc nhàm chán.
- Sử dụng hiệu ứng **Glassmorphism** (kính mờ), đổ bóng mềm mại (soft shadows) và các mảng màu gradient tinh tế.
- Tông màu (Color Palette): Hài hòa, có hỗ trợ chế độ Dark Mode bóng bẩy.
- Typography: Sử dụng các font chữ hiện đại như Inter, Roboto, hoặc Outfit.
- Animations: Thêm các micro-animations (hiệu ứng hover, transition mượt mà khi mở modal/dialog, hiệu ứng loading).
- Đảm bảo responsive hoàn toàn trên cả Mobile, Tablet và Desktop.

**Các tính năng và luồng tương tác cần có:**
1. **Trang chủ (Danh sách người dùng):**
   - Hiển thị danh sách người dùng dưới dạng một bảng dữ liệu (Data Table) hoặc lưới thẻ (Card Grid) đẹp mắt.
   - Các cột/thông tin cần có: Tên, Email, Tuổi, Ngày tạo.
   - Gọi API: `GET /api/users`

2. **Thêm người dùng mới:**
   - Có một nút nổi bật "Thêm người dùng" (Add User).
   - Khi bấm vào sẽ mở ra một Modal chứa Form thêm người dùng.
   - Các trường nhập liệu: Name (text, bắt buộc), Email (email, bắt buộc), Age (number).
   - Có xử lý validate form cơ bản và trạng thái loading khi submit.
   - Gọi API: `POST /api/users`

3. **Chỉnh sửa người dùng:**
   - Trong mỗi hàng/thẻ của người dùng, có nút "Sửa" (Edit).
   - Khi bấm vào, mở một Modal (hoặc Sheet) tải dữ liệu hiện tại lên Form.
   - Gọi API: `GET /api/users/{id}` (để lấy chi tiết, nếu cần) và `PUT /api/users/{id}` (khi lưu thay đổi).

4. **Xóa người dùng:**
   - Trong mỗi hàng/thẻ của người dùng, có nút "Xóa" (Delete) màu đỏ hoặc cảnh báo.
   - Khi bấm vào, hiện một Alert Dialog (hộp thoại xác nhận) hỏi người dùng có chắc chắn muốn xóa không.
   - Gọi API: `DELETE /api/users/{id}`

5. **Phản hồi người dùng (Toast Notifications):**
   - Hiển thị thông báo (Toast) dạng pop-up ở góc màn hình khi Thêm, Sửa, Xóa thành công hoặc có lỗi xảy ra.

**Thông tin các API để tích hợp (Base URL có thể config sau, sử dụng axios hoặc fetch):**
- **Lấy danh sách:** `GET /api/users` (Response: mảng các object `{ _id, name, email, age, createdAt, updatedAt }`)
- **Tạo mới:** `POST /api/users` (Payload: `{ name, email, age }`)
- **Lấy chi tiết:** `GET /api/users/{id}` 
- **Cập nhật:** `PUT /api/users/{id}` (Payload: `{ name, email, age }`)
- **Xóa:** `DELETE /api/users/{id}`

Hãy viết ra toàn bộ mã nguồn Frontend cần thiết (HTML/CSS/JS hoặc các Component React), ưu tiên sử dụng cấu trúc component tái sử dụng được (như Button, Modal, Input, Table). Code phải clean, dễ đọc và mô phỏng được logic gọi API thực tế.
