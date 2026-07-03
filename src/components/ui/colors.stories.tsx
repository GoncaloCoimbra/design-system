import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Design Tokens/Colors",
};

export default meta;
type Story = StoryObj;

interface SwatchProps {
  name: string;
  variable: string;
  hex?: string;
}

function Swatch({ name, variable, hex }: SwatchProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="h-12 w-full rounded-md border border-white/10"
        style={{ backgroundColor: `var(${variable})` }}
      />
      <div className="space-y-0.5">
        <p className="text-xs font-medium text-foreground">{name}</p>
        <p className="text-xs text-muted-foreground font-mono">{variable}</p>
        {hex && <p className="text-xs text-muted-foreground font-mono">{hex}</p>}
      </div>
    </div>
  );
}

interface ScaleProps {
  label: string;
  swatches: SwatchProps[];
}

function Scale({ label, swatches }: ScaleProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground">{label}</h3>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-9">
        {swatches.map((s) => (
          <Swatch key={s.variable} {...s} />
        ))}
      </div>
    </div>
  );
}

function SemanticRow({ swatches }: { swatches: SwatchProps[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {swatches.map((s) => (
        <Swatch key={s.variable} {...s} />
      ))}
    </div>
  );
}

export const Palette: Story = {
  render: () => (
    <div className="space-y-10 p-6">
      <Scale
        label="Primary (Blue)"
        swatches={[
          { name: "900", variable: "--color-primary-900", hex: "#0b1a2e" },
          { name: "800", variable: "--color-primary-800", hex: "#0e223d" },
          { name: "700", variable: "--color-primary-700", hex: "#10305a" },
          { name: "600", variable: "--color-primary-600", hex: "#1550bf" },
          { name: "500", variable: "--color-primary-500", hex: "#1ea7ff" },
          { name: "400", variable: "--color-primary-400", hex: "#4db6ff" },
          { name: "300", variable: "--color-primary-300", hex: "#79c7ff" },
          { name: "200", variable: "--color-primary-200", hex: "#79c7ff" },
          { name: "100", variable: "--color-primary-100", hex: "#a7d9ff" },
        ]}
      />

      <Scale
        label="Secondary (Purple)"
        swatches={[
          { name: "900", variable: "--color-secondary-900", hex: "#1a0b2e" },
          { name: "800", variable: "--color-secondary-800", hex: "#25104d" },
          { name: "700", variable: "--color-secondary-700", hex: "#36126b" },
          { name: "600", variable: "--color-secondary-600", hex: "#5520a3" },
          { name: "500", variable: "--color-secondary-500", hex: "#7c3aed" },
          { name: "400", variable: "--color-secondary-400", hex: "#9a67f5" },
          { name: "300", variable: "--color-secondary-300", hex: "#b66bfa" },
          { name: "200", variable: "--color-secondary-200", hex: "#d1b3fc" },
          { name: "100", variable: "--color-secondary-100", hex: "#e7d9fe" },
        ]}
      />

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Backgrounds</h3>
        <SemanticRow
          swatches={[
            { name: "Background", variable: "--color-background", hex: "#0A0F1A" },
            { name: "Surface", variable: "--color-surface", hex: "#111827" },
            { name: "Elevated", variable: "--color-elevated", hex: "#1D293D" },
            { name: "Card", variable: "--color-card", hex: "#161F2E" },
          ]}
        />
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Semantic</h3>
        <SemanticRow
          swatches={[
            { name: "Success", variable: "--color-success", hex: "#22C55E" },
            { name: "Warning", variable: "--color-warning", hex: "#F59E0B" },
            { name: "Destructive", variable: "--color-destructive", hex: "#EF4444" },
            { name: "Border", variable: "--color-border", hex: "#2B3648" },
          ]}
        />
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Foreground</h3>
        <SemanticRow
          swatches={[
            { name: "Foreground", variable: "--color-foreground", hex: "#F8FAFC" },
            { name: "Muted Foreground", variable: "--color-muted-foreground", hex: "#94A3B8" },
          ]}
        />
      </div>
    </div>
  ),
};
