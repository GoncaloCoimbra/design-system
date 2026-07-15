import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Brand Identity/Borders",
  parameters: { layout: "padded" },
};
export default meta;

// ─── Data ─────────────────────────────────────────────────────────────────────

const SOLID_BORDERS = [
  {
    name: "Default",
    variable: "--color-border",
    value: "1px solid var(--color-border)",
    use: "Todas as bordas de cards, inputs, separadores e painéis em repouso.",
  },
  {
    name: "Hover",
    variable: "--color-border-hover",
    value: "1px solid var(--color-border-hover)",
    use: "Borda de cards interactivos no hover (ex: CardIconFeature).",
  },
  {
    name: "Subtle separator",
    variable: "--color-border / 40%",
    value: "1px solid color-mix(in oklch, var(--color-border) 40%, transparent)",
    use: "Divisores internos entre itens de baixa prioridade (ex: CardNumbered, CardNumberedRow).",
  },
] as const;

const GRADIENT_BORDERS = [
  {
    name: "Brand subtle",
    variable: "--border-gradient-brand",
    use: "Cross-brand blend a 30% de opacidade. Cards destacados, painéis premium, ReviewCard.",
    innerBg:
      "radial-gradient(circle at top left, var(--color-primary-900), var(--color-secondary-800))",
  },
  {
    name: "Primary",
    variable: "--border-gradient-primary",
    use: "Gradiente primário sólido. Focus rings, estados activos, elementos de maior destaque.",
    innerBg: "var(--color-card)",
  },
  {
    name: "Secondary",
    variable: "--border-gradient-secondary",
    use: "Gradiente secundário sólido. Badges premium, cards de funcionalidades especiais.",
    innerBg: "var(--color-card)",
  },
] as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

function Token({ value }: { value: string }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: "var(--color-primary)",
        fontWeight: 600,
      }}
    >
      {value}
    </span>
  );
}

function UseCase({ text }: { text: string }) {
  return (
    <p style={{ fontSize: 12, color: "var(--color-muted-foreground)", marginTop: 2 }}>{text}</p>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function BordersPage() {
  return (
    <div style={{ fontFamily: "var(--font-sans)", maxWidth: 760 }}>
      <h1
        style={{ fontSize: 24, fontWeight: 700, marginBottom: 4, color: "var(--color-foreground)" }}
      >
        Border Tokens
      </h1>
      <p style={{ fontSize: 14, color: "var(--color-muted-foreground)", marginBottom: 40 }}>
        Tokens de borda do design system — sólidos e com gradiente. Os gradientes usam a técnica{" "}
        <code
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            background: "var(--color-elevated)",
            padding: "1px 6px",
            borderRadius: 4,
          }}
        >
          padding-box / border-box
        </code>{" "}
        para suportar qualquer fundo interno.
      </p>

      {/* ── Solid ───────────────────────────────────────────────── */}
      <SectionHeader
        title="Solid Borders"
        description="Bordas sólidas para superfícies em repouso, hover e separadores internos."
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24,
          marginBottom: 56,
        }}
      >
        {SOLID_BORDERS.map(({ name, variable, value, use }) => (
          <div key={name} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div
              style={{
                height: 80,
                borderRadius: 10,
                background: "var(--color-card)",
                border: value,
              }}
            />
            <div>
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
              <Token value={variable} />
              <UseCase text={use} />
            </div>
          </div>
        ))}
      </div>

      {/* ── Gradient ────────────────────────────────────────────── */}
      <SectionHeader
        title="Gradient Borders"
        description={`Bordas com gradiente via padding-box / border-box. Aplica border: 1px solid transparent e depois background: <inner-bg> padding-box, var(--border-gradient-*) border-box.`}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24,
          marginBottom: 56,
        }}
      >
        {GRADIENT_BORDERS.map(({ name, variable, use, innerBg }) => (
          <div key={name} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div
              style={{
                height: 80,
                borderRadius: 10,
                border: "1px solid transparent",
                background: `${innerBg} padding-box, var(${variable}) border-box`,
              }}
            />
            <div>
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
              <Token value={variable} />
              <UseCase text={use} />
            </div>
          </div>
        ))}
      </div>

      {/* ── Usage ───────────────────────────────────────────────── */}
      <SectionHeader
        title="Como usar gradient borders"
        description="Padrão de implementação para qualquer componente que precise de borda com gradiente."
      />
      <pre
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          background: "var(--color-elevated)",
          border: "1px solid var(--color-border)",
          borderRadius: 10,
          padding: "20px 24px",
          color: "var(--color-foreground)",
          overflowX: "auto",
          lineHeight: 1.7,
        }}
      >
        {`/* Tailwind — arbitrary value */
className="border border-transparent
  [background:<inner-bg>_padding-box,var(--border-gradient-brand)_border-box]"

/* CSS puro */
.my-component {
  border: 1px solid transparent;
  background:
    <inner-bg> padding-box,
    var(--border-gradient-brand) border-box;
}`}
      </pre>
    </div>
  );
}

export const Default: StoryObj = {
  render: () => <BordersPage />,
  name: "Border Scale",
};
