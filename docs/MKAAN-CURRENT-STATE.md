# MKAAN — Current Project State

**Document status:** Current implementation state reference
**Last updated:** 2026-09-05
**Basis:** Read-only audit of the MKAAN repository on branch `feat/property-discovery`
**Applies to:** MKAAN V1 (MVP)

---

## 1. Document Purpose

This document records the **actual, currently implemented state** of the MKAAN project. It is a snapshot of what exists TODAY in the codebase, not a statement of intent.

### What this document represents
- What is actually implemented in the repository, verified by code inspection and `next build`.
- What is partially implemented, UI-only, mocked, planned, broken, or unclear.
- Where the project stands relative to its requirements, SRS, and architecture documents.

### What this document does NOT represent
- It is NOT a requirements document.
- It is NOT an SRS, an architecture document, or a design document.
- It is NOT a plan or a roadmap.
- It does NOT describe planned features as implemented.

### How developers/agents should use it
- Read this document before making major changes to understand what already exists.
- Treat the authoritative documents as follows (in priority order):
  1. `docs/requirements/MKAAN-REQUIREMENTS.md` — confirmed product requirements and boundaries.
  2. `docs/requirements/MKAAN-SRS.md` — observable behavior and test scenarios.
  3. `docs/design/MKAAN-ARCHITECTURE.md` and `docs/design/MKAAN-SOFTWARE-DESIGN.md` — technical/structural direction.
  4. `docs/design/MKAAN-DESIGN-SYSTEM.md` — approved visual tokens and conventions.
  5. Stitch screens — visual reference only.
- This document must be updated whenever implementation changes materially.

---

## 2. Project Overview

### What MKAAN is
MKAAN is a **local Egyptian real-estate platform** connecting people looking for properties with available properties, and providing property-related services.

### Current product direction
- Arabic-only MVP, right-to-left (RTL) experience.
- Full-Stack Next.js; no separate backend application.
- Customers do not create accounts; only Admin users authenticate.
- Property data is category-aware (dynamic fields and filters).

### Target market / location
- A specific Egyptian governorate or area (per requirements). The exact target area is **deferred (`DEFER-001`)**; the implementation copy references the **المنوفية / شبين الكوم** area (footer "مناطق الخدمة" and homepage "تركيز محلي").

### Main business activities
- Property discovery, search, filtering, and details.
- Property requests, viewing requests, listing requests, service requests, and contact requests.
- Services: **التشطيبات (Finishing)**, **الصيانة (Maintenance)**, **تجهيز العقار للبيع أو الإيجار (Prepare Your Property for Sale/Rent)**.
- MKAAN-controlled listing review, professional photography, and publication after Admin approval.
- Admin management of properties, categories, dynamic fields, locations, leads, services, and publication state.

### Current V1 scope (as implemented)
Public pages built: Homepage, Property Discovery, Property Details, Request a Property, List Your Property, Services, Service Request, About, 404.
Public pages confirmed missing: Request a Viewing, Success/thank-you, Contact (removed by decision), Privacy, Terms.
Dashboard: **not implemented** (see Section 12).

### Current technical direction
Next.js 16 App Router, React 19, TypeScript (strict), Tailwind CSS v4, shadcn/ui on Base UI (`base-nova` style), React Hook Form + Zod, Lucide React. Planned (not yet installed): Prisma, PostgreSQL (Neon), Clerk (Admin auth).

---

## 3. Current Project Architecture

### Implemented architecture
- Single Next.js application (App Router). Verified routes:
  `/`, `/about`, `/list-property`, `/properties`, `/properties/[slug]`, `/request-property`, `/services`, `/services/[service]`, `/_not-found`.
- Hybrid feature-based source organization:
  - `src/app/` — routes, route-level composition, global layout, technical boundaries (`loading.tsx`, `error.tsx`, `global-error.tsx`, `not-found.tsx`).
  - `src/features/` — feature-owned UI (`homepage`, `property-discovery`, `request-property`, `list-property`, `services`, `about`, `admin`).
  - `src/components/` — shared presentation (`ui/`, `layout/`, `feedback/`).
  - `src/config/` — shared configuration/options data.
  - `src/lib/` — shared utilities, validation, error/result contracts.
- Server Components are the default; client components (`"use client"`) are used for interactive UI (forms, filters, header, gallery).
- Presentation layer does not access any data layer (none exists).

### Planned architecture (documented, not implemented)
- Server-side application boundary with application operations (Server Actions or Route Handlers — not chosen).
- Domain layer with business rules.
- Data-access layer through feature-owned repositories, Prisma only.
- Integration ports for Clerk, media storage, analytics, rate limiting/anti-spam, logging/monitoring.
- No `src/server`, `src/domain`, `src/data-access`, or `src/integrations` directories exist yet.

---

## 4. Project Structure

| Path | Responsibility | Status |
|---|---|---|
| `src/app/` | Routes + global layout + error/loading/not-found boundaries | Implemented |
| `src/app/(public)/layout.tsx` | Public shell (header + footer) | Implemented |
| `src/app/(public)/page.tsx` | Homepage | Implemented |
| `src/app/(public)/properties/page.tsx` | Property discovery | Implemented (logic broken) |
| `src/app/(public)/properties/[slug]/page.tsx` | Property details | Implemented (mock) |
| `src/app/(public)/request-property/page.tsx` | طلب عقار | Implemented (UI only) |
| `src/app/(public)/list-property/page.tsx` | اعرض عقارك | Implemented (UI only) |
| `src/app/(public)/services/page.tsx` | خدماتنا | Implemented |
| `src/app/(public)/services/[service]/page.tsx` | طلب خدمة | Implemented (simulated submit) |
| `src/app/(public)/about/page.tsx` | عن مكان | Implemented |
| `src/components/ui/` | shadcn/Base-UI primitives (button, input, label, select, card, badge, checkbox, textarea, sheet, carousel, etc.) | Implemented |
| `src/components/layout/` | Container, PublicHeader, PublicFooter, Breadcrumbs | Implemented |
| `src/components/feedback/` | Loading/Empty/Error/Success/Unauthorized/Not-found/RevealOnScroll states | Implemented |
| `src/features/` | Feature-owned components + per-feature config | Implemented |
| `src/config/` | routes, navigation, options, locations, prices, property-types, transaction-types, dynamic-fields, constants | Implemented |
| `src/lib/validation/` | Reusable Zod validators + Arabic messages | Implemented |
| `src/lib/errors.ts` | AppError/NotFound/Unauthorized/Forbidden classes | Implemented |
| `src/lib/result.ts` | `Result<T,E>` helpers | Implemented |
| `src/lib/hooks/use-reveal-on-scroll.ts` | Reveal-on-scroll hook | Implemented |
| `src/hooks/`, `src/types/` | Empty directories | Empty |
| `docs/` | Requirements, SRS, architecture, design, plans, audits | Implemented |
| `public/images/stitch/` | Static property/service/hero JPGs | Implemented |
| `mkaan-next/` | Empty directory (leftover) | Empty |
| Prisma / migrations / DB directories | — | Not present |
| Authentication directories | — | Not present |

---

## 5. Public Website — Current State

### Page-by-page inventory

| Page | Route | Purpose | Status |
|---|---|---|---|
| Homepage | `/` | Marketing + discovery entry | 🟡 Partial (search non-functional) |
| Property Discovery | `/properties` | Search/filter/sort/browse العقارات | 🔴 Broken (UI only) |
| Property Details | `/properties/[slug]` | View property | 🟡 Partial (mock, dead CTAs) |
| طلب عقار | `/request-property` | Property request form | 🔵 UI Only (submit no-op) |
| اعرض عقارك | `/list-property` | Listing request form | 🔵 UI Only (submit no-op) |
| خدماتنا | `/services` | Services index | ✅ Complete (static) |
| طلب خدمة | `/services/[service]` | Dynamic service form | 🔵 UI Only (simulated submit) |
| عن مكان | `/about` | About MKAAN | ✅ Complete (static) |
| 404 | `/_not-found` | Not found | 🟡 Partial (bare component) |
| Contact Us | `/contact` | Removed by decision | ✅ Absent (as required) |
| Privacy | `/privacy` | — | ⚪ Not started (footer link → 404) |
| Terms | `/terms` | — | ⚪ Not started (footer link → 404) |
| Request a Viewing | `/request-viewing/[slug]` | Viewing request | ⚪ Not started (planned C-05) |
| Success/Thank-you | `/success` | Post-submit outcome | ⚪ Not started (planned C-10) |

**Contact Us status:** The Contact Us route is **not present** in the codebase and is **not linked anywhere** in the public UI. Per project instruction it was removed; this is confirmed by the audit.

### Homepage `/`
- **What is implemented:** Hero with photography background, HeroSearchCard (location/transaction/property-type/price selects + CTA buttons), Featured Properties, Latest Properties, Property Type Browser carousel, Services section, Why MKAAN, Request Property CTA, List Property steps (8 steps).
- **Data source:** Static; `featured-properties.tsx` and `latest-properties.tsx` define **their own local mock arrays** (duplicate of discovery mock).
- **Validation / logic:** None. Hero "بحث" button has no handler; hero selects are uncontrolled.
- **Responsive:** Clamp-based, mobile menu via Sheet, carousel slides responsive.
- **Known issues:** Duplicate/conflicting mock arrays (same slug, different title/location across arrays); decorative hero search.

### Property Discovery `/properties`
See Section 6.

### Property Details `/properties/[slug]`
See Section 7.

### طلب عقار `/request-property`
- **Implemented:** Hero + full RHF/Zod form (transaction tiles, location, classification, property type, budget, area, finishing, furnished, details, name, phone).
- **Data source:** None (no submission).
- **Validation:** Client-side RHF + `zodResolver(requestPropertySchema)`, Arabic messages.
- **Known issues:** `onSubmit` is a no-op (`void data`); no success state; no lead.

### اعرض عقارك `/list-property`
- **Implemented:** Hero, steps, form (transaction tiles, location, classification, area, price, amenities checkboxes, description, name, phone, contact method), sidebar (photography callout + trust badges).
- **Data source:** None (no submission).
- **Validation:** Client-side RHF + `zodResolver(listPropertySchema)`, Arabic messages.
- **Known issues:** `onSubmit` is a no-op; hero uses an **external Google-hosted image URL**; custom radio control instead of shared component.

### خدماتنا `/services`
- **Implemented:** Hero, services grid (3 service cards), CTA.
- **Data source:** Static component data.
- **Validation:** None needed.
- **Known issues:** `montserrat` no-op class on Arabic headings in `service-card.tsx`.

### طلب خدمة `/services/[service]`
- **Implemented:** Service selection grid + dynamic form driven by service definition; success dialog (custom, not shadcn Dialog).
- **Data source:** `src/features/services/config/service-request-options.ts` (3 service definitions with fields).
- **Validation:** Client-side dynamic RHF + Zod schema per service (`buildServiceRequestSchema`).
- **Known issues:** Submit is simulated with a 1500ms `setTimeout`; success dialog contains an emoji; invalid service slug silently falls back to finishing instead of not-found.

### عن مكان `/about`
- **Implemented:** Hero, Who We Are, Our Mission, What We Do, Why MKAAN, CTA. Static content, Lucide icons.
- **Known issues:** None significant.

---

## 6. Property Discovery

**Location:** `src/features/property-discovery/`

### Implemented (UI)
- Search bar (`search-bar.tsx`).
- Filter panel (`filter-panel.tsx`) with category, transaction, location, price range, and dynamic category filters.
- Sort control (`sort-control.tsx`).
- Active filter chips (`active-filters.tsx`).
- Property grid + shared `PropertyCard` + skeleton.
- "Load more" / infinite-scroll sentinel (`load-more.tsx`, `use-infinite-scroll.ts`).
- Mobile filter drawer.

### NOT implemented (logic)
- **Filters/search/sort do not affect results.** `property-discovery.tsx` hardcodes `properties = MOCK_PROPERTIES`, `isLoading = false`, `hasError = false`, `hasMore = properties.length < totalCount`.
- Infinite scroll "load more" increments an unused `page` state — it loads nothing.
- Empty state and skeleton are unreachable in practice (list is always the full mock array).

### Category-aware fields (config, client-side)
- `src/config/dynamic-fields.ts` defines category → field mappings: سكني (bedrooms, bathrooms, area, floor, furnished), تجاري (commercialType, area, floor), إداري (area, floor), أرض (area, landType).
- `getFilterableFields(category)` drives dynamic filters; `use-property-search.ts` cleans invalid dynamic filters on category change (implemented).
- **طبي (medical) is missing** from filter options and field mappings, although `CATEGORIES` in `options.ts` lists it.

### Inconsistencies
- **Three category vocabularies:** English values (`options.ts`: residential/commercial/...), Arabic values (`filter-config.ts` `CATEGORY_OPTIONS`: سكني/تجاري/إداري/أرض), and mock-property Arabic type labels (شقة/فيلا/مكتب/...).
- Mock property `category` values never match filter values, so filters could never match mock data even if wired.

### Data source
`src/features/property-discovery/lib/mock-data.ts` — 12 static properties + `MOCK_TOTAL_PROPERTIES = 48`. `getMockProperties()` (pagination helper) is **dead code** (unused).

### Featured properties
- `featured` flag on mock properties; homepage Featured/Latest sections use local duplicate arrays. No dedicated featured-ordering logic.

### Property cards
- Shared `PropertyCard` (see Section 10). Price-first hierarchy, 16:9-ish image (aspect 4/3), sale/rental badge + optional لقطة/جديد badge + "★ لقطة" for featured.

### Arabic labels vs internal values
- Labels are Arabic; internal values are a mix of English and Arabic depending on the config file (see inconsistencies above).

### Responsive behavior
- Grid: 1 col mobile → 2 cols `md` → 3 cols `xl`. Filters: sidebar on `md+`, drawer on mobile. Medium-laptop behavior not visually verified.

---

## 7. Property Details

**Location:** `src/app/(public)/properties/[slug]/page.tsx` + `src/features/property-discovery/components/`

### Implemented
- Layout: gallery + sticky CTA card (2/3 + 1/3 grid), then PropertyInfo, then CTA section, then Similar Properties.
- Gallery (`property-gallery.tsx`): main image + up to 3 thumbnails, active-image switching.
- PropertyInfo: description, "تفاصيل العقار" grid, features, static placeholder map ("الموقع التقريبي للعقار").
- CTAs: `property-ctas.tsx` (title, location, price, key stats, "اطلب معاينة" button, call + WhatsApp links), `property-cta-section.tsx` (before Similar Properties ✅ DETAIL-008).
- Similar properties: first 3 mock properties excluding current.
- `generateMetadata`: dynamic title + description.

### Not implemented
- Lightbox / fullscreen gallery.
- Breadcrumb on this page.
- Property status / featured / sale-rental badges on the details page.
- Canonical URL, Open Graph, social image, structured data.
- Real CTAs (both "اطلب معاينة" buttons and "تواصل مع MKAAN" have no handler/link).

### Data source
- 100% mock. `description`, `images`, `dynamicFields`, `features`, `yearBuilt`, `phone/whatsapp` are fabricated in the page (`getPropertyBySlug`); dynamicFields are hardcoded, not derived from the category field config.

### Slug pattern
- Slugs like `apartment-shebin-luxury` do **not** match the required SEO pattern `/properties/apartment-for-sale-shebin-el-kom-a8f32` (no transaction segment, no unique identifier).

### Current limitations
- Dead CTAs; no viewing flow; mock-only data; no breadcrumb; favorite button present (out-of-scope — see §19).

---

## 8. Forms & Validation

**Client-side architecture is React Hook Form + Zod + `zodResolver`** for all real forms. No form relies on native HTML `required` validation.

| Form | File | RHF | Zod | Resolver | Behavior |
|---|---|---|---|---|---|
| Request a Property | `src/features/request-property/components/request-property-form.tsx` | ✅ | ✅ `requestPropertySchema` | ✅ | Submit is a no-op |
| List Your Property | `src/features/list-property/components/list-property-form.tsx` | ✅ | ✅ `listPropertySchema` | ✅ | Submit is a no-op |
| Service Request (dynamic) | `src/features/services/components/service-request-form.tsx` | ✅ | ✅ `buildServiceRequestSchema(service)` | ✅ | Simulated submit + success dialog |
| Property discovery filters | `src/features/property-discovery/` | ❌ (plain state) | ❌ | — | UI only; price-range check inline |
| Homepage hero search | `src/features/homepage/components/hero-search-card.tsx` | ❌ | ❌ | — | Decorative; button no-op |

### Reusable validation library
`src/lib/validation/` — `phoneSchema`, `nameSchema`, `requiredText`, `optionalText`, `selectValue`, `requiredSelectValue`, `optionalNumber`, `requiredNumber`, with Arabic messages in `messages.ts`.

### Error messages
Arabic, field-level, rendered via shared `FormField` / `FormError` with `role="alert"` and `aria-describedby` wiring.

### Conditional / dynamic validation
- Service forms build a schema dynamically from the selected service definition.
- Dynamic category fields are config-driven (client-side only; no server validation).

### Shared form components
`FormField`, `FormError`, `SubmitButton`, `Label`, `Input`, `Select`, `Checkbox`, `Textarea`, `RadioCard`, `TransactionTypeTile`.

### Accessibility
Labels, `aria-invalid`, `aria-required`, `aria-describedby` present. Some shadcn primitives contain English `sr-only` text.

### Current limitations
- **No server-side validation exists** (authoritative layer required by SRS §17.2 is absent).
- No submission → no leads → no success/error outcomes (except simulated service dialog).
- No form-level error summary component (planned "Form Summary" is not implemented).

---

## 9. Design System

**Tokens live in `src/app/globals.css`.**

### Implemented
- **Typography:** IBM Plex Sans Arabic (body/headings) via `next/font`; Montserrat via `--font-numerals` (numeric roles). Dead `montserrat` class used on Arabic headings in 3 service components (no-op).
- **RTL:** root `<html lang="ar" dir="rtl">`; logical properties used broadly.
- **Colors:** canonical primary `#0A192F`, action `#0058BE`/`#004395`/`#2170E4`, background `#F8FAFC`, surface tones, status roles (success `#24A148`, warning `#F59E0B`, info `#0891B2`, whatsapp `#25D366`, destructive `#FF4B4B`), plus a `.dark` token block.
- **CSS variables / Tailwind mapping:** `@theme inline` maps semantic tokens; radius scale from `--radius`.
- **Buttons:** shadcn Button variants (default/outline/secondary/ghost/destructive/link) with sizes incl. `xlg`.
- **Inputs / Selects / Textareas:** shadcn/Base-UI primitives with outline-variant borders, action focus ring, `aria-invalid` styles.
- **Cards:** shadcn Card; feature cards use `bg-surface-secondary` + border + `shadow-card`/`hover-lift`.
- **Badges:** solid/opaque `Badge` with semantic variants (see below).
- **Shadows:** `.shadow-card`, `.shadow-card-hover`, `.shadow-elevated` utilities + inline shadows.
- **Containers:** `Container` component (`max-w-[1120px]`/`1280px`, clamp padding); `.glass-card` utility.
- **Responsive rules:** breakpoints `sm/md/lg/xl`; mobile drawer/sheet patterns; reduced-motion handling.

### Approved design decisions present in code
- **Badge system — solid/opaque semantic badges** (approved decision): `Badge` variants `featured` (action), `new` (success), `sale` (info), `rental` (primary), plus available/sold/rented/unavailable and standard variants.
- **PropertyCard unification:** one shared `PropertyCard` used by discovery grid, homepage Featured/Latest, and similar properties.
- **Input consistency:** shared `Input`/`FormField` across forms.
- **Navbar active state:** `PublicHeader.isActive()` — homepage active only on `/`, others via prefix match.
- **Medium-laptop responsiveness priority:** clamp-based sizing and responsive grids; not yet visually verified on a real laptop.

### Deviations
- Mixed icon systems: **Lucide React** (approved) + **Material Symbols Outlined** (loaded via external font, used in forms/gallery/details/list-property steps).
- Hardcoded values: `bg-black/*`, `stroke="#0061e0"`, `from-action to-accent` gradients, clamp arbitrary values.
- The `montserrat` class on Arabic headings (no-op).

---

## 10. Shared Components & Reusability

### Reusable component inventory

| Component | Location | Purpose | Used by | Notes |
|---|---|---|---|---|
| `Button` | `src/components/ui/button.tsx` | Buttons | Many | Base UI primitive |
| `Badge` | `src/components/ui/badge.tsx` | Solid semantic badges | PropertyCard, StatusBadge | Approved solid style |
| `Card` | `src/components/ui/card.tsx` | Card container | (available) | Not used by PropertyCard |
| `Input` / `Label` / `Select` / `Checkbox` / `Textarea` | `src/components/ui/` | Form controls | All forms | Base UI |
| `FormField` / `FormError` / `SubmitButton` | `src/components/ui/` | Form scaffolding | Forms | — |
| `RadioCard` | `src/components/ui/radio-card.tsx` | Radio-card selection | (available) | Not used by list-property form |
| `Sheet` | `src/components/ui/sheet.tsx` | Mobile menu | PublicHeader | — |
| `Carousel` | `src/components/ui/carousel.tsx` | Sliders | PropertyTypeBrowser | Embla |
| `Breadcrumb` | `src/components/ui/breadcrumb.tsx` | Breadcrumb primitives | Breadcrumbs layout | — |
| `Container` | `src/components/layout/container.tsx` | Page container | Many | — |
| `Breadcrumbs` | `src/components/layout/breadcrumbs.tsx` | Breadcrumb composition | ServiceRequest | Not used on properties/detail |
| `PublicHeader` / `PublicFooter` | `src/components/layout/` | Site shell | Public layout | — |
| `PropertyCard` | `src/features/property-discovery/components/property-card.tsx` | Property card | Discovery, Homepage, Similar | Unified |
| `PropertyGrid` | `src/features/property-discovery/components/property-grid.tsx` | Card grid | Discovery, Similar | — |
| Feedback states | `src/components/feedback/` | Loading/Empty/Error/Success/Unauthorized/Not-found | app boundaries | Empty/Success/Unauthorized unused |
| `RevealOnScroll` | `src/components/feedback/reveal-on-scroll.tsx` | Scroll reveal | Many | — |
| Shared config | `src/config/` | Routes/nav/options/locations/prices/types | Throughout | — |
| Zod validators | `src/lib/validation/` | Reusable validation | All forms | — |

### Duplicates remaining
- **Three property mock arrays** (`mock-data.ts`, `featured-properties.tsx`, `latest-properties.tsx`) with conflicting data for identical slugs.
- **Two category vocabularies** (English `options.ts` vs Arabic `filter-config.ts`), plus a third in mock data.
- **Multiple custom radio controls:** `RadioCard`, `TransactionTypeTile`, and an inline custom radio in `list-property-form.tsx`.
- **Sort options duplicated** (`sort-config.ts` vs inline in `sort-control.tsx`).
- **Per-feature `SectionHeader` components** duplicated (request-property, list-property, service-request-form).

### Dead / unused code
- `BedroomsFilter` component (unused; filter panel uses `DynamicFilter`).
- `getMockProperties()` / `MOCK_PAGE_SIZE` in mock-data.
- `EmptyState`, `SuccessState`, `UnauthorizedState` (not used by any page).
- `Skeleton` import in `property-skeleton.tsx` (lint warning).

---

## 11. Navigation & Routing

### Navbar (`src/components/layout/public-header.tsx`)
- Links: الرئيسية `/`, العقارات `/properties`, الخدمات `/services`, عن مكان `/about`.
- Active state: homepage exact-match `/`; others prefix-match (`pathname.startsWith(href)`).
- WhatsApp CTA (desktop + mobile sheet). Mobile menu via Sheet.
- **No Contact Us link** anywhere (removed as required). ✅

### Footer (`src/components/layout/public-footer.tsx`)
- Groups: عن مكان, العقارات (with `?type=sale|rent` links), الخدمات, تواصل معنا (phone + WhatsApp), مناطق الخدمة, legal links.
- **Dead links:** `/privacy`, `/terms` (no pages exist → 404). `#` on Facebook/share icons.

### Breadcrumbs
- `Breadcrumbs` component exists; used only on the Service Request page.
- **Missing** on Property Discovery and Property Details pages (pattern calls for them).

### Broken / dead routes and CTAs
- `/properties?type=apartment|villa|shop|...` (PropertyTypeBrowser + footer) — the properties page ignores URL params.
- Hero "بحث" button — no handler.
- Property details "اطلب معاينة" (×2) and "تواصل مع MKAAN" — no handler.
- Invalid service slug (`/services/anything`) renders finishing form instead of not-found.
- `/privacy`, `/terms` → 404.

---

## 12. Dashboard — Current State

**IMPORTANT: The Dashboard is NOT implemented. The Stitch Dashboard design is a visual reference, not implemented code.**

### Dashboard UI status
**Not implemented.** There is no `/admin` route, no shell, no sidebar, no header, no dashboard home screen.

### Dashboard design status
**Being designed separately** (per project direction). 0 of 11 Admin screens have Stitch designs (per `docs/plans/MKAAN-UI-IMPLEMENTATION-PLAN.md`). The planned Admin design direction: dark navy navigation + light content surfaces, metric cards (Montserrat numerals), tables and forms (per `docs/design/MKAAN-DESIGN-SYSTEM.md` §9.9).

### Dashboard implementation status
**0% implemented.** `next build` output confirms no admin routes.

### Existing dashboard-related code (scaffolding only, unused)
- `src/features/admin/components/status-badge.tsx` — lead/publication status badge (never imported).
- `src/components/feedback/unauthorized-state.tsx` — never used.
- Dark sidebar tokens in `globals.css` (`--sidebar-*`, `.dark` block).

### Planned dashboard screens (documented in `MKAAN-UI-IMPLEMENTATION-PLAN.md`, NOT built)
A-01 Admin Login `/admin/login`, A-02 Admin Dashboard `/admin`, A-03 Admin Properties List `/admin/properties`, A-04 Admin Property Create/Edit `/admin/properties/[id]`, A-05 Admin Categories `/admin/categories`, A-06 Admin Dynamic Fields `/admin/fields`, A-07 Admin Locations `/admin/locations`, A-08 Admin Leads List `/admin/leads`, A-09 Admin Lead Detail `/admin/leads/[id]`, A-10 Admin Services `/admin/services`, A-11 Admin Unauthorized `/admin/unauthorized`.

### Missing dashboard implementation
Everything: shell, login, dashboard home (metrics), property management, request management, listing management, service requests, services, categories, locations, site settings, publication/unpublish/archive controls.

---

## 13. Database & Backend

| Item | Status |
|---|---|
| Prisma | ⚪ Planned — not installed, not in `package.json` |
| Database | ⚪ Planned (PostgreSQL on Neon per tech docs) — nothing exists |
| Prisma schema | ⚪ Planned — does not exist |
| Migrations | ⚪ Planned — none |
| Server Actions | ⚪ Not started — none in `src/app` |
| API routes | ⚪ Not started — no `route.ts` files |
| Data access layer | ⚪ Not started — no `src/server`/`data-access` |
| Storage / image handling | ⚪ Not started (deferred). Images are static `/images/stitch/*` paths; one external Google-hosted URL used as CSS background in `list-property-hero.tsx` |
| Backend validation | ⚪ Not started — client-side validation only |
| Authentication | ⚪ Not started (Clerk planned) |
| Authorization | ⚪ Not started |
| Rate limiting / anti-spam | ⚪ Not started |
| Analytics | ⚪ Not started |
| Leads / lead creation | ⚪ Not started — no form submits data |

---

## 14. Authentication & Authorization

- **Current authentication implementation:** None.
- **Admin authentication:** None (Clerk planned, deferred to roadmap Stage 6).
- **User accounts:** None. Customers are anonymous, matching the requirements (BR-001).
- **Roles:** None defined beyond "Admin" (per requirements).
- **Permissions / authorization:** None implemented; required to be server-side (AUTH-004/005) — not started.
- **Current limitations:** All Admin functionality (dashboard, mutations, publication) is absent; the only related artifacts are the unused `unauthorized-state.tsx` and `status-badge.tsx`.

---

## 15. Property Data Model

**A Prisma/database model does NOT exist.** The following conceptual entities are **planned / not yet implemented** (from `docs/design/MKAAN-SOFTWARE-DESIGN.md` §5 and architecture docs). They are listed here so they are not mistaken for existing database tables:

- **Property** — general info, transaction type, price, description, status/publication state, featured flag.
- **Category** — property classification governing fields/filters.
- **Location** — property locations used in filtering/details.
- **Dynamic Field Definition** — type, required, filterable, displayable, options, order, active.
- **Category-Field Applicability** — which fields apply to which categories.
- **Property Dynamic Value** — category-aware field values.
- **Property Image / Media Reference** — main image + gallery references (never Base64 in DB).
- **Property Request** (lead source) — customer property request.
- **Listing Request** (lead source) — customer listing submission; never auto-publishes.
- **Viewing Request** (lead source) — request, not a booking.
- **Service Request** (lead source) — tied to a selected service + dynamic values.
- **Service / Service Form Field** — the 3 services and dynamic field definitions.
- **Contact Request** (lead source) — contact submissions.
- **Lead** — sources above + lifecycle New/Contacted/In Progress/Completed/Cancelled.
- **Publication Workflow Context** — review/inspection/prep/photography/approval evidence.
- **Site Settings** — not defined in docs; not part of any confirmed model.

All of the above are **Planned / Not Yet Implemented** — no database schema exists.

---

## 16. Current Feature Matrix

| Feature | UI | Data | Backend Logic | Dashboard | Status |
|---|---|---|---|---|---|
| Homepage | ✅ | 🔵 Static/mock | ⚪ | ⚪ | 🟡 Partial |
| Property Discovery (search/filter/sort) | ✅ | 🔵 Mock (not filtered) | ⚪ | ⚪ | 🔴 Broken |
| Property Details | ✅ | 🔵 Mock | ⚪ | ⚪ | 🟡 Partial |
| Request a Property | ✅ | ⚪ | ⚪ | ⚪ | 🔵 UI Only |
| List Your Property | ✅ | ⚪ | ⚪ | ⚪ | 🔵 UI Only |
| Request a Viewing | ⚪ | ⚪ | ⚪ | ⚪ | ⚪ Planned |
| Services (index) | ✅ | 🔵 Static | ⚪ | ⚪ | ✅ Complete (static) |
| Service Request | ✅ | 🔵 Config-driven | ⚪ | ⚪ | 🔵 UI Only |
| About | ✅ | 🔵 Static | ⚪ | ⚪ | ✅ Complete (static) |
| Contact | ⚪ | ⚪ | ⚪ | ⚪ | Removed |
| Success/Thank-you | ⚪ | ⚪ | ⚪ | ⚪ | ⚪ Planned |
| Leads | ⚪ | ⚪ | ⚪ | ⚪ | ⚪ Planned |
| Admin Dashboard | ⚪ | ⚪ | ⚪ | ⚪ | ⚪ Planned (not built) |
| Admin management (props/cats/fields/locations/leads/services) | ⚪ | ⚪ | ⚪ | ⚪ | ⚪ Planned |
| Publication workflow | ⚪ | ⚪ | ⚪ | ⚪ | ⚪ Planned |
| SEO (canonical/OG/sitemap/robots/structured data) | 🟡 | 🔵 | ⚪ | ⚪ | 🟡 Partial |
| Category-aware dynamic fields | ✅ (client config) | 🔵 | ⚪ | ⚪ | 🟡 Partial |
| Auth (Admin) | ⚪ | ⚪ | ⚪ | ⚪ | ⚪ Planned |
| Server-side validation | ⚪ | ⚪ | ⚪ | ⚪ | ⚪ Planned |

---

## 17. Requirements vs Current Implementation

Selected meaningful requirements from `MKAAN-REQUIREMENTS.md` / `MKAAN-SRS.md`:

| Requirement | Current State | Status | Notes |
|---|---|---|---|
| Arabic-only, RTL (PROJ-003/004, BR-009) | Root `lang=ar dir=rtl`, Arabic UI | ✅ | — |
| Full-Stack Next.js, no separate backend (PROJ-005/006) | Single Next.js app | ✅ | Frontend only so far |
| No customer accounts (AUTH-001/002, BR-001) | None exist | ✅ | — |
| Admin auth + server-side authz (AUTH-003/004/005) | Not started | ⚪ | Roadmap Stage 6 |
| Property discovery/search/filter (OBJ-001/002, SEARCH-*) | UI only; logic broken | 🔴 | Filters don't filter |
| Property details (OBJ-003, DETAIL-*) | Mock; dead CTAs; no breadcrumb | 🟡 | — |
| Request a property (FLOW-001..003) | Form only, no submit | 🔵 | — |
| Request a viewing (FLOW-004..007) | Not started | ⚪ | — |
| List your property (FLOW-008..012) | Form only, no submit | 🔵 | — |
| Contact flow (FLOW-013..015) | Removed by decision | ✅ (absent) | Per instruction |
| Services (SERVICE-001..011) | 3 services + dynamic forms | 🟡 | Submit simulated |
| Category-aware fields/filters (PROP-005/009/010) | Client config; inconsistent vocabularies | 🟡 | طبي missing from filters |
| Price server validation (PROP-011) | Not started | ⚪ | — |
| Leads lifecycle (LEAD-001..008) | Not started | ⚪ | — |
| Admin management (ADMIN-001..010) | Not started | ⚪ | — |
| Publication rules (PUB-001..006, BR-003/014) | Not started | ⚪ | — |
| Images main + multiple (IMAGE-001..004) | Static paths, gallery | 🟡 | No upload/storage |
| SEO (SEO-001..017) | Title/desc + 404 only | 🟡 | No canonical/OG/sitemap/robots |
| Server-side validation (SEC-003/004/018) | Not started | ⚪ | — |
| Accessibility (A11Y-001..008) | Mostly present | 🟡 | English sr-only text; contrast unverified |
| Responsive (RESP-001..006) | Grids/drawers | ❓ | Medium-laptop unverified |

---

## 18. Current Technical Debt

### Critical
- **Discovery is non-functional.** `property-discovery.tsx` never applies filters/search/sort/pagination to the data. *Where:* `src/features/property-discovery/components/property-discovery.tsx`. *Why it matters:* the primary V1 flow does nothing. *When:* before wiring backend.
- **All form submissions are no-ops / simulated.** No leads, no persistence, no server validation. *Where:* `request-property-form.tsx`, `list-property-form.tsx`, `service-request-form.tsx`. *When:* core-data-model slice.
- **No backend/database/auth exists.** Blocks everything beyond the prototype.

### High
- **Inconsistent category vocabularies** (English/Arabic/mock) and **duplicate mock arrays** with conflicting data for identical slugs. *Where:* `src/config/`, `src/features/.../mock-data.ts`, homepage sections. *When:* before seed/production data.
- **Dead CTAs/routes:** "اطلب معاينة" ×2, hero "بحث", "تواصل مع MKAAN", `/privacy`, `/terms`, `/properties?type=…`. *When:* during slice wiring.
- **External Google-hosted hero image** in `list-property-hero.tsx` (non-project asset, availability risk). *When:* soon.
- **Deferred decisions resolved in code without approval:** service fields for all 3 services (DEFER-004/005), publication state names `published/unpublished/under-review` (DEFER-010). *When:* before DB schema finalization.

### Medium
- **Prettier fails on 24 files** (`pnpm format:check`). *When:* cleanup pass.
- **2 lint warnings:** custom-font link in `layout.tsx`, unused `Skeleton` import.
- **Missing breadcrumbs** on properties/detail pages; **no gallery lightbox**.
- **SEO incomplete:** no canonical/OG/sitemap/robots/structured data; slug pattern wrong.
- **Hardcoded placeholders:** phone `01000000000`, WhatsApp `+201000000000`.
- **Mixed icon systems** (Lucide + Material Symbols).
- **Corrupted mock string** `"طن_tensors، شارع الحلو"` in `mock-data.ts`.
- **Uncommitted work** (validation lib, service forms, schemas) not yet committed.
- **Out-of-scope favorite button** in `property-gallery.tsx` (favorites excluded from MVP).

### Low
- English `sr-only` labels in shadcn primitives.
- `mkaan-next/` empty directory; empty `src/hooks/`, `src/types/`.
- Unused feedback components (`EmptyState`, `SuccessState`, `UnauthorizedState`), `BedroomsFilter`, `getMockProperties`.
- "توضيع البحث" typo in `filter-panel.tsx`.
- Emojis in UI copy (`list-property-sidebar.tsx`, service success dialog).

---

## 19. Known Bugs / Issues

| Issue | Location | Impact | Status |
|---|---|---|---|
| Filters/search/sort/load-more have no effect on results | `property-discovery.tsx` | Primary discovery flow non-functional | Open |
| Corrupted Arabic string `"طن_tensors، شارع الحلو"` | `mock-data.ts:134` | Broken text on property #10 | Open |
| Same slug resolves to different title/location on homepage vs discovery | `featured-properties.tsx`, `latest-properties.tsx`, `mock-data.ts` | Conflicting property data | Open |
| "اطلب معاينة" / "تواصل مع MKAAN" buttons do nothing | `property-ctas.tsx`, `property-cta-section.tsx` | Dead CTAs on details page | Open |
| Hero "بحث" button does nothing; hero selects uncontrolled | `hero-search-card.tsx` | Decorative search | Open |
| `/privacy` and `/terms` render 404 | footer + `routes.ts` | Broken links | Open |
| `/properties?type=…` links do not pre-filter | `property-type-browser.tsx`, footer | Broken navigation intent | Open |
| Invalid service slug falls back to finishing instead of 404 | `services/[service]/page.tsx` | Wrong content for invalid URL | Open |
| "جديد" badge shows a star "★ " like لقطة | `property-card.tsx:47-49` | Inconsistent badge | Open |
| Service submit fake 1500ms delay; no real submission | `service-request-form.tsx` | Simulated success | Open (by design) |
| Favorite (heart) button present but out of MVP scope | `property-gallery.tsx` | Scope violation | Open |
| `montserrat` class applied to Arabic headings (no-op) | `service-card.tsx`, `services-hero.tsx`, `services-cta.tsx` | Dead class / wrong intent | Open |
| Sheet close button uses English "Close" sr-only text | `sheet.tsx` | Minor a11y/copy | Open |

---

## 20. Mock / Temporary Implementations

**Do not mistake these for real functionality:**

- **All property data** — `src/features/property-discovery/lib/mock-data.ts` (12 static properties; total claims 48).
- **Property details** — description, images, dynamic fields, features fabricated in the page.
- **Homepage Featured / Latest** — local mock arrays, duplicated and conflicting with discovery mock.
- **Similar properties** — mock slice.
- **Form submissions** — no-ops (request property, list property) or simulated (service request).
- **Success outcomes** — only a client-side dialog for service request; others absent.
- **Hero search card** — decorative; no search behavior.
- **Placeholder contact info** — phone/WhatsApp numbers hardcoded (`01000000000`, `+201000000000`).
- **External Google-hosted image** — `list-property-hero.tsx`.
- **Static services/about/homepage content** — static component data.
- **SEO** — dynamic title/description only; rest absent.

---

## 21. Completed Work History

From `git log` (oldest → newest) and code inspection:
1. **Foundation** — Next.js 16 setup, shadcn/ui, Arabic RTL layout, MKAAN tokens, shared contracts, feedback components.
2. **Feature-based foundation architecture** — `src/app | features | components | lib` structure.
3. **Homepage UI** — hero, featured properties, services, CTAs.
4. **Property listing + services + navigation** — property discovery shell, services pages, nav improvements.
5. **Request a Property + List Your Property pages.**
6. **MKAAN application update** (form/UI improvements).
7. **About page.**
8. **Uncommitted (working tree) work:** reusable Zod validation library, dynamic service request flow (route + form + selection grid), list-property config, request-property schema, `options.ts`, RHF/Zod migration of request/list forms, dynamic service form definitions for all 3 services.

---

## 22. Current Development Position

**Where are we right now?**
- **Finished:** Foundation; static public UI prototype (Homepage, About, Services, Discovery shell, Details, 3 request forms) with solid client-side RHF+Zod validation; shared components; design tokens; build/typecheck pass.
- **Being designed (separately):** Dashboard UI (0/11 Stitch screens; not implemented in code).
- **Not started:** Real discovery logic, form submissions/leads, viewing flow, backend/database (Prisma/PostgreSQL), Admin auth (Clerk), server-side validation, SEO plumbing, security controls, tests.
- **Blocking relationships:** No data model/persistence → no real discovery or leads; no persistence + no auth → no Admin functionality; DEFER-005/010 unresolved → schema/validation cannot be finalized cleanly.
- **Can be started now (in parallel):** Dashboard UI design/implementation (independent of backend); committing current uncommitted work; resolving DEFER-005/010; cleaning duplicate/inconsistent data definitions.

---

## 23. Recommended Next Development Sequence

Per project decision, do NOT finish every UI page before building the backend. Sequence:

1. **Finish the planned Dashboard UI design/implementation stage** (design + build the Admin shell/screens; Dashboard does not depend on backend to be designed/built as UI).
2. **Establish the core data/domain model** (Prisma + PostgreSQL/Neon: properties, categories, locations, dynamic fields + applicability, dynamic values, services/service fields, leads, media refs, publication status; migrations; resolve DEFER-005/010 first).
3. **Implement features as vertical slices**, e.g.:
   - Property discovery slice (server query → real search/filter/sort/incremental → details).
   - Leads slice (server actions for Request a Property, List Your Property, Service Request, Viewing → lead creation → success outcomes).
4. **Connect Dashboard + Database + Public Website feature by feature** (Admin manages the same domain data the public site reads).
5. **Test and harden the system** (unit/integration/E2E for critical flows; rate limiting; anti-spam; safe errors).
6. **Prepare for production** (env config, logging/monitoring, backups, migrations).

No V2 features are introduced into this sequence.

---

## 24. Future Ideas / Out of Scope

The following are **NOT part of current V1** and must not become V1 requirements without explicit approval:

- Brokers / real-estate agents / broker accounts.
- Customer accounts / customer dashboards / profiles.
- Subscriptions.
- Commission systems.
- Ratings / reviews.
- Advanced lead management / advanced analytics.
- Wishlists / favorites (explicitly excluded by requirements; a leftover favorite button exists in the gallery).
- Real-time chat, online payments, bookings engines, notifications, mobile apps.
- Unrequested integrations (e.g., Facebook/TikTok Pixels remain deferred).

---

## 25. Single Source of Truth Rules

1. **Requirements/SRS** define product requirements: `docs/requirements/MKAAN-REQUIREMENTS.md`, `docs/requirements/MKAAN-SRS.md`.
2. **Architecture** defines technical direction: `docs/design/MKAAN-ARCHITECTURE.md`, `docs/design/MKAAN-SOFTWARE-DESIGN.md`, `docs/design/MKAAN-TECH-STACK.md`.
3. **This document** defines the current implementation state.
4. **Stitch** defines visual reference/design only — a Stitch design is NOT an implemented feature.
5. **Existing approved implementation decisions must not be reverted** without explicit approval (e.g., solid/opaque badge system, PropertyCard unification, RHF+Zod validation, Arabic-only RTL, Navbar active-state behavior).
6. **Future ideas must not silently become V1 requirements.**
7. **Agents must inspect this document before making major changes.**
8. **When implementation changes materially, this document should be updated.**
9. **Mock/static data is not real functionality; the mock/temporary list in §20 is authoritative for what is fake.**