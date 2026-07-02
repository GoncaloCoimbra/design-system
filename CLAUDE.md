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

### Adding a component

1. Create `src/components/ui/<name>.tsx` following the shadcn/ui "new-york" style:
   - Use `cva` + `VariantProps` for variants
   - Use `cn()` from `@/lib/utils` for class merging
   - Export the component, its CVA helper (e.g. `fooVariants`), and a named `FooProps` type
2. Add exports to `src/index.ts` — all three: component, variants, and `type FooProps`
3. Create `src/components/ui/<name>.stories.tsx` with stories for every variant

Storybook picks up any `*.stories.tsx` under `src/` automatically.

### Tailwind theme

`src/styles/theme.css` owns all design tokens via Tailwind v4 `@theme { }` blocks. `src/index.css` imports it and is the entry point for Storybook. Consumer projects import the theme CSS as:

```css
@import "@commitpt/design-system/styles";

/* Override tokens below */
@theme {
  --color-primary: oklch(...);
}
```

Token overrides placed **after** the import win — this is the intended extension mechanism.

### Publishing

Publishing is automated via GitLab CI (`.gitlab-ci.yml`). Every merge to `dev` triggers a build and publishes to npm automatically. Manual publishing should not be needed.

The CI requires an `NPM_TOKEN` variable set in GitLab CI/CD settings (Settings → CI/CD → Variables) with a token that has publish access to the `@commitpt` npm scope.

`prepublishOnly` runs `npm run build` automatically. The `files` field limits the published tarball to `dist/`. `react` and `react-dom` are `peerDependencies` and must never be moved to `dependencies`.
