import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Zap, Star, Bell, Clock, Settings } from "lucide-react";

const meta: Meta = {
  title: "Brand Identity/Icons",
  parameters: { layout: "padded" },
};
export default meta;

// ─── Icon scale ───────────────────────────────────────────────────────────────
// Backed by --icon-* tokens in theme.css. `.icon` (no suffix) is the default
// and equals --icon-md (24px) — the size components used before this scale
// existed (e.g. Card's old `h-6 w-6`).

const ICON_SCALE = [
  {
    name: "xs",
    token: "--icon-xs",
    size: "1rem / 16px",
    className: "icon-xs",
    use: "Inline with text-xs/text-sm, dense list rows, badges",
  },
  {
    name: "sm",
    token: "--icon-sm",
    size: "1.25rem / 20px",
    className: "icon-sm",
    use: "Form fields, inputs, inline with text-base",
  },
  {
    name: "md (default)",
    token: "--icon-md",
    size: "1.5rem / 24px",
    className: "icon",
    use: "Feature cards, standalone icons, toolbar actions",
  },
  {
    name: "lg",
    token: "--icon-lg",
    size: "2rem / 32px",
    className: "icon-lg",
    use: "Section headers, empty states",
  },
  {
    name: "xl",
    token: "--icon-xl",
    size: "2.5rem / 40px",
    className: "icon-xl",
    use: "Hero sections, marketing illustrations",
  },
] as const;

// ─── Icon set note ──────────────────────────────────────────────────────────
// The design system standardises on lucide-react for all icons.

const SAMPLE_ICONS = [Zap, Star, Bell, Clock, Settings] as const;

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

function IconsPage() {
  return (
    <div style={{ fontFamily: "var(--font-sans)", maxWidth: 760 }}>
      <h1
        style={{ fontSize: 24, fontWeight: 700, marginBottom: 4, color: "var(--color-foreground)" }}
      >
        Icon Tokens
      </h1>
      <p style={{ fontSize: 14, color: "var(--color-muted-foreground)", marginBottom: 40 }}>
        All icons in the design system come from{" "}
        <code
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            background: "var(--color-elevated)",
            padding: "1px 5px",
            borderRadius: 4,
          }}
        >
          lucide-react
        </code>
        . Size is controlled by the{" "}
        <code
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            background: "var(--color-elevated)",
            padding: "1px 5px",
            borderRadius: 4,
          }}
        >
          --icon-*
        </code>{" "}
        tokens below via utility classes — never set icon width/height with arbitrary values or raw
        Tailwind size utilities directly.
      </p>

      {/* ── Scale ── */}
      <SectionHeader
        title="Size Scale"
        description="`.icon` with no suffix is the default (24px) and is the drop-in replacement for the old hardcoded h-6 w-6."
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {ICON_SCALE.map(({ name, token, size, className, use }, i) => (
          <div
            key={name}
            style={{
              display: "grid",
              gridTemplateColumns: "64px 140px 1fr 220px",
              gap: 20,
              alignItems: "center",
              padding: "16px 0",
              borderBottom: i < ICON_SCALE.length - 1 ? "1px solid var(--color-border)" : "none",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-primary)",
              }}
            >
              <Zap className={className} />
            </div>
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-primary)",
                  fontWeight: 600,
                }}
              >
                .{className}
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-muted-foreground)",
                  marginTop: 2,
                }}
              >
                {token}
              </div>
            </div>
            <div style={{ fontSize: 12, color: "var(--color-muted-foreground)" }}>{use}</div>
            <div
              style={{
                fontSize: 11,
                fontFamily: "var(--font-mono)",
                color: "var(--color-muted-foreground)",
                textAlign: "right",
              }}
            >
              {size}
            </div>
          </div>
        ))}
      </div>

      <Divider />

      {/* ── Sample set ── */}
      <SectionHeader
        title="Sample Set"
        description="A handful of lucide-react icons rendered at the default size, for a quick visual gut-check of stroke weight and alignment."
      />
      <div
        style={{
          display: "flex",
          gap: 24,
          padding: "20px 24px",
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        {SAMPLE_ICONS.map((Icon, i) => (
          <Icon key={i} className="icon" style={{ color: "var(--color-foreground)" }} />
        ))}
      </div>

      <Divider />

      {/* ── Usage ── */}
      <SectionHeader
        title="Usage"
        description="Apply the class directly to the lucide icon component. Do not wrap icons in a sized div and stretch the svg to fit — size the icon itself."
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
        {`import { Bell } from "lucide-react";

// default size (24px)
<Bell className="icon" />

// explicit scale
<Bell className="icon-xs" />   {/* 16px */}
<Bell className="icon-sm" />   {/* 20px */}
<Bell className="icon-lg" />   {/* 32px */}
<Bell className="icon-xl" />   {/* 40px */}`}
      </pre>
    </div>
  );
}

export const Default: StoryObj = {
  render: () => <IconsPage />,
  name: "Icon Scale",
};
