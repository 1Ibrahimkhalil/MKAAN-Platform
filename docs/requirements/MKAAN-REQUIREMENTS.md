# MKAAN Requirements Document

**Project:** MKAAN  
**Document status:** Official MVP requirements  
**Language:** Arabic-only MVP  
**Direction:** Right-to-left (RTL)  
**Last updated:** 2026-08-17

## 1. Document Purpose

This document defines the confirmed requirements and boundaries for the MKAAN MVP. It records only decisions explicitly provided for the project. Items that have not been decided are listed under [Open Questions / Deferred Decisions](#22-open-questions--deferred-decisions) and must not be treated as requirements.

### 1.1 Priority Definitions

- **MVP:** Required for the MVP.
- **Important:** Required behavior or quality expectation for the MVP, subject to detailed design and implementation planning.
- **Deferred:** Not decided or intentionally postponed; no implementation choice is made by this document.

## 2. Project Definition and Scope

### 2.1 Confirmed Requirements

| ID | Priority | Requirement |
| --- | --- | --- |
| PROJ-001 | MVP | The project name is MKAAN. |
| PROJ-002 | MVP | MKAAN is a local Egyptian real-estate platform focused on a specific Egyptian governorate or area. |
| PROJ-003 | MVP | The MVP is Arabic-only. |
| PROJ-004 | MVP | The customer-facing experience is RTL. |
| PROJ-005 | MVP | The platform is Full-Stack Next.js. |
| PROJ-006 | MVP | There is no separate backend application. |
| PROJ-007 | MVP | MKAAN connects people looking for properties with available properties and provides property-related services. |

### 2.2 Core Objectives

| ID | Priority | Requirement |
| --- | --- | --- |
| OBJ-001 | MVP | Users must be able to discover properties. |
| OBJ-002 | MVP | Users must be able to search and filter properties. |
| OBJ-003 | MVP | Users must be able to view property details. |
| OBJ-004 | MVP | Customers must be able to request a property. |
| OBJ-005 | MVP | Customers must be able to request a property viewing. |
| OBJ-006 | MVP | Customers must be able to list a property through MKAAN. |
| OBJ-007 | MVP | Customers must be able to request property-related services. |
| OBJ-008 | MVP | Authorized Admin users must be able to manage properties and leads through an Admin dashboard. |

## 3. Access and Authentication

### 3.1 Confirmed Requirements

| ID | Priority | Requirement |
| --- | --- | --- |
| AUTH-001 | MVP | Customers must not need to register, log in, create an account, or manage a personal profile. |
| AUTH-002 | MVP | Customer-facing forms must work without customer authentication. |
| AUTH-003 | MVP | Admin users must authenticate before accessing the Admin dashboard. |
| AUTH-004 | MVP | Admin authorization must be enforced server-side. |
| AUTH-005 | MVP | Hiding Admin UI elements is not sufficient authorization. |

### 3.2 Customer Journey

| ID | Priority | Requirement |
| --- | --- | --- |
| CUSTOMER-001 | MVP | The public customer experience must provide an entry point for discovering and searching properties. |
| CUSTOMER-002 | MVP | The customer journey must support discovery or search, public property listing, property details, a relevant CTA, and the associated request or lead flow. |
| CUSTOMER-003 | MVP | Customers must be able to use the property, viewing, listing, service, and contact flows without an account or login. |
| CUSTOMER-004 | MVP | Relevant CTAs on property details must provide access to the applicable customer request flow. |

## 4. Property System

### 4.1 Confirmed Requirements

| ID | Priority | Requirement |
| --- | --- | --- |
| PROP-001 | MVP | The platform must support property categories. |
| PROP-002 | MVP | The platform must support properties for sale. |
| PROP-003 | MVP | The platform must support rental properties. |
| PROP-004 | MVP | The platform must support property locations. |
| PROP-005 | MVP | The platform must support dynamic property fields. |
| PROP-006 | MVP | The platform must support dynamic property filters. |
| PROP-007 | MVP | The platform must support property images and property details. |
| PROP-008 | MVP | The platform must support similar properties and featured properties. |
| PROP-009 | MVP | Property data must be category-aware. |
| PROP-010 | MVP | Categories may define different property fields and filters. Fields applicable to one category must not automatically appear for another category when they are not applicable. |
| PROP-011 | MVP | Property price data must be validated server-side. |

## 5. Dynamic Property Fields

### 5.1 Confirmed Requirements

| ID | Priority | Requirement |
| --- | --- | --- |
| FIELD-001 | MVP | Property fields must use a dynamic, category-based structure. |
| FIELD-002 | MVP | A dynamic field must support a field type. |
| FIELD-003 | MVP | A dynamic field must support required or optional status. |
| FIELD-004 | MVP | A dynamic field must support filterable or non-filterable status. |
| FIELD-005 | MVP | A dynamic field must support displayable or non-displayable status. |
| FIELD-006 | MVP | A dynamic field must support options when applicable. |
| FIELD-007 | MVP | A dynamic field must support display order. |
| FIELD-008 | MVP | A dynamic field must support active or inactive state. |
| FIELD-009 | MVP | The server must validate dynamic field values. |
| FIELD-010 | MVP | A customer or other untrusted caller must not be able to submit arbitrary field IDs or invalid dynamic field values. |

## 6. Property Search and Listing

### 6.1 Confirmed Requirements

| ID | Priority | Requirement |
| --- | --- | --- |
| SEARCH-001 | MVP | The public property listing must support search. |
| SEARCH-002 | MVP | The public property listing must support category filtering. |
| SEARCH-003 | MVP | The public property listing must support transaction type filtering. |
| SEARCH-004 | MVP | The public property listing must support location filtering. |
| SEARCH-005 | MVP | The public property listing must support price filtering. |
| SEARCH-006 | MVP | The public property listing must support dynamic category-specific filters. |
| SEARCH-007 | MVP | The public property listing must support sorting. |
| SEARCH-008 | MVP | The public property listing must provide empty states and loading states. |
| SEARCH-009 | MVP | The public property listing must support infinite scrolling or incremental loading. |
| SEARCH-010 | MVP | Filters must respect the selected property category. |
| SEARCH-011 | MVP | Invalid filters must not remain active when they are no longer applicable to the selected property category. |
| SEARCH-012 | MVP | Search and filter inputs and values must be validated against the selected category and its active filter definitions. |

## 7. Property Details

### 7.1 Confirmed Requirements

| ID | Priority | Requirement |
| --- | --- | --- |
| DETAIL-001 | MVP | A property details page must contain the important information required to understand the property. |
| DETAIL-002 | MVP | The property details page must support property images and a main image. |
| DETAIL-003 | MVP | The property details page must support general property information. |
| DETAIL-004 | MVP | The property details page must support category-specific information. |
| DETAIL-005 | MVP | The property details page must support location, price, and description. |
| DETAIL-006 | MVP | The property details page must provide relevant calls to action (CTAs). |
| DETAIL-007 | MVP | The property details page must support similar properties. |
| DETAIL-008 | MVP | A CTA section must appear before the Similar Properties section. |
| DETAIL-009 | Important | The design must remain consistent with the established MKAAN visual direction. |

## 8. Customer Request Flows

### 8.1 Request a Property

| ID | Priority | Requirement |
| --- | --- | --- |
| FLOW-001 | MVP | The platform must provide a Request a Property flow. |
| FLOW-002 | MVP | Customers must be able to describe the type of property they are looking for. |
| FLOW-003 | MVP | Submitting a property request must create a lead/request for MKAAN. |

### 8.2 Request a Viewing

| ID | Priority | Requirement |
| --- | --- | --- |
| FLOW-004 | MVP | Customers must be able to request a viewing for a property. |
| FLOW-005 | MVP | A viewing request is a request, not an automatically confirmed booking. |
| FLOW-006 | MVP | MKAAN must confirm the viewing. |
| FLOW-007 | MVP | A viewing request must create a lead. |

### 8.3 List Your Property

| ID | Priority | Requirement |
| --- | --- | --- |
| FLOW-008 | MVP | The platform must provide a List Your Property flow. |
| FLOW-009 | MVP | Submitting a listing form must not automatically publish the property. |
| FLOW-010 | MVP | The listing workflow must be: customer submission, MKAAN review, property inspection, property preparation if needed, professional photography, listing preparation, Admin approval, and property publication. |
| FLOW-011 | MVP | MKAAN is responsible for taking clear, professional property photos during or after inspection before publishing the listing. |
| FLOW-012 | MVP | A listing request must create a lead. |
| FLOW-013 | MVP | The platform must provide a Contact flow. |
| FLOW-014 | MVP | Customers must be able to submit a contact request without an account or login. |
| FLOW-015 | MVP | A contact request must create a lead. |

## 9. Property Preparation

| ID | Priority | Requirement |
| --- | --- | --- |
| PREP-001 | Important | MKAAN may provide preparation services to make a property ready for sale or rental. |
| PREP-002 | Important | Preparation may include maintenance, finishing, repairs, improvements, and general preparation. |
| PREP-003 | Important | The goal of preparation is to make the property presentable and ready for professional photography and marketing. |

## 10. Services

### 10.1 Confirmed Requirements

| ID | Priority | Requirement |
| --- | --- | --- |
| SERVICE-001 | MVP | The platform must provide one unified services entry point. |
| SERVICE-002 | MVP | The unified services entry point must contain Finishing. |
| SERVICE-003 | MVP | The unified services entry point must contain Maintenance. |
| SERVICE-004 | MVP | The unified services entry point must contain Prepare Your Property for Sale/Rent. |
| SERVICE-005 | MVP | Selecting a service must send the customer to a Service Request page. |
| SERVICE-006 | MVP | The selected service must be carried into the service request flow. |
| SERVICE-007 | MVP | The service request form must change based on the selected service. |
| SERVICE-008 | MVP | Service forms must be dynamic. |
| SERVICE-009 | Important | The current UI implementation only needs to demonstrate the dynamic form structure with a representative service example. |
| SERVICE-010 | MVP | A service request must create a lead. |
| SERVICE-011 | MVP | The selected service's dynamic form must be validated server-side according to its active form definition, including required fields and valid values. |

## 11. Leads

### 11.1 Confirmed Requirements

| ID | Priority | Requirement |
| --- | --- | --- |
| LEAD-001 | MVP | The system must support leads generated from property viewing requests. |
| LEAD-002 | MVP | The system must support leads generated from property requests. |
| LEAD-003 | MVP | The system must support leads generated from listing requests. |
| LEAD-004 | MVP | The system must support leads generated from service requests. |
| LEAD-005 | MVP | The system must support leads generated from contact requests. |
| LEAD-006 | MVP | Lead statuses must support New, Contacted, In Progress, Completed, and Cancelled. |
| LEAD-007 | MVP | Leads are business records and should not normally be permanently deleted. |
| LEAD-008 | MVP | The lead lifecycle must support progression from New to Contacted to In Progress to Completed, with Cancelled supported when applicable. |

## 12. Admin Dashboard

### 12.1 Confirmed Requirements

| ID | Priority | Requirement |
| --- | --- | --- |
| ADMIN-001 | MVP | Authorized Admin users must be able to manage properties. |
| ADMIN-002 | MVP | Authorized Admin users must be able to manage categories. |
| ADMIN-003 | MVP | Authorized Admin users must be able to manage dynamic fields. |
| ADMIN-004 | MVP | Authorized Admin users must be able to manage locations. |
| ADMIN-005 | MVP | Authorized Admin users must be able to manage leads. |
| ADMIN-006 | MVP | Authorized Admin users must be able to manage services. |
| ADMIN-007 | MVP | Authentication is required for the Admin dashboard. |
| ADMIN-008 | MVP | Server-side authorization must protect Admin operations and mutations. |
| ADMIN-009 | MVP | Authorized Admin users must be able to manage property publication state, including publishing. |
| ADMIN-010 | MVP | Authorized Admin users must be able to unpublish or archive properties where appropriate. |

## 13. Publishing, Visibility, and Images

### 13.1 Publishing and Status

| ID | Priority | Requirement |
| --- | --- | --- |
| PUB-001 | MVP | A submitted listing request must not make a property publicly visible. |
| PUB-002 | MVP | Only approved and published properties may appear in public property listings. |
| PUB-003 | MVP | Unpublished properties must not be publicly indexable. |
| PUB-004 | MVP | The system must distinguish publicly published properties from properties that are not publicly available. |
| PUB-005 | MVP | Archiving or unpublishing should be preferred over destructive deletion where appropriate. |
| PUB-006 | MVP | A property must not be published until the required listing workflow steps are complete and Admin approval has been granted. |

### 13.2 Images

| ID | Priority | Requirement |
| --- | --- | --- |
| IMAGE-001 | MVP | Each published property must have a main image. |
| IMAGE-002 | MVP | The system must support multiple images for a property. |
| IMAGE-003 | MVP | Image uploads must be validated server-side. |
| IMAGE-004 | MVP | Images must not be stored as Base64 data inside the database. |
| IMAGE-005 | Deferred | The storage architecture for images is not decided by this document. |

## 14. SEO and Discoverability

### 14.1 Confirmed Requirements

| ID | Priority | Requirement |
| --- | --- | --- |
| SEO-001 | MVP | Property pages must be SEO-friendly within the Arabic-only MVP. |
| SEO-002 | MVP | Property URLs must use Latin/English slugs with a unique identifier. |
| SEO-003 | MVP | A property URL may follow the pattern `/properties/apartment-for-sale-shebin-el-kom-a8f32`. |
| SEO-004 | MVP | Property pages must support a dynamic title. |
| SEO-005 | MVP | Property pages must support a dynamic meta description. |
| SEO-006 | MVP | Property pages must support a canonical URL. |
| SEO-007 | MVP | Property pages must support Open Graph metadata. |
| SEO-008 | MVP | Property pages must support a social sharing image. |
| SEO-009 | MVP | Property pages must support structured data where appropriate. |
| SEO-010 | MVP | The site must provide a sitemap. |
| SEO-011 | MVP | The site must provide a robots.txt file. |
| SEO-012 | MVP | The site must provide proper 404 handling. |
| SEO-013 | MVP | Draft and unpublished properties must not be included in the public sitemap. |
| SEO-014 | MVP | Search and filter combinations must not automatically generate unlimited indexable SEO pages. |
| SEO-015 | Important | Location and category pages may be indexable when they provide meaningful content. |
| SEO-016 | Important | Local SEO must focus on the target Egyptian governorate or area. |
| SEO-017 | MVP | Customer-facing property content and SEO metadata must be Arabic; Latin/English is permitted for property URL slugs and unique identifiers. |

## 15. Analytics and Marketing Tracking

### 15.1 Events

| ID | Priority | Requirement |
| --- | --- | --- |
| ANALYTICS-001 | Important | The system should track property views. |
| ANALYTICS-002 | Important | The system should track searches. |
| ANALYTICS-003 | Important | The system should track applied filters. |
| ANALYTICS-004 | Important | The system should track when a viewing request is started. |
| ANALYTICS-005 | Important | The system should track submitted viewing requests. |
| ANALYTICS-006 | Important | The system should track submitted property requests. |
| ANALYTICS-007 | Important | The system should track submitted listing requests. |
| ANALYTICS-008 | Important | The system should track submitted service requests. |
| ANALYTICS-009 | Important | The system should track submitted contact requests. |
| ANALYTICS-010 | Important | The system should track CTA clicks. |
| ANALYTICS-011 | Important | Important conversions are viewing requests, property requests, listing requests, and service requests. |
| ANALYTICS-012 | Deferred | Facebook Pixel and TikTok Pixel may be used for marketing and conversion tracking. |

### 15.2 Analytics Data Boundary

| ID | Priority | Requirement |
| --- | --- | --- |
| ANALYTICS-013 | MVP | Analytics must not contain unnecessary personal customer data, including phone numbers or full request content. |

## 16. Security and Data Protection

### 16.1 Confirmed Requirements

| ID | Priority | Requirement |
| --- | --- | --- |
| SEC-001 | MVP | Admin authentication is required. |
| SEC-002 | MVP | Authorization must be enforced server-side. |
| SEC-003 | MVP | Input and form data must be validated server-side. |
| SEC-004 | MVP | Dynamic field values must be validated server-side. |
| SEC-005 | MVP | Property access must be validated. |
| SEC-006 | MVP | Admin mutations must be secured. |
| SEC-007 | MVP | Public forms must have rate limiting. |
| SEC-008 | MVP | Public forms must have anti-spam protection. |
| SEC-009 | MVP | File uploads must be secure. |
| SEC-010 | MVP | Customer data must be protected. |
| SEC-011 | MVP | Secrets must be provided through environment variables. |
| SEC-012 | MVP | Production traffic must use HTTPS. |
| SEC-013 | MVP | Authentication cookies must be secure where applicable. |
| SEC-014 | MVP | Inputs must be handled safely. |
| SEC-015 | MVP | Database queries must be safe. |
| SEC-016 | MVP | Production error messages must be safe. |
| SEC-017 | MVP | Internal errors, stack traces, database details, and secrets must never be exposed to customers. |
| SEC-018 | MVP | Required fields and valid values must be enforced server-side for every public form according to that form's applicable business rules. |
| SEC-019 | MVP | All file uploads, where supported, must be validated server-side for safety and validity. |

## 17. Quality Requirements

### 17.1 Performance

| ID | Priority | Requirement |
| --- | --- | --- |
| PERF-001 | Important | The application must prioritize mobile performance. |
| PERF-002 | Important | Property pages must load quickly. |
| PERF-003 | Important | Images must be optimized. |
| PERF-004 | Important | Lazy loading must be used where appropriate. |
| PERF-005 | Important | Property results must load incrementally. |
| PERF-006 | Important | Filtering must be efficient. |
| PERF-007 | Important | The application must minimize unnecessary client-side JavaScript. |
| PERF-008 | Important | Server rendering must be used appropriately. |
| PERF-009 | Important | Caching must be used where appropriate. |
| PERF-010 | Important | The application should avoid loading unnecessary property images or data. |

### 17.2 Accessibility

| ID | Priority | Requirement |
| --- | --- | --- |
| A11Y-001 | Important | The application should use semantic HTML. |
| A11Y-002 | Important | The application should support keyboard navigation. |
| A11Y-003 | Important | Focus states should be visible. |
| A11Y-004 | Important | Forms should have proper labels. |
| A11Y-005 | Important | Form errors should be accessible. |
| A11Y-006 | Important | Images should have appropriate alt text. |
| A11Y-007 | Important | The application should provide good contrast. |
| A11Y-008 | Important | The application should support reduced motion. |

### 17.3 Responsive Design

| ID | Priority | Requirement |
| --- | --- | --- |
| RESP-001 | Important | The application must work properly on mobile, tablet, laptop, desktop, and large screens. |
| RESP-002 | Important | Property cards must be responsive. |
| RESP-003 | Important | Property filters must be responsive. |
| RESP-004 | Important | The property gallery must be responsive. |
| RESP-005 | Important | Customer forms must be responsive. |
| RESP-006 | Important | The Admin dashboard must be responsive. |

### 17.4 Reliability and Operations

| ID | Priority | Requirement |
| --- | --- | --- |
| REL-001 | Important | Failure of an individual feature must not unnecessarily break the entire application. |
| REL-002 | Important | Failure to load similar properties must not break a property page. |
| REL-003 | Important | Analytics failure must not prevent form submission. |
| REL-004 | Important | One failed image must not break the entire property gallery. |
| REL-005 | Important | Production must support error logging. |
| REL-006 | Important | Production must support monitoring. |
| REL-007 | Important | Production must support database backups. |
| REL-008 | Important | Production must support a recovery strategy. |
| REL-009 | Important | Production must support safe migrations. |

## 18. Testing Requirements

Testing should prioritize critical business logic and critical user flows rather than arbitrary 100% coverage.

### 18.1 Unit Testing

| ID | Priority | Area |
| --- | --- | --- |
| TEST-UNIT-001 | Important | Dynamic field validation |
| TEST-UNIT-002 | Important | Filter logic |
| TEST-UNIT-003 | Important | Business rules |
| TEST-UNIT-004 | Important | Price validation |
| TEST-UNIT-005 | Important | Lead status transitions |

### 18.2 Integration Testing

| ID | Priority | Area |
| --- | --- | --- |
| TEST-INT-001 | Important | Customer forms |
| TEST-INT-002 | Important | Server-side operations |
| TEST-INT-003 | Important | Database operations |
| TEST-INT-004 | Important | Lead creation |

### 18.3 End-to-End Testing

| ID | Priority | Flow |
| --- | --- | --- |
| TEST-E2E-001 | Important | Property search, filter, property details, and viewing request |
| TEST-E2E-002 | Important | Property request form and submission |
| TEST-E2E-003 | Important | List Your Property form and submission |
| TEST-E2E-004 | Important | Services, service selection, dynamic form, and submission |
| TEST-E2E-005 | Important | Admin login, property management, publication, and unpublishing or archiving where appropriate |
| TEST-E2E-006 | Important | Admin login, lead management, and status change |
| TEST-E2E-007 | Important | Contact flow and submission |

## 19. Maintainability and Scalability

### 19.1 Confirmed Requirements

| ID | Priority | Requirement |
| --- | --- | --- |
| MAINT-001 | Important | The final architecture must be maintainable and scalable. |
| MAINT-002 | Important | The project should prioritize TypeScript. |
| MAINT-003 | Important | The project should use modular code. |
| MAINT-004 | Important | The project should use reusable components. |
| MAINT-005 | Important | Feature-oriented organization should be used where appropriate. |
| MAINT-006 | Important | UI and business logic should be separated. |
| MAINT-007 | Important | Server and client boundaries should be clear. |
| SCALE-001 | MVP | The MVP must remain simple and avoid unnecessary enterprise complexity. |
| SCALE-002 | Important | The system must remain capable of growing in properties, leads, categories, dynamic fields, locations, and services. |

### 19.2 Explicitly Excluded Unless Added Later

The following are outside the MVP scope and must not be introduced unless explicitly required later:

- Microservices
- Customer accounts
- Real-time chat
- Complex role systems
- Mobile applications
- Complex booking engines
- Customer dashboards
- Wishlists
- Favorites
- Online payments
- Unrequested notifications
- Unrequested integrations

## 20. Explicit Business Rules

The following rules are mandatory and take precedence over interface behavior or implementation convenience.

| ID | Business rule |
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

## 21. Constraints

| ID | Constraint |
| --- | --- |
| CON-001 | The MVP is for a specific Egyptian governorate or area, but the exact target area is not named in this document. |
| CON-002 | Customers have no authenticated accounts or personal profiles. |
| CON-003 | Only Admin users authenticate. |
| CON-004 | There is no separate backend application. |
| CON-005 | The project direction is Full-Stack Next.js. |
| CON-006 | The MVP is Arabic-only and RTL. |
| CON-007 | Public visibility is limited to approved and published properties. |
| CON-008 | Image data must not be stored as Base64 in the database. |
| CON-009 | No application scope beyond the stated requirements should be added. |

## 22. Open Questions / Deferred Decisions

The following items are intentionally unresolved. This document does not select an answer for them.

| ID | Topic | Deferred decision |
| --- | --- | --- |
| DEFER-001 | Target geography | Which specific Egyptian governorate or area is the initial MKAAN focus? |
| DEFER-002 | Exact architecture | What exact application architecture will be used within the Full-Stack Next.js direction? |
| DEFER-003 | Image storage | What storage architecture will be used for property images? |
| DEFER-004 | Service fields | What exact service-specific fields are required for Finishing, Maintenance, and Prepare Your Property for Sale/Rent? These will be finalized in the detailed requirements/SRS. |
| DEFER-005 | Representative service example | Which representative service will be used to demonstrate the dynamic service form structure? |
| DEFER-006 | Structured data | Which structured data types are appropriate for the supported public pages and properties? |
| DEFER-007 | Analytics providers | Whether Facebook Pixel and TikTok Pixel will be used, and their implementation details. |
| DEFER-008 | Detailed validation rules | The exact validation constraints for each dynamic field type, property category, filter, price, form, and upload remain to be specified in the detailed requirements/SRS. Server-side validation remains an MVP requirement. |
| DEFER-009 | Detailed Admin model | The detailed Admin authentication and authorization design remains to be specified. This does not remove the requirement for server-side authorization. |
| DEFER-010 | Detailed publication workflow | The exact status names, transition permissions, and operational details for inspection, preparation, photography, listing preparation, review, approval, publication, unpublishing, and archiving remain to be specified. The required workflow order and Admin approval rule are confirmed MVP requirements. |
| DEFER-011 | Detailed SEO content | The exact meaningful content requirements for indexable location and category pages remain to be specified. |
| DEFER-012 | Operational tooling | The exact error logging, monitoring, backup, recovery, and migration tools and procedures remain to be specified. |

## 23. Contradiction Review

No direct contradictions were identified in the supplied requirements.

The following points are compatible but require later detail:

- Full-Stack Next.js is confirmed, while the exact architecture is deferred.
- Customers use all public flows without accounts, while Admin access requires authentication and server-side authorization.
- The MVP is Arabic-only, while property URLs are explicitly required to use Latin/English slugs and unique identifiers.
- Viewing requests create leads but are not confirmed bookings; MKAAN confirmation remains part of the business workflow.
- Listing requests create leads but do not publish properties; publication requires the stated review, preparation, photography, listing preparation, and Admin approval workflow.
- Service forms are required to be dynamic, while their exact service-specific fields are deferred to the detailed requirements/SRS.

## 24. MVP Boundary

The MKAAN MVP consists only of the capabilities, constraints, business rules, quality expectations, testing priorities, and exclusions defined in this document. Any feature, integration, workflow, data requirement, or technical decision not stated as confirmed must be treated as deferred or out of scope until explicitly added.
