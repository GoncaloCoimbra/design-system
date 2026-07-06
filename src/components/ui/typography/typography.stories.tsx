import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import { Typography } from "./typography";

// ─── Layout helpers ──────────────────────────────────────────────────────────

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-6">{children}</div>;
}

function LabeledRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-6">
      <span className="w-28 shrink-0 font-mono text-xs text-muted-foreground">{label}</span>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="border-b border-border pb-2">
        <span className="font-mono text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const HEADINGS = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;
const BODY_VARIANTS = ["lead", "p", "large", "small", "muted"] as const;
const UTILITY_VARIANTS = ["label", "caption", "overline"] as const;
const ALL_COLORS = [
  "default",
  "primary",
  "secondary",
  "muted",
  "success",
  "warning",
  "destructive",
] as const;
const ALL_WEIGHTS = ["normal", "medium", "semibold", "bold"] as const;

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: "UI/Typography",
  component: Typography,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
The \`Typography\` component is the single source of truth for all text in the design system.
It encodes the complete typographic scale — headings, body copy, utility text, and inline
elements — and automatically selects the correct semantic HTML element for each variant.

---

### Variants at a glance

| Group    | Variants                                                      |
|----------|---------------------------------------------------------------|
| Headings | \`h1\` \`h2\` \`h3\` \`h4\` \`h5\` \`h6\`                  |
| Body     | \`lead\` \`p\` \`large\` \`small\` \`muted\`                |
| Utility  | \`label\` \`caption\` \`overline\`                           |
| Inline   | \`code\` \`kbd\` \`blockquote\`                              |

---

### Additional props

| Prop       | Values                                                                       |
|------------|------------------------------------------------------------------------------|
| \`color\`    | \`default\` \`primary\` \`secondary\` \`muted\` \`success\` \`warning\` \`destructive\` \`inherit\` |
| \`weight\`   | \`normal\` \`medium\` \`semibold\` \`bold\`                                  |
| \`align\`    | \`left\` \`center\` \`right\`                                                |
| \`truncate\` | \`true\`                                                                     |
| \`as\`       | Any HTML tag — overrides the default semantic element                        |

---

### Accessibility

- Heading variants render \`<h1>\`–\`<h6>\` by default. Use \`as\` to decouple visual size from semantic level — never skip heading levels for visual effect.
- \`variant="label"\` renders a \`<span>\`. Use the \`<Label>\` component for form controls that need \`htmlFor\`.
- \`variant="kbd"\` renders a \`<kbd>\` element which screen readers announce as a keyboard key.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: "Controls the visual style and the default semantic HTML element rendered.",
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "lead",
        "large",
        "small",
        "muted",
        "label",
        "caption",
        "overline",
        "code",
        "kbd",
        "blockquote",
      ],
      table: { defaultValue: { summary: "p" } },
    },
    color: {
      description:
        "Overrides the text colour using a semantic design token. `default` defers to each variant's built-in colour.",
      control: "select",
      options: [
        "default",
        "primary",
        "secondary",
        "muted",
        "success",
        "warning",
        "destructive",
        "inherit",
      ],
      table: { defaultValue: { summary: "default" } },
    },
    weight: {
      description:
        "Overrides the font weight. When omitted, each variant uses its designed weight.",
      control: "select",
      options: ["normal", "medium", "semibold", "bold"],
      table: { defaultValue: { summary: "—" } },
    },
    align: {
      description: "Controls text alignment.",
      control: "select",
      options: ["left", "center", "right"],
      table: { defaultValue: { summary: "—" } },
    },
    truncate: {
      description:
        "Clips overflowing text with an ellipsis. Requires a bounded width on the element or a parent.",
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    as: {
      description: "Override the rendered HTML element without changing the visual style.",
      control: false,
    },
    children: {
      description: "Text content or any inline React nodes.",
      control: "text",
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    variant: "p",
    color: "default",
    children: "The quick brown fox jumps over the lazy dog.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use the **Controls** panel to freely combine `variant`, `color`, `weight`, `align`, and `truncate`. A good way to verify that any combination renders correctly before committing to code.",
      },
    },
  },
};

// ─── Headings ─────────────────────────────────────────────────────────────────

export const Headings: Story = {
  render: () => (
    <Grid>
      {HEADINGS.map((v) => (
        <LabeledRow key={v} label={v}>
          <Typography variant={v}>The quick brown fox jumps over the lazy dog</Typography>
        </LabeledRow>
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Six heading levels covering the full semantic hierarchy. Each maps to its corresponding \`<h1>\`–\`<h6>\` element.

**Rules:**
- Use only one \`h1\` per page.
- Never skip levels for visual effect — use the \`as\` prop to decouple visual size from semantic level.
- Prefer \`h2\`–\`h4\` for most product UI. \`h5\` and \`h6\` are rarely needed — reach for \`variant="label"\` or \`variant="large"\` instead.
        `,
      },
    },
  },
};

// ─── Body ─────────────────────────────────────────────────────────────────────

export const Body: Story = {
  render: () => (
    <Grid>
      <LabeledRow label="lead">
        <Typography variant="lead">
          A platform for engineering teams to understand commit patterns, ship with confidence, and
          move faster together.
        </Typography>
      </LabeledRow>
      <LabeledRow label="p">
        <Typography variant="p">
          commitpt analyses your team's commit history to surface insights about velocity, review
          bottlenecks, and deployment risk. It integrates with GitHub, GitLab, and Bitbucket in
          under five minutes.
        </Typography>
      </LabeledRow>
      <LabeledRow label="large">
        <Typography variant="large">
          Understand how your team ships code — not just how much.
        </Typography>
      </LabeledRow>
      <LabeledRow label="small">
        <Typography variant="small">
          Connect your repository and invite your team. No agent installation required.
        </Typography>
      </LabeledRow>
      <LabeledRow label="muted">
        <Typography variant="muted">Last synced 3 minutes ago · 142 commits analysed</Typography>
      </LabeledRow>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Five body variants covering the full range of product copy density.

- **\`lead\`** — one per section, immediately after a heading. Sets the reader's expectation.
- **\`p\`** — default choice for all prose. Comfortable 28px line height.
- **\`large\`** — feature taglines, onboarding callouts. Not a heading, not body — in between.
- **\`small\`** — supporting copy, help text, step descriptions.
- **\`muted\`** — metadata, timestamps, word counts. Never primary information.
        `,
      },
    },
  },
};

// ─── Utility text ─────────────────────────────────────────────────────────────

export const UtilityText: Story = {
  render: () => (
    <Grid>
      <LabeledRow label="label">
        <Typography variant="label">Repository URL</Typography>
      </LabeledRow>
      <LabeledRow label="caption">
        <Typography variant="caption">
          Scanned 2,341 commits across 18 branches · Updated just now
        </Typography>
      </LabeledRow>
      <LabeledRow label="overline">
        <Typography variant="overline">Top contributors this sprint</Typography>
      </LabeledRow>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Three utility variants for non-prose UI text.

- **\`label\`** — form field labels, section group headers, control descriptions. Renders as \`<span>\`; use \`<Label>\` for actual form controls.
- **\`caption\`** — 12px annotation text. Image captions, table footnotes, secondary metadata.
- **\`overline\`** — 12px uppercase with wide letter-spacing. Eyebrow text above a heading, category tags, section labels in sidebars.
        `,
      },
    },
  },
};

// ─── Inline & special ─────────────────────────────────────────────────────────

export const InlineAndSpecial: Story = {
  render: () => (
    <Grid>
      <LabeledRow label="code">
        <Typography variant="code">npm install @commitpt/design-system</Typography>
      </LabeledRow>
      <LabeledRow label="kbd">
        <div className="flex items-center gap-1.5">
          <Typography variant="kbd">⌘</Typography>
          <Typography variant="muted">+</Typography>
          <Typography variant="kbd">K</Typography>
          <Typography variant="muted" className="ml-2">
            Open command palette
          </Typography>
        </div>
      </LabeledRow>
      <LabeledRow label="blockquote">
        <Typography variant="blockquote">
          Design is not just what it looks like and feels like. Design is how it works.
        </Typography>
      </LabeledRow>
      <LabeledRow label="inline code">
        <Typography variant="p">
          Pass{" "}
          <Typography variant="code" as="code">
            variant="primary"
          </Typography>{" "}
          to apply the brand colour, or{" "}
          <Typography variant="code" as="code">
            asChild
          </Typography>{" "}
          to render as any element.
        </Typography>
      </LabeledRow>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: `
- **\`code\`** — monospace inline code on a muted background. Renders \`<code>\`.
- **\`kbd\`** — keyboard shortcut badge with border and shadow depth. Renders \`<kbd>\`. Always use real key symbols (⌘ ⇧ ⌥) rather than "Cmd", "Shift".
- **\`blockquote\`** — bordered left accent for pull quotes and highlighted statements. Renders \`<blockquote>\`.

All three can be embedded inside \`variant="p"\` to mix with body text.
        `,
      },
    },
  },
};

// ─── Colors ───────────────────────────────────────────────────────────────────

export const Colors: Story = {
  render: () => (
    <Grid>
      {ALL_COLORS.map((color) => (
        <LabeledRow key={color} label={color}>
          <Typography variant="p" color={color}>
            {color.charAt(0).toUpperCase() + color.slice(1)} — The quick brown fox jumps over the
            lazy dog.
          </Typography>
        </LabeledRow>
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: `
The \`color\` prop overrides a variant's built-in text colour with a semantic token. Each value has a specific product meaning — don't use colours purely for decoration.

- **\`primary\`** — active items, links, highlighted labels.
- **\`secondary\`** — premium or elevated content indicators.
- **\`muted\`** — supplementary information.
- **\`success\`** — confirmations, positive feedback.
- **\`warning\`** — cautions, non-blocking notices.
- **\`destructive\`** — errors, required-field notices, danger labels.
- **\`inherit\`** — inherits colour from the parent container.
        `,
      },
    },
  },
};

// ─── Weights ──────────────────────────────────────────────────────────────────

export const Weights: Story = {
  render: () => (
    <Grid>
      {ALL_WEIGHTS.map((weight) => (
        <LabeledRow key={weight} label={weight}>
          <Typography variant="p" weight={weight}>
            {weight.charAt(0).toUpperCase() + weight.slice(1)} — The quick brown fox jumps over the
            lazy dog.
          </Typography>
        </LabeledRow>
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: `
The \`weight\` prop overrides the font weight set by each variant. Plus Jakarta Sans is a variable font (200–800) — these four stops cover all product UI needs.

Override weight when you need emphasis within a variant's size without switching to a heading. Don't use weight to fake hierarchy that headings should express.
        `,
      },
    },
  },
};

// ─── Alignment ────────────────────────────────────────────────────────────────

export const Alignment: Story = {
  render: () => (
    <Grid>
      {(["left", "center", "right"] as const).map((align) => (
        <LabeledRow key={align} label={align}>
          <Typography variant="p" align={align} className="w-80">
            {align.charAt(0).toUpperCase() + align.slice(1)}-aligned. Used in table cells, modals,
            and marketing sections.
          </Typography>
        </LabeledRow>
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: `
- **\`left\`** — default for all product UI. Always left-align long-form text.
- **\`center\`** — modals, empty states, splash screens, short CTAs. Never centre multi-line paragraphs.
- **\`right\`** — numeric table columns, trailing metadata. Rarely used for prose.
        `,
      },
    },
  },
};

// ─── Truncation ───────────────────────────────────────────────────────────────

export const Truncation: Story = {
  render: () => (
    <Grid>
      <LabeledRow label="truncate">
        <Typography variant="p" truncate className="max-w-xs">
          This is a very long piece of text that should be clipped with an ellipsis because it
          exceeds the container width.
        </Typography>
      </LabeledRow>
      <LabeledRow label="no truncate">
        <Typography variant="p" className="max-w-xs">
          This is a very long piece of text that should be clipped with an ellipsis because it
          exceeds the container width.
        </Typography>
      </LabeledRow>
      <LabeledRow label="table cell">
        <div className="w-48 rounded border border-border bg-surface px-3 py-2">
          <Typography variant="small" truncate>
            very-long-branch-name/COMMITPT-1234-fix-avatar
          </Typography>
        </div>
      </LabeledRow>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Set \`truncate\` to clip text with \`…\` on overflow. Always pair with a bounded width — \`className="max-w-xs"\` on the element itself or a parent with \`overflow-hidden\`.

**Good use cases:** table cells, sidebar nav items, branch name labels, user-supplied strings.
**Avoid for:** body copy, error messages — anywhere the full content matters to the user.
        `,
      },
    },
  },
};

// ─── Element override ─────────────────────────────────────────────────────────

export const ElementOverride: Story = {
  render: () => (
    <Grid>
      <Section title='Visual h4, semantic h2 — variant="h4" as="h2"'>
        <Typography variant="h4" as="h2">
          Section heading that looks like h4 but is structurally h2
        </Typography>
      </Section>
      <Section title='Decorative large text, no heading — variant="h3" as="p"'>
        <Typography variant="h3" as="p">
          Big decorative text with no heading semantics
        </Typography>
      </Section>
      <Section title='Overline on a div — variant="overline" as="div"'>
        <Typography variant="overline" as="div">
          Top contributors
        </Typography>
      </Section>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Use \`as\` to render any HTML element without changing visual style. This decouples visual hierarchy from semantic hierarchy.

\`\`\`tsx
// Page already has an h1 — visually want h2 size, semantically need h2
<Typography variant="h2" as="h2">Section title</Typography>

// Marketing hero — big text, not a page heading
<Typography variant="h1" as="p">Ship faster.</Typography>

// Sidebar group label — div, not a heading, so it's not in the document outline
<Typography variant="overline" as="div">Projects</Typography>
\`\`\`
        `,
      },
    },
  },
};

// ─── Real World Examples ──────────────────────────────────────────────────────

export const RealWorldExamples: Story = {
  render: () => (
    <Grid>
      <Section title="Article header">
        <div className="flex flex-col gap-2">
          <Typography variant="overline" color="primary">
            Engineering · 5 min read
          </Typography>
          <Typography variant="h2">
            How commitpt reduced our deploy risk by 40% in one sprint
          </Typography>
          <Typography variant="lead">
            By integrating commit pattern analysis into our review workflow, we caught three
            high-risk changes before they ever reached staging.
          </Typography>
          <Typography variant="muted">Published 14 Jan 2025 · Bruno Moisão</Typography>
        </div>
      </Section>

      <Section title="Settings section header">
        <div className="flex flex-col gap-1">
          <Typography variant="h4">Repository connection</Typography>
          <Typography variant="muted">
            Connect a Git provider to begin analysing your team's commit history.
          </Typography>
        </div>
      </Section>

      <Section title="Empty state">
        <div className="flex flex-col items-center gap-2 rounded-lg border border-border bg-surface px-8 py-10 text-center">
          <Typography variant="h4">No commits found</Typography>
          <Typography variant="muted" className="max-w-sm">
            We couldn't find any commits matching your current filters. Try widening the date range
            or clearing the author filter.
          </Typography>
        </div>
      </Section>

      <Section title="Form error">
        <div className="flex flex-col gap-1">
          <Typography variant="label" color="destructive">
            Personal access token
          </Typography>
          <Typography variant="caption" color="destructive">
            Token has expired or doesn't have the required scopes. Generate a new token with{" "}
            <Typography variant="code" as="code">
              repo
            </Typography>{" "}
            access.
          </Typography>
        </div>
      </Section>

      <Section title="Keyboard shortcut reference">
        <div className="flex flex-col gap-2">
          {[
            { keys: ["⌘", "K"], label: "Open command palette" },
            { keys: ["⌘", "⇧", "P"], label: "Toggle project picker" },
            { keys: ["G", "C"], label: "Go to commits" },
          ].map(({ keys, label }) => (
            <div key={label} className="flex items-center justify-between">
              <Typography variant="small">{label}</Typography>
              <div className="flex items-center gap-1">
                {keys.map((k, i) => (
                  <React.Fragment key={i}>
                    <Typography variant="kbd">{k}</Typography>
                    {i < keys.length - 1 && (
                      <Typography variant="caption" className="px-0.5">
                        +
                      </Typography>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Pull quote">
        <div className="max-w-lg">
          <Typography variant="blockquote">
            commitpt gave us visibility we didn't know we were missing. Our review bottleneck
            disappeared within two weeks.
          </Typography>
          <Typography variant="caption" className="mt-2 pl-4">
            — Ana Kovač, Staff Engineer at Acme Corp
          </Typography>
        </div>
      </Section>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Concrete patterns from real product and marketing surfaces. Notice how combinations — not single variants — create hierarchy. An article header uses \`overline\` + \`h2\` + \`lead\` + \`muted\` across four distinct roles.
        `,
      },
    },
  },
};

// ─── All variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <Grid>
      <Section title="Headings">
        {HEADINGS.map((v) => (
          <LabeledRow key={v} label={v}>
            <Typography variant={v}>The quick brown fox jumps over the lazy dog</Typography>
          </LabeledRow>
        ))}
      </Section>
      <Section title="Body">
        {BODY_VARIANTS.map((v) => (
          <LabeledRow key={v} label={v}>
            <Typography variant={v}>The quick brown fox jumps over the lazy dog</Typography>
          </LabeledRow>
        ))}
      </Section>
      <Section title="Utility">
        {UTILITY_VARIANTS.map((v) => (
          <LabeledRow key={v} label={v}>
            <Typography variant={v}>The quick brown fox jumps over the lazy dog</Typography>
          </LabeledRow>
        ))}
      </Section>
      <Section title="Inline & Special">
        <LabeledRow label="code">
          <Typography variant="code">npm install @commitpt/design-system</Typography>
        </LabeledRow>
        <LabeledRow label="kbd">
          <div className="flex gap-1">
            <Typography variant="kbd">⌘</Typography>
            <Typography variant="kbd">K</Typography>
          </div>
        </LabeledRow>
        <LabeledRow label="blockquote">
          <Typography variant="blockquote">A quoted passage or highlighted statement.</Typography>
        </LabeledRow>
      </Section>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All 17 variants in a single view, grouped by role. Use as a quick reference when deciding which variant to reach for.",
      },
    },
  },
};
