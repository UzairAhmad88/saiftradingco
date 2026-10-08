# Saif Trading Co — Admin Dashboard & Catalogue Management Architecture

## 1. Executive Summary

Phase 11 implements the secure internal operational administrative console for Saif Trading Co. The system empowers authenticated administrators to manage the rough gemstone catalogue, update inventory status, curate homepage features, upload photography, and maintain collection categories without exposing technical implementation details or compromising database security.

---

## 2. Admin System Architecture

```
                                  BROWSER CLIENT
                                        │
                         ┌──────────────┴──────────────┐
                         │                             │
                   Public Website                 Admin Console
                         │                             │
                 /collections, /               /admin/dashboard
                         │                     /admin/gemstones
                         │                     /admin/categories
                         │                     /admin/settings
                         │                             │
                         │                     requireAdmin()
                         │                             │
                         ▼                             ▼
                  SUPABASE CLIENT               SERVER ACTIONS
                 (Public RLS Read)           (Admin RLS Write/Mutate)
                         │                             │
                         └──────────────┬──────────────┘
                                        ▼
                               POSTGRESQL DATABASE
                          (gemstones, categories, images)
                                        │
                                  revalidatePath()
                                        │
                                        ▼
                             UPDATED PUBLIC CATALOGUE
```

---

## 3. Route Map & Navigation

| Route | Access Control | Primary Responsibilities |
| :--- | :--- | :--- |
| `/admin/login` | Public Auth | Dedicated administrator email/password sign-in with rate limiting and generic error feedback. |
| `/admin/unauthorized` | Authenticated | Restricted notification view for non-admin authenticated users with Sign Out & Return actions. |
| `/admin/dashboard` | `requireAdmin()` | Operational overview metrics (Total, Available, Sold, Draft, Hidden, Featured), quick action buttons, recently updated items. |
| `/admin/gemstones` | `requireAdmin()` | Catalogue table & mobile card view with debounced search, status filter, category filter, sorting, and pagination. |
| `/admin/gemstones/new` | `requireAdmin()` | Specimen registration form defaulting to `draft` status, automatic slug generator, physical and mineralogical specifications. |
| `/admin/gemstones/[id]/edit` | `requireAdmin()` | Comprehensive specimen editor with live status toggles, specifications, certification links, and image management. |
| `/admin/categories` | `requireAdmin()` | Mineral species categories overview (Tourmaline, Kunzite, Morganite) with active status toggle and specimen counts. |
| `/admin/settings` | `requireAdmin()` | Authenticated profile view (email, role, UUID), security telemetry summary, and verified read-only business details. |

---

## 4. Status Model & Lifecycle

Every gemstone specimen follows a strict four-state publication lifecycle:

1. **`draft` (Default on creation):**
   - The specimen record is saved to the database but completely excluded from public collection queries, category lists, featured sections, and sitemaps.
   - Prevents accidental premature disclosure of incomplete records.
2. **`available` (Active public catalogue):**
   - The specimen is publicly visible across the collection catalogue, category filter pages, search, and detail routes.
   - Eligible for homepage `featured` curation.
3. **`sold` (Preserved provenance record):**
   - Remains publicly accessible via its direct slug URL (`/gemstones/[slug]`) with an explicit **SOLD** banner.
   - Preserves search engine rankings, incoming trade backlinks, and historic inquiries while preventing duplicate sales.
4. **`hidden` (Delisted / archived):**
   - The specimen is excluded from all public collection lists and sitemaps. Normal visitors cannot view it.
   - Accessible only to administrators in `/admin/gemstones`.

---

## 5. Image & Storage Workflow

- **Storage Bucket:** `gemstones` (Supabase Storage).
- **Accepted Formats:** WebP, JPEG, PNG.
- **Size Limit:** Maximum 10MB per image asset.
- **Path Naming:** `gemstones/[gemstoneId]/[timestamp]-[random].[ext]`.
- **Single Primary Image Guarantee:**
  - Database partial unique index: `gemstone_images_single_primary_idx ON gemstone_images(gemstone_id) WHERE is_primary = true`.
  - Mutational actions (`uploadGemstoneImageAction`, `setPrimaryImageAction`, `deleteGemstoneImageAction`) demote former primary images before setting a new primary image.
  - If a primary image is deleted, the first remaining image is automatically promoted to primary.
- **Reordering:**
  - Supported via `reorderGemstoneImagesAction` which updates `sort_order` sequence.

---

## 6. Security & Authorization Enforcement

1. **Layered Authorization Defense:**
   - **Request Interception (`middleware.ts`):** Validates session cookies and redirects unauthenticated visits.
   - **Server Component Guards (`requireAdmin()`):** Validates Supabase Auth user ID against `public.profiles` role `admin` or `super_admin`.
   - **Server Mutation Actions (`lib/admin/actions.ts`):** Every mutation action executes `await requireAdmin()` before performing operations. Direct endpoint invocation attempts by non-admins or anonymous clients are rejected at the server runtime boundary.
   - **Database Row-Level Security:** PostgreSQL policies enforce `public.is_admin()` for all `INSERT`, `UPDATE`, and `DELETE` commands.
2. **Input Sanitization & Injection Prevention:**
   - All form mutations are validated using strict Zod schemas (`lib/validations/gemstone.ts`).
   - Uniqueness checks for URL slugs and SKU codes reject collisions gracefully without leaking raw database exceptions.
   - Certificate verification URLs enforce valid `https://` schemas.
3. **Storage Security:**
   - Storage RLS permits public `SELECT` on the `gemstones` bucket while restricting `INSERT`, `UPDATE`, and `DELETE` strictly to `public.is_admin()`.

---

## 7. Cache Invalidation & Revalidation Strategy

When an administrator mutates a specimen or category, Next.js App Router cache is selectively purged via `revalidatePath`:
- `revalidatePath("/")`: Purges homepage featured specimens.
- `revalidatePath("/collections")`: Purges public gemstone catalogue and filter indexes.
- `revalidatePath("/collections/[category]", "page")`: Purges mineral group listings.
- `revalidatePath("/gemstones/[slug]")`: Purges the specific specimen detail page.
- `revalidatePath("/admin/gemstones")`: Purges admin catalogue table cache.
- `revalidatePath("/admin/dashboard")`: Purges dashboard aggregate counts.

Edits are immediately visible to visitors on subsequent requests without requiring application rebuilds or redeployment.

---

## 8. Verified Business Information (Read-Only)

Administrative settings displays verified company data:
- **Registered Name:** Saif Trading Co
- **Headquarters:** 417 Flat 4 Floor, Block B, Focal Industrial Centre, 21 Man Lok Street, Hung Hom, Kowloon, Hong Kong
- **Direct Lines:** +852 3525 1640 / +852 9064 9593 / +852 6903 7690
- **Official Trade Email:** Saiftradingco@yahoo.com
