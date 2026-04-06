# GIỚI THIỆU DỰ ÁN (PROJECT OVERVIEW)
Tên dự án: Refood - Nền tảng thương mại điện tử giải cứu thức ăn (Food Rescue Platform).
Kiến trúc: Monorepo (Backend Node.js, Web Admin React Vite, Mobile App Expo).
Ngôn ngữ lập trình duy nhất: JavaScript (ES6+). KHÔNG sử dụng TypeScript.

# TECH STACK CHÍNH
- Database & Authentication: Supabase (PostgreSQL).
- AI & Semantic Search: Supabase `pgvector`.
- Push Notification: Firebase Cloud Messaging (FCM).
- State Management (Client): Zustand.

# QUY TẮC VIẾT CODE CHUNG (GLOBAL CODING CONVENTIONS)
1. Bắt buộc sử dụng JavaScript thuần. Để đảm bảo tính chặt chẽ, HÃY sử dụng JSDoc comment cho các function quan trọng, model dữ liệu và API response.
2. Quy tắc đặt tên (Naming Conventions):
   - Database (Supabase): Tên bảng và tên cột bắt buộc dùng `snake_case` (ví dụ: `user_id`, `order_items`).
   - Biến và Hàm trong JavaScript: Bắt buộc dùng `camelCase` (ví dụ: `getUserData`, `orderList`).
   - Component React/React Native: Bắt buộc dùng `PascalCase` (ví dụ: `ProductCard.jsx`).
3. Tuyệt đối không nhầm lẫn giữa Supabase và Firebase:
   - Chỉ dùng Supabase cho DB (SQL), Storage (Upload ảnh), và Auth.
   - Chỉ dùng Firebase cho tính năng Push Notification (FCM). Không dùng Firestore hay Firebase Auth.

4. Frontend web React/Vite:
   - Dùng `react-router-dom` v6 cho routing.
   - App web chia theo namespace member: `a`, `b`, `c`, `d`, `e`.
   - Mỗi member có đủ 5 route: `/:member/shop`, `/:member/products`, `/:member/products/:id`, `/:member/cart`, `/:member/checkout`.
   - Code dùng chung phải đặt ở `src/shared/`, router shell ở `src/app/router/`, page theo flow đặt ở `src/features/`.
   - Ưu tiên tạo component tái sử dụng thay vì copy-paste giữa các member.

