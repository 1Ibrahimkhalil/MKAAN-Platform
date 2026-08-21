# MKAAN UI/UX Audit Report

**Project:** MKAAN
**Document status:** Second verification audit (READ-ONLY) of the current Stitch design
**Audit date:** 2026-08-21
**Sources:** Stitch project `6054633437864110454` "MKAAN company" (updated 2026-08-20T23:00:35Z), current screen HTML, current project theme, `MKAAN-REQUIREMENTS.md`, `MKAAN-SRS.md`, `MKAAN-SOFTWARE-DESIGN.md`, Current Design System
**Note:** No files or Stitch resources were modified during the audit.

## 1. Overall Status

**NOT READY**

## 2. What Is Complete (verified)

- **Screens (7 pages, all DESKTOP):** Homepage (`bdb20859…`), Properties Listing (`8664c59a…`), Property Details w/ CTA+Similar (`e1ff2eac…`), Property Request (`a3f91435…`), List Your Property (`dd907c76…`), Services (`23815fe3…`), Service Request (`576c85cc…`).
- **Flows:** discovery → search/filter/sort listing; details with gallery, price, location, CTAs before Similar Properties (DETAIL-007/008); property request (FLOW-001–003); list your property (FLOW-008–012); services entry with the 3 confirmed services (SERVICE-001–004); dynamic service request form (SERVICE-005–008).
- **RTL:** all 7 pages emit `<html dir="rtl" lang="ar">` (verified in HTML).
- **Arabic-only:** no English UI text found in any page HTML (SEO-017, BR-009).
- **Sign In removed:** no "Sign In"/"Log In"/"تسجيل الدخول" in any page HTML.
- **Language switcher text removed:** no "English"/"العربية"/"اللغة" in any page HTML.
- **Design tokens:** Deep Navy `#0a192f` / Electric Blue `#3b82f6` / Pearl White, 8px radius, IBM Plex Sans Arabic labels — applied consistently across screens.

## 3. Confirmed Issues

| Issue | Evidence / location | Related req | Severity |
|---|---|---|---|
| Orphaned `language` globe icon in homepage header (residual of removed switcher) | Homepage HTML (`bdb20859…`): `<a href="#"><i class="material-symbols-outlined">language</i></a>`; absent on other 6 pages | BR-009, AUTH-001 | Low |
| Design System doc still prescribes "Sign In" CTA + language switcher + bilingual-first/LTR in the **active** project theme | `get_project` → `designTheme.designMd` (Navigation, Brand & Style sections) | BR-001, BR-009, AUTH-001/002, SEO-017 | High |
| Design System in broken/ambiguous state: `list_design_systems(project)` returns empty while a `DESIGN_SYSTEM_INSTANCE` remains on canvas and the theme still carries its full spec | Stitch API results | IMPL Stage 2 (Design System gate) | Medium |
| Montserrat as headline font — has no Arabic glyphs; Arabic-only headlines would fall back, contradicting the DS's own Arabic-font rule | designMd `typography.headline-*: Montserrat` | BR-009 | Medium |
| Primary-color token mismatch: namedColors `primary:#000000` vs `overridePrimaryColor:#0a192f` | Project theme | DS consistency | Low |

## 4. False Positives From Previous Audit

- **"Public Sign In CTA exists in the header"** — no longer true; removed from all page HTML (verified).
- **"Language switcher exists in public header"** — false at text/label level; removed. Only the icon-only globe residue in §3 remains.
- **"Montserrat is used for English customer content"** — no English content exists in pages; Montserrat is now relevant only to tokens/DS doc.

## 5. Missing Screens/Flows (genuinely required, verified absent)

- **Request a Viewing** (FLOW-004–007, LEAD-001) — no screen anywhere in either Stitch project.
- **Contact** (FLOW-013–015, LEAD-005) — no screen.
- **Success/thank-you outcomes** after submissions (SRS §3 journeys, §17.3) — no screen.
- **All Admin screens** (OBJ-008, ADMIN-001–010, AUTH-003): login, dashboard, properties, categories, dynamic fields, locations, leads, services, publication/unpublish/archive — none exist.
- **404 / not-found** (SEO-012) — no screen.

## 6. Missing UI States

No dedicated state designs exist for: **loading, empty results, error, validation errors, success, unauthorized, not-found** (SEARCH-008, SRS §17–18). The "Interactive" listing/service pages may contain inline behavior, but no state screens were produced.

## 7. Responsive & RTL Audit

- **Desktop:** 7 pages ✅
- **Tablet:** none ❌ (RESP-001)
- **Mobile:** none ❌ (RESP-001, PERF-001 mobile-first)
- **RTL:** verified `<dir="rtl" lang="ar">` on all 7 ✅
- **Arabic-only:** verified no English UI text ✅
- Design system defines breakpoint tokens (4/8/12-col, 16/24/40px margins) but no screen applies them.

## 8. Design System Issues (actual, current)

1. Active designMd still instructs a public **Sign In** CTA and **language switcher** — contradicts requirements and the actual screens.
2. **Bilingual-first / LTR-mirroring** framing contradicts the Arabic-only MVP (BR-009).
3. **Montserrat headline rule** is unusable for Arabic glyphs.
4. DS asset is **detached** from the project (empty list) while still referenced on canvas + theme.
5. **Primary token mismatch** (#000000 vs #0a192f).
6. No state conventions (loading/empty/error/success), no focus/disabled rules documented in the DS spec.

## 9. Deferred Decisions Genuinely Blocking the UI

- **DEFER-005 (representative service):** the Service Request design and its `3def4e0e…` finishing photo assume **Finishing** without approval — blocks finalizing the dynamic service form UI.
- **DEFER-009 (Admin model):** Admin screens cannot be designed/approved until the Admin authorization model is decided.
- **DEFER-010 (publication states):** Admin publication/unpublish/archive UI depends on exact state vocabulary.
- **DEFER-001 (geography):** minor; only affects copy (e.g., any location naming in homepage/listing content).

## 10. Final Action Plan (priority order)

1. **Design Request a Viewing + Contact + success/thank-you screens** (MVP flows — highest priority).
2. **Design all Admin screens** (login → dashboard → properties/categories/fields/locations/leads/services → publication) — requires DEFER-009/010 decisions first.
3. **Design the 7 UI states** (loading, empty, error, validation, success, unauthorized, not-found) for listing, details, and all forms.
4. **Design mobile + tablet variants** of the 7 core pages (mobile-first per PERF-001/RESP-001).
5. **Fix the Design System:** remove Sign In/language-switcher/bilingual text from the active designMd; replace Montserrat headline with an Arabic-capable font; resolve the primary token mismatch; re-attach/formalize the DS asset.
6. **Remove the residual `language` globe icon** from the homepage header.
7. **Resolve DEFER-005** (approve Finishing as the representative service or make the Service Request page service-agnostic).