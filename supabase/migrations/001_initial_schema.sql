-- =====================================================================
-- SAIF TRADING CO — SUPABASE PRODUCTION DATA ARCHITECTURE
-- Phase 09 Database Migration
-- =====================================================================

-- 1. Enable Required Extensions
create extension if not exists "pgcrypto";

-- 2. Utility Trigger Function: updated_at Maintenance
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- =====================================================================
-- 3. Categories Table
-- =====================================================================
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  image text,
  seo_title text,
  seo_description text,
  sort_order integer not null default 0 check (sort_order >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Categories updated_at trigger
drop trigger if exists set_categories_updated_at on public.categories;
create trigger set_categories_updated_at
  before update on public.categories
  for each row execute function public.handle_updated_at();

-- Categories Indexes
create index if not exists categories_slug_idx on public.categories (slug);
create index if not exists categories_active_order_idx on public.categories (is_active, sort_order);

-- =====================================================================
-- 4. Gemstones Table
-- =====================================================================
create table if not exists public.gemstones (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories(id) on delete restrict,
  name text not null,
  slug text unique not null,
  sku text unique,
  short_description text,
  description text,
  price numeric check (price is null or price >= 0),
  currency text default 'USD',
  carat_weight numeric check (carat_weight is null or carat_weight > 0),
  dimensions text,
  color text,
  clarity text,
  cut text,
  origin text,
  treatment text,
  certificate_lab text,
  certificate_number text,
  certificate_url text,
  status text not null default 'draft' check (status in ('draft', 'available', 'sold', 'hidden')),
  featured boolean not null default false,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Gemstones updated_at trigger
drop trigger if exists set_gemstones_updated_at on public.gemstones;
create trigger set_gemstones_updated_at
  before update on public.gemstones
  for each row execute function public.handle_updated_at();

-- Gemstones Indexes
create index if not exists gemstones_slug_idx on public.gemstones (slug);
create index if not exists gemstones_category_id_idx on public.gemstones (category_id);
create index if not exists gemstones_status_idx on public.gemstones (status);
create index if not exists gemstones_featured_idx on public.gemstones (featured);
create index if not exists gemstones_created_at_idx on public.gemstones (created_at desc);
create index if not exists gemstones_public_category_idx on public.gemstones (category_id, status);
create index if not exists gemstones_public_featured_idx on public.gemstones (featured, status);

-- =====================================================================
-- 5. Gemstone Images Table
-- =====================================================================
create table if not exists public.gemstone_images (
  id uuid primary key default gen_random_uuid(),
  gemstone_id uuid not null references public.gemstones(id) on delete cascade,
  storage_path text,
  image_url text not null,
  alt_text text,
  caption text,
  sort_order integer not null default 0 check (sort_order >= 0),
  is_primary boolean not null default false,
  created_at timestamptz not null default now()
);

-- Gemstone Images Indexes
create index if not exists gemstone_images_gemstone_id_idx on public.gemstone_images (gemstone_id);
create index if not exists gemstone_images_sort_order_idx on public.gemstone_images (gemstone_id, sort_order);

-- Partial index to enforce at most one primary image per gemstone
create unique index if not exists gemstone_images_single_primary_idx
  on public.gemstone_images (gemstone_id)
  where (is_primary = true);

-- =====================================================================
-- 6. Inquiries Table
-- =====================================================================
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  inquiry_type text not null check (
    inquiry_type in (
      'gemstone_inquiry', 'product_information', 'certification_inquiry', 'general_inquiry',
      'Gemstone Inquiry', 'Product Information', 'Certification Inquiry', 'General Inquiry'
    )
  ),
  gemstone_id uuid references public.gemstones(id) on delete set null,
  gemstone_slug text,
  gemstone_name text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'in_progress', 'resolved', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Inquiries updated_at trigger
drop trigger if exists set_inquiries_updated_at on public.inquiries;
create trigger set_inquiries_updated_at
  before update on public.inquiries
  for each row execute function public.handle_updated_at();

-- Inquiries Indexes
create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
create index if not exists inquiries_status_idx on public.inquiries (status);
create index if not exists inquiries_gemstone_id_idx on public.inquiries (gemstone_id);

-- =====================================================================
-- 7. Admin Roles Table & Authorization Helper (Phase 10/11 Preparation)
-- =====================================================================
create table if not exists public.admin_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade unique,
  role text not null check (role in ('admin', 'super_admin')),
  created_at timestamptz not null default now()
);

create index if not exists admin_roles_user_id_idx on public.admin_roles (user_id);

-- Helper function to verify admin privilege safely server-side
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.admin_roles
    where user_id = auth.uid()
  );
$$;

-- =====================================================================
-- 8. Row Level Security (RLS) Configuration
-- =====================================================================

alter table public.categories enable row level security;
alter table public.gemstones enable row level security;
alter table public.gemstone_images enable row level security;
alter table public.inquiries enable row level security;
alter table public.admin_roles enable row level security;

-- Categories RLS Policies
drop policy if exists "Public can view active categories" on public.categories;
create policy "Public can view active categories"
  on public.categories
  for select
  to anon, authenticated
  using (is_active = true);

drop policy if exists "Admins have full access to categories" on public.categories;
create policy "Admins have full access to categories"
  on public.categories
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Gemstones RLS Policies
drop policy if exists "Public can view published gemstones" on public.gemstones;
create policy "Public can view published gemstones"
  on public.gemstones
  for select
  to anon, authenticated
  using (status in ('available', 'sold'));

drop policy if exists "Admins have full access to gemstones" on public.gemstones;
create policy "Admins have full access to gemstones"
  on public.gemstones
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Gemstone Images RLS Policies
drop policy if exists "Public can view published gemstone images" on public.gemstone_images;
create policy "Public can view published gemstone images"
  on public.gemstone_images
  for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.gemstones g
      where g.id = gemstone_images.gemstone_id
        and g.status in ('available', 'sold')
    )
  );

drop policy if exists "Admins have full access to gemstone images" on public.gemstone_images;
create policy "Admins have full access to gemstone images"
  on public.gemstone_images
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Inquiries RLS Policies
-- Public/Anon users may only insert valid new inquiries
drop policy if exists "Public can insert new inquiries" on public.inquiries;
create policy "Public can insert new inquiries"
  on public.inquiries
  for insert
  to anon, authenticated
  with check (status = 'new');

-- Only admins can select, update, or delete inquiries
drop policy if exists "Admins can view and manage inquiries" on public.inquiries;
create policy "Admins can view and manage inquiries"
  on public.inquiries
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Admin Roles RLS Policies
drop policy if exists "Admins can view admin roles" on public.admin_roles;
create policy "Admins can view admin roles"
  on public.admin_roles
  for select
  to authenticated
  using (public.is_admin());

-- =====================================================================
-- 9. Storage Bucket Configuration (Gemstones)
-- =====================================================================
-- Insert public bucket for gemstone assets if not present
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'gemstones',
  'gemstones',
  true,
  10485760, -- 10MB limit per image
  array['image/webp', 'image/jpeg', 'image/png']
)
on conflict (id) do update set
  public = true,
  file_size_limit = 10485760,
  allowed_mime_types = array['image/webp', 'image/jpeg', 'image/png'];

-- Storage RLS: Public can view images in the gemstones bucket
drop policy if exists "Public can view gemstone bucket images" on storage.objects;
create policy "Public can view gemstone bucket images"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'gemstones');

-- Storage RLS: Only admins can upload, update, or delete images in the gemstones bucket
drop policy if exists "Admins can upload to gemstone bucket" on storage.objects;
create policy "Admins can upload to gemstone bucket"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'gemstones' and public.is_admin());

drop policy if exists "Admins can update gemstone bucket objects" on storage.objects;
create policy "Admins can update gemstone bucket objects"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'gemstones' and public.is_admin())
  with check (bucket_id = 'gemstones' and public.is_admin());

drop policy if exists "Admins can delete from gemstone bucket" on storage.objects;
create policy "Admins can delete from gemstone bucket"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'gemstones' and public.is_admin());
