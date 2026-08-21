# MKAAN Design System

**Project:** MKAAN  
**Document status:** Approved visual foundation for MVP implementation  
**Last updated:** 2026-08-21  
**Baseline:** Current MKAAN Stitch screens and their verified visual patterns  
**Scope:** Visual language, reusable UI patterns, states, responsive rules, RTL conventions, and accessibility guidance

## 1. Authority and Boundaries

This document defines the MKAAN visual foundation for the current MVP and future missing screens. It preserves the existing MKAAN visual identity and corrects only the verified inconsistencies identified during the UI/UX audit.

The authority order is:

1. `docs/requirements/MKAAN-REQUIREMENTS.md` for product scope, exclusions, business rules, and deferred decisions.
2. `docs/requirements/MKAAN-SRS.md` for observable behavior, validation, error, loading, empty, not-found, and unauthorized outcomes.
3. `docs/design/MKAAN-SOFTWARE-DESIGN.md` for technical boundaries and implementation constraints.
4. This document for visual tokens, component patterns, states, directionality, and presentation guidance.

This Design System does not select deferred business rules, exact public form fields, exact service fields, publication state names, Admin authorization details, image storage, analytics providers, or application architecture. Those decisions remain governed by the authoritative documents.

This document is not application code and does not modify the existing Stitch screens.

## 2. Current Visual Baseline

The Design System is derived from the current MKAAN Stitch project `6054633437864110454` and its seven current customer-facing UI screens:

- Homepage
- Properties listing
- Property details
- Request a property
- List your property
- Services
- Service request

The following patterns are preserved because they are already correct and visually coherent:

- Corporate, modern, premium PropTech direction.
- Deep Navy foundation with action blue accents and pearl-white surfaces.
- High-information property cards with a strong image and price hierarchy.
- 16:9 property imagery and architectural photography.
- Sticky surface header with blur, border, and restrained shadow.
- RTL breadcrumb pattern and Arabic-first content hierarchy.
- Glass-card and tonal-surface depth treatments.
- Rounded controls, radio cards, badges, hover lift, and soft ambient shadows.
- IBM Plex Sans Arabic for Arabic labels and Montserrat for numeric data already present in the screens.
- 8px spacing base and existing container, gutter, margin, and stack tokens.

The MKAAN logo remains the existing graphic asset. It is not UI text, must not be translated or redrawn as part of this Design System, and may retain its approved graphic lockup.

## 3. Product Presentation Rules

### 3.1 Language

- MKAAN MVP interface copy is Arabic-only.
- Customer-facing text, labels, helper text, errors, success outcomes, and metadata are Arabic.
- Latin characters are permitted where the Requirements and SRS explicitly allow them, including property URL slugs and unique identifiers.
- Graphic brand assets, including the MKAAN logo, are preserved as assets and are not treated as interface copy.
- The UI must not present a mode for switching customer-facing language.

### 3.2 Directionality

- Customer-facing pages use `dir="rtl"` and `lang="ar"`.
- Arabic text is right-aligned by default unless a specific component pattern requires another alignment.
- Layouts use logical direction-aware properties rather than hard-coded left/right assumptions.
- Directional icons, breadcrumbs, progress indicators, carousels, and navigation affordances mirror according to their meaning.
- Logos, photos, numeric values, and non-directional icons do not mirror.
- Western digits may be used inside Arabic price and metric values when they are part of the approved data presentation pattern.

### 3.3 Access boundaries in UI

- Public customer journeys are anonymous and must not require account creation, customer login, customer profile setup, or customer authentication.
- Public headers, property cards, forms, and CTAs must not imply a customer account.
- Authentication and unauthorized states apply only to protected Admin surfaces required by the product. They must never add a customer login path.
- Admin authentication and authorization are product boundaries, not a reason to add authentication controls to public customer pages.

## 4. Color Tokens

Color roles are semantic. Components should consume roles rather than hard-coded values. The canonical action-blue ramp below matches the colors verified in the current screen HTML. The previous black primary token and the older electric-blue override are not canonical.

### 4.1 Core palette

| Token | Value | Use |
| --- | --- | --- |
| `color.primary` | `#0A192F` | Deep Navy brand color, strong headings, dark surfaces, Admin navigation |
| `color.on-primary` | `#FFFFFF` | Text and icons on Deep Navy |
| `color.primary-container` | `#0D1C32` | Dark tonal container and deep hero treatment |
| `color.on-primary-container` | `#76849F` | Muted content on primary containers |
| `color.action` | `#0058BE` | Primary actions, links, active controls, focus accents |
| `color.on-action` | `#FFFFFF` | Text and icons on action blue |
| `color.action-hover` | `#004395` | Hover, pressed, or stronger action-blue treatment |
| `color.action-container` | `#2170E4` | Action-blue container and higher-energy accent |
| `color.action-tint` | `#D8E2FF` | Low-emphasis action background |
| `color.neutral-background` | `#F8FAFC` | Canonical Pearl White page background |
| `color.surface` | `#FFFFFF` | Cards, fields, dialogs, and elevated content |
| `color.surface-muted` | `#F7F9FB` | Existing light tonal surface retained from the current screens |
| `color.surface-container` | `#ECEEF0` | Tonal grouping and quiet controls |
| `color.surface-container-high` | `#E6E8EA` | Stronger tonal grouping |
| `color.on-surface` | `#191C1E` | Primary text on light surfaces |
| `color.on-surface-variant` | `#44474D` | Secondary text, metadata, and supporting labels |
| `color.outline` | `#75777E` | Standard field and control outline |
| `color.outline-variant` | `#C5C6CD` | Dividers, subtle borders, and card outlines |
| `color.tertiary` | `#64748B` | Slate Gray detail, icons, and low-emphasis information |

### 4.2 Status and utility roles

| Token | Value | Use |
| --- | --- | --- |
| `color.success-accent` | `#24A148` | Success icon, trend, border, or compact status accent observed in the screens |
| `color.success-strong` | `#137333` | Success text or filled status treatment where contrast requires a darker value |
| `color.success-container` | `#E6F4EA` | Success background |
| `color.error-accent` | `#FF4B4B` | Error border, icon, and visual emphasis observed in the screens |
| `color.error-strong` | `#BA1A1A` | Error text or filled error treatment where contrast requires a darker value |
| `color.error-container` | `#FFDAD6` | Error background |
| `color.warning-strong` | `#8A4B08` | Warning text and icons |
| `color.warning-container` | `#FFF1D6` | Warning background |
| `color.info` | `#0058BE` | Informational status; reuse the action role rather than adding a new hue |
| `color.whatsapp` | `#25D366` | Existing WhatsApp contact action only |

Status colors communicate interface state only. They do not define lead statuses, publication states, service rules, or other business vocabulary.

### 4.3 Token normalization

- `#0A192F` is the single canonical primary color. The previous `#000000` primary and tertiary values are retired.
- `#0058BE` is the canonical action color used by the existing screens.
- `#004395` is the strong/hover action value already present in the current token family.
- `#3B82F6` is not a MKAAN canonical token. New UI must not introduce it as a second action-blue family.
- `#F8FAFC` is the canonical neutral background. `#F7F9FB` remains available as a named tonal surface because it is present in the current design.
- Every status treatment must provide a readable text/icon contrast and must not rely on color alone.

## 5. Typography

### 5.1 Font roles

The current dual-font pattern is preserved and made explicit:

- **IBM Plex Sans Arabic:** all Arabic display, headline, body, label, helper, validation, and UI text.
- **Montserrat:** numeric values, prices, percentages, counters, and metric displays only. It must not be used as the font for Arabic strings.
- **Outlined icon style:** the current Stitch screens use Material Symbols Outlined. Code implementation must preserve the same restrained outlined visual language while following the approved implementation icon boundary in the Software Design.

There is no separate English customer typography mode. Arabic text remains the primary typographic content.

### 5.2 Type scale

The scale preserves the sizes used by the current screens and adds an Arabic-safe display level for the largest hero treatment.

| Token | Size | Line height | Weight | Font role |
| --- | --- | --- | --- | --- |
| `type.display-lg` | `64px` | `72px` | 700 | IBM Plex Sans Arabic; large hero display |
| `type.headline-xl` | `48px` | `56px` | 700 | IBM Plex Sans Arabic |
| `type.headline-lg` | `32px` | `40px` | 700 | IBM Plex Sans Arabic |
| `type.headline-lg-mobile` | `24px` | `32px` | 700 | IBM Plex Sans Arabic |
| `type.headline-md` | `24px` | `32px` | 600 | IBM Plex Sans Arabic |
| `type.body-lg` | `18px` | `28px` | 400 | IBM Plex Sans Arabic |
| `type.body-md` | `16px` | `24px` | 400 | IBM Plex Sans Arabic |
| `type.body-sm` | `14px` | `22px` | 400 | IBM Plex Sans Arabic |
| `type.label-md` | `14px` | `20px` | 500 | IBM Plex Sans Arabic |
| `type.label-sm` | `12px` | `16px` | 600 | IBM Plex Sans Arabic |
| `type.metric-lg` | `32px` | `40px` | 700 | Montserrat; numeric value only |
| `type.metric-md` | `24px` | `32px` | 700 | Montserrat; numeric value only |

Arabic line height must remain generous enough for shaping and diacritics. Do not force Arabic headlines into the line heights intended for Latin text.

### 5.3 Typography usage

- Use weight 700 for primary display hierarchy and weight 600 for supporting headings.
- Use body text for descriptions and form guidance; do not use all-caps styling for Arabic.
- Use Montserrat only around a numeric value. The adjacent Arabic label remains IBM Plex Sans Arabic.
- Keep the existing price-first hierarchy on property cards.
- Do not solve a font mismatch by adding English copy or a second language layout.

## 6. Spacing and Layout

### 6.1 Base tokens

Spacing uses an 8px base unit.

| Token | Value | Use |
| --- | --- | --- |
| `space-1` | `4px` | Fine icon/text adjustment |
| `space-2` | `8px` | Small gap and `stack-sm` |
| `space-3` | `12px` | Compact control gap |
| `space-4` | `16px` | `stack-md`, card padding, field gap |
| `space-6` | `24px` | Grid gutter and section grouping |
| `space-8` | `32px` | `stack-lg` and section separation |
| `space-10` | `40px` | Desktop page margin |
| `space-12` | `48px` | Large section separation |

The 4px and 12px values support the existing radius and control patterns; primary layout rhythm remains based on 8px multiples.

### 6.2 Layout tokens

| Token | Value | Use |
| --- | --- | --- |
| `layout.container-max` | `1280px` | Maximum content width |
| `layout.gutter` | `24px` | Standard grid gap |
| `layout.margin-mobile` | `16px` | Mobile page margin |
| `layout.margin-desktop` | `40px` | Desktop page margin |
| `layout.stack-sm` | `8px` | Compact vertical stack |
| `layout.stack-md` | `16px` | Standard vertical stack |
| `layout.stack-lg` | `32px` | Large section stack |

Use a 12-column content grid at desktop widths, an 8-column grid at tablet/laptop widths, and a 4-column grid at mobile widths. Use a fixed sidebar plus fluid content only for protected Admin layouts where that pattern is required; public customer pages remain content-first.

## 7. Responsive Breakpoints

The system must support mobile, tablet, laptop, desktop, and large screens without changing the MKAAN visual language.

| Band | Width | Grid | Page margin | Guidance |
| --- | --- | --- | --- | --- |
| Mobile | `<768px` | 4 columns | `16px` | Single-column content, compact controls, drawer filters, stacked forms |
| Tablet | `768px-1023px` | 8 columns | `24px` | Two-column content where space permits; filters may collapse |
| Laptop | `1024px-1279px` | 8 columns | `24px-40px` | Preserve tablet patterns with more breathing room; do not force desktop density |
| Desktop | `1280px-1919px` | 12 columns | `40px` | Full listing, gallery, filter, and dashboard compositions |
| Large | `1920px+` | 12 columns | centered | Keep content at `1280px` maximum and avoid stretching reading widths |

### 7.1 Responsive component behavior

- **Property cards:** one column on narrow mobile, then expand to two or more columns only when the card remains readable; preserve the 16:9 image and price-first hierarchy.
- **Property filters:** inline/sidebar presentation on desktop; collapsible or drawer presentation on smaller widths; active filter feedback remains visible.
- **Property gallery:** preserve a clear main image and usable secondary images; never allow one failed image to disable the gallery.
- **Customer forms:** use one readable column on mobile; expand to grouped columns only when labels, error messages, and touch targets remain clear.
- **Headers:** preserve the current sticky surface treatment; navigation may collapse structurally on narrow widths without introducing new product actions.
- **Admin dashboard:** preserve the dark navigation plus light content contrast; sidebar navigation may collapse on smaller widths.
- **Motion:** responsive rearrangement must not depend on animation to communicate state.

## 8. Shape, Elevation, and Motion

### 8.1 Radius

| Token | Value | Use |
| --- | --- | --- |
| `radius-sm` | `4px` | Tags, compact indicators |
| `radius-md` | `8px` | Standard controls, inputs, small cards |
| `radius-lg` | `12px` | Medium containers |
| `radius-xl` | `16px` | Property images and main widgets |
| `radius-2xl` | `24px` | Search bars and prominent cards |
| `radius-3xl` | `32px` | Existing hero/glass-card treatment where already used |
| `radius-full` | `9999px` | Pills, circular controls, status chips |

The standard MKAAN control radius remains 8px. Larger radii are reserved for the existing hero, search, glass-card, and image treatments.

### 8.2 Elevation

- **Level 0:** Pearl White or light tonal page surface.
- **Level 1:** White card surface with soft shadow `0 4px 20px rgba(10, 25, 47, 0.05)`.
- **Level 2:** Hover/active elevation with a subtle outline and increased shadow; preserve the existing `hover-lift` behavior.
- **Level 3:** Dialog or overlay with stronger separation and backdrop blur where the component requires it.
- Do not use heavy shadows to compensate for missing hierarchy or poor contrast.

### 8.3 Motion

- Preserve restrained reveal and hover-lift motion already used in the current screens.
- Motion must not be required to understand loading, validation, success, error, or disabled states.
- Respect reduced-motion preferences by removing non-essential transforms and transitions.

## 9. Component Patterns

These patterns describe the current valid visual components. They are not a request to redraw the existing screens.

### 9.1 Public header

- Sticky or docked at the top of the page.
- Surface treatment uses a translucent light surface, backdrop blur, bottom outline, and restrained shadow.
- Logo graphic remains the approved asset and stays visually prominent.
- Navigation is Arabic and RTL.
- Public actions route to confirmed customer journeys only; no customer account action is added.
- The removed globe/language control must not be reintroduced.

### 9.2 Breadcrumbs

- Use a compact label style and low-emphasis separator icon.
- The current RTL pattern begins from the public home entry and ends at the current page.
- Use Arabic labels and semantic navigation markup.
- Directional separators must communicate RTL order without making the breadcrumb read like an LTR control.

### 9.3 Hero and search entry

- Preserve the photography-led hero treatment, Deep Navy grounding, and clear negative space for Arabic content.
- Search is the primary discovery entry and may use a more rounded treatment than ordinary controls.
- Search fields and filters must expose loading, empty, invalid, and error outcomes without changing the hero identity.

### 9.4 Property cards

- Use a 16:9 image area with resilient fallback behavior.
- Keep the price-first information hierarchy; price values use Montserrat and Arabic labels use IBM Plex Sans Arabic.
- Preserve the existing sale/rental/category badge treatment and current card spacing.
- Use outlined property-detail icons with muted Slate Gray emphasis.
- Maintain a clear property title, location, and category-aware details without displaying unrelated fields.
- Use `hover-lift` only as a progressive enhancement; the card remains understandable and actionable without hover.

### 9.5 Property details and gallery

- Keep the main image and gallery visually dominant.
- Present general information, category-aware details, price, location, and description in a clear hierarchy.
- Keep relevant CTAs before Similar Properties as required by DETAIL-008.
- Treat Similar Properties and individual media as secondary operations; their failure must not remove the primary detail or CTA.

### 9.6 Forms and inputs

- Labels remain visible and associated with their fields.
- Use a 1px outline-variant border in the resting state.
- Use the action color for visible focus, with a 2px focus ring and sufficient offset.
- Preserve the current radio-card pattern for mutually exclusive choices.
- Keep helper, validation, and server-failure messages close to the relevant field or form summary.
- Do not add fields that are not defined by the approved requirements/SRS or an approved detailed form definition.

### 9.7 Buttons and actions

- **Primary:** solid action blue with white text.
- **Secondary:** transparent or surface button with action-blue or Deep Navy outline.
- **Tertiary:** quiet/ghost action with Deep Navy or action-blue text.
- **Utility:** WhatsApp green only for the existing contact action pattern.
- Buttons must expose hover, pressed, focus, disabled, loading, and error-adjacent behavior without changing their meaning.
- CTA labels remain Arabic and describe the confirmed destination; a viewing request is not labeled as a confirmed booking.

### 9.8 Cards, glass surfaces, and badges

- Use the existing `glass-card` and tonal-layer treatment where already established.
- Use white surfaces, soft navy shadows, and outline-variant borders for elevated content.
- Badges are compact, readable, and never the only carrier of a business or validation meaning.

### 9.9 Admin shell and widgets

- The existing visual direction supports a Deep Navy navigation surface with light content surfaces.
- Metric values use Montserrat; Arabic metric labels use IBM Plex Sans Arabic.
- Admin-specific protected behavior is separate from public customer access.
- This section defines presentation patterns only. It does not choose Admin roles, authorization claims, publication-state names, or workflow permissions.

## 10. Common UI States

States are part of every reusable component contract. State copy is Arabic and safe for public display. A state must not expose stack traces, database details, provider errors, secrets, or internal identifiers.

### 10.1 Loading

- Use skeleton blocks that match the final layout, image ratio, and text hierarchy.
- Preserve surrounding page structure while data is loading.
- For incremental results, distinguish loading-more from initial loading.
- Do not present partial results as complete.
- Controls that are waiting on a submission show a local progress indicator and prevent accidental duplicate activation.

### 10.2 Empty

- Use a calm, intentional empty layout with an appropriate outline icon or illustration, Arabic explanation, and only a relevant next action.
- Empty search results are not errors.
- Explain that no matching content is available without exposing query internals.
- Do not invent recommendations or business actions not supported by the flow.

### 10.3 Error

- Use an error container, strong readable error text, and a clear recovery action where recovery is possible.
- Use `error-strong` for text when contrast requires it and `error-accent` for visual emphasis.
- Preserve the primary page and unrelated content when a secondary feature fails.
- Use safe generic wording for system or provider failures.

### 10.4 Validation

- Show field-level errors beside the field and associate them programmatically.
- Use a form-level summary when multiple fields fail or when the invalid submission needs an overview.
- Keep the entered values where safe and practical.
- Clearly distinguish required-value, invalid-value, and unavailable/not-found outcomes without exposing internal validation rules.
- Client feedback is helpful, but server validation remains authoritative.

### 10.5 Success

- Show a clear Arabic received/success outcome after the server confirms the operation.
- Keep success messaging safe and user-facing; do not expose internal lead IDs or implementation details.
- For request flows, communicate that the request was received. Do not imply an automatic viewing confirmation, booking, publication, or guaranteed service outcome.
- Success may be inline, a dedicated outcome view, or a safe toast/banner according to the surrounding flow; the visual language remains consistent.

### 10.6 Disabled

- Reduce emphasis without making the control illegible.
- Use lower opacity, preserve contrast, and remove hover/pressed elevation.
- The disabled appearance must not be the only explanation for why an action is unavailable; use helper text where context is needed.

### 10.7 Focus

- Use `:focus-visible` for keyboard-visible focus.
- Apply a 2px action-blue ring with enough offset from the control edge.
- Never remove the focus indicator for convenience.
- Focus order follows the RTL reading and interaction order.

### 10.8 Unauthorized

- Use this state only for protected Admin experiences.
- Show a safe, clear Arabic outcome for authentication-required or unauthorized access.
- Do not offer or imply customer account creation or customer login as a recovery path.
- Do not reveal whether a protected record exists.

### 10.9 Not found and unavailable

- Use a safe not-found/unavailable composition for missing, invalid, unpublished, or archived public property access.
- Do not expose unpublished property information.
- Preserve the public shell and provide only a relevant navigation recovery action.

## 11. Accessibility Conventions

The visual system supports the accessibility expectations in A11Y-001 through A11Y-008.

- Use semantic landmarks, headings, lists, buttons, links, forms, and navigation.
- Every form control has an associated visible Arabic label.
- Every validation outcome is understandable visually and available to assistive technology.
- Maintain readable contrast for text, controls, focus indicators, and status states.
- Do not use color as the only distinction for status, selection, validation, or disabled behavior.
- Keep interactive targets at least 44px where practical, especially on mobile.
- Provide meaningful Arabic alt text for content imagery; decorative imagery is marked decorative.
- Keep keyboard navigation and visible focus available across public and Admin surfaces.
- Preserve reading order in RTL layouts and verify directional icon meaning.
- Respect reduced-motion preferences and avoid essential information being conveyed only through animation.
- Preserve usable text zoom and avoid clipped Arabic glyphs, labels, or validation messages.

## 12. Imagery and Iconography

- Preserve the current premium architectural photography direction: modern Egyptian residential spaces, clean geometry, natural or cinematic light, and clear negative space for Arabic UI content.
- Use `object-fit` and resilient fallbacks so one failed image does not break a gallery or card collection.
- Keep the MKAAN logo as the approved graphic asset without redesign or text substitution.
- The current Stitch visual reference uses Material Symbols Outlined. The implementation should use an equivalent restrained outlined icon treatment and follow the Software Design's approved icon-library boundary.
- Icons support meaning and hierarchy; they do not replace required Arabic labels for important actions.

## 13. Design System Corrections

The following verified inconsistencies are corrected by this document and the updated Stitch Design System:

1. The public visual foundation no longer assumes customer authentication or an account entry point.
2. The public visual foundation no longer assumes a customer language switch or bilingual UI mode.
3. Arabic-capable IBM Plex Sans Arabic is the font for all Arabic text, including headlines and body copy.
4. Montserrat is limited to numeric, price, percentage, and metric display roles already present in the current screens.
5. The primary color is normalized to `#0A192F`; the stale black primary token is removed.
6. The action-blue family is normalized to the verified `#0058BE` ramp; the stale `#3B82F6` override is removed.
7. Surface, status, focus, disabled, and semantic state roles are documented.
8. Mobile, tablet, laptop, desktop, and large-screen behavior is documented without changing the existing screen layouts.
9. Loading, empty, error, validation, success, disabled, focus, unauthorized, and not-found conventions are documented.
10. The logo remains an unchanged graphic asset and is not treated as UI copy.

## 14. Deferred Decisions and Non-Goals

This Design System does not resolve or invent any of the following:

- `DEFER-001`: target geography.
- `DEFER-004` and `DEFER-005`: exact service fields and representative service example.
- `DEFER-008`: detailed validation constraints.
- `DEFER-009`: detailed Admin authorization model.
- `DEFER-010`: exact publication state names, transition permissions, and operational details.
- Exact public form field lists where they are not defined by the Requirements/SRS.
- Image storage, analytics, hosting, monitoring, backup, recovery, migration, or testing providers.
- Customer accounts, customer dashboards, favorites, payments, chat, booking engines, or other excluded scope.

No existing screen is redesigned or modified by this Design System update. Existing screens remain the visual reference and future screens must use these corrected tokens and state conventions.

## 15. Implementation Guidance

When implementing the UI:

1. Load IBM Plex Sans Arabic for Arabic text and Montserrat only for numeric display roles.
2. Set the public document direction and language to `dir="rtl" lang="ar"`.
3. Use semantic color and spacing tokens instead of one-off values.
4. Reuse the current header, breadcrumb, card, form, button, badge, gallery, and glass-surface patterns before creating new variants.
5. Add every required state as part of the component or route contract, not as an afterthought.
6. Verify mobile, tablet, laptop, desktop, and large-screen behavior against the breakpoint rules.
7. Keep customer flows anonymous and keep protected Admin authorization separate.
8. Do not turn a deferred product decision into a visual or data assumption.
9. Do not apply this document retroactively to alter the seven existing Stitch screens without a separate explicit screen-edit request.
