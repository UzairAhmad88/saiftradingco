# Saif Trading Co — Production Admin Portal & CMS Architecture

This document provides complete documentation for the operational administration portal and content management system (CMS) powering **Saif Trading Co**.

---

## 1. Admin Portal URL & Access

- **Login URL:** `/admin/login`
- **Dashboard Overview:** `/admin/dashboard`
- **Gemstone Management:** `/admin/gemstones`
- **Add Gemstone:** `/admin/gemstones/new`
- **Edit Gemstone:** `/admin/gemstones/[id]/edit`
- **Category Management:** `/admin/categories`
- **Trade Inquiries:** `/admin/inquiries`
- **Settings:** `/admin/settings`
- **Unauthorized Guard:** `/admin/unauthorized`

> **Security Rule:** The public navbar contains NO admin links. Access to `/admin` routes is guarded by Next.js middleware and server-side role verification.

---

## 2. Authentication Flow & Role Model

Authentication uses **Supabase Auth** with secure, httpOnly session cookies managed via `@supabase/ssr`.

### Server-Side Guard Pipeline:
1. **Middleware Guard (`middleware.ts` & `lib/supabase/middleware.ts`):**
   - Intercepts requests to `/admin/*`.
   - Refreshes auth tokens via Supabase SSR.
   - Redirects unauthenticated requests to `/admin/login?next=[currentPath]`.
2. **Server-Side Role Guard (`lib/auth/server.ts` -> `requireAdmin()`):**
   - Retrieves active user session securely using `supabase.auth.getUser()`.
   - Queries database tables `profiles` and `admin_roles` for verified role (`admin` or `super_admin`).
   - Rejects forged user metadata (`raw_user_meta_data` is never trusted for authorization).
   - If user is authenticated but not an admin, immediately redirects to `/admin/unauthorized`.
3. **Server Action Mutation Guard:**
   - Every sensitive server action (`createGemstoneAction`, `updateGemstoneAction`, `deleteGemstoneAction`, `uploadGemstoneImageAction`, `deleteGemstoneImageAction`, `createCategoryAction`, `updateCategoryAction`, `deleteCategoryAction`, `updateInquiryStatusAction`, `deleteInquiryAction`) independently executes `await requireAdmin()` before performing any database or storage operations.

---

## 3. Database Architecture & Tables

The production PostgreSQL database contains the following relational tables (configured in `supabase/production_schema_complete.sql`):

### 1. `categories`
- `id` (UUID, Primary Key)
- `name` (TEXT, unique, e.g. "Tourmaline", "Kunzite", "Morganite")
- `slug` (TEXT, unique, URL-safe identifier)
- `description` (TEXT)
- `image` (TEXT)
- `sort_order` (INTEGER, ordering in catalogue)
- `is_active` (BOOLEAN, enables/disables public display)
- `created_at`, `updated_at` (TIMESTAMPTZ)

### 2. `gemstones`
- `id` (UUID, Primary Key)
- `category_id` (UUID, Foreign Key -> `categories.id` ON DELETE RESTRICT)
- `name` (TEXT, specimen title)
- `slug` (TEXT, unique URL path, e.g. `raw-green-tourmaline`)
- `sku` (TEXT, unique inventory trade identifier)
- `short_description` (TEXT)
- `description` (TEXT)
- `price` (NUMERIC, commercial trade pricing)
- `currency` (TEXT, default 'USD')
- `carat_weight` (NUMERIC, physical crystal weight)
- `dimensions` (TEXT, e.g. "42 x 18 x 14 mm")
- `color` (TEXT, e.g. "Vivid Forest Green")
- `clarity` (TEXT, e.g. "Gemmy / Transparent Termination")
- `cut` (TEXT, e.g. "Natural Crystal Prism")
- `origin` (TEXT, e.g. "Paprok, Nuristan, Afghanistan")
- `treatment` (TEXT, e.g. "Unheated / Untreated Natural Crystal")
- `certificate_lab`, `certificate_number`, `certificate_url` (Certification verification)
- `status` (TEXT, Enum: `'draft'`, `'available'`, `'sold'`, `'hidden'`)
- `featured` (BOOLEAN, determines homepage showcase eligibility)
- `seo_title`, `seo_description` (Custom metadata overrides)
- `created_at`, `updated_at` (TIMESTAMPTZ)

### 3. `gemstone_images`
- `id` (UUID, Primary Key)
- `gemstone_id` (UUID, Foreign Key -> `gemstones.id` ON DELETE CASCADE)
- `storage_path` (TEXT, path within Supabase Storage bucket `gemstones`)
- `image_url` (TEXT, public CDN asset URL)
- `alt_text` (TEXT, accessible image description)
- `sort_order` (INTEGER, ordering index)
- `is_primary` (BOOLEAN, primary catalogue thumbnail flag)
- `created_at` (TIMESTAMPTZ)
- *Constraint:* Unique partial index `gemstone_images_single_primary_idx` guarantees at most one primary image per specimen.

### 4. `inquiries`
- `id` (UUID, Primary Key)
- `name`, `email`, `phone` (Customer trade correspondence)
- `inquiry_type` (Enum: `'gemstone_inquiry'`, `'product_information'`, `'certification_inquiry'`, `'general_inquiry'`)
- `gemstone_id` (UUID, Foreign Key -> `gemstones.id` ON DELETE SET NULL)
- `gemstone_slug`, `gemstone_name` (Historical specimen references)
- `message` (TEXT, inquiry content)
- `status` (Enum: `'new'`, `'in_progress'`, `'resolved'`, `'archived'`)
- `created_at`, `updated_at` (TIMESTAMPTZ)

### 5. `profiles` & `admin_roles`
- Contains verified administrative users authorized to modify catalogue content.

---

## 4. Publication Lifecycle & Status Meanings

1. **`draft`**:
   - Only visible to authenticated administrators inside the Admin Console.
   - Omitted from public catalogue queries (`/collections`, `/collections/[category]`, `/`).
   - Blocked by `notFound()` on public `/gemstones/[slug]`.
   - Never indexed by search engine crawlers (`noindex`).
2. **`available`**:
   - Actively displayed on public collection pages and search.
   - Accessible via `/gemstones/[slug]`.
   - Eligible for homepage showcase if `featured = true`.
3. **`sold`**:
   - Preserves permanent URL on `/gemstones/[slug]` with clear "Sold" badge.
   - Preserves historical sales documentation and SEO link equity.
   - Filterable in public collections as archived inventory.
4. **`hidden`**:
   - Preserved in administrative database.
   - De-listed from normal public catalogue browsing.

---

## 5. Image Upload & Storage Workflow

- **Storage Bucket:** `gemstones` (Public read, Authenticated Admin write/update/delete).
- **Supported Formats:** WebP, JPEG, PNG.
- **Maximum File Size:** 10 MB per image.
- **Path Hierarchy:** `gemstones/{gemstone_id}/{timestamp}-{random}.[ext]`.
- **Workflow:**
  1. Admin selects image in `GemstoneImageManager`.
  2. Client validates format and file size limit.
  3. Server action `uploadGemstoneImageAction` validates file buffer and uploads to Supabase Storage via `supabase.storage.from("gemstones").upload()`.
  4. Retrieves public URL and creates record in `gemstone_images`.
  5. If first image, automatically designates `is_primary = true`.
  6. Instant revalidation of affected gemstone and catalogue paths.
- **Image Deletion Cleanup:**
  - Deleting an image in the UI removes the row from `gemstone_images` and removes the file object from Supabase Storage (`supabase.storage.from("gemstones").remove([storage_path])`), preventing orphaned storage bloat.
  - If the deleted image was primary, the system automatically promotes the next image in sequence to primary.

---

## 6. Trade Inquiry Workflow

1. Public visitor visits `/gemstones/[slug]` and clicks "Request Specimen Dossier" / "Inquire".
2. The inquiry form captures the visitor's name, email, phone, inquiry type, and automatically attaches `gemstone_id`, `gemstone_slug`, and `gemstone_name`.
3. Upon submission, `submitInquiryService` validates with Zod, checks honeypots, and inserts the record into Supabase `inquiries` table with `status = 'new'`.
4. The administrator opens `/admin/inquiries` and sees:
   - Status triage tabs with badge counters (New, In Progress, Resolved, Archived).
   - Fast status updates via dropdown.
   - Specimen link directly to the target gemstone page.
   - Complete message drawer with one-click "Reply by Email" action.

---

## 7. Next.js Cache Invalidation & Instant Propagation

To guarantee that changes in the Admin Console immediately propagate to public visitors without restarting the application or requiring manual redeployments, every mutation triggers `revalidateCataloguePaths()`:

- `revalidatePath("/")` (Updates homepage featured specimens)
- `revalidatePath("/collections")` (Updates catalogue index and category counts)
- `revalidatePath("/collections/[category]", "page")` (Updates dynamic category grids)
- `revalidatePath("/collections/tourmaline")`
- `revalidatePath("/collections/kunzite")`
- `revalidatePath("/collections/morganite")`
- `revalidatePath("/gemstones/[slug]")` (Updates individual specimen details, pricing, status)
- `revalidatePath("/admin/dashboard")` (Updates live operational counters)
- `revalidatePath("/admin/gemstones")` (Updates admin table)
- `revalidatePath("/admin/categories")` (Updates category list)

---

## 8. Required Environment Variables

```ini
# Base Canonical URL
NEXT_PUBLIC_SITE_URL=https://saiftrading.co

# Supabase Public Keys
NEXT_PUBLIC_SUPABASE_URL=https://zafmpwmvcfrmaloscnkj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_g6lUAcT2dE_Yo5m2uo--SA_jXC1DET1
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_g6lUAcT2dE_Yo5m2uo--SA_jXC1DET1

# Supabase Server Key (Optional for bypass tasks; regular admin flows use session cookies)
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Trade Communication Channels
NEXT_PUBLIC_OFFICE_TEL=+85235251640
NEXT_PUBLIC_MOBILE_1=+85290649593
NEXT_PUBLIC_MOBILE_2=+85269037690
NEXT_PUBLIC_CONTACT_EMAIL=Saiftradingco@yahoo.com
```

---

## 9. Initial Database Migration Execution

If setting up a fresh Supabase project or verifying table existence:
1. Open the **Supabase Dashboard** for project `zafmpwmvcfrmaloscnkj`.
2. Navigate to **SQL Editor**.
3. Copy the full contents of `supabase/production_schema_complete.sql`.
4. Click **Run** to provision all tables, indexes, RLS policies, storage bucket, triggers, and seed categories.
5. In **Authentication -> Users**, create or confirm your admin account. The automatic trigger `on_auth_user_created` will create the associated profile with `role = 'admin'`.
