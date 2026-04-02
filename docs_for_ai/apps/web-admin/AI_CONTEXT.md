# WEB ADMIN CONTEXT (REACT + VITE)

# TECH STACK
- Framework: React (build bằng Vite)
- Ngôn ngữ: JavaScript (.jsx)
- State Management: Zustand
- Styling: Material UI

# QUY TẮC CODE WEB FRONTEND
1. React UI:
   - Viết Functional Components. Tuyệt đối không dùng Class Components.
   - Quản lý side-effects bằng `useEffect` cẩn thận, nhớ dọn dẹp (cleanup) để tránh memory leak.
2. Quản lý State với Zustand:
   - Chia nhỏ các store theo tính năng (ví dụ: `useAuthStore`, `useProductStore`).
   - Trong Zustand store, phải có các action rõ ràng để call API và update state.
3. Fetch Data:
   - Dùng `axios` hoặc `fetch` để gọi API tới Backend Node.js.
   - Bắt buộc xử lý đủ 3 trạng thái: `loading`, `success`, `error` khi render UI.
4. Routing:
   - Sử dụng `react-router-dom` v6.
   - Tổ chức code theo logic trang (Pages) và thành phần (Components tái sử dụng).
