import type { Meta, StoryObj } from "@storybook/react";
import {
  ArrowRight,
  Download,
  ExternalLink,
  FolderPlus,
  LogIn,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import * as React from "react";

import { Button } from "./button";

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
      <span className="w-28 shrink-0 font-mono text-xs text-muted-foreground">{label}</span>
      <Row>{children}</Row>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const ALL_VARIANTS = ["default", "secondary", "outline", "ghost", "destructive", "link"] as const;

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: "Base Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
The \`Button\` component is the primary interactive element in the design system.
It maps directly to a semantic \`<button>\` element and supports six visual variants,
four sizes, icon composition, loading states, and the \`asChild\` escape hatch for
rendering as any element (e.g. a router \`<Link>\`).

---

### Design tokens

| Variant | Token family | When to use |
|---|---|---|
| \`default\` | \`primary\` (blue) | The single most important action in a view |
| \`secondary\` | \`secondary\` (purple) | Supporting actions alongside a primary CTA |
| \`outline\` | \`primary\` border + text | Lower-emphasis actions that still need clear affordance |
| \`ghost\` | Transparent | Toolbar actions, table row controls, nav items |
| \`destructive\` | Red semantic | Irreversible actions — always pair with a confirmation |
| \`link\` | \`primary\` text | Inline navigation-style actions |

---

### Accessibility

- Every icon-only button **must** have an \`aria-label\`.
- Loading state automatically sets \`aria-busy\` and \`disabled\` — no extra props needed.
- Focus ring uses \`focus-visible\` so mouse users are never shown a ring.
- Minimum touch target is \`36×36px\` (\`size="default"\`). On mobile, prefer \`size="lg"\`.

---

### Composition

Use \`asChild\` to render a router link styled as a button:

\`\`\`tsx
<Button asChild>
  <Link href="/dashboard">Go to dashboard</Link>
</Button>
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description:
        "Controls the visual weight and semantic intent of the button. Choose based on the action's importance in context, not aesthetics.",
      control: "select",
      options: ["default", "secondary", "outline", "ghost", "destructive", "link"],
      table: {
        defaultValue: { summary: "default" },
      },
    },
    size: {
      description:
        "Controls height and horizontal padding. Drive size decisions from context density — not preference. Use `icon` only for square icon-only buttons.",
      control: "select",
      options: ["default", "sm", "lg", "icon"],
      table: {
        defaultValue: { summary: "default" },
      },
    },
    loading: {
      description:
        "Puts the button in a loading state: prepends a spinner, sets `disabled`, and sets `aria-busy`. Use this for any async action (form submit, API call). Never manually combine `disabled + loading`.",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      description:
        "Disables the button without implying an async operation. Use only when the action is temporarily unavailable **and** the reason is clear from surrounding context. If it's permanently unavailable for this user, prefer hiding the button.",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    asChild: {
      description:
        "Merges Button's props onto its immediate child instead of rendering a `<button>`. Use with router links (`<Link>`), anchors, or any element that needs button styling.",
      control: false,
    },
    children: {
      description:
        "Button label, icon, or both. For icon-only buttons, omit text and set an `aria-label` on the button.",
      control: "text",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    children: "Get started",
    variant: "default",
    size: "default",
    loading: false,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use the **Controls** panel to explore every prop combination before committing to code. Try toggling `loading` on a `ghost` variant or combining `size="lg"` with `variant="destructive"` to see how the system handles edge cases.',
      },
    },
  },
};

// ─── Variants ─────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <Grid>
      <LabeledRow label="default">
        <Button variant="default">Create project</Button>
      </LabeledRow>
      <LabeledRow label="secondary">
        <Button variant="secondary">Save changes</Button>
      </LabeledRow>
      <LabeledRow label="outline">
        <Button variant="outline">Edit profile</Button>
      </LabeledRow>
      <LabeledRow label="ghost">
        <Button variant="ghost">Cancel</Button>
      </LabeledRow>
      <LabeledRow label="destructive">
        <Button variant="destructive">Delete account</Button>
      </LabeledRow>
      <LabeledRow label="link">
        <Button variant="link">View documentation</Button>
      </LabeledRow>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: `
**Hierarchy is the goal, not variety.** Most views should have at most one \`default\` button — the others exist to support it.

- Use \`default\` for the primary CTA only. Two primary buttons in one view signals missing hierarchy.
- Use \`secondary\` for actions that matter but compete with the primary. Good pairing: \`default\` "Publish" + \`secondary\` "Save draft".
- Use \`outline\` in toolbars or button groups where all actions share equal weight.
- Use \`ghost\` for table row actions, nav items, or anywhere the button chrome would clutter the layout.
- Use \`destructive\` sparingly — reserve it for irreversible actions and always confirm before executing.
- Use \`link\` for inline actions that feel like navigation rather than commands.
        `,
      },
    },
  },
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <Grid>
      <LabeledRow label="sm — h-7">
        <Button size="sm">Compact action</Button>
        <Button size="sm" variant="outline">
          Cancel
        </Button>
        <Button size="sm" variant="ghost">
          Skip
        </Button>
      </LabeledRow>
      <LabeledRow label="default — h-9">
        <Button size="default">Create project</Button>
        <Button size="default" variant="outline">
          Cancel
        </Button>
        <Button size="default" variant="ghost">
          Learn more
        </Button>
      </LabeledRow>
      <LabeledRow label="lg — h-11">
        <Button size="lg">Get started</Button>
        <Button size="lg" variant="outline">
          Sign in
        </Button>
        <Button size="lg" variant="secondary">
          Book a demo
        </Button>
      </LabeledRow>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Size is a **density signal**, not a style preference.

- \`sm\` — compact toolbars, inline table actions, helper buttons inside form fields.
- \`default\` — the right choice for 95% of product UI. Forms, modals, cards.
- \`lg\` — hero sections, empty states, onboarding flows. Only when the button must command full attention. Avoid mixing \`lg\` with \`default\` in the same action group.

There is no \`xl\`. If you feel like you need one, you're designing a landing page, not product UI.
        `,
      },
    },
  },
};

// ─── Icon Only ────────────────────────────────────────────────────────────────

export const IconOnly: Story = {
  render: () => (
    <Grid>
      {ALL_VARIANTS.map((variant) => (
        <LabeledRow key={variant} label={variant}>
          <Button size="icon" variant={variant} aria-label="Create new item">
            <Plus />
          </Button>
          <Button size="icon" variant={variant} aria-label="Edit item">
            <Pencil />
          </Button>
          <Button size="icon" variant={variant} aria-label="Delete item">
            <Trash2 />
          </Button>
          <Button size="icon" variant={variant} aria-label="Refresh">
            <RefreshCw />
          </Button>
        </LabeledRow>
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Icon-only buttons collapse the affordance to a single glyph. This requires strict discipline:

- **Always set \`aria-label\`** — without visible text, the button is completely inaccessible to screen readers.
- Prefer icons with universal meaning: \`+\`, \`×\`, ⚙, ✎. Avoid icons that require domain knowledge.
- Use \`ghost\` in toolbars to reduce visual noise. Reserve \`default\` for the one promoted action (e.g., a primary FAB).
- \`destructive\` icon buttons (trash, revoke) should still trigger a confirmation — the lack of a visible label makes accidental clicks more likely.
- The \`icon\` size (\`36×36px\`) meets the WCAG 2.5.5 minimum target. On mobile, wrap in a larger tap target or switch to \`size="lg"\` with a custom icon size.
        `,
      },
    },
  },
};

// ─── Icon Left ────────────────────────────────────────────────────────────────

export const IconLeft: Story = {
  render: () => (
    <Grid>
      {ALL_VARIANTS.map((variant) => (
        <LabeledRow key={variant} label={variant}>
          <Button variant={variant}>
            <Plus />
            Create project
          </Button>
          <Button variant={variant}>
            <Upload />
            Upload file
          </Button>
          <Button variant={variant}>
            <Save />
            Save changes
          </Button>
          <Button variant={variant}>
            <Trash2 />
            Delete
          </Button>
        </LabeledRow>
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: `
A leading icon reinforces the label **before** the user reads the text — ideal when the icon adds genuine clarity.

**When to use:** The icon and label are semantically related (\`<Plus /> Create\`, \`<Upload /> Upload\`). The icon removes ambiguity, not just adds decoration.

**When to avoid:** The icon is decorative and adds no information beyond what the label already says. If removing the icon doesn't hurt comprehension, don't include it.
        `,
      },
    },
  },
};

// ─── Icon Right ───────────────────────────────────────────────────────────────

export const IconRight: Story = {
  render: () => (
    <Grid>
      {ALL_VARIANTS.map((variant) => (
        <LabeledRow key={variant} label={variant}>
          <Button variant={variant}>
            Continue
            <ArrowRight />
          </Button>
          <Button variant={variant}>
            Download
            <Download />
          </Button>
          <Button variant={variant}>
            Open docs
            <ExternalLink />
          </Button>
        </LabeledRow>
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: `
A trailing icon implies **directionality or consequence** — what happens after the action.

- \`<ArrowRight />\` → the user moves forward in a flow
- \`<Download />\` → something leaves the server and goes to the user
- \`<ExternalLink />\` → the user leaves the current context

**When to avoid:** Permanence icons (\`<Trash2 />\`, \`<Check />\`) should never trail. They describe the action, not its direction — place them on the left or use icon-only.
        `,
      },
    },
  },
};

// ─── Loading ──────────────────────────────────────────────────────────────────

export const Loading: Story = {
  render: () => (
    <Grid>
      {ALL_VARIANTS.map((variant) => (
        <LabeledRow key={variant} label={variant}>
          <Button variant={variant} loading>
            Saving…
          </Button>
          <Button variant={variant} loading>
            <Plus />
            Creating…
          </Button>
          <Button size="icon" variant={variant} loading aria-label="Loading" />
        </LabeledRow>
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Set \`loading={true}\` whenever an async operation is in flight after the button is pressed.

The component automatically:
- Prepends a \`<Loader2 />\` spinner (animated)
- Sets \`disabled\` to block double-submits
- Sets \`aria-busy="true"\` for screen readers

**Best practices:**
- Change the label to reflect the in-progress state: "Save" → "Saving…", "Create" → "Creating…". This removes ambiguity about whether the click registered.
- Don't manually set \`disabled\` alongside \`loading\` — it's redundant.
- If the button has a fixed width in your layout, consider locking it to prevent layout shift when the spinner appears.
        `,
      },
    },
  },
};

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  render: () => (
    <Grid>
      {ALL_VARIANTS.map((variant) => (
        <LabeledRow key={variant} label={variant}>
          <Button variant={variant} disabled>
            Publish
          </Button>
          <Button variant={variant} disabled>
            <Save />
            Save changes
          </Button>
          <Button size="icon" variant={variant} disabled aria-label="Add item">
            <Plus />
          </Button>
        </LabeledRow>
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: `
\`disabled\` removes pointer events and reduces opacity to 40%.

**When it's appropriate:**
- The action is temporarily unavailable and the reason is obvious from context (e.g., a "Submit" button on an incomplete form — though inline validation is usually better UX).

**When to avoid it:**
- If the action is permanently unavailable for this user, hiding the button is clearer than disabling it.
- If the reason for the disabled state isn't immediately obvious, add a \`Tooltip\` explaining why.
- Never disable a button and leave the user guessing. A disabled button with no explanation is a dead end.

> Do not confuse \`disabled\` (action unavailable) with \`loading\` (action in progress). They have different semantics.
        `,
      },
    },
  },
};

// ─── Full Width ───────────────────────────────────────────────────────────────

export const FullWidth: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-3">
      <Button className="w-full">Sign in</Button>
      <Button className="w-full" variant="outline">
        Continue with Google
      </Button>
      <Button className="w-full" variant="ghost">
        Create an account
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Pass \`className="w-full"\` when the button must fill its container.

**Good use cases:** Authentication forms, mobile bottom-bar actions, card footers with a single CTA, onboarding steps.

**Avoid on desktop:** A full-width button in a wide content area draws disproportionate attention. If you're on desktop, consider a centered group of standard-width buttons instead.
        `,
      },
    },
  },
};

// ─── Button Group ─────────────────────────────────────────────────────────────

export const ButtonGroup: Story = {
  render: () => (
    <Grid>
      <div>
        <p className="mb-3 font-mono text-xs text-muted-foreground">Primary + Ghost</p>
        <Row>
          <Button>Save changes</Button>
          <Button variant="ghost">Cancel</Button>
        </Row>
      </div>

      <div>
        <p className="mb-3 font-mono text-xs text-muted-foreground">Primary + Outline</p>
        <Row>
          <Button>Publish</Button>
          <Button variant="outline">Save draft</Button>
        </Row>
      </div>

      <div>
        <p className="mb-3 font-mono text-xs text-muted-foreground">Destructive confirmation</p>
        <Row>
          <Button variant="destructive">
            <Trash2 />
            Delete account
          </Button>
          <Button variant="ghost">Cancel</Button>
        </Row>
      </div>

      <div>
        <p className="mb-3 font-mono text-xs text-muted-foreground">Toolbar (equal weight)</p>
        <Row>
          <Button size="icon" variant="outline" aria-label="New folder">
            <FolderPlus />
          </Button>
          <Button size="icon" variant="outline" aria-label="Upload">
            <Upload />
          </Button>
          <Button size="icon" variant="outline" aria-label="Refresh">
            <RefreshCw />
          </Button>
          <Button size="icon" variant="outline" aria-label="Edit">
            <Pencil />
          </Button>
          <Button size="icon" variant="ghost" aria-label="Delete">
            <Trash2 />
          </Button>
        </Row>
      </div>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Button groups communicate action hierarchy at a glance. The combination of variants is the signal.

**Proven pairings:**
- \`default\` + \`ghost\`: Confirm + cancel. The clearest hierarchy — one obvious primary, one escape hatch.
- \`default\` + \`outline\`: Two legitimate options with a clear leader (publish vs. draft).
- \`destructive\` + \`ghost\`: Always pair a destructive action with an explicit cancel. Never leave a destructive button alone.
- \`outline\` × n: Toolbar pattern — all actions share equal weight.

**Rules:**
- Never place two \`default\` buttons side by side.
- A \`destructive\` button should never be the only option — always offer a cancel path.
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
        <p className="mb-3 font-mono text-xs text-muted-foreground">Onboarding CTA</p>
        <Row>
          <Button size="lg">
            Get started
            <ArrowRight />
          </Button>
          <Button size="lg" variant="outline">
            Book a demo
          </Button>
        </Row>
      </div>

      <div>
        <p className="mb-3 font-mono text-xs text-muted-foreground">Form actions</p>
        <Row>
          <Button>
            <Save />
            Save changes
          </Button>
          <Button variant="ghost">Cancel</Button>
        </Row>
      </div>

      <div>
        <p className="mb-3 font-mono text-xs text-muted-foreground">Authentication</p>
        <Row>
          <Button>
            <LogIn />
            Sign in
          </Button>
          <Button variant="link">Forgot password?</Button>
        </Row>
      </div>

      <div>
        <p className="mb-3 font-mono text-xs text-muted-foreground">Async action (in flight)</p>
        <Row>
          <Button loading>Saving…</Button>
          <Button variant="ghost" disabled>
            Cancel
          </Button>
        </Row>
      </div>

      <div>
        <p className="mb-3 font-mono text-xs text-muted-foreground">Danger zone</p>
        <Row>
          <Button variant="destructive">
            <Trash2 />
            Delete account
          </Button>
          <Button variant="ghost">Keep account</Button>
        </Row>
      </div>

      <div>
        <p className="mb-3 font-mono text-xs text-muted-foreground">File actions</p>
        <Row>
          <Button>
            <Upload />
            Upload
          </Button>
          <Button variant="outline">
            Download
            <Download />
          </Button>
          <Button variant="ghost">
            Open docs
            <ExternalLink />
          </Button>
        </Row>
      </div>

      <div>
        <p className="mb-3 font-mono text-xs text-muted-foreground">Error recovery</p>
        <Row>
          <Button variant="outline">
            <RefreshCw />
            Retry
          </Button>
          <Button variant="ghost">
            <X />
            Dismiss
          </Button>
        </Row>
      </div>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Concrete button patterns lifted from real product scenarios.

These aren't hypothetical — they're the exact combinations you'll reach for when building forms, auth flows, dashboards, and settings pages. Use them as a reference for variant selection in context.

Notice how the variant choice changes based on what surrounds the button: "Cancel" is \`ghost\` next to a primary action, but might be \`outline\` in a modal footer where both options carry equal weight.
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
          Icon-only with aria-label (required)
        </p>
        <Row>
          <Button size="icon" variant="outline" aria-label="Create new project">
            <Plus />
          </Button>
          <Button size="icon" variant="ghost" aria-label="Delete item">
            <Trash2 />
          </Button>
          <Button size="icon" variant="ghost" aria-label="Refresh data">
            <RefreshCw />
          </Button>
        </Row>
      </div>

      <div>
        <p className="mb-3 font-mono text-xs text-muted-foreground">
          Loading with aria-busy (automatic)
        </p>
        <Row>
          <Button loading>Submitting form…</Button>
          <Button size="icon" variant="outline" loading aria-label="Saving" />
        </Row>
      </div>

      <div>
        <p className="mb-3 font-mono text-xs text-muted-foreground">
          Focus ring (keyboard navigation — click then Tab)
        </p>
        <Row>
          <Button>Primary action</Button>
          <Button variant="outline">Secondary action</Button>
          <Button variant="ghost">Tertiary action</Button>
        </Row>
      </div>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Keyboard navigation
All buttons are reachable via \`Tab\` and activated with \`Enter\` or \`Space\`. No extra handling needed.

### Focus ring
The ring uses \`focus-visible\` — it only appears during keyboard navigation, never on mouse click. The color is driven by \`--color-ring\` (the primary token), ensuring consistent contrast across themes.

### Icon-only buttons
Must always have \`aria-label\`. Without it, a screen reader announces only "button" with no context.

\`\`\`tsx
// ✅ Correct
<Button size="icon" aria-label="Delete project">
  <Trash2 />
</Button>

// ❌ Wrong — no accessible name
<Button size="icon">
  <Trash2 />
</Button>
\`\`\`

### Loading state
Setting \`loading={true}\` automatically applies \`aria-busy="true"\`. Screen readers will announce the button as busy. Consider updating the label text too ("Save" → "Saving…") for a better announced experience.

### Disabled state
Disabled buttons are removed from the tab order by the browser. If you need a disabled button to be discoverable via keyboard (e.g., to show a tooltip explaining why it's disabled), use \`aria-disabled="true"\` and handle click prevention manually — but this is an advanced case.

### Touch targets
\`size="default"\` produces a \`36px\` tall button. \`size="sm"\` produces \`28px\`. WCAG 2.5.5 (AAA) recommends \`44×44px\` minimum on touch devices. For mobile-critical actions, use \`size="lg"\` or add padding via \`className\`.
        `,
      },
    },
  },
};
