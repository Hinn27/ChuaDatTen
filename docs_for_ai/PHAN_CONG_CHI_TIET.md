# 📋 PHÂN CÔNG CHI TIẾT NHÓM 4 NGƯỜI

---

## 👤 **THÀNH VIÊN 1: Kiến trúc Hệ thống, Hạ tầng & Backend Lõi**

### **A. NHIỆM VỤ CODE (Node.js/Express + Supabase + Firebase)**

#### **1. Thiết lập Hạ tầng & Môi trường**

- [ ] Viết/maintain file `docker-compose.yml` (Node.js, PostgreSQL, Redis)
- [ ] Setup cấu trúc thư mục MVC: `controllers/`, `services/`, `routes/`, `middleware/`, `models/`
- [ ] Định nghĩa Git workflow (main, develop, feature branches)
- [ ] Setup `.env` template với biến quan trọng (DB_URL, GEMINI_API_KEY, FIREBASE_KEY, JWT_SECRET...)

#### **2. Triển khai Supabase (PostgreSQL + Auth + Storage + Realtime)**

- [ ] **Database Schema:**
    - [ ] Tạo bảng: `users`, `products`, `categories`, `orders`, `order_items`, `chat_history`, `product_vectors`
    - [ ] Thiết lập ràng buộc (constraints): Foreign Key, NOT NULL, UNIQUE, Check
    - [ ] Tạo Index trên columns hay dùng: `category_id`, `status`, `created_at`
    - [ ] Vẽ & ghi rõ ERD (Entity-Relationship Diagram)

- [ ] **Row Level Security (RLS):**
    - [ ] Policy cho bảng `users`: Người dùng chỉ xem thông tin của chính mình
    - [ ] Policy cho bảng `orders`: Khách chỉ xem đơn của mình, Admin xem tất cả
    - [ ] Policy cho bảng `chat_history`: Mỗi user chỉ xem chat của chính mình
    - [ ] **Policy cho Storage (ảnh):**
        - Admin (role 'admin') được upload/delete ảnh
        - Công khai (public) được read ảnh

- [ ] **Supabase Auth:**
    - [ ] Cấu hình JWT secret
    - [ ] Tạo trigger tự động tạo user profile khi signup
    - [ ] Hỗ trợ email/password auth

- [ ] **Supabase realtime:**
    - [ ] Enable realtime cho bảng `orders`
    - [ ] Test subscription orders table changes

#### **3. API Backend Cốt lõi (Express)**

**API Xác thực:**

- [ ] `POST /api/auth/register` - Đăng ký user
- [ ] `POST /api/auth/login` - Đăng nhập, trả JWT
- [ ] `POST /api/auth/refresh-token` - Refresh JWT
- [ ] `POST /api/auth/logout` - Logout
- [ ] `GET /api/auth/me` - Lấy thông tin user hiện tại (protected)

**API Sản phẩm:**

- [ ] `GET /api/products` - Lấy danh sách sp (phân trang, filter)
- [ ] `GET /api/products/:id` - Chi tiết sp
- [ ] `GET /api/products/stats/bestsellers` - Top bán chạy (global + by category)
- [ ] `GET /api/products/stats/regional-bestsellers` - Top bán chạy theo vùng (đã làm)
- [ ] `POST /api/products` - Admin: Thêm sp (protected, admin-only)
- [ ] `PUT /api/products/:id` - Admin: Sửa sp (protected, admin-only)
- [ ] `DELETE /api/products/:id` - Admin: Xóa sp (protected, admin-only)

**API Đặt hàng (CRITICAL - Transaction):**

- [ ] `POST /api/orders/checkout` - Tạo đơn hàng
    - [ ] **Logic Transaction:**
        - Kiểm tra tồn kho từng sản phẩm
        - Trừ số lượng sản phẩm trong stock
        - Tạo record `orders` + `order_items`
        - Nếu lỗi → Rollback tất cả
    - [ ] Trả về order ID, status, total
    - [ ] Trigger thông báo Firebase sau khi tạo thành công

- [ ] `GET /api/orders` - Lấy danh sách đơn của user (protected)
- [ ] `GET /api/orders/:id` - Chi tiết đơn (protected)
- [ ] `PUT /api/orders/:id/status` - Admin: Cập nhật trạng thái đơn
    - [ ] Trigger email/FCM notification ko user sau khi status thay đổi

**API Chat & AI (phối hợp Thành viên 2):**

- [ ] Cấu hình Gemini API key bên Backend (KHÔNG gọi từ Frontend)
- [ ] `POST /api/chat` - Chat với Chatbot (gọi Gemini + Vector Search)
- [ ] `GET /api/chat/history` - Lấy lịch sử chat của user

**API Tìm kiếm (phối hợp Thành viên 2):**

- [ ] `GET /api/search` - Semantic search dùng Vector DB

#### **4. Middleware & Error Handling**

- [ ] `auth.middleware.js` - JWT verification
- [ ] `admin.middleware.js` - Kiểm tra role admin
- [ ] `error.middleware.js` - Xử lý & log lỗi tập trung
- [ ] Setup logging system (Winston/Pino)
- [ ] Xử lý error cases: Network timeout, DB constraint, validation...

#### **5. Firebase Admin SDK Integration**

- [ ] Cấu hình Firebase Admin SDK trên Express
- [ ] Hàm gửi Push Notification: `sendNotification(fcmToken, title, body)`
- [ ] Trigger thông báo khi:
    - [ ] Đơn hàng được tạo thành công
    - [ ] Trạng thái đơn thay đổi (Đang giao, Đã giao...)
    - [ ] Admin reply chat

#### **6. Redis Caching (Performance)**

- [ ] Cache bestseller stats (TTL: 1 giờ)
- [ ] Cache danh sách category
- [ ] Invalidate cache khi Admin thêm/sửa sp

#### **7. Testing**

- [ ] Unit test cho API Checkout (kiểm tra transaction, stock logic)
- [ ] Integration test cho loạn request đồng thời
- [ ] Test error cases (out of stock, invalid order...)

---

### **B. NHIỆM VỤ BÁO CÁO**

#### **Chương 1: Tổng quan (3-4 trang)**

- [ ] Mở đầu: Lý do chọn đề tài
- [ ] Mục tiêu & phạm vi
- [ ] Phân công công việc chi tiết 4 người
- [ ] Timeline/Deadline dự kiến

#### **Chương 2: Thiết kế Dữ liệu (5-6 trang)**

- [ ] Vẽ **ERD (Entity-Relationship Diagram)** đầy đủ
    - Các bảng: users, products, categories, orders, order_items, chat_history, product_vectors
    - Quan hệ 1-N, constraints, primary/foreign keys
- [ ] Giải thích các constraints quan trọng
- [ ] Liệt kê các RLS Policy đã áp dụng (ai được làm gì)

#### **Chương 3: Kiến trúc & Giải pháp (6-8 trang)**

- [ ] **Sơ đồ kiến trúc hệ thống tổng thể:**
    - React (Frontend) → Express (Backend) → Supabase (DB) → Firebase (Notification) → Gemini (AI)
    - Cloud Storage (ảnh sản phẩm)

- [ ] **Giải thích công nghệ:**
    - Tại sao chọn Supabase thay vì quản lý DB riêng?
    - Tại sao dùng Express thay vì serverless?
    - Tại sao dùng Docker?

- [ ] **Luồng thuật toán Checkout (Transaction):**
    - Flowchart: Validate → Check stock → Deduct → Create Order → Notify
    - Xử lý race condition khi nhiều user checkout cùng lúc

- [ ] **Bảo mật & JWT:**
    - Cách lưu trữ JWT
    - Cách verify token trên mỗi API

---

### **C. DELIVERABLES**

- [ ] Code Backend đầy đủ trên git
- [ ] File `.env.example` có tất cả biến cần thiết
- [ ] Document API (Postman/Swagger)
- [ ] Báo cáo 2 chương (PDF, 15-20 trang)

---

## 👤 **THÀNH VIÊN 2: Backend AI & Tích hợp Dịch vụ**

### **A. NHIỆM VỤ CODE (Node.js/Express + Gemini + pgvector + Supabase)**

#### **1. Vector Database & pgvector (PostgreSQL)**

- [ ] Kích hoạt extension `pgvector` trên Supabase
- [ ] Tạo cột `product_vectors` (tipe: `vector(768)`) trong bảng `products`
- [ ] Tạo Index HNSW hoặc IVFFlat trên vector column để tối ưu query

#### **2. Cấu hình Gemini API**

- [ ] Setup Gemini API key trên `.env`
- [ ] Tạo module `gemini.service.js`:
    - Hàm gọi Gemini API an toàn
    - Xử lý retry + timeout
    - Rate limiting

#### **3. Tích hợp Auto Embeddings**

- [ ] Khi Admin thêm/sửa sản phẩm → Backend tự động:
    - [ ] Lấy `product.name + description`
    - [ ] Gọi Gemini để generate embedding (768 chiều)
    - [ ] Lưu vector vào cột `product_vectors`

- [ ] Hàm: `async generateAndSaveEmbedding(productId, text)`

#### **4. Xây dựng Hệ thống RAG (Retrieval-Augmented Generation)**

**API Chat:**

- [ ] `POST /api/chat` - Xử lý chat với Chatbot:
    1. Nhận message từ user
    2. **Vector Search:** Chuyển user query thành embedding, tìm top 3 sản phẩm gần nhất (Cosine Similarity)
    3. **Prompt Engineering:** Nhúng (inject) thông tin 3 sản phẩm vào prompt cho Gemini
    4. Gemini sinh đáp án tự nhiên
    5. Lưu chat session vào `chat_history` table
    6. Trả về response dạng text/Markdown

- [ ] Hàm helper: `async findSimilarProducts(query, topK = 3)` - Dùng cosine_similarity

**Chat History:**

- [ ] Lưu toàn bộ chat session vào Supabase
- [ ] `GET /api/chat/history?userId=xxx` - Lấy lịch sử chat
- [ ] Khi chat tiếp theo, include context từ lịch sử trước đó (context window)

#### **5. Semantic Search API**

- [ ] `GET /api/search?q=phở hà nội` - Semantic search:
    1. Chuyển query thành vector
    2. Tìm top N products có vector gần nhất
    3. Trả về danh sách sản phẩm (KHÔNG dùng LIKE bình thường)

- [ ] Hàm: `async semanticSearch(userQuery, limit = 10)`

#### **6. Prompt Engineering cho AI**

- [ ] Thiết kế system prompt để AI đóng vai nhân viên tư vấn món ăn:

```
Bạn là nhân viên tư vấn món ăn chuyên nghiệp của Chùa Cơ Tên.
Dựa trên thông tin sản phẩm được cấp, hãy:
1. Gợi ý món ăn phù hợp với yêu cầu của khách
2. Giải thích lý do và công dụng
3. Nêu giá, thành phần chính
4. Đề nghị kèm theo nước uống
5. Tuyệt đối không bịa chuyện ngoài thông tin sản phẩm
```

#### **7. Testing & Optimization**

- [ ] Unit test: Embedding generation, cosine similarity calculation
- [ ] Integration test: Vector search accuracy
- [ ] Performance test: Latency của Gemini API (target < 2s)
- [ ] Test cases:
    - Query "phở hà nội" → trả về phở, không trả mì
    - Query "đồ ăn vặt" → trả về các loại chiên, không trả cơm

---

### **B. NHIỆM VỤ BÁOÁO**

#### **Chương 2: Cơ sở Lý thuyết Công nghệ (8-10 trang)**

- [ ] **Mô hình Ngôn ngữ Lớn (LLM):**
    - LLM là gì? Gemini hoạt động như thế nào?
    - Prompt Engineering cơ bản

- [ ] **Vector Database & Embedding:**
    - Embedding là gì? (biểu diễn semantic của text trong không gian vector)
    - pgvector: Cách lưu trữ, index

- [ ] **Thuật toán Cosine Similarity:**
    - Công thức toán học
    - Tại sao dùng nó để so sánh semantic?

- [ ] **Kiến trúc RAG (Retrieval-Augmented Generation):**
    - RAG là gì? Khác gì với LLM thuần?
    - Luồng hoạt động: Query → Retrieve → Generate
    - Ưu điểm: Tránh hallucination, có thể cập nhật data mà không train lại model

#### **Chương 3: Thiết kế & Triển khai (7-8 trang)**

- [ ] **Flowchart Hệ thống RAG:**

    ```
    User query
      ↓
    Generate embedding (Gemini)
      ↓
    Vector search (Cosine Similarity, pgvector)
      ↓
    Retrieve top 3 products
      ↓
    Prompt engineering (inject products info)
      ↓
    Gọi Gemini
      ↓
    Trả lời user (Markdown format)
      ↓
    Lưu chat_history
    ```

- [ ] **Code architecture:**
    - `gemini.service.js`: Gọi Gemini API
    - `embedding.service.js`: Generate & save embeddings
    - `search.service.js`: Semantic search
    - `chat.service.js`: RAG logic

- [ ] **Security:**
    - API key bảo mật (không expose từ Frontend)
    - Rate limiting trên Gemini (tránh tốn tiền)

#### **Chương 4: Kiểm thử & Đánh giá (6-8 trang)**

- [ ] **Test cases chi tiết:**

    | Query           | Expected Products  | Actual | Pass/Fail |
    | --------------- | ------------------ | ------ | --------- |
    | "phở hà nội"    | Phở, Bún phở       | ✓      | ✓         |
    | "đồ chiên giòn" | Chả cá, Gà chiên   | ✓      | ✓         |
    | "nước mát"      | Trà đá, Nước chanh | ✓      | ✓         |

- [ ] **Performance metrics:**
    - Embedding generation time: ~0.5s
    - Vector search time: ~50ms
    - Gemini API response: ~1-2s
    - Total latency: ~2-3s (acceptable)

- [ ] **Độ chính xác semantic search:**
    - Precision@3: Bao nhiêu % top 3 kết quả đúng/liên quan?
    - Recall@10: Bao nhiêu % sản phẩm liên quan được tìm thấy?

---

### **C. DELIVERABLES**

- [ ] Code RAG & Semantic search đầy đủ
- [ ] Database schema với pgvector
- [ ] Prompt templates (lưu trong code hoặc config file)
- [ ] Test results & accuracy metrics
- [ ] Báo cáo 2 chương (15-20 trang)

---

## 👤 **THÀNH VIÊN 3: Frontend Khách hàng (Storefront) & UI/UX**

### **A. NHIỆM VỤ CODE (React + Material-UI + TanStack Query + Zustand + Firebase)**

#### **1. Giao diện Storefront (Responsive UI)**

**Trang chủ (HomePage):**

- [ ] Hero section với CTA (tìm kiếm)
- [ ] 5 category cards (Cơm, Bún/Mì/Phở, Đồ chiên, Nước uống, Tráng miệng)
- [ ] Top bestsellers (4-8 sản phẩm)
- [ ] Regional bestsellers (3 vùng: Bắc, Trung, Nam) - ✓ **Đã làm**
- [ ] Blog/Testimonials
- [ ] Footer

**Trang Danh mục (Category/Shop):**

- [ ] Lưới hiển thị sản phẩm (4 cột responsive)
- [ ] Filter: Price, Rating, Sort (mới nhất, bán chạy)
- [ ] Pagination
- [ ] Search bar integrate semantic search
- [ ] Product skeleton loader

**Trang Chi tiết Sản phẩm (ProductDetail):**

- [ ] Hình ảnh (gallery, zoom)
- [ ] Thông tin: Tên, giá, rating, mô tả
- [ ] "Add to Cart" button
- [ ] Liên quan sản phẩm (related products)
- [ ] Reviews/Ratings (nếu có)

**Trang Giỏ hàng (Cart):**

- [ ] Danh sách sản phẩm đã add
- [ ] Chỉnh sửa số lượng, xóa sp
- [ ] Tính tổng tiền (có discount nếu dùng)
- [ ] "Proceed to Checkout" button

**Trang Thanh toán (Checkout):**

- [ ] Nhập địa chỉ giao hàng
- [ ] Chọn phương thức thanh toán (COD, online)
- [ ] Review order trước khi submit
- [ ] Xác nhận đơn hàng
- [ ] Validation: Địa chỉ lẻ, tên người dùng...

**Trang Đơn hàng (Orders):**

- [ ] Danh sách đơn của user
- [ ] Chi tiết từng đơn (status, items, total, tracking...)
- [ ] Real-time status update (realtime từ Backend)
- [ ] Action: Cancel, Reorder

**Auth Pages:**

- [ ] **Login:**
    - Email + password
    - "Forgot password?" link
    - "Sign up" link
    - Remember me (optional)

- [ ] **Register:**
    - Email, password, confirm password
    - Validate: Email format, password strength
    - T&C checkbox
    - "Login" link

- [ ] **Logout:** Simple button trong menu

#### **2. AI Chatbot (Floating Chat)**

- [ ] Floating button ở góc dưới phải (📱 icon)
- [ ] Click → Mở floating chat window
- [ ] Chat interface:
    - [ ] Hiển thị lịch sử chat
    - [ ] Input field + Send button
    - [ ] Typing indicator: "AI đang gõ..." (animated dots)
    - [ ] Message styling: User (bên phải, blue), AI (bên trái, gray)
    - [ ] Render Markdown nếu AI trả về list hoặc in đậm

- [ ] Hàm: `askChat(message)` → gọi `/api/chat`

#### **3. State Management (Zustand)**

**Store: `cartStore`**

```javascript
{
  items: [{id, name, price, quantity, image}],
  addItem(product),
  removeItem(productId),
  updateQuantity(productId, qty),
  clearCart(),
  getTotal(),
}
```

**Store: `authStore`**

```javascript
{
  user: {id, email, name, role},
  token: JWT,
  isAuthenticated: boolean,
  login(email, password),
  logout(),
  register(email, password, name),
}
```

**Store: `uiStore`**

```javascript
{
  isChatOpen: boolean,
  toggleChat(),
  notify(message, type), // Toast notification
}
```

#### **4. Data Fetching (TanStack Query)**

**Queries:**

- [ ] `useProducts()` - Fetch danh sách sp (có pagination, filter)
- [ ] `useProductById(id)` - Chi tiết sp
- [ ] `useCategories()` - Danh sách category
- [ ] `useRegionalBestsellers()` - Top vùng
- [ ] `useOrders()` - Danh sách đơn của user (protected)
- [ ] `useOrderById(id)` - Chi tiết đơn (protected)
- [ ] `useChatHistory(userId)` - Lịch sử chat
- [ ] `useSearch(query)` - Semantic search

**Mutations:**

- [ ] `useAddToCart()` - Add sp vào giỏ
- [ ] `useCheckout()` - Tạo đơn hàng (POST /orders/checkout)
- [ ] `useLogin()` - Đăng nhập
- [ ] `useRegister()` - Đăng ký
- [ ] `useLogout()` - Đăng xuất
- [ ] `useSendMessage()` - Gửi message chat
- [ ] `useCancelOrder()` - Hủy đơn

#### **5. Firebase Client + Push Notification**

- [ ] Cấu hình Firebase SDK trên React
- [ ] Xin quyền gửi thông báo từ trình duyệt
- [ ] Lấy FCM token thiết bị → gửi lên Backend (save vào DB)
- [ ] Listen thông báo từ Backend (onMessage)
- [ ] Hiển thị Toast/Snackbar khi nhận notification:
    - "Đơn #123 đang giao"
    - "Đơn #123 đã giao"
    - "Chatbot trả lời message mới"

#### **6. Validation & Error Handling (Frontend)**

- [ ] Validate form: Email, password strength, required fields
- [ ] Validate giỏ hàng: Số lượng min/max, giá cả hợp lệ
- [ ] Validate checkout: Địa chỉ, tên người dùng
- [ ] Error boundary components
- [ ] Display error toast nếu API fail

#### **7. Optimization**

- [ ] Code splitting: Lazy load pages (HomePage, ProductDetail, Cart...)
- [ ] Image lazy loading
- [ ] Memoize components (React.memo, useMemo)
- [ ] Debounce search input

#### **8. Testing**

- [ ] E2E tests: Add to cart → Checkout → Order confirm
- [ ] Component tests cho Cart, Chat, ProductCard
- [ ] Mock API responses

---

### **B. NHIỆM VỤ BÁOÁO**

#### **Chương 2: Thiết kế Hệ thống (5-6 trang)**

- [ ] **Use Case Diagram cho Khách hàng:**
    - Actors: Customer, Admin, System
    - Use cases: Browse products, Search, Add to cart, Checkout, Chat, Track order

- [ ] **Flowchart chi tiết:**
    - **Flowchart 1:** Thêm giỏ → Checkout flow

        ```
        Browse → Select product → Add to cart
          ↓
        View cart
          ↓
        Proceed to checkout
          ↓
        Fill address → Confirm order
          ↓
        Payment (COD/Online)
          ↓
        Order confirmed ✓
        ```

    - **Flowchart 2:** Chat với Chatbot
        ```
        Click chat icon
          ↓
        Type question
          ↓
        Send message
          ↓
        AI generating...
          ↓
        Show response + product suggestion
          ↓
        Add product to cart (optional)
        ```

#### **Chương 3: Frontend Architecture & Công nghệ (7-8 trang)**

- [ ] **Cấu trúc thư mục ReactJS:**

    ```
    src/
      ├── pages/          # Pages (HomePage, Cart, Orders...)
      ├── components/     # Reusable components (ProductCard, CartItem...)
      ├── hooks/          # Custom hooks (useCart, useAuth...)
      ├── store/          # Zustand stores
      ├── services/       # API calls, Firebase config
      ├── utils/          # Helper functions
      └── App.jsx
    ```

- [ ] **Tại sao dùng Zustand thay vì Redux?**
    - Redux quá phức tạp cho app nhỏ
    - Zustand: Setup đơn giản, ít boilerplate, lightweight

- [ ] **Tại sao dùng Material-UI?**
    - Rich component library (Button, Card, Table, Form...)
    - Theme customization
    - Responsive out-of-box
    - Community support

- [ ] **TanStack Query (React Query) Benefits:**
    - Auto caching & synchronization
    - Reduce boilerplate useEffect
    - Background refetching
    - Mutations + optimistic updates

- [ ] **State Management Strategy:**
    - Global state (Zustand): Auth, Cart, UI
    - Server state (TanStack Query): Products, Orders
    - Local state: Form inputs, UI toggles

#### **Chương 4: Demo & Hướng dẫn Sử dụng (6-8 trang)**

- [ ] Screenshots của từng trang
- [ ] Hướng dẫn:
    - Cách duyệt sản phẩm & tìm kiếm
    - Cách thêm vào giỏ hàng
    - Cách thanh toán
    - Cách theo dõi đơn hàng
    - Cách dùng chatbot
    - Cách bật/tắt thông báo

---

### **C. DELIVERABLES**

- [ ] Code React đầy đủ (pages, components, hooks, stores)
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Firebase config & Service Worker (PWA)
- [ ] `.env.example` file
- [ ] Báo cáo 2 chương (15-20 trang) + Screenshots

---

## 👤 **THÀNH VIÊN 4: Frontend Web (Admin Dashboard)**

### **A. NHIỆM VỤ CODE (React + Material-UI + TanStack Query + Zustand + Supabase Storage)**

#### **1. Layout Admin (Sidebar + Header + Main Content)**

- [ ] **Header:**
    - [ ] Logo/Brand name
    - [ ] Hello [Admin name]
    - [ ] Notifications bell (nếu có)
    - [ ] User profile dropdown (Settings, Logout)

- [ ] **Sidebar:**
    - [ ] Navigation menu: Dashboard, Products, Orders, Analytics, Settings
    - [ ] Collapsible trên mobile
    - [ ] Active state indicator

- [ ] **Main content area:** Responsive grid layout

#### **2. Dashboard (Overview Page)**

- [ ] **Widgets:**
    - [ ] Total revenue (tháng này, tháng trước)
    - [ ] Total orders (pending, processing, completed)
    - [ ] Total users
    - [ ] Top products (mini chart)

- [ ] **Charts:**
    - [ ] Revenue trend (line chart)
    - [ ] Orders by status (pie chart)
    - [ ] Top selling categories (bar chart)

- [ ] Dùng library: Recharts hoặc Chart.js

#### **3. Quản lý Sản phẩm**

**Trang danh sách (Product List):**

- [ ] **Bảng dữ liệu:**
    - Columns: ID, Tên, Danh mục, Giá, Tồn kho, Status, Actions (Edit, Delete)
    - Pagination
    - Sort (mặc định: mới nhất)
    - Search: Tìm theo tên sp
    - Filter: By category, price range, status

- [ ] **Actions:**
    - [ ] Edit: Click → Mở form edit inline hoặc modal
    - [ ] Delete: Click → Confirm modal → Delete

**Trang thêm/sửa sản phẩm (Add/Edit Product):**

- [ ] **Form fields:**
    - [ ] Tên sản phẩm (required)
    - [ ] Danh mục (dropdown)
    - [ ] Giá (number, required)
    - [ ] Giá gốc (number, optional)
    - [ ] Mô tả (textarea)
    - [ ] Tồn kho (number)
    - [ ] Status (Active/Inactive)
    - [ ] **Upload ảnh:**
        - [ ] Drag-drop hoặc click to select
        - [ ] Upload lên Supabase Storage
        - [ ] Preview ảnh
        - [ ] Lấy URL public
        - [ ] Gắn vào form

- [ ] **Validation:**
    - [ ] Tên không được trống
    - [ ] Giá > 0
    - [ ] Ảnh format hợp lệ (jpg, png, webp)

- [ ] **Submit:**
    - [ ] POST /api/products (thêm)
    - [ ] PUT /api/products/:id (sửa)
    - [ ] Success toast: "Lưu thành công"

#### **4. Quản lý Đơn hàng**

**Trang danh sách đơn (Order List):**

- [ ] **Bảng dữ liệu:**
    - Columns: Order ID, Customer name, Date, Total, Status, Actions
    - Pagination
    - Sort: By date (mới nhất trước)
    - Filter: By status (Pending, Processing, Shipped, Delivered, Cancelled)
    - Search: By Order ID hoặc customer name

- [ ] **Status colors:**
    - Pending: Gray
    - Processing: Blue
    - Shipped: Orange
    - Delivered: Green
    - Cancelled: Red

- [ ] **Actions:**
    - [ ] View details
    - [ ] Update status (dropdown)
    - [ ] Print order

**Trang chi tiết đơn (Order Detail):**

- [ ] Hiển thị:
    - Customer info (name, email, phone, address)
    - Order items (table: product name, quantity, price, subtotal)
    - Order total + tax + shipping
    - Status timeline (Pending → Processing → Shipped → Delivered)
    - Current status (with timestamp)

- [ ] **Update status:**
    - [ ] Dropdown chọn status mới
    - [ ] Click "Update" → API PUT /orders/:id/status
    - [ ] Trigger FCM notification ko customer tự động
    - [ ] Toast: "Trạng thái cập nhật & thông báo đã gửi"

#### **5. State Management (Zustand)**

**Store: `adminAuthStore`**

```javascript
{
  admin: {id, email, name, role},
  token: JWT,
  isAuthenticated: boolean,
  login(email, password),
  logout(),
}
```

**Store: `adminUiStore`**

```javascript
{
  sidebarOpen: boolean,
  toggleSidebar(),
  theme: 'light' | 'dark',
  setTheme(theme),
  notify(message, type),
}
```

#### **6. Data Fetching (TanStack Query)**

**Queries:**

- [ ] `useAdminProducts(page, filters)` - Danh sách sp (pagination, filter)
- [ ] `useAdminOrders(page, status, sort)` - Danh sách đơn
- [ ] `useOrderById(orderId)` - Chi tiết đơn
- [ ] `useAdminStats()` - Dashboard metrics

**Mutations:**

- [ ] `useCreateProduct()` - POST /products
- [ ] `useUpdateProduct()` - PUT /products/:id
- [ ] `useDeleteProduct()` - DELETE /products/:id
- [ ] `useUpdateOrderStatus()` - PUT /orders/:id/status
- [ ] `useAdminLogin()` - POST /auth/login (role: admin)
- [ ] `useAdminLogout()` - POST /auth/logout

#### **7. Supabase Storage Integration (Upload Ảnh)**

- [ ] Cấu hình Supabase Storage client trên React
- [ ] Upload file:

    ```javascript
    const file = selectedFile;
    const path = `products/${Date.now()}_${file.name}`;
    const { data, error } = await supabaseClient.storage
        .from("product-images")
        .upload(path, file);

    if (!error) {
        const publicUrl = supabaseClient.storage
            .from("product-images")
            .getPublicUrl(path).data.publicUrl;
        // Use publicUrl in form
    }
    ```

- [ ] **Security:** RLS Policy (chỉ admin upload, công khai được read)

#### **8. Authentication & Protected Routes**

- [ ] **Login page:**
    - Email + password
    - Validate
    - Submit → POST /auth/login
    - Save JWT token
    - Redirect → Dashboard

- [ ] **PrivateRoute component:**
    - Check token trong authStore
    - Nếu không có → Redirect to /login
    - Nếu có → Render component

#### **9. Testing**

- [ ] Component tests: ProductTable, OrderTable, Forms
- [ ] Integration tests: Add product → Verify in list
- [ ] Upload flow test

---

### **B. NHIỆM VỤ BÁOÁO**

#### **Chương 2: Cơ sở Lý thuyết & Công nghệ (6-7 trang)**

- [ ] **Single Page Application (SPA):**
    - SPA là gì? (Client-side rendering, no page reload)
    - Redux/Zustand: State management

- [ ] **JWT Authentication:**
    - JWT structure: Header.Payload.Signature
    - Cách verify token trên mỗi API call
    - Refresh token mechanism

- [ ] **RESTful API Principles:**
    - HTTP Methods: GET, POST, PUT, DELETE
    - Status codes: 200, 201, 400, 401, 404, 500
    - Request/Response format (JSON)

- [ ] **TanStack Query (React Query):**
    - Query: Fetch & cache data
    - Mutation: Create/Update/Delete
    - Background refetching
    - Stale time & cache time

#### **Chương 3: Thiết kế Chi tiết (7-8 trang)**

- [ ] **Sequence Diagram - Upload Hình ảnh:**

    ```
    User
      ↓
    Select file → React Component
      ↓
    Upload to Supabase Storage
      ↓
    Get public URL
      ↓
    Include URL in form data
      ↓
    POST /products (Express Backend)
      ↓
    Save to PostgreSQL
      ↓
    Response với product ID
      ↓
    Update table (TanStack Query)
    ```

- [ ] **Flowchart - Update Order Status:**

    ```
    Admin select new status
      ↓
    Click "Update"
      ↓
    PUT /orders/:id/status
      ↓
    Backend:
      - Update DB
      - Get customer FCM token
      - Send notification (Firebase)
      ↓
    Frontend: Show toast "Updated & notified"
      ↓
    Listen realtime → Order status reflects
    ```

- [ ] **Architecture:**
    - Layout (Sidebar, Header, Content)
    - Pages (Dashboard, Products, Orders)
    - Components (Table, Form, Chart)
    - Stores (Auth, UI)
    - Services (API, Supabase)

#### **Chương 4: Demo & Triển khai (8-10 trang)**

- [ ] Screenshots:
    - Dashboard page
    - Product list page
    - Add/Edit product form (with upload)
    - Order management page
    - Update order status

- [ ] **Hướng dẫn sử dụng:**
    - Cách login Admin
    - Cách thêm sản phẩm (từng step)
    - Cách upload ảnh
    - Cách quản lý đơn hàng
    - Cách cập nhật status (trigger notification)

- [ ] **Demo video (nếu có):** GIF hoặc video 30s

#### **Chương 6: Kết Luận & Hướng Phát Triển (4-5 trang)**

- [ ] Tóm tắt kết quả team đạt được
- [ ] **Hạn chế hiện tại:**
    - Chưa có recommendation system
    - Thanh toán online chỉ COD
    - Chưa integrate payment gateway (Stripe, VNPay)
    - Chưa có analytics chi tiết

- [ ] **Hướng phát triển tương lai:**
    - Recommendation System (AI gợi ý dựa lịch sử)
    - Integration payment (Stripe, VNPay)
    - Mobile app (React Native)
    - Multi-language support
    - Export orders to Excel/PDF
    - Advanced analytics dashboard

---

### **C. DELIVERABLES**

- [ ] Code Admin React đầy đủ (pages, components, forms)
- [ ] Form validation & error handling
- [ ] Responsive design (desktop, tablet)
- [ ] Supabase Storage integration
- [ ] Protected routes & Auth
- [ ] `.env.example`
- [ ] Báo cáo 2 chương + Kết luận (20-25 trang) + Screenshots

---

## 📝 **TIMELINE & MILESTONES**

| Week | Thành viên 1                       | Thành viên 2             | Thành viên 3            | Thành viên 4            |
| ---- | ---------------------------------- | ------------------------ | ----------------------- | ----------------------- |
| 1-2  | Setup Docker, DB schema, RLS       | Gemini config, pgvector  | Auth pages, HomePage    | Admin layout, Dashboard |
| 3-4  | API cốt lõi (checkout transaction) | Embeddings, RAG          | Product pages, Cart     | Product management UI   |
| 5    | Firebase notification              | Semantic search, testing | Checkout flow, chatbot  | Order management UI     |
| 6    | Testing, optimization              | Testing, optimization    | Testing, Firebase setup | Testing, upload flow    |
| 7-8  | Báo cáo Chương 1-3                 | Báo cáo Chương 2-4       | Báo cáo Chương 2-4      | Báo cáo Chương 2-6      |

---

## ✅ **CHECKLIST SUBMIT**

**Thành viên 1:**

- [ ] Code Backend (github)
- [ ] Docker-compose.yml
- [ ] API Document (Postman/Swagger)
- [ ] Báo cáo PDF (4 chương, 20+ trang)

**Thành viên 2:**

- [ ] Code RAG & Semantic Search (github)
- [ ] Database schema + pgvector
- [ ] Prompt template files
- [ ] Test results PDF
- [ ] Báo cáo PDF (4 chương, 20+ trang)

**Thành viên 3:**

- [ ] Code React Storefront (github)
- [ ] Responsive design (mobile + desktop)
- [ ] Firebase config files
- [ ] Test E2E (video or screenshots)
- [ ] Báo cáo PDF (4 chương, 20+ trang)

**Thành viên 4:**

- [ ] Code React Admin (github)
- [ ] Supabase Storage config
- [ ] Protected routes & Auth
- [ ] Screenshots demo
- [ ] Báo cáo PDF (6 chương, 25+ trang)

---

**Last updated:** 2026-04-07
