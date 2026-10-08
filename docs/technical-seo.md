# Saif Trading Co — Technical SEO Architecture & Specification

## 1. Executive Summary & Objective
The technical SEO architecture for **Saif Trading Co** establishes a mathematically rigorous, crawl-efficient, and truthful indexing pipeline. Built upon Next.js App Router, the system ensures that search engine crawlers (Googlebot, Bingbot, etc.) can discover, parse, understand, and index all published gemstone specimens, mineral family categories, and educational resources without encountering index bloat, duplicate URLs, or untruthful schema markup.

---

## 2. Centralized Site URL & Environment Configuration

### Central Environment Configuration
To prevent hardcoded preview URLs or local hostnames from leaking into production canonical tags or sitemaps, the production domain is managed via a single configuration point:

- Environment Variable: `NEXT_PUBLIC_SITE_URL`
- Default Fallback: `http://localhost:3000` (for local development)
- Normalization: In `lib/seo/metadata.ts`, trailing slashes are automatically stripped:
  ```ts
  export const SITE_URL = (
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ).replace(/\/+$/, "");
  ```

### Production Deployment Domain
Prior to DNS pointing and production launch, set in the production environment (e.g., Vercel / Cloudflare):
```bash
NEXT_PUBLIC_SITE_URL=https://saiftradingco.com
```

---

## 3. Metadata Architecture

Next.js App Router metadata is centralized in `lib/seo/metadata.ts` through the helper `constructMetadata()`.

### Key Directives:
1. **Title Templates:**
   - Homepage: `Saif Trading Co | Rough Tourmaline, Kunzite & Morganite`
   - Category Collections: `Rough [Category] Crystals | Saif Trading Co`
   - Gemstones: `[Gemstone Name] — Rough [Category] | Saif Trading Co`
   - Educational Guides: `[Guide Title] | Saif Trading Co`
   - About / Contact / Certification: Specific, topic-focused titles with Hong Kong business attribution.
2. **Meta Descriptions:**
   - Accurately summarize page contents without keyword stuffing.
   - For gemstones: extracted dynamically from `gemstone.short_description` or factual physical parameters (`carat_weight`, crystalline habit, category).
3. **OpenGraph & Twitter Cards:**
   - Standardized `summary_large_image` Twitter cards.
   - Clean OpenGraph objects with absolute image URLs (`1200x900` or `1200x800` resolutions).
   - Safe URL resolver prevents duplicated host prefixes if an image URL is already absolute (e.g., Supabase Storage URLs).

---

## 4. Canonical URL Strategy

Every indexable public route specifies exactly one authoritative canonical URL using `SITE_URL`:

| Route Type | URL Structure | Canonical Target |
| :--- | :--- | :--- |
| **Homepage** | `/` | `${SITE_URL}` |
| **Collections Root** | `/collections` | `${SITE_URL}/collections` |
| **Category** | `/collections/[category]` | `${SITE_URL}/collections/[category]` |
| **Gemstone Detail** | `/gemstones/[slug]` | `${SITE_URL}/gemstones/[slug]` |
| **Education Hub** | `/education` | `${SITE_URL}/education` |
| **Education Article**| `/education/[slug]` | `${SITE_URL}/education/[slug]` |
| **About** | `/about` | `${SITE_URL}/about` |
| **Certification** | `/certification` | `${SITE_URL}/certification` |
| **Contact** | `/contact` | `${SITE_URL}/contact` |
| **Legal Pages** | `/privacy`, `/terms` | `${SITE_URL}/privacy`, `${SITE_URL}/terms` |

### Query Parameter & Filter Handling
- Any query strings (`?sort=`, `?color=`, `?carat=`, `?status=`, `?page=`) always canonicalize to the clean base category URL (`/collections/[category]`).
- Internal search queries (`/collections/[category]?search=green`) dynamically apply `robots: { index: false, follow: false }` via `generateMetadata()` to prevent infinite permutations of search results from polluting search engine indexes.

---

## 5. Indexability Rules & Content Status Lifecycle

Public visibility and indexability are strictly mapped to database status:

```
                  ┌──────────────────────────────┐
                  │       GEMSTONE STATUS        │
                  └──────────────┬───────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         │                       │                       │
     AVAILABLE                 SOLD                 DRAFT / HIDDEN
         │                       │                       │
   [Public 200]            [Public 200]             [HTTP 404]
   [In Sitemap]            [In Sitemap]          [Excluded from Sitemap]
   [Index: true]           [Index: true]         [Robots: noindex, nofollow]
   [InStock Schema]        [SoldOut Schema]      [Zero Public Exposure]
```

1. **Available:** Full public listing, indexed, dynamic sitemap entry with weekly change frequency, Offer schema with `InStock`.
2. **Sold:** Remains public as a documented mineral reference and archival specimen, indexed, monthly change frequency in sitemap, Offer schema mapped to `SoldOut`.
3. **Draft / Hidden:** Excluded from `getDbGemstones()`, `getDbGemstoneBySlug()`, dynamic sitemap queries, and RSS/meta feeds. Directly requesting a draft or hidden slug returns Next.js `notFound()` with HTTP 404.

---

## 6. Robots Directives (`app/robots.ts`)

Robots directives enforce crawl efficiency while disallowing administrative and private API paths:

```ts
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /admin/*
Disallow: /api/
Disallow: /api/*

Sitemap: https://saiftradingco.com/sitemap.xml
```

All admin route templates (`app/admin/**/page.tsx` and `app/admin/layout.tsx`) also programmatically set:
```ts
robots: {
  index: false,
  follow: false,
}
```

---

## 7. Dynamic Scalable Sitemap (`app/sitemap.ts`)

Implemented via Next.js App Router dynamic sitemap generation:
- **Core Static Routes:** Fixed high-priority routes (`/`, `/collections`, `/education`, `/about`, `/certification`, `/contact`).
- **Category Routes:** Mapped from active database categories.
- **Gemstone Routes:** Queries live Supabase database for `status IN ('available', 'sold')`. Includes actual `updated_at` timestamps for `lastModified`.
- **Educational Guides:** Mapped dynamically with editorial publication dates.
- **Exclusion Guarantee:** Draft, hidden, admin, and test URLs are mathematically filtered out before response serialization.

---

## 8. Structured Data Architecture (JSON-LD)

All structured data is sanitized and serialized safely via `components/seo/JsonLd.tsx` using character replacement (`\u003c` instead of `<`) to prevent script-tag breakout and XSS vulnerabilities.

### Implemented Schemas:
1. **Organization (`schema.org/Organization`):**
   - Verified Hong Kong legal name and registered address: `417 Flat 4 Floor, Block B, Focal Industrial Centre, 21 Man Lok Street, Hung Hom, Kowloon, HK`.
   - Direct business telephone: `+852 3525 1640`, sales mobiles `+852 9064 9593`, `+852 6903 7690`.
   - Official email: `Saiftradingco@yahoo.com`.
   - **Zero Fabrication Rule:** No invented reviews, ratings, founding dates, awards, or lab accreditations.
2. **WebSite (`schema.org/WebSite`):**
   - Clean entity declaration linked to Organization publisher.
3. **BreadcrumbList (`schema.org/BreadcrumbList`):**
   - Implemented across all public hierarchical pages (Category collections, Gemstones, Education, About, Contact, Certification).
   - Generates exact 1-to-1 match with the rendered visual breadcrumb bar.
4. **Product (`schema.org/Product`):**
   - Deployed on `/gemstones/[slug]`.
   - Includes: `name`, `description`, `image`, `sku`, `category`, `brand` (Saif Trading Co).
   - `Offer`: Only included if a legitimate positive numeric price is stored in the database. When price is not published, no fake `$0` or `$1` offers are created.
   - `availability`: Truthfully mapped to `https://schema.org/InStock` or `https://schema.org/SoldOut`.
5. **Article (`schema.org/Article`):**
   - Deployed on `/education/[slug]`.
   - Truthful publisher attribution to Saif Trading Co without fabricating individual author credentials.

---

## 9. Image SEO & Web Performance

### Image SEO Best Practices
- Every public specimen photograph includes contextual descriptive alt text (e.g., `Natural rough Green Tourmaline crystal specimen`).
- Decorative background textures use empty `alt=""` or `aria-hidden="true"`.
- Clean semantic file naming convention: `[mineral-family]-[color]-[habit].jpg` or `.webp`.

### Core Web Vitals Optimization
- **LCP (Largest Contentful Paint):**
  - Homepage hero, category hero, and gemstone primary images use Next.js `Image` with `priority` attribute.
  - Image containers declare exact aspect ratios (`aspect-[4/3]`, `aspect-[16/9]`, `aspect-[4/5]`) to completely eliminate layout shifts (CLS = 0).
  - Explicit responsive `sizes` attribute on all Next.js images.
- **CLS (Cumulative Layout Shift):**
  - Stable aspect ratio wrappers on all cards and gallery viewports.
  - Next.js local font optimization with CSS font-display swap and size-adjust fallbacks.
- **INP (Interaction to Next Paint):**
  - Server Components by default.
  - Interactive components (filters, lightbox) use lightweight client components without bulky UI libraries.

---

## 10. 404 & Soft-404 Prevention
- Missing or archived gemstone specimens immediately call `notFound()`.
- Next.js returns genuine HTTP 404 response codes.
- `app/not-found.tsx` renders a branded recovery page with clear paths back to the catalogue and homepage, and declares `robots: { index: false, follow: false }`.

---

## 11. Search Console Preparation Checklist (Phase 18 Pre-flight)

When production domain is pointed:
1. Verify domain ownership in Google Search Console using DNS TXT record or HTML file verification.
2. Submit XML Sitemap: `https://[production-domain]/sitemap.xml`.
3. Verify Robots.txt testing tool reports `Allow: /` and `Disallow: /admin/`.
4. Perform Rich Results Test on `/gemstones/[slug]` (verifying Product & BreadcrumbList schema).
5. Perform Rich Results Test on `/education/[slug]` (verifying Article schema).
