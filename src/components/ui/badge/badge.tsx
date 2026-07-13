import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

// ─── Variants ─────────────────────────────────────────────────────────────────

const badgeVariants = cva(
  [
    // layout
    "inline-flex items-center gap-1",
    // shape & typography
    "rounded-md px-2 py-0.5 text-xs font-medium",
    // icon — icon-xxs (12px = size-3) per Brand Identity scale for badge/chip contexts
    "[&_svg]:size-3 [&_svg]:shrink-0",
    // transition
    "transition-colors",
  ],
  {
    variants: {
      variant: {
        primary: [
          // background
          "bg-gradient-to-br from-primary-900 to-primary-800",
          // text & icon
          "text-primary-400",
          // border
          "border border-primary-400/20",
        ],
        secondary: [
          // background
          "bg-gradient-to-br from-secondary-900 to-secondary-800",
          // text & icon
          "text-secondary-400",
          // border
          "border border-secondary-400/20",
        ],
        outline: [
          // background
          "bg-transparent",
          // text & icon
          "text-foreground",
          // border
          "border border-border",
        ],
        destructive: [
          // background
          "bg-destructive/10",
          // text & icon
          "text-destructive",
          // border
          "border border-destructive/20",
        ],
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * # Badge
 *
 * Elemento inline de classificação ou estado. Suporta ícone à esquerda ou
 * à direita passado como children, quatro variantes e composição livre.
 *
 * @see {@link https://storybook.commitpt.com/?path=/docs/base-components-badge--docs Storybook documentation}
 *
 * ---
 *
 * ## Variantes
 *
 * | Variant       | Fundo                          | Texto           | Quando usar                              |
 * |---------------|--------------------------------|-----------------|------------------------------------------|
 * | `primary`     | `primary-900 → 800` (gradient) | `primary-400`   | Estado activo, categorias, tags normais  |
 * | `secondary`   | `secondary-900 → 800` (gradient)| `secondary-400`| Badges premium, papéis, funcionalidades  |
 * | `outline`     | Transparente                   | `foreground`    | Neutros, filtros, etiquetas sem destaque |
 * | `destructive` | `destructive/10`               | `destructive`   | Erros, avisos, estados críticos          |
 *
 * ---
 *
 * ## Ícones
 *
 * Os ícones são passados como `children` e dimensionados automaticamente a
 * `12px` (`--icon-xxs`) — escala micro adequada ao contexto denso do badge.
 * Coloca o ícone antes ou depois do texto conforme o significado:
 *
 * ```tsx
 * // Ícone à esquerda — reforça o significado antes de ler
 * <Badge variant="primary"><CheckCircle />Activo</Badge>
 *
 * // Ícone à direita — indica consequência ou direcção
 * <Badge variant="outline">Em revisão<Clock /></Badge>
 * ```
 *
 * ---
 *
 * ## Usage
 *
 * ```tsx
 * <Badge>Novo</Badge>
 * <Badge variant="secondary">Pro</Badge>
 * <Badge variant="outline">Rascunho</Badge>
 * <Badge variant="destructive">Erro</Badge>
 * ```
 *
 * ---
 *
 * ## Acessibilidade
 *
 * - O badge é um `div` — não é interactivo por defeito. Se for clicável,
 *   usa `role="button"` e `tabIndex={0}`.
 * - Os ícones passados como children devem ter `aria-hidden="true"` quando
 *   são puramente decorativos e o texto do badge já comunica o significado.
 *
 * ---
 *
 * ## Design tokens
 *
 * | Token                    | Onde é aplicado                          |
 * |--------------------------|------------------------------------------|
 * | `--color-primary-900/800`| Fundo variant `primary`                  |
 * | `--color-secondary-900/800` | Fundo variant `secondary`             |
 * | `--color-destructive`    | Texto e fundo (10%) variant `destructive`|
 * | `--color-border`         | Borda variant `outline`                  |
 * | `--icon-xxs`             | Tamanho do ícone (12px)                  |
 */
function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
