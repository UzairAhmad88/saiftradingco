# Phase 19: Final Client Handover & Production Specification

**Project:** Saif Trading Co — Premium Rough Gemstone Catalogue & Business Website  
**Business Specialty:** Natural Rough Tourmaline, Kunzite & Morganite  
**Address:** 417 Flat 4 Floor, Block B, Focal Industrial Centre, 21 Man Lok Street, Hung Hom, Kowloon, Hong Kong  
**Contact:** Tel: +852 3525 1640 | Mobile: +852 9064 9593 / +852 6903 7690 | Email: Saiftradingco@yahoo.com  
**Handover Status:** **READY FOR HANDOVER**  

---

## 1. Project Overview

Saif Trading Co is a luxury-grade digital catalogue, editorial education platform, and commercial trade inquiry system designed specifically for a specialist rough gemstone supplier based in Hung Hom, Kowloon, Hong Kong.

The platform provides:
- A responsive, high-performance web presence showcasing authentic rough Tourmaline, Kunzite, and Morganite crystal specimens.
- A transparent inquiry experience allowing collectors and gemstone houses worldwide to request detailed specimen documentation or schedule physical viewings in Hong Kong.
- An in-depth gemological education system explaining crystallography, pleochroism, specimen care, and laboratory testing standards.
- A secure administrative dashboard for managing gemstone inventory, high-resolution photography, availability states, mineral categories, and triage inquiries.

---

## 2. Technology Stack

- **Framework:** Next.js 16 (App Router, React Server Components, Turbopack)
- **Language:** TypeScript 5.x (Strict mode enabled, zero unresolved type errors)
- **Styling:** Tailwind CSS (v4 PostCSS, custom design tokens, responsive typography)
- **UI Components:** Custom accessible components styled with luxury minimal aesthetic (WCAG 2.1 AA compliant)
- **Icons:** Lucide React
- **Database & Backend:** Supabase Managed PostgreSQL 15+ (Row Level Security enforced)
- **Authentication:** Supabase Auth (Argon2id/bcrypt hashed passwords, secure signed cookies via `@supabase/ssr`)
- **Object Storage:** Supabase Storage (Public read CDN, admin-only authenticated uploads)
- **Hosting & Edge:** Vercel Edge Network (Global CDN, automated SSL/TLS certificates)
- **Version Control:** Git on `main` branch

---

## 3. Production URL & Environment

- **Current Deployment Baseline:** Vercel Production Environment (bound via GitHub repository `main` branch).
- **Target Custom Domain:** Client-owned apex domain (e.g., `https://saiftradingco.com` or `https://www.saiftradingco.com`).
- **Dynamic Site URL Resolution:** Configured in `lib/seo/metadata.ts` with automatic fallback to Vercel system production URLs, preventing broken localhost references.

---

## 4. Repository Structure

```
saif-trading-co/
├── app/                        # Next.js App Router (41 static & dynamic routes)
│   ├── about/                  # Company background & Hung Hom showroom details
│   ├── admin/                  # Secure administrative console (dashboard, CRUD, settings)
│   ├── certification/          # Testing standards & laboratory report disclosure
│   ├── collections/            # Catalogue index & category pages (Tourmaline, Kunzite, Morganite)
│   ├── contact/                # Direct trade desk, inquiry forms, and contact cards
│   ├── education/              # 7 in-depth gemological education guides
│   ├── gemstones/[slug]/       # High-resolution specimen detail pages
│   ├── privacy/ & terms/       # Hong Kong Cap. 486 compliant legal policies
│   ├── robots.ts & sitemap.ts  # Dynamic SEO crawlers & XML sitemap
│   └── not-found.tsx           # Accessible 404 page with return navigation
├── components/                 # Accessible, reusable UI & editorial components
│   ├── admin/                  # Admin tables, image managers, filter bars, quick actions
│   ├── collections/            # Catalogue grids, facet controls, skeletons, pagination
│   ├── contact/                # Inquiry form with honeypot & specimen context badges
│   ├── education/              # Table of contents, reading time, article cards
│   ├── gemstones/              # Multi-angle gallery, physical specs, laboratory certificates
│   ├── home/                   # Hero, specializations, featured specimens, trust sections
│   ├── layout/                 # SiteShell, Header, MobileNav, Footer, Breadcrumbs
│   └── ui/                     # Accessible buttons, inputs, status badges, skeletons
├── lib/                        # Core utilities, validation schemas & data access
│   ├── admin/actions.ts        # Server Actions for gemstone & category mutations
│   ├── auth/server.ts          # Server-side requireAdmin() guards & session checks
│   ├── data/                   # Database access layer with fallback data
│   ├── seo/metadata.ts         # Canonical URLs, OpenGraph, JSON-LD schemas
│   ├── supabase/               # SSR, browser, middleware, and admin Supabase clients
│   └── validations/            # Zod schemas for gemstones and inquiries
├── supabase/                   # Production PostgreSQL schema, RLS, and seed scripts
│   ├── migrations/             # 001_initial_schema, 002_profiles_and_auth, 003_indexes
│   └── seed/                   # 001_categories (Tourmaline, Kunzite, Morganite)
└── docs/                       # Complete engineering, security, and SEO documentation
```

---

## 5. Hosting & Deployment Workflow

1. **Continuous Deployment via GitHub:**
   - Any push or pull request merge into `main` triggers a production build on Vercel.
   - Build command: `npm run build` (`next build`).
   - Output directory: `.next`.
2. **Instant Rollback:**
   - In the Vercel Dashboard under **Deployments**, any previous deployment can be restored instantly via the **Instant Rollback** button in less than 5 seconds without recompilation.

---

## 6. Database & Row Level Security (RLS)

- **PostgreSQL 15+ Schema:**
  - `categories`: Mineral families with unique SEO slugs and display ordering.
  - `gemstones`: Individual crystal specimens with carats, millimeters, color, clarity, and status (`draft`, `available`, `sold`, `hidden`).
  - `gemstone_images`: Multi-angle photographic records with primary flags and order indices.
  - `inquiries`: Customer trade inquiries with honeypot validation and status (`new`, `contacted`, `resolved`, `archived`).
  - `profiles`: Administrative role mappings (`admin`, `super_admin`).
- **RLS Enforcement:**
  - Public visitors can only read categories and gemstones where `status IN ('available', 'sold')`.
  - Inquiries are insert-only for public visitors (`status = 'new'`); select/update/delete permissions are strictly restricted to administrators via `public.is_admin()`.
  - Non-admins cannot alter their own role.

---

## 7. Authentication & Security

- **Supabase Auth:** Password hashing via Argon2id / bcrypt. No custom or plaintext password storage.
- **Server-Side Enforcement:** Every administrative page and mutation Server Action invokes `await requireAdmin()`, querying the database directly. No client-controlled cookies or metadata are trusted.
- **Security Headers:** Enforced via `next.config.mjs` including Content-Security-Policy (CSP), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Strict-Transport-Security`.
- **Zero Secrets in Source:** `SUPABASE_SERVICE_ROLE_KEY` is completely isolated to server-side tasks. Git history contains zero active credentials.

---

## 8. Storage Configuration

- **Bucket:** `gemstones` (Supabase Storage).
- **Public Read:** Enabled for CDN image delivery and Next.js Image Optimization.
- **Admin Mutation:** Upload, replacement, and deletion are gated by `public.is_admin()`.
- **File Constraints:** Restricted to `image/webp`, `image/jpeg`, `image/png` with a 10MB per-image limit.

---

## 9. Content Management & Admin Workflow

1. **Adding a Gemstone:**
   - Log in at `/admin/login`.
   - Navigate to `/admin/gemstones/new`.
   - Enter name, mineral family, carat weight, millimeter dimensions, and descriptive notes.
   - Upload photography via the image manager.
   - Gemstones default to `draft` status for safety; switch status to `available` when ready to publish.
2. **Marking a Gemstone as Sold:**
   - On the Gemstones table or edit form, click **Mark Sold**.
   - The specimen immediately transitions to an archived status on the public site, disabling active purchasing CTAs while preserving historical reference and SEO value.
3. **Managing Inquiries:**
   - View submitted inquiries in `/admin/dashboard`.
   - Update triage status (`new` → `contacted` → `resolved`).

---

## 10. Search Engine Optimization & Search Console

- **Dynamic Sitemap:** Located at `/sitemap.xml`, automatically indexing public catalogue pages, categories, and educational guides.
- **Robots Directives:** `/robots.txt` permits public search traffic while blocking `/admin/` and `/api/`.
- **Search Console Verification:** Supported natively via `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Vercel environment variables or via DNS TXT records.
- **Structured Data:** Standards-compliant JSON-LD schemas for `Organization`, `WebSite`, `BreadcrumbList`, `Product` (on single gemstone pages), and `Article` (on guides). Zero fabricated reviews or ratings.

---

## 11. Custom Domain & DNS Guidance

### Vercel Records:
- **Apex Domain:** `A` record pointing `@` to `76.76.21.21`.
- **Subdomain:** `CNAME` record pointing `www` to `cname.vercel-dns.com`.

### Critical Email Safety Reminder:
> [!IMPORTANT]
> Saif Trading Co uses `Saiftradingco@yahoo.com` and potentially business domain email. **Do not modify or delete** existing `MX`, `SPF`, `DKIM`, or `DMARC` records at the domain registrar. Web traffic records (`A` and `CNAME`) coexist safely with mail records when added properly.

---

## 12. Maintenance Recommendations

1. **Inventory Discipline:** Regularly update specimen statuses (`available` vs. `sold`) to ensure international buyers receive accurate stock information.
2. **Security Maintenance:**
   - Periodically rotate Supabase database passwords and API tokens in production.
   - Run `npm audit` prior to any major package updates.
3. **Search Performance Review:** Review Google Search Console quarterly to track emerging queries for rough Tourmaline, Kunzite, and Morganite.
4. **Database Backups:** Ensure automated daily backups are active in the Supabase Dashboard.
