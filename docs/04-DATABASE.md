# Saif Trading Co — Database & Production Data Architecture

This document specifies the PostgreSQL relational architecture, Row Level Security (RLS) policies, storage bucket configurations, and query patterns powering the **Saif Trading Co** gemstone catalogue and inquiry platform.

---

## 1. Architectural Overview

- **Engine:** PostgreSQL 15+ hosted on Supabase.
- **Client Access:** `@supabase/ssr` (Server Components, Route Handlers, Server Actions) and `@supabase/supabase-js`.
- **Security Paradigm:** Database-enforced Row Level Security (RLS) on all exposed tables.
- **Separation of Concerns:**
  - **Public User / Anon:** Restricted to reading active categories, published gemstones (`available` or `sold`), and inserting new inquiries (`status = 'new'`).
  - **Authenticated Admin:** Database-backed role checks via `public.is_admin()` granting management privileges.
  - **Service Role:** Strict server-only client for background tasks, bypassing RLS where required.

---

## 2. Relational Schema & Tables

### 2.1 `categories`
Stores verified mineral families specialized by Saif Trading Co (`Tourmaline`, `Kunzite`, `Morganite`).

| Column | Type | Constraints / Defaults | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | Primary Key, `gen_random_uuid()` | Internal unique identifier |
| `name` | `TEXT` | `NOT NULL` | Category display title (e.g., "Tourmaline") |
| `slug` | `TEXT` | `NOT NULL UNIQUE` | URL-safe identifier (e.g., "tourmaline") |
| `description`| `TEXT` | `NULL` | Concise mineralogical summary |
| `image` | `TEXT` | `NULL` | Representative collection photograph path |
| `seo_title` | `TEXT` | `NULL` | Custom meta title override |
| `seo_description`| `TEXT` | `NULL` | Custom meta description override |
| `sort_order` | `INTEGER` | `NOT NULL DEFAULT 0`, `CHECK (sort_order >= 0)` | Display sort order |
| `is_active` | `BOOLEAN` | `NOT NULL DEFAULT true` | Active visibility flag |
| `created_at` | `TIMESTAMPTZ`| `NOT NULL DEFAULT now()` | Record creation timestamp |
| `updated_at` | `TIMESTAMPTZ`| `NOT NULL DEFAULT now()` | Maintained by trigger `handle_updated_at` |

### 2.2 `gemstones`
Stores physical rough gemstone crystal lots and specimens.

| Column | Type | Constraints / Defaults | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | Primary Key, `gen_random_uuid()` | Internal unique identifier |
| `category_id` | `UUID` | `NOT NULL REFERENCES categories(id) ON DELETE RESTRICT` | Mineral family foreign key |
| `name` | `TEXT` | `NOT NULL` | Specimen title |
| `slug` | `TEXT` | `NOT NULL UNIQUE` | URL-safe SEO slug |
| `sku` | `TEXT` | `UNIQUE` | Deterministic trade stock code (e.g., `STC-TRM-01`) |
| `short_description`| `TEXT` | `NULL` | Card summary for catalogue grids |
| `description`| `TEXT` | `NULL` | In-depth lapidary and physical description |
| `price` | `NUMERIC` | `CHECK (price IS NULL OR price >= 0)` | Price in specified currency (NULL if inquiry-only) |
| `currency` | `TEXT` | `DEFAULT 'USD'` | Currency code |
| `carat_weight`| `NUMERIC`| `CHECK (carat_weight IS NULL OR carat_weight > 0)` | Exact carat weight |
| `dimensions` | `TEXT` | `NULL` | Physical caliper dimensions (e.g., "34 x 18 x 14 mm") |
| `color` | `TEXT` | `NULL` | Natural diagnostic hue |
| `clarity` | `TEXT` | `NULL` | Rough clarity grade |
| `cut` | `TEXT` | `NULL` | Habit description (e.g., "Natural Crystal Prism") |
| `origin` | `TEXT` | `NULL` | Documented origin (NULL if unconfirmed) |
| `treatment` | `TEXT` | `NULL` | Verified disclosure (e.g., "None / Untreated") |
| `certificate_lab`| `TEXT` | `NULL` | Accredited testing laboratory |
| `certificate_number`|`TEXT`| `NULL` | Report verification code |
| `certificate_url`| `TEXT`| `NULL` | Public laboratory report PDF/link |
| `status` | `TEXT` | `NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'available', 'sold', 'hidden'))` | Visibility lifecycle |
| `featured` | `BOOLEAN` | `NOT NULL DEFAULT false` | Homepage curation flag |
| `seo_title` | `TEXT` | `NULL` | Page title tag |
| `seo_description`|`TEXT` | `NULL` | Meta description tag |
| `created_at` | `TIMESTAMPTZ`| `NOT NULL DEFAULT now()` | Record creation timestamp |
| `updated_at` | `TIMESTAMPTZ`| `NOT NULL DEFAULT now()` | Maintained by trigger `handle_updated_at` |

### 2.3 `gemstone_images`
Stores multi-angle photographic documentation for each specimen.

| Column | Type | Constraints / Defaults | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | Primary Key, `gen_random_uuid()` | Internal unique identifier |
| `gemstone_id` | `UUID` | `NOT NULL REFERENCES gemstones(id) ON DELETE CASCADE` | Specimen parent reference |
| `storage_path`| `TEXT` | `NULL` | Path within Supabase storage bucket |
| `image_url` | `TEXT` | `NOT NULL` | Public URL or CDN asset path |
| `alt_text` | `TEXT` | `NULL` | Accessible image description |
| `caption` | `TEXT` | `NULL` | Editorial caption or angle note |
| `sort_order` | `INTEGER` | `NOT NULL DEFAULT 0`, `CHECK (sort_order >= 0)` | Gallery display sequence |
| `is_primary` | `BOOLEAN` | `NOT NULL DEFAULT false` | Primary hero/card image flag |
| `created_at` | `TIMESTAMPTZ`| `NOT NULL DEFAULT now()` | Record creation timestamp |

> **Partial Index Constraint:** `gemstone_images_single_primary_idx` ensures that at most one image per gemstone can have `is_primary = true`.

### 2.4 `inquiries`
Stores trade contact inquiries submitted through `/contact`.

| Column | Type | Constraints / Defaults | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | Primary Key, `gen_random_uuid()` | Unique record identifier |
| `name` | `TEXT` | `NOT NULL` | Submitter full name |
| `email` | `TEXT` | `NOT NULL` | Submitter contact email |
| `phone` | `TEXT` | `NULL` | Optional direct phone / mobile line |
| `inquiry_type`| `TEXT` | `NOT NULL` | Controlled inquiry topic |
| `gemstone_id` | `UUID` | `REFERENCES gemstones(id) ON DELETE SET NULL` | Linked specimen reference |
| `gemstone_slug`| `TEXT` | `NULL` | Preserved slug for historical traceability |
| `gemstone_name`| `TEXT` | `NULL` | Preserved title for historical traceability |
| `message` | `TEXT` | `NOT NULL` | Inquirer trade query |
| `status` | `TEXT` | `NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'archived'))` | Operational state |
| `created_at` | `TIMESTAMPTZ`| `NOT NULL DEFAULT now()` | Submission timestamp |
| `updated_at` | `TIMESTAMPTZ`| `NOT NULL DEFAULT now()` | Maintained by trigger `handle_updated_at` |

### 2.5 `admin_roles` (Phase 10/11 Authorization Foundation)
Stores authorized administrators mapped to Supabase `auth.users`.

| Column | Type | Constraints / Defaults | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | Primary Key, `gen_random_uuid()` | Internal unique identifier |
| `user_id` | `UUID` | `NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE` | Authenticated user ID |
| `role` | `TEXT` | `NOT NULL CHECK (role IN ('admin', 'super_admin'))` | Administrative privilege tier |
| `created_at` | `TIMESTAMPTZ`| `NOT NULL DEFAULT now()` | Role granting timestamp |

---

## 3. Row Level Security (RLS) Matrix

| Table | Operation | Role | Policy Rule |
| :--- | :--- | :--- | :--- |
| `categories` | `SELECT` | `anon`, `authenticated` | `is_active = true` |
| `categories` | `ALL` | `authenticated` (Admin) | `public.is_admin()` |
| `gemstones` | `SELECT` | `anon`, `authenticated` | `status IN ('available', 'sold')` |
| `gemstones` | `ALL` | `authenticated` (Admin) | `public.is_admin()` |
| `gemstone_images` | `SELECT` | `anon`, `authenticated` | Gemstone status is `available` or `sold` |
| `gemstone_images` | `ALL` | `authenticated` (Admin) | `public.is_admin()` |
| `inquiries` | `INSERT` | `anon`, `authenticated` | `status = 'new'` |
| `inquiries` | `SELECT` | `authenticated` (Admin) | `public.is_admin()` (Public CANNOT read) |
| `inquiries` | `UPDATE/DELETE`| `authenticated` (Admin) | `public.is_admin()` (Public CANNOT modify) |
| `admin_roles` | `SELECT` | `authenticated` (Admin) | `public.is_admin()` |

---

## 4. Storage Architecture (`gemstones` Bucket)

- **Bucket Name:** `gemstones`
- **Visibility:** Public (`public = true`) for asset distribution.
- **Allowed MIME Types:** `image/webp`, `image/jpeg`, `image/png`.
- **Max File Size:** 10 MB per image.
- **Path Hierarchy:**
  ```
  gemstones/{gemstone_id}/{filename}.webp
  ```
- **Storage Policies:**
  - `SELECT`: Open to `anon` and `authenticated`.
  - `INSERT / UPDATE / DELETE`: Restricted strictly to `public.is_admin()`.

---

## 5. Migration Execution

To apply the migration and seed data in your Supabase project:

1. **Via Supabase Dashboard:**
   - Navigate to the **SQL Editor** in your Supabase dashboard.
   - Run the contents of `supabase/migrations/001_initial_schema.sql`.
   - Run the seed file `supabase/seed/001_categories.sql`.

2. **Via Supabase CLI:**
   ```bash
   npx supabase db push
   ```

---

## 6. Environment Variables

Configure the following variables in `.env.local`:

```ini
# Supabase Public API (Safe for client components)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Supabase Privileged Key (STRICT SERVER-ONLY — NEVER expose in browser)
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

When Supabase environment variables are omitted or offline, the application seamlessly uses the resilient in-memory data layer in `lib/data/collections-data.ts`.
