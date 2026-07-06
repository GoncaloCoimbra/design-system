import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

const meta: Meta = {
  title: "Brand Identity/Colors",
  parameters: { layout: "padded" },
};
export default meta;

// ─── Token data ───────────────────────────────────────────────────────────────

const PRIMARY_SCALE = [
  { step: "900", variable: "--color-primary-900", hex: "#0b1a2e" },
  { step: "800", variable: "--color-primary-800", hex: "#0e223d" },
  { step: "700", variable: "--color-primary-700", hex: "#10305a" },
  { step: "600", variable: "--color-primary-600", hex: "#1550bf" },
  { step: "500", variable: "--color-primary-500", hex: "#1ea7ff" },
  { step: "400", variable: "--color-primary-400", hex: "#4db6ff" },
  { step: "300", variable: "--color-primary-300", hex: "#79c7ff" },
  { step: "200", variable: "--color-primary-200", hex: "#79c7ff" },
  { step: "100", variable: "--color-primary-100", hex: "#a7d9ff" },
];

const SECONDARY_SCALE = [
  { step: "900", variable: "--color-secondary-900", hex: "#1a0b2e" },
  { step: "800", variable: "--color-secondary-800", hex: "#25104d" },
  { step: "700", variable: "--color-secondary-700", hex: "#36126b" },
  { step: "600", variable: "--color-secondary-600", hex: "#5520a3" },
  { step: "500", variable: "--color-secondary-500", hex: "#7c3aed" },
  { step: "400", variable: "--color-secondary-400", hex: "#9a67f5" },
  { step: "300", variable: "--color-secondary-300", hex: "#b66bfa" },
  { step: "200", variable: "--color-secondary-200", hex: "#d1b3fc" },
  { step: "100", variable: "--color-secondary-100", hex: "#e7d9fe" },
];

const BACKGROUNDS = [
  {
    variable: "--color-background",
    name: "Background",
    hex: "#0a0f1a",
    description: "Page root background",
  },
  {
    variable: "--color-surface",
    name: "Surface",
    hex: "#111827",
    description: "Cards, sidebars, panels",
  },
  {
    variable: "--color-elevated",
    name: "Elevated",
    hex: "#1d293d",
    description: "Dropdowns, tooltips, hover states",
  },
  {
    variable: "--color-card",
    name: "Card",
    hex: "#161f2e",
    description: "Card component background",
  },
  {
    variable: "--color-popover",
    name: "Popover",
    hex: "#161f2e",
    description: "Popover & modal backdrops",
  },
  {
    variable: "--color-muted",
    name: "Muted",
    hex: "#161f2e",
    description: "Subtle section fills, tags",
  },
];

const FOREGROUNDS = [
  {
    variable: "--color-foreground",
    name: "Foreground",
    hex: "#f8fafc",
    description: "Primary text",
  },
  {
    variable: "--color-muted-foreground",
    name: "Muted Foreground",
    hex: "#94a3b8",
    description: "Placeholder, hint, secondary text",
  },
  {
    variable: "--color-card-foreground",
    name: "Card Foreground",
    hex: "#f8fafc",
    description: "Text on card backgrounds",
  },
  {
    variable: "--color-popover-foreground",
    name: "Popover Foreground",
    hex: "#f8fafc",
    description: "Text inside popovers",
  },
  {
    variable: "--color-primary-foreground",
    name: "Primary Foreground",
    hex: "#f8fafc",
    description: "Text on primary surfaces",
  },
  {
    variable: "--color-secondary-foreground",
    name: "Secondary Foreground",
    hex: "#f8fafc",
    description: "Text on secondary surfaces",
  },
  {
    variable: "--color-accent-foreground",
    name: "Accent Foreground",
    hex: "#f8fafc",
    description: "Text on accent surfaces",
  },
];

const INTERACTIVE = [
  {
    variable: "--color-primary",
    name: "Primary",
    hex: "#1ea7ff",
    description: "Main CTA, active links",
  },
  {
    variable: "--color-primary-hover",
    name: "Primary Hover",
    hex: "#4db6ff",
    description: "Hover state for primary elements",
  },
  {
    variable: "--color-primary-pressed",
    name: "Primary Pressed",
    hex: "#1550bf",
    description: "Active / pressed state",
  },
  {
    variable: "--color-secondary",
    name: "Secondary",
    hex: "#7c3aed",
    description: "Supporting actions, secondary CTAs",
  },
  {
    variable: "--color-accent",
    name: "Accent",
    hex: "#7c3aed",
    description: "Hover highlights (alias → secondary)",
  },
];

const SEMANTIC = [
  {
    variable: "--color-success",
    name: "Success",
    hex: "#22c55e",
    description: "Confirmations, completed states",
  },
  {
    variable: "--color-warning",
    name: "Warning",
    hex: "#f59e0b",
    description: "Cautions, non-blocking issues",
  },
  {
    variable: "--color-destructive",
    name: "Destructive",
    hex: "#ef4444",
    description: "Errors, dangerous actions",
  },
];

const BORDERS = [
  {
    variable: "--color-border",
    name: "Border",
    hex: "#2b3648",
    description: "Default dividers and outlines",
  },
  { variable: "--color-input", name: "Input", hex: "#111827", description: "Form input borders" },
  {
    variable: "--color-ring",
    name: "Ring",
    hex: "#1ea7ff",
    description: "Focus ring (keyboard navigation)",
  },
];

const GRADIENTS = [
  {
    variable: "--gradient-primary",
    name: "Gradient Primary",
    from: "#0b1a2e",
    to: "#10305a",
    description: "900 → 700 blue. Subtle depth for primary-themed sections.",
    fallback: "linear-gradient(135deg, #0b1a2e, #10305a)",
  },
  {
    variable: "--gradient-secondary",
    name: "Gradient Secondary",
    from: "#1a0b2e",
    to: "#36126b",
    description: "900 → 700 purple. Rich depth for secondary-themed sections.",
    fallback: "linear-gradient(135deg, #1a0b2e, #36126b)",
  },
  {
    variable: "--gradient-brand",
    name: "Gradient Brand",
    from: "#0b1a2e",
    to: "#25104d",
    description: "Primary 900 → Secondary 800. Dark cross-brand blend.",
    fallback: "linear-gradient(135deg, #0b1a2e, #25104d)",
  },
  {
    variable: "--gradient-brand-vivid",
    name: "Gradient Brand Vivid",
    from: "#10305a",
    to: "#36126b",
    description: "Primary 700 → Secondary 700. Higher contrast, more expressive.",
    fallback: "linear-gradient(135deg, #10305a, #36126b)",
  },
];

// ─── Components ───────────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: 11,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        color: "var(--color-muted-foreground)",
        marginBottom: 16,
        paddingBottom: 8,
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      {children}
    </h2>
  );
}

function Divider() {
  return <div style={{ height: 1, background: "var(--color-border)", margin: "40px 0" }} />;
}

// Scale swatch — compact, for 9-step palette rows
function ScaleSwatch({ variable, step, hex }: { variable: string; step: string; hex: string }) {
  const [copied, setCopied] = React.useState(false);

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(hex).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        });
      }}
      title={`Copy ${hex}`}
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: 8,
        overflow: "hidden",
        cursor: "pointer",
        background: "none",
        padding: 0,
        textAlign: "left",
        width: "100%",
      }}
    >
      <div style={{ background: `var(${variable})`, height: 52 }} />
      <div style={{ padding: "6px 8px", background: "var(--color-card)" }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: "var(--color-foreground)" }}>
          {step}
        </div>
        <div
          style={{
            fontSize: 10,
            fontFamily: "monospace",
            color: copied ? "var(--color-primary)" : "var(--color-muted-foreground)",
            marginTop: 2,
          }}
        >
          {copied ? "Copied!" : hex}
        </div>
      </div>
    </button>
  );
}

function ColorScale({
  label,
  tokens,
}: {
  label: string;
  tokens: { step: string; variable: string; hex: string }[];
}) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "var(--color-foreground)",
          marginBottom: 10,
        }}
      >
        {label}
      </div>
      <div
        style={{ display: "grid", gridTemplateColumns: `repeat(${tokens.length}, 1fr)`, gap: 6 }}
      >
        {tokens.map((t) => (
          <ScaleSwatch key={t.step} {...t} />
        ))}
      </div>
    </div>
  );
}

// Semantic swatch — larger, for named tokens
function SemanticSwatch({
  variable,
  name,
  hex,
  description,
}: {
  variable: string;
  name: string;
  hex: string;
  description?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(hex).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        });
      }}
      title={`Copy ${hex}`}
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: 10,
        overflow: "hidden",
        cursor: "pointer",
        background: "none",
        padding: 0,
        textAlign: "left",
        width: "100%",
      }}
    >
      <div style={{ background: `var(${variable})`, height: 72 }} />
      <div style={{ padding: "10px 12px", background: "var(--color-card)" }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--color-foreground)",
            marginBottom: 2,
          }}
        >
          {name}
        </div>
        {description && (
          <div style={{ fontSize: 11, color: "var(--color-muted-foreground)", marginBottom: 4 }}>
            {description}
          </div>
        )}
        <div
          style={{ fontSize: 11, fontFamily: "monospace", color: "var(--color-muted-foreground)" }}
        >
          {variable}
        </div>
        <div
          style={{
            fontSize: 11,
            fontFamily: "monospace",
            fontWeight: 500,
            color: copied ? "var(--color-primary)" : "var(--color-foreground)",
            marginTop: 3,
          }}
        >
          {copied ? "Copied!" : hex}
        </div>
      </div>
    </button>
  );
}

function SemanticGrid({
  tokens,
  columns = 4,
}: {
  tokens: { variable: string; name: string; hex: string; description?: string }[];
  columns?: number;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 12,
        marginBottom: 32,
      }}
    >
      {tokens.map((t) => (
        <SemanticSwatch key={t.variable} {...t} />
      ))}
    </div>
  );
}

// Gradient swatch
function GradientSwatch({
  variable,
  name,
  from,
  to,
  description,
  fallback,
}: {
  variable: string;
  name: string;
  from: string;
  to: string;
  description: string;
  fallback: string;
}) {
  return (
    <div style={{ border: "1px solid var(--color-border)", borderRadius: 10, overflow: "hidden" }}>
      <div style={{ background: `var(${variable}, ${fallback})`, height: 100 }} />
      <div style={{ padding: "10px 12px", background: "var(--color-card)" }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--color-foreground)",
            marginBottom: 2,
          }}
        >
          {name}
        </div>
        <div style={{ fontSize: 11, color: "var(--color-muted-foreground)", marginBottom: 6 }}>
          {description}
        </div>
        <div
          style={{ fontSize: 11, fontFamily: "monospace", color: "var(--color-muted-foreground)" }}
        >
          {variable}
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 8, alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 3,
                background: from,
                border: "1px solid var(--color-border)",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 10,
                fontFamily: "monospace",
                color: "var(--color-muted-foreground)",
              }}
            >
              {from}
            </span>
          </div>
          <span style={{ fontSize: 10, color: "var(--color-muted-foreground)" }}>→</span>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 3,
                background: to,
                border: "1px solid var(--color-border)",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 10,
                fontFamily: "monospace",
                color: "var(--color-muted-foreground)",
              }}
            >
              {to}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function ColorsPage() {
  return (
    <div style={{ fontFamily: "var(--font-sans)", maxWidth: 960 }}>
      <h1
        style={{ fontSize: 24, fontWeight: 700, marginBottom: 4, color: "var(--color-foreground)" }}
      >
        Color Tokens
      </h1>
      <p style={{ fontSize: 14, color: "var(--color-muted-foreground)", marginBottom: 40 }}>
        Click any solid swatch to copy its hex value. All tokens are defined in{" "}
        <code
          style={{
            fontFamily: "monospace",
            fontSize: 12,
            background: "var(--color-elevated)",
            padding: "1px 5px",
            borderRadius: 4,
          }}
        >
          src/styles/theme.css
        </code>{" "}
        and consumed via Tailwind v4{" "}
        <code
          style={{
            fontFamily: "monospace",
            fontSize: 12,
            background: "var(--color-elevated)",
            padding: "1px 5px",
            borderRadius: 4,
          }}
        >
          @theme
        </code>
        .
      </p>

      <SectionTitle>Brand Scales</SectionTitle>
      <ColorScale label="Primary — Blue" tokens={PRIMARY_SCALE} />
      <ColorScale label="Secondary — Purple" tokens={SECONDARY_SCALE} />

      <Divider />

      <SectionTitle>Backgrounds</SectionTitle>
      <SemanticGrid tokens={BACKGROUNDS} columns={3} />

      <Divider />

      <SectionTitle>Foreground</SectionTitle>
      <SemanticGrid tokens={FOREGROUNDS} columns={4} />

      <Divider />

      <SectionTitle>Interactive</SectionTitle>
      <SemanticGrid tokens={INTERACTIVE} columns={4} />

      <Divider />

      <SectionTitle>Semantic States</SectionTitle>
      <SemanticGrid tokens={SEMANTIC} columns={4} />

      <Divider />

      <SectionTitle>Borders & Inputs</SectionTitle>
      <SemanticGrid tokens={BORDERS} columns={4} />

      <Divider />

      <SectionTitle>Background Gradients</SectionTitle>
      <p style={{ fontSize: 13, color: "var(--color-muted-foreground)", marginBottom: 20 }}>
        Pre-defined gradients for page sections, hero backgrounds, and feature banners. Built from
        the dark ends of the primary and secondary scales.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
          marginBottom: 32,
        }}
      >
        {GRADIENTS.map((g) => (
          <GradientSwatch key={g.variable} {...g} />
        ))}
      </div>

      <div
        style={{
          fontSize: 13,
          color: "var(--color-muted-foreground)",
          marginBottom: 8,
          fontWeight: 600,
        }}
      >
        Usage
      </div>
      <pre
        style={{
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: 10,
          padding: "16px 20px",
          fontSize: 12,
          fontFamily: "monospace",
          color: "var(--color-foreground)",
          lineHeight: 1.7,
          overflowX: "auto",
        }}
      >
        {`/* In CSS */
background: var(--gradient-brand);

/* Inline in JSX */
<div style={{ background: "var(--gradient-brand)" }} />

/* Override after import */
@import "@commitpt/design-system/styles";
@theme {
  --gradient-brand: linear-gradient(160deg, var(--color-primary-900), var(--color-secondary-900));
}`}
      </pre>
    </div>
  );
}

export const Default: StoryObj = {
  render: () => <ColorsPage />,
  name: "Color Palette",
};
