# MKAAN Master Implementation Plan

**Project:** MKAAN  
**Document status:** Master implementation roadmap  
**Language:** Arabic-only MVP  
**Direction:** Right-to-left (RTL)  
**Last updated:** 2026-08-21

This document is the implementation roadmap for MKAAN. It explains the order in which the approved product and software design will be implemented. It is not a replacement for the Requirements, SRS, or Software Design documents and does not define detailed phase plans.

## 1. Authority and Planning Rules

### 1.1 Authoritative documents

Implementation must follow:

1. `docs/requirements/MKAAN-REQUIREMENTS.md` for product requirements, business rules, exclusions, priorities, and deferred decisions.
2. `docs/requirements/MKAAN-SRS.md` for observable behavior, validation behavior, edge cases, and critical scenarios.
3. `docs/design/MKAAN-SOFTWARE-DESIGN.md` for technical architecture, module boundaries, domain concepts, data-access boundaries, operations, security, and consistency rules.

This roadmap does not modify or override those documents.

### 1.2 Planning boundaries

- The project remains a Full-Stack Next.js 16 App Router modular monolith.
- There is no separate backend application or microservice system.
- Prisma is the only ORM/data-access boundary.
- PostgreSQL on Neon is the confirmed database direction.
- Clerk is the confirmed Admin authentication provider.
- Customers remain anonymous in the MVP.
- Business rules remain server-side and outside UI components.
- UI/UX Design and Design System decisions must precede the Master Foundation.
- The Master Foundation prepares the codebase and must not contain business logic.
- UI Implementation uses approved UI/UX and Design System decisions and initially uses mock/static data where necessary.
- Feature Logic & Backend Operations are implemented afterward, feature by feature, behind the Software Design boundaries.
- Deferred decisions must not be silently resolved.
- No customer accounts, customer dashboards, complex roles, booking engines, payments, chat, favorites, or unrequested integrations are introduced.

### 1.3 Existing design-source inspection

No existing UI/UX, Stitch, image, Figma, or separate Design System source files were found in the project. UI/UX Design and Design System are therefore explicit greenfield approval stages. If approved UI/UX or Stitch material is added later, it becomes the source material for those stages and must not be bypassed.

## 2. Implementation Stages

### Stage 1: UI/UX Design

**Objective:** Define the visual and interaction design for the public customer experience and Admin experience before codebase preparation begins.

**Scope:** Define the customer journey from public entry through discovery/search, listing, property details, CTA, request flows, services, contact, and success outcomes. Define Admin journeys for authentication, property management, categories, dynamic fields, locations, leads, services, publication, unpublishing, and archiving. Define loading, empty, validation, unauthorized, not-found, unavailable, success, and failure states. Define mobile, tablet, laptop, desktop, large-screen, accessibility, Arabic-content, and RTL interaction requirements.

**Deliverables:** Approved UI/UX flow inventory, wireframes or equivalent design references, interaction specifications, screen/state inventory, form-flow definitions, CTA placement decisions, and responsive/accessibility behavior decisions.

**Dependencies:** Requirements, SRS, and Software Design.

**Definition of Done:** The public and Admin journeys are documented and approved, all required MVP flows have a visual/interaction destination, and no deferred business rule or form field has been invented.

**Explicitly out of scope:** Design tokens, reusable component implementation, production code, Prisma, APIs, Clerk implementation, business logic, exact deferred service fields, and exact deferred publication states.

### Stage 2: Design System

**Objective:** Define the reusable visual language and UI foundations used by all later UI implementation.

**Scope:** Define colors, typography, spacing, sizing, radius, shadows, breakpoints, layout rules, RTL rules, design tokens, component patterns, component variants, loading/empty/error/success/disabled/focus states, form conventions, accessibility conventions, responsive conventions, and visual rules for public/Admin surfaces.

**Deliverables:** Design token specification, typography scale, color roles, spacing and sizing rules, radius/shadow definitions, breakpoint rules, RTL conventions, component-pattern inventory, state conventions, accessibility conventions, and Design System usage guidance.

**Dependencies:** Approved UI/UX Design. Existing UI/UX or Stitch material, if later supplied, must be evaluated here as source material.

**Definition of Done:** The reusable visual language is documented well enough for UI implementation to use consistent tokens, patterns, states, RTL behavior, and accessibility conventions without inventing visual rules.

**Explicitly out of scope:** Feature business behavior, data access, database design, authentication, server operations, production deployment, and implementation of application features.

### Stage 3: Master Foundation

**Objective:** Prepare the actual codebase for implementation after UI/UX and Design System decisions are approved.

**Scope:** Establish the Next.js 16 App Router application baseline, React 19, TypeScript, pnpm, ESLint, Prettier, Tailwind CSS, shadcn/ui, Lucide React, React Hook Form, Zod, Arabic/RTL baseline, module boundaries, presentation/server boundaries, application-operation boundaries, domain/repository/integration boundaries, shared result/error contracts, environment-variable contracts, and development conventions.

**Deliverables:** Implementable repository foundation, approved module structure, shared contracts, server/client boundary conventions, development scripts and quality conventions, and integration-port placeholders where required by the Software Design.

**Dependencies:** Completed UI/UX Design and Design System stages.

**Definition of Done:** The codebase can support the Software Design architecture, the presentation layer cannot access Prisma directly, shared contracts have clear ownership, and the foundation contains no feature business logic.

The implemented source organization for this foundation is hybrid feature-based: `src/app/` contains routes and route-level composition, `src/features/` contains feature-owned code, `src/components/` contains genuinely shared UI, and `src/lib/` contains shared infrastructure and utilities. Feature directories are created only when they contain owned code.

**Explicitly out of scope:** Property behavior, lead behavior, service behavior, publication rules, Prisma schema, migrations, real database operations, Clerk flows, customer authentication, production pages, APIs, and provider implementations.

### Stage 4: UI Implementation

**Objective:** Implement the approved UI/UX and Design System in the presentation layer before connecting real business operations.

**Scope:** Implement the public and Admin visual structures, layouts, navigation patterns, property cards, property listing presentation, search/filter presentation, property details presentation, gallery presentation, CTA presentation, customer forms, service-form presentation, Admin management surfaces, responsive layouts, RTL behavior, and all approved loading/empty/validation/error/success/unauthorized states.

Use mock/static data or local fixtures where real application operations are not yet available. The UI must consume contracts and preserve the eventual server/client boundary rather than embedding temporary business rules.

**Deliverables:** Presentation components and route-level experiences matching approved UI/UX and Design System decisions, mock-data adapters where needed, accessible form states, and responsive/RTL behavior.

**Dependencies:** Master Foundation, UI/UX Design, and Design System.

**Definition of Done:** The approved public and Admin journeys are visibly implemented with consistent tokens and component patterns, work with mock/static data, support required states and responsive behavior, and contain no authoritative business logic.

**Explicitly out of scope:** Prisma access, real database data, server-side business rules, lead creation, publication, dynamic validation authority, Clerk authorization, image storage, analytics providers, rate limiting, anti-spam, and production infrastructure.

### Stage 5: Database & Persistence

**Objective:** Implement the approved conceptual persistence model and repository boundary.

**Scope:** Implement Prisma and PostgreSQL on Neon persistence for approved concepts: properties, categories, locations, dynamic fields, category-field applicability, property dynamic values, services, service fields, leads, media references, workflow/publication context, and future-optional lead identity reference. Implement repository contracts, mappings, referential integrity, unique constraints, important indexes, public visibility predicates, and transaction boundaries.

**Deliverables:** Prisma schema, migrations, repository/data-access services, database mapping contracts, safe query construction, public-read policies, and persistence transaction support.

**Dependencies:** Master Foundation and the Software Design domain/database boundaries. Exact deferred fields, type vocabulary, and final state vocabulary must be approved before they are encoded in persistence.

**Definition of Done:** Approved application operations can persist and retrieve data through feature-owned repositories, public queries enforce approved/published visibility, referential integrity is protected, and no presentation or domain module accesses Prisma directly.

**Explicitly out of scope:** Customer accounts, customer identity records, image binaries stored in PostgreSQL, provider-specific image storage, analytics persistence decisions, UI feature behavior, and invented schema fields or statuses.

### Stage 6: Admin Authentication & Authorization

**Objective:** Protect Admin access and operations through Clerk and server-side MKAAN authorization.

**Scope:** Clerk integration, server-side authentication verification, authenticated Admin context, protected-operation authorization checks, safe authentication/authorization failures, and enforcement before Admin dashboard access and every Admin mutation.

**Deliverables:** Clerk adapter, server-side identity verification, Admin authorization boundary, protected operation guards, and safe unauthorized outcomes.

**Dependencies:** Master Foundation. Persistence may be used for protected feature operations, but Admin authentication must not depend on customer identity.

**Definition of Done:** Unauthenticated and unauthorized requests cannot access or mutate Admin functionality, authorization is enforced server-side, and UI visibility is not used as an authorization mechanism.

**Explicitly out of scope:** Customer authentication, customer registration, customer profiles, customer dashboards, customer roles, multi-role authorization, and an unapproved Admin allowlist/claim/membership implementation.

**Implementation risk:** The detailed Admin authorization model remains `DEFER-009`. Clerk is confirmed, but final Admin eligibility configuration must be approved before production authorization is considered complete.

### Stage 7: Feature Logic & Backend Operations

**Objective:** Implement the business behavior defined by the Software Design, feature by feature, behind the server-side application boundary.

**Scope:** Implement application operations, domain policies, validation, repositories, and feature logic for Property Catalog, Categories and Dynamic Fields, Property Search, Property Details and CTAs, Customer Requests and Leads, Services, Listing Workflow and Publication, Media contracts, SEO operations, and Analytics event contracts.

The feature order must respect these dependencies: Property Catalog and locations; Categories and Dynamic Fields; Property Search and category-aware filters; Property Details and secondary Similar Properties; Customer Requests and Leads; Services and Service Forms; Listing Workflow and Publication; Media provider integration points; SEO; Analytics event publishing.

**Deliverables:** Server-side operations and domain rules for property management, category-aware dynamic values, search/filter validation, public details, CTA destinations, anonymous lead creation, service forms, lead statuses, workflow milestones, publication prerequisites, public visibility, SEO projections, and analytics event contracts.

**Dependencies:** Master Foundation, Database & Persistence, Admin Authentication & Authorization, approved UI operation contracts, and any deferred decisions required by the specific feature.

**Definition of Done:** Each approved feature operates through application and domain boundaries, validates input server-side, respects authorization and public visibility, preserves transaction invariants, maps safe outcomes, and integrates with the UI without moving business logic into components.

**Explicitly out of scope:** Customer accounts, booking engines, automatic viewing confirmation, automatic listing publication, payments, chat, favorites, notifications, microservices, invented service fields, invented public form fields, invented dynamic-field types, and unapproved workflow state names.

### Stage 8: Integration & Hardening

**Objective:** Connect approved external boundaries and harden cross-cutting security, reliability, and performance behavior.

**Scope:** Approved image-storage adapter, approved analytics adapter, rate limiting, anti-spam, safe error mapping, error logging interfaces, monitoring interfaces, secure file handling, environment secrets, secure cookies, HTTPS assumptions, Prisma safety review, query performance, caching boundaries, secondary-failure isolation, concurrency handling, and operational diagnostics.

**Deliverables:** Provider adapters, hardened integration contracts, security review results, safe public/Admin errors, rate-limit and anti-spam integration, media failure isolation, analytics failure isolation, similar-property failure isolation, and performance hardening.

**Dependencies:** Core Feature Logic & Backend Operations. Concrete provider work requires explicit provider decisions.

**Definition of Done:** External failures do not break core customer/Admin journeys, public and Admin boundaries are hardened, untrusted input cannot bypass domain rules, and internal errors are not leaked.

**Explicitly out of scope:** Selecting deferred providers without approval, customer identity, unrequested integrations, business features outside the MVP, and production deployment.

### Stage 9: Testing

**Objective:** Validate critical business rules and critical public/Admin flows.

**Scope:** Unit coverage for dynamic-field validation, filters, business rules, price validation, and lead status transitions. Integration coverage for customer forms, server operations, database operations, and lead creation. End-to-end coverage for search/filter/details/viewing, property requests, listing requests, services, contact, Admin login/property publication, unpublishing/archive, and lead status changes.

**Deliverables:** Approved testing strategy, test suites at the appropriate unit/integration/end-to-end boundaries, critical-flow verification, and defect reports.

**Dependencies:** Implemented feature operations and an explicit testing-stack decision. Test planning can begin earlier, but test implementation waits for the testing framework decision.

**Definition of Done:** Critical SRS scenarios pass, invalid and unauthorized cases are covered, publication and visibility invariants are verified, and testing does not introduce unsupported behavior.

**Explicitly out of scope:** Arbitrary 100% coverage, selecting or installing a testing framework without approval, performance-infrastructure testing before infrastructure exists, and tests for excluded features.

### Stage 10: Production Readiness & Deployment

**Objective:** Release the approved MVP into controlled production operation.

**Scope:** Hosting/deployment provider, HTTPS, secure cookies, environment secrets, production migrations, monitoring, logging, database backups, recovery strategy, safe migration procedure, performance verification, accessibility verification, SEO verification, abuse controls, release process, rollback/recovery runbooks, and final operational acceptance.

**Deliverables:** Approved hosting/deployment configuration, production migration process, backup and recovery process, monitoring/logging setup, release checklist, operational runbooks, security sign-off, performance sign-off, and production release approval.

**Dependencies:** Completion of all required earlier stages and explicit resolution of deferred production/provider decisions.

**Definition of Done:** The MVP meets functional, security, reliability, performance, accessibility, responsive, SEO, data-protection, and operational requirements; the release can be deployed and recovered safely; and all deferred production decisions have explicit approvals.

**Explicitly out of scope:** New product features, customer accounts, new roles, new integrations, unapproved providers, or changes to Requirements, SRS, or Software Design.

## 3. Overall Dependency Order

The primary dependency order is:

```text
UI/UX Design
  -> Design System
  -> Master Foundation
  -> UI Implementation using mock/static data
  -> Database & Persistence
  -> Admin Authentication & Authorization
  -> Feature Logic & Backend Operations
  -> Integration & Hardening
  -> Testing
  -> Production Readiness & Deployment
```

The UI Implementation stage may begin after the Master Foundation and does not need to wait for the database or backend operations because it initially uses mock/static data. Database and authentication work may proceed in parallel after the Master Foundation, subject to their own decision gates.

Feature Logic must be implemented only after the required persistence and authorization boundaries are available. Within Feature Logic, the practical order is:

```text
Property Catalog and Locations
  -> Categories and Dynamic Fields
  -> Property Search and Filters
  -> Property Details and CTAs
  -> Customer Requests and Leads
  -> Services and Service Forms
  -> Listing Workflow and Publication
  -> Media Provider Integration
  -> SEO
  -> Analytics Event Delivery
```

The final CTA integration depends on the customer lead operations. The final publication implementation depends on Catalog, Leads, Media, Admin authorization, and approved workflow states. Final SEO indexability depends on publication behavior.

## 4. Parallel Work

The following work can run in parallel once prerequisites are complete:

- UI/UX Design exploration and requirements traceability review.
- Design System documentation after the UI/UX direction is stable.
- UI implementation and Database & Persistence after the Master Foundation.
- Clerk boundary work and Database & Persistence after the Master Foundation.
- Media-port planning, Analytics event-contract planning, and SEO contract planning before provider implementation.
- Accessibility and responsive reviews during UI Implementation.
- Testing strategy preparation while feature implementation proceeds, without selecting a testing framework prematurely.
- Documentation, traceability, risk tracking, and deferred-decision tracking throughout implementation.

## 5. Sequential Work

The following work must remain sequential:

- UI/UX Design before the Design System.
- UI/UX Design and Design System before the Master Foundation.
- Master Foundation before UI Implementation.
- Master Foundation before database and Clerk implementation.
- Persistence contracts before repository-backed feature operations.
- Dynamic-field definitions before category-aware property validation and dynamic filters.
- Catalog and Dynamic Fields before Search.
- Catalog, Media references, and Search before complete Property Details.
- Leads before final CTA submission wiring.
- Catalog, Leads, Media, Admin authorization, and approved workflow decisions before Publication.
- Publication before final SEO indexability and sitemap behavior.
- Feature operations before full integration hardening.
- Implemented operations and testing-stack approval before test execution.
- All production-critical features and operational approvals before deployment.

## 6. Major Milestones

### Milestone 1: Design Baseline Approved

UI/UX Design and Design System decisions are documented and approved without resolving deferred business rules.

### Milestone 2: Foundation Ready

The Master Foundation supports the approved Next.js modular-monolith boundaries and contains no business logic.

### Milestone 3: UI Prototype Ready

Public and Admin journeys are implemented against mock/static data using the approved UI/UX and Design System.

### Milestone 4: Persistence and Admin Control Plane Ready

Prisma repositories, PostgreSQL/Neon persistence, Clerk verification, and server-side Admin authorization are available.

### Milestone 5: Public Discovery Ready

Catalog, categories, dynamic fields, search, category-aware filters, sorting, incremental loading, empty states, and public visibility work.

### Milestone 6: Public Property Journey Ready

Property details, media references, gallery/main-image behavior, CTAs, and similar-property isolation work.

### Milestone 7: Lead Capture Ready

Anonymous property, viewing, listing, and contact requests create the correct leads with safe validation and outcomes.

### Milestone 8: Services and Publication Ready

Dynamic service forms, service leads, listing workflow, Admin approval, publication, unpublication, archive, and main-image prerequisites work.

### Milestone 9: MVP Release Candidate

SEO, analytics boundaries, integrations, security hardening, performance work, and critical testing are complete.

### Milestone 10: Production Approved

Hosting, monitoring, logging, backups, recovery, migrations, deployment, and release acceptance are complete.

## 7. Deferred Decisions Affecting Implementation

The roadmap must stop or retain an adapter boundary rather than silently deciding any of the following:

- `DEFER-001`: Specific Egyptian governorate or area.
- `DEFER-003` and `IMAGE-005`: Image storage architecture and provider.
- `DEFER-004`: Exact service-specific fields.
- `DEFER-005`: Representative service example.
- `DEFER-006`: Exact structured-data types.
- `DEFER-007` and `ANALYTICS-012`: Analytics provider and Facebook/TikTok Pixel usage.
- `DEFER-008`: Exact validation constraints for fields, categories, filters, prices, forms, and uploads.
- `DEFER-009`: Detailed Admin authorization configuration and eligibility model. Clerk itself is confirmed.
- `DEFER-010`: Exact publication status names, transition permissions, operational details, rework behavior, and evidence representation.
- `DEFER-011`: Meaningful content rules for indexable location/category pages.
- `DEFER-012`: Logging, monitoring, backups, recovery, and migration tooling.
- Deferred hosting/deployment provider, cache provider, rate-limit provider, anti-spam provider, and testing stack.

The following remain confirmed and must not be treated as deferred: Full-Stack Next.js, App Router, modular monolith, TypeScript, React 19, Tailwind CSS, shadcn/ui, Lucide React, React Hook Form, Zod, Prisma, PostgreSQL, Neon, Clerk for Admin authentication, anonymous customers, Arabic-only MVP, and RTL customer experience.

## 8. Implementation Risks

- UI/UX and Design System source material is currently absent, so those stages are real approval gates rather than extraction tasks.
- Mock/static UI data can diverge from later application contracts if operation boundaries are not agreed early.
- Deferred dynamic-field types, service fields, and public-form fields can block both UI completion and server validation.
- Publication cannot safely be implemented with invented status names or transition permissions.
- Public visibility must be applied consistently to listing, detail, similar-property, SEO, and sitemap queries.
- Admin authorization must never rely on hidden controls or client-side checks.
- Provider-specific code can leak into domain modules unless ports are preserved.
- Dynamic filtering can become inefficient without validated normalized values and query-critical indexes.
- Media, similar-property, and analytics failures must remain isolated from primary journeys.
- Production operations remain incomplete until hosting, monitoring, backups, recovery, and migration tooling are selected.
- The team may accidentally introduce excluded features while attempting to improve the MVP; scope review is required at each milestone.

## 9. Requirement Coverage by Stage

| Requirement area | Roadmap stage |
| --- | --- |
| `PROJ-*`, Arabic/RTL, overall experience | UI/UX Design, Design System, Master Foundation |
| `OBJ-001` to `OBJ-003`, discovery/search/details | UI Implementation, Feature Logic & Backend Operations |
| `OBJ-004` to `OBJ-007`, customer request and service flows | UI Implementation, Feature Logic & Backend Operations |
| `OBJ-008`, Admin management | UI Implementation, Admin Authentication & Authorization, Feature Logic & Backend Operations |
| `AUTH-*`, anonymous customers and protected Admin | Admin Authentication & Authorization, Integration & Hardening |
| `PROP-*`, property catalog and details | UI/UX Design, UI Implementation, Database & Persistence, Feature Logic |
| `FIELD-*`, dynamic fields | Design System for states, Database & Persistence, Feature Logic, Testing |
| `SEARCH-*`, search/filter/incremental loading | UI/UX Design, UI Implementation, Feature Logic, Testing |
| `DETAIL-*`, property details and CTAs | UI/UX Design, UI Implementation, Feature Logic, Media, Testing |
| `FLOW-*`, customer forms and listing flow | UI/UX Design, UI Implementation, Feature Logic, Integration & Hardening, Testing |
| `PREP-*`, preparation workflow | UI/UX Design, Feature Logic & Backend Operations |
| `SERVICE-*`, dynamic services | UI/UX Design, UI Implementation, Feature Logic, Testing |
| `LEAD-*`, lead creation and lifecycle | Database & Persistence, Feature Logic, Admin Authorization, Testing |
| `ADMIN-*`, Admin resources and publication | UI Implementation, Admin Authentication & Authorization, Feature Logic, Testing |
| `PUB-*`, publication and visibility | Database & Persistence, Feature Logic, Integration & Hardening, Testing |
| `IMAGE-*`, media and main image | UI Implementation, Database & Persistence, Feature Logic, Integration & Hardening |
| `SEO-*`, metadata, sitemap, robots, 404 | UI/UX Design, UI Implementation, Feature Logic, Integration & Hardening, Testing |
| `ANALYTICS-*`, event tracking and privacy | Feature Logic, Integration & Hardening, Testing |
| `SEC-*`, validation and data protection | Master Foundation, Feature Logic, Integration & Hardening, Testing, Production Readiness |
| `PERF-*`, performance and incremental loading | Design System, UI Implementation, Database & Persistence, Integration & Hardening, Production Readiness |
| `A11Y-*`, accessibility | UI/UX Design, Design System, UI Implementation, Testing, Production Readiness |
| `RESP-*`, responsive behavior | UI/UX Design, Design System, UI Implementation, Testing, Production Readiness |
| `REL-*`, reliability and operations | Integration & Hardening, Testing, Production Readiness |
| `TEST-*`, critical testing scenarios | Testing |
| `MAINT-*`, `SCALE-*`, maintainability and growth | Master Foundation, Database & Persistence, Feature Logic, Integration & Hardening |

## 10. Final Production-Readiness Criteria

The implementation is production-ready only when:

- UI/UX Design and Design System are approved and implemented consistently.
- The Master Foundation contains no business logic and preserves all Software Design boundaries.
- UI Implementation uses approved visual and interaction decisions and no longer depends on mock data for required production flows.
- Public discovery, search, category/transaction/location/price/dynamic filters, sorting, incremental loading, empty states, and loading states work.
- Property details include general information, category-specific information, price, location, description, gallery, main image, CTAs, and similar properties with required ordering and failure isolation.
- Anonymous property, viewing, listing, service, and contact flows work and create the correct lead types after server validation.
- Viewing requests are not presented as bookings or confirmed appointments.
- Service forms are selected and validated according to active service definitions.
- Listing submission never publishes automatically.
- The required review, inspection, preparation, professional photography, listing preparation, Admin approval, and publication workflow is enforced.
- Only approved and published properties are public and indexable.
- Unpublish and archive remove public visibility without destructive deletion where appropriate.
- Every published property has a valid main image and multiple-image galleries are supported.
- Clerk authentication and server-side Admin authorization protect every Admin operation.
- Prisma is the only data-access boundary and PostgreSQL on Neon persistence is safe.
- Public forms have server-side validation, rate limiting, anti-spam, safe errors, and secure input handling.
- Media, analytics, similar properties, and individual image failures do not unnecessarily break primary journeys.
- SEO metadata, canonical URLs, Open Graph data, social-sharing images, sitemap, robots behavior, and 404 behavior are correct.
- Arabic-only content, RTL behavior, accessibility, responsive behavior, mobile performance, optimized images, lazy loading, server rendering, and minimized client JavaScript are verified.
- Critical unit, integration, and end-to-end scenarios pass after the testing stack is approved.
- Hosting, HTTPS, secrets, secure cookies, monitoring, error logging, backups, recovery, safe migrations, and deployment procedures are approved and operational.
- All deferred decisions affecting the release have explicit approvals or remain behind replaceable boundaries that are acceptable for the release.
- No unsupported feature, requirement, business rule, or provider decision has been introduced.

## 11. Roadmap Completion Boundary

This document is the master implementation roadmap only. It does not begin implementation, define detailed phase plans, create code, modify Requirements/SRS/Software Design documents, select deferred providers, or authorize work outside the approved MKAAN MVP.
