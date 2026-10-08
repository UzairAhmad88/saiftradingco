-- =====================================================================
-- SAIF TRADING CO — PROFILES & ADMIN AUTHORIZATION
-- Phase 10 Migration
-- =====================================================================

-- 1. Profiles Table (1-to-1 relationship with auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text not null default 'admin' check (role in ('admin', 'super_admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Trigger for maintaining updated_at timestamp on profiles
drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

-- Index on role for fast authorization lookups
create index if not exists profiles_role_idx on public.profiles (role);

-- 2. Enable Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Authenticated users can read their own profile record
drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = id);

-- Only verified administrators can insert, update, or delete profiles
-- Prevents ordinary authenticated users from escalating their own role
drop policy if exists "Admins can manage profiles" on public.profiles;
create policy "Admins can manage profiles"
  on public.profiles
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- 3. Enhance public.is_admin() to verify both profiles and admin_roles tables
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'super_admin')
  ) or exists (
    select 1 from public.admin_roles
    where user_id = auth.uid() and role in ('admin', 'super_admin')
  );
$$;
