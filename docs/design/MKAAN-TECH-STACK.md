# MKAAN Technology Stack

## 1. Core

- **Next.js 16**: Full-stack application framework and application boundary.
- **React 19**: UI runtime used by the Next.js application.
- **TypeScript**: Primary language for presentation, application, domain, and data-access contracts.
- **Next.js App Router**: Routing and server/client composition model.
- **Modular Monolith**: One deployable Next.js application containing isolated feature modules. No separate backend application or microservices are introduced.

## 2. UI

- **Tailwind CSS**: Utility-based styling within the presentation layer. The MVP is Arabic-only and RTL.
- **shadcn/ui**: Reusable accessible UI primitives. It owns presentation primitives, not business rules.
- **Lucide React**: Icon library used by the presentation layer.

## 3. Forms and Validation

- **React Hook Form**: Client-side form state, field registration, and usable form interaction.
- **Zod**: Structural input validation contracts. It supports, but does not replace, server-side business-rule validation.

Client-side validation is an interaction aid only. The server remains authoritative for required values, dynamic fields, service forms, prices, uploads, filters, and lead submissions.

## 4. Server and Data

- **Next.js Full-Stack**: Hosts the public experience, Admin experience, server-side application operations, domain coordination, and integration boundaries in one application.
- **Prisma**: The only ORM and data-access boundary. Presentation and domain code must not use Prisma directly.
- **PostgreSQL**: Relational database technology and system of record for MKAAN business data.
- **Neon**: Confirmed PostgreSQL provider. Provider-specific operational configuration remains outside this design.

The intended boundary is:

```text
Presentation
  -> Server-side application operations
  -> Domain rules
  -> Feature-owned repositories/data-access services
  -> Prisma
  -> PostgreSQL on Neon
```

## 5. Authentication

- **Clerk**: Authentication provider for Admin users.
- **Scope now**: Admin authentication, server-side authentication verification, and server-side authorization.
- **Customer authentication**: Deferred to a future phase. Customers are anonymous in the MVP and have no accounts, profiles, dashboards, or customer roles.

Clerk owns authentication identity and session verification. The MKAAN application owns the decision whether an authenticated Clerk identity is authorized to perform an Admin operation.

## 6. Code Quality

- **ESLint**: Static code-quality and linting rules.
- **Prettier**: Consistent formatting.
- **TypeScript**: Compile-time contracts across module and layer boundaries.

## 7. Package Management

- **pnpm**: Package manager and dependency-locking workflow.

## 8. Version Control

- **Git**: Source history and change tracking.
- **GitHub**: Remote repository and collaboration platform.

## 9. Deferred Technologies

The following providers or implementation stacks are intentionally not selected:

- **Image Storage Provider**: Deferred. Media must use a replaceable storage boundary and must not store Base64 image data in PostgreSQL.
- **Analytics Provider**: Deferred. Analytics events must use a replaceable delivery boundary. Facebook Pixel and TikTok Pixel remain optional, not selected.
- **Hosting/Deployment Provider**: Deferred.
- **Monitoring Provider**: Deferred.
- **Backup Provider**: Deferred.
- **Testing Stack**: Deferred. Testing implementation is postponed; no framework is selected or installed in this phase.

Other unresolved product and design decisions remain documented in `docs/design/MKAAN-DESIGN.md`.

## 10. Technology Responsibilities

| Technology | Architectural layer | Owns | Must not own |
| --- | --- | --- | --- |
| Next.js 16 | Application boundary and delivery | One full-stack runtime, server/client composition, request entry boundaries | Domain policy or direct authorization by UI visibility |
| React 19 | Presentation | Rendering and interactive UI behavior | Persistence, publication decisions, or authoritative validation |
| App Router | Presentation/application entry | Route composition and public/Admin boundary organization | Business rules or Prisma access |
| TypeScript | All layers | Static contracts and module boundaries | Runtime validation by itself |
| Tailwind CSS | Presentation | Styling and RTL layout support | Business behavior |
| shadcn/ui | Presentation | Reusable accessible visual primitives | Domain logic, data access, or authorization |
| Lucide React | Presentation | Icons | Meaningful business decisions |
| React Hook Form | Presentation | Form state and client interaction | Server-side trust decisions or lead creation |
| Zod | Validation boundary | Input shape and structural validation | Authorization, database constraints, or deferred business rules by assumption |
| Prisma | Data-access layer | ORM operations, query mapping, and PostgreSQL access | UI rendering, Clerk authentication, or external provider policy |
| PostgreSQL | Persistence | Durable relational business data and integrity constraints | Authentication sessions, image binaries, or analytics-provider behavior |
| Neon | Database provider | PostgreSQL hosting/provider boundary | Application business rules or data-access contracts |
| Clerk | Authentication integration | Admin identity authentication and server-side session verification | Customer accounts in the MVP, MKAAN business authorization policy, or lead ownership |
| ESLint | Code quality | Static linting | Runtime security or business validation |
| Prettier | Code quality | Formatting consistency | Architecture or behavior decisions |
| pnpm | Project tooling | Dependency management | Runtime application behavior |
| Git/GitHub | Collaboration | Version control and repository collaboration | Deployment, monitoring, or backup guarantees |

## 11. Technology Constraints

- Prisma is the only ORM/data-access layer.
- PostgreSQL is the database technology.
- Neon is the PostgreSQL provider.
- Clerk handles Admin authentication.
- Server-side authorization is required for every protected Admin operation and mutation.
- Customers remain anonymous in the MVP.
- Business rules must not live inside UI components.
- Presentation must not access Prisma directly.
- Client-side validation must not be treated as authoritative.
- The application remains a modular monolith with no separate backend application.
- Image storage and analytics providers must remain replaceable until explicitly selected.
- Deferred providers must not leak into domain rules or feature contracts.
- Testing implementation is postponed, but module boundaries must remain testable later.
- Arabic-only customer-facing content and RTL behavior are MVP constraints.
- No customer accounts, customer dashboards, complex roles, booking engine, payments, chat, favorites, or other excluded capabilities may be introduced without an explicit scope decision.
