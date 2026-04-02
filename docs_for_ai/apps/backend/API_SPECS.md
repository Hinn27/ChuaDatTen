# 🚀 API SPECIFICATION - REFOOD PROJECT

## 📋 TỔNG QUAN (OVERVIEW)

- **Base URL (Dev)**: `http://localhost:3000/api/v1`
- **Base URL (Prod)**: `https://api.refood.com/api/v1`
- **Authentication**: Sử dụng Bearer Token (JWT được cấp bởi Supabase Auth).
    - Header bắt buộc đối với private routes: `Authorization: Bearer <Supabase_Access_Token>`
- **Content-Type mặc định**: `application/json`

---

## 📦 CHUẨN ĐỊNH DẠNG RESPONSE (STANDARD RESPONSE FORMAT)

Hệ thống bắt buộc tuân thủ định dạng trả về dưới đây để Web (React) và Mobile (Expo) dễ dàng parse dữ liệu vào Zustand store.

### ✅ Thành công (2xx HTTP Status)

```json
{
  "success": true,
  "data": { ... },
  "message": "Thao tác thành công"
}
```

### ❌ Thất bại (4xx, 5xx HTTP Status)

```json
{
    "success": false,
    "error": {
        "code": "AUTH_FAILED",
        "message": "Token không hợp lệ hoặc đã hết hạn."
    }
}
```

---

## 🔗 ENDPOINTS CHI TIẾT

### 1. MODULE: AUTHENTICATION (Xác thực & Người dùng)

Tương tác trực tiếp với Supabase Auth qua API Node.js để quản lý thông tin thêm (Profiles).

#### `POST /auth/register`

- **Desc**: Đăng ký tài khoản khách hàng hoặc chủ quán mới.
- **Body**:
    ```json
    {
        "email": "...",
        "password": "...",
        "fullName": "...",
        "role": "CUSTOMER | STORE_OWNER"
    }
    ```
- **Response**: `201 Created` – Trả về thông tin User và Access Token.

#### `POST /auth/login`

- **Desc**: Đăng nhập hệ thống.
- **Body**:
    ```json
    {
        "email": "...",
        "password": "..."
    }
    ```
- **Response**: `200 OK` – Trả về User Profile và Access Token.

#### `GET /auth/me`

- **Desc**: Lấy profile của user đang đăng nhập.
- **Auth**: Required.
- **Response**: `200 OK` – Trả về dữ liệu từ bảng Users.

---

### 2. MODULE: PRODUCTS & STORES (Sản phẩm & Cửa hàng)

Phục vụ hiển thị trang chủ và dashboard quản lý.

#### `GET /products`

- **Desc**: Lấy danh sách sản phẩm. Có hỗ trợ phân trang và lọc.
- **Query**: `?page=1&limit=20&categoryId=uuid&storeId=uuid`
- **Response**: `200 OK` – Trả về mảng Products kèm meta pagination.

#### `GET /products/:id`

- **Desc**: Lấy chi tiết 1 món ăn.
- **Response**: `200 OK` – Trả về dữ liệu Product.

#### `POST /products`

- **Desc**: Thêm món ăn mới. API này sẽ tự động gọi logic tạo vector embedding để lưu vào pgvector.
- **Auth**: Required (Chỉ Role `STORE_OWNER` hoặc `ADMIN`).
- **Body**:
    ```json
    {
        "name": "...",
        "price": 50000,
        "categoryId": "...",
        "imageUrl": "...",
        "description": "..."
    }
    ```
- **Response**: `201 Created`

---

### 3. MODULE: AI INTEGRATION (Trí tuệ nhân tạo)

Giao tiếp với mô hình LLM (Gemini) và CSDL Vector (pgvector).

#### `GET /ai/search`

- **Desc**: Tìm kiếm ngữ nghĩa (Semantic Search). Biến query thành vector và tính khoảng cách (Cosine Similarity).
- **Query**: `?q="đồ ăn vặt cay nóng"`
- **Response**: `200 OK` – Trả về mảng Products sắp xếp theo độ phù hợp (kèm `similarity_score`).

#### `POST /ai/chat`

- **Desc**: Giao tiếp với AI Chatbot (RAG).
- **Auth**: Required.
- **Body**:
    ```json
    {
        "message": "Gợi ý cho tôi bữa trưa rẻ gọn",
        "sessionId": "..."
    }
    ```
- **Response**: `200 OK` (hoặc Stream) – Trả về câu trả lời text và danh sách món ăn gợi ý đính kèm.

#### `GET /products/:id/summary`

- **Desc**: Lấy bản tóm tắt đánh giá sản phẩm do AI sinh ra (AI Summary).
- **Response**: `200 OK`

---

### 4. MODULE: ORDERS (Đặt hàng & Thanh toán)

Áp dụng Database Transaction chặt chẽ.

#### `POST /orders/checkout`

- **Desc**: Tạo đơn hàng mới, trừ số lượng tồn kho (stock) trong cùng 1 Transaction.
- **Auth**: Required.
- **Body**:
    ```json
    {
        "items": [{ "productId": "...", "quantity": 2 }],
        "paymentMethod": "COD | VNPAY | MOMO",
        "address": "..."
    }
    ```
- **Response**: `201 Created` – Trả về `orderId` và `paymentUrl` (nếu có).

#### `GET /orders/me`

- **Desc**: Lấy lịch sử đơn hàng của khách hàng.
- **Auth**: Required.
- **Response**: `200 OK`

#### `PUT /orders/:id/status`

- **Desc**: Chủ quán cập nhật trạng thái đơn hàng (sẽ trigger gửi Firebase FCM).
- **Auth**: Required (Role: `STORE_OWNER`).
- **Body**:
    ```json
    {
        "status": "CONFIRMED | SHIPPED | COMPLETED | CANCELLED"
    }
    ```
- **Response**: `200 OK`

---

### 5. MODULE: NOTIFICATIONS (FCM)

Quản lý thông báo đẩy sử dụng Firebase Cloud Messaging.

#### `POST /notifications/device-token`

- **Desc**: Đăng ký FCM Device Token của App Mobile vào hệ thống để nhận thông báo.
- **Auth**: Required.
- **Body**:
    ```json
    {
        "fcmToken": "...",
        "deviceType": "ios | android | web"
    }
    ```
- **Response**: `200 OK`

#### `GET /notifications`

- **Desc**: Lấy danh sách lịch sử thông báo đã gửi cho user.
- **Auth**: Required.
- **Response**: `200 OK`
