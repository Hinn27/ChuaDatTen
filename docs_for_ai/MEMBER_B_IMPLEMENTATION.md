# Member B Implementation Documentation

## Overview

This document describes the complete implementation of **Member B** (Thực phẩm Hữu Cơ - Organic Food) for the Refood e-commerce platform.

## Architecture

### Backend Stack

- **Framework**: Express.js 5.2
- **Language**: JavaScript (ES6 modules)
- **Database**: Supabase (PostgreSQL)
- **API Pattern**: RESTful with proper HTTP status codes

### Frontend Stack

- **Framework**: React 19
- **Router**: React Router 7
- **State Management**: Zustand
- **HTTP Client**: Axios with JWT interceptors
- **UI Library**: Material-UI 7

## Backend Implementation

### 1. Member B Configuration (`/apps/backend/src/config/memberB.config.js`)

**Exports:**

- `memberBConfig` - Store profile and metadata
- `memberBProducts` - Product fixtures (5 sample products)
- `memberBSampleOrders` - Order history examples
- `memberBStats` - Statistics snapshot

**Key Fields:**

```javascript
{
  id: 'b',
  name: 'Cửa hàng B',
  displayName: 'Thực phẩm Hữu Cơ',
  primaryCategory: 'organic-food',
  color: '#2ecc71',
  logo: '🥬'
}
```

### 2. Member B Service (`/apps/backend/src/services/memberB.service.js`)

**8 Exported Functions:**

1. **getMemberBProfile()**
    - Returns: Profile + statistics
    - Usage: `/api/v1/members/b/profile`

2. **getMemberBProducts(filters)**
    - Filters: category, minPrice, maxPrice, sortBy, page, limit
    - Returns: Paginated products array
    - Usage: `/api/v1/members/b/products?page=1&limit=10`

3. **getMemberBProductById(productId)**
    - Returns: Product details + related products
    - Usage: `/api/v1/members/b/products/{id}`

4. **searchMemberBProducts(query, limit)**
    - Full-text search on name and description
    - Returns: Matching products array
    - Usage: `/api/v1/members/b/products/search?q=rau&limit=10`

5. **getMemberBCategory()**
    - Returns: Category info with stats
    - Usage: `/api/v1/members/b/category`

6. **getMemberBStatistics()**
    - Returns: Sales stats, reviews, member info
    - Usage: `/api/v1/members/b/stats`

7. **getMemberBRelatedProducts(productId, limit)**
    - Returns: Similar category products
    - Usage: `/api/v1/members/b/products/{id}/related`

8. **validateMemberBOrder(items)**
    - Validates cart before checkout
    - Returns: Validation result with errors
    - Usage: `POST /api/v1/members/b/validate-order`

### 3. Member B Controller (`/apps/backend/src/controllers/memberB.controller.js`)

**8 Route Handlers:**

- `getMemberBProfile()` - GET profile
- `getMemberBProducts()` - GET products with filters
- `getMemberBProductById()` - GET single product
- `getMemberBRelatedProducts()` - GET related items
- `searchMemberBProducts()` - Search products
- `getMemberBCategory()` - GET category info
- `getMemberBStatistics()` - GET stats
- `validateMemberBOrder()` - POST validate order

All handlers include proper error handling and HTTP status codes.

### 4. Member B Routes (`/apps/backend/src/routes/memberB.routes.js`)

**Route Pattern:** `/api/v1/members/b/*`

**Endpoints:**

```
GET    /profile
GET    /category
GET    /stats
GET    /products
GET    /products/search
GET    /products/:productId
GET    /products/:productId/related
POST   /validate-order
```

## Frontend Implementation

### 1. Member B Hook (`/apps/web/src/hooks/useMemberB.js`)

**Custom React Hook** for Member B product operations.

**State:**

- `profile` - Member B profile data
- `products` - Product list
- `currentProduct` - Selected product
- `category` - Category details
- `stats` - Statistics
- `loading` - Loading state
- `error` - Error message
- `pagination` - Pagination info

**Methods (7 async functions):**

1. `fetchProfile()` - Load profile
2. `fetchCategory()` - Load category
3. `fetchProducts(filters)` - Load products with filters
4. `fetchProductById(id)` - Load single product
5. `searchProducts(query, limit)` - Search
6. `fetchStatistics()` - Load stats
7. `validateOrder(items)` - Validate cart

**Usage:**

```javascript
const { products, loading, fetchProducts } = useMemberB();
useEffect(() => {
    fetchProducts({ page: 1, limit: 12 });
}, []);
```

### 2. Member B Store (`/apps/web/src/stores/useMemberBStore.js`)

**Zustand Store** for global Member B state.

**Actions (15):**

- `setFilters()`
- `fetchProfile()`
- `fetchCategory()`
- `fetchProducts()`
- `fetchProductById()`
- `searchProducts()`
- `fetchStatistics()`
- `validateOrder()`
- `clearError()`
- `reset()`

**Usage:**

```javascript
const { products, loading } = useMemberBStore();
useMemberBStore.getState().fetchProducts();
```

### 3. Member B API Service (`/apps/web/src/services/memberB.api.js`)

**Axios API methods:**

- `getProfile()`
- `getCategory()`
- `getProducts(filters)`
- `getProductById(id)`
- `searchProducts(query, limit)`
- `getRelatedProducts(id, limit)`
- `getStatistics()`
- `validateOrder(items)`

All methods return Promise<AxiosResponse>.

### 4. Member B Service (`/apps/web/src/services/memberB.service.js`)

**High-level service functions:**

1. `initializeMemberB()` - Bootstrap Member B data
2. `loadMemberBProducts(filters, page, limit)` - Load with filters
3. `searchMemberBProducts(query, limit)` - Search
4. `getMemberBProductDetails(id)` - Fetch product
5. `getMemberBRecommendedProducts(id, limit)` - Get suggestions
6. `validateMemberBOrder(cartItems)` - Validate cart
7. `getMemberBProfileSummary()` - Get profile
8. `checkMemberBProductStock(productIds)` - Check availability

### 5. Member B Category Page (`/apps/web/src/pages/MemberBCategoryPage.jsx`)

**React Component** for Member B dedicated category view.

**Features:**

- ✅ Category header with logo/color
- ✅ Product grid (12 items per page)
- ✅ Search functionality
- ✅ Sort options (newest, price, rating)
- ✅ Pagination
- ✅ Add to cart
- ✅ Stock status display
- ✅ Loading/error states

**Routes:**

- `/member-b/category` - Dedicated Member B view
- `/:member/products` - Generic member flow (works for B too)

## API Integration

### Backend API Endpoints

**Base URL:** `/api/v1/members/b`

**Response Format:**

```json
{
  "success": true,
  "data": {
    "member": "b",
    "products": [...],
    "pagination": {...}
  }
}
```

**Error Handling:**

```json
{
    "success": false,
    "error": "Error message"
}
```

### Frontend API Calls

**Using Hook:**

```javascript
import useMemberB from "@/hooks/useMemberB";

function MyComponent() {
    const { products, fetchProducts } = useMemberB();

    useEffect(() => {
        fetchProducts({ page: 1 });
    }, []);
}
```

**Using Store:**

```javascript
import { useMemberBStore } from "@/stores/useMemberBStore";

function MyComponent() {
    const products = useMemberBStore((state) => state.products);
    useMemberBStore.getState().fetchProducts();
}
```

**Using API Service:**

```javascript
import memberBAPI from "@/services/memberB.api";

const response = await memberBAPI.getProducts({ page: 1 });
```

## Data Structures

### Product Schema

```javascript
{
  id: 'b-prod-001',
  name: 'Rau cuống hữu cơ',
  description: 'Rau cuống tươi ngon...',
  category: 'organic-food',
  price: 25000,
  imageUrl: '/images/products/rau-cuong.jpg',
  stock: 50,
  rating: 4.8,
  reviews: 132,
  isActive: true
}
```

### Order Validation Response

```javascript
{
  member: 'b',
  isValid: true,
  validatedItems: [
    {
      productId: 'b-prod-001',
      name: 'Rau cuống hữu cơ',
      quantity: 2,
      unitPrice: 25000,
      subtotal: 50000
    }
  ],
  totalPrice: 155000,
  itemCount: 3,
  discountEligible: true,
  estimatedShippingDays: 2,
  errors: []
}
```

## File Structure

```
Backend:
├── src/
│   ├── config/
│   │   └── memberB.config.js
│   ├── controllers/
│   │   └── memberB.controller.js
│   ├── services/
│   │   └── memberB.service.js
│   └── routes/
│       └── memberB.routes.js
│   └── app.js (updated with routes)

Frontend:
├── src/
│   ├── hooks/
│   │   └── useMemberB.js
│   ├── stores/
│   │   └── useMemberBStore.js
│   ├── services/
│   │   ├── memberB.api.js
│   │   └── memberB.service.js
│   ├── pages/
│   │   └── MemberBCategoryPage.jsx
│   └── app/router/
│       └── index.jsx (updated with routes)
```

## Features Implemented

### Backend Features

✅ Product management (CRUD)
✅ Product filtering (category, price)
✅ Product search
✅ Related products recommendation
✅ Order validation
✅ Statistics tracking
✅ Error handling
✅ Pagination support

### Frontend Features

✅ Product listing with grid
✅ Search functionality
✅ Sorting options
✅ Filtering UI
✅ Pagination controls
✅ Add to cart integration
✅ Stock status display
✅ Loading states
✅ Error handling
✅ Responsive design (Material-UI)

## Testing

### API Testing

```bash
# Get profile
curl http://localhost:3000/api/v1/members/b/profile

# Get products
curl "http://localhost:3000/api/v1/members/b/products?page=1&limit=10"

# Search
curl "http://localhost:3000/api/v1/members/b/products/search?q=rau"

# Get single product
curl http://localhost:3000/api/v1/members/b/products/b-prod-001

# Validate order
curl -X POST http://localhost:3000/api/v1/members/b/validate-order \
  -H "Content-Type: application/json" \
  -d '{"items":[{"productId":"b-prod-001","quantity":2}]}'
```

### Frontend Testing

1. Navigate to `/member-b/category`
2. Test search functionality
3. Test sorting filters
4. Test pagination
5. Test add to cart
6. Verify API calls in network tab

## Integration Points

### With Cart

- `useCart().addToCart()` integrates with Member B products
- Cart stores member context
- Checkout validates per-member

### With Auth

- Member B pages accessible to all users
- ProtectedRoute wrapper optional (public by default)
- JWT interceptor works for all API calls

### With Checkout

- `validateMemberBOrder()` used before payment
- Returns errors for out-of-stock items
- Calculates shipping and discounts

## Future Enhancements

1. **Database Integration**
    - Replace fixtures with Supabase queries
    - Add real product images from storage

2. **Advanced Features**
    - Member B specific promotions
    - Loyalty points system
    - Subscription products

3. **Analytics**
    - Track Member B specific metrics
    - Sales by product
    - Customer insights

4. **Performance**
    - Caching with React Query
    - Infinite scroll pagination
    - Image lazy loading

## Troubleshooting

**Products not loading:**

- Check backend is running (`npm run dev` in `/apps/backend`)
- Verify API base URL in `.env`
- Check network tab for 404/500 errors

**Add to cart not working:**

- Verify `useCart()` hook is properly imported
- Check cart store initialization
- Ensure product ID format matches

**Styles not applied:**

- Clear Material-UI cache
- Verify Material-UI is installed
- Check CSS import order

## Support

For questions or issues with Member B implementation, refer to:

- Backend docs: `/docs_for_ai/apps/backend/`
- API specs: `/docs_for_ai/apps/backend/API_SPECS.md`
- Git workflow: `/docs_for_ai/GIT_WORKFLOW.md`
