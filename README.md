# @commitpt/design-system

Component library for the [commitpt](https://commitpt.com) community, built with React, TypeScript, Tailwind CSS v4, and shadcn/ui.

## Installation

```bash
npm install @commitpt/design-system
```

`react` and `react-dom` are peer dependencies and must already be installed in your project.

## Setup

### 1. Import the theme

In your global CSS file, import the design system theme before your own styles:

```css
@import "@commitpt/design-system/styles";
```

This brings in the Tailwind base, all design tokens, and the base layer styles.

### 2. Use components

```tsx
import { Button } from "@commitpt/design-system";

export function App() {
  return <Button variant="default">Click me</Button>;
}
```

## Theme customisation

All design tokens are CSS custom properties defined via Tailwind v4 `@theme`. To override them, add an `@theme` block **after** the import in your CSS:

```css
@import "@commitpt/design-system/styles";

@theme {
  --color-primary: oklch(0.5 0.2 260);
  --color-primary-foreground: oklch(0.98 0 0);
  --radius-md: 0.5rem;
}
```

Tokens set after the import always win. You only need to override what you want to change.

### Available tokens

| Token | Default | Description |
|---|---|---|
| `--color-background` | `oklch(1 0 0)` | Page background |
| `--color-foreground` | `oklch(0.145 0 0)` | Default text |
| `--color-primary` | `oklch(0.205 0 0)` | Primary actions |
| `--color-primary-foreground` | `oklch(0.985 0 0)` | Text on primary |
| `--color-secondary` | `oklch(0.97 0 0)` | Secondary actions |
| `--color-secondary-foreground` | `oklch(0.205 0 0)` | Text on secondary |
| `--color-muted` | `oklch(0.97 0 0)` | Muted backgrounds |
| `--color-muted-foreground` | `oklch(0.556 0 0)` | Muted text |
| `--color-accent` | `oklch(0.97 0 0)` | Accent backgrounds |
| `--color-accent-foreground` | `oklch(0.205 0 0)` | Text on accent |
| `--color-destructive` | `oklch(0.577 0.245 27.325)` | Destructive actions |
| `--color-border` | `oklch(0.922 0 0)` | Borders |
| `--color-input` | `oklch(0.922 0 0)` | Input borders |
| `--color-ring` | `oklch(0.708 0 0)` | Focus rings |
| `--color-card` | `oklch(1 0 0)` | Card background |
| `--color-popover` | `oklch(1 0 0)` | Popover background |
| `--radius-sm` | `0.25rem` | Small radius |
| `--radius-md` | `0.375rem` | Medium radius |
| `--radius-lg` | `0.5rem` | Large radius |
| `--radius-xl` | `0.75rem` | Extra large radius |

## Components

### Button

```tsx
import { Button, type ButtonProps } from "@commitpt/design-system";
```

| Prop | Type | Default |
|---|---|---|
| `variant` | `default` \| `destructive` \| `outline` \| `secondary` \| `ghost` \| `link` | `default` |
| `size` | `default` \| `sm` \| `lg` \| `icon` | `default` |
| `asChild` | `boolean` | `false` |

All standard `<button>` HTML attributes are also accepted.

```tsx
// Variants
<Button variant="default">Save</Button>
<Button variant="outline">Cancel</Button>
<Button variant="destructive">Delete</Button>
<Button variant="ghost">Menu</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon"><TrashIcon /></Button>

// Render as a different element via asChild
<Button asChild>
  <a href="/dashboard">Go to dashboard</a>
</Button>
```

## TypeScript

All component prop types are exported:

```ts
import type { ButtonProps } from "@commitpt/design-system";
```

## Development

```bash
npm run dev            # watch mode — rebuilds on file changes
npm run storybook      # Storybook at http://localhost:6006
npm run build          # production build → dist/
npm run build-storybook  # static Storybook build
```

### Adding a component

1. Create `src/components/ui/<name>.tsx` — export the component, the CVA variants helper, and a named `FooProps` type
2. Add all three exports to `src/index.ts`
3. Create `src/components/ui/<name>.stories.tsx` with stories for every variant

### Publishing

Merging to `dev` automatically triggers a GitLab CI pipeline that builds and publishes to npm. No manual publish step is needed.
