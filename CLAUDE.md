# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

`@commitpt/design-system` is a publishable npm package — a component library for the commitpt community. It is installed in consumer projects via `npm install @commitpt/design-system`. It is **not** a standalone app.

## Commands

```bash
npm run build          # compile library → dist/ (tsup + copies CSS)
npm run dev            # watch mode for library build
npm run storybook      # start Storybook dev server on port 6006
npm run build-storybook  # build static Storybook
```

There are no lint or test scripts configured yet.

## Architecture

### Build pipeline

`tsup` (not Vite) is responsible for the library build. `tsconfig.app.json` is used (not the root `tsconfig.json`). The `@/` path alias is resolved by tsup via `esbuildOptions.alias`, not by TypeScript path mapping alone — both must stay in sync.

CSS is **not** bundled by tsup. The `build:css` step copies `src/styles/` to `dist/styles/` verbatim. Consumers process the CSS with their own Tailwind v4 toolchain.

Vite + `@tailwindcss/vite` is kept only for Storybook (via `@storybook/react-vite`). `vite.config.ts` is not used for the library build.

### Package exports

```
@commitpt/design-system          → dist/index.js / dist/index.cjs / dist/index.d.ts
@commitpt/design-system/styles   → dist/styles/theme.css
```

### File structure per component

Every component lives in its own subdirectory:

```
src/components/ui/<name>/
  <name>.tsx          # component implementation
  <name>.stories.tsx  # Storybook documentation
  <name>.test.tsx     # unit tests
```

### Adding a component

1. Create `src/components/ui/<name>/<name>.tsx` — see **Component implementation** below.
2. Add exports to `src/index.ts` — component, CVA helper, and `type Props`.
3. Create `src/components/ui/<name>/<name>.stories.tsx` — see **Storybook stories** below.

Storybook picks up any `*.stories.tsx` under `src/` automatically.

---

## Component implementation

### Structure

Follow the shadcn/ui "new-york" style as the base, then apply the conventions below.

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const fooVariants = cva("<base classes>", {
  variants: {
    variant: {
      default: [
        // main styles
        "...",
        // borders
        "...",
        // hover styles
        "...",
      ],
      secondary: [
        // main styles
        "...",
        // borders
        "...",
        // hover styles
        "...",
      ],
    },
    size: {
      default: "...",
      sm: "...",
      lg: "...",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export type FooProps = React.ComponentProps<"div"> &
  VariantProps<typeof fooVariants> & {
    // component-specific props here
  };

/**
 * JSDoc block — see JSDoc standard below
 */
function Foo({ className, variant, size, ...props }: FooProps) {
  return (
    <div data-slot="foo" className={cn(fooVariants({ variant, size, className }))} {...props} />
  );
}

export { Foo, fooVariants };
```

### CVA variant arrays

Every variant must be written as an **array of strings**, never a single long string. Group classes into semantic buckets with inline comments:

```tsx
variantName: [
  // main styles
  "bg-... text-...",
  // borders
  "border border-...",
  // hover styles
  "hover:...",
  // focus styles (if needed)
  "focus-visible:...",
],
```

Omit a bucket (e.g. `// borders`) only if the variant genuinely has none — don't add an empty entry.

### Exports

Always export three things from every component file:

```ts
export { Foo, fooVariants };
export type { FooProps };
```

And add all three to `src/index.ts`.

### JSDoc standard

Every component function must have a JSDoc block. Reference `Button` as the canonical example. It must include:

1. **`@see` link** to the Storybook docs page:
   `@see {@link https://main--6a47d6ac8a9990bb6908d4a9.chromatic.com/?path=/docs/ui-<name>--docs Storybook documentation}`
2. **Variants table** — token family used + when to use each variant.
3. **Sizes table** — height/dimensions + use case (if the component has sizes).
4. **Usage examples** — basic, with icons (if applicable), loading state (if applicable), `asChild` (if applicable).
5. **Accessibility notes** — focus behaviour, ARIA requirements, touch targets.
6. **Design tokens** — which token families the component consumes and how to override them.

---

## Storybook stories

### Story file structure

```tsx
// 1. Imports — lucide-react icons, React, component
// 2. Layout helpers (Row, Grid, LabeledRow) — reuse the pattern from Button
// 3. Data constants (ALL_VARIANTS, etc.) — defined once, never repeated inline
// 4. meta export — with component-level description
// 5. Story exports — in the order below
```

### Story order

Always follow this sequence (omit sections that don't apply to the component):

1. **Playground** — args-driven, all controls wired, used for free exploration
2. **Variants** — all variants in labeled rows with real copy (not "Click me")
3. **Sizes** — all sizes across representative variants
4. **Icon Only** — if applicable; all variants, every button with `aria-label`
5. **Icon Left** — if applicable; all variants
6. **Icon Right** — if applicable; all variants
7. **Loading** — if applicable; all variants in loading state
8. **Disabled** — all variants in disabled state
9. **Full Width** — if applicable
10. **Button Group / Composition** — if applicable
11. **Real World Examples** — concrete product scenarios, never placeholder copy
12. **Accessibility** — `aria-label`, `aria-busy`, focus ring, WCAG notes

### Layout helpers

Define these at the top of every stories file. Do not import them from a shared file — keep stories self-contained:

```tsx
function Row({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex flex-wrap items-center gap-3 ${className ?? ""}`}>{children}</div>;
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-4">{children}</div>;
}

function LabeledRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-6">
      <span className="w-28 shrink-0 font-mono text-xs text-muted-foreground">{label}</span>
      <Row>{children}</Row>
    </div>
  );
}
```

### meta — component-level description

Always include a `parameters.docs.description.component` markdown block in `meta`. It must cover:

- What the component is and its role in the system
- A variants/props reference table
- Accessibility requirements
- Composition patterns (e.g. `asChild`, slotting)

### argTypes standard

Every prop in `argTypes` needs:

- `description` — explain the prop's intent and constraints, not just its type
- `table.defaultValue` — always set
- `control: false` for props that shouldn't be interactive in the Controls panel (e.g. `asChild`, `children` with complex types)

### Story descriptions

Every story needs a `parameters.docs.description.story` string. Write it as if explaining to a developer who has never seen the component:

- **When to use** this pattern
- **When to avoid** it
- **Concrete examples** from real product UI
- Any **gotchas** or pairing rules

Never write descriptions like "This shows the button variants." That adds no value.

### Real copy rule

Never use "Click me", "Label", "Item", or other placeholder text. Use copy that reflects real product usage:

- Form actions: "Save changes", "Cancel", "Publish", "Save draft"
- Auth: "Sign in", "Create account", "Forgot password?"
- Onboarding: "Get started", "Book a demo", "Continue"
- Danger: "Delete account", "Revoke access", "Remove member"
- File: "Upload", "Download", "Export"
- Recovery: "Retry", "Dismiss", "Reload"

---

## Tailwind theme

`src/styles/theme.css` owns all design tokens via Tailwind v4 `@theme { }` blocks. `src/index.css` imports it and is the entry point for Storybook. Consumer projects import the theme CSS as:

```css
@import "@commitpt/design-system/styles";

/* Override tokens below */
@theme {
  --color-primary: oklch(...);
}
```

Token overrides placed **after** the import win — this is the intended extension mechanism.

---

## Publishing

Publishing is automated via GitLab CI (`.gitlab-ci.yml`). Every merge to `dev` triggers a build and publishes to npm automatically. Manual publishing should not be needed.

The CI requires an `NPM_TOKEN` variable set in GitLab CI/CD settings (Settings → CI/CD → Variables) with a token that has publish access to the `@commitpt` npm scope.

`prepublishOnly` runs `npm run build` automatically. The `files` field limits the published tarball to `dist/`. `react` and `react-dom` are `peerDependencies` and must never be moved to `dependencies`.
