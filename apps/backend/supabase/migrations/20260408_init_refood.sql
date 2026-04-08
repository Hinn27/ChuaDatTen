-- Refood bootstrap schema for Supabase PostgreSQL
-- Apply this script in Supabase SQL Editor (or supabase migration workflow)

create extension if not exists "pgcrypto";
create extension if not exists "vector";

-- =========
-- TABLES
-- =========

create table if not exists public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    full_name text,
    avatar_url text,
    phone text,
    role text not null default 'CUSTOMER' check (role in ('CUSTOMER', 'STORE_OWNER', 'ADMIN')),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists public.categories (
    id uuid primary key default gen_random_uuid(),
    slug text not null unique,
    name text not null,
    description text,
    created_at timestamptz not null default now()
);

create table if not exists public.products (
    id uuid primary key default gen_random_uuid(),
    category_id uuid references public.categories(id) on delete set null,
    name text not null,
    description text,
    price numeric(12,2) not null check (price >= 0),
    original_price numeric(12,2) check (original_price is null or original_price >= price),
    image_url text,
    stock integer not null default 0 check (stock >= 0),
    is_active boolean not null default true,
    search_vector vector(1536),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists public.orders (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete restrict,
    idempotency_key text,
    status text not null default 'PENDING' check (status in ('PENDING', 'CONFIRMED', 'SHIPPED', 'COMPLETED', 'CANCELLED')),
    payment_status text not null default 'unpaid' check (payment_status in ('unpaid', 'paid', 'failed', 'refunded')),
    payment_method text not null check (payment_method in ('COD', 'VNPAY', 'MOMO')),
    shipping_address text not null,
    total numeric(12,2) not null check (total >= 0),
    note text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
    id uuid primary key default gen_random_uuid(),
    order_id uuid not null references public.orders(id) on delete cascade,
    product_id uuid not null references public.products(id) on delete restrict,
    quantity integer not null check (quantity > 0),
    unit_price numeric(12,2) not null check (unit_price >= 0),
    created_at timestamptz not null default now(),
    unique(order_id, product_id)
);

create table if not exists public.chat_messages (
    id bigint generated always as identity primary key,
    user_id uuid not null references auth.users(id) on delete cascade,
    role text not null check (role in ('user', 'assistant', 'system')),
    content text not null,
    metadata jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default now()
);

create table if not exists public.media_assets (
    id uuid primary key default gen_random_uuid(),
    owner_id uuid not null references auth.users(id) on delete cascade,
    bucket_id text not null,
    object_path text not null,
    mime_type text,
    size_bytes bigint check (size_bytes is null or size_bytes >= 0),
    created_at timestamptz not null default now(),
    unique(bucket_id, object_path)
);

create table if not exists public.notification_device_tokens (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    fcm_token text not null unique,
    device_type text not null check (device_type in ('ios', 'android', 'web')),
    is_active boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists public.notifications (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    title text not null,
    body text not null,
    data jsonb not null default '{}'::jsonb,
    is_read boolean not null default false,
    created_at timestamptz not null default now()
);

create index if not exists idx_orders_user_id on public.orders(user_id);
create unique index if not exists idx_orders_user_idempotency_key
on public.orders(user_id, idempotency_key)
where idempotency_key is not null;
create index if not exists idx_order_items_order_id on public.order_items(order_id);
create index if not exists idx_order_items_product_id on public.order_items(product_id);
create index if not exists idx_products_category_id on public.products(category_id);
create index if not exists idx_products_active_created on public.products(is_active, created_at desc);
create index if not exists idx_chat_messages_user_created on public.chat_messages(user_id, created_at desc);
create index if not exists idx_device_tokens_user_active on public.notification_device_tokens(user_id, is_active);
create index if not exists idx_notifications_user_created on public.notifications(user_id, created_at desc);

-- =========
-- TRIGGERS
-- =========

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

drop trigger if exists trg_products_updated_at on public.products;
create trigger trg_products_updated_at
before update on public.products
for each row
execute function public.set_updated_at();

drop trigger if exists trg_orders_updated_at on public.orders;
create trigger trg_orders_updated_at
before update on public.orders
for each row
execute function public.set_updated_at();

drop trigger if exists trg_notification_device_tokens_updated_at on public.notification_device_tokens;
create trigger trg_notification_device_tokens_updated_at
before update on public.notification_device_tokens
for each row
execute function public.set_updated_at();

create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
    insert into public.profiles (id, full_name, avatar_url)
    values (
        new.id,
        coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
        new.raw_user_meta_data ->> 'avatar_url'
    )
    on conflict (id) do nothing;
    return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user_profile();

-- =========
-- RPC FUNCTIONS
-- =========

create or replace function public.checkout_transaction(
    p_user_id uuid,
    p_items jsonb,
    p_payment_method text,
    p_address text,
    p_idempotency_key text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
    v_order_id uuid;
    v_existing_order_id uuid;
    v_existing_payment_url text;
    v_existing_status text;
    v_existing_total numeric;
    v_item jsonb;
    v_product_id uuid;
    v_quantity integer;
    v_price numeric;
    v_total numeric := 0;
    v_payment_url text := null;
begin
    if p_user_id is null then
        raise exception 'p_user_id is required';
    end if;

    if p_payment_method not in ('COD', 'VNPAY', 'MOMO') then
        raise exception 'p_payment_method is invalid';
    end if;

    if p_address is null or length(trim(p_address)) = 0 then
        raise exception 'p_address is required';
    end if;

    if p_items is null or jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0 then
        raise exception 'p_items must be a non-empty array';
    end if;

    if p_idempotency_key is not null and length(trim(p_idempotency_key)) = 0 then
        p_idempotency_key := null;
    end if;

    if p_idempotency_key is not null and length(p_idempotency_key) > 120 then
        raise exception 'p_idempotency_key is too long';
    end if;

    if p_idempotency_key is not null then
                select o.id, o.status, o.total
                into v_existing_order_id, v_existing_status, v_existing_total
        from public.orders o
        where o.user_id = p_user_id
          and o.idempotency_key = p_idempotency_key
        limit 1;

        if v_existing_order_id is not null then
            if p_payment_method in ('VNPAY', 'MOMO') then
                v_existing_payment_url := 'https://payments.refood.local/pay/' || v_existing_order_id::text;
            else
                v_existing_payment_url := null;
            end if;

            return jsonb_build_object(
                'orderId',
                v_existing_order_id,
                'paymentUrl',
                v_existing_payment_url,
                'status',
                v_existing_status,
                'total',
                v_existing_total
            );
        end if;
    end if;

    begin
        insert into public.orders (user_id, idempotency_key, total, payment_method, shipping_address)
        values (p_user_id, p_idempotency_key, 0, p_payment_method, p_address)
        returning id into v_order_id;
    exception
        when unique_violation then
            select o.id, o.status, o.total
            into v_existing_order_id, v_existing_status, v_existing_total
            from public.orders o
            where o.user_id = p_user_id
              and o.idempotency_key = p_idempotency_key
            limit 1;

            if v_existing_order_id is null then
                raise;
            end if;

            if p_payment_method in ('VNPAY', 'MOMO') then
                v_existing_payment_url := 'https://payments.refood.local/pay/' || v_existing_order_id::text;
            else
                v_existing_payment_url := null;
            end if;

            return jsonb_build_object(
                'orderId',
                v_existing_order_id,
                'paymentUrl',
                v_existing_payment_url,
                'status',
                v_existing_status,
                'total',
                v_existing_total
            );
    end;

    for v_item in select * from jsonb_array_elements(p_items)
    loop
        v_product_id := (v_item ->> 'productId')::uuid;
        v_quantity := greatest((v_item ->> 'quantity')::integer, 1);

        if v_product_id is null then
            raise exception 'productId is required';
        end if;

        select price
        into v_price
        from public.products
        where id = v_product_id
          and is_active = true
        for update;

        if v_price is null then
            raise exception 'product not found';
        end if;

        update public.products
        set stock = stock - v_quantity
        where id = v_product_id
          and stock >= v_quantity;

        if not found then
            raise exception 'insufficient stock';
        end if;

        insert into public.order_items (order_id, product_id, quantity, unit_price)
        values (
            v_order_id,
            v_product_id,
            v_quantity,
            v_price
        );

        v_total := v_total + (v_price * v_quantity);
    end loop;

    update public.orders
    set total = v_total
    where id = v_order_id;

    if p_payment_method in ('VNPAY', 'MOMO') then
        v_payment_url := 'https://payments.refood.local/pay/' || v_order_id::text;
    end if;

    return jsonb_build_object(
        'orderId',
        v_order_id,
        'paymentUrl',
        v_payment_url,
        'status',
        'PENDING',
        'total',
        v_total
    );
end;
$$;

create or replace function public.semantic_search_foods(
    p_query text,
    p_limit integer default 10
)
returns table (
    id uuid,
    name text,
    description text,
    price numeric,
    image_url text
)
language sql
stable
as $$
    select
        p.id,
        p.name,
        p.description,
        p.price,
        p.image_url
    from public.products p
    where p.is_active = true
      and (
        p.name ilike '%' || p_query || '%'
        or coalesce(p.description, '') ilike '%' || p_query || '%'
      )
    order by p.created_at desc
    limit greatest(1, least(coalesce(p_limit, 10), 50));
$$;

-- =========
-- RLS
-- =========

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.chat_messages enable row level security;
alter table public.media_assets enable row level security;
alter table public.notification_device_tokens enable row level security;
alter table public.notifications enable row level security;

-- Profiles
create policy "profiles_select_own_or_admin"
on public.profiles
for select
using (auth.uid() = id or exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role = 'ADMIN'
));

create policy "profiles_update_own"
on public.profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

-- Catalog tables
create policy "categories_public_read"
on public.categories
for select
using (true);

create policy "products_public_read"
on public.products
for select
using (is_active = true);

create policy "products_admin_write"
on public.products
for all
using (exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role in ('ADMIN', 'STORE_OWNER')
))
with check (exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role in ('ADMIN', 'STORE_OWNER')
));

-- Orders
create policy "orders_select_own_or_admin"
on public.orders
for select
using (
    auth.uid() = user_id or exists (
        select 1 from public.profiles p where p.id = auth.uid() and p.role in ('ADMIN', 'STORE_OWNER')
    )
);

create policy "orders_insert_own"
on public.orders
for insert
with check (auth.uid() = user_id);

create policy "orders_update_admin_only"
on public.orders
for update
using (exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role in ('ADMIN', 'STORE_OWNER')
))
with check (exists (
    select 1 from public.profiles p where p.id = auth.uid() and p.role in ('ADMIN', 'STORE_OWNER')
));

-- Order items
create policy "order_items_select_via_parent_order"
on public.order_items
for select
using (
    exists (
        select 1
        from public.orders o
        where o.id = order_items.order_id
          and (o.user_id = auth.uid() or exists (
              select 1 from public.profiles p where p.id = auth.uid() and p.role in ('ADMIN', 'STORE_OWNER')
          ))
    )
);

create policy "order_items_insert_via_parent_order"
on public.order_items
for insert
with check (
    exists (
        select 1
        from public.orders o
        where o.id = order_items.order_id
          and o.user_id = auth.uid()
    )
);

-- Chat
create policy "chat_messages_owner_read"
on public.chat_messages
for select
using (auth.uid() = user_id);

create policy "chat_messages_owner_write"
on public.chat_messages
for insert
with check (auth.uid() = user_id);

-- Media assets metadata
create policy "media_assets_owner_read"
on public.media_assets
for select
using (auth.uid() = owner_id);

create policy "media_assets_owner_write"
on public.media_assets
for all
using (auth.uid() = owner_id)
with check (auth.uid() = owner_id);

create policy "device_tokens_owner_rw"
on public.notification_device_tokens
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "notifications_owner_read"
on public.notifications
for select
using (auth.uid() = user_id);

create policy "notifications_owner_update"
on public.notifications
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- =========
-- STORAGE
-- =========

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
    'product-media',
    'product-media',
    true,
    10485760,
    array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public, file_size_limit)
values (
    'user-private',
    'user-private',
    false,
    10485760
)
on conflict (id) do nothing;

create policy "public_read_product_media"
on storage.objects
for select
using (bucket_id = 'product-media');

create policy "staff_upload_product_media"
on storage.objects
for insert
with check (
    bucket_id = 'product-media'
    and exists (
        select 1 from public.profiles p where p.id = auth.uid() and p.role in ('ADMIN', 'STORE_OWNER')
    )
);

create policy "staff_update_product_media"
on storage.objects
for update
using (
    bucket_id = 'product-media'
    and exists (
        select 1 from public.profiles p where p.id = auth.uid() and p.role in ('ADMIN', 'STORE_OWNER')
    )
);

create policy "users_rw_own_private_bucket"
on storage.objects
for all
using (
    bucket_id = 'user-private'
    and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
    bucket_id = 'user-private'
    and (storage.foldername(name))[1] = auth.uid()::text
);

-- =========
-- REALTIME
-- =========

alter publication supabase_realtime add table public.orders;
alter publication supabase_realtime add table public.order_items;
alter publication supabase_realtime add table public.chat_messages;
alter publication supabase_realtime add table public.notifications;

-- =========
-- PRIVILEGES
-- =========

grant usage on schema public to anon, authenticated, service_role;
grant select on public.categories, public.products to anon, authenticated;
grant select, insert, update on public.orders, public.order_items, public.chat_messages, public.media_assets, public.notification_device_tokens, public.notifications to authenticated;
