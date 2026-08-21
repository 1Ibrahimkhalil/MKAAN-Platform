# MKAAN Software Architecture

**Project:** MKAAN  
**Document status:** MVP architecture design  
**Authoritative requirements:** `docs/requirements/MKAAN-REQUIREMENTS.md`  
**Behavior specification:** `docs/requirements/MKAAN-SRS.md`  
**Last updated:** 2026-08-17

## 1. Purpose and Scope

This document defines the technical and structural architecture for implementing the confirmed MKAAN MVP.

It defines:

- The application shape and major boundaries.
- The responsibilities of the principal feature modules.
- Public and Admin access boundaries.
- Server-side business-operation boundaries.
- The Prisma data-access boundary.
- Integration boundaries for authentication, media storage, analytics, and operations.
- Cross-cutting security, validation, performance, reliability, and testing responsibilities.

It does not define:

- Application pages or production UI components.
- Database schemas or migrations.
- Server Actions or API routes.
- A database provider.
- An authentication provider.
- An image-storage provider.
- Infrastructure, deployment, or hosting.
- Exact service-specific fields.
- Exact publication status names or transition permissions.

## 2. Architectural Authority

### 2.1 Source Documents

The architecture is derived from:

1. `docs/requirements/MKAAN-REQUIREMENTS.md`, which is authoritative for confirmed requirements, business rules, constraints, priorities, exclusions, and deferred decisions.
2. `docs/requirements/MKAAN-SRS.md`, which describes observable system behavior and test scenarios derived from the Requirements Document.

The architecture must not introduce a capability that is absent from those documents.

### 2.2 Architectural Direction

The following decisions are confirmed architectural constraints for this design phase:

- MKAAN is a Full-Stack Next.js application.
- There is no separate backend application.
- Public and Admin experiences are part of the same Next.js application.
- The architecture is modular.
- Prisma is the data-access and ORM layer.
- The MVP is not split into microservices.
- Customers do not authenticate.
- Admin users authenticate and require server-side authorization.

The exact architecture was previously deferred as `DEFER-002`. This document resolves that decision for the architecture phase as a modular monolith within one Next.js application. Other deferred decisions remain deferred unless explicitly resolved in this document's scope.

## 3. Architecture Goals and Principles

### 3.1 Goals

The architecture must support:

- Public property discovery, search, filtering, and details.
- Category-aware property fields and filters.
- Customer request and lead flows without customer accounts.
- MKAAN-controlled listing review and preparation.
- Admin approval before publication.
- Protected Admin management of the confirmed resources.
- Safe server-side validation and mutation handling.
- Mobile performance and incremental property loading.
- Failure isolation for analytics, images, and similar-property results.
- Growth in properties, leads, categories, dynamic fields, locations, and services without enterprise-level complexity.

### 3.2 Principles

1. **One application boundary:** Public and Admin behavior are implemented within the same Next.js application boundary.
2. **Server authority:** Business rules, validation, publication checks, and Admin authorization are enforced on the server.
3. **Feature ownership:** Each business capability owns its application behavior, domain rules, and data-access needs through explicit module boundaries.
4. **Prisma isolation:** Feature modules depend on application data-access interfaces, not on direct scattered Prisma usage.
5. **Public visibility by policy:** Public property queries return only approved and published properties.
6. **Deferred decisions remain ports:** Unresolved providers and operational details are represented as replaceable boundaries rather than assumed implementations.
7. **Primary-flow resilience:** Secondary failures must not unnecessarily break the primary customer or Admin journey.
8. **MVP simplicity:** The architecture remains a modular monolith and does not introduce microservices, customer identity, real-time chat, complex booking, or other excluded scope.

**Traceability:** `PROJ-005`, `PROJ-006`, `OBJ-001` to `OBJ-008`, `MAINT-001` to `MAINT-007`, `SCALE-001`, `SCALE-002`, SRS sections 1-3 and 22.

## 4. High-Level System Shape

MKAAN is a modular monolith with the following logical layers inside one Next.js application:

```text
Public Experience       Admin Experience
        |                       |
        +----------+------------+
                   |
       Server-Side Application Boundary
                   |
       Feature Application and Domain Modules
                   |
       Data Access and Integration Ports
             |                 |
       Prisma Data Layer   External Adapters
```

### 4.1 Public Experience

The public side provides unauthenticated access to:

- Published property discovery and details.
- Search, sorting, and category-aware filters.
- Property, viewing, listing, service, and contact request flows.
- Public SEO behavior for eligible published content.

The public experience does not expose Admin operations, unpublished property data, or customer account functionality.

### 4.2 Admin Experience

The Admin side provides authenticated and server-authorized access to:

- Properties.
- Categories.
- Dynamic fields.
- Locations.
- Leads.
- Services.
- Publishing, unpublishing, and archiving where appropriate.

The Admin experience is not a separate application. It uses the same application and server-side domain boundaries as the public experience.

### 4.3 Server-Side Application Boundary

All business operations enter the server-side application boundary before they can:

- Create a lead.
- Change a lead status.
- Create or update property data.
- Change property publication state.
- Manage categories, locations, dynamic fields, or services.
- Accept property images.

The concrete Next.js request mechanism is intentionally not prescribed by this document. The required property is that the operation is executed through a server-side boundary with validation and authorization where applicable.

## 5. Logical Layers

### 5.1 Presentation Layer

Responsibilities:

- Render the public and Admin experiences.
- Collect customer and Admin input.
- Present loading, empty, validation, success, unauthorized, and failure states.
- Present only controls appropriate to the current actor and context.
- Support Arabic-only RTL behavior, accessibility, and responsive behavior.

Restrictions:

- Must not be the authoritative validation layer.
- Must not be the authorization layer.
- Must not access Prisma directly.
- Must not determine whether a property is allowed to be public.

### 5.2 Application Layer

Responsibilities:

- Coordinate use cases and business operations.
- Validate actor context before protected operations.
- Invoke domain policies.
- Coordinate repositories and integration ports.
- Define success and failure outcomes for public and Admin operations.
- Keep lead creation, publication, and related business actions consistent.

Examples of application operations include:

- Search published properties.
- Read a published property detail.
- Submit a property request.
- Submit a viewing request.
- Submit a listing request.
- Submit a service request.
- Submit a contact request.
- Publish, unpublish, or archive a property.
- Change a lead status.

### 5.3 Domain Layer

Responsibilities:

- Express business rules independently of presentation.
- Validate category-aware property data.
- Validate dynamic fields and service form definitions.
- Enforce publication prerequisites.
- Enforce lead source and lifecycle rules.
- Define public visibility policy.
- Define non-destructive handling expectations for business records.

The domain layer must not depend on a particular UI, authentication provider, image provider, database provider, or infrastructure platform.

### 5.4 Data-Access Layer

Responsibilities:

- Provide persistence operations through Prisma.
- Encapsulate Prisma client usage and query construction.
- Expose feature-oriented repositories or data-access services to application modules.
- Apply public visibility predicates consistently.
- Prevent presentation code from directly querying persisted data.

Prisma is the selected data-access and ORM layer. The underlying database provider remains deferred.

### 5.5 Integration Layer

Integration ports isolate external or replaceable concerns:

- Admin authentication and session verification.
- Image storage and media retrieval.
- Analytics event delivery.
- Error logging and monitoring.
- Operational backup and recovery tooling.

The architecture defines the responsibility of each port but does not select providers for deferred integrations.

### 5.6 Shared Cross-Cutting Layer

Shared capabilities may include:

- Validation primitives.
- Error classification and safe public error mapping.
- Authorization checks.
- Rate limiting and anti-spam boundaries.
- Logging interfaces.
- Analytics event contracts.
- SEO metadata contracts.
- Image validation contracts.
- Result pagination or incremental-loading contracts.

Shared code must not become an unbounded miscellaneous layer. Business behavior remains owned by the relevant feature module.

## 6. Feature Module Boundaries

Each module owns its application behavior and domain rules. Modules may use shared contracts and approved data-access interfaces but must not bypass another module's business boundary.

### 6.1 Property Catalog Module

Responsibilities:

- Property general information.
- Sale and rental transaction type.
- Locations.
- Property categories.
- Property status and publication visibility.
- Featured-property representation.
- Similar-property retrieval coordination.
- Public property summaries and details.

Rules:

- Public reads are restricted to approved and published properties.
- Category-aware fields are resolved through the Dynamic Fields module.
- Similar-property failure is isolated from the primary property detail.

**Traceability:** `PROP-001` to `PROP-011`, `DETAIL-001` to `DETAIL-009`, `PUB-001` to `PUB-006`, SRS sections 4, 6, 7, and 15.

### 6.2 Categories and Dynamic Fields Module

Responsibilities:

- Category definitions.
- Dynamic field definitions.
- Category-to-field applicability.
- Field type, required state, filterability, displayability, options, display order, and active state.
- Server-side validation of submitted dynamic field IDs and values.

Rules:

- Unknown field IDs are rejected.
- Fields unrelated to the selected category are rejected.
- Inactive fields are not accepted as active submitted data.
- Invalid options and values are rejected.
- Field definitions are the authority for category-specific property display and filtering.

**Traceability:** `PROP-009`, `PROP-010`, `FIELD-001` to `FIELD-010`, `ADMIN-002`, `ADMIN-003`, SRS section 5.

### 6.3 Property Search Module

Responsibilities:

- Text search.
- Category filtering.
- Sale/rental filtering.
- Location filtering.
- Price filtering.
- Dynamic category-specific filtering.
- Sorting.
- Incremental result retrieval.
- Loading and empty-result behavior.

Rules:

- Search predicates operate only on public published properties.
- Active filters are validated against the selected category.
- Filters that become irrelevant after a category change are excluded from the active criteria.
- Invalid filters are rejected or excluded and are never silently treated as valid.

**Traceability:** `SEARCH-001` to `SEARCH-012`, `PROP-002` to `PROP-006`, `PUB-002`, `PUB-003`, `PERF-005`, `PERF-006`, SRS section 6.

### 6.4 Property Details and CTA Module

Responsibilities:

- Published property detail retrieval.
- General and category-specific property information.
- Price, location, description, and media references.
- Relevant CTAs.
- CTA ordering before Similar Properties.
- Similar-property retrieval as a secondary operation.

Rules:

- Missing, invalid, unpublished, or archived public property access does not expose property data.
- Similar-property failure does not fail the primary property detail operation.

**Traceability:** `DETAIL-001` to `DETAIL-009`, `PROP-007`, `PROP-008`, `PUB-002`, `PUB-003`, `REL-002`, SRS section 7.

### 6.5 Customer Requests and Leads Module

Responsibilities:

- Request a Property submission.
- Viewing request submission.
- List Your Property submission.
- Contact submission.
- Lead source assignment.
- Lead creation.
- Lead status management.
- Non-destructive lead handling.

Rules:

- Customer submissions do not require customer authentication.
- Invalid submissions do not create leads.
- Each valid source creates the corresponding lead type.
- Supported statuses are `New`, `Contacted`, `In Progress`, `Completed`, and `Cancelled`.
- Viewing requests are not bookings.

**Traceability:** `FLOW-001` to `FLOW-015`, `LEAD-001` to `LEAD-008`, `AUTH-001`, `AUTH-002`, `CUSTOMER-003`, `BR-001`, `BR-006`, `BR-012`, `BR-015`, SRS sections 3, 8, 9, 10, and 13.

### 6.6 Listing Workflow and Publication Module

Responsibilities:

- Listing request intake.
- MKAAN review boundary.
- Inspection stage boundary.
- Preparation decision boundary.
- Professional photography prerequisite.
- Listing preparation boundary.
- Admin approval boundary.
- Publication, unpublishing, and archiving commands.
- Public visibility policy.

Confirmed workflow:

```text
Customer Submission
    -> MKAAN Review
    -> Property Inspection
    -> Preparation if Needed
    -> Professional Photography
    -> Listing Preparation
    -> Admin Approval
    -> Publish
```

Rules:

- Listing submission creates a listing lead but does not publish a property.
- A property remains non-public through all pre-approval stages.
- Admin approval is required before publication.
- MKAAN controls and coordinates preparation when needed.
- MKAAN handles professional property photography before publication.
- Unpublishing or archiving removes public visibility and public indexability.

Exact state names and transition permissions remain outside this architecture document.

**Traceability:** `FLOW-008` to `FLOW-012`, `PREP-001` to `PREP-003`, `ADMIN-009`, `ADMIN-010`, `PUB-001` to `PUB-006`, `IMAGE-001`, `BR-003`, `BR-004`, `BR-011`, `BR-013`, `BR-014`, SRS sections 10, 11, and 15.

### 6.7 Services Module

Responsibilities:

- Unified services entry point.
- Supported service selection.
- Service Request flow.
- Service-specific dynamic form definition selection.
- Server-side service-form validation.
- Service lead creation.

Supported services:

1. Finishing.
2. Maintenance.
3. Prepare Your Property for Sale/Rent.

Exact service-specific fields remain deferred. The module must use a service definition boundary rather than hard-coding unapproved fields into the architecture.

**Traceability:** `SERVICE-001` to `SERVICE-011`, `LEAD-004`, `DEFER-004`, `DEFER-005`, SRS section 12.

### 6.8 Admin Management Module

Responsibilities:

- Protected Admin entry boundary.
- Admin property management.
- Category management.
- Dynamic field management.
- Location management.
- Lead management.
- Service management.
- Publication, unpublishing, and archiving operations.

Rules:

- Every Admin operation requires authentication and server-side authorization.
- Admin UI visibility is not an authorization mechanism.
- No additional roles are introduced.
- The module uses the same domain and data-access modules as public behavior.

**Traceability:** `ADMIN-001` to `ADMIN-010`, `AUTH-003` to `AUTH-005`, `SEC-001`, `SEC-002`, `SEC-006`, `DEFER-009`, SRS section 14.

### 6.9 Media Module

Responsibilities:

- Property image references.
- Main-image designation.
- Multiple-image gallery behavior.
- Server-side upload validation.
- Secure file-upload boundary.
- Image retrieval and failure isolation.

The module must not store Base64 image data in the database. It must depend on an image-storage port. The storage architecture and provider remain deferred.

**Traceability:** `IMAGE-001` to `IMAGE-005`, `FLOW-011`, `SEC-009`, `SEC-019`, `REL-004`, `DEFER-003`, SRS section 16.

### 6.10 SEO Module

Responsibilities:

- Property slug and unique-identifier presentation.
- Dynamic property title and meta description.
- Canonical URL behavior.
- Open Graph metadata.
- Social sharing image reference.
- Structured-data boundary.
- Sitemap eligibility.
- Robots.txt behavior.
- Proper 404 behavior.

Rules:

- Only approved and published properties are eligible for public property indexing behavior.
- Draft and unpublished properties are excluded from the public sitemap.
- Search/filter combinations do not create unlimited indexable pages.
- Location and category indexability is limited to meaningful content.

The exact structured-data types and meaningful-content rules remain deferred.

**Traceability:** `SEO-001` to `SEO-017`, `PUB-002`, `PUB-003`, `DEFER-001`, `DEFER-006`, `DEFER-011`, SRS section 19.

### 6.11 Analytics Module

Responsibilities:

- Emit the confirmed business and interaction events.
- Keep analytics payloads free of unnecessary phone numbers and full request content.
- Deliver analytics through a replaceable integration boundary.
- Isolate analytics failure from core business operations.

Events include property view, search, filter applied, request started, request submitted, CTA click, and the confirmed conversion events.

Facebook Pixel and TikTok Pixel remain optional and deferred.

**Traceability:** `ANALYTICS-001` to `ANALYTICS-013`, `REL-003`, `DEFER-007`, SRS section 20.

## 7. Data Architecture

### 7.1 Prisma Boundary

Prisma is the sole approved data-access and ORM layer for the architecture.

The Prisma boundary must:

- Be initialized and used within the server-side application boundary.
- Be hidden from the presentation layer.
- Be accessed through feature-owned repositories or data-access services.
- Keep query construction centralized enough to enforce public visibility rules.
- Safely handle untrusted input.
- Support the business operations required by the application modules.

This document does not define a Prisma schema, model names, relations, indexes, migrations, or database provider.

### 7.2 Conceptual Data Ownership

The architecture recognizes the following conceptual ownership areas without defining schema structures:

| Conceptual area | Owning module |
| --- | --- |
| Properties, property details, transaction type, status, and locations | Property Catalog |
| Categories and dynamic field definitions | Categories and Dynamic Fields |
| Property search criteria and result retrieval | Property Search |
| Listing workflow and publication decisions | Listing Workflow and Publication |
| Property image references and main-image designation | Media |
| Customer requests and lead lifecycle | Customer Requests and Leads |
| Supported service definitions and service selection | Services |
| Admin access context and protected operations | Admin Management |
| SEO metadata and public indexability decisions | SEO |
| Analytics events | Analytics |

Conceptual ownership does not prescribe database tables or schema relationships.

### 7.3 Public Query Policy

Public property queries must apply the public visibility policy before returning data:

- Only approved and published properties are eligible.
- Draft, under-review, being-prepared, awaiting-approval, unpublished, and archived properties are not public results.
- Public details and SEO queries use the same publication policy.

The policy must be centralized or consistently reused so that a public query cannot accidentally bypass publication rules.

### 7.4 Business Operation Consistency

Application operations must preserve business consistency for operations such as:

- Valid request submission and lead creation.
- Listing request creation without publication.
- Publication only after required workflow and Admin approval.
- Lead status changes.
- Main-image requirements for published properties.

The exact persistence transaction mechanism is not specified here. Prisma remains the data-access boundary.

## 8. Authentication and Authorization Architecture

### 8.1 Customer Access

Customers are anonymous public users:

- No customer registration.
- No customer login.
- No customer profile.
- No customer session requirement for public forms.

Customer submissions are protected by validation, rate limiting, anti-spam controls, and safe input handling rather than customer authentication.

### 8.2 Admin Authentication

Admin authentication is represented by an authentication boundary with responsibilities to:

- Establish whether the request has an authenticated Admin identity.
- Provide the server-side application boundary with the authenticated context.
- Reject unauthenticated access to protected Admin operations.

The authentication provider and detailed authentication model remain deferred under `DEFER-009`.

### 8.3 Server-Side Authorization

Authorization must be applied inside the server-side application boundary before every protected Admin operation or mutation.

The authorization boundary must protect:

- Admin dashboard access.
- Property management.
- Category management.
- Dynamic field management.
- Location management.
- Lead management.
- Service management.
- Publication, unpublishing, and archiving.

No multi-role authorization system is introduced.

## 9. Validation and Security Architecture

### 9.1 Validation Pipeline

Public and Admin input follows this conceptual pipeline:

```text
Input
  -> Request Context Check
  -> Shape and Basic Validation
  -> Business Rule Validation
  -> Category/Service Definition Validation
  -> Authorization Check where Protected
  -> Application Operation
  -> Safe Result or Safe Error
```

Client-side validation may improve usability but cannot replace this server-side pipeline.

### 9.2 Dynamic Property Validation

The validation boundary must resolve the selected category and active field definitions before accepting dynamic values. It must reject:

- Unknown field IDs.
- Fields from unrelated categories.
- Inactive fields.
- Missing required values.
- Invalid field types.
- Invalid options.

### 9.3 Dynamic Service Validation

The validation boundary must resolve the selected service and its active form definition before accepting service data. Exact service fields and detailed constraints remain deferred.

### 9.4 Public Form Protection

The public form boundary must provide:

- Server-side validation.
- Required-value enforcement.
- Safe input handling.
- Rate limiting.
- Anti-spam protection.
- Safe submission errors.

### 9.5 Error Boundary

Customer-facing errors must not expose:

- Stack traces.
- Database details.
- Internal error messages.
- Secrets.

Internal error reporting belongs behind an operational logging boundary.

**Traceability:** `SEC-001` to `SEC-019`, `FIELD-009`, `FIELD-010`, `SERVICE-011`, `SEARCH-012`, `PUB-003`, SRS sections 5, 17, 18, and 21.

## 10. Runtime Business Flows

### 10.1 Public Property Discovery

```text
Public Request
  -> Property Search Application Operation
  -> Validate Search and Category Filters
  -> Apply Published-Property Policy
  -> Query through Property Search Data Access
  -> Return Incremental Results
```

Invalid or irrelevant filters are removed or rejected. Empty results are a valid outcome. Search failures are isolated as safe errors.

### 10.2 Property Details

```text
Public Property Request
  -> Validate Identifier
  -> Apply Published-Property Policy
  -> Load Property Details and Media References
  -> Load Similar Properties as Secondary Operation
  -> Return Details and Relevant CTAs
```

The similar-property operation must not be a prerequisite for the primary property detail response.

### 10.3 Customer Request and Lead Creation

```text
Anonymous Customer Submission
  -> Server Validation
  -> Rate Limit and Anti-Spam Boundary
  -> Request-Specific Application Operation
  -> Create Correct Lead Source
  -> Return Success
```

Analytics delivery is invoked as a non-blocking secondary concern and must not prevent valid lead creation.

### 10.4 Listing and Publication

```text
Listing Request
  -> Listing Lead
  -> MKAAN Review
  -> Inspection
  -> Preparation if Needed
  -> Professional Photography
  -> Listing Preparation
  -> Admin Authorization
  -> Admin Approval
  -> Publication Preconditions
  -> Public Visibility
```

The architecture must prevent the listing-request operation from invoking public publication directly.

### 10.5 Service Request

```text
Selected Service
  -> Resolve Service Definition
  -> Display Service-Specific Dynamic Form
  -> Server Validation
  -> Create Service Lead
  -> Return Success
```

The selected service remains part of the application operation context and lead source data.

### 10.6 Admin Lead Management

```text
Authenticated Admin Request
  -> Server-Side Authorization
  -> Load Lead
  -> Validate Supported Status Change
  -> Persist Status Change through Prisma Boundary
  -> Return Safe Admin Result
```

Exact transition permissions remain deferred.

## 11. Media and Storage Boundaries

### 11.1 Media Storage Port

The Media module depends on an image-storage port with responsibilities for:

- Accepting validated image content.
- Returning a non-Base64 reference suitable for property media records.
- Retrieving image content or references for public presentation.
- Handling failed media retrieval without breaking the gallery.

The storage provider and storage architecture remain deferred under `IMAGE-005` and `DEFER-003`.

### 11.2 Published Property Media Invariant

The publication operation must ensure that a published property has a main image. Multiple property images remain supported.

### 11.3 Professional Photography

Professional photography is a business workflow responsibility of MKAAN and a pre-publication requirement. The architecture represents photography completion as a publication prerequisite without defining its operational tooling or exact status name.

## 12. SEO and Public Content Architecture

The SEO module consumes public property data only through the published-property policy.

It provides conceptual operations for:

- Resolving a property URL from a Latin/English slug and unique identifier.
- Producing dynamic title and meta-description inputs.
- Producing canonical URL inputs.
- Producing Open Graph and social-image inputs.
- Producing structured-data inputs where appropriate.
- Selecting eligible sitemap entries.
- Applying robots.txt behavior.
- Returning proper not-found behavior.

The architecture must not generate unlimited indexable pages from search/filter combinations. Location and category indexability remains conditional on meaningful content.

Exact structured-data types, target geography, and meaningful-content rules remain deferred.

## 13. Analytics Architecture

### 13.1 Event Boundary

Feature modules publish analytics events through a shared analytics boundary rather than coupling business operations directly to a provider.

The event boundary supports:

- Property view.
- Search.
- Filter applied.
- Viewing request started.
- Viewing request submitted.
- Property request submitted.
- Listing request submitted.
- Service request submitted.
- Contact submitted.
- CTA click.

### 13.2 Privacy Boundary

Analytics payload contracts must exclude unnecessary personal data, including phone numbers and full request content.

### 13.3 Failure Isolation

Analytics delivery is non-blocking. A failed analytics call must not fail:

- A valid form submission.
- Lead creation.
- A request success outcome.
- A core customer journey.

Facebook Pixel and TikTok Pixel remain optional and deferred. No analytics provider is selected.

**Traceability:** `ANALYTICS-001` to `ANALYTICS-013`, `REL-003`, `DEFER-007`, SRS section 20.

## 14. Performance and Delivery Architecture

The architecture must support the following behavior without selecting infrastructure:

- Public property experiences can use appropriate server rendering.
- Search results can be retrieved incrementally.
- Property images can be optimized and loaded lazily where appropriate.
- The client receives only the property data and media needed for the current experience.
- Filtering operations remain efficient through the application and data-access boundaries.
- Unnecessary client-side JavaScript is avoided.
- Caching can be introduced behind application read boundaries where appropriate.

The architecture does not select a cache technology, hosting platform, deployment topology, image optimization provider, or infrastructure service.

**Traceability:** `PERF-001` to `PERF-010`, `SEARCH-009`, `IMAGE-002`, SRS section 22.

## 15. Reliability and Operations Architecture

### 15.1 Failure Isolation

The application separates secondary operations from primary operations:

- Similar-property retrieval is secondary to property details.
- Individual image retrieval is secondary to gallery availability.
- Analytics delivery is secondary to business submissions.
- Search empty results are distinct from search failures.
- Safe error mapping separates customer messages from internal diagnostics.

### 15.2 Operational Ports

The architecture includes replaceable operational boundaries for:

- Error logging.
- Monitoring.
- Database backups.
- Recovery procedures.
- Safe migrations.

Exact tools and procedures remain deferred under `DEFER-012`.

### 15.3 Data Change Safety

All persisted changes must be made through controlled server-side application operations and the Prisma data-access boundary. Destructive deletion must not be the default for leads or property visibility changes where unpublishing or archiving is appropriate.

**Traceability:** `REL-001` to `REL-009`, `PUB-005`, `LEAD-007`, `DEFER-012`, SRS sections 13, 15, and 18.

## 16. Accessibility and Responsive Architecture

Accessibility and responsive behavior are cross-cutting presentation responsibilities:

- The presentation boundary must support semantic HTML.
- Keyboard interaction must remain available.
- Focus states must be visible.
- Forms must expose labels and accessible validation errors.
- Media presentation must provide appropriate alt text.
- Contrast and reduced-motion behavior must be supported.
- Public and Admin experiences must work across mobile, tablet, laptop, desktop, and large screens.

Critical presentation areas include property cards, property filters, property galleries, customer forms, and the Admin dashboard.

The architecture does not define specific UI components or pages.

**Traceability:** `A11Y-001` to `A11Y-008`, `RESP-001` to `RESP-006`, `DETAIL-009`, SRS section 23.

## 17. Testing Architecture

### 17.1 Unit Boundary

Unit-level tests should target pure or isolated business behavior:

- Dynamic field validation.
- Category-specific filter logic.
- Publication and visibility rules.
- Price validation.
- Lead status transitions.

### 17.2 Integration Boundary

Integration-level tests should cross application boundaries for:

- Customer forms.
- Server-side operations.
- Prisma data-access operations.
- Lead creation.
- Admin authorization and publication operations.

The architecture does not select a testing framework.

### 17.3 End-to-End Boundary

End-to-end tests must cover the approved critical flows:

- Search -> Filter -> Property -> Viewing Request.
- Property Request -> Form -> Submit.
- List Property -> Form -> Submit.
- Services -> Service -> Dynamic Form -> Submit.
- Contact -> Form -> Submit.
- Admin Login -> Property -> Publish.
- Admin Login -> Lead -> Status Change.

Unpublishing or archiving should also be covered where that behavior is exercised.

**Traceability:** `TEST-UNIT-001` to `TEST-UNIT-005`, `TEST-INT-001` to `TEST-INT-004`, `TEST-E2E-001` to `TEST-E2E-007`, SRS section 24.

## 18. Maintainability and Scalability Structure

The architecture supports maintainability through:

- Feature-oriented modules.
- Clear server/client boundaries.
- Separation of UI and business logic.
- Reusable shared contracts without centralizing all business logic.
- Prisma isolation behind data-access boundaries.
- Replaceable external integration ports.
- TypeScript prioritization.

The architecture supports growth in:

- Properties.
- Leads.
- Categories.
- Dynamic fields.
- Locations.
- Services.

The MVP remains a modular monolith. Growth does not justify microservices, real-time chat, complex role systems, customer accounts, mobile applications, complex booking engines, online payments, wishlists, favorites, unrequested notifications, or unrequested integrations.

**Traceability:** `MAINT-001` to `MAINT-007`, `SCALE-001`, `SCALE-002`, explicit exclusions in Requirements section 19.2, SRS sections 1, 22, and 28.

## 19. Conceptual Module Dependency Rules

The following dependency rules maintain the modular architecture:

1. Presentation modules may call application operations but must not call Prisma directly.
2. Application modules may coordinate domain policies, repositories, and integration ports.
3. Domain policies must not depend on presentation, Prisma, or external providers.
4. Feature modules may depend on shared contracts and approved cross-feature interfaces.
5. Public property reads must use the shared publication-visibility policy.
6. Customer request modules must use the Leads boundary for lead creation rather than creating unrelated lead representations.
7. Publishing operations must use the Listing Workflow boundary and cannot be triggered as a side effect of listing-request intake.
8. Analytics is invoked through a non-blocking integration boundary.
9. Media storage is accessed through the Media boundary and never directly from presentation code.
10. Admin authorization is checked before protected application operations, not only in the presentation layer.

## 20. Deployment and Infrastructure Boundary

The confirmed architecture is one Full-Stack Next.js application with no separate backend application and no microservices.

This document intentionally does not decide:

- Hosting provider.
- Deployment platform.
- Runtime topology.
- Database provider.
- Image-storage provider.
- Authentication provider.
- Cache provider.
- Monitoring or logging provider.
- Backup provider.
- Recovery infrastructure.

These decisions remain outside the approved architecture scope unless separately authorized.

## 21. Deferred Decisions

The following decisions remain deferred after this architecture design:

| Source ID | Decision | Architectural treatment |
| --- | --- | --- |
| `DEFER-001` | Exact target geography | Geography-neutral location boundary; no area is selected. |
| `DEFER-003` / `IMAGE-005` | Image storage architecture and provider | Media-storage port; no provider or storage design selected. |
| `DEFER-004` | Exact service-specific fields | Service-definition boundary; no fields invented. |
| `DEFER-005` | Representative service example | Demonstration choice remains open. |
| `DEFER-006` | Structured-data types | Structured-data boundary; exact types remain open. |
| `DEFER-007` / `ANALYTICS-012` | Facebook Pixel and TikTok Pixel usage | Analytics integration port; providers remain optional. |
| `DEFER-008` | Exact validation constraints | Validation boundary is confirmed; detailed constraints remain open. |
| `DEFER-009` | Detailed Admin authentication and authorization model | Authentication and authorization ports; provider and detailed model remain open. |
| `DEFER-010` | Exact publication status names and transition permissions | Workflow and policy boundaries; exact state vocabulary remains open. |
| `DEFER-011` | Meaningful SEO content rules | SEO eligibility policy boundary; exact content rules remain open. |
| `DEFER-012` | Operational tools and procedures | Logging, monitoring, backup, recovery, and migration ports; providers remain open. |

`DEFER-002`, exact architecture within the Full-Stack Next.js direction, is resolved by this document as a modular monolith in one Next.js application.

## 22. Architectural Decisions and Rationale

| Decision | Rationale | Traceability |
| --- | --- | --- |
| Single Full-Stack Next.js application | Satisfies the confirmed product direction and avoids a separate backend application. | `PROJ-005`, `PROJ-006` |
| Modular monolith | Supports modularity and future growth without introducing excluded microservices or enterprise complexity. | `MAINT-001` to `MAINT-007`, `SCALE-001`, `SCALE-002` |
| Prisma data-access/ORM layer | Explicitly required architectural direction and provides a single controlled persistence boundary. | Architectural Direction, SRS sections 1, 24 |
| Separate public and Admin logical boundaries in one application | Preserves public customer access while protecting Admin functionality server-side. | `AUTH-001` to `AUTH-005`, `ADMIN-001` to `ADMIN-010` |
| Feature-oriented modules | Aligns ownership with property, search, request, lead, service, publication, media, SEO, and Admin business capabilities. | `MAINT-003` to `MAINT-007`, SRS sections 4-16 |
| Server-side application operations | Enforces validation, authorization, publication, lead, and business rules outside the UI. | `SEC-001` to `SEC-019`, SRS sections 14, 17, and 21 |
| Provider ports for unresolved integrations | Preserves deferred authentication, media, analytics, and operational decisions without blocking architecture. | `DEFER-003`, `DEFER-007`, `DEFER-009`, `DEFER-012` |

## 23. Architecture Traceability Matrix

| Architecture area | Requirements IDs | SRS sections |
| --- | --- | --- |
| Application shape and scope | `PROJ-001` to `PROJ-007`, `CON-004`, `CON-005` | 1, 2, 22, 28 |
| Public and Admin access | `AUTH-001` to `AUTH-005`, `CUSTOMER-001` to `CUSTOMER-004`, `ADMIN-001` to `ADMIN-010` | 2, 3, 14, 21 |
| Property catalog | `PROP-001` to `PROP-011`, `DETAIL-001` to `DETAIL-009` | 4, 7 |
| Dynamic fields and filters | `FIELD-001` to `FIELD-010`, `SEARCH-001` to `SEARCH-012` | 5, 6, 17 |
| Customer requests and leads | `FLOW-001` to `FLOW-007`, `FLOW-013` to `FLOW-015`, `LEAD-001` to `LEAD-008` | 3, 8, 9, 13 |
| Listing, preparation, and publication | `FLOW-008` to `FLOW-012`, `PREP-001` to `PREP-003`, `PUB-001` to `PUB-006`, `BR-003`, `BR-004`, `BR-011`, `BR-013`, `BR-014` | 10, 11, 15 |
| Services | `SERVICE-001` to `SERVICE-011`, `LEAD-004` | 12 |
| Media | `IMAGE-001` to `IMAGE-005`, `SEC-009`, `SEC-019`, `REL-004` | 7, 16, 21 |
| SEO | `SEO-001` to `SEO-017` | 19 |
| Analytics | `ANALYTICS-001` to `ANALYTICS-013`, `REL-003` | 20 |
| Security and validation | `SEC-001` to `SEC-019`, `FIELD-009`, `FIELD-010`, `PROP-011` | 5, 17, 18, 21 |
| Performance | `PERF-001` to `PERF-010` | 22 |
| Accessibility and responsiveness | `A11Y-001` to `A11Y-008`, `RESP-001` to `RESP-006` | 23 |
| Reliability and operations | `REL-001` to `REL-009` | 18 |
| Maintainability and scalability | `MAINT-001` to `MAINT-007`, `SCALE-001`, `SCALE-002` | 22 |
| Testing | `TEST-UNIT-001` to `TEST-UNIT-005`, `TEST-INT-001` to `TEST-INT-004`, `TEST-E2E-001` to `TEST-E2E-007` | 24 |

## 24. Explicit Architecture Exclusions

This architecture does not authorize or introduce:

- A separate backend application.
- Microservices.
- Customer authentication or customer accounts.
- Customer dashboards.
- Real-time chat.
- Complex role systems.
- Complex booking engines.
- Online payments.
- Mobile applications.
- Wishlists or favorites.
- Unrequested notifications.
- Unrequested integrations.
- Database schemas or migrations.
- Production pages or components.
- Server Actions or API routes.
- Provider-specific infrastructure decisions.

Any future change to these boundaries requires an explicit requirements or architecture decision.
