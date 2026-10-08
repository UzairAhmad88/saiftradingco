# Saif Trading Co — Premium Gemstone Catalogue
Production-ready starter for a premium rough gemstone catalogue + business website + secure admin management system.

## V1
- Premium responsive public website
- Collections, search, filters and gemstone detail pages
- Certification and education
- Contact/WhatsApp inquiry
- Admin-only authentication
- Gemstone CRUD, images, certificates and Available/Sold/Hidden states
- Technical SEO, performance and accessibility

## Excluded from V1
Customer accounts, cart, checkout, payment gateway, customer order tracking, marketplace and mobile app.

## Stack
Next.js + TypeScript + Tailwind CSS + Supabase PostgreSQL/Auth/Storage + Vercel.

Read `/docs` before development.

## SEO & Search Architecture
- **Canonical Domain & Base URL:** Dynamically bound via `NEXT_PUBLIC_SITE_URL` (with Vercel production fallbacks)
- **Robots Directives:** `/robots.txt` automatically permits public catalogue & educational content while blocking `/admin/` and `/api/`
- **Dynamic Sitemap:** Generated at `/sitemap.xml` covering static pages, active mineral categories, published gemstones, and in-depth educational guides
- **Structured Data:** Standards-compliant JSON-LD for `Organization`, `WebSite`, `BreadcrumbList`, `Product` (on gemstone specimen pages), and `Article` (on educational guides)
- **Search Console:** Built-in meta tag verification support via `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
- **Topical Clusters:** Three core commercial mineral pillars (Tourmaline, Kunzite, Morganite) interconnected with 7 technical gemological guides


## Business Identity

**Business Name:** Saif Trading Co

**Address:** 417 Flat 4 Floor, Block B, Focal Industrial Centre, 21 Man Lok Street, Hung Hom, Kowloon, Hong Kong

**Telephone:** +852 3525 1640

**Mobile:** +852 9064 9593

**Mobile:** +852 6903 7690

**Contact Email:** Saiftradingco@yahoo.com

**Speciality:** Rough gemstone supplier, specializing in Tourmaline, Kunzite and Morganite.
