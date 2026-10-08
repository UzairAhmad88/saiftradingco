# Phase 17: Production Deployment & Infrastructure Specification

**Project:** Saif Trading Co — Premium Rough Gemstone Catalogue & Business Website  
**Date:** October 2026  
**Status:** **READY WITH KNOWN LIMITATIONS** (Codebase, build pipeline, migrations, and deployment configurations are 100% verified; final live DNS propagation and Supabase project binding depend on client registrar details and production credentials).

---

## 1. Hosting Platform
- **Frontend / Application Hosting:** Vercel (Edge Network + Serverless Next.js App Router).
- **Database, Auth & Storage Hosting:** Supabase (Managed PostgreSQL 15+, Supabase Auth, Supabase Storage).
- **Framework & Runtime:** Next.js 16 (App Router, Turbopack, React 19).

---

## 2. Repository Configuration
- **Local Working Path:** `d:\web\saif-trading-co`
- **Version Control:** Git (`git version 2.54.0.windows.1`)
- **Production Branch:** `main`
- **Deployment Baseline Commit:** `a819d06db02cba99a2f7bbe7de01634bfa59a795`
- **Repository Hygiene:** Clean working tree. Hardened `.gitignore` guarantees zero local environment files (`.env`, `.env*.local`, `.env.production`), cache artifacts (`.next`, `tsconfig.tsbuildinfo`), or temporary logs are tracked.

---

## 3. Production Branch Strategy
- **Default Production Branch:** `main`
- **Release Flow:**
  ```
  feature/fix branch  ──►  Pull Request / Review  ──►  Merge to 'main'  ──►  Automatic Vercel Production Deployment
  ```
- Any commit merged to `main` triggers an automatic, deterministic production build on Vercel.

---

## 4. Production Domain Status & Strategy
- **Domain Status:** Pending final client domain confirmation.
- **Protocol:** Enforce HTTPS exclusively.
- **Canonical Hostname Recommendation:**
  - Standard apex domain (e.g., `https://saiftradingco.com`) or `www` subdomain (e.g., `https://www.saiftradingco.com`).
  - Configure automatic 308 permanent redirect from alternate hostname to the preferred canonical hostname in Vercel project settings.
- **Dynamic Fallback:**
  - In `lib/seo/metadata.ts`, `SITE_URL` dynamically resolves `process.env.NEXT_PUBLIC_SITE_URL`, falling back gracefully to Vercel system production URLs (`NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL` or `NEXT_PUBLIC_VERCEL_URL`) so OpenGraph and canonical links are always valid HTTPS URLs.

---

## 5. Vercel Project Configuration
When importing the GitHub repository into Vercel:
1. **Framework Preset:** `Next.js` (automatically detected).
2. **Root Directory:** `./` (default).
3. **Build Command:** `next build` (or `npm run build`).
4. **Output Directory:** `.next` (default).
5. **Install Command:** `npm install` (utilizing `package-lock.json`).
6. **Node.js Version:** `20.x` or `22.x` (LTS recommended).

---

## 6. Supabase Production Project Setup
1. **Project Region:** Recommend East Asia / Hong Kong (`ap-southeast-1` or `ap-east-1`) to minimize database latency to the Hong Kong office and regional Asian gemstone buyers.
2. **Database Migrations:** Apply migration files sequentially from repository:
   - `supabase/migrations/001_initial_schema.sql` (Creates categories, gemstones, gemstone_images, inquiries, and RLS policies).
   - `supabase/migrations/002_profiles_and_auth.sql` (Creates profiles, roles, and `public.is_admin()` function).
   - `supabase/migrations/003_performance_indexes.sql` (Creates composite indexes for status, carats, colors, and recency).
3. **Verified Seed Data:** Run `supabase/seed/001_categories.sql` to populate the 3 verified mineral families:
   - Tourmaline
   - Kunzite
   - Morganite
   *(Zero fake gemstones or destructive operations).*

---

## 7. Environment Variables Checklist (Names Only)

Configure the following environment variables in the Vercel Project Settings under **Settings → Environment Variables**:

| Variable Name | Environment Target | Purpose / Scope |
|:---|:---|:---|
| `NEXT_PUBLIC_SITE_URL` | Production & Preview | Canonical base URL (e.g., `https://saiftradingco.com` or Vercel URL) |
| `NEXT_PUBLIC_SUPABASE_URL` | Production & Preview | Supabase project REST API endpoint |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Production & Preview | Supabase anonymous public client key (RLS enforced) |
| `SUPABASE_SERVICE_ROLE_KEY` | **Production (Server Only)** | Privileged administrative key. **NEVER** expose to Client Bundles or prefix with `NEXT_PUBLIC_`. |
| `NEXT_PUBLIC_OFFICE_TEL` | Production & Preview | Hong Kong landline (`+85235251640`) |
| `NEXT_PUBLIC_MOBILE_1` | Production & Preview | Hong Kong mobile channel (`+85290649593`) |
| `NEXT_PUBLIC_MOBILE_2` | Production & Preview | Hong Kong mobile channel (`+85269037690`) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Production & Preview | Official commercial correspondence email (`Saiftradingco@yahoo.com`) |

---

## 8. Authentication Configuration (Supabase Auth)
In the Supabase Dashboard under **Authentication → URL Configuration**:
1. **Site URL:**
   - Set to the production domain: `https://[client-domain]` (e.g., `https://saiftradingco.com`).
2. **Redirect URLs (Allowlist):**
   - `https://[client-domain]/admin/login`
   - `https://[client-domain]/admin/dashboard`
   - `https://*.vercel.app/**` (allows preview deployments to authenticate securely).
3. **Security Settings:**
   - Enable **Leaked Password Protection** (HaveIBeenPwned database check).
   - Rate limit failed authentication attempts on `/auth/v1/token`.

---

## 9. Storage Configuration (Supabase Storage)
1. **Bucket:** `gemstones`
2. **Access Mode:** Public read enabled (permits Next.js Image Optimization to cache and serve images via CDN).
3. **MIME Type Allowlist:** `image/webp`, `image/jpeg`, `image/png`.
4. **File Size Limit:** 10,485,760 bytes (10 MB).
5. **Mutation Security:** Policies enforce `public.is_admin()` for `INSERT`, `UPDATE`, and `DELETE`.

---

## 10. DNS Configuration & Email Safety

### A. Vercel DNS Records
Once the client provides their registered domain name:
- **Apex Domain (`example.com`):**
  - Type: `A`
  - Name: `@`
  - Value: `76.76.21.21` (Standard Vercel Anycast IP)
- **Subdomain (`www.example.com`):**
  - Type: `CNAME`
  - Name: `www`
  - Value: `cname.vercel-dns.com`

### B. CRITICAL EMAIL PRESERVATION WARNING
> [!IMPORTANT]
> Saif Trading Co relies on **Yahoo Mail** (`Saiftradingco@yahoo.com`) and/or potentially domain-based email for international business correspondence.
> **DO NOT** delete, alter, or overwrite existing:
> - `MX` records
> - `TXT` records for SPF (`v=spf1 ...`)
> - `CNAME` / `TXT` records for DKIM
> - `TXT` records for DMARC (`_dmarc ...`)
>
> Adding Vercel's `A` and `CNAME` web traffic records does not interfere with email DNS when done correctly.

---

## 11. HTTPS & SSL Status
- Vercel automatically provisions and auto-renews free Let's Encrypt / DigiCert SSL certificates upon DNS verification.
- HTTP requests are automatically redirected to HTTPS via HTTP 308 permanent redirects.
- Application headers enforce `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`.

---

## 12. Deployment Process (Step-by-Step)
1. **Push to GitHub:**
   ```bash
   git push origin main
   ```
2. **Link to Vercel:**
   - In Vercel Dashboard, select **Add New Project** → Import Git Repository.
   - Configure environment variables listed in Section 7.
   - Click **Deploy**.
3. **Add Custom Domain:**
   - Go to Vercel Project **Settings → Domains**.
   - Enter client apex domain and `www` variant.
   - Follow Vercel DNS instructions.
4. **Run Database Migrations:**
   - In Supabase SQL Editor, execute migrations `001`, `002`, `003` and seed `001_categories.sql`.
5. **Create First Administrator Account:**
   - Sign up via Supabase Auth Dashboard or `/admin/login`.
   - Update user profile in `public.profiles` to set `role = 'admin'`.

---

## 13. Rollback Procedure
If a production release introduces unforeseen regressions:
1. Open the Vercel Project Dashboard → **Deployments** tab.
2. Locate the previous verified working deployment (e.g., commit `a819d06`).
3. Click the three-dots menu (`...`) next to that deployment and select **Instant Rollback**.
4. Vercel immediately redirects traffic to the previous build artifact in less than 5 seconds without requiring a re-build.
5. In Git, revert the offending commit on a branch before merging back to `main`.

---

## 14. Smoke Testing Protocol

After deployment, perform verification on the live production URL:

| Test Case | Target Route | Expected Outcome |
|:---|:---|:---|
| **1. Public Homepage** | `/` | 200 OK. Hero loads, rough gemstone cards render, fonts load without flash. |
| **2. Collections Grid** | `/collections` | 200 OK. Categories (Tourmaline, Kunzite, Morganite) display with correct specimen counts. |
| **3. Gemstone Detail Page** | `/gemstones/[slug]` | 200 OK. High-resolution crystal photography, physical habit specs, inquiry CTA load. |
| **4. Educational Guide** | `/education/tourmaline-guide` | 200 OK. Mineralogical guide, crystalline habits, and table of contents render cleanly. |
| **5. Contact / Inquiry Form** | `/contact` | 200 OK. Submitting test inquiry passes Zod validation and registers with status `new`. |
| **6. Admin Route Protection** | `/admin/dashboard` | 307/308 Redirect to `/admin/login`. Unauthenticated visitors cannot view inventory. |
| **7. Admin Authentication** | `/admin/login` | Valid admin credentials log in smoothly; invalid credentials display sanitized error. |
| **8. Legal Pages** | `/privacy`, `/terms` | 200 OK. Correct Hong Kong jurisdiction and business correspondence details. |
| **9. Metadata & Sitemap** | `/robots.txt`, `/sitemap.xml` | Valid XML and robots directives pointing to production URL. |
| **10. Responsive Screen Checks** | 320px, 375px, 768px, 1440px | Zero horizontal scroll, touch targets ≥ 44px, sticky header functions smoothly. |

---

## 15. Known Limitations & Next Steps
1. **Custom Domain Propagation:** Pending final client domain details. Until configured, the site is fully functional on the temporary Vercel project domain (`*.vercel.app`).
2. **Supabase Live Credentials:** Requires client to populate production project credentials in Vercel environment settings.
3. **Yahoo Mail Inquiries:** Inquiries are safely stored in PostgreSQL with status `new` for admin triage; external SMTP email relaying can be optionally integrated in a subsequent release.
