import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

const meta: Meta = {
  title: "Brand Identity/Shadows",
  parameters: { layout: "padded" },
};
export default meta;

const SHADOWS = [
  { name: "sm", variable: "--shadow-sm", use: "Subtle lift: dropdowns, low-emphasis cards" },
  { name: "md", variable: "--shadow-md", use: "Default elevated surface: popovers, tooltips" },
  { name: "lg", variable: "--shadow-lg", use: "High elevation: dialogs, drawers" },
  {
    name: "glow-primary",
    variable: "--shadow-glow-primary",
    use: "Focus/active emphasis on primary elements",
  },
] as const;

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

function ShadowsPage() {
  return (
    <div style={{ fontFamily: "var(--font-sans)", maxWidth: 760 }}>
      <h1
        style={{ fontSize: 24, fontWeight: 700, marginBottom: 4, color: "var(--color-foreground)" }}
      >
        Shadow Tokens
      </h1>
      <p style={{ fontSize: 14, color: "var(--color-muted-foreground)", marginBottom: 40 }}>
        Elevation via box-shadow. Never hand-roll a shadow — every floating or elevated surface
        (dialog, tooltip, popover, dropdown) should reach for one of these.
      </p>

      <SectionHeader
        title="Elevation Scale"
        description="Rendered on the surface background to show contrast in a dark theme."
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 32 }}>
        {SHADOWS.map(({ name, variable, use }) => (
          <div key={name} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div
              style={{
                height: 100,
                borderRadius: 10,
                background: "var(--color-surface)",
                boxShadow: `var(${variable})`,
              }}
            />
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-primary)",
                  fontWeight: 600,
                }}
              >
                {variable}
              </div>
              <div style={{ fontSize: 12, color: "var(--color-muted-foreground)", marginTop: 2 }}>
                {use}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const Default: StoryObj = {
  render: () => <ShadowsPage />,
  name: "Shadow Scale",
};
