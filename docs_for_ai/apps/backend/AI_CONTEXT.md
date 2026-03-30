# BACKEND CONTEXT (NODE.JS + EXPRESS)

# TECH STACK
- Framework: Express.js
- Ngôn ngữ: JavaScript
- Database Client: `@supabase/supabase-js`
- Push Notification: `firebase-admin`

# QUY TẮC CODE BACKEND
1. Kiến trúc thư mục: Tuân thủ nghiêm ngặt mô hình MVC (Routes -> Controllers -> Services).
   - `routes/`: Chỉ định nghĩa endpoint và gọi middleware.
   - `controllers/`: Xử lý req/res, validate dữ liệu đầu vào.
   - `services/`: Chứa toàn bộ business logic, giao tiếp với Supabase DB và LLM (Gemini).
2. Xử lý Database:
   - Ưu tiên sử dụng phương thức query của Supabase SDK.
   - Với các truy vấn phức tạp hoặc Semantic Search (AI), sử dụng Supabase RPC (Remote Procedure Call) để gọi function từ Postgres.
3. Xử lý lỗi (Error Handling):
   - Sử dụng một middleware `errorHandler` tập trung.
   - Các controller phải được bọc trong block `try...catch` hoặc dùng thư viện `express-async-handler`.
4. Tích hợp AI:
   - Việc gọi API đến Gemini LLM phải được thực hiện ở tầng Service.
