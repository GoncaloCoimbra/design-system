import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { Card } from "@/components/ui/card/card";
import { cn } from "@/lib/utils";

// ─── Variants ─────────────────────────────────────────────────────────────────

const featureCardVariants = cva(
  [
    // layout
    "flex flex-col @container",
    // surface — overrides Card's bg-card with the darker surface tone
    "bg-surface",
    // elevation
    "shadow-lg shadow-black/30",
  ],
  {
    variants: {
      variant: {
        primary: [
          // icon color
          "[&_svg]:text-primary",
        ],
        secondary: [
          // icon color
          "[&_svg]:text-secondary",
        ],
        destructive: [
          // icon color
          "[&_svg]:text-destructive",
        ],
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FeatureCardProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof featureCardVariants> {
  /** Ícone exibido no canto superior esquerdo. Usa a classe `.icon` (`--icon-md`, 24px). */
  icon: React.ReactNode;
  /** Título da funcionalidade. */
  title: string;
  /** Descrição da funcionalidade. */
  description: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * # FeatureCard
 *
 * Apresenta uma funcionalidade ou benefício com ícone, título e descrição.
 * Disponível em três variantes — `primary`, `secondary` e `destructive` —
 * com hover animado (lift + shadow) e borda com gradiente.
 *
 * @see {@link https://storybook.commitpt.com/?path=/docs/ui-featurecard--docs Storybook documentation}
 *
 * ---
 *
 * ## Variantes
 *
 * | Variant       | Fundo             | Borda                        | Quando usar                              |
 * |---------------|-------------------|------------------------------|------------------------------------------|
 * | `primary`     | `primary-900`     | `--border-gradient-primary`  | Features principais, benefícios gerais   |
 * | `secondary`   | `secondary-900`   | `--border-gradient-secondary`| Features premium ou de destaque especial |
 * | `destructive` | `oklch(0.15 ...)` | `destructive → dark red`     | Avisos, limites, acções de risco         |
 *
 * ---
 *
 * ## Anatomia
 *
 * | Zona       | Conteúdo                                          |
 * |------------|---------------------------------------------------|
 * | Ícone      | `icon` — 24px via `.icon` (`--icon-md`), shrink-0 |
 * | Título     | `title` — `text-sm font-bold text-white`          |
 * | Descrição  | `description` — `text-xs leading-5 text-gray-50` |
 *
 * O layout interno é `flex items-center gap-3` — ícone à esquerda,
 * título e descrição empilhados à direita.
 *
 * ---
 *
 * ## Escala tipográfica
 *
 * | Elemento    | Variant Typography equivalente | Classes                             |
 * |-------------|-------------------------------|-------------------------------------|
 * | Título      | `h6`                          | `text-sm font-bold text-foreground` |
 * | Descrição   | `muted`                       | `text-xs leading-5 text-gray-50`    |
 *
 * ---
 *
 * ## Tamanho do ícone
 *
 * Usa sempre a classe `.icon` (`--icon-md`, 24px). A cor padrão é definida
 * pela variante via `[&_svg]:text-*` e pode ser sobreposta no ícone directamente.
 *
 * ---
 *
 * ## Espaçamento
 *
 * | Token   | Valor | Tier        | Uso                          |
 * |---------|-------|-------------|------------------------------|
 * | `p-4`   | 16px  | Comfortable | Padding exterior             |
 * | `gap-3` | 12px  | Tight       | Ícone ↔ bloco de texto       |
 * | `mb-1`  | 4px   | Micro       | Título → descrição           |
 *
 * ---
 *
 * ## Usage
 *
 * ```tsx
 * import { Zap } from "lucide-react";
 *
 * <FeatureCard
 *   icon={<Zap className="icon" />}
 *   title="Deploy em segundos"
 *   description="Liga o repositório e publica em cada push para main."
 * />
 *
 * <FeatureCard
 *   variant="secondary"
 *   icon={<Crown className="icon" />}
 *   title="Acesso premium"
 *   description="Desbloqueia todas as funcionalidades avançadas."
 * />
 *
 * <FeatureCard
 *   variant="destructive"
 *   icon={<ShieldAlert className="icon" />}
 *   title="Limite atingido"
 *   description="Atingiste o limite do plano gratuito."
 * />
 * ```
 *
 * ---
 *
 * ## Acessibilidade
 *
 * - O ícone é decorativo e está envolvido em `aria-hidden="true"`.
 * - Se o card for clicável, envolve-o num `<button>` ou `<a>` e adiciona `aria-label`.
 * - A transição de hover é `ease-out 200ms` — abaixo do limiar de sensibilidade ao movimento.
 *
 * ---
 *
 * ## Design tokens
 *
 * | Token                         | Onde é aplicado                     |
 * |-------------------------------|-------------------------------------|
 * | `--color-primary-900`         | Fundo variant `primary`             |
 * | `--color-secondary-900`       | Fundo variant `secondary`           |
 * | `--border-gradient-primary`   | Borda variant `primary`             |
 * | `--border-gradient-secondary` | Borda variant `secondary`           |
 * | `--color-destructive`         | Borda e ícone variant `destructive` |
 * | `--icon-md`                   | Tamanho do ícone (24px)             |
 */
const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ className, variant, icon, title, description, ...props }, ref) => (
    <Card
      ref={ref}
      data-slot="feature-card"
      className={cn(featureCardVariants({ variant }), className)}
      {...props}
    >
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center gap-2">
          <div className="shrink-0 [&_svg]:icon-sm" aria-hidden="true">
            {icon}
          </div>
          <p className="text-sm font-bold text-white">{title}</p>
        </div>
        <p className="text-xs leading-5 text-gray-50">{description}</p>
      </div>
    </Card>
  )
);
FeatureCard.displayName = "FeatureCard";

export { FeatureCard, featureCardVariants };
