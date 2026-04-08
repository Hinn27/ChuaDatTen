# Supabase Setup Guide (Backend)

## 1) Env variables can co

Khoi tao file env:

```bash
cp .env.example .env
```

Trong file `.env` (root hoac `apps/backend/.env` tuy theo cach deploy):

```env
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
PORT=3001
```

Luu y:

- `SUPABASE_SERVICE_ROLE_KEY` chi dung o backend.
- Frontend chi duoc dung `SUPABASE_URL` + `SUPABASE_ANON_KEY`.

## 2) Chay migration schema + RLS

Mo Supabase SQL Editor va chay file migration:

- `apps/backend/supabase/migrations/20260408_init_refood.sql`

Script da gom:

- Schema bang (`profiles`, `products`, `orders`, `order_items`, ...)
- Trigger tao profile tu `auth.users`
- RPC `checkout_transaction`, `semantic_search_foods`
- RLS policies
- Storage buckets + policies
- Realtime publication cho cac bang can dong bo

## 3) Auth JWT flow

- Login qua `supabase.auth.signInWithPassword`.
- Backend tra ve `access_token` cua Supabase session.
- Request tiep theo gui header:

```http
Authorization: Bearer <supabase-access-token>
```

- Middleware backend verify token bang `supabaseAuth.auth.getUser(token)`.

## 4) Storage

Buckets:

- `product-media` (public): media san pham, staff/admin upload.
- `user-private` (private): media rieng user, path bat buoc `/<user-id>/...`

## 5) Realtime

Bang da add vao `supabase_realtime` publication:

- `orders`
- `order_items`
- `chat_messages`

Frontend co the subscribe theo `user_id` de cap nhat trang thai don hang thoi gian thuc.

## 6) Kiem tra nhanh

1. Dang ky account moi -> kiem tra tu dong tao record trong `profiles`.
2. Login va lay `access_token`.
3. Goi API `/api/v1/auth/me` kem bearer token.
4. Tao don `/api/v1/orders/checkout` va xem realtime event.
5. Upload file vao bucket dung role/policy.
