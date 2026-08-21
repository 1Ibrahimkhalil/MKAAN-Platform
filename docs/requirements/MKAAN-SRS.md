# MKAAN Software Requirements Specification

**Project:** MKAAN  
**Document status:** MVP Software Requirements Specification  
**Source of truth:** `docs/requirements/MKAAN-REQUIREMENTS.md`  
**Language:** Arabic-only MVP  
**Direction:** Right-to-left (RTL)  
**Last updated:** 2026-08-17

## 1. Document Overview

### 1.1 Purpose

This Software Requirements Specification (SRS) translates the approved MKAAN Requirements Document into observable functional and business behavior for the MKAAN MVP.

The SRS describes:

- Who may use the system.
- What customers and Admin users may do.
- How the system behaves during normal flows.
- How validation, publication, visibility, leads, errors, and secondary failures are handled.
- How the confirmed requirements can be verified through test scenarios.

The SRS does not define application architecture, database schemas, database technology, ORM, authentication provider, image storage provider, infrastructure, or implementation structure.

### 1.2 Scope

MKAAN is a local Egyptian real-estate platform focused on a specific Egyptian governorate or area. The MVP connects people looking for properties with available properties and property-related services.

The MVP provides:

- Public property discovery, search, filtering, and details.
- Property requests, viewing requests, listing requests, service requests, and contact requests.
- Lead creation and Admin lead management.
- Category-aware property fields and filters.
- Property publication controlled by MKAAN review and Admin approval.
- A protected Admin dashboard for the confirmed administrative capabilities.

The MVP is Arabic-only and RTL. Customers do not have accounts. Only Admin users authenticate. The product direction is Full-Stack Next.js with no separate backend application; the exact application architecture remains deferred.

### 1.3 Relationship to the Requirements Document

`docs/requirements/MKAAN-REQUIREMENTS.md` remains the authoritative source for confirmed product requirements, constraints, business rules, priorities, exclusions, and deferred decisions.

This SRS:

- Must be interpreted together with the Requirements Document.
- Must not weaken or contradict confirmed requirements or business rules.
- Must not turn a deferred decision into a confirmed requirement.
- Must not introduce product features not present in the Requirements Document.
- Provides behavior detail only where that detail follows from the approved requirements.

### 1.4 Definitions

| Term | Meaning |
| --- | --- |
| Customer / Public User | An unauthenticated person using the public MKAAN experience. |
| Admin | An authenticated user authorized to access protected MKAAN administrative functionality. No additional roles are defined. |
| Property | A real-estate listing or property record managed by MKAAN. |
| Category | A property classification that determines applicable fields and filters. |
| Dynamic field | A category-aware property field whose definition controls its type, required state, filtering, display, options, order, and active state. |
| Dynamic filter | A filter derived from the active filterable fields applicable to the selected category. |
| Listing request | A customer request asking MKAAN to review and potentially prepare and publish a property. |
| Published property | A property approved for public visibility. |
| Unpublished property | A property that is not publicly available or indexable. |
| Lead | A business record created from a customer request or contact action. |
| Viewing request | A customer request for MKAAN to arrange a property viewing. It is not a confirmed booking. |
| CTA | A call to action that directs a customer to an applicable request or lead flow. |

### 1.5 Requirement Priority Terminology

- **MVP:** Required for the MKAAN MVP.
- **Important:** Required behavior or quality expectation for the MVP, subject to detailed design and implementation planning.
- **Deferred:** Not decided or intentionally postponed. It must not be implemented as an assumed product decision.

## 2. Actors and Access Model

### 2.1 Customer / Public User

The Customer / Public User is unauthenticated and may:

- Browse published properties.
- Search properties.
- Filter properties by supported criteria.
- View published property details.
- Request a property.
- Request a viewing for a property.
- Submit a List Your Property request.
- Request one of the supported services.
- Contact MKAAN.

Customers must not be required to register, log in, create an account, or maintain a personal profile. Customer-facing forms must work without customer authentication.

### 2.2 Admin

An Admin is an authenticated user who may access protected administrative functionality after authentication and successful server-side authorization.

An authorized Admin may manage:

- Properties.
- Categories.
- Dynamic fields.
- Locations.
- Leads.
- Services.
- Property publication state, including publication, unpublishing, and archiving where appropriate.

No additional roles or complex role system are defined by the approved requirements.

### 2.3 Access Boundaries

| Area | Customer / Public User | Admin |
| --- | --- | --- |
| Published property discovery and details | Allowed without authentication | Allowed, subject to any protected context used for management |
| Customer request forms | Allowed without authentication | Not required for customer submission |
| Admin dashboard | Not allowed | Allowed after authentication and server-side authorization |
| Admin mutations | Not allowed | Allowed only when authorized server-side |
| Unpublished property management | Not publicly available | Allowed through protected administrative behavior |

Hiding an Admin control in a user interface is not authorization. Every protected operation and mutation must enforce authorization on the server side.

**Traceability:** `AUTH-001` to `AUTH-005`, `CUSTOMER-001` to `CUSTOMER-004`, `ADMIN-001` to `ADMIN-010`, `SEC-001`, `SEC-002`.

## 3. Customer Journey

### 3.1 Primary Journey

The primary customer journey is:

`Home / public entry point -> Discover or Search -> Property Listing -> Property Details -> CTA -> Request Flow -> Lead Creation -> Success`

Expected behavior:

1. The customer enters the public MKAAN experience without an account.
2. The customer discovers or searches for properties.
3. The system presents public property results according to the current search, category, transaction, location, price, dynamic filter, and sorting inputs.
4. The customer selects a published property and views its details.
5. The property details provide relevant CTAs.
6. The selected CTA starts the applicable request flow.
7. The system validates the submission on the server.
8. A valid submission creates the corresponding lead where the flow requires one.
9. The customer receives a success outcome that does not expose internal details.

Customers must be able to complete the public journey without authentication. A failure in analytics, similar properties, or an individual image must not unnecessarily prevent the primary journey.

### 3.2 Request a Property Journey

`Request a Property entry -> Request form -> Validation -> Submission -> Property-request lead creation -> Success`

The customer describes the type of property they are looking for. The approved requirements do not define a complete field list beyond this known purpose; the SRS does not add fields.

### 3.3 Request a Viewing Journey

`Published Property Details -> Request Viewing CTA -> Viewing form -> Validation -> Submission -> Viewing lead creation -> Success`

The submitted viewing request is not a confirmed booking. MKAAN must confirm the viewing separately.

### 3.4 List Your Property Journey

`List Your Property entry -> Customer submission -> Listing request lead creation -> MKAAN workflow -> Admin approval -> Publication or non-public outcome`

Customer submission creates a listing request. It must never directly publish a property.

### 3.5 Services Journey

`Services entry point -> Select service -> Service Request page -> Service-specific dynamic form -> Validation -> Submission -> Service lead creation -> Success`

The selected service must remain associated with the request and must determine the form definition shown and validated.

### 3.6 Contact Journey

`Contact entry point -> Contact form -> Validation -> Submission -> Contact lead creation -> Success`

The customer may submit a contact request without an account or login. No additional contact fields are defined by the approved requirements.

**Traceability:** `OBJ-001` to `OBJ-007`, `CUSTOMER-001` to `CUSTOMER-004`, `FLOW-001` to `FLOW-015`, `SERVICE-001` to `SERVICE-011`, `LEAD-001` to `LEAD-005`.

## 4. Property Domain Behavior

### 4.1 Categories and Transactions

The system must support property categories and must distinguish at least:

- Properties for sale.
- Rental properties.

The category and transaction type are part of the property information used by public discovery, search, filtering, details, and relevant request flows.

### 4.2 Category-Aware Behavior

Each category may define its own applicable property fields and filters.

The system must:

- Determine which fields apply to the selected category.
- Determine which filters apply to the selected category.
- Display category-specific information only when it belongs to the property category.
- Prevent fields from an unrelated category from appearing automatically.
- Reject untrusted values that reference fields outside the selected category.
- Exclude inactive fields and filters from active customer behavior.

Category-specific data is a core business rule, not only a presentation preference.

### 4.3 Locations

Properties must support locations. Location can be used in public property filtering and property details. The initial target governorate or area remains unspecified in the Requirements Document.

### 4.4 Property Information

A published property details experience must provide, as applicable:

- General property information.
- Category-specific information.
- Sale or rental transaction type.
- Location.
- Price.
- Description.
- Property images.
- A main image.
- Relevant CTAs.
- Similar properties.

Property price data must be validated server-side.

### 4.5 Featured and Similar Properties

The system must support featured properties and similar properties.

- Featured properties are properties supported by the public property experience as featured content.
- Similar properties are related property results presented in the property details experience.
- Similar properties must not replace or obscure the primary property details or CTA behavior.
- A failure to load similar properties must not break the primary property details experience.

The Requirements Document does not define the selection, ranking, ordering, or matching logic for featured or similar properties. This SRS does not add that logic.

### 4.6 Property Status and Publication State

The system must distinguish between:

- A property that is publicly published and available to the public experience.
- A property that is not publicly available.

Only approved and published properties may appear in public property listings or public property details. A submitted listing request is not itself a public property publication event.

Exact status names and transition permissions remain deferred.

**Traceability:** `PROP-001` to `PROP-011`, `DETAIL-001` to `DETAIL-007`, `PUB-001` to `PUB-006`, `IMAGE-001` to `IMAGE-004`, `DEFER-001`, `DEFER-010`.

## 5. Dynamic Property Fields

### 5.1 Field Definition Behavior

A dynamic property field is associated with one or more applicable property categories according to the approved category-aware behavior. Its definition must support:

- Field type.
- Required or optional state.
- Filterable or non-filterable state.
- Displayable or non-displayable state.
- Options when the field type requires options.
- Display order.
- Active or inactive state.

An active field is eligible for the applicable category's property data and, when filterable, for the applicable category's filters. A non-displayable field may be used for system behavior without being shown as customer-facing property information. A non-filterable field must not be exposed as a public property filter.

### 5.2 Required and Optional Values

- If a required field value is missing, the submission is invalid.
- The system must reject the invalid submission on the server.
- The system must not create or publish a property from that invalid submission.
- The customer must receive a safe validation outcome that identifies that correction is required without exposing internal details.
- Optional fields may be omitted when no other confirmed rule requires a value.

### 5.3 Invalid Options and Values

- If an option-based field receives a value not present in its applicable options, the submission is invalid.
- If a value does not match the field type or other confirmed field constraints, the submission is invalid.
- Invalid values must be rejected server-side even if a public interface attempted to prevent them.

The exact validation constraints for each field type remain deferred.

### 5.4 Unknown, Unrelated, and Inactive Fields

- An unknown field ID submitted by an untrusted caller must be rejected.
- A field ID that does not belong to the selected property category must be rejected.
- An inactive field submitted by an untrusted caller must not be accepted as an active property field.
- The system must not silently treat an unrelated or inactive field as valid for the selected category.
- No property or lead operation depending on invalid dynamic field data may succeed.

**Traceability:** `FIELD-001` to `FIELD-010`, `PROP-009`, `PROP-010`, `SEC-003`, `SEC-004`, `SEC-018`, `DEFER-008`.

## 6. Property Search and Filtering

### 6.1 Supported Search and Filters

The public property listing must support:

- Text search.
- Category filtering.
- Transaction type filtering for sale or rental.
- Location filtering.
- Price filtering.
- Dynamic category-specific filters.
- Sorting.

Only published properties are eligible for public results.

### 6.2 Category-Specific Filter Behavior

When a category is selected:

1. The system determines the active filters applicable to that category.
2. The system presents or accepts only applicable category-specific filter inputs.
3. Filter values are validated against the selected category and its active filter definitions.
4. Filters from unrelated categories are invalid for the selected category.

When the selected category changes:

- Filters that remain applicable may remain active.
- Filters that are no longer applicable must not remain active.
- Invalid or irrelevant filter values must be removed or otherwise excluded from the active search criteria.
- The resulting search must use only valid criteria for the new category.

### 6.3 Sorting and Incremental Results

- Sorting must be applied to the eligible public property results.
- Results may be delivered through incremental loading or infinite scrolling.
- When more results are requested, the system returns the next eligible result segment according to the active valid criteria and sort order.
- When no more results exist, the system communicates that the result set is complete and does not continue requesting nonexistent results.

The SRS does not define a page size, cursor format, sort options, or loading technology.

### 6.4 Empty, Invalid, and Error Outcomes

- If no properties match valid criteria, the system presents an empty result state.
- If a filter is invalid, the system must not use it as a valid active criterion. It must return a safe validation or correction outcome according to the context.
- If the search operation fails, the system presents a safe error state and does not present the failure as valid search results.
- Search failure must not expose internal errors, database details, or secrets.
- Loading states must be represented while results are being obtained.

**Traceability:** `SEARCH-001` to `SEARCH-012`, `PROP-002`, `PROP-003`, `PROP-004`, `PROP-006`, `PUB-002`, `PUB-003`, `SEC-003`, `SEC-018`, `REL-001`.

## 7. Property Details

### 7.1 Information Hierarchy

The property details experience must make the following information available in an understandable order:

1. Main property image.
2. Property image gallery.
3. General property information.
4. Category-specific information.
5. Price.
6. Location.
7. Description.
8. Relevant CTAs.
9. CTA section before Similar Properties.
10. Similar properties.

The exact visual implementation is not defined by this SRS. The design must remain consistent with the established MKAAN visual direction.

### 7.2 Published Property

For a published property, the system may expose the public details and the information supported by the property record. The property may appear in public listings, be included in eligible public SEO behavior, and expose relevant request CTAs.

### 7.3 Unpublished Property

An unpublished or archived property must not be publicly available or publicly indexable. A public request for its details must not expose its property information. The exact handling mechanism remains implementation-independent, but the externally observable outcome must be unavailable or not found behavior.

### 7.4 Missing or Invalid Property

- A missing property must result in proper not-found behavior.
- An invalid property identifier must not be used to retrieve or expose arbitrary property data.
- The system must provide a safe 404 outcome where applicable.
- The response must not reveal database details, stack traces, or other internal information.

### 7.5 Partial Feature Failures

- If an image fails to load, the gallery must remain usable and one failed image must not break the entire gallery.
- If similar properties fail to load, the primary property details and CTA experience must remain usable.
- Secondary feature failure must not unnecessarily break the primary property journey.

**Traceability:** `DETAIL-001` to `DETAIL-009`, `PROP-007` to `PROP-010`, `PUB-002`, `PUB-003`, `REL-001`, `REL-002`, `REL-004`, `SEO-012`, `SEO-013`.

## 8. Request a Property Flow

### 8.1 Purpose

The customer uses this flow to tell MKAAN what type of property they are looking for when an appropriate available property is not already selected.

### 8.2 Behavior

`Entry -> Form -> Server Validation -> Submission -> Lead Creation -> Success`

The flow must:

1. Be accessible without a customer account.
2. Allow the customer to describe the type of property they are looking for.
3. Validate the submitted data on the server.
4. Reject missing required values and invalid values according to the applicable form rules.
5. Create a property-request lead only after valid submission processing succeeds.
6. Present a safe success outcome after lead creation.

The approved requirements do not define the complete form field list. This SRS does not invent fields. Exact validation constraints remain deferred under `DEFER-008`.

### 8.3 Failure Behavior

- Invalid input must not create a lead.
- A submission failure must produce a safe error outcome and must not expose internal details.
- Rate limiting and anti-spam controls may reject or delay processing of abusive submissions.
- Analytics failure must not prevent an otherwise valid request submission.

**Traceability:** `FLOW-001` to `FLOW-003`, `AUTH-001`, `AUTH-002`, `CUSTOMER-003`, `LEAD-002`, `SEC-003`, `SEC-007`, `SEC-008`, `SEC-018`, `REL-003`.

## 9. Request a Viewing Flow

### 9.1 Purpose and Sequence

`Published Property Details -> Request Viewing -> Form -> Server Validation -> Submission -> Viewing Lead Creation -> Success`

The customer asks MKAAN to arrange a viewing for a property. The request is not an automatic booking and does not represent confirmation.

### 9.2 Valid Property Requirement

- The viewing request must be associated with the property selected from the property details experience.
- An invalid, missing, unpublished, or archived property must not produce a valid public viewing request.
- A public viewing request must not expose unpublished property information.

### 9.3 Submission Behavior

1. The customer submits the viewing request without an account.
2. The server validates the submitted data and property reference.
3. Invalid input does not create a lead.
4. A valid submission creates a viewing lead.
5. The system presents a success outcome that makes clear the request was received.
6. MKAAN must confirm the viewing separately.

The system must not present a viewing request as a confirmed booking or implement booking-engine behavior.

### 9.4 Repeated Submission and Failure Behavior

The approved requirements define validation, rate limiting, anti-spam, and lead creation, but do not define a separate duplicate-submission policy. Repeated submissions remain subject to those confirmed controls; this SRS does not add automatic deduplication or booking behavior.

- Invalid input or property references must not create a lead.
- Submission failure must produce a safe error outcome.
- Analytics failure must not prevent a valid viewing request from completing.

**Traceability:** `FLOW-004` to `FLOW-007`, `AUTH-001`, `AUTH-002`, `CUSTOMER-003`, `LEAD-001`, `SEC-003`, `SEC-005`, `SEC-007`, `SEC-008`, `SEC-018`, `REL-003`.

## 10. List Your Property Flow

### 10.1 Business Distinction

A **Listing Request** is a customer-submitted request for MKAAN to review a property. A **Published Property** is an approved property that MKAAN has made publicly visible after the required workflow.

Submitting a listing request must never make a property public.

### 10.2 Confirmed Workflow

`Customer Submission -> MKAAN Review -> Property Inspection -> Preparation if Needed -> Professional Photography -> Listing Preparation -> Admin Approval -> Publish`

The stages have the following business meaning:

1. **Customer Submission:** The customer submits a listing request. The request creates a listing lead. No public publication occurs.
2. **MKAAN Review:** MKAAN reviews the submitted request and decides whether to continue the listing process.
3. **Property Inspection:** MKAAN inspects the property.
4. **Preparation if Needed:** MKAAN controls and coordinates preparation where the property needs it before presentation and marketing.
5. **Professional Photography:** MKAAN takes clear, professional property photos during or after inspection before publication.
6. **Listing Preparation:** The property listing is prepared for publication and marketing.
7. **Admin Approval:** An authorized Admin approves publication.
8. **Publish:** The property becomes publicly visible only after the preceding required workflow and Admin approval are complete.

### 10.3 Workflow Constraints

- The property must not appear in public listings before publication.
- The property must not be publicly indexable before publication.
- Admin approval is required before publication.
- MKAAN is responsible for review, inspection, preparation decisions, professional photography, and listing preparation within the confirmed workflow.
- Exact publication state names and transition permissions remain deferred.

**Traceability:** `FLOW-008` to `FLOW-012`, `PREP-001` to `PREP-003`, `ADMIN-009`, `PUB-001` to `PUB-006`, `BR-003`, `BR-004`, `BR-011`, `BR-013`, `BR-014`, `IMAGE-001`, `IMAGE-002`.

## 11. Property Preparation

Property preparation is the work MKAAN may provide or coordinate to make a property presentable and ready for professional photography and marketing for sale or rental.

Preparation may include:

- Maintenance.
- Finishing.
- Repairs.
- Improvements.
- General preparation.

The confirmed purpose is readiness for:

- Presentation.
- Professional photography.
- Marketing.
- Sale or rental.

The SRS does not define additional operational steps, service pricing, scheduling, or preparation approval behavior.

**Traceability:** `PREP-001` to `PREP-003`, `FLOW-010`, `BR-004`, `BR-013`, `DEFER-004`, `DEFER-010`.

## 12. Services

### 12.1 Unified Services Experience

The public services experience contains exactly the confirmed MVP service entries:

1. Finishing.
2. Maintenance.
3. Prepare Your Property for Sale/Rent.

The flow is:

`Services -> Select Service -> Service Request Page -> Service-specific Dynamic Form -> Server Validation -> Submit -> Lead Created -> Success`

### 12.2 Service Selection

- The selected service must be carried into the service request flow.
- The Service Request page must reflect the selected service.
- The form definition used for display and validation must correspond to the selected service.
- An invalid or unsupported service selection must not result in a valid service request or lead.

### 12.3 Dynamic Service Form

- The form must change based on the selected service.
- Service forms must be dynamic.
- The selected service's form must be validated server-side.
- Required values and valid values for the active service form must be enforced.
- Exact service-specific fields remain deferred and must not be invented by this SRS.

The MVP UI only needs to demonstrate the dynamic form structure with a representative service example. The choice of representative service remains deferred.

### 12.4 Submission and Failure Behavior

- A valid service request creates a service lead.
- An invalid service selection or invalid form submission does not create a lead.
- Submission failure produces a safe error outcome.
- Rate limiting and anti-spam controls apply to the public service form.
- Analytics failure must not prevent a valid service request from completing.

**Traceability:** `SERVICE-001` to `SERVICE-011`, `AUTH-001`, `AUTH-002`, `CUSTOMER-003`, `LEAD-004`, `SEC-003`, `SEC-007`, `SEC-008`, `SEC-018`, `REL-003`, `DEFER-004`, `DEFER-005`.

## 13. Leads

### 13.1 Lead Sources

The system creates business leads from:

- Viewing requests.
- Property requests.
- Listing requests.
- Service requests.
- Contact requests.

Each valid submission creates the corresponding lead after successful server-side validation and submission processing. Invalid submissions do not create leads.

### 13.2 Lead Lifecycle

The supported lifecycle is:

`New -> Contacted -> In Progress -> Completed`

`Cancelled` is also supported when the lead is discontinued or cannot continue.

The exact transition permissions are not defined beyond the supported lifecycle and remain part of the deferred detailed Admin and publication/operations decisions where applicable.

### 13.3 Status Meaning

- **New:** A lead has been received and has not yet been handled.
- **Contacted:** MKAAN has contacted or attempted to contact the customer.
- **In Progress:** MKAAN is actively handling the lead.
- **Completed:** The lead's requested business handling is complete.
- **Cancelled:** The lead will not continue through the active lifecycle.

These meanings describe the business behavior of the confirmed status names. No additional statuses may be introduced by this SRS.

### 13.4 Administrative Handling

Authorized Admin users must be able to manage leads and change supported statuses. Leads are business records and should not normally be permanently deleted. Non-destructive handling is preferred where a lead no longer remains active.

**Traceability:** `LEAD-001` to `LEAD-008`, `ADMIN-005`, `SEC-002`, `SEC-006`, `BR-012`, `BR-015`, `TEST-UNIT-005`.

## 14. Admin Behavior

### 14.1 Authentication and Authorization

- Admin authentication is required before entering protected administrative functionality.
- Server-side authorization must be checked for every protected operation and mutation.
- A user who is not authenticated or not authorized must not perform protected Admin actions.
- UI visibility does not grant authorization.
- The SRS does not choose an authentication provider or define a multi-role model.

### 14.2 Administrative Capabilities

Authorized Admin users must be able to manage:

- Properties.
- Categories.
- Dynamic fields.
- Locations.
- Leads.
- Services.
- Property publication state, including publishing.
- Unpublishing or archiving where appropriate.

Managing a property includes respecting category-aware fields, publication rules, image requirements, and server-side validation. Managing leads includes supported status changes and non-destructive business-record handling.

### 14.3 Public and Protected Boundaries

- Public users may browse published property content and submit customer-facing forms without authentication.
- Public users may not use Admin operations or mutations.
- Admin operations must not rely only on client-side checks.
- Unauthorized Admin access must be denied with a safe error outcome and without internal details.

**Traceability:** `AUTH-003` to `AUTH-005`, `ADMIN-001` to `ADMIN-010`, `SEC-001`, `SEC-002`, `SEC-006`, `DEFER-009`.

## 15. Publishing and Visibility

### 15.1 Public Visibility Rule

Only approved and published properties are publicly visible. A property must not appear in public property listings or public property details merely because a listing request was submitted.

### 15.2 Behavior by Workflow Condition

| Condition | Required public behavior |
| --- | --- |
| Property submitted | Treat as a listing request; do not expose as a public property. |
| Property under review | Keep non-public and non-indexable. |
| Property being prepared | Keep non-public and non-indexable. |
| Property awaiting Admin approval | Keep non-public and non-indexable. |
| Property approved and published | Allow public visibility and eligible public indexing behavior. |
| Property unpublished or archived | Remove from public visibility and public indexability. |

The exact names of these internal states and the permissions for transitioning between them remain deferred. The business order and Admin approval requirement are confirmed.

### 15.3 Publication Preconditions

Publication requires:

- Completion of the required listing workflow.
- Professional photography handled by MKAAN before publication.
- Admin approval.
- A main image for the published property.

Archiving or unpublishing should be preferred over destructive deletion where appropriate.

**Traceability:** `FLOW-009`, `FLOW-010`, `FLOW-011`, `ADMIN-009`, `ADMIN-010`, `PUB-001` to `PUB-006`, `IMAGE-001`, `SEO-013`, `BR-003`, `BR-008`, `BR-014`, `DEFER-010`.

## 16. Media Behavior

### 16.1 Property Images

- A property may have multiple images.
- Every published property must have a main image.
- The main image is the primary image used by the property details experience and relevant public property representations.
- The property details experience must support an image gallery.

### 16.2 Photography Requirement

MKAAN must take clear, professional property photos during or after inspection before publishing the property listing. A listing request submission does not satisfy this publication requirement by itself.

### 16.3 Validation and Failure Behavior

- Image uploads must be validated server-side.
- File uploads, where supported, must be validated for safety and validity on the server.
- Invalid or unsafe uploads must not be accepted as valid property media.
- A failure to load one image must not break the entire gallery.
- The system must preserve the usable property details experience when a media item fails.

The SRS does not define image storage architecture, storage provider, file formats, size limits, image processing technology, or database representation beyond the confirmed prohibition on Base64 image storage in the database.

**Traceability:** `IMAGE-001` to `IMAGE-005`, `FLOW-011`, `PUB-006`, `SEC-009`, `SEC-019`, `REL-004`, `DEFER-003`.

## 17. Forms and Validation

### 17.1 Public Form Access and Usability

- Public forms must work without customer authentication.
- Forms must provide usable labels and accessible validation outcomes.
- Client-side behavior may provide immediate usability feedback, but it must not be treated as the authoritative validation layer.
- Server-side validation is authoritative for every public form.

### 17.2 Validation Rules

The server must validate:

- Required values.
- Valid values according to the form's applicable business rules.
- Dynamic property field definitions and category association.
- Dynamic service form definitions and selected service association.
- Property price data.
- File uploads where uploads are supported.
- Search and filter inputs against the selected category and active filter definitions.

The system must safely handle input and must not accept arbitrary field IDs, invalid dynamic values, unrelated category fields, inactive fields, invalid service form values, or invalid filter values as valid data.

### 17.3 Submission Outcomes

- A valid form is submitted only after server-side validation succeeds.
- An invalid form does not create a lead or publish a property.
- Validation errors must be communicated safely and accessibly.
- Submission failures must return a safe failure outcome without internal errors, stack traces, database details, or secrets.
- Rate limiting and anti-spam protection apply to public forms.
- Analytics failure must not prevent valid form submission.

The approved requirements do not define complete field lists for Request a Property, Request a Viewing, List Your Property, or Contact. This SRS specifies only known behavior and does not add fields. Exact validation constraints remain deferred under `DEFER-008`; service-specific fields remain deferred under `DEFER-004`.

**Traceability:** `AUTH-002`, `FLOW-001` to `FLOW-015`, `SERVICE-005` to `SERVICE-011`, `SEC-003`, `SEC-004`, `SEC-007` to `SEC-009`, `SEC-014`, `SEC-018`, `SEC-019`, `PROP-011`, `SEARCH-012`, `REL-003`.

## 18. Error, Loading, and Empty States

### 18.1 Loading

The system must provide loading behavior for property listing and incremental property retrieval. Loading behavior must not falsely present incomplete results as complete results.

### 18.2 Empty Results

When a valid property search returns no matching properties, the system must provide an empty result state. Empty results are not treated as an application error.

### 18.3 Invalid Requests and Validation Errors

- Invalid property identifiers, invalid category values, invalid field IDs, invalid field values, invalid service selections, and invalid filter values must not be processed as valid requests.
- The system must communicate a safe correction or unavailable outcome.
- No internal implementation details may be exposed.

### 18.4 Not Found

Missing properties and invalid property identifiers must produce proper not-found behavior. Unpublished properties must not be disclosed through public property access.

### 18.5 Unauthorized Admin Access

An unauthenticated or unauthorized attempt to access or mutate protected Admin functionality must be denied server-side and return a safe unauthorized outcome.

### 18.6 Submission Failures

A failed customer submission must:

- Not create an invalid lead.
- Not publish a property.
- Present a safe failure state.
- Leave the primary experience usable where possible.

### 18.7 Secondary Feature Failures

- A failed property image must not break the gallery.
- A failed Similar Properties operation must not break the property details experience.
- Analytics failure must not prevent a core customer action, including form submission, from completing.
- Failure of an individual feature must not unnecessarily break the entire application.

### 18.8 Production Reliability and Operations

Production must support:

- Error logging.
- Monitoring.
- Database backups.
- A recovery strategy.
- Safe migrations.

The exact operational tools and procedures remain deferred. These requirements do not select infrastructure or a migration approach.

**Traceability:** `SEARCH-008`, `DETAIL-002`, `DETAIL-007`, `PUB-003`, `SEC-016`, `SEC-017`, `REL-001` to `REL-009`, `SEO-012`, `DEFER-012`.

## 19. SEO Behavior

### 19.1 Property URLs and Metadata

Public property pages must:

- Use Latin/English slugs with a unique identifier in the property URL.
- Support a dynamic title.
- Support a dynamic meta description.
- Support a canonical URL.
- Support Open Graph metadata.
- Support a social sharing image.
- Support structured data where appropriate.

A valid example URL pattern is `/properties/apartment-for-sale-shebin-el-kom-a8f32`.

Customer-facing property content and SEO metadata must be Arabic. Latin/English is permitted for property URL slugs and unique identifiers.

### 19.2 Indexing and Visibility

- Only approved and published properties may participate in public property indexing behavior.
- Draft and unpublished properties must not be included in the public sitemap.
- Unpublished properties must not be publicly indexable.
- Search and filter combinations must not automatically create unlimited indexable SEO pages.
- Location and category pages may be indexable only when they provide meaningful content.
- Local SEO must focus on the target Egyptian governorate or area.

The SRS does not add new indexable page types or define which specific location or category pages qualify. Exact meaningful-content rules remain deferred.

### 19.3 Site-Level SEO Behavior

The site must provide:

- A sitemap.
- A robots.txt file.
- Proper 404 handling.

The SRS does not choose how these behaviors are technically produced.

**Traceability:** `PROJ-002` to `PROJ-004`, `SEO-001` to `SEO-017`, `PUB-002`, `PUB-003`, `DEFER-001`, `DEFER-006`, `DEFER-011`.

## 20. Analytics Behavior

### 20.1 Expected Events

The system is expected to track the following business and interaction events:

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

Important conversions are:

- Viewing request.
- Property request.
- Listing request.
- Service request.

### 20.2 Data Boundary

Analytics must not contain unnecessary personal customer data, including phone numbers or full request content.

### 20.3 Non-Blocking Behavior

Analytics processing is secondary to the business action. Failure to record an analytics event must not prevent a valid customer form submission, lead creation, request success outcome, or other core customer action from completing.

Facebook Pixel and TikTok Pixel remain optional and deferred. No analytics provider is selected by this SRS.

**Traceability:** `ANALYTICS-001` to `ANALYTICS-013`, `REL-003`, `DEFER-007`.

## 21. Security Behavior

### 21.1 Authentication and Authorization

- Admin users must authenticate before protected Admin access.
- Server-side authorization must protect every Admin operation and mutation.
- Public customers must not be required to authenticate for customer-facing flows.
- Hiding controls in a user interface is not sufficient protection.

### 21.2 Validation and Abuse Protection

- Server-side validation is required for public forms, Admin-submitted data, dynamic property fields, dynamic service forms, prices, filters, and uploads where applicable.
- Public forms must have rate limiting.
- Public forms must have anti-spam protection.
- Untrusted input must be handled safely.
- Invalid values must not be used to create invalid leads, publish properties, bypass category rules, or access unpublished property information.

### 21.3 File, Customer, and Secret Protection

- File uploads must be secure and validated server-side.
- Customer data must be protected.
- Secrets must be supplied through environment variables.
- Authentication cookies must be secure where applicable.
- Production traffic must use HTTPS.

### 21.4 Safe Data Operations and Errors

- Database queries must be safe.
- Production errors must be safe for customers.
- Internal errors, stack traces, database details, and secrets must never be exposed to customers.

The SRS does not select security libraries, authentication providers, storage providers, or infrastructure.

**Traceability:** `AUTH-001` to `AUTH-005`, `SEC-001` to `SEC-019`, `FIELD-009`, `FIELD-010`, `SEARCH-012`, `SERVICE-011`, `PUB-003`, `DEFER-009`.

## 22. Performance Behavior

The application behavior must prioritize:

- Mobile performance.
- Fast property pages.
- Optimized property images.
- Lazy loading where appropriate.
- Incremental property loading.
- Efficient filtering.
- Minimal unnecessary client-side JavaScript.
- Appropriate server rendering.
- Caching where appropriate.

The system should avoid loading unnecessary property images or data. Property listing and details behavior should request or present only the data and media needed for the current experience.

These are behavior and quality expectations, not a decision to use a particular rendering model, caching technology, image service, infrastructure, or client-side framework pattern.

### 22.2 Maintainability and Scalability Constraints

The project should prioritize:

- TypeScript.
- Modular code.
- Reusable components.
- Feature-oriented organization where appropriate.
- Separation of UI and business logic.
- Clear server and client boundaries.

The final architecture must be maintainable and scalable. The MVP must remain simple and avoid unnecessary enterprise complexity while remaining capable of growing in:

- Properties.
- Leads.
- Categories.
- Dynamic fields.
- Locations.
- Services.

This section records quality and growth expectations only. It does not select an architecture, code organization, rendering model, or deployment model.

**Traceability:** `PERF-001` to `PERF-010`, `SEARCH-009`, `IMAGE-002`, `REL-001`, `MAINT-001` to `MAINT-007`, `SCALE-001`, `SCALE-002`.

## 23. Accessibility and Responsive Behavior

### 23.1 Accessibility

The public and Admin experiences should:

- Use semantic HTML.
- Support keyboard navigation.
- Provide visible focus states.
- Use proper form labels.
- Provide accessible validation errors.
- Provide appropriate image alt text.
- Provide good contrast.
- Support reduced motion.

These expectations apply particularly to property cards, property filters, the property gallery, forms, and the Admin dashboard.

### 23.2 Responsive Behavior

The application must work properly across:

- Mobile.
- Tablet.
- Laptop.
- Desktop.
- Large screens.

Critical interfaces must remain usable across those screen classes, including:

- Property cards.
- Property filters.
- Property gallery.
- Customer forms.
- Admin dashboard.

**Traceability:** `A11Y-001` to `A11Y-008`, `RESP-001` to `RESP-006`.

## 24. Testing Specification

Testing must prioritize critical business logic and critical customer and Admin flows rather than arbitrary 100% coverage. The scenarios below describe expected behavior without selecting testing frameworks or implementation technologies.

### 24.1 Unit Scenarios

#### Dynamic Property Field Validation

- Accept a valid active field value for the selected category.
- Reject a missing required value.
- Reject an invalid option.
- Reject an unknown field ID.
- Reject a field that belongs to another category.
- Reject an inactive field submitted as active data.

#### Filter Logic

- Apply valid category, transaction, location, price, and dynamic filters.
- Reject or exclude an invalid filter.
- Remove or exclude filters that become irrelevant after a category change.
- Preserve applicable filters when the category changes.
- Return an empty result outcome when valid filters match no properties.

#### Business Rules

- Do not publish a property from a listing request submission.
- Do not expose an unpublished property publicly.
- Require the confirmed listing workflow and Admin approval before publication.
- Treat a viewing request as a request and not a confirmed booking.
- Keep customer flows available without accounts.

#### Price Validation

- Accept valid property price data.
- Reject invalid property price data server-side.

#### Lead Status Transitions

- Support `New`, `Contacted`, `In Progress`, `Completed`, and `Cancelled`.
- Support the confirmed progression from `New` through `Contacted` and `In Progress` to `Completed`.
- Do not introduce additional statuses.

**Traceability:** `TEST-UNIT-001` to `TEST-UNIT-005`, `FIELD-009`, `FIELD-010`, `SEARCH-010` to `SEARCH-012`, `PROP-011`, `LEAD-006`, `LEAD-008`, `PUB-001` to `PUB-006`, `BR-001` to `BR-015`.

### 24.2 Integration Scenarios

#### Customer Forms

- Submit customer-facing forms without authentication.
- Reject invalid form data on the server.
- Enforce required values and applicable dynamic form rules.
- Return safe validation and submission outcomes.

#### Server Operations

- Enforce Admin authentication and server-side authorization.
- Reject unauthorized Admin mutations.
- Enforce publication, visibility, category, dynamic field, filter, price, and upload rules server-side.

#### Database Operations

- Persist and retrieve valid business operations safely.
- Prevent unsafe input from becoming unsafe data operations.
- Do not expose database details in customer-facing errors.

The SRS does not select a database technology, schema, or data-access implementation.

#### Lead Creation

- Create the correct lead source for valid viewing, property, listing, service, and contact submissions.
- Do not create leads for invalid submissions.
- Preserve the supported lead lifecycle and statuses.

**Traceability:** `TEST-INT-001` to `TEST-INT-004`, `FLOW-001` to `FLOW-015`, `LEAD-001` to `LEAD-008`, `ADMIN-007` to `ADMIN-010`, `SEC-001` to `SEC-019`.

### 24.3 End-to-End Scenarios

#### Customer Scenarios

- Search -> Filter -> Property Details -> Viewing Request.
- Request a Property -> Form -> Submit.
- List Your Property -> Form -> Submit.
- Services -> Select Service -> Dynamic Form -> Submit.
- Contact -> Form -> Submit.

#### Admin Scenarios

- Admin Login -> Manage Property -> Publish.
- Admin Login -> Manage Property -> Unpublish or Archive where appropriate.
- Admin Login -> Manage Lead -> Change Status.

Each scenario must preserve the access, validation, publication, lead creation, and safe error behavior defined in this SRS.

**Traceability:** `TEST-E2E-001` to `TEST-E2E-007`.

## 25. Business Rules

The following rules are mandatory and must not be weakened for implementation convenience:

| ID | Mandatory rule |
| --- | --- |
| BR-001 | Customers do not need accounts. |
| BR-002 | Admin users require authentication. |
| BR-003 | Listing a property does not publish it automatically. |
| BR-004 | MKAAN reviews and prepares properties before publication. |
| BR-005 | Property fields and filters depend on category. |
| BR-006 | Viewing requests are requests, not confirmed bookings. |
| BR-007 | Service forms depend on the selected service. |
| BR-008 | Only published properties are public. |
| BR-009 | The MVP is Arabic-only and RTL. |
| BR-010 | Property URLs use Latin/English slugs with unique identifiers. |
| BR-011 | MKAAN handles professional property photography before publication. |
| BR-012 | Leads should not normally be permanently deleted. |
| BR-013 | MKAAN controls and coordinates the property preparation process when preparation is needed before publication. |
| BR-014 | A property cannot become public until the required listing workflow is complete and Admin approval has been granted. |
| BR-015 | Lead statuses support the lifecycle New, Contacted, In Progress, and Completed, with Cancelled available when applicable. |

**Traceability:** `BR-001` to `BR-015` in `MKAAN-REQUIREMENTS.md`.

## 26. Edge Cases

The following edge cases are directly implied by the approved requirements and must be handled without exposing internal details:

| Edge case | Required behavior |
| --- | --- |
| Invalid category | Reject or exclude the invalid category and do not apply unrelated category fields or filters. |
| Invalid dynamic field | Reject the submission and do not create or publish invalid property data. |
| Unknown field ID | Reject the untrusted submission. |
| Field from another category | Reject the field for the selected category. |
| Inactive field | Do not accept it as active submitted property data. |
| Invalid filter | Do not keep or apply it as an active valid filter. |
| Filter becomes irrelevant after category change | Remove or exclude it from the active criteria. |
| Unpublished property access | Do not expose the property publicly or index it. |
| Missing property | Return proper not-found behavior. |
| Invalid property identifier | Return safe not-found or invalid-request behavior without arbitrary data access. |
| Empty search results | Present an empty state, not an application failure. |
| More results unavailable | Communicate that no more results exist. |
| Search failure | Present a safe error state and do not show false results. |
| Required form value missing | Reject server-side and do not create the related lead. |
| Invalid service selection | Do not display or accept a valid service request for an unsupported selection. |
| Failed form submission | Present a safe failure outcome and do not create an invalid lead or publish a property. |
| Unauthorized Admin action | Deny the operation server-side. |
| Failed property image | Keep the gallery usable. |
| Failed similar properties | Keep the primary property page and CTA usable. |
| Analytics failure | Do not block a core customer action or form submission. |
| Repeated viewing submission | Apply the confirmed validation, rate-limiting, and anti-spam behavior. No separate duplicate policy is defined. |

**Traceability:** `FIELD-009`, `FIELD-010`, `SEARCH-008` to `SEARCH-012`, `DETAIL-002`, `DETAIL-007`, `FLOW-004` to `FLOW-007`, `PUB-001` to `PUB-006`, `SEC-001` to `SEC-019`, `REL-001` to `REL-004`.

## 27. Deferred Decisions

Deferred decisions remain unresolved and must not be silently selected by the SRS.

### 27.1 Deferred Product and Business Decisions

| Source ID | Deferred decision | Confirmed behavior that remains in force |
| --- | --- | --- |
| `DEFER-001` | The specific Egyptian governorate or area. | MKAAN remains focused on a specific Egyptian governorate or area. |
| `DEFER-004` | Exact service-specific fields for the three services. | The selected service determines a dynamic form and server-side validation applies. |
| `DEFER-005` | The representative service example for demonstrating dynamic form structure. | The MVP may demonstrate the dynamic structure with one representative example. |
| `DEFER-006` | The structured data types appropriate for supported public pages and properties. | Property pages must support structured data where appropriate. |
| `DEFER-010` | Exact publication status names, transition permissions, and operational details. | The listing workflow order, non-public pre-approval behavior, Admin approval requirement, and publication rule are confirmed. |
| `DEFER-011` | Exact meaningful-content rules for indexable location and category pages. | Such pages may be indexable only when they provide meaningful content. |

The approved Requirements Document does not define complete field lists for Request a Property, Request a Viewing, List Your Property, or Contact. This SRS therefore defines only their confirmed purposes, associations, validation behavior, submission behavior, and lead outcomes. It does not add form fields.

### 27.2 Deferred Technical and Operational Decisions

| Source ID | Deferred decision |
| --- | --- |
| `DEFER-002` | Exact application architecture within the Full-Stack Next.js direction. |
| `DEFER-003` | Image storage architecture and provider. |
| `DEFER-007` | Whether Facebook Pixel and TikTok Pixel will be used and their implementation details. |
| `DEFER-008` | Exact validation constraints for each dynamic field type, category, filter, price, form, and upload. The requirement for server-side validation is confirmed. |
| `DEFER-009` | Detailed Admin authentication and authorization design. Server-side authorization is confirmed; no multi-role model is added. |
| `DEFER-012` | Exact tools and procedures for error logging, monitoring, database backups, recovery, and safe migrations. |

The SRS does not choose a database, schema, ORM, authentication provider, image storage provider, security library, analytics provider, caching technology, testing framework, infrastructure, or deployment model.

**Traceability:** `DEFER-001` to `DEFER-012` in `MKAAN-REQUIREMENTS.md`.

## 28. Traceability

The following map connects the SRS sections to the approved Requirements Document IDs.

| SRS section | Requirements Document IDs |
| --- | --- |
| 1. Document Overview | `PROJ-001` to `PROJ-007`, `CON-001` to `CON-009` |
| 2. Actors and Access Model | `OBJ-008`, `AUTH-001` to `AUTH-005`, `CUSTOMER-001` to `CUSTOMER-004`, `ADMIN-001` to `ADMIN-010`, `SEC-001`, `SEC-002` |
| 3. Customer Journey | `OBJ-001` to `OBJ-007`, `CUSTOMER-001` to `CUSTOMER-004`, `FLOW-001` to `FLOW-015` |
| 4. Property Domain Behavior | `PROP-001` to `PROP-011`, `DETAIL-001` to `DETAIL-007`, `PUB-001` to `PUB-006` |
| 5. Dynamic Property Fields | `FIELD-001` to `FIELD-010`, `PROP-009`, `PROP-010`, `SEC-003`, `SEC-004`, `SEC-018` |
| 6. Property Search and Filtering | `SEARCH-001` to `SEARCH-012`, `PROP-002` to `PROP-006`, `PUB-002`, `PUB-003` |
| 7. Property Details | `DETAIL-001` to `DETAIL-009`, `IMAGE-001` to `IMAGE-004`, `REL-001`, `REL-002`, `REL-004` |
| 8. Request a Property Flow | `FLOW-001` to `FLOW-003`, `LEAD-002`, `SEC-003`, `SEC-007`, `SEC-008`, `SEC-018` |
| 9. Request a Viewing Flow | `FLOW-004` to `FLOW-007`, `LEAD-001`, `SEC-003`, `SEC-005`, `SEC-007`, `SEC-008`, `SEC-018` |
| 10. List Your Property Flow | `FLOW-008` to `FLOW-012`, `PREP-001` to `PREP-003`, `PUB-001` to `PUB-006`, `BR-003`, `BR-004`, `BR-011`, `BR-013`, `BR-014` |
| 11. Property Preparation | `PREP-001` to `PREP-003`, `BR-004`, `BR-013` |
| 12. Services | `SERVICE-001` to `SERVICE-011`, `LEAD-004`, `SEC-003`, `SEC-007`, `SEC-008`, `SEC-018` |
| 13. Leads | `LEAD-001` to `LEAD-008`, `ADMIN-005`, `BR-012`, `BR-015` |
| 14. Admin Behavior | `AUTH-003` to `AUTH-005`, `ADMIN-001` to `ADMIN-010`, `SEC-001`, `SEC-002`, `SEC-006` |
| 15. Publishing and Visibility | `FLOW-009` to `FLOW-011`, `PUB-001` to `PUB-006`, `IMAGE-001`, `SEO-013`, `BR-003`, `BR-008`, `BR-014` |
| 16. Media Behavior | `IMAGE-001` to `IMAGE-005`, `FLOW-011`, `SEC-009`, `SEC-019`, `REL-004` |
| 17. Forms and Validation | `AUTH-002`, `FLOW-001` to `FLOW-015`, `SERVICE-005` to `SERVICE-011`, `SEC-003`, `SEC-004`, `SEC-007` to `SEC-009`, `SEC-018`, `SEC-019` |
| 18. Error, Loading, and Empty States | `SEARCH-008`, `DETAIL-002`, `DETAIL-007`, `REL-001` to `REL-009`, `SEO-012`, `SEC-016`, `SEC-017`, `DEFER-012` |
| 19. SEO Behavior | `SEO-001` to `SEO-017`, `PUB-002`, `PUB-003`, `PROJ-002` to `PROJ-004` |
| 20. Analytics Behavior | `ANALYTICS-001` to `ANALYTICS-013`, `REL-003` |
| 21. Security Behavior | `AUTH-001` to `AUTH-005`, `SEC-001` to `SEC-019`, `FIELD-009`, `FIELD-010`, `SEARCH-012`, `SERVICE-011` |
| 22. Performance Behavior | `PERF-001` to `PERF-010`, `SEARCH-009`, `IMAGE-002`, `REL-001`, `MAINT-001` to `MAINT-007`, `SCALE-001`, `SCALE-002` |
| 23. Accessibility and Responsive Behavior | `A11Y-001` to `A11Y-008`, `RESP-001` to `RESP-006` |
| 24. Testing Specification | `TEST-UNIT-001` to `TEST-UNIT-005`, `TEST-INT-001` to `TEST-INT-004`, `TEST-E2E-001` to `TEST-E2E-007` |
| 25. Business Rules | `BR-001` to `BR-015` |
| 26. Edge Cases | `FIELD-009`, `FIELD-010`, `SEARCH-008` to `SEARCH-012`, `PUB-001` to `PUB-006`, `SEC-001` to `SEC-019`, `REL-001` to `REL-004` |
| 27. Deferred Decisions | `DEFER-001` to `DEFER-012` |

## Scope and Implementation Boundary

This SRS is limited to the confirmed MKAAN MVP behavior. It does not authorize or define:

- Customer accounts or customer dashboards.
- Wishlists or favorites.
- Real-time chat.
- Online payments.
- Complex booking engines.
- Mobile applications.
- Microservices.
- Complex role systems.
- Unrequested notifications or integrations.
- Application pages, components, database schemas, or implementation architecture.

**Traceability:** `SCALE-001`, `SCALE-002`, and the explicit exclusions in section 19.2 of `MKAAN-REQUIREMENTS.md`.
