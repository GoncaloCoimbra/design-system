import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

const meta: Meta = {
  title: "Brand Identity/Spacing",
  parameters: { layout: "padded" },
};
export default meta;

// ─── Spacing scale ────────────────────────────────────────────────────────────
// Tailwind v4 default scale — 1 unit = 0.25rem = 4px

const SPACING_SCALE = [
  { step: "0", rem: "0rem", px: "0px", tailwind: "p-0 / m-0 / gap-0" },
  { step: "0.5", rem: "0.125rem", px: "2px", tailwind: "p-0.5 / gap-0.5" },
  { step: "1", rem: "0.25rem", px: "4px", tailwind: "p-1 / gap-1" },
  { step: "1.5", rem: "0.375rem", px: "6px", tailwind: "p-1.5 / gap-1.5" },
  { step: "2", rem: "0.5rem", px: "8px", tailwind: "p-2 / gap-2" },
  { step: "2.5", rem: "0.625rem", px: "10px", tailwind: "p-2.5 / gap-2.5" },
  { step: "3", rem: "0.75rem", px: "12px", tailwind: "p-3 / gap-3" },
  { step: "3.5", rem: "0.875rem", px: "14px", tailwind: "p-3.5 / gap-3.5" },
  { step: "4", rem: "1rem", px: "16px", tailwind: "p-4 / gap-4" },
  { step: "5", rem: "1.25rem", px: "20px", tailwind: "p-5 / gap-5" },
  { step: "6", rem: "1.5rem", px: "24px", tailwind: "p-6 / gap-6" },
  { step: "7", rem: "1.75rem", px: "28px", tailwind: "p-7 / gap-7" },
  { step: "8", rem: "2rem", px: "32px", tailwind: "p-8 / gap-8" },
  { step: "9", rem: "2.25rem", px: "36px", tailwind: "p-9 / gap-9" },
  { step: "10", rem: "2.5rem", px: "40px", tailwind: "p-10 / gap-10" },
  { step: "12", rem: "3rem", px: "48px", tailwind: "p-12 / gap-12" },
  { step: "14", rem: "3.5rem", px: "56px", tailwind: "p-14 / gap-14" },
  { step: "16", rem: "4rem", px: "64px", tailwind: "p-16 / gap-16" },
  { step: "20", rem: "5rem", px: "80px", tailwind: "p-20 / gap-20" },
  { step: "24", rem: "6rem", px: "96px", tailwind: "p-24 / gap-24" },
] as const;

// ─── Semantic spacing guidance ────────────────────────────────────────────────

const SEMANTIC_GUIDE = [
  {
    label: "Micro",
    steps: "0.5 – 1.5",
    px: "2 – 6px",
    use: "Icon gutters, badge padding, tightly packed list items",
    tailwind: "gap-0.5 → gap-1.5",
  },
  {
    label: "Tight",
    steps: "2 – 3",
    px: "8 – 12px",
    use: "Inline element spacing, input padding, dense form fields",
    tailwind: "gap-2 → gap-3",
  },
  {
    label: "Comfortable",
    steps: "4 – 6",
    px: "16 – 24px",
    use: "Card padding, section gaps, most component internal spacing",
    tailwind: "gap-4 → gap-6",
  },
  {
    label: "Spacious",
    steps: "8 – 12",
    px: "32 – 48px",
    use: "Section separators, panel padding, modal content areas",
    tailwind: "gap-8 → gap-12",
  },
  {
    label: "Layout",
    steps: "16 – 24",
    px: "64 – 96px",
    use: "Page-level margins, hero vertical rhythm, full-page section gaps",
    tailwind: "gap-16 → gap-24",
  },
] as const;

// ─── Components ───────────────────────────────────────────────────────────────

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h2
        style={{ fontSize: 18, fontWeight: 700, color: "var(--color-foreground)", marginBottom: 4 }}
      >
        {title}
      </h2>
      <p style={{ fontSize: 13, color: "var(--color-muted-foreground)" }}>{description}</p>
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: "var(--color-border)", margin: "40px 0" }} />;
}

function SpacingPage() {
  return (
    <div style={{ fontFamily: "var(--font-sans)", maxWidth: 760 }}>
      <h1
        style={{ fontSize: 24, fontWeight: 700, marginBottom: 4, color: "var(--color-foreground)" }}
      >
        Spacing Tokens
      </h1>
      <p style={{ fontSize: 14, color: "var(--color-muted-foreground)", marginBottom: 40 }}>
        Spacing uses Tailwind v4's default 4px base unit scale. No custom spacing tokens are defined
        — every value is a multiple of{" "}
        <code
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            background: "var(--color-elevated)",
            padding: "1px 5px",
            borderRadius: 4,
          }}
        >
          0.25rem (4px)
        </code>
        . Use these values for padding, margin, gap, width, and height utilities.
      </p>

      {/* ── Semantic guide ── */}
      <SectionHeader
        title="Semantic Guide"
        description="Group spacing decisions into density tiers. Anchoring to a tier first, then picking a specific step, produces more consistent layouts than choosing values intuitively."
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {SEMANTIC_GUIDE.map(({ label, steps, px, use, tailwind }) => (
          <div
            key={label}
            style={{
              display: "grid",
              gridTemplateColumns: "100px 80px 1fr auto",
              gap: 16,
              alignItems: "center",
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: 8,
              padding: "14px 20px",
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-foreground)" }}>
              {label}
            </div>
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-primary)",
                }}
              >
                {steps}
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-muted-foreground)",
                }}
              >
                {px}
              </div>
            </div>
            <div style={{ fontSize: 12, color: "var(--color-muted-foreground)" }}>{use}</div>
            <div
              style={{
                fontSize: 11,
                fontFamily: "var(--font-mono)",
                color: "var(--color-muted-foreground)",
                background: "var(--color-elevated)",
                padding: "2px 8px",
                borderRadius: 4,
                whiteSpace: "nowrap",
              }}
            >
              {tailwind}
            </div>
          </div>
        ))}
      </div>

      <Divider />

      {/* ── Full scale ── */}
      <SectionHeader
        title="Full Scale"
        description="Every step in the scale visualised as a filled bar. Bar width is proportional to the spacing value."
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {SPACING_SCALE.map(({ step, rem, px, tailwind }, i) => (
          <div
            key={step}
            style={{
              display: "grid",
              gridTemplateColumns: "40px 90px 80px 1fr",
              gap: 16,
              alignItems: "center",
              padding: "10px 0",
              borderBottom: i < SPACING_SCALE.length - 1 ? "1px solid var(--color-border)" : "none",
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontFamily: "var(--font-mono)",
                color: "var(--color-primary)",
                fontWeight: 600,
              }}
            >
              {step}
            </div>
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-foreground)",
                }}
              >
                {px}
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-muted-foreground)",
                }}
              >
                {rem}
              </div>
            </div>
            <div
              style={{
                fontSize: 11,
                fontFamily: "var(--font-mono)",
                color: "var(--color-muted-foreground)",
              }}
            >
              {tailwind.split(" / ")[0]}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  height: 16,
                  width: `calc(${rem} * 4)`,
                  minWidth: rem === "0rem" ? 2 : undefined,
                  background: "var(--color-primary)",
                  borderRadius: 3,
                  opacity: 0.8,
                  maxWidth: 400,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <Divider />

      {/* ── Override note ── */}
      <SectionHeader
        title="Extending the Scale"
        description="Add custom steps by extending Tailwind's spacing scale in your project's CSS."
      />
      <pre
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: 10,
          padding: "20px 24px",
          fontSize: 13,
          fontFamily: "var(--font-mono)",
          color: "var(--color-foreground)",
          overflowX: "auto",
          lineHeight: 1.7,
        }}
      >
        {`@import "@commitpt/design-system/styles";

@theme {
  /* Add a custom spacing step */
  --spacing-18: 4.5rem; /* 72px — gap between 16 and 20 */
  --spacing-128: 32rem; /* 512px — max content width token */
}`}
      </pre>
    </div>
  );
}

export const Default: StoryObj = {
  render: () => <SpacingPage />,
  name: "Spacing Scale",
};
