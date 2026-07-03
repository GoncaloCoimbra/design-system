import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

const meta: Meta = {
  title: "Design Tokens/Radii",
  parameters: { layout: "padded" },
};
export default meta;

const radiiTokens = [
  { name: "sm", variable: "--radius-sm", description: "0.25rem" },
  { name: "md", variable: "--radius-md", description: "0.375rem" },
  { name: "lg", variable: "--radius-lg", description: "0.5rem" },
  { name: "xl", variable: "--radius-xl", description: "0.75rem" },
];

function RadiiPage() {
  return (
    <div style={{ fontFamily: "var(--font-sans)", maxWidth: 600 }}>
      <h1
        style={{ fontSize: 24, fontWeight: 700, marginBottom: 4, color: "var(--color-foreground)" }}
      >
        Border Radius Tokens
      </h1>
      <p style={{ fontSize: 14, color: "var(--color-muted-foreground)", marginBottom: 32 }}>
        Border radius scale used across all components.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {radiiTokens.map(({ name, variable, description }) => (
          <div key={variable} style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div
              style={{
                width: 64,
                height: 64,
                background: "var(--color-primary)",
                borderRadius: `var(${variable})`,
                flexShrink: 0,
              }}
            />
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--color-foreground)" }}>
                radius-{name}
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontFamily: "monospace",
                  color: "var(--color-muted-foreground)",
                }}
              >
                {variable}
              </div>
              <div style={{ fontSize: 12, color: "var(--color-muted-foreground)" }}>
                {description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const Default: StoryObj = {
  render: () => <RadiiPage />,
  name: "Radius Scale",
};
