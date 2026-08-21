# MKAAN Foundation Implementation Plan

**Project:** MKAAN  
**Document status:** Plan only; implementation not started  
**Scope:** Technical Foundation before Feature #1  
**Date:** 2026-08-21

## 1. Authority and Scope

This plan follows these sources in order:

1. `docs/requirements/MKAAN-REQUIREMENTS.md`
2. `docs/requirements/MKAAN-SRS.md`
3. `docs/design/MKAAN-SOFTWARE-DESIGN.md`
4. `docs/design/MKAAN-DESIGN-SYSTEM.md`

The current repository contains documentation and `opencode.json`, but no application source, `package.json`, lockfile, Next.js configuration, TypeScript configuration, Tailwind configuration, shadcn configuration, or test setup.

The Foundation will establish only the application and presentation baseline needed before feature work. It will not implement product features, business rules, persistence, APIs, authentication flows, external integrations, or feature-specific UI.

The Foundation must not resolve deferred decisions, including `DEFER-001`, `DEFER-002`, `DEFER-003`, `DEFER-004`, `DEFER-005`, `DEFER-007`, `DEFER-008`, `DEFER-009`, `DEFER-010`, `DEFER-011`, or `DEFER-012`.

## 2. Current State Inspection

### 2.1 Existing files

- `docs/requirements/MKAAN-REQUIREMENTS.md`
- `docs/requirements/MKAAN-SRS.md`
- `docs/design/MKAAN-SOFTWARE-DESIGN.md`
- `docs/design/MKAAN-DESIGN-SYSTEM.md`
- `docs/design/MKAAN-DESIGN.md`
- `docs/design/MKAAN-ARCHITECTURE.md`
- `docs/design/MKAAN-TECH-STACK.md`
- `docs/implementation/MKAAN-IMPLEMENTATION-PLAN.md`
- `docs/audits/MKAAN-UIUX-AUDIT.md`
- `opencode.json`

### 2.2 Existing application state

- No `package.json` exists.
- No `pnpm-lock.yaml` exists.
- No dependencies are installed or declared in the repository.
- No `src/` directory exists.
- No `app/` directory exists.
- No `next.config.*` exists.
- No `tsconfig.json` exists.
- No `tailwind.config.*` exists.
- No `postcss.config.*` exists.
- No `components.json` exists.
- No ESLint or Prettier configuration exists.
- No testing framework or test files exist.

### 2.3 Existing configuration boundary

`opencode.json` is an OpenCode MCP configuration and is not an application configuration file. It must not be modified by Foundation work. Its credential-bearing Stitch configuration must not be copied into application configuration or source code.

## 3. Dependency Strategy

The implementation phase must use established official packages and CLIs instead of manually recreating framework functionality.

### 3.1 Dependencies already present

None are declared in the repository. The only existing configuration is `opencode.json`, which is unrelated to the application runtime.

### 3.2 Dependencies to install during Foundation

| Purpose | Package/tool | Install during Foundation | Reason |
| --- | --- | --- | --- |
| Application framework | `next@16` | Yes | Confirmed Full-Stack Next.js and App Router foundation |
| UI runtime | `react@19`, `react-dom@19` | Yes | Confirmed React runtime |
| Type system | `typescript`, `@types/node`, `@types/react`, `@types/react-dom` | Yes | Confirmed TypeScript baseline and Next.js typing |
| Styling | `tailwindcss`, `@tailwindcss/postcss` | Yes | Confirmed Tailwind CSS styling foundation; exact major must be approved |
| Class composition | `clsx`, `tailwind-merge`, `class-variance-authority` | Yes | Standard shadcn/ui class composition and variants |
| shadcn primitives | `@radix-ui/react-slot` | Yes if generated primitives require it | Official Radix primitive used by shadcn buttons and composition |
| Icons | `lucide-react` | Yes | Confirmed implementation icon library in Software Design |
| Form foundation | `react-hook-form` | Yes | Confirmed client-side form state foundation; no forms implemented yet |
| Structural validation | `zod` | Yes | Confirmed structural validation contract; no product schemas yet |
| Code quality | `eslint`, `eslint-config-next` | Yes | Confirmed linting and Next.js rules |
| Formatting | `prettier`, `prettier-plugin-tailwindcss` | Yes | Confirmed formatting consistency and stable Tailwind class ordering |
| Package manager | pnpm via Corepack | Yes, if not available | Confirmed package manager; exact version requires approval |

### 3.3 Dependencies explicitly deferred

These must not be installed during Foundation:

- `prisma` and database drivers: Database & Persistence stage.
- `@clerk/nextjs`: Admin Authentication & Authorization stage.
- Image storage SDKs: image storage provider is deferred.
- Analytics SDKs: analytics provider is deferred.
- Rate-limit or anti-spam provider SDKs: provider selection is deferred.
- Monitoring, logging, backup, recovery, or deployment SDKs: operational tooling is deferred.
- Vitest, Jest, Playwright, Cypress, or another test framework: testing stack is deferred.
- Any package for customer accounts, customer profiles, booking, payments, chat, favorites, or notifications.

### 3.4 Later installation commands

The following are commands to execute only after this plan is approved. Exact versions must be chosen before execution and recorded in `package.json` and `pnpm-lock.yaml`.

```bash
corepack enable
corepack prepare pnpm@<approved-version> --activate
pnpm add next@16 react@19 react-dom@19 clsx tailwind-merge class-variance-authority lucide-react react-hook-form zod
pnpm add -D typescript @types/node @types/react @types/react-dom tailwindcss @tailwindcss/postcss eslint eslint-config-next prettier prettier-plugin-tailwindcss
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button card input label badge skeleton alert separator
```

`@radix-ui/react-slot` should be installed by the shadcn CLI when required by the selected primitives. It must not be manually recreated.

## 4. Foundation Implementation Steps

### Step 1: Select the Empty-Repository Conventions

**Objective:** Confirm only the technical conventions needed to bootstrap an empty repository.

**Required package(s):** None.

**Installation command(s) later:** None.

**Configuration required:** Approve `src/` as the source root, pnpm as the package manager, the Tailwind major/version, and the exact Node.js support range. Do not select a deferred product architecture.

**Files/directories expected:** No files during this planning step. Later work will use `src/` and the Foundation file list in Section 5.

**Source support:** Requirements `DEFER-002`, `MAINT-001` through `MAINT-007`; Software Design Sections 1.4, 2.1, 2.7, 3.6 through 3.8; Implementation Plan Stage 3.

**Prerequisites:** Plan approval.

**Verification criteria:** The selected conventions do not introduce feature modules, business rules, providers, database structure, or authentication behavior.

### Step 2: Bootstrap Next.js and Package Management

**Objective:** Create the minimum Next.js 16 and React 19 application package baseline.

**Required package(s):** `next@16`, `react@19`, `react-dom@19`, TypeScript type packages, pnpm.

**Installation command(s) later:** Use the commands in Section 3.4.

**Configuration required:** Add package scripts for development, build, type checking, linting, formatting, and formatting verification. Keep the Next.js configuration provider-neutral.

**Files/directories expected:** `package.json`, `pnpm-lock.yaml`, `next.config.ts`, `next-env.d.ts`.

**Source support:** Requirements `PROJ-005`, `PROJ-006`, `MAINT-002`; Software Design Sections 2.1, 2.5, 2.7; Implementation Plan Stage 3.

**Prerequisites:** Step 1 approval; approved Node.js and pnpm versions.

**Verification criteria:** `pnpm install --frozen-lockfile` succeeds after the lockfile exists; `next`, React, and TypeScript resolve; no feature dependency is installed.

### Step 3: Establish the Foundation Folder Structure

**Objective:** Create minimal folders that support the Software Design boundaries without implementing feature modules.

**Required package(s):** None beyond Step 2.

**Installation command(s) later:** None.

**Configuration required:** Use `src/` as the source root. Keep server, domain, data-access, integration, and feature directories reserved for later stages rather than creating speculative abstractions.

**Files/directories expected:**

```text
src/
  app/
  components/
    ui/
    feedback/
  config/
  lib/
  types/
```

Reserved for later work, not implemented in Foundation:

```text
src/features/
src/server/
src/domain/
src/data-access/
src/integrations/
```

**Source support:** Requirements `MAINT-003` through `MAINT-007`, `SCALE-001`, `SCALE-002`; Software Design Sections 3.6 through 3.8, 14.1, 14.2.

**Prerequisites:** Step 2.

**Verification criteria:** Presentation code has no Prisma, Clerk, database, provider, or feature imports. No feature route or business module exists.

### Step 4: Configure TypeScript and Module Resolution

**Objective:** Establish strict type checking and stable imports.

**Required package(s):** `typescript`, `@types/node`, `@types/react`, `@types/react-dom`.

**Installation command(s) later:** Included in Section 3.4.

**Configuration required:**

- Enable strict TypeScript checking.
- Enable `noEmit` for type checking.
- Configure the `@/*` alias to `src/*`.
- Include Next.js generated types.
- Keep server/client boundaries explicit.
- Avoid broad escape hatches such as `any`.

**Files/directories expected:** `tsconfig.json`, `next-env.d.ts`.

**Source support:** Requirements `MAINT-002` through `MAINT-007`; Software Design Sections 2.1, 2.7, 3.5 through 3.8, 14.1.

**Prerequisites:** Steps 2 and 3.

**Verification criteria:** `pnpm typecheck` passes; aliases resolve; Foundation files do not require unsafe types.

### Step 5: Configure Tailwind CSS and MKAAN Tokens

**Objective:** Create the styling foundation using official Tailwind configuration and the approved MKAAN Design System tokens.

**Required package(s):** `tailwindcss`, `@tailwindcss/postcss`, `clsx`, `tailwind-merge`, `class-variance-authority`.

**Installation command(s) later:**

```bash
pnpm add -D tailwindcss @tailwindcss/postcss
pnpm add clsx tailwind-merge class-variance-authority
```

**Configuration required:**

- Configure Tailwind using the selected supported major/version.
- Create semantic CSS variables and Tailwind aliases for colors, surfaces, typography, radius, spacing, shadows, and focus.
- Use canonical primary `#0A192F`.
- Use canonical action blue `#0058BE` with `#004395` strong/hover and `#2170E4` container.
- Use `#F8FAFC` as the canonical Pearl White background.
- Use the Design System status roles for success, error, warning, info, and WhatsApp.
- Exclude stale `#000000` and `#3B82F6` from active tokens.
- Do not hard-code feature-specific styles.

**Files/directories expected:** `src/app/globals.css`, Tailwind/PostCSS configuration, and possibly `components.json` after shadcn initialization.

**Source support:** Design System Sections 4, 6, 8, 9; Requirements `DETAIL-009`, `A11Y-003`, `RESP-001`; Software Design Sections 2.2 and 16.

**Prerequisites:** Steps 2 through 4; Tailwind major/version approval.

**Verification criteria:** Semantic tokens are available to components; active CSS contains no stale primary/action token; focus and surface tokens resolve; Tailwind compilation succeeds.

### Step 6: Configure Arabic Typography and RTL Defaults

**Objective:** Establish Arabic-only, RTL-first document and typography behavior.

**Required package(s):** Next.js built-in `next/font`; no separate font package by default.

**Installation command(s) later:** No additional package. Use `next/font/google` if the approved build environment supports the IBM Plex Sans Arabic export.

**Configuration required:**

- Load IBM Plex Sans Arabic for all Arabic display, headline, body, label, helper, validation, and UI text.
- Load Montserrat only for numeric, price, percentage, counter, and metric roles.
- Set root document attributes to `lang="ar"` and `dir="rtl"`.
- Use logical CSS properties instead of hard-coded left/right layout assumptions.
- Preserve Arabic-safe line heights and prevent clipped glyphs.
- Do not add a customer locale control or alternate customer direction mode.

**Files/directories expected:** `src/app/layout.tsx`, `src/app/globals.css`.

**Source support:** Requirements `PROJ-003`, `PROJ-004`, `AUTH-001`, `AUTH-002`, `BR-009`, `SEO-017`; SRS Sections 1.2, 2, 19, 23; Design System Sections 3, 5, 7.

**Prerequisites:** Steps 3 and 5; confirmation that the official Next.js font export is available.

**Verification criteria:** Arabic headings and body text use IBM Plex Sans Arabic; numeric roles use Montserrat; root HTML is Arabic RTL; no public account or locale UI is present.

### Step 7: Create the Global App Router Layout

**Objective:** Establish the application-wide layout and metadata boundary without implementing a product page.

**Required package(s):** Next.js and React from Step 2.

**Installation command(s) later:** None beyond Step 2.

**Configuration required:**

- Render `{children}` through the root layout.
- Import global styles and font variables.
- Set safe generic MKAAN metadata only.
- Keep server components as the default.
- Use client components only where Next.js technical boundaries require them.
- Do not add navigation, homepage content, customer CTAs, feature routes, or authentication controls.

**Files/directories expected:** `src/app/layout.tsx`.

**Source support:** Requirements `PROJ-005`, `PROJ-006`, `PROJ-003`, `PROJ-004`; Software Design Sections 2.1, 3.2 through 3.6; Design System Sections 3 and 15.

**Prerequisites:** Steps 3, 5, and 6.

**Verification criteria:** The root layout compiles, applies global direction and language, contains no feature behavior, and does not access data or external providers.

### Step 8: Define Responsive Breakpoints

**Objective:** Make the Design System responsive foundation available before feature implementation.

**Required package(s):** Tailwind CSS from Step 5.

**Installation command(s) later:** None beyond Step 5.

**Configuration required:** Define these named bands:

- Mobile: `<768px`, 4 columns, 16px margins.
- Tablet: `768px-1023px`, 8 columns, 24px margins.
- Laptop: `1024px-1279px`, 8 columns, 24px to 40px margins.
- Desktop: `1280px-1919px`, 12 columns, 40px margins.
- Large: `1920px+`, centered 1280px content.

Keep the rules generic. Do not implement responsive property cards, filters, galleries, forms, or Admin screens yet.

**Files/directories expected:** `src/app/globals.css` and Tailwind breakpoint configuration.

**Source support:** Requirements `RESP-001` through `RESP-006`, `PERF-001`; SRS Sections 22 and 23; Design System Section 7.

**Prerequisites:** Steps 5 and 6.

**Verification criteria:** Breakpoint tokens compile; layout utilities use logical properties; no feature-specific responsive implementation is introduced.

### Step 9: Initialize shadcn/ui and Shared UI Primitives

**Objective:** Use shadcn/ui and Radix primitives for reusable, accessible presentation building blocks.

**Required package(s):** shadcn CLI, `@radix-ui/react-slot` where generated, `lucide-react`, `clsx`, `tailwind-merge`, `class-variance-authority`.

**Installation command(s) later:**

```bash
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button card input label badge skeleton alert separator
pnpm add lucide-react
```

**Configuration required:**

- Configure shadcn aliases to `src/components` and `src/lib`.
- Use the MKAAN token variables in generated primitive styles.
- Preserve accessible Radix behavior rather than manually recreating it.
- Use Lucide React for implementation icons while keeping the current restrained outlined visual language.
- Add only feature-neutral primitives.

**Files/directories expected:** `components.json`, `src/components/ui/*.tsx`, `src/lib/utils.ts`.

**Source support:** Software Design Sections 2.2, 2.7, 3.6, 14.2; Design System Sections 9 and 11; Requirements `MAINT-003`, `MAINT-004`, `A11Y-001` through `A11Y-008`.

**Prerequisites:** Steps 5 through 8 and shadcn/Tailwind version approval.

**Verification criteria:** Primitives render with MKAAN tokens; keyboard focus, disabled, invalid, and loading states work; no primitive contains business logic or persistence access.

### Step 10: Add Shared Feedback and Technical State Foundations

**Objective:** Establish reusable technical state presentation before feature routes exist.

**Required package(s):** Existing React, shadcn, and Tailwind dependencies. No state-management package is required.

**Installation command(s) later:** None beyond previous steps.

**Configuration required:** Create generic components for loading, empty, error, validation, success, unauthorized Admin access, and not-found/unavailable states. Keep all copy safe and Arabic. Do not invent feature-specific fields, status names, or business actions.

**Files/directories expected:**

- `src/components/feedback/loading-state.tsx`
- `src/components/feedback/empty-state.tsx`
- `src/components/feedback/error-state.tsx`
- `src/components/feedback/success-state.tsx`
- `src/components/feedback/unauthorized-state.tsx`
- `src/components/feedback/not-found-state.tsx`
- `src/lib/result.ts`
- `src/lib/errors.ts`

**Source support:** SRS Sections 17 and 18; Software Design Sections 3.6, 9, 10, 13, and 17; Design System Section 10.

**Prerequisites:** Steps 5, 6, and 9.

**Verification criteria:** States do not expose internal errors; empty results are distinct from errors; unauthorized is limited to protected Admin contexts; no customer authentication path is created.

### Step 11: Add Next.js Loading, Error, Global Error, and Not-Found Boundaries

**Objective:** Connect the generic state foundations to the App Router technical boundaries.

**Required package(s):** Next.js 16.

**Installation command(s) later:** None beyond Step 2.

**Configuration required:**

- `loading.tsx` uses a generic layout-matched loading treatment.
- `error.tsx` uses the required client boundary and safe recovery behavior.
- `global-error.tsx` provides a safe root-level fallback.
- `not-found.tsx` provides a safe Arabic not-found outcome.
- Do not add feature-specific routes or feature-specific error behavior.

**Files/directories expected:**

- `src/app/loading.tsx`
- `src/app/error.tsx`
- `src/app/global-error.tsx`
- `src/app/not-found.tsx`

**Source support:** SRS Sections 18.1 through 18.7; Requirements `SEARCH-008`, `SEO-012`, `REL-001`; Software Design Sections 3.6 and 13; Design System Section 10.

**Prerequisites:** Steps 7 and 10.

**Verification criteria:** Technical boundaries compile; error output is safe; recovery does not expose implementation details; no product feature is rendered.

### Step 12: Configure Accessibility Defaults

**Objective:** Make accessibility part of the shared Foundation rather than a feature-by-feature retrofit.

**Required package(s):** Existing shadcn/Radix primitives and ESLint configuration. No dedicated accessibility test framework is selected.

**Installation command(s) later:** None beyond Steps 2 and 9.

**Configuration required:**

- Semantic landmarks and controls.
- Visible Arabic labels.
- `aria-invalid` and `aria-describedby` conventions.
- Announced loading and success/error outcomes where appropriate.
- Visible `:focus-visible` ring using the action token.
- Non-color-only status indication.
- 44px interactive targets where practical.
- Reduced-motion behavior.
- Text zoom and Arabic glyph overflow safeguards.
- Image alt-text conventions for future feature components.

**Files/directories expected:** `src/app/globals.css`, `src/components/ui/*`, `src/components/feedback/*`, and ESLint configuration if accessibility rules are enabled.

**Source support:** Requirements `A11Y-001` through `A11Y-008`; SRS Section 23; Software Design Section 16.2; Design System Section 11.

**Prerequisites:** Steps 5, 9, 10, and 11.

**Verification criteria:** Keyboard inspection passes for primitives; focus is visible; state messages are accessible; reduced-motion rules exist; status meaning does not depend on color alone.

### Step 13: Establish Environment and Configuration Boundaries

**Objective:** Create provider-neutral configuration handling without selecting deferred providers.

**Required package(s):** No additional package required for the initial Foundation.

**Installation command(s) later:** None unless a concrete approved environment-validation package is needed.

**Configuration required:**

- Keep `next.config.ts` minimal and provider-neutral.
- Do not add image-host allowlists because image storage is deferred.
- Do not add Clerk, database, analytics, monitoring, or deployment variables.
- Add `.env.example` only if a concrete Foundation variable is approved.
- Ignore secrets through `.gitignore`.
- Do not copy the credential from `opencode.json`.

**Files/directories expected:** `next.config.ts`, `.gitignore`, and conditional `.env.example` or `src/config/env.ts` only if approved variables exist.

**Source support:** Requirements `SEC-011`, `DEFER-002`, `DEFER-003`, `DEFER-007`, `DEFER-009`, `DEFER-012`; SRS Sections 21 and 27; Software Design Sections 2.6, 3.8, and 10.3.

**Prerequisites:** Steps 2 through 4; approval of any non-secret Foundation variables.

**Verification criteria:** No secret is committed; no provider-specific variable is introduced; `opencode.json` is unchanged; no external integration is initialized.

### Step 14: Configure ESLint, Prettier, and Development Scripts

**Objective:** Establish repeatable code-quality checks for the Foundation.

**Required package(s):** `eslint`, `eslint-config-next`, `prettier`, `prettier-plugin-tailwindcss`.

**Installation command(s) later:** Included in Section 3.4.

**Configuration required:**

- Configure Next.js and TypeScript linting.
- Configure Prettier and Tailwind class ordering.
- Add scripts for `dev`, `build`, `typecheck`, `lint`, `format`, and `format:check`.
- Keep errors and warnings actionable.
- Do not add feature-specific lint exceptions.

**Files/directories expected:** `eslint.config.mjs`, `.prettierrc.json`, `.prettierignore`, `package.json`.

**Source support:** Requirements `MAINT-002` through `MAINT-007`; Software Design Sections 2.5, 2.7, and 17; Implementation Plan Stage 3.

**Prerequisites:** Steps 2 through 9.

**Verification criteria:** `pnpm lint`, `pnpm typecheck`, and `pnpm format:check` pass on Foundation files.

### Step 15: Define Testing and Build Verification Boundaries

**Objective:** Make the Foundation verifiable without silently selecting a testing framework.

**Required package(s):** No test framework during Foundation.

**Installation command(s) later:** None for testing.

**Configuration required:**

- Use TypeScript, ESLint, Prettier, and Next.js build checks.
- Reserve future test locations without creating feature tests.
- Do not add Jest, Vitest, Playwright, Cypress, or accessibility automation without an approved testing-stack decision.
- Do not create a placeholder homepage solely to satisfy a build command.

**Files/directories expected:** `package.json` scripts; optional empty test directory only if the selected repository convention requires it.

**Source support:** SRS Sections 24 and 27.2; Software Design Section 17; Requirements testing requirements and deferred technical decisions.

**Prerequisites:** Steps 2, 4, and 14.

**Verification criteria:** Type, lint, format, and applicable build checks pass; no test framework is installed; no feature behavior is tested or implemented.

## 5. Foundation Completion Checklist

- [ ] Plan was approved before implementation began.
- [ ] Next.js 16 and React 19 are installed using official packages.
- [ ] pnpm and the lockfile are configured.
- [ ] TypeScript strict mode and path aliases are configured.
- [ ] Tailwind CSS is installed and configured through its official package/plugin.
- [ ] shadcn/ui is initialized through the official CLI.
- [ ] Radix primitives are used where shadcn requires them; no equivalent functionality is manually recreated.
- [ ] Lucide React is installed for implementation icons.
- [ ] React Hook Form and Zod are installed as future presentation/structural-validation foundations only.
- [ ] IBM Plex Sans Arabic is configured for Arabic UI text.
- [ ] Montserrat is restricted to numeric, price, percentage, counter, and metric roles.
- [ ] Root document uses `lang="ar"` and `dir="rtl"`.
- [ ] No customer account, customer authentication, or locale-control UI exists.
- [ ] MKAAN colors, spacing, radius, typography, shadow, focus, and status tokens are centralized.
- [ ] Canonical primary and action tokens are used; stale tokens are absent from active Foundation styles.
- [ ] Mobile, tablet, laptop, desktop, and large breakpoints are configured.
- [ ] Shared UI primitives use official shadcn/Radix behavior.
- [ ] Loading, empty, error, validation, success, disabled, focus, unauthorized, and not-found foundations exist.
- [ ] Next.js loading, error, global-error, and not-found boundaries compile.
- [ ] Accessibility defaults are present for semantics, labels, focus, announcements, contrast, motion, and touch targets.
- [ ] Environment handling is provider-neutral and contains no secrets.
- [ ] ESLint, Prettier, type checking, and formatting verification pass.
- [ ] No database, Prisma, Clerk, API, business logic, external integration, or feature code exists.
- [ ] No Homepage, Properties, Search, Details, Request, Viewing, Listing, Services, Contact, Leads, or Admin implementation exists.
- [ ] No Requirements, SRS, Software Design, Design System, Stitch, or OpenCode configuration file was changed.
- [ ] No testing framework was installed without separate approval.

## 6. Dependency Installation Checklist

### Application Runtime

- [ ] `next@16`
- [ ] `react@19`
- [ ] `react-dom@19`

### TypeScript

- [ ] `typescript`
- [ ] `@types/node`
- [ ] `@types/react`
- [ ] `@types/react-dom`

### Styling and UI

- [ ] `tailwindcss`
- [ ] `@tailwindcss/postcss`
- [ ] `clsx`
- [ ] `tailwind-merge`
- [ ] `class-variance-authority`
- [ ] `shadcn` CLI through `pnpm dlx`
- [ ] `@radix-ui/react-slot`, if required by generated shadcn primitives
- [ ] `lucide-react`

### Forms and Structural Validation

- [ ] `react-hook-form`
- [ ] `zod`
- [ ] `@hookform/resolvers` only when the first approved form is implemented, not during Foundation

### Code Quality

- [ ] `eslint`
- [ ] `eslint-config-next`
- [ ] `prettier`
- [ ] `prettier-plugin-tailwindcss`

### Tools Not Installed During Foundation

- [ ] Prisma and database drivers
- [ ] Clerk packages
- [ ] Image storage SDKs
- [ ] Analytics SDKs
- [ ] Rate-limit or anti-spam provider SDKs
- [ ] Monitoring, logging, backup, recovery, or deployment provider SDKs
- [ ] Testing framework packages

## 7. Implementation Order

1. Approve the plan, source-root convention, Node.js support range, pnpm version, and Tailwind major/version.
2. Enable pnpm through Corepack if required.
3. Install Next.js, React, TypeScript, styling, UI, form, validation, linting, and formatting dependencies.
4. Initialize shadcn/ui using its official CLI.
5. Create the minimal `src/` Foundation directories.
6. Configure TypeScript and module aliases.
7. Configure Next.js and PostCSS/Tailwind.
8. Create global MKAAN CSS variables and Tailwind token mappings.
9. Configure IBM Plex Sans Arabic, Montserrat numeric roles, and root RTL/Arabic attributes.
10. Create the root App Router layout.
11. Configure responsive breakpoint tokens.
12. Generate only shared shadcn/ui primitives.
13. Add generic feedback/state components and safe result/error contracts.
14. Connect App Router loading, error, global-error, and not-found boundaries.
15. Add accessibility and reduced-motion defaults.
16. Add provider-neutral environment/configuration boundaries.
17. Configure ESLint, Prettier, and package scripts.
18. Run type, lint, formatting, and applicable build verification.
19. Inspect the final diff and confirm all excluded feature areas remain untouched.

## 8. Expected Foundation Files

### Files likely created

- `package.json`
- `pnpm-lock.yaml`
- `next.config.ts`
- `tsconfig.json`
- `next-env.d.ts`
- `postcss.config.mjs`
- `eslint.config.mjs`
- `.prettierrc.json`
- `.prettierignore`
- `.gitignore`
- `components.json`
- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/app/loading.tsx`
- `src/app/error.tsx`
- `src/app/global-error.tsx`
- `src/app/not-found.tsx`
- `src/components/ui/button.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/label.tsx`
- `src/components/ui/badge.tsx`
- `src/components/ui/skeleton.tsx`
- `src/components/ui/alert.tsx`
- `src/components/ui/separator.tsx`
- `src/components/ui/visually-hidden.tsx`
- `src/components/feedback/loading-state.tsx`
- `src/components/feedback/empty-state.tsx`
- `src/components/feedback/error-state.tsx`
- `src/components/feedback/success-state.tsx`
- `src/components/feedback/unauthorized-state.tsx`
- `src/components/feedback/not-found-state.tsx`
- `src/lib/utils.ts`
- `src/lib/result.ts`
- `src/lib/errors.ts`

### Conditional files

- `.env.example`
- `src/config/env.ts`

These are created only if a concrete non-secret Foundation variable is approved.

### Files that must not be modified

- `docs/requirements/MKAAN-REQUIREMENTS.md`
- `docs/requirements/MKAAN-SRS.md`
- `docs/design/MKAAN-SOFTWARE-DESIGN.md`
- `docs/design/MKAAN-DESIGN-SYSTEM.md`
- `opencode.json`
- Stitch projects, screens, and assets

## 9. Risks and Unresolved Decisions

1. **Empty repository:** There is no current package or application configuration to preserve. The initial bootstrap must remain minimal.
2. **`src/` convention:** Recommended for source isolation, but it is a technical convention requiring approval.
3. **Tailwind major/version:** No current configuration exists. The implementation must select a version compatible with Next.js 16, shadcn/ui, and the approved Node.js range.
4. **Font loading:** `next/font` is preferred. Its IBM Plex Sans Arabic export and build-time availability must be confirmed before implementation.
5. **Icon boundary:** The Software Design specifies Lucide React, while the current Stitch visual reference uses outlined Material Symbols. Implement Lucide React with the same restrained outlined visual language; do not add a second icon system.
6. **Testing framework:** Testing is explicitly deferred. Foundation verification uses type, lint, format, and build checks only.
7. **Environment variables:** No provider-specific variables may be added. Any application URL or other Foundation variable requires approval.
8. **Build without feature routes:** Do not create a fake Homepage to make a build pass. If Next.js requires a route for a full production build, resolve that as a separate approval decision.
9. **Credential exposure:** `opencode.json` contains a credential-bearing MCP header. It is outside this Foundation task and must not be copied into application configuration. Credential rotation is a separate security action.
10. **Deferred architecture:** The folder layout supports the Software Design boundaries but does not resolve the exact application architecture under `DEFER-002`.

## 10. Approval Gate

This document is a plan only. Implementation must not begin until this plan is reviewed and approved.

Approval of this plan authorizes only the Foundation work described here. It does not authorize Homepage, Properties, Search, Property Details, Property Requests, Viewing Requests, List Your Property, Services, Contact, Leads, Admin, Database, API, business logic, customer authentication, or external integrations.
