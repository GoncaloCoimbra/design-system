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

| Token                          | Default                     | Description         |
| ------------------------------ | --------------------------- | ------------------- |
| `--color-background`           | `oklch(1 0 0)`              | Page background     |
| `--color-foreground`           | `oklch(0.145 0 0)`          | Default text        |
| `--color-primary`              | `oklch(0.205 0 0)`          | Primary actions     |
| `--color-primary-foreground`   | `oklch(0.985 0 0)`          | Text on primary     |
| `--color-secondary`            | `oklch(0.97 0 0)`           | Secondary actions   |
| `--color-secondary-foreground` | `oklch(0.205 0 0)`          | Text on secondary   |
| `--color-muted`                | `oklch(0.97 0 0)`           | Muted backgrounds   |
| `--color-muted-foreground`     | `oklch(0.556 0 0)`          | Muted text          |
| `--color-accent`               | `oklch(0.97 0 0)`           | Accent backgrounds  |
| `--color-accent-foreground`    | `oklch(0.205 0 0)`          | Text on accent      |
| `--color-destructive`          | `oklch(0.577 0.245 27.325)` | Destructive actions |
| `--color-border`               | `oklch(0.922 0 0)`          | Borders             |
| `--color-input`                | `oklch(0.922 0 0)`          | Input borders       |
| `--color-ring`                 | `oklch(0.708 0 0)`          | Focus rings         |
| `--color-card`                 | `oklch(1 0 0)`              | Card background     |
| `--color-popover`              | `oklch(1 0 0)`              | Popover background  |
| `--radius-sm`                  | `0.25rem`                   | Small radius        |
| `--radius-md`                  | `0.375rem`                  | Medium radius       |
| `--radius-lg`                  | `0.5rem`                    | Large radius        |
| `--radius-xl`                  | `0.75rem`                   | Extra large radius  |

## Components

### Button

```tsx
import { Button, type ButtonProps } from "@commitpt/design-system";
```

| Prop      | Type                                                                        | Default   |
| --------- | --------------------------------------------------------------------------- | --------- |
| `variant` | `default` \| `destructive` \| `outline` \| `secondary` \| `ghost` \| `link` | `default` |
| `size`    | `default` \| `sm` \| `lg` \| `icon`                                         | `default` |
| `asChild` | `boolean`                                                                   | `false`   |

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

### Releasing a new version

This project uses [Changesets](https://github.com/changesets/changesets) to manage versioning and changelogs.

#### Step 1 — Record what changed

Run this after making your changes (before or after committing):

```bash
npm run changeset
```

The interactive prompt will ask you to:

- Select the bump type: `patch` (bug fix), `minor` (new feature), or `major` (breaking change)
- Write a short summary of what changed

This creates a file in `.changeset/` — commit it alongside your code.

| Bump type | When to use               | Example         |
| --------- | ------------------------- | --------------- |
| `patch`   | Bug fixes, style tweaks   | `0.1.0 → 0.1.1` |
| `minor`   | New components, new props | `0.1.0 → 0.2.0` |
| `major`   | Breaking API changes      | `0.1.0 → 1.0.0` |

#### Step 2 — Apply the version bump

When you're ready to release, apply all pending changesets:

```bash
npm run version
```

This will:

- Bump the version in `package.json`
- Generate / update `CHANGELOG.md`
- Delete the consumed changeset files

Commit the result: `git commit -am "chore: release vX.Y.Z"`

#### Step 3 — Publish to npm

```bash
npm run release
```

This builds the library and publishes it to npm under the `@commitpt` scope. You must be logged in (`npm login`) and have publish access to the `@commitpt` org.

#### Full example

```bash
# 1. Make your changes, then record them
npm run changeset

# 2. Commit the changeset file
git add .changeset/
git commit -m "chore: add changeset"

# 3. Apply version bump + update changelog
npm run version
git commit -am "chore: release v0.2.0"

# 4. Publish
npm run release

# 5. Push + tag
git push && git push --tags
```

#### Automated publishing (CI)

Merging to `dev` triggers a GitLab CI pipeline that builds and publishes automatically, provided the `NPM_TOKEN` variable is set in **GitLab → Settings → CI/CD → Variables**.
