import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

// ─── Layout helpers ──────────────────────────────────────────────────────────

function Row({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex flex-wrap items-center gap-4 ${className ?? ""}`}>{children}</div>;
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-6">{children}</div>;
}

function LabeledRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-6">
      <span className="w-24 shrink-0 font-mono text-xs text-muted-foreground">{label}</span>
      <Row>{children}</Row>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const ALL_VARIANTS = ["default", "primary", "secondary"] as const;
const ALL_SIZES = ["sm", "default", "lg", "xl"] as const;

const SAMPLE_USERS = [
  { src: "https://i.pravatar.cc/150?img=1", fallback: "JD", name: "Jane Doe" },
  { src: "https://i.pravatar.cc/150?img=2", fallback: "BM", name: "Bruno Moisão" },
  { src: "https://i.pravatar.cc/150?img=3", fallback: "AK", name: "Ana Kovač" },
  { src: "https://i.pravatar.cc/150?img=4", fallback: "TL", name: "Tom Lee" },
  { src: "https://i.pravatar.cc/150?img=5", fallback: "SR", name: "Sofia Ramos" },
];

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: "Base Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The \`Avatar\` component displays a user or entity's profile image with an automatic
text fallback, configurable border variants using brand colour tokens, and an optional
hover tooltip — all built on \`@radix-ui/react-avatar\` and the design system's \`Tooltip\`.

---

### Variants

| Variant | Border | When to use |
|---|---|---|
| \`default\` | None | Most product contexts — lists, tables, cards |
| \`primary\` | \`primary-500\` (blue) outline | Current user, active/selected member |
| \`secondary\` | \`secondary-500\` (purple) outline | Team leads, special roles, featured members |

---

### Sizes

| Size | Dimensions | Use case |
|---|---|---|
| \`sm\` | 28×28px | Comment threads, compact table rows |
| \`default\` | 36×36px | Nav bars, member lists, cards |
| \`lg\` | 48×48px | Profile headers, dialog triggers |
| \`xl\` | 64×64px | Account settings, user profile pages |

---

### Accessibility

- Always set a meaningful \`alt\` on \`<AvatarImage>\`.
- \`<AvatarFallback>\` text is announced by screen readers when the image fails — use 2-character initials.
- When \`tooltip\` is provided, the avatar trigger exposes the tooltip text so screen readers receive the name even without hover.
- In avatar groups, wrap in \`<ul aria-label="Team members">\` with each avatar in \`<li>\`.

---

### Composition

Compose using the three sub-components \`Avatar\`, \`AvatarImage\`, and \`AvatarFallback\`:

\`\`\`tsx
<Avatar variant="primary" size="lg" tooltip="Jane Doe">
  <AvatarImage src="/avatars/jane.png" alt="Jane Doe" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description:
        "Controls the border ring colour. `default` has no border. `primary` and `secondary` apply an outline in the respective brand token colour.",
      control: "select",
      options: ["default", "primary", "secondary"],
      table: { defaultValue: { summary: "default" } },
    },
    size: {
      description:
        "Sets both width and height. Drive size decisions from layout density — not preference.",
      control: "select",
      options: ["sm", "default", "lg", "xl"],
      table: { defaultValue: { summary: "default" } },
    },
    tooltip: {
      description:
        "When provided, wraps the avatar in a Radix Tooltip that appears on hover and focus. Accepts any React node — most commonly a name string. Omit to render the avatar without a tooltip.",
      control: "text",
      table: { defaultValue: { summary: "undefined" } },
    },
    tooltipSide: {
      description: "Which side the tooltip appears on relative to the avatar.",
      control: "select",
      options: ["top", "right", "bottom", "left"],
      table: { defaultValue: { summary: "top" } },
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    variant: "default",
    size: "default",
    tooltip: "Jane Doe",
    tooltipSide: "top",
  },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="Jane Doe" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Use the **Controls** panel to explore every prop combination. Try toggling `variant` between `primary` and `secondary` and changing `size` to see how the border ring scales.",
      },
    },
  },
};

// ─── Variants ─────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <Grid>
      {ALL_VARIANTS.map((variant) => (
        <LabeledRow key={variant} label={variant}>
          <Avatar variant={variant}>
            <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="Jane Doe" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Avatar variant={variant}>
            <AvatarFallback>BM</AvatarFallback>
          </Avatar>
        </LabeledRow>
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: `
The border ring communicates **selection state or role hierarchy**, not decoration.

- \`default\` — use in the vast majority of cases. Borders add visual weight that competes with other elements.
- \`primary\` — reserve for the **current authenticated user**. Having one avatar visually distinguished at all times helps users immediately locate themselves in collaborative UIs.
- \`secondary\` — for **elevated roles** (team lead, admin, owner) or a secondarily-highlighted member. Do not use both \`primary\` and \`secondary\` to highlight the same person.

Never apply a variant border purely for aesthetics. If everything is highlighted, nothing is.
        `,
      },
    },
  },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <Grid>
      {ALL_SIZES.map((size) => (
        <LabeledRow key={size} label={size}>
          <Avatar size={size}>
            <AvatarImage src="https://i.pravatar.cc/150?img=2" alt="Bruno Moisão" />
            <AvatarFallback>BM</AvatarFallback>
          </Avatar>
          <Avatar size={size} variant="primary">
            <AvatarImage src="https://i.pravatar.cc/150?img=3" alt="Ana Kovač" />
            <AvatarFallback>AK</AvatarFallback>
          </Avatar>
          <Avatar size={size}>
            <AvatarFallback>TL</AvatarFallback>
          </Avatar>
        </LabeledRow>
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Size reflects **context density** — the surrounding layout should drive the choice.

- \`sm\` (28px) — comment threads, tight table rows, avatar stacks in a narrow column.
- \`default\` (36px) — the right choice for most product UI: nav bars, member lists, card headers.
- \`lg\` (48px) — profile headers, dialog triggers, activity feeds where identity is prominent.
- \`xl\` (64px) — account settings pages, user profile views, onboarding steps. Avoid mixing with \`default\` in the same component.
        `,
      },
    },
  },
};

// ─── Tooltip ──────────────────────────────────────────────────────────────────

export const WithTooltip: Story = {
  render: () => (
    <Grid>
      <LabeledRow label="default">
        {SAMPLE_USERS.map((u) => (
          <Avatar key={u.name} tooltip={u.name}>
            <AvatarImage src={u.src} alt={u.name} />
            <AvatarFallback>{u.fallback}</AvatarFallback>
          </Avatar>
        ))}
      </LabeledRow>
      <LabeledRow label="primary">
        {SAMPLE_USERS.map((u) => (
          <Avatar key={u.name} variant="primary" tooltip={u.name}>
            <AvatarImage src={u.src} alt={u.name} />
            <AvatarFallback>{u.fallback}</AvatarFallback>
          </Avatar>
        ))}
      </LabeledRow>
      <LabeledRow label="fallback">
        {SAMPLE_USERS.map((u) => (
          <Avatar key={u.name} tooltip={u.name}>
            <AvatarFallback>{u.fallback}</AvatarFallback>
          </Avatar>
        ))}
      </LabeledRow>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Pass any string (or React node) to \`tooltip\` to show a name on hover and focus.

**When to use:** Whenever the avatar appears without a visible name label alongside it — stacked groups, toolbar icons, compact tables. The tooltip restores the missing context.

**When to omit:** When a visible name label is already adjacent to the avatar (e.g., a member list row with "Jane Doe" in a \`<span>\`). Duplicate information is noise.

The tooltip is powered by Radix UI — it is keyboard-accessible and screen-reader-friendly without any extra configuration.
        `,
      },
    },
  },
};

// ─── Fallback only ────────────────────────────────────────────────────────────

export const FallbackOnly: Story = {
  render: () => (
    <Grid>
      {ALL_VARIANTS.map((variant) => (
        <LabeledRow key={variant} label={variant}>
          {ALL_SIZES.map((size) => (
            <Avatar key={size} variant={variant} size={size} tooltip="Bruno Moisão">
              <AvatarFallback>BM</AvatarFallback>
            </Avatar>
          ))}
        </LabeledRow>
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: `
The fallback renders initials on a muted background when no image is available — or when the image fails to load.

**Best practices:**
- Use exactly **2 characters** (e.g. "JD" for Jane Doe). Single characters are acceptable for single-name entities.
- The fallback background (\`--color-elevated\`) and text colour (\`--color-muted-foreground\`) are intentionally low-contrast — the avatar is a supporting element, not a primary CTA.
- Always provide \`<AvatarFallback>\` even when you have an image URL. Network failures are real.
        `,
      },
    },
  },
};

// ─── Avatar Group ─────────────────────────────────────────────────────────────

export const AvatarGroup: Story = {
  render: () => (
    <Grid>
      <div>
        <p className="mb-3 font-mono text-xs text-muted-foreground">Stacked group (5 members)</p>
        <ul aria-label="Team members" className="flex -space-x-2">
          {SAMPLE_USERS.map((u) => (
            <li key={u.name}>
              <Avatar tooltip={u.name} className="ring-2 ring-background">
                <AvatarImage src={u.src} alt={u.name} />
                <AvatarFallback>{u.fallback}</AvatarFallback>
              </Avatar>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="mb-3 font-mono text-xs text-muted-foreground">
          Stacked group with current user highlighted
        </p>
        <ul aria-label="Team members" className="flex -space-x-2">
          {SAMPLE_USERS.slice(0, 4).map((u, i) => (
            <li key={u.name}>
              <Avatar
                variant={i === 0 ? "primary" : "default"}
                tooltip={i === 0 ? `${u.name} (you)` : u.name}
                className="ring-2 ring-background"
              >
                <AvatarImage src={u.src} alt={u.name} />
                <AvatarFallback>{u.fallback}</AvatarFallback>
              </Avatar>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="mb-3 font-mono text-xs text-muted-foreground">Overflow counter</p>
        <ul aria-label="Team members" className="flex -space-x-2">
          {SAMPLE_USERS.slice(0, 3).map((u) => (
            <li key={u.name}>
              <Avatar tooltip={u.name} className="ring-2 ring-background">
                <AvatarImage src={u.src} alt={u.name} />
                <AvatarFallback>{u.fallback}</AvatarFallback>
              </Avatar>
            </li>
          ))}
          <li>
            <Avatar className="ring-2 ring-background" tooltip="12 more members">
              <AvatarFallback>+12</AvatarFallback>
            </Avatar>
          </li>
        </ul>
      </div>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Avatar groups use negative margin (\`-space-x-2\`) to create the stacking effect, with
\`ring-2 ring-background\` to separate overlapping avatars visually.

**Key patterns:**
- Highlight the current user with \`variant="primary"\` and suffix their name with "(you)" in the tooltip.
- Cap visible avatars at 3–5. Beyond that, replace additional avatars with an overflow counter (\`+N\`).
- Always wrap in \`<ul aria-label="Team members">\` with each avatar in \`<li>\` — this gives assistive technology list context.
- Tooltips on each avatar are especially important in groups because no name labels are visible.
        `,
      },
    },
  },
};

// ─── Real World Examples ──────────────────────────────────────────────────────

export const RealWorldExamples: Story = {
  render: () => (
    <Grid>
      <div>
        <p className="mb-3 font-mono text-xs text-muted-foreground">Nav bar — current user</p>
        <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-surface px-4 py-2">
          <span className="text-sm font-semibold text-foreground">commitpt</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Dashboard</span>
            <span className="text-xs text-muted-foreground">Projects</span>
            <Avatar variant="primary" size="sm" tooltip="Bruno Moisão (you)">
              <AvatarImage src="https://i.pravatar.cc/150?img=2" alt="Bruno Moisão" />
              <AvatarFallback>BM</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      <div>
        <p className="mb-3 font-mono text-xs text-muted-foreground">Member list row</p>
        <div className="flex w-72 flex-col gap-1 rounded-lg border border-border bg-surface p-3">
          {SAMPLE_USERS.slice(0, 3).map((u, i) => (
            <div
              key={u.name}
              className="flex items-center gap-3 rounded px-2 py-1.5 hover:bg-elevated"
            >
              <Avatar size="sm" variant={i === 0 ? "secondary" : "default"}>
                <AvatarImage src={u.src} alt={u.name} />
                <AvatarFallback>{u.fallback}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs font-medium text-foreground">{u.name}</p>
                <p className="text-[10px] text-muted-foreground">{i === 0 ? "Owner" : "Member"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 font-mono text-xs text-muted-foreground">Profile header</p>
        <div className="flex items-center gap-4 rounded-lg border border-border bg-surface px-5 py-4">
          <Avatar size="xl" variant="primary">
            <AvatarImage src="https://i.pravatar.cc/150?img=2" alt="Bruno Moisão" />
            <AvatarFallback>BM</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground">Bruno Moisão</p>
            <p className="text-xs text-muted-foreground">brunomoisao@wearepixelmatters.com</p>
            <p className="mt-1 text-[10px] font-medium text-primary-400">Admin</p>
          </div>
        </div>
      </div>

      <div>
        <p className="mb-3 font-mono text-xs text-muted-foreground">Assigned to — task card</p>
        <div className="flex w-64 flex-col gap-2 rounded-lg border border-border bg-surface px-4 py-3">
          <p className="text-xs font-medium text-foreground">Fix avatar border radius on Safari</p>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground">Assigned to</span>
            <ul aria-label="Assignees" className="flex -space-x-1.5">
              {SAMPLE_USERS.slice(0, 3).map((u) => (
                <li key={u.name}>
                  <Avatar size="sm" tooltip={u.name} className="ring-2 ring-surface">
                    <AvatarImage src={u.src} alt={u.name} />
                    <AvatarFallback>{u.fallback}</AvatarFallback>
                  </Avatar>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Concrete product placements for the Avatar component.

Notice how \`variant\` choices shift with context:
- In a **nav bar**, the current user gets \`primary\` — one avatar among UI chrome.
- In a **member list**, the owner gets \`secondary\` — distinguished from peers, not from the system.
- On a **profile header**, \`primary\` + \`xl\` is appropriate because the whole page is about that person.
- In a **task card**, \`default\` with \`ring-surface\` stacking keeps assignee avatars compact and unobtrusive.
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
          Meaningful alt text on AvatarImage (required)
        </p>
        <Row>
          <Avatar>
            <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="Jane Doe" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </Row>
      </div>

      <div>
        <p className="mb-3 font-mono text-xs text-muted-foreground">
          Tooltip surfaces the name to keyboard/screen reader users
        </p>
        <Row>
          {SAMPLE_USERS.slice(0, 3).map((u) => (
            <Avatar key={u.name} tooltip={u.name}>
              <AvatarImage src={u.src} alt={u.name} />
              <AvatarFallback>{u.fallback}</AvatarFallback>
            </Avatar>
          ))}
        </Row>
      </div>

      <div>
        <p className="mb-3 font-mono text-xs text-muted-foreground">
          Avatar group with semantic list markup
        </p>
        <ul aria-label="Project members" className="flex -space-x-2">
          {SAMPLE_USERS.map((u) => (
            <li key={u.name}>
              <Avatar tooltip={u.name} className="ring-2 ring-background">
                <AvatarImage src={u.src} alt={u.name} />
                <AvatarFallback>{u.fallback}</AvatarFallback>
              </Avatar>
            </li>
          ))}
        </ul>
      </div>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Image alt text

Always pass a full name (not initials) as \`alt\` on \`<AvatarImage>\`:

\`\`\`tsx
// ✅ Correct
<AvatarImage src="/jane.png" alt="Jane Doe" />

// ❌ Wrong — initials are not a meaningful description
<AvatarImage src="/jane.png" alt="JD" />
\`\`\`

### Fallback text

\`<AvatarFallback>\` is announced as text by screen readers when the image fails or is absent.
Two-character initials are concise enough not to be disruptive.

### Tooltip accessibility

When \`tooltip\` is provided, Radix UI wraps the trigger with \`aria-describedby\` pointing to the tooltip content.
This means keyboard users navigating via \`Tab\` will hear the name announced without needing to hover.

### Avatar groups

Wrap stacked avatars in a \`<ul>\` with \`aria-label\` so screen readers announce the group size and purpose before reading individual items:

\`\`\`tsx
<ul aria-label="Project members" className="flex -space-x-2">
  <li><Avatar tooltip="Jane Doe">…</Avatar></li>
  <li><Avatar tooltip="Bruno Moisão">…</Avatar></li>
</ul>
\`\`\`
        `,
      },
    },
  },
};
