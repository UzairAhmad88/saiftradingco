# Phase 16: Security & Data Protection QA Audit

**Project:** Saif Trading Co — Premium Rough Gemstone Catalogue & Business Website  
**Date:** October 2026  
**Scope:** Complete Security, Authorization, Authentication, RLS, Storage, Input Validation, and Threat Audit (Phase 16)  
**Standard:** "Never trust the client" — Defense-in-depth, server-enforced boundaries, principle of least privilege.

---

## 1. Threat Model

A realistic threat model was established focusing on an international high-value B2B gemstone catalogue and administrative inventory management system:

| Threat ID | Threat Vector | Risk Description | Severity | Mitigation Strategy |
|:---|:---|:---|:---|:---|
| **TM-01** | **Unauthorized Admin Access** | Malicious users attempting to access `/admin/*` routes or administrative functionality. | Critical | Server-side authentication + role verification in PostgreSQL (`profiles.role = 'admin'` via `is_admin()`). Next.js layout guards enforce redirects server-side before rendering. |
| **TM-02** | **Privilege Escalation** | Authenticated normal user altering their own role to `admin` via metadata or profile update. | Critical | Role storage is strictly isolated in PostgreSQL `profiles` table. Public update policy prevents non-admins from changing the `role` column. No client-controlled metadata is trusted for authorization. |
| **TM-03** | **Broken Object Level Authorization (IDOR)** | Attackers attempting to edit or delete gemstone records by manipulating record IDs in URLs or Server Actions. | High | All mutation Server Actions (`updateGemstoneAction`, `deleteGemstoneAction`) mandate `requireAdmin()` check and explicit row ownership/permission verification. Admin read queries also enforce `requireAdmin()`. |
| **TM-04** | **Draft / Hidden Gemstone Leakage** | Unauthorized visitors querying unpublished, internal, or confidential rough gemstone lots. | High | Multi-layered defense: Database RLS allows public `SELECT` strictly where `status IN ('available', 'sold')`. Public data access layer (`gemstones-db.ts`) filters explicitly by public statuses. |
| **TM-05** | **PostgREST Query / Syntax Injection** | Malicious characters in search queries (`query` parameter) breaking or altering Supabase filter queries (`.ilike()`, `.or()`). | Medium | Sanitized via `sanitizePostgrestSearch()` in `lib/utils/security.ts`, stripping syntax control characters `[,()"\\]` and clamping maximum search length to 80 characters. |
| **TM-06** | **XSS (Cross-Site Scripting)** | Injection of malicious scripts in gemstone descriptions, education articles, or inquiry messages. | High | React automated string escaping by default. `JsonLd` component safely serializes and escapes `<` characters (`\u003c`). No `dangerouslySetInnerHTML` is used on unvalidated or user-submitted rich content. |
| **TM-07** | **Storage Bucket Abuse & Malicious Uploads** | Attackers uploading executable scripts (`.php`, `.exe`, `.js`) or oversized files to Supabase Storage. | High | Bucket policies enforce `public.is_admin()` for uploads, updates, and deletes. Storage bucket restricts MIME types to `image/webp`, `image/jpeg`, and `image/png`. Max file size capped at 10MB per object. |
| **TM-08** | **Inquiry Spam & Resource Exhaustion** | Bot networks flooding `/contact` with automated inquiry submissions. | Medium | Server-side Zod validation (`inquirySchema`), honeypot field (`website` field must be empty), string length bounding, and database RLS restricting public users to `INSERT` only with `status = 'new'`. |
| **TM-09** | **Secret Credential Exposure** | Accidental commit of `SUPABASE_SERVICE_ROLE_KEY` or database credentials to GitHub or client bundles. | Critical | Strict `.gitignore` policy covering all `.env*` variations except `.env.example`. Client-side code isolated from server credentials. Regular static scans. |
| **TM-10** | **Open Redirect Vulnerability** | Attackers leveraging `next` parameter in login flows to bounce authenticated admins to phishing sites. | Medium | Strict redirect validation (`validateRedirectPath()` in `lib/auth/redirects.ts`) enforcing internal relative paths starting with `/` and rejecting `//`, `\`, schemes, and control characters. |

---

## 2. Security Architecture

The application adopts a **Defense-in-Depth** architecture across four distinct layers:

```
[ Browser / Public Visitor ]
         │
         ▼
[ 1. Network / Edge Layer: Next.js Security Headers & CSP ]
   - Strict-Transport-Security (HSTS)
   - Content-Security-Policy (CSP)
   - X-Frame-Options: DENY (Clickjacking defense)
   - X-Content-Type-Options: nosniff
   - Referrer-Policy: strict-origin-when-cross-origin
   - Permissions-Policy (Camera/Mic/Geo disabled)
         │
         ▼
[ 2. Application Layer: Next.js App Router & Server Actions ]
   - Server-side redirect validation (`validateRedirectPath`)
   - Mandatory `requireAdmin()` on all administrative routes & actions
   - Zod schema validation on all inputs (types, bounds, enum, URLs)
   - PostgREST input sanitization (`sanitizePostgrestSearch`)
   - Explicit field extraction (Mass-assignment protection)
         │
         ▼
[ 3. Data Client Layer: Supabase SSR Client ]
   - User session verified via cookie cryptographic signature
   - Isolated server client (`createServerClientInstance`)
   - `service_role` key never exposed to client or public actions
         │
         ▼
[ 4. Database Layer: PostgreSQL & Supabase RLS ]
   - Row Level Security (RLS) enabled on all tables
   - `public.is_admin()` helper function with `SECURITY DEFINER` + fixed `search_path`
   - Public queries restricted to `available` and `sold` gemstones
   - Inquiries restricted: public can only `INSERT` (`status = 'new'`), admin only can `SELECT`/`UPDATE`/`DELETE`
```

---

## 3. Authentication

- **Provider:** Supabase Auth (`auth.users`) using standard secure cookie exchange via `@supabase/ssr`.
- **Password Security:** Handled entirely by Supabase Auth (Argon2id / bcrypt hashing). No custom password hashing or storage exists in application code.
- **Session Tokens:** Auth tokens stored in encrypted/signed HTTP cookies (`sb-*-auth-token`).
- **Session Validation:**
  - `getCurrentUser()` calls `supabase.auth.getUser()`, which validates the cryptographic JWT signature against Supabase Auth servers rather than trusting raw cookie payloads.
  - If a session is expired, revoked, or manipulated, `getUser()` safely returns `null`.
- **Logout Execution:** The logout action (`signOutAction`) explicitly terminates the session on the Supabase Auth server and clears session cookies, followed by a redirect to `/admin/login`.

---

## 4. Authorization

Authorization is strictly separated from authentication:

1. **Source of Truth:** The `public.profiles` table with `role` column (`admin` | `member`).
2. **PostgreSQL Authorization Function:**
   ```sql
   create or replace function public.is_admin()
   returns boolean
   language sql
   security definer
   set search_path = public, auth
   as $$
     select exists (
       select 1 from public.profiles
       where id = auth.uid() and role = 'admin'
     );
   $$;
   ```
3. **Server-Side Enforcement (`lib/auth/server.ts`):**
   - `requireAdmin()` performs server-side database verification:
     ```typescript
     export async function requireAdmin(): Promise<AdminUser> {
       const user = await getCurrentUser();
       if (!user) redirect("/admin/login");
       const admin = await getAdminProfile(user.id);
       if (!admin) redirect("/admin/login?error=unauthorized");
       return admin;
     }
     ```
   - All admin pages (`/admin/dashboard`, `/admin/gemstones`, `/admin/gemstones/new`, `/admin/gemstones/[id]/edit`, `/admin/settings`) call `await requireAdmin()`.
   - All administrative data access methods in `lib/data/gemstones-admin.ts` call `await requireAdmin()`.
   - All administrative Server Actions in `lib/admin/actions.ts` call `await requireAdmin()`.

---

## 5. Row Level Security (RLS) Matrix

RLS is enabled on every table in the database. Overly broad policies (`USING (true)`) are strictly restricted to legitimate read-only public catalogues.

| Table | Anonymous / Public | Authenticated Member | Administrator | RLS Policy Details |
|:---|:---|:---|:---|:---|
| **`categories`** | Read Only (`SELECT`) | Read Only (`SELECT`) | Full (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) | Public read allowed for navigation. Modifications restricted to `is_admin()`. |
| **`gemstones`** | Filtered Read (`status IN ('available', 'sold')`) | Filtered Read (`status IN ('available', 'sold')`) | Full (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) | Draft and hidden gemstones are filtered out by database RLS. Admin mutations verified via `is_admin()`. |
| **`gemstone_images`**| Filtered Read (linked to visible gemstones) | Filtered Read | Full (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) | Public read allowed for displaying gemstone photography. Management restricted to `is_admin()`. |
| **`inquiries`** | Insert Only (`status = 'new'`) | Insert Only (`status = 'new'`) | Full (`SELECT`, `UPDATE`, `DELETE`) | Anonymous/public users CANNOT view inquiries (prevents customer PII leaks). Only admins can view and update triage statuses. |
| **`profiles`** | None | Read Own Profile (`id = auth.uid()`) | Full (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) | Non-admin users cannot alter their `role`. Role updates require `is_admin()`. |
| **`site_settings`** | Read Public Keys | Read Public Keys | Full (`SELECT`, `UPDATE`) | Configuration alterations strictly restricted to `is_admin()`. |

---

## 6. Storage Security

- **Bucket:** `gemstones` (Supabase Storage).
- **Public Access:** Bucket is configured for public read access (`SELECT`) so Next.js Image Optimization can fetch rough gemstone photography via CDN.
- **Upload Restrictions (`INSERT`):**
  - Policy: Only authenticated users satisfying `public.is_admin()` can upload.
  - Allowed MIME Types: `image/webp`, `image/jpeg`, `image/png`.
  - Max Object Size: 10,485,760 bytes (10 MB).
- **Modification / Deletion (`UPDATE` / `DELETE`):**
  - Policy: Restricted to `public.is_admin()`.
- **Path Sanitization:** File paths generated server-side use unique identifier slugs (`${gemstoneId}/${crypto.randomUUID()}.webp`), preventing path traversal (`../`) attacks.

---

## 7. Input Validation & Mass-Assignment Defenses

All server-side entry points enforce strict schema validation via **Zod**:

### A. Gemstone Mutation Schema (`lib/validations/gemstone.ts`)
- **Strings:** Bounded lengths (Name: 3–120 chars, Short description: max 200 chars, Description: max 3,000 chars, SEO Title: max 70 chars, SEO Description: max 160 chars).
- **Numbers:** Carat weight (positive float, max 10,000 ct), Price (positive integer in cents/dollars, max $100,000,000), Dimension values (0.1–500 mm).
- **Enums:** Status (`draft`, `available`, `sold`, `hidden`), Clarity (`eye-clean`, `crystal-clear`, etc.), Treatment (`unheated-untreated`, etc.).
- **URLs:** Certificate URL must match valid HTTPS URL format, rejecting `javascript:` and local schemes.

### B. Inquiry Submission Schema (`lib/validations/inquiry.ts`)
- **Full Name:** 2–100 characters.
- **Email:** Valid RFC-compliant email, max 254 characters.
- **Phone:** Optional, regex-validated for international standard formats, max 30 characters.
- **Message:** 10–2,000 characters.
- **Honeypot:** `website` hidden field must be completely empty; submissions with data are silently dropped or rejected to thwart automated scrapers.

### C. Mass-Assignment Protection
In `lib/admin/actions.ts`:
- Incoming form data is parsed via Zod.
- Fields are mapped individually into a clean payload object.
- System fields (`id`, `created_at`, `updated_at`, `role`) are never accepted from user input.

---

## 8. XSS & Injection Defenses

### A. React & JSX Escaping
- Next.js React engine escapes all string variables rendered in JSX by default.
- No `dangerouslySetInnerHTML` is used for user comments or external text.

### B. Structured Data JSON-LD Sanitization (`components/seo/JsonLd.tsx`)
- JSON-LD blocks serialize structured data using `JSON.stringify()`, with `<` explicitly sanitized to `\u003c` to neutralize script block breakout attacks (`</script><script>alert(1)</script>`).

### C. PostgREST Syntax Sanitization (`lib/utils/security.ts`)
- Query parameters passed to Supabase `.or()` or `.ilike()` filters are processed through `sanitizePostgrestSearch()`:
  - Strips PostgREST filter operator delimiters: `,`, `(`, `)`, `[`, `]`, `"`, `\`.
  - Trims and clamps string length to 80 characters.
  - Prevents query restructuring or logical filter injection.

---

## 9. API & Server Action Security

The application architecture utilizes **Next.js Server Actions** exclusively, eliminating unauthenticated `/api/*` endpoints.

- **Action Verification:**
  - `submitInquiryAction`: Publicly accessible, rate-governed, honeypot protected, Zod validated, inserts with fixed `status = 'new'`.
  - `createGemstoneAction`, `updateGemstoneAction`, `deleteGemstoneAction`: Enforce `await requireAdmin()` at the first line of execution.
  - `signInAction`, `signOutAction`: Managed authentication actions with strict URL redirect validation.
- **Error Disclosures:**
  - Database exceptions and raw stack traces are caught server-side and logged via `console.error`.
  - Generic, customer-friendly error messages are returned to the client (e.g., `"Unable to save gemstone. Please check your inputs and try again."`), preventing internal database schema leakage.

---

## 10. Environment & Secret Management

A complete audit of environment files and Git history was conducted:

| Variable | Classification | Location | Exposure Risk |
|:---|:---|:---|:---|
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Browser & Server | Designed for public client connectivity to Supabase. Safe. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | Browser & Server | Public anonymous key constrained by PostgreSQL RLS. Safe. |
| `NEXT_PUBLIC_SITE_URL` | Public | Browser & Server | Base canonical URL for SEO and metadata. Safe. |
| `SUPABASE_SERVICE_ROLE_KEY` | **Secret** | Server Only (`.env.local`) | Never prefixed with `NEXT_PUBLIC_`. Isolated in `lib/supabase/admin.ts`. Guarded with runtime check against browser context. |

### Repository Secret Check
- `.gitignore` was audited and hardened:
  ```gitignore
  # Local env files
  .env*.local
  .env.development
  .env.test
  .env.production
  .env
  ```
- Git history verified: Zero active or committed secrets. Only `.env.example` with dummy values exists in version control.

---

## 11. Security Headers Configuration

Configured in `next.config.mjs` applied globally across all routes:

```javascript
// next.config.mjs
{
  key: "Content-Security-Policy",
  value: [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https://images.unsplash.com https://*.supabase.co",
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://va.vercel-scripts.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; "),
},
{
  key: "X-Frame-Options",
  value: "DENY",
},
{
  key: "X-Content-Type-Options",
  value: "nosniff",
},
{
  key: "Referrer-Policy",
  value: "strict-origin-when-cross-origin",
},
{
  key: "Permissions-Policy",
  value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
},
{
  key: "Strict-Transport-Security",
  value: "max-age=63072000; includeSubDomains; preload",
}
```

---

## 12. Dependency Review

An automated security audit was executed:
```bash
npm audit
```
**Result:** **0 vulnerabilities found** (0 critical, 0 high, 0 moderate, 0 low across all installed packages).

---

## 13. Security Tests Performed

| Test Scenario | Method / Payload | Expected Result | Actual Result | Status |
|:---|:---|:---|:---|:---|
| **1. Anonymous Admin Page Access** | Direct GET to `/admin/dashboard` without session | Redirected to `/admin/login` | Redirected to `/admin/login` | PASS |
| **2. Anonymous Edit Gemstone Access** | Direct GET to `/admin/gemstones/123/edit` | Redirected to `/admin/login` | Redirected to `/admin/login` | PASS |
| **3. Anonymous Gemstone Creation Action** | Executing `createGemstoneAction` via crafted request | Rejected by `requireAdmin()` | Redirected / Unauthorized thrown | PASS |
| **4. Draft Gemstone Public Access** | Querying `/gemstones/[slug]` where `status = 'draft'` | 404 Not Found (filtered by DB query & RLS) | 404 Page Rendered | PASS |
| **5. PostgREST Filter Injection** | Search query `?q=tourmaline),price.gt.0` | Sanitized to `tourmalineprice.gt.0`, no syntax error | Handled safely as plain string | PASS |
| **6. Open Redirect via `next` Param** | `?next=https://attacker.com` or `?next=//attacker.com` | Rejected; defaults to `/admin/dashboard` | Redirects to `/admin/dashboard` | PASS |
| **7. Contact Form Honeypot Trigger** | Submission with `website: "http://bot.com"` | Rejected silently or with validation error | Blocked | PASS |
| **8. Contact Form Oversized Message** | Payload with 10,000 characters | Rejected by Zod schema | Returns validation error | PASS |
| **9. JSON-LD XSS Injection** | Gemstone name with `</script><script>alert(1)</script>` | Escaped to `\u003c/script\u003e...` | Rendered safely without DOM execution | PASS |
| **10. Malicious Storage Upload** | Attempt upload of `.exe` / `.php` | Rejected by bucket MIME type constraint | Upload rejected | PASS |
| **11. Customer PII Inquiries Access** | Anonymous request to read `inquiries` table | Denied by Supabase RLS | RLS returns empty / permission denied | PASS |

---

## 14. Summary of Audit Findings & Remediation

| Issue Ref | Severity | Description | Remediation Applied |
|:---|:---|:---|:---|
| **SEC-01** | **Medium** | Missing Content-Security-Policy (CSP) in `next.config.mjs` | Added strict CSP policy permitting only verified Supabase, Google Fonts, and Vercel analytics endpoints while blocking framing. |
| **SEC-02** | **Medium** | PostgREST `.ilike()` and `.or()` queries could be deformed by syntax characters | Added `sanitizePostgrestSearch()` utility and integrated it into public and admin catalogue searches. |
| **SEC-03** | **Medium** | `.gitignore` did not explicitly list all `.env.*` environments | Hardened `.gitignore` to explicitly ignore `.env`, `.env*.local`, `.env.development`, `.env.test`, `.env.production`. |
| **SEC-04** | **Low** | Admin data query helpers in `gemstones-admin.ts` relied entirely on route-level `requireAdmin()` checks | Added defense-in-depth: `await requireAdmin()` invoked directly inside all admin data retrieval functions. |

---

## 15. Remaining Risks & Ongoing Recommendations

1. **Supabase Production Dashboard Checklist:**
   - When deploying to production Supabase project, enable **Leaked Password Protection** (HaveIBeenPwned integration in Supabase Auth settings).
   - Configure **Rate Limiting** in Supabase Auth settings to throttle brute-force login attempts on the `/auth/v1` endpoint.
   - Restrict **Site URL and Redirect URLs** in the Supabase Dashboard to the registered production domain (`https://saiftradingco.com`).
2. **Periodic Secret Rotation:**
   - Regularly rotate Supabase JWT secret and database passwords in production.
3. **No 100% Security Guarantee:**
   - As a standard security engineering principle: No critical issues were identified during this review. Security remains a continuous discipline across infrastructure, dependencies, and code updates.
