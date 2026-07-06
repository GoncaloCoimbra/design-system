import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import { Logo } from "./logo";

// ─── Layout helpers ──────────────────────────────────────────────────────────

function Row({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex flex-wrap items-center gap-3 ${className ?? ""}`}>{children}</div>;
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-4">{children}</div>;
}

function LabeledRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-6">
      <span className="w-36 shrink-0 font-mono text-xs text-muted-foreground">{label}</span>
      <Row>{children}</Row>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const ALL_SIZES = [24, 32, 40, 64, 96] as const;

const ALL_ROUNDED = [
  "rounded-sm",
  "rounded-md",
  "rounded-lg",
  "rounded-xl",
  "rounded-2xl",
  "rounded-full",
] as const;

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: "Base Components/Logo",
  component: Logo,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The \`Logo\` component renders the commitpt brand mark — the \`commit_icon.png\` PNG asset —
as a square image with configurable size and border radius.

It is a thin, intentionally simple wrapper: no variants, no state, no interactions.
Its job is to ensure the logo is always rendered at a consistent size with correct
aspect ratio, accessible alt text, and themeable rounding.

---

### Props reference

| Prop      | Type     | Default              | Description                                                      |
|-----------|----------|----------------------|------------------------------------------------------------------|
| \`size\`    | \`number\` | \`40\`                 | Width and height in pixels. Always square.                       |
| \`rounded\` | \`string\` | \`"rounded-xl"\`       | Tailwind border-radius class applied to the \`<img>\` element.   |
| \`alt\`     | \`string\` | \`"commitpt logo"\`    | Alt text for screen readers. Set to \`""\` when purely decorative. |
| \`className\`| \`string\` | —                   | Extra Tailwind classes merged onto the element.                  |

---

### Accessibility

- Always provide meaningful \`alt\` text unless the logo is next to a visible product name that already labels it.
- The Logo is not interactive by default. If you wrap it in a link, ensure the anchor is at least \`44×44px\` to meet WCAG 2.5.5.

---

### Composition

The Logo is most commonly used inside nav bars, sidebars, and splash screens alongside a wordmark:

\`\`\`tsx
<nav className="flex items-center gap-3">
  <Logo size={32} />
  <span className="font-semibold text-sm">commitpt</span>
</nav>
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      description:
        "Width and height of the logo in pixels. The same value is applied to both dimensions to keep the mark square at every scale. Common values: 24 (inline), 32 (compact nav), 40 (default), 64 (feature banner), 96 (splash).",
      control: { type: "number", min: 16, max: 256, step: 4 },
      table: {
        defaultValue: { summary: "40" },
      },
    },
    rounded: {
      description:
        "Tailwind border-radius class applied to the image. Controls how round the logo corners appear. Use `rounded-full` for a circular badge, `rounded-xl` (default) for the standard OS app-icon look.",
      control: "select",
      options: [
        "rounded-none",
        "rounded-sm",
        "rounded-md",
        "rounded-lg",
        "rounded-xl",
        "rounded-2xl",
        "rounded-full",
      ],
      table: {
        defaultValue: { summary: "rounded-md" },
      },
    },
    alt: {
      description:
        'Alt text surfaced to screen readers. Defaults to `"commitpt logo"`. Set to `""` when the logo is decorative and a visible label already identifies it (e.g., a product wordmark sits right next to it).',
      control: "text",
      table: {
        defaultValue: { summary: '"commitpt logo"' },
      },
    },
    className: {
      description:
        "Additional Tailwind classes merged onto the `<img>` element. Useful for adding shadows, rings, or custom sizing via CSS.",
      control: false,
    },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    size: 40,
    rounded: "rounded-md",
    alt: "commitpt logo",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use the **Controls** panel to explore `size` and `rounded` combinations. Drag the size slider and switch between radius presets to find the right fit for your layout.",
      },
    },
  },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <Grid>
      {ALL_SIZES.map((size) => (
        <LabeledRow key={size} label={`${size}px`}>
          <Logo size={size} />
        </LabeledRow>
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Size is a **context signal** — pick based on the surrounding layout density, not aesthetics.

- **24px** — inline with text, badge-level presence, very dense toolbars.
- **32px** — compact navigation bars, list items with metadata, sidebar headers.
- **40px** — the right default for most app headers and navigation components.
- **64px** — settings pages, feature introductions, profile headers.
- **96px** — onboarding splash screens, empty state illustrations.

Avoid arbitrary sizes. Anchoring to these values keeps the visual scale consistent across the product.
        `,
      },
    },
  },
};

// ─── Border Radius ────────────────────────────────────────────────────────────

export const BorderRadius: Story = {
  render: () => (
    <Grid>
      {ALL_ROUNDED.map((rounded) => (
        <LabeledRow key={rounded} label={rounded}>
          <Logo size={56} rounded={rounded} />
        </LabeledRow>
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: `
The \`rounded\` prop accepts any Tailwind border-radius class.

**When to use which:**
- \`rounded-sm\` / \`rounded-md\` — document thumbnails, image cards, tight grids.
- \`rounded-lg\` — general purpose; fits most product UI contexts.
- \`rounded-xl\` *(default)* — matches the iOS/Android app icon rounding convention. Use this in nav bars and headers.
- \`rounded-2xl\` — onboarding cards, splash screens, marketing sections.
- \`rounded-full\` — avatar-style circular badges, social profile contexts.

Do not mix radii within the same UI region — pick one and stay consistent.
        `,
      },
    },
  },
};

// ─── In Context ───────────────────────────────────────────────────────────────

export const InContext: Story = {
  render: () => (
    <Grid>
      <div>
        <p className="mb-3 font-mono text-xs text-muted-foreground">App nav bar</p>
        <div className="flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 shadow-sm">
          <Logo size={32} />
          <span className="font-semibold text-sm text-foreground">commitpt</span>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Dashboard</span>
            <span className="text-xs text-muted-foreground">Projects</span>
            <span className="text-xs text-muted-foreground">Settings</span>
          </div>
        </div>
      </div>

      <div>
        <p className="mb-3 font-mono text-xs text-muted-foreground">Sidebar header</p>
        <div className="flex w-48 flex-col gap-1 rounded-lg border border-border bg-background p-3">
          <div className="flex items-center gap-2 pb-2">
            <Logo size={28} rounded="rounded-lg" />
            <span className="text-sm font-semibold text-foreground">commitpt</span>
          </div>
          <div className="h-px bg-border" />
          <span className="mt-1 rounded px-2 py-1 text-xs text-muted-foreground hover:bg-elevated">
            Overview
          </span>
          <span className="rounded px-2 py-1 text-xs text-muted-foreground hover:bg-elevated">
            Projects
          </span>
          <span className="rounded px-2 py-1 text-xs text-muted-foreground hover:bg-elevated">
            Members
          </span>
        </div>
      </div>

      <div>
        <p className="mb-3 font-mono text-xs text-muted-foreground">Splash / onboarding hero</p>
        <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-background px-10 py-8">
          <Logo size={80} rounded="rounded-2xl" />
          <div className="text-center">
            <p className="font-semibold text-foreground">Welcome to commitpt</p>
            <p className="text-xs text-muted-foreground mt-1">
              Your team's commit intelligence platform
            </p>
          </div>
        </div>
      </div>

      <div>
        <p className="mb-3 font-mono text-xs text-muted-foreground">Avatar / circular badge</p>
        <Row>
          <Logo size={40} rounded="rounded-full" />
          <Logo size={32} rounded="rounded-full" />
          <Logo size={24} rounded="rounded-full" />
        </Row>
      </div>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Real product placements for the Logo component.

The logo adapts naturally across contexts by varying \`size\` and \`rounded\` — the underlying asset and shape remain stable. Notice how the radius convention shifts by context:

- **Nav bars / sidebars** — \`rounded-xl\` or \`rounded-lg\` to match app icon convention.
- **Onboarding / splash** — \`rounded-2xl\` for a softer, more welcoming appearance.
- **Avatar rows / circular badges** — \`rounded-full\` when fitting into an avatar-list pattern.

The logo should never compete with interactive elements for attention. Pair it with muted navigation labels, not primary CTAs.
        `,
      },
    },
  },
};

// ─── Accessibility ────────────────────────────────────────────────────────────

export const Accessibility: Story = {
  render: () => (
    <Grid>
      <div>
        <p className="mb-3 font-mono text-xs text-muted-foreground">
          Meaningful alt text (logo is the primary identifier)
        </p>
        <Logo size={40} alt="commitpt logo" />
      </div>

      <div>
        <p className="mb-3 font-mono text-xs text-muted-foreground">
          Decorative — alt="" (wordmark already labels the product)
        </p>
        <div className="flex items-center gap-2">
          <Logo size={40} alt="" />
          <span className="font-semibold text-foreground">commitpt</span>
        </div>
      </div>

      <div>
        <p className="mb-3 font-mono text-xs text-muted-foreground">
          Linked logo — ensure the anchor has a label
        </p>
        <a
          href="/"
          aria-label="commitpt — go to home"
          className="inline-block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Logo size={40} alt="" />
        </a>
      </div>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Alt text strategy

\`alt\` defaults to \`"commitpt logo"\`, which is correct when the logo is the only brand identifier visible.

Set \`alt=""\` when a visible wordmark or page heading already labels the product — duplicate announcements are noise for screen reader users.

\`\`\`tsx
// ✅ Logo is the sole identifier
<Logo size={40} />

// ✅ Wordmark is present — logo is decorative
<div className="flex items-center gap-2">
  <Logo size={40} alt="" />
  <span>commitpt</span>
</div>
\`\`\`

### Linked logos

When the logo is wrapped in an anchor (common "go to home" pattern), the anchor itself needs the accessible name — not the image:

\`\`\`tsx
// ✅ Correct — anchor carries the label
<a href="/" aria-label="commitpt — go to home">
  <Logo size={40} alt="" />
</a>

// ❌ Avoid — redundant announcements (link + image both name the logo)
<a href="/">
  <Logo size={40} alt="commitpt logo" />
</a>
\`\`\`

### Touch targets

The Logo is not interactive by default. When made clickable, ensure the wrapping element is at least \`44×44px\` to meet WCAG 2.5.5. A logo smaller than 44px still satisfies this if you add padding to the anchor.
        `,
      },
    },
  },
};
