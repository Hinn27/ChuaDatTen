# Member B API Reference

## Base URL

```
http://localhost:3000/api/v1/members/b
```

## Authentication

All endpoints accept requests from any user. Optional JWT in Authorization header:

```
Authorization: Bearer <jwt_token>
```

---

## Endpoints

### 1. GET /profile

Get Member B profile and statistics

**Request:**

```bash
curl http://localhost:3000/api/v1/members/b/profile
```

**Response:**

```json
{
    "success": true,
    "data": {
        "id": "b",
        "name": "Cửa hàng B",
        "displayName": "Thực phẩm Hữu Cơ",
        "description": "Cơ sở kinh doanh chuyên cung cấp thực phẩm hữu cơ chất lượng cao",
        "logo": "🥬",
        "color": "#2ecc71",
        "primaryCategory": "organic-food",
        "owner": "Founder B",
        "location": "Quận 1, TP.HCM",
        "phone": "+84 28 1234 5678",
        "email": "memberb@refood.vn",
        "website": "https://memberb.refood.vn",
        "socialLinks": {
            "facebook": "https://facebook.com/memberb",
            "instagram": "https://instagram.com/memberb"
        },
        "stats": {
            "totalProducts": 5,
            "activeListings": 5,
            "totalSales": 2500000,
            "totalOrders": 156,
            "averageRating": 4.8,
            "totalReviews": 707,
            "memberSince": "2024-01-15",
            "bestSeller": "b-prod-005"
        }
    }
}
```

---

### 2. GET /category

Get Member B category information

**Request:**

```bash
curl http://localhost:3000/api/v1/members/b/category
```

**Response:**

```json
{
    "success": true,
    "data": {
        "member": "b",
        "category": "organic-food",
        "displayName": "Thực phẩm Hữu Cơ",
        "description": "Cơ sở kinh doanh chuyên cung cấp thực phẩm hữu cơ chất lượng cao",
        "logo": "🥬",
        "color": "#2ecc71",
        "productCount": 5,
        "averageRating": 4.8
    }
}
```

---

### 3. GET /stats

Get Member B statistics

**Request:**

```bash
curl http://localhost:3000/api/v1/members/b/stats
```

**Response:**

```json
{
    "success": true,
    "data": {
        "member": "b",
        "totalProducts": 5,
        "activeListings": 5,
        "totalSales": 2500000,
        "totalOrders": 156,
        "averageRating": 4.8,
        "totalReviews": 707,
        "memberSince": "2024-01-15",
        "bestSeller": "b-prod-005"
    }
}
```

---

### 4. GET /products

Get all Member B products with pagination

**Query Parameters:**

- `page` (optional) - Page number, default: 1
- `limit` (optional) - Items per page, default: 10
- `category` (optional) - Filter by category
- `minPrice` (optional) - Minimum price filter
- `maxPrice` (optional) - Maximum price filter
- `sortBy` (optional) - Sort order: `newest`, `price-asc`, `price-desc`, `rating`

**Examples:**

Basic request:

```bash
curl http://localhost:3000/api/v1/members/b/products
```

With pagination:

```bash
curl "http://localhost:3000/api/v1/members/b/products?page=1&limit=12"
```

With filters:

```bash
curl "http://localhost:3000/api/v1/members/b/products?sortBy=price-asc&minPrice=20000&maxPrice=50000"
```

**Response:**

```json
{
    "success": true,
    "data": {
        "member": "b",
        "products": [
            {
                "id": "b-prod-001",
                "name": "Rau cuống hữu cơ",
                "description": "Rau cuống tươi ngon, trồng theo tiêu chuẩn hữu cơ",
                "category": "organic-food",
                "price": 25000,
                "imageUrl": "/images/products/rau-cuong.jpg",
                "stock": 50,
                "rating": 4.8,
                "reviews": 132,
                "isActive": true
            },
            {
                "id": "b-prod-002",
                "name": "Cà chua hữu cơ",
                "description": "Cà chua đỏ chín tự nhiên, không sử dụng hóa chất",
                "category": "organic-food",
                "price": 35000,
                "imageUrl": "/images/products/ca-chua.jpg",
                "stock": 45,
                "rating": 4.9,
                "reviews": 156,
                "isActive": true
            }
        ],
        "pagination": {
            "page": 1,
            "limit": 10,
            "totalCount": 5,
            "totalPages": 1,
            "hasNext": false,
            "hasPrev": false
        }
    }
}
```

---

### 5. GET /products/:productId

Get single product details

**Request:**

```bash
curl http://localhost:3000/api/v1/members/b/products/b-prod-001
```

**Response:**

```json
{
    "success": true,
    "data": {
        "member": "b",
        "product": {
            "id": "b-prod-001",
            "name": "Rau cuống hữu cơ",
            "description": "Rau cuống tươi ngon, trồng theo tiêu chuẩn hữu cơ",
            "category": "organic-food",
            "price": 25000,
            "imageUrl": "/images/products/rau-cuong.jpg",
            "stock": 50,
            "rating": 4.8,
            "reviews": 132,
            "isActive": true,
            "relatedProducts": [
                {
                    "id": "b-prod-003",
                    "name": "Rau bó cải hữu cơ",
                    "price": 30000,
                    "rating": 4.7
                },
                {
                    "id": "b-prod-004",
                    "name": "Khoai tây hữu cơ",
                    "price": 28000,
                    "rating": 4.6
                }
            ]
        }
    }
}
```

**Error Response (Product not found):**

```json
{
    "success": false,
    "error": "Product not found"
}
```

Status: 404

---

### 6. GET /products/search?q={query}

Search Member B products

**Query Parameters:**

- `q` (required) - Search query
- `limit` (optional) - Max results, default: 10

**Examples:**

```bash
curl "http://localhost:3000/api/v1/members/b/products/search?q=rau"
```

```bash
curl "http://localhost:3000/api/v1/members/b/products/search?q=cà chua&limit=20"
```

**Response:**

```json
{
    "success": true,
    "data": {
        "member": "b",
        "query": "rau",
        "results": [
            {
                "id": "b-prod-001",
                "name": "Rau cuống hữu cơ",
                "description": "Rau cuống tươi ngon, trồng theo tiêu chuẩn hữu cơ",
                "category": "organic-food",
                "price": 25000,
                "stock": 50,
                "rating": 4.8,
                "reviews": 132
            },
            {
                "id": "b-prod-003",
                "name": "Rau bó cải hữu cơ",
                "description": "Cải xinh, cải cúc, cải ngọt - hữu cơ tự nhiên",
                "category": "organic-food",
                "price": 30000,
                "stock": 60,
                "rating": 4.7,
                "reviews": 98
            }
        ],
        "count": 2
    }
}
```

---

### 7. GET /products/:productId/related

Get related products for recommendation

**Query Parameters:**

- `limit` (optional) - Max related products, default: 4

**Request:**

```bash
curl "http://localhost:3000/api/v1/members/b/products/b-prod-001/related?limit=6"
```

**Response:**

```json
{
    "success": true,
    "data": {
        "member": "b",
        "baseProduct": "b-prod-001",
        "relatedProducts": [
            {
                "id": "b-prod-003",
                "name": "Rau bó cải hữu cơ",
                "description": "Cải xinh, cải cúc, cải ngọt - hữu cơ tự nhiên",
                "price": 30000,
                "stock": 60,
                "rating": 4.7,
                "reviews": 98
            },
            {
                "id": "b-prod-004",
                "name": "Khoai tây hữu cơ",
                "description": "Khoai tây tím, khoai tây vàng - hữu cơ",
                "price": 28000,
                "stock": 55,
                "rating": 4.6,
                "reviews": 87
            }
        ]
    }
}
```

---

### 8. POST /validate-order

Validate order before checkout

**Request Body:**

```json
{
    "items": [
        {
            "productId": "b-prod-001",
            "quantity": 2
        },
        {
            "productId": "b-prod-002",
            "quantity": 1
        }
    ]
}
```

**Example Request:**

```bash
curl -X POST http://localhost:3000/api/v1/members/b/validate-order \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {"productId": "b-prod-001", "quantity": 2},
      {"productId": "b-prod-002", "quantity": 1}
    ]
  }'
```

**Success Response:**

```json
{
    "success": true,
    "data": {
        "member": "b",
        "isValid": true,
        "validatedItems": [
            {
                "productId": "b-prod-001",
                "name": "Rau cuống hữu cơ",
                "quantity": 2,
                "unitPrice": 25000,
                "subtotal": 50000
            },
            {
                "productId": "b-prod-002",
                "name": "Cà chua hữu cơ",
                "quantity": 1,
                "unitPrice": 35000,
                "subtotal": 35000
            }
        ],
        "totalPrice": 85000,
        "itemCount": 3,
        "discountEligible": false,
        "estimatedShippingDays": 2,
        "errors": []
    }
}
```

**Error Response (Out of stock):**

```json
{
    "success": true,
    "data": {
        "member": "b",
        "isValid": false,
        "validatedItems": [
            {
                "productId": "b-prod-001",
                "name": "Rau cuống hữu cơ",
                "quantity": 2,
                "unitPrice": 25000,
                "subtotal": 50000
            }
        ],
        "totalPrice": 50000,
        "itemCount": 2,
        "discountEligible": false,
        "estimatedShippingDays": 2,
        "errors": ["Insufficient stock for Cà chua hữu cơ. Available: 45"]
    }
}
```

---

## HTTP Status Codes

| Code | Meaning                                   |
| ---- | ----------------------------------------- |
| 200  | Success                                   |
| 400  | Bad request (missing required parameters) |
| 404  | Not found (product doesn't exist)         |
| 500  | Server error                              |

---

## Error Response Format

All errors follow this format:

```json
{
    "success": false,
    "error": "Error message describing what went wrong"
}
```

---

## Rate Limiting

Currently no rate limiting. Future versions may implement:

- 100 requests per minute per IP
- 1000 requests per hour per user

---

## Pagination

When a response includes pagination:

```json
{
    "pagination": {
        "page": 1,
        "limit": 12,
        "totalCount": 5,
        "totalPages": 1,
        "hasNext": false,
        "hasPrev": false
    }
}
```

**Fields:**

- `page` - Current page (1-indexed)
- `limit` - Items per page
- `totalCount` - Total items available
- `totalPages` - Total pages available
- `hasNext` - Whether next page exists
- `hasPrev` - Whether previous page exists

---

## Sorting Options

Available sort values for `/products` endpoint:

| Value        | Description                 |
| ------------ | --------------------------- |
| `newest`     | Newly added first (default) |
| `price-asc`  | Low price to high           |
| `price-desc` | High price to low           |
| `rating`     | Highest rated first         |

---

## Filtering

The `/products` endpoint supports multiple filters:

```bash
# By category
?category=organic-food

# By price range
?minPrice=20000&maxPrice=50000

# By sort
?sortBy=price-asc

# Combined
?category=organic-food&minPrice=20000&maxPrice=50000&sortBy=rating&page=1&limit=12
```

---

## Response Times

Expected response times:

- Profile/Category: < 50ms
- Product list (12 items): < 100ms
- Single product: < 100ms
- Search: < 200ms
- Validation: < 150ms

---

## CORS

All endpoints support CORS requests from the frontend at:

- `http://localhost:5173` (development)
- `https://refood.vn` (production - future)

---

## Example Frontend Integration

### Using Axios:

```javascript
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/v1/members/b",
});

// Get products
const response = await api.get("/products", {
    params: { page: 1, limit: 12, sortBy: "newest" },
});

// Search
const search = await api.get("/products/search", {
    params: { q: "rau", limit: 10 },
});

// Validate order
const validation = await api.post("/validate-order", {
    items: [{ productId: "b-prod-001", quantity: 2 }],
});
```

### Using Fetch:

```javascript
// Get products
const response = await fetch(
    "http://localhost:3000/api/v1/members/b/products?page=1&limit=12",
);
const data = await response.json();

// Validate order
const validation = await fetch(
    "http://localhost:3000/api/v1/members/b/validate-order",
    {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            items: [{ productId: "b-prod-001", quantity: 2 }],
        }),
    },
);
const result = await validation.json();
```

---

## Changelog

### v1.0.0 (2026-04-10)

- Initial Member B API release
- 8 endpoints implemented
- Full product catalog (5 sample products)
- Order validation
- Search and filtering

---

**Last Updated:** 2026-04-10
**API Version:** 1.0.0
**Status:** ✅ Stable
