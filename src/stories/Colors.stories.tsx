import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

const meta: Meta = {
  title: "Design Tokens/Colors",
  parameters: { layout: "padded" },
};
export default meta;

type ColorToken = {
  name: string;
  variable: string;
  description?: string;
};

const colorGroups: { group: string; tokens: ColorToken[] }[] = [
  {
    group: "Base",
    tokens: [
      { name: "Background", variable: "--color-background", description: "Page background" },
      { name: "Foreground", variable: "--color-foreground", description: "Default text" },
    ],
  },
  {
    group: "Primary",
    tokens: [
      { name: "Primary", variable: "--color-primary", description: "Brand / CTA" },
      {
        name: "Primary Foreground",
        variable: "--color-primary-foreground",
        description: "Text on primary",
      },
    ],
  },
  {
    group: "Secondary",
    tokens: [
      { name: "Secondary", variable: "--color-secondary" },
      { name: "Secondary Foreground", variable: "--color-secondary-foreground" },
    ],
  },
  {
    group: "Muted",
    tokens: [
      { name: "Muted", variable: "--color-muted", description: "Subtle backgrounds" },
      {
        name: "Muted Foreground",
        variable: "--color-muted-foreground",
        description: "Placeholder / hint text",
      },
    ],
  },
  {
    group: "Accent",
    tokens: [
      { name: "Accent", variable: "--color-accent", description: "Hover highlights" },
      { name: "Accent Foreground", variable: "--color-accent-foreground" },
    ],
  },
  {
    group: "Destructive",
    tokens: [
      { name: "Destructive", variable: "--color-destructive", description: "Error / danger" },
    ],
  },
  {
    group: "Card",
    tokens: [
      { name: "Card", variable: "--color-card" },
      { name: "Card Foreground", variable: "--color-card-foreground" },
    ],
  },
  {
    group: "Popover",
    tokens: [
      { name: "Popover", variable: "--color-popover" },
      { name: "Popover Foreground", variable: "--color-popover-foreground" },
    ],
  },
  {
    group: "Border & Input",
    tokens: [
      { name: "Border", variable: "--color-border" },
      { name: "Input", variable: "--color-input", description: "Input border" },
      { name: "Ring", variable: "--color-ring", description: "Focus ring" },
    ],
  },
];

function resolveColor(variable: string): string {
  const el = document.createElement("div");
  el.style.color = `var(${variable})`;
  el.style.display = "none";
  document.body.appendChild(el);
  const computed = getComputedStyle(el).color;
  document.body.removeChild(el);
  return computed;
}

function rgbToHex(rgb: string): string {
  const match = rgb.match(/rgba?\((\d+(?:\.\d+)?),\s*(\d+(?:\.\d+)?),\s*(\d+(?:\.\d+)?)/);
  if (!match) return rgb;
  const [, r, g, b] = match.map((v) => Math.round(Number(v)));
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

function ColorSwatch({ token }: { token: ColorToken }) {
  const [hex, setHex] = React.useState<string>("");
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    const rgb = resolveColor(token.variable);
    setHex(rgbToHex(rgb));
  }, [token.variable]);

  const handleCopy = () => {
    navigator.clipboard.writeText(hex).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <button
      onClick={handleCopy}
      title={`Click to copy ${hex}`}
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        cursor: "pointer",
        textAlign: "left",
        background: "none",
        padding: 0,
        width: "100%",
      }}
    >
      <div
        style={{
          background: `var(${token.variable})`,
          height: 80,
          width: "100%",
          border: "none",
          borderBottom: "1px solid var(--color-border)",
        }}
      />
      <div style={{ padding: "10px 12px", background: "var(--color-card)" }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--color-foreground)",
            marginBottom: 2,
          }}
        >
          {token.name}
        </div>
        {token.description && (
          <div style={{ fontSize: 11, color: "var(--color-muted-foreground)", marginBottom: 4 }}>
            {token.description}
          </div>
        )}
        <div
          style={{ fontSize: 11, color: "var(--color-muted-foreground)", fontFamily: "monospace" }}
        >
          {token.variable}
        </div>
        <div
          style={{
            fontSize: 12,
            fontFamily: "monospace",
            color: copied ? "var(--color-primary)" : "var(--color-foreground)",
            marginTop: 4,
            fontWeight: 500,
          }}
        >
          {copied ? "Copied!" : hex}
        </div>
      </div>
    </button>
  );
}

function ColorsPage() {
  return (
    <div style={{ fontFamily: "var(--font-sans)", maxWidth: 900 }}>
      <h1
        style={{ fontSize: 24, fontWeight: 700, marginBottom: 4, color: "var(--color-foreground)" }}
      >
        Color Tokens
      </h1>
      <p style={{ fontSize: 14, color: "var(--color-muted-foreground)", marginBottom: 32 }}>
        Click any swatch to copy its hex value to clipboard.
      </p>

      {colorGroups.map(({ group, tokens }) => (
        <div key={group} style={{ marginBottom: 40 }}>
          <h2
            style={{
              fontSize: 13,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--color-muted-foreground)",
              marginBottom: 16,
              borderBottom: "1px solid var(--color-border)",
              paddingBottom: 8,
            }}
          >
            {group}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: 12,
            }}
          >
            {tokens.map((token) => (
              <ColorSwatch key={token.variable} token={token} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export const Default: StoryObj = {
  render: () => <ColorsPage />,
  name: "Color Palette",
};
