"use client"

import { ChevronDown } from "lucide-react"
import { useState } from "react"

import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ExpandableTextProps {
  /** Texto a exibir. Linhas além do limite são escondidas até expandir. */
  text: string
  /** Número de linhas visíveis quando recolhido (1–6). Default: 3. */
  lines?: number
  /** Classes Tailwind adicionais aplicadas ao wrapper. */
  className?: string
  /** Label do botão "expandir". Default: "Ver mais". */
  expandLabel?: string
  /** Label do botão "recolher". Default: "Ver menos". */
  collapseLabel?: string
}

// ─── Line-clamp map ───────────────────────────────────────────────────────────

const LINE_CLAMP_CLASSES: Record<number, string> = {
  1: "line-clamp-1",
  2: "line-clamp-2",
  3: "line-clamp-3",
  4: "line-clamp-4",
  5: "line-clamp-5",
  6: "line-clamp-6",
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * # ExpandableText
 *
 * Texto de review truncado com botão "Ver mais / Ver menos". Ideal para cards
 * de testemunhos onde o espaço vertical é limitado.
 *
 * ---
 *
 * ## Usage
 *
 * ```tsx
 * <ExpandableText
 *   text="Uma review longa que ocupa várias linhas..."
 *   lines={3}
 * />
 * ```
 *
 * ---
 *
 * ## Acessibilidade
 *
 * - O botão tem `aria-expanded` que reflete o estado atual.
 * - O ícone `ChevronDown` roda 180° quando expandido, dando uma dica visual adicional.
 */
function ExpandableText({
  text,
  lines = 3,
  className,
  expandLabel = "Ver mais",
  collapseLabel = "Ver menos",
}: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false)
  const clampClass = LINE_CLAMP_CLASSES[lines] ?? "line-clamp-3"

  return (
    <div className={cn(className)}>
      <p className={cn("text-xs leading-5 text-foreground", !expanded && clampClass)}>{text}</p>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80"
        aria-expanded={expanded}
      >
        {expanded ? collapseLabel : expandLabel}
        <ChevronDown
          size={12}
          className={cn("transition-transform duration-200", expanded && "rotate-180")}
        />
      </button>
    </div>
  )
}

ExpandableText.displayName = "ExpandableText"

export { ExpandableText }