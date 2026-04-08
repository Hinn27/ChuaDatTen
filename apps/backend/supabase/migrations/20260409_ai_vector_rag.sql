-- Additional AI/RAG migration
-- Ensure pgvector is enabled for semantic search and RAG storage.

create extension if not exists "vector";

create table if not exists public.rag_documents (
    id uuid primary key default gen_random_uuid(),
    source text not null,
    content text not null,
    embedding vector(1536) not null,
    metadata jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default now()
);

create index if not exists idx_rag_documents_source on public.rag_documents(source);
create index if not exists idx_rag_documents_embedding
on public.rag_documents
using ivfflat (embedding vector_cosine_ops)
with (lists = 100);

alter table public.rag_documents enable row level security;

create policy "rag_documents_admin_rw"
on public.rag_documents
for all
using (
    exists (
        select 1
        from public.profiles p
        where p.id = auth.uid()
          and p.role in ('ADMIN', 'STORE_OWNER')
    )
)
with check (
    exists (
        select 1
        from public.profiles p
        where p.id = auth.uid()
          and p.role in ('ADMIN', 'STORE_OWNER')
    )
);

create or replace function public.semantic_search_rag_documents(
    p_embedding vector(1536),
    p_match_count integer default 5,
    p_source text default null
)
returns table (
    id uuid,
    source text,
    content text,
    similarity_score double precision,
    metadata jsonb
)
language sql
stable
as $$
    select
        d.id,
        d.source,
        d.content,
        1 - (d.embedding <=> p_embedding) as similarity_score,
        d.metadata
    from public.rag_documents d
    where p_source is null or d.source = p_source
    order by d.embedding <=> p_embedding
    limit greatest(1, least(coalesce(p_match_count, 5), 50));
$$;

grant select on public.rag_documents to authenticated;
