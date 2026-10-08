# Saif Trading Co — Premium Design System & UI Foundation

## 1. Brand Essence & Visual Language
- **Brand:** Saif Trading Co
- **Specialization:** Tourmaline, Kunzite, Morganite rough gemstone specimens
- **Location:** Hung Hom, Kowloon, Hong Kong
- **Aesthetic Direction:** Editorial, minimal, photography-first, high contrast, luxury without flashiness.

---

## 2. Color System & Design Tokens

### Primary Surfaces & Typography
| Token | Value | Role |
| :--- | :--- | :--- |
| `--background` | `#050505` | Primary canvas, deep black background |
| `--background-secondary`| `#101010` | Secondary sections, cards, and footer |
| `--surface` | `#171717` | Component surfaces, badges, input fields |
| `--surface-elevated` | `#1E1E1E` | Hover states, elevated panels |
| `--text-primary` | `#F5F5F5` | Primary headlines, key specifications, body |
| `--text-secondary` | `#A3A3A3` | Editorial copy, descriptions, secondary data |
| `--text-muted` | `#737373` | Eyebrow labels, timestamps, metadata |
| `--border` | `#2A2A2A` | Primary structural borders and dividers |
| `--border-subtle` | `#1D1D1D` | Internal card dividers, quiet boundaries |

### Restrained Accents & Feedback
| Token | Value | Role |
| :--- | :--- | :--- |
| `--accent-luxury` | `#B69B5E` | Warm luxury gold detail, active states, key CTAs |
| `--accent-luxury-hover` | `#C7AC6F` | Interactive hover tone for luxury accents |
| `--accent-gemstone` | `#B6D94C` | Natural tourmaline green highlight (used sparingly) |
| `--success` | `#2E7D32` | Restrained verified indicator |
| `--warning` | `#D97706` | Pending or caution states |
| `--error` | `#DC2626` | Form error border and alert text |

### Color Usage Rule
- **70–80%**: Neutral dark surfaces (`#050505`, `#101010`, `#171717`, `#F5F5F5`).
- **15–20%**: Gemstone photography (natural mineral colors provide the vibrancy).
- **5%**: Accent emphasis (`#B69B5E` luxury gold & `#B6D94C` natural green).

---

## 3. Typography System

- **Display Serif:** `Cormorant Garamond` (Hero headlines, editorial titles, specimen names).
- **Interface / Body Sans:** `Inter` (Specifications, UI controls, navigation, forms, body copy).
- **Fallback:** `Georgia, serif` / `system-ui, -apple-system, sans-serif`.

### Responsive Type Scale
| Level | Font & Size | Line Height | Usage |
| :--- | :--- | :--- | :--- |
| **Display XL** | Cormorant `clamp(3.25rem, 7.5vw, 6.5rem)` | 1.06 | Homepage hero title |
| **Display L** | Cormorant `clamp(2.5rem, 5.5vw, 4.75rem)` | 1.10 | Major section hero statements |
| **Heading XL** | Cormorant `clamp(2rem, 4vw, 3.25rem)` | 1.15 | Category titles, guide headlines |
| **Heading L** | Cormorant `clamp(1.65rem, 3vw, 2.5rem)` | 1.20 | Section headings, modal titles |
| **Heading M** | Cormorant `clamp(1.35rem, 2.5vw, 1.85rem)` | 1.25 | Specimen card titles, subsection headers |
| **Body Large** | Inter `1.125rem` (18px) | 1.60 | Lead paragraphs, key descriptions |
| **Body** | Inter `1.000rem` (16px) | 1.55 | Default reading text |
| **Small** | Inter `0.875rem` (14px) | 1.50 | Specifications, card descriptions |
| **Micro** | Inter `0.750rem` (12px) | 1.40 | Legal copy, SKU, category tags |
| **Eyebrow** | Inter `0.6875rem` (11px) uppercase, `0.25em` tracking | 1.00 | Section category labels, badges |

---

## 4. Spacing & Container System

### Spacing Scale
Values: `4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`, `80px`, `96px`, `128px`.

### Container Padding Scale
- **Mobile (<640px):** `16px` – `20px` horizontal padding.
- **Tablet (640–1024px):** `32px` horizontal padding.
- **Desktop (1024–1280px):** `48px` horizontal padding.
- **Large Desktop (>1280px):** `64px` horizontal padding.
- **Maximum Content Width:** `1280px` (`max-w-7xl`) or `1440px` (`max-w-[1440px]`).

---

## 5. Component Foundations

### Button System (`components/ui/Button.tsx`)
- **Primary:** `#F5F5F5` surface with `#050505` text, hover `#B69B5E`.
- **Secondary:** Transparent with `#2A2A2A` border, hover `#B69B5E` border.
- **Luxury:** `#171717` surface with `#B69B5E` border, hover `#B69B5E` filled.
- **Ghost:** Minimal text with `#171717` hover.
- **Text:** Underlined editorial link style with gold accent.
- **Icon:** 44px min touch target with centered icon.
- **HCI:** All touch targets `>= 44px` on mobile, visible `:focus-visible` ring.

### Presentation Cards
- **GemstoneCard (`components/gemstones/GemstoneCard.tsx`):**
  - Photography-first with 4:3 dominant frame.
  - Quiet, elegant metadata (carat weight, origin, status badge).
  - Subtle hover zoom (`scale(1.03)`).
- **CollectionCard (`components/collections/CollectionCard.tsx`):**
  - Editorial layout with mineral specialization, preview frame, and collection link arrow.

### Image System (`components/ui/ImageFrame.tsx`)
- Ratios: `1:1`, `4:3`, `16:9`, `3:4`.
- Fit options: `cover` (editorial/full-bleed) and `contain` (preserving intact gemstone crystal facets).
- Hover transition: controlled `1.02` scale. Zero CLS with Next.js image fill.

### Navigation & Header (`components/layout/SiteHeader.tsx` & `MobileNavigation.tsx`)
- Transparent at top over hero imagery, transitioning to `#050505/95` backdrop-blur upon scrolling.
- Mobile drawer with body scroll lock, Escape key handler, and large touch targets.

### Form System
- Reusable `Input`, `Textarea`, `Select`, `Checkbox`, `Label`, and `FormField`.
- Integrated `aria-invalid`, `aria-describedby` error messaging, and visible focus rings.

### Feedback & States
- `Skeleton`: Lightweight shimmer for images and specimen cards with zero layout shift.
- `EmptyState`: Quiet, structured guidance with action button.
- `ErrorState`: Accessible `role="alert"` container with retry action.

---

## 6. Motion & Accessibility

### Motion Tokens
- **Fast:** `180ms` (hover, button clicks, icon transitions).
- **Normal:** `300ms` (dropdowns, mobile navigation, image zooms).
- **Slow:** `500ms` (modal reveals, page transitions).
- **Reduced Motion:** Strictly enforced through `@media (prefers-reduced-motion: reduce)` zeroing transition times.

### HCI & Accessibility Standards
- **Contrast:** Verified WCAG AAA for `#F5F5F5` on `#050505` (contrast ratio > 18:1).
- **Status Indicators:** Color is never the sole indicator of state (`StatusBadge` pairs colored dot with explicit textual label).
- **Keyboard Navigation:** Native skip link (`#main-content`) and focus rings on all interactive components.
