# 🍔 Refood - Food Rescue E-Commerce Platform

> **Monorepo gồm:**
>
> - **Backend:** Node.js
> - **Web Admin:** React Vite
> - **Mobile App:** Expo

## 🐳 Docker setup cho cả Linux + Windows

Mục tiêu: mọi thành viên dùng chung một quy trình chạy dự án, tránh lỗi lệch môi trường.

### 1) Yêu cầu

- Docker Desktop (Windows) hoặc Docker Engine + Docker Compose plugin (Linux)
- Với Windows: bật WSL2 backend trong Docker Desktop để bind mount ổn định hơn

### 2) Tạo file env dùng chung

Ở thư mục gốc project:

```bash
cp .env.example .env
```

Điền các key bắt buộc trong `.env` (ít nhất là Supabase/JWT).

### 3) Chạy toàn bộ stack

```bash
npm run docker:up
```

Hoặc chạy setup tự động theo OS:

```bash
# Linux
npm run setup:linux

# Windows (PowerShell)
npm run setup:windows
```

Service sau khi chạy:

- Web: `http://localhost:5173`
- Backend API: `http://localhost:3000`
- Postgres (pgvector): `localhost:5432`
- Redis: `localhost:6379`
- PgAdmin: `http://localhost:5050`

### 4) Xem log / dừng / reset volume

```bash
npm run docker:logs
npm run docker:down
npm run docker:clean
```

### 5) Lưu ý chống lỗi khác OS

- Compose đã bật polling cho web (`CHOKIDAR_USEPOLLING=true`) để hot reload ổn hơn trên Windows.
- Backend chạy `nodemon --legacy-watch` để hạn chế lỗi file watcher khi bind mount.
- Không commit file `.env` thật; chỉ commit `.env.example`.

> **Lưu ý:** Để đảm bảo codebase sạch, đồng nhất và tận dụng tối đa AI (Cursor/GitHub Copilot), **mọi thành viên BẮT BUỘC** đọc kỹ và làm theo hướng dẫn dưới đây trước khi code.

---

## 🤖 1. Hướng dẫn sử dụng AI Context Files

Dự án là **Monorepo** với nhiều stack (Node.js, React, React Native). Nếu AI không được "dạy" đúng context, có thể sinh ra code sai (ví dụ: nhét `<div>` vào code Mobile).

**ĐÃ CÓ SẴN** các file ngữ cảnh `AI_CONTEXT.md` ở từng thư mục để "huấn luyện" AI quy tắc code riêng cho từng phần.

### Cách sử dụng:

#### **Với Cursor IDE**

- Cursor tự nhận diện file `.cursorrules` (có thể rename từ `AI_CONTEXT.md`).
- Chỉ cần mở file code trong thư mục nào, Cursor sẽ tự áp dụng luật của thư mục đó.

#### **Với GitHub Copilot / IntelliJ AI Assistant**

- Khi mở khung Chat để nhờ AI viết code, hãy **@-mention** file `AI_CONTEXT.md` tương ứng với thư mục bạn đang làm việc.
    - Ví dụ: Đang code App Mobile, gõ vào chat:
        ```
        @apps/mobile/AI_CONTEXT.md Viết cho tôi component hiển thị giỏ hàng bằng Zustand.
        ```

> ⚠️ **Quy tắc tối thượng:** Không nhờ AI viết code chung chung. **Luôn ép AI tuân thủ file Context** để giữ chuẩn đặt tên (camelCase, snake_case) và kiến trúc thư mục.

---

## 📝 2. Chuẩn hóa Commit với `.gitmessage`

Dự án áp dụng **Conventional Commits** để dễ review và theo dõi lịch sử. Đã có sẵn file `.gitmessage` ở thư mục gốc.

### **Bước 1: Setup template commit (chỉ làm 1 lần)**

Mở Terminal tại thư mục gốc và chạy:

```bash
git config --local commit.template .gitmessage
```

### **Bước 2: Cách commit chuẩn**

Từ giờ, **KHÔNG dùng** `git commit -m "..."`. Thay vào đó:

```bash
git commit -e -F .gitmessage
```

Lúc này, Terminal (hoặc VSCode/IntelliJ) sẽ tự động mở file template. Bạn chỉ cần:

- **Bỏ dấu # ở dòng đầu tiên và điền thông tin** (VD: `feat(mobile): add shopping cart UI`).
- Điền thêm mô tả chi tiết ở phần [Body] nếu logic phức tạp.
- Lưu file và đóng cửa sổ editor (nếu dùng Nano: Ctrl+O, Enter, Ctrl+X). Git sẽ tự động hoàn tất commit!

---

## 🌿 3. Luồng làm việc Git (Branching Workflow)

### **Quy tắc chung:**

- 🚫 **KHÔNG BAO GIỜ** code hay push trực tiếp lên nhánh `main` hoặc `develop`.
- `main`: Nhánh production (chỉ Leader được merge).
- `develop`: Nhánh gom code để test. **Tất cả thành viên phải rẽ nhánh từ đây.**

### **Quy trình làm việc chuẩn:**

1. **Đứng ở nhánh `develop` và pull code mới nhất:**
    ```bash
    git checkout develop
    git pull origin develop
    ```
2. **Tạo nhánh làm việc mới:**
    - Tên nhánh theo format: `<type>/<scope>-<tên-task>`
    - Ví dụ: `feat/admin-login-page`, `fix/mobile-cart-bug`, `chore/web-update-readme`
    - Lệnh tạo nhánh:
        ```bash
        git checkout -b feat/admin-login-page
        ```
3. **Code và Commit** (nhớ dùng `git commit` để bật template).
4. **Đẩy code lên remote:**
    ```bash
    git push -u origin <tên-nhánh-của-bạn>
    ```
5. **Tạo Pull Request (PR) trên GitHub** để merge vào `develop`. **Nhờ thành viên khác review & approve.**

### **Chi tiết về đặt tên branch:**

| Loại (type) | Ý nghĩa                                     | Ví dụ                 |
| ----------- | ------------------------------------------- | --------------------- |
| feat        | Thêm mới tính năng                          | feat/mobile-cart      |
| fix         | Sửa bug                                     | fix/web-login-bug     |
| chore       | Công việc phụ trợ (update doc, config, ...) | chore/update-readme   |
| refactor    | Cải tổ code, không đổi chức năng            | refactor/backend-auth |
| test        | Thêm/sửa test                               | test/api-user         |

**scope**: Chỉ rõ module/phần ảnh hưởng (mobile, web, backend, admin, ...)

**tên-task**: Mô tả ngắn gọn task (bằng tiếng Anh hoặc Việt không dấu)

**Ví dụ tổng hợp:**

- `feat/mobile-cart-add`
- `fix/web-login-bug`
- `chore/backend-update-env`
- `refactor/admin-user-table`

---

## 📚 Tài liệu tham khảo

- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [Git Branching Model](https://nvie.com/posts/a-successful-git-branching-model/)

## ⚙️ Tài liệu triển khai nội bộ

- [Git workflow cho team](docs_for_ai/GIT_WORKFLOW.md)
- [Supabase setup backend](docs_for_ai/apps/backend/SUPABASE_SETUP.md)
- [Backend architecture MVC](apps/backend/README_ARCHITECTURE.md)
