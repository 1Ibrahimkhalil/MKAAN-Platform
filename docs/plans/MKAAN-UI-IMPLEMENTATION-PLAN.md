# MKAAN UI Implementation Plan

**Project:** MKAAN
**Document status:** Comprehensive UI implementation plan for all customer-facing and Admin screens
**Language:** Arabic-only MVP
**Direction:** Right-to-left (RTL)
**Last updated:** 2026-08-21

## 1. Authority and Scope

### 1.1 Authority hierarchy

1. `docs/requirements/MKAAN-REQUIREMENTS.md` for product scope, exclusions, business rules, and deferred decisions.
2. `docs/requirements/MKAAN-SRS.md` for observable behavior, validation, error, loading, empty, not-found, and unauthorized outcomes.
3. `docs/design/MKAAN-SOFTWARE-DESIGN.md` for technical boundaries, module responsibilities, and implementation constraints.
4. `docs/design/MKAAN-DESIGN-SYSTEM.md` for visual tokens, component patterns, states, directionality, and presentation guidance.

### 1.2 Scope

This plan defines every UI screen, component, state, responsive variant, and implementation dependency for the MKAAN MVP. It covers:

- All customer-facing screens and their UI states
- All Admin screens and their UI states
- Shared component inventory
- Responsive behavior per breakpoint
- UI state requirements (loading, empty, error, validation, success, unauthorized, not-found)
- Screen-level dependencies and implementation order
- Missing Stitch design coverage and gaps

### 1.3 What this plan does NOT resolve

- Exact form field lists (deferred per DEFER-004, DEFER-005, DEFER-008)
- Publication state names and transition permissions (deferred per DEFER-010)
- Admin authorization configuration (deferred per DEFER-009)
- Image storage provider (deferred per DEFER-003)
- Analytics provider (deferred per DEFER-007)
- Exact service-specific fields (deferred per DEFER-004)

---

## 2. Screen Inventory

### 2.1 Customer-facing screens

| # | Screen | Route pattern | Stitch coverage | Status |
| --- | --- | --- | --- | --- |
| C-01 | Homepage | `/` | Yes | Design exists |
| C-02 | Property Listing | `/properties` | Yes | Design exists |
| C-03 | Property Details | `/properties/[slug]` | Yes | Design exists |
| C-04 | Request a Property | `/request-property` | Yes | Design exists |
| C-05 | Request a Viewing | `/request-viewing/[slug]` | No | **Missing** |
| C-06 | List Your Property | `/list-property` | Yes | Design exists |
| C-07 | Services | `/services` | Yes | Design exists |
| C-08 | Service Request | `/services/[service]` | Yes | Design exists |
| C-09 | Contact | `/contact` | No | **Missing** |
| C-10 | Success / Thank You | `/success` | No | **Missing** |
| C-11 | 404 Not Found | `/*` | No | **Missing** |

**Total customer-facing screens:** 11
**Stitch coverage:** 7 of 11 (64%)
**Missing designs:** 4 (Request a Viewing, Contact, Success, 404)

### 2.2 Admin screens

| # | Screen | Route pattern | Stitch coverage | Status |
| --- | --- | --- | --- | --- |
| A-01 | Admin Login | `/admin/login` | No | **Missing** |
| A-02 | Admin Dashboard | `/admin` | No | **Missing** |
| A-03 | Admin Properties List | `/admin/properties` | No | **Missing** |
| A-04 | Admin Property Create/Edit | `/admin/properties/[id]` | No | **Missing** |
| A-05 | Admin Categories | `/admin/categories` | No | **Missing** |
| A-06 | Admin Dynamic Fields | `/admin/fields` | No | **Missing** |
| A-07 | Admin Locations | `/admin/locations` | No | **Missing** |
| A-08 | Admin Leads List | `/admin/leads` | No | **Missing** |
| A-09 | Admin Lead Detail | `/admin/leads/[id]` | No | **Missing** |
| A-10 | Admin Services | `/admin/services` | No | **Missing** |
| A-11 | Admin Unauthorized | `/admin/unauthorized` | No | **Missing** |

**Total Admin screens:** 11
**Stitch coverage:** 0 of 11 (0%)
**Missing designs:** 11 (all Admin screens)

### 2.3 Summary

| Category | Total | With Stitch | Missing |
| --- | --- | --- | --- |
| Customer-facing | 11 | 7 | 4 |
| Admin | 11 | 0 | 11 |
| **Total** | **22** | **7** | **15** |

---

## 3. Screen Specifications - Customer-Facing

### C-01: Homepage (`/`)

**Purpose:** Primary public entry point for property discovery and service awareness.

**Content sections:**
1. Hero section: Photography-led hero with Deep Navy grounding, clear negative space, Arabic headline, primary search bar
2. Search bar: Rounded treatment with category, transaction type, and location inputs; loading/empty/error states
3. Featured properties: Horizontal scroll or grid of featured property cards; loading skeleton, empty state, error isolation
4. Services entry: Unified services entry showing 3 confirmed services (Finishing, Maintenance, Prepare for Sale/Rent); links to `/services`
5. CTAs: Request a Property, List Your Property actions
6. Footer: Company info, navigation links, contact info

**UI states:**
- Loading: Skeleton hero, skeleton property cards, skeleton services
- Error: Hero remains usable; featured properties section isolated failure
- Empty: No featured properties - calm empty state, not error

**Responsive:**
- Mobile: Single-column, stacked sections, search bar full-width
- Tablet: 2-column property cards where space permits
- Desktop: Full hero, 3-4 property cards in row, horizontal services layout

**Stitch reference:** Homepage screen

---

### C-02: Property Listing (`/properties`)

**Purpose:** Public property discovery with search, filtering, sorting, and incremental loading.

**Content sections:**
1. Page header: Breadcrumbs (Home > Properties), page title
2. Search bar: Text search input
3. Filters panel:
   - Category filter (dropdown/radio)
   - Transaction type filter (Sale/Rental)
   - Location filter (dropdown)
   - Price range filter
   - Dynamic category-specific filters (resolved from active field definitions)
4. Sort control: Sort dropdown (price, date, etc.)
5. Results grid: Property cards with 16:9 image, price (Montserrat), location, category badge
6. Incremental loading: Load-more or infinite scroll with loading indicator
7. Empty state: No matching properties
8. Error state: Search failure

**UI states:**
- Loading: Initial skeleton grid, loading-more indicator
- Empty: "No matching properties" with relevant next action
- Error: Safe error state, no false results
- Validation: Invalid filter combination feedback

**Responsive:**
- Mobile: Drawer/filter sheet, 1-column cards, compact filter chips
- Tablet: Collapsible sidebar filters, 2-column cards
- Desktop: Sidebar filters, 3-column cards, full sort control

**Dynamic filter behavior:**
- Category change removes/excludes irrelevant filters
- Active filters update when category changes
- Only active filterable fields from selected category appear

**Stitch reference:** Properties listing screen

---

### C-03: Property Details (`/properties/[slug]`)

**Purpose:** Full property information, gallery, CTAs, and similar properties.

**Content sections:**
1. Breadcrumbs: Home > Category > Property
2. Gallery: Main image + secondary images carousel/grid; one failed image must not break gallery
3. General property information: Category, transaction type, price (Montserrat), location
4. Category-specific information: Dynamic fields resolved from category definition; only displayable fields shown
5. Price: Prominent Montserrat display
6. Location: Map reference or location label
7. Description: Arabic property description
8. CTAs: Request a Viewing, Contact MKAAN, Request a Property; CTAs must appear BEFORE Similar Properties (DETAIL-008)
9. Similar properties: Secondary property card grid; failure isolated from primary detail

**UI states:**
- Loading: Skeleton gallery, skeleton info blocks, skeleton similar properties
- Error: Primary detail remains usable when similar properties fail; one image failure does not break gallery
- Not found: Missing, invalid, unpublished, or archived property shows safe 404
- Empty similar: No similar properties - calm state, not error

**Responsive:**
- Mobile: Stacked layout, full-width gallery, stacked info sections
- Tablet: 2-column info layout, gallery remains dominant
- Desktop: Side-by-side gallery and info, similar properties in row

**SEO requirements:**
- Dynamic title, meta description, canonical URL
- Open Graph metadata and social sharing image
- Latin/English slug with unique identifier (e.g., `/properties/apartment-for-sale-shebin-el-kom-a8f32`)
- Arabic customer-facing content and metadata

**Stitch reference:** Property details screen

---

### C-04: Request a Property (`/request-property`)

**Purpose:** Customer describes the type of property they are looking for.

**Content sections:**
1. Breadcrumbs: Home > Request a Property
2. Page title: Arabic heading
3. Property request form: Customer describes desired property type (exact fields deferred)
4. Submit button: Primary action
5. Helper text: Guidance about the request process

**UI states:**
- Loading: Skeleton form
- Validation: Field-level errors beside fields, form-level summary for multiple failures
- Success: Clear "request received" outcome - NOT a booking confirmation
- Error: Safe failure state, no lead created for invalid submission

**Responsive:**
- Mobile: Single-column form, full-width fields
- Tablet: Grouped columns where labels remain clear
- Desktop: Comfortable multi-column layout

**Stitch reference:** Request a property screen

---

### C-05: Request a Viewing (`/request-viewing/[slug]`)

**Purpose:** Customer requests MKAAN to arrange a viewing for a specific property.

**Content sections:**
1. Breadcrumbs: Home > Property > Request Viewing
2. Property summary: Compact property card showing the referenced property
3. Viewing request form: Customer requests viewing (exact fields deferred)
4. Submit button: Primary action
5. Helper text: "This is a request, not a confirmed booking. MKAAN will confirm the viewing."

**UI states:**
- Loading: Skeleton form with property card
- Validation: Field-level errors
- Success: "Viewing request received" - NOT confirmed booking; communicate MKAAN will confirm
- Error: Safe failure state
- Not found: Invalid/unpublished property shows unavailable state

**Responsive:**
- Mobile: Stacked layout, property card above form
- Tablet: Side-by-side property summary and form
- Desktop: Property summary sidebar, form main content

**Key business rules:**
- Viewing request is NOT a confirmed booking (BR-006)
- Must reference a valid published property
- Creates a viewing lead (LEAD-001)

**Stitch reference:** No design exists - must be created

---

### C-06: List Your Property (`/list-property`)

**Purpose:** Customer submits a listing request for MKAAN to review and potentially prepare and publish.

**Content sections:**
1. Breadcrumbs: Home > List Your Property
2. Page title: Arabic heading explaining the listing process
3. Listing form: Customer provides property details for MKAAN review (exact fields deferred)
4. Submit button: Primary action
5. Process explanation: Brief overview of the listing workflow (submission -> review -> inspection -> preparation -> photography -> listing preparation -> Admin approval -> publication)

**UI states:**
- Loading: Skeleton form
- Validation: Field-level errors
- Success: "Listing request received" - property is NOT published; explain next steps
- Error: Safe failure state

**Responsive:**
- Mobile: Single-column form
- Tablet: Grouped columns
- Desktop: Multi-column with process sidebar

**Key business rules:**
- Submission must NEVER automatically publish a property (BR-003)
- Creates a listing lead (LEAD-003)
- MKAAN handles review, inspection, preparation, photography, listing preparation, and Admin approval (BR-004, BR-011, BR-013, BR-014)

**Stitch reference:** List your property screen

---

### C-07: Services (`/services`)

**Purpose:** Unified services entry point showing all three confirmed services.

**Content sections:**
1. Breadcrumbs: Home > Services
2. Page title: Arabic heading
3. Service cards: Three confirmed services displayed as selectable cards
   - Finishing
   - Maintenance
   - Prepare Your Property for Sale/Rent
4. Each card links to the corresponding service request page

**UI states:**
- Loading: Skeleton service cards
- Error: Safe error state
- All three services are always present (MVP scope is fixed)

**Responsive:**
- Mobile: Stacked service cards, full-width
- Tablet: 2-column or 3-column grid
- Desktop: 3-column horizontal layout

**Stitch reference:** Services screen

---

### C-08: Service Request (`/services/[service]`)

**Purpose:** Customer submits a service-specific request with a dynamic form.

**Content sections:**
1. Breadcrumbs: Home > Services > [Service Name]
2. Service title: Reflects the selected service
3. Dynamic form: Form changes based on selected service (exact fields deferred per DEFER-004)
4. Submit button: Primary action
5. Helper text: Service-specific guidance

**UI states:**
- Loading: Skeleton form
- Validation: Field-level errors; dynamic field validation per service definition
- Success: "Service request received" - creates a service lead
- Error: Safe failure state
- Invalid service: Unsupported or inactive service shows unavailable state

**Responsive:**
- Mobile: Single-column dynamic form
- Tablet: Grouped columns where appropriate
- Desktop: Comfortable layout with service context

**Key business rules:**
- Selected service determines the form definition (BR-007)
- Service forms are dynamic (SERVICE-008)
- Creates a service lead (LEAD-004)
- Validation is server-side per the active form definition (SERVICE-011)

**Stitch reference:** Service request screen

---

### C-09: Contact (`/contact`)

**Purpose:** Customer submits a contact request to MKAAN.

**Content sections:**
1. Breadcrumbs: Home > Contact
2. Page title: Arabic heading
3. Contact form: Customer contact request (exact fields deferred)
4. Submit button: Primary action
5. Optional: WhatsApp contact action (existing pattern)

**UI states:**
- Loading: Skeleton form
- Validation: Field-level errors
- Success: "Contact request received" - creates a contact lead
- Error: Safe failure state

**Responsive:**
- Mobile: Single-column form
- Tablet: Grouped layout
- Desktop: Form with contact information sidebar

**Key business rules:**
- No account or login required (FLOW-014)
- Creates a contact lead (LEAD-005)

**Stitch reference:** No design exists - must be created

---

### C-10: Success / Thank You (`/success`)

**Purpose:** Confirmation page after any successful customer request submission.

**Content sections:**
1. Success icon/illustration
2. Success heading: Arabic "Thank you" / "Request received" message
3. Success description: Context-specific message about what happens next
4. Navigation actions: Return to homepage, view properties, contact options

**UI states:**
- This is always a success state; no loading/error states needed
- Context parameter determines the message (viewing request, property request, listing request, service request, contact request)

**Responsive:**
- Consistent centered layout across all breakpoints

**Key business rules:**
- Must not expose internal lead IDs or implementation details
- Must not imply automatic confirmation, booking, or publication
- Communicate that MKAAN will follow up

**Stitch reference:** No design exists - must be created

---

### C-11: 404 Not Found (`/*`)

**Purpose:** Safe handling of missing, invalid, unpublished, or archived public property access.

**Content sections:**
1. 404 heading: Arabic "Page not found" message
2. Description: Safe generic message
3. Navigation action: Return to homepage
4. Optional: Search bar for property discovery

**UI states:**
- This is always a not-found state
- Must not expose whether a protected record exists

**Responsive:**
- Consistent centered layout across all breakpoints

**Key business rules:**
- Missing properties produce proper not-found behavior (SEO-012)
- Unpublished properties must not be disclosed (PUB-003)
- Must not reveal database details or internal information

**Stitch reference:** No design exists - must be created

---

## 4. Screen Specifications - Admin

### A-01: Admin Login (`/admin/login`)

**Purpose:** Clerk authentication entry for Admin users.

**Content sections:**
1. MKAAN branding
2. Clerk sign-in component
3. Helper text about Admin access

**UI states:**
- Loading: Clerk component loading
- Error: Authentication failure
- Unauthorized: Authenticated but not authorized

**Responsive:**
- Centered card layout across all breakpoints

**Key business rules:**
- Authentication is required (AUTH-003)
- Server-side authorization enforced (AUTH-004)
- UI visibility is not authorization (AUTH-005)
- No customer login path implied

---

### A-02: Admin Dashboard (`/admin`)

**Purpose:** Admin overview with key metrics and navigation to management sections.

**Content sections:**
1. Admin header: Dark navigation surface, user info, logout
2. Metrics overview: Property count, lead count, pending approvals, recent activity (Montserrat for numbers)
3. Quick navigation: Links to properties, categories, fields, locations, leads, services
4. Recent activity feed: Recent leads, property changes

**UI states:**
- Loading: Skeleton dashboard
- Unauthorized: Redirect to login or show unauthorized state
- Error: Safe error state

**Responsive:**
- Mobile: Stacked metrics, collapsed navigation
- Tablet: 2-column metrics grid
- Desktop: Full dashboard with sidebar navigation

---

### A-03: Admin Properties List (`/admin/properties`)

**Purpose:** Manage all properties with filtering, status, and quick actions.

**Content sections:**
1. Page header: "Properties" title, create new button
2. Filters: Status, category, transaction type, location
3. Properties table/grid: Property info, status badge, category, price, actions
4. Bulk actions: Select and manage multiple properties
5. Pagination

**UI states:**
- Loading: Skeleton table
- Empty: No properties
- Error: Safe error state

---

### A-04: Admin Property Create/Edit (`/admin/properties/[id]`)

**Purpose:** Create or edit property details, category-aware fields, and media.

**Content sections:**
1. Property form: General data, category, location, price, description
2. Dynamic fields: Resolved from category definition
3. Media management: Upload, reorder, set main image
4. Workflow status: Current publication state
5. Actions: Save, publish, unpublish, archive

**UI states:**
- Loading: Skeleton form
- Validation: Field-level errors
- Success: Save confirmation
- Error: Safe failure state

---

### A-05: Admin Categories (`/admin/categories`)

**Purpose:** Manage property categories and their field assignments.

**Content sections:**
1. Categories list: Category names, property count, active state
2. Category form: Create/edit category
3. Field assignment: Assign/unassign dynamic fields to categories
4. Actions: Create, edit, deactivate

**UI states:**
- Loading: Skeleton list
- Empty: No categories
- Validation: uniqueness, reference safety

---

### A-06: Admin Dynamic Fields (`/admin/fields`)

**Purpose:** Manage dynamic field definitions, types, options, and flags.

**Content sections:**
1. Fields list: Field name, type, required, filterable, displayable, active state
2. Field form: Create/edit field definition
3. Options management: For option-based fields
4. Category applicability: Which categories use this field
5. Actions: Create, edit, deactivate

**UI states:**
- Loading: Skeleton list
- Empty: No fields
- Validation: Type compatibility, option safety

---

### A-07: Admin Locations (`/admin/locations`)

**Purpose:** Manage property locations.

**Content sections:**
1. Locations list: Location names, property count, active state
2. Location form: Create/edit location
3. Actions: Create, edit, deactivate

**UI states:**
- Loading: Skeleton list
- Empty: No locations
- Validation: Uniqueness, reference safety

---

### A-08: Admin Leads List (`/admin/leads`)

**Purpose:** Manage all leads with filtering and status changes.

**Content sections:**
1. Page header: "Leads" title
2. Filters: Source type, status, date range, property reference
3. Leads table: Source, status badge, contact info, date, actions
4. Status change: Quick status update
5. Pagination

**UI states:**
- Loading: Skeleton table
- Empty: No leads
- Error: Safe error state

---

### A-09: Admin Lead Detail (`/admin/leads/[id]`)

**Purpose:** View and manage individual lead details and status.

**Content sections:**
1. Lead info: Source type, creation date, status
2. Request data: Source-specific request information
3. Property reference: If applicable
4. Status management: Change status with transition validation
5. Actions: Update status, add notes (if supported)

**UI states:**
- Loading: Skeleton detail
- Not found: Lead does not exist
- Conflict: Concurrent status change
- Validation: Invalid status transition

---

### A-10: Admin Services (`/admin/services`)

**Purpose:** Manage service definitions and their dynamic forms.

**Content sections:**
1. Services list: Three confirmed services, active state
2. Service form: Edit service details
3. Form field management: Dynamic fields for each service
4. Actions: Edit, deactivate

**UI states:**
- Loading: Skeleton
- Validation: Only three confirmed services in MVP scope

---

### A-11: Admin Unauthorized (`/admin/unauthorized`)

**Purpose:** Safe outcome for unauthenticated or unauthorized Admin access attempts.

**Content sections:**
1. Unauthorized heading: Arabic message
2. Description: Safe generic message about access requirements
3. Navigation: Return to login, return to homepage

**UI states:**
- This is always an unauthorized state
- Must not reveal whether a protected record exists

---

## 5. Shared Component Inventory

### 5.1 Layout components (already partially implemented)

| Component | File | Status | Notes |
| --- | --- | --- | --- |
| Public Header | `src/components/layout/public-header.tsx` | To create | Sticky, blur, border, shadow, logo, RTL nav |
| Public Footer | `src/components/layout/public-footer.tsx` | To create | Company info, links, contact |
| Admin Shell | `src/components/layout/admin-shell.tsx` | To create | Dark nav sidebar + light content |
| Breadcrumbs | `src/components/ui/breadcrumbs.tsx` | To create | RTL breadcrumb pattern |
| Container | `src/components/layout/container.tsx` | To create | Max-width 1280px, responsive margins |

### 5.2 Property components

| Component | File | Status | Notes |
| --- | --- | --- | --- |
| Property Card | `src/components/property/property-card.tsx` | To create | 16:9 image, price-first, badges, hover-lift |
| Property Grid | `src/components/property/property-grid.tsx` | To create | Responsive card grid |
| Property Gallery | `src/components/property/property-gallery.tsx` | To create | Main image + carousel, failure isolation |
| Property Info | `src/components/property/property-info.tsx` | To create | General + category-specific info |
| Similar Properties | `src/components/property/similar-properties.tsx` | To create | Secondary, failure isolated |
| Featured Properties | `src/components/property/featured-properties.tsx` | To create | Homepage featured section |

### 5.3 Search and filter components

| Component | File | Status | Notes |
| --- | --- | --- | --- |
| Search Bar | `src/components/search/search-bar.tsx` | To create | Rounded, category-aware |
| Filter Panel | `src/components/search/filter-panel.tsx` | To create | Desktop sidebar, mobile drawer |
| Filter Chip | `src/components/search/filter-chip.tsx` | To create | Active filter indicator |
| Sort Control | `src/components/search/sort-control.tsx` | To create | Sort dropdown |
| Load More | `src/components/search/load-more.tsx` | To create | Incremental loading indicator |

### 5.4 Form components

| Component | File | Status | Notes |
| --- | --- | --- | --- |
| Form Field | `src/components/form/form-field.tsx` | To create | Label, input, error, helper text |
| Form Error | `src/components/form/form-error.tsx` | To create | Field-level and form-level errors |
| Form Summary | `src/components/form/form-summary.tsx` | To create | Multi-field error summary |
| Radio Card | `src/components/form/radio-card.tsx` | To create | Mutually exclusive choices |
| Submit Button | `src/components/form/submit-button.tsx` | To create | Loading, disabled states |

### 5.5 Service components

| Component | File | Status | Notes |
| --- | --- | --- | --- |
| Service Card | `src/components/service/service-card.tsx` | To create | Service entry card |
| Service Form | `src/components/service/service-form.tsx` | To create | Dynamic form per service |

### 5.6 CTA components

| Component | File | Status | Notes |
| --- | --- | --- | --- |
| CTA Section | `src/components/cta/cta-section.tsx` | To create | Before Similar Properties |
| WhatsApp Button | `src/components/cta/whatsapp-button.tsx` | To create | WhatsApp green action |

### 5.7 Admin components

| Component | File | Status | Notes |
| --- | --- | --- | --- |
| Admin Sidebar | `src/components/admin/admin-sidebar.tsx` | To create | Dark nav, collapsible |
| Admin Table | `src/components/admin/admin-table.tsx` | To create | Data table with filters |
| Status Badge | `src/components/admin/status-badge.tsx` | To create | Lead/property status |
| Admin Metric Card | `src/components/admin/metric-card.tsx` | To create | Montserrat numbers |
| Admin Form | `src/components/admin/admin-form.tsx` | To create | Admin create/edit form |

### 5.8 Existing feedback components (already implemented)

| Component | File | Status |
| --- | --- | --- |
| Loading State | `src/components/feedback/loading-state.tsx` | Implemented |
| Empty State | `src/components/feedback/empty-state.tsx` | Implemented |
| Error State | `src/components/feedback/error-state.tsx` | Implemented |
| Success State | `src/components/feedback/success-state.tsx` | Implemented |
| Unauthorized State | `src/components/feedback/unauthorized-state.tsx` | Implemented |
| Not Found State | `src/components/feedback/not-found-state.tsx` | Implemented |

### 5.9 Existing shadcn components (already implemented)

| Component | File | Status |
| --- | --- | --- |
| Button | `src/components/ui/button.tsx` | Implemented |
| Card | `src/components/ui/card.tsx` | Implemented |
| Input | `src/components/ui/input.tsx` | Implemented |
| Label | `src/components/ui/label.tsx` | Implemented |
| Badge | `src/components/ui/badge.tsx` | Implemented |
| Skeleton | `src/components/ui/skeleton.tsx` | Implemented |
| Alert | `src/components/ui/alert.tsx` | Implemented |
| Separator | `src/components/ui/separator.tsx` | Implemented |

---

## 6. Responsive Behavior Matrix

| Component | Mobile (<768px) | Tablet (768-1023px) | Laptop (1024-1279px) | Desktop (1280-1919px) | Large (1920px+) |
| --- | --- | --- | --- | --- | --- |
| Property Card | 1 column | 2 columns | 2 columns | 3 columns | 3 columns |
| Property Grid | 1 column | 2 columns | 2-3 columns | 3-4 columns | 3-4 columns |
| Filter Panel | Drawer/sheet | Collapsible sidebar | Sidebar | Sidebar | Sidebar |
| Property Gallery | Stacked | 2-column | Main + sidebar | Main + sidebar | Main + sidebar |
| Forms | 1 column | Grouped columns | Multi-column | Multi-column | Multi-column |
| Admin Sidebar | Collapsed/hidden | Collapsed | Expanded | Expanded | Expanded |
| Admin Table | Card view | Table | Table | Table | Table |
| Header | Compact, hamburger | Compact | Full nav | Full nav | Full nav |

---

## 7. UI State Requirements per Screen

| Screen | Loading | Empty | Error | Validation | Success | Unauthorized | Not Found |
| --- | --- | --- | --- | --- | --- | --- | --- |
| C-01 Homepage | Yes | Yes | Yes (isolated) | N/A | N/A | N/A | N/A |
| C-02 Property Listing | Yes | Yes | Yes | Yes | N/A | N/A | N/A |
| C-03 Property Details | Yes | Yes (similar) | Yes (isolated) | N/A | N/A | N/A | Yes |
| C-04 Request a Property | Yes | N/A | Yes | Yes | Yes | N/A | N/A |
| C-05 Request a Viewing | Yes | N/A | Yes | Yes | Yes | N/A | Yes |
| C-06 List Your Property | Yes | N/A | Yes | Yes | Yes | N/A | N/A |
| C-07 Services | Yes | N/A | Yes | N/A | N/A | N/A | N/A |
| C-08 Service Request | Yes | N/A | Yes | Yes | Yes | N/A | Yes |
| C-09 Contact | Yes | N/A | Yes | Yes | Yes | N/A | N/A |
| C-10 Success | N/A | N/A | N/A | N/A | Yes | N/A | N/A |
| C-11 404 | N/A | N/A | N/A | N/A | N/A | N/A | Yes |
| A-01 Admin Login | Yes | N/A | Yes | Yes | N/A | Yes | N/A |
| A-02 Admin Dashboard | Yes | Yes | Yes | N/A | N/A | Yes | N/A |
| A-03 Admin Properties | Yes | Yes | Yes | N/A | Yes | Yes | N/A |
| A-04 Admin Property Edit | Yes | N/A | Yes | Yes | Yes | Yes | Yes |
| A-05 Admin Categories | Yes | Yes | Yes | Yes | Yes | Yes | N/A |
| A-06 Admin Fields | Yes | Yes | Yes | Yes | Yes | Yes | N/A |
| A-07 Admin Locations | Yes | Yes | Yes | Yes | Yes | Yes | N/A |
| A-08 Admin Leads | Yes | Yes | Yes | N/A | Yes | Yes | N/A |
| A-09 Admin Lead Detail | Yes | N/A | Yes | Yes | Yes | Yes | Yes |
| A-10 Admin Services | Yes | N/A | Yes | Yes | Yes | Yes | N/A |
| A-11 Admin Unauthorized | N/A | N/A | N/A | N/A | N/A | Yes | N/A |

---

## 8. Implementation Order

### Phase 1: Shared Foundation (prerequisite for all screens)

Build shared components and layout infrastructure first. Every screen depends on these.

| Priority | Component | Depends on | Notes |
| --- | --- | --- | --- |
| 1.1 | Container + responsive layout | globals.css tokens | Max-width, margins, grid |
| 1.2 | Public Header | Container, tokens | Sticky, blur, RTL nav, logo |
| 1.3 | Public Footer | Container, tokens | Company info, links |
| 1.4 | Breadcrumbs | Tokens, RTL | RTL breadcrumb pattern |
| 1.5 | Form Field | shadcn Label + Input | Label, input, error, helper |
| 1.6 | Form Error | tokens | Field-level and summary |
| 1.7 | Radio Card | shadcn Card + Label | Mutually exclusive choices |
| 1.8 | Submit Button | shadcn Button | Loading, disabled states |
| 1.9 | Property Card | Container, tokens | 16:9 image, price-first |
| 1.10 | Property Grid | Property Card | Responsive grid |
| 1.11 | Search Bar | Form Field, tokens | Rounded, category-aware |
| 1.12 | Filter Panel | Form Field, Radio Card | Desktop sidebar, mobile drawer |
| 1.13 | Sort Control | tokens | Dropdown |
| 1.14 | Load More | tokens | Incremental loading |
| 1.15 | Status Badge | tokens | Lead/property status |

### Phase 2: Core Customer Screens (highest business value)

| Priority | Screen | Depends on | Notes |
| --- | --- | --- | --- |
| 2.1 | C-01 Homepage | Header, Footer, Property Card, Search Bar | Primary entry point |
| 2.2 | C-02 Property Listing | Header, Footer, Property Grid, Filter Panel, Sort, Load More | Search and discovery |
| 2.3 | C-03 Property Details | Header, Footer, Breadcrumbs, Property Gallery | Core property experience |
| 2.4 | C-11 404 | Header, Footer | Safe not-found handling |

### Phase 3: Customer Request Screens

| Priority | Screen | Depends on | Notes |
| --- | --- | --- | --- |
| 3.1 | C-04 Request a Property | Header, Footer, Form components | Property request flow |
| 3.2 | C-05 Request a Viewing | Header, Footer, Form components, Property Card | Viewing request flow |
| 3.3 | C-06 List Your Property | Header, Footer, Form components | Listing request flow |
| 3.4 | C-10 Success | Header, Footer | Post-submission confirmation |
| 3.5 | C-09 Contact | Header, Footer, Form components | Contact request flow |

### Phase 4: Services Screens

| Priority | Screen | Depends on | Notes |
| --- | --- | --- | --- |
| 4.1 | C-07 Services | Header, Footer, Service Card | Unified services entry |
| 4.2 | C-08 Service Request | Header, Footer, Service Form, Form components | Dynamic service form |

### Phase 5: Admin Shell and Core

| Priority | Screen | Depends on | Notes |
| --- | --- | --- | --- |
| 5.1 | Admin Shell (layout) | Dark nav, light content | Admin layout wrapper |
| 5.2 | A-01 Admin Login | Admin Shell, Clerk | Authentication entry |
| 5.3 | A-11 Admin Unauthorized | Admin Shell | Safe unauthorized state |
| 5.4 | A-02 Admin Dashboard | Admin Shell, Metric Cards | Overview and navigation |

### Phase 6: Admin Management Screens

| Priority | Screen | Depends on | Notes |
| --- | --- | --- | --- |
| 6.1 | A-03 Admin Properties List | Admin Shell, Admin Table, Status Badge | Property management |
| 6.2 | A-04 Admin Property Edit | Admin Shell, Form components | Property create/edit |
| 6.3 | A-08 Admin Leads List | Admin Shell, Admin Table, Status Badge | Lead management |
| 6.4 | A-09 Admin Lead Detail | Admin Shell, Status Badge | Lead detail and status |
| 6.5 | A-05 Admin Categories | Admin Shell, Admin Table | Category management |
| 6.6 | A-06 Admin Fields | Admin Shell, Admin Table | Field management |
| 6.7 | A-07 Admin Locations | Admin Shell, Admin Table | Location management |
| 6.8 | A-10 Admin Services | Admin Shell, Admin Table | Service management |

---

## 9. Missing Stitch Designs - Required Actions

### 9.1 Missing customer-facing designs (4 screens)

| Screen | Action Required | Priority |
| --- | --- | --- |
| C-05 Request a Viewing | Create Stitch screen or define wireframe | High |
| C-09 Contact | Create Stitch screen or define wireframe | Medium |
| C-10 Success | Create Stitch screen or define wireframe | Medium |
| C-11 404 | Create Stitch screen or define wireframe | Low |

### 9.2 Missing Admin designs (11 screens)

| Screen | Action Required | Priority |
| --- | --- | --- |
| A-01 Admin Login | Create Stitch screen or define wireframe | High |
| A-02 Admin Dashboard | Create Stitch screen or define wireframe | High |
| A-03 Admin Properties List | Create Stitch screen or define wireframe | High |
| A-04 Admin Property Edit | Create Stitch screen or define wireframe | High |
| A-05 Admin Categories | Create Stitch screen or define wireframe | Medium |
| A-06 Admin Fields | Create Stitch screen or define wireframe | Medium |
| A-07 Admin Locations | Create Stitch screen or define wireframe | Medium |
| A-08 Admin Leads List | Create Stitch screen or define wireframe | High |
| A-09 Admin Lead Detail | Create Stitch screen or define wireframe | High |
| A-10 Admin Services | Create Stitch screen or define wireframe | Medium |
| A-11 Admin Unauthorized | Create Stitch screen or define wireframe | Low |

### 9.3 Recommended approach for missing designs

For screens without Stitch designs:

1. **Customer screens (C-05, C-09, C-10, C-11):** Create Stitch screens using the existing MKAAN Design System tokens and patterns. These are simpler screens that follow established patterns.

2. **Admin screens:** Create a unified Admin design system first (dark nav shell, table patterns, form patterns, metric cards), then apply it to each Admin screen. The Admin visual direction already exists in the Stitch project's design system (`18b7222c...`).

3. **Fallback:** If Stitch generation is not immediate, define wireframes using the Design System document as the source of truth and implement directly.

---

## 10. Dependencies and Constraints

### 10.1 Implementation dependencies

- Foundation (Phase 1) must complete before any screen implementation
- Customer screens (Phase 2-4) can proceed in parallel with Admin shell (Phase 5)
- Admin management screens (Phase 6) depend on Admin shell (Phase 5)
- All screens depend on the Design System tokens in `globals.css`
- All screens depend on shadcn components already installed

### 10.2 Data dependencies

- UI implementation uses mock/static data where real operations are not yet available
- Property data, category definitions, field definitions, service definitions, and location data will use fixtures
- Form submissions will use mock handlers until Server Actions/API routes are implemented
- The UI must consume contracts and preserve the eventual server/client boundary

### 10.3 Deferred decisions that affect UI

| Deferred Decision | UI Impact |
| --- | --- |
| DEFER-001 Target geography | Location filter labels, map references |
| DEFER-004 Service fields | Dynamic form content for service request |
| DEFER-005 Representative service | Which service demonstrates dynamic form |
| DEFER-008 Field types | Dynamic field rendering components |
| DEFER-009 Admin auth config | Admin login/authorization UI |
| DEFER-010 Publication states | Admin property status badges and workflows |

### 10.4 Business rules affecting UI

| Rule | UI Impact |
| --- | --- |
| BR-001 No customer accounts | No login/register UI on public pages |
| BR-003 Listing does not publish | Success message must say "received" not "published" |
| BR-006 Viewing is not booking | Success message must say "request" not "confirmed" |
| BR-008 Only published properties public | 404 for unpublished properties |
| BR-009 Arabic-only RTL | All UI text is Arabic, dir=rtl |
| BR-010 Latin URL slugs | Property URLs use Latin/English slugs |
| BR-012 Leads not deleted | Admin UI prefers deactivation over deletion |

---

## 11. Acceptance Criteria

### 11.1 Per-screen acceptance

Every screen must:

1. Match the approved Design System tokens and patterns
2. Support all required UI states (loading, empty, error, validation, success where applicable)
3. Work across all five responsive breakpoints (mobile, tablet, laptop, desktop, large)
4. Maintain RTL layout and Arabic content
5. Use semantic HTML and accessible markup
6. Support keyboard navigation and visible focus states
7. Not expose internal details in error or success states
8. Use mock data while preserving the server/client boundary
9. Not contain business logic in UI components
10. Not access Prisma directly

### 11.2 Component acceptance

Every shared component must:

1. Follow the Design System token specification
2. Support all required states
3. Be responsive across breakpoints
4. Support RTL layout
5. Be accessible (semantic HTML, keyboard, focus, ARIA)
6. Be reusable across multiple screens
7. Not contain business logic

### 11.3 Overall acceptance

The UI implementation is complete when:

1. All 22 screens are implemented with all required states
2. All shared components are implemented and reusable
3. All screens work across all responsive breakpoints
4. RTL layout is consistent throughout
5. All screens use Design System tokens consistently
6. Mock data is used while preserving eventual server/client boundaries
7. No business logic exists in UI components
8. All screens pass accessibility checks
9. All screens pass type checking and linting

---

## 12. Traceability

| Requirement | Screens | Components |
| --- | --- | --- |
| OBJ-001 Discover properties | C-01, C-02 | Property Card, Property Grid, Search Bar |
| OBJ-002 Search and filter | C-02 | Filter Panel, Sort Control, Load More |
| OBJ-003 View property details | C-03 | Property Gallery, Property Info, Similar Properties |
| OBJ-004 Request a property | C-04 | Form components |
| OBJ-005 Request a viewing | C-05 | Form components, Property Card |
| OBJ-006 List a property | C-06 | Form components |
| OBJ-007 Request services | C-07, C-08 | Service Card, Service Form |
| OBJ-008 Admin management | A-01 to A-11 | Admin Shell, Admin Table, Admin Form |
| AUTH-001-005 Access model | C-01 to C-11, A-01, A-11 | Unauthorized State |
| SEARCH-001-012 Search behavior | C-02 | Filter Panel, Sort Control |
| DETAIL-001-009 Details behavior | C-03 | Property Gallery, Property Info |
| FLOW-001-015 Request flows | C-04 to C-09 | Form components |
| SERVICE-001-011 Service behavior | C-07, C-08 | Service Card, Service Form |
| LEAD-001-008 Lead lifecycle | A-08, A-09 | Admin Table, Status Badge |
| ADMIN-001-010 Admin management | A-01 to A-11 | Admin Shell, Admin components |
| RESP-001-006 Responsive | All screens | All components |
| A11Y-001-008 Accessibility | All screens | All components |
