import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

const meta: Meta = {
  title: "Brand Identity/Typography",
  parameters: { layout: "padded" },
};
export default meta;

// ─── Type scale ───────────────────────────────────────────────────────────────

const TYPE_SCALE = [
  {
    name: "xs",
    size: "0.75rem / 12px",
    lineHeight: "1rem / 16px",
    tailwind: "text-xs",
    sample: "Metadata, timestamps, helper text",
  },
  {
    name: "sm",
    size: "0.875rem / 14px",
    lineHeight: "1.25rem / 20px",
    tailwind: "text-sm",
    sample: "Body copy, labels, nav items",
  },
  {
    name: "base",
    size: "1rem / 16px",
    lineHeight: "1.5rem / 24px",
    tailwind: "text-base",
    sample: "Default body text, prose",
  },
  {
    name: "lg",
    size: "1.125rem / 18px",
    lineHeight: "1.75rem / 28px",
    tailwind: "text-lg",
    sample: "Card titles, section intros",
  },
  {
    name: "xl",
    size: "1.25rem / 20px",
    lineHeight: "1.75rem / 28px",
    tailwind: "text-xl",
    sample: "Page headings, dialog titles",
  },
  {
    name: "2xl",
    size: "1.5rem / 24px",
    lineHeight: "2rem / 32px",
    tailwind: "text-2xl",
    sample: "Feature headings, onboarding",
  },
  {
    name: "3xl",
    size: "1.875rem / 30px",
    lineHeight: "2.25rem / 36px",
    tailwind: "text-3xl",
    sample: "Hero headings",
  },
  {
    name: "4xl",
    size: "2.25rem / 36px",
    lineHeight: "2.5rem / 40px",
    tailwind: "text-4xl",
    sample: "Marketing headlines",
  },
] as const;

// ─── Font weight scale ─────────────────────────────────────────────────────────

const WEIGHTS = [
  { name: "Normal", tailwind: "font-normal", value: "400", use: "Body copy, descriptions" },
  {
    name: "Medium",
    tailwind: "font-medium",
    value: "500",
    use: "Labels, nav items, table headers",
  },
  {
    name: "Semibold",
    tailwind: "font-semibold",
    value: "600",
    use: "Headings, button labels, emphasis",
  },
  { name: "Bold", tailwind: "font-bold", value: "700", use: "Strong emphasis, hero copy" },
] as const;

// ─── Font families ─────────────────────────────────────────────────────────────

const FAMILIES = [
  {
    name: "Sans — Plus Jakarta Sans",
    variable: "--font-sans",
    tailwind: "font-sans",
    use: "All UI text: headings, body, labels, buttons",
    sample: "The quick brown fox jumps over the lazy dog",
  },
  {
    name: "Mono — JetBrains Mono",
    variable: "--font-mono",
    tailwind: "font-mono",
    use: "Code, tokens, technical labels, keyboard shortcuts",
    sample: "const value = tokens['--color-primary'];",
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

function TypographyPage() {
  return (
    <div style={{ fontFamily: "var(--font-sans)", maxWidth: 760 }}>
      <h1
        style={{ fontSize: 24, fontWeight: 700, marginBottom: 4, color: "var(--color-foreground)" }}
      >
        Typography Tokens
      </h1>
      <p style={{ fontSize: 14, color: "var(--color-muted-foreground)", marginBottom: 40 }}>
        Type scale, font families, and weight tokens. All values come from Tailwind v4's default
        scale — no custom size tokens are defined. Override families via{" "}
        <code
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            background: "var(--color-elevated)",
            padding: "1px 5px",
            borderRadius: 4,
          }}
        >
          --font-sans
        </code>{" "}
        /{" "}
        <code
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            background: "var(--color-elevated)",
            padding: "1px 5px",
            borderRadius: 4,
          }}
        >
          --font-mono
        </code>{" "}
        in your theme.
      </p>

      {/* ── Font families ── */}
      <SectionHeader
        title="Font Families"
        description="Two families are registered. Sans is the product typeface; Mono is used for code and technical labels."
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 0 }}>
        {FAMILIES.map(({ name, variable, tailwind, use, sample }) => (
          <div
            key={variable}
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: 10,
              padding: "20px 24px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 12,
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--color-foreground)" }}>
                  {name}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-muted-foreground)",
                    marginTop: 2,
                  }}
                >
                  {variable} · {tailwind}
                </div>
              </div>
              <div
                style={{
                  fontSize: 11,
                  background: "var(--color-elevated)",
                  color: "var(--color-muted-foreground)",
                  padding: "2px 8px",
                  borderRadius: 4,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {use}
              </div>
            </div>
            <div
              style={{
                fontFamily: `var(${variable})`,
                fontSize: 20,
                color: "var(--color-foreground)",
                lineHeight: 1.4,
              }}
            >
              {sample}
            </div>
          </div>
        ))}
      </div>

      <Divider />

      {/* ── Type scale ── */}
      <SectionHeader
        title="Type Scale"
        description="Tailwind's default fluid size scale. Use the smallest size that maintains comfortable readability for the context."
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {TYPE_SCALE.map(({ name, size, lineHeight, tailwind, sample }, i) => (
          <div
            key={name}
            style={{
              display: "grid",
              gridTemplateColumns: "90px 1fr",
              gap: 24,
              alignItems: "center",
              padding: "16px 0",
              borderBottom: i < TYPE_SCALE.length - 1 ? "1px solid var(--color-border)" : "none",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-primary)",
                  fontWeight: 600,
                }}
              >
                {tailwind}
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-muted-foreground)",
                  marginTop: 2,
                }}
              >
                {size}
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-muted-foreground)",
                }}
              >
                lh {lineHeight}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: `var(--text-${name})`,
                  color: "var(--color-foreground)",
                  lineHeight: 1.4,
                  marginBottom: 2,
                }}
              >
                {sample}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Divider />

      {/* ── Font weights ── */}
      <SectionHeader
        title="Font Weights"
        description="Plus Jakarta Sans supports variable weight (200–800). These four stops cover all product UI needs."
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {WEIGHTS.map(({ name, tailwind, value, use }, i) => (
          <div
            key={tailwind}
            style={{
              display: "grid",
              gridTemplateColumns: "90px 1fr 200px",
              gap: 24,
              alignItems: "center",
              padding: "16px 0",
              borderBottom: i < WEIGHTS.length - 1 ? "1px solid var(--color-border)" : "none",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-primary)",
                  fontWeight: 600,
                }}
              >
                {tailwind}
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-muted-foreground)",
                  marginTop: 2,
                }}
              >
                {value}
              </div>
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: parseInt(value),
                color: "var(--color-foreground)",
              }}
            >
              {name} — The quick brown fox
            </div>
            <div style={{ fontSize: 12, color: "var(--color-muted-foreground)" }}>{use}</div>
          </div>
        ))}
      </div>

      <Divider />

      {/* ── Override example ── */}
      <SectionHeader
        title="Overriding Families"
        description="Override the font family tokens after importing the design system theme."
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
  /* Replace the sans typeface with your brand font */
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;

  /* Replace the mono typeface */
  --font-mono: "Fira Code", ui-monospace, monospace;
}`}
      </pre>
    </div>
  );
}

export const Default: StoryObj = {
  render: () => <TypographyPage />,
  name: "Typography Scale",
};
