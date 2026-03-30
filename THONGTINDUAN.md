## Thông tin dự án

| Key | Value |
|---|---|
| **Dự án** | Dự án bán hàng thương mại điện tử |
| **Ngôn ngữ** | JavaScript (ES6+) |
| **Framework** | React + Vite |
| **Styling** | Material UI (MUI) |
| **State** | Zustand (chia store theo feature) |
| **Routing** | react-router-dom |
| **Data fetching** | TanStack Query (cho HomePage), axios/fetch (cho các trang khác) |
| **Auth** | Supabase Auth (JWT + session) |
| **Naming** | Components: `PascalCase.jsx` · Biến/hàm: `camelCase` · DB: `snake_case` |

## Cấu trúc Folder

```
apps/web/src/
├── assets/                    # Hình ảnh, icon, font
├── components/                # Components tái sử dụng
│   ├── common/                # Components dùng chung toàn app
│   │   ├── SiteHeader.jsx
│   │   ├── SiteFooter.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── ErrorMessage.jsx
│   │   └── ProtectedRoute.jsx
│   ├── home/                  # Components riêng cho HomePage
│   │   ├── HeroBanner.jsx
│   │   ├── BestSellingItems.jsx   # Components cho phần sản phẩm bán chạy
│   │   ├── MenuSection.jsx
│   │   └── ServicesSection.jsx
│   ├── product/               # Components cho sản phẩm
│   │   ├── ProductCard.jsx
│   │   ├── ProductDetail.jsx
│   │   └── ProductList.jsx
│   ├── cart/                  # Components cho giỏ hàng
│   │   ├── CartDrawer.jsx
│   │   ├── CartItem.jsx
│   │   └── CartSummary.jsx
│   ├── auth/                  # Components cho Auth
│   │   ├── LoginForm.jsx
│   │   └── RegisterForm.jsx
│   ├── checkout/              # Components cho thanh toán
│   │   ├── ShippingForm.jsx
│   │   └── OrderSummary.jsx
│   ├── search/                # Components cho tìm kiếm
│   │   ├── SearchBar.jsx
│   │   ├── SearchResultCard.jsx
│   │   └── SimilarityBadge.jsx
│   ├── dashboard/             # Components cho thống kê
│   │   └── RevenueChart.jsx
│   └── chat/                  # Chatbot widget
│       └── ChatWidget.jsx
├── pages/                     # Các trang chính
│   ├── HomePage.jsx           # Ghép các components trên
│   ├── AuthPage.jsx           # Đăng nhập / Đăng ký
│   ├── CheckoutPage.jsx       # Thanh toán
│   ├── DashboardPage.jsx      # Thống kê doanh thu
│   ├── SearchPage.jsx         # Kết quả tìm kiếm ngữ nghĩa
│   ├── ProductDetailPage.jsx  # Chi tiết sản phẩm
│   ├── CartPage.jsx           # Giỏ hàng (full page view)
│   ├── RestaurantMenuPage.jsx # Trang menu
│   └── RestaurantOrderPage.jsx # Trang đặt món
├── stores/                    # Zustand stores
│   ├── useAuthStore.js
│   ├── useCartStore.js
│   └── useProductStore.js
├── services/                  # API service layer
│   ├── supabaseClient.js      # Khởi tạo Supabase client
│   └── api.js                 # Axios instance + interceptors
├── App.jsx                    # Cập nhật routing
├── App.css
├── index.css
└── main.jsx
```

## Dependencies cần cài thêm

| Package | Mục đích |
|---------|----------|
| `@supabase/supabase-js` | Supabase Auth + DB client |
| `@tanstack/react-query` | Data fetching cho HomePage |
| `@mui/material` + `@emotion/react` + `@emotion/styled` | Material UI (theo AI_CONTEXT) |
| `@mui/icons-material` | MUI Icons |
| `axios` | HTTP client |
| `recharts` | Biểu đồ Dashboard |

---
