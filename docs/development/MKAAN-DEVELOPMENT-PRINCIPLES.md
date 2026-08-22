# MKAAN Development Principles

Permanent rules for all development on the MKAAN project.

---

## 1. Stitch Is the Visual Source of Truth

The Stitch design is the primary visual reference for the UI.
Always preserve:

- Layout
- Spacing
- Typography
- Colors
- Border radius
- Shadows
- Images
- Icons
- Animations
- Responsive behavior

Do not introduce visual changes unless explicitly required.

---

## 2. Use the Existing Design System

Always use the existing MKAAN design tokens and styles.
Do NOT introduce arbitrary colors, spacing, typography, radius, or shadows when an existing design token can be used.

Avoid arbitrary values such as:

```tsx
text-[#123456]
bg-[#abcdef]
mt-[19px]
px-[37px]
```

unless the exact value is genuinely required by the Stitch design and there is no appropriate design token.

---

## 3. shadcn/ui First

Before creating any generic UI component, check whether an appropriate shadcn/ui component already exists.

Prefer existing shadcn/ui components for:

- Button
- Input
- Label
- Select
- Card
- Badge
- Skeleton
- Alert
- Separator
- Breadcrumb
- Dialog
- Sheet
- Dropdown Menu
- Tooltip
- Tabs
- Form
- Checkbox
- Radio Group
- Switch
- Textarea

Do NOT create custom implementations when an existing shadcn/ui component is suitable.
Do NOT use another UI component library.

---

## 4. Reuse Before Create

Before creating a new component:

1. Search existing MKAAN components.
2. Search `src/components/ui`.
3. Check existing feature components.
4. Check existing hooks/utilities.
5. Check whether shadcn/ui already provides the required primitive.

Only create a new component when there is a real need.

---

## 5. Feature-Based Architecture

Keep feature-specific code inside:

```text
src/features/
```

Example:

```text
src/features/homepage/
src/features/properties/
src/features/services/
src/features/contact/
```

Generic UI primitives belong in:

```text
src/components/ui/
```

Shared layout components belong in:

```text
src/components/layout/
```

Do NOT move feature components into `components/ui`.

---

## 6. No Hardcoded Business Data

Do NOT hardcode reusable business/configuration data directly inside UI components.

Examples include:

- Property categories
- Property types
- Transaction types
- Locations
- Services
- Statuses
- Filter options
- Navigation configuration
- Repeated business values

Instead, define structured data in an appropriate feature/configuration module.

Example:

```tsx
const propertyTypes = [
  { value: "residential", label: "سكني" },
  { value: "commercial", label: "تجاري" },
];
```

The component should consume the data rather than become the source of the data.
Keep internal values stable and machine-readable while user-facing labels remain Arabic.

---

## 7. No Magic Values

Avoid repeated unexplained values throughout the codebase.

Bad:

```tsx
.slice(0, 6)
```

Better:

```tsx
const MAX_FEATURED_PROPERTIES = 6;
```

Avoid repeatedly hardcoding:

```text
"residential"
"commercial"
"sale"
"rental"
```

across multiple files.

Centralize shared business constants when appropriate.
Do not over-centralize simple component-local values that have no reuse or business significance.

---

## 8. Responsive-First

Every UI component must be evaluated across:

- Mobile
- Small mobile
- Small laptop
- Medium laptop
- Desktop
- Large desktop

Pay special attention to medium laptop screens.
Do not optimize only for large desktop displays.
Avoid layouts that are visually correct on a large monitor but oversized or broken on a laptop.

---

## 9. RTL-First

MKAAN is an Arabic RTL product.
All UI components must be designed with RTL in mind from the beginning.

Verify:

- Direction
- Spacing
- Icons
- Flex ordering
- Navigation
- Forms
- Selects
- Progress indicators
- Animations
- Responsive layouts

Do not implement LTR first and patch RTL afterward.

---

## 10. Semantic HTML

Use semantic HTML elements whenever appropriate:

```text
header
nav
main
section
article
footer
button
form
label
```

Do not use `div` for everything.
Use:

- `<button>` for actions
- `<a>` / Next.js `<Link>` for navigation
- `<form>` for forms

---

## 11. Accessibility

Interactive components must be accessible.
Ensure:

- Keyboard accessibility
- Visible focus states
- Correct semantic elements
- Accessible labels
- Appropriate ARIA attributes when required
- Meaningful image alt text
- Sufficient contrast

Do not sacrifice accessibility for visual styling.

---

## 12. Separate UI From Business Logic

Keep components focused on presentation.
Avoid putting large amounts of business logic directly inside UI components.

Prefer:

```text
UI
↓
Feature logic / hooks
↓
Data / services
```

Do not introduce unnecessary abstractions.

---

## 13. No Blind CSS Fixes

Do not solve UI problems by randomly adding Tailwind classes until the visual result looks correct.

First identify:

- Parent layout
- Container constraints
- Width/height constraints
- Flex/grid behavior
- Breakpoints
- Component hierarchy
- RTL behavior

Then fix the root cause.

---

## 14. Preserve Existing Functionality

Refactoring must not change:

- Business logic
- Routes
- Search behavior
- Filtering behavior
- Form behavior
- Data structures
- API contracts
- Database behavior
- Authentication
- Existing feature requirements

Unless explicitly requested.

---

## 15. No Scope Creep

Do not modify unrelated features while implementing a task.

If you discover a major unrelated architectural problem:

1. Document it.
2. Explain the impact.
3. Stop and request approval before expanding the scope.

---

## 16. Avoid Over-Engineering

Do not introduce abstractions simply to make the architecture look more complex.

Prefer simple solutions when they are sufficient.

Create abstractions when they provide clear:

- Reusability
- Maintainability
- Separation of responsibility

---

## 17. Plan Before Major Refactors

For changes affecting multiple features or core architecture:

```text
Inspect
↓
Plan
↓
Get approval
↓
Implement
↓
Verify
```

Do not perform large architectural changes without approval.

---

## 18. Verification Before Commit

Before committing any meaningful change:

Run:

```text
pnpm typecheck
pnpm lint
pnpm format:check
pnpm build
```

For UI changes, also perform responsive verification.
