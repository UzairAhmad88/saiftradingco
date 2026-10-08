-- =====================================================================
-- SAIF TRADING CO — PERFORMANCE OPTIMIZATION & INDEXES
-- Phase 14 Database Migration
-- =====================================================================

-- 1. Composite Index for Public Status and Publication Recency
-- Accelerates default catalogue queries: WHERE status IN ('available', 'sold') ORDER BY created_at DESC
create index if not exists gemstones_status_created_idx 
  on public.gemstones (status, created_at desc);

-- 2. Composite Index for Public Status and Carat Weight Range Filtering
-- Accelerates queries: WHERE status IN ('available', 'sold') AND carat_weight BETWEEN X AND Y
create index if not exists gemstones_status_carat_idx 
  on public.gemstones (status, carat_weight);

-- 3. Composite Index for Status and Color Filtering
create index if not exists gemstones_status_color_idx 
  on public.gemstones (status, color);

-- 4. Composite Index for Homepage Curated Showcase
-- Accelerates: WHERE status = 'available' AND featured = true ORDER BY created_at DESC
create index if not exists gemstones_featured_active_idx 
  on public.gemstones (featured, status, created_at desc);

-- 5. Inquiry Triage Index for Admin Dashboard
-- Accelerates: WHERE status = 'new' ORDER BY created_at DESC
create index if not exists inquiries_status_created_idx 
  on public.inquiries (status, created_at desc);
