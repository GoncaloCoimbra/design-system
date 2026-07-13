import { cva } from "class-variance-authority";
import { Star } from "lucide-react";
import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card/card";
import { cn } from "@/lib/utils";

// ─── Star rating ──────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  const clamped = Math.min(5, Math.max(0, Math.round(rating)));
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`${clamped} de 5 estrelas`}>
      {/* gradient definition — zero-size so it doesn't affect layout */}
      <svg width="0" height="0" className="absolute overflow-hidden">
        <defs>
          <linearGradient id="star-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" /> {/* yellow-300 */}
            <stop offset="100%" stopColor="#D97706" /> {/* amber-600 */}
          </linearGradient>
        </defs>
      </svg>
      {Array.from({ length: 5 }, (_, i) =>
        i < clamped ? (
          <Star
            key={i}
            className="icon-xs"
            style={{ fill: "url(#star-gradient)", stroke: "url(#star-gradient)" }}
          />
        ) : (
          <Star key={i} className="icon-xs fill-transparent text-muted-foreground/30" />
        )
      )}
    </div>
  );
}

// ─── Initials helper ─────────────────────────────────────────────────────────

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// ─── Variants ─────────────────────────────────────────────────────────────────

const reviewCardVariants = cva([
  // layout — @container enables child container queries
  "flex flex-col @container",
  // surface — overrides Card's bg-card with the darker surface tone
  "bg-surface",
  // elevation
  "shadow-lg shadow-black/30",
]);

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ReviewCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** URL da foto de perfil do reviewer. Quando omitida mostra as iniciais do nome. */
  avatarSrc?: string;
  /** Nome completo do reviewer. Usado no cabeçalho e para gerar as iniciais do fallback. */
  name: string;
  /** Data de adesão à plataforma, já formatada (ex: "Membro desde Jan 2023"). */
  memberSince: string;
  /** Título opcional da review. */
  title?: string;
  /** Texto da review. */
  review: string;
  /** Classificação de 1 a 5 estrelas. Valores fora do intervalo são fixados automaticamente. */
  rating: number;
  /** Data em que a review foi publicada, já formatada (ex: "14 Jan 2025"). */
  reviewDate: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * # ReviewCard
 *
 * Exibe a avaliação de um utilizador: foto de perfil, nome, data de adesão,
 * texto da review, classificação por estrelas e data da publicação.
 *
 * @see {@link https://storybook.commitpt.com/?path=/docs/ui-reviewcard--docs Storybook documentation}
 *
 * ---
 *
 * ## Anatomia
 *
 * | Zona         | Conteúdo                                              |
 * |--------------|-------------------------------------------------------|
 * | Header       | `Avatar` (foto ou iniciais) + nome + data de adesão   |
 * | Content      | Texto da review                                       |
 * | Footer       | Estrelas (`rating` / 5) + data da review              |
 *
 * ---
 *
 * ## Escala tipográfica
 *
 * | Elemento        | Variant Typography equivalente | Classes                                      |
 * |-----------------|-------------------------------|----------------------------------------------|
 * | Nome            | `label`                       | `text-sm font-medium text-foreground`         |
 * | Data de adesão  | `caption`                     | `text-xs text-muted-foreground`               |
 * | Texto da review | `muted`                       | `text-sm leading-5 text-muted-foreground`     |
 * | Data da review  | `caption`                     | `text-xs text-muted-foreground`               |
 *
 * ---
 *
 * ## Usage
 *
 * ### Com foto
 * ```tsx
 * <ReviewCard
 *   avatarSrc="/avatars/ana.png"
 *   name="Ana Kovač"
 *   memberSince="Membro desde Jan 2023"
 *   review="Excelente plataforma. O feedback das code reviews ajudou-me a crescer rapidamente."
 *   rating={5}
 *   reviewDate="14 Jan 2025"
 * />
 * ```
 *
 * ### Sem foto (fallback automático com iniciais)
 * ```tsx
 * <ReviewCard
 *   name="Bruno Moisão"
 *   memberSince="Membro desde Mar 2024"
 *   review="As sessões semanais ao vivo são o ponto alto da semana."
 *   rating={4}
 *   reviewDate="2 Fev 2025"
 * />
 * ```
 *
 * ---
 *
 * ## Acessibilidade
 *
 * - As estrelas têm `role="img"` e `aria-label="N de 5 estrelas"` para leitores de ecrã.
 * - O `Avatar` deve ter `alt` definido via `avatarSrc` — o componente passa o `name` como
 *   `alt` automaticamente.
 * - A data de adesão e a data da review são texto visível; não usam `aria-label` adicional.
 *
 * ---
 *
 * ## Design tokens
 *
 * | Token                      | Onde é aplicado                            |
 * |----------------------------|--------------------------------------------|
 * | `--color-card`             | Fundo do card                              |
 * | `--color-border`           | Borda do card                              |
 * | `--color-primary-500`      | Estrelas preenchidas                       |
 * | `--color-muted-foreground` | Texto de suporte e estrelas vazias         |
 * | `--icon-xs`                | Tamanho das estrelas (16px)                |
 */
const ReviewCard = React.forwardRef<HTMLDivElement, ReviewCardProps>(
  (
    { className, avatarSrc, name, memberSince, title, review, rating, reviewDate, ...props },
    ref
  ) => (
    <Card
      ref={ref}
      data-slot="review-card"
      className={cn(reviewCardVariants(), className)}
      {...props}
    >
      <CardHeader className="flex flex-col gap-2 space-y-0 p-4 pb-3 @[20rem]:flex-row @[20rem]:items-center @[20rem]:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar size="default" variant="secondary">
            {avatarSrc && <AvatarImage src={avatarSrc} alt={name} />}
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="truncate text-sm font-medium leading-none text-foreground">
              {name}
            </span>
            <span className="text-xs text-muted-foreground">{memberSince}</span>
          </div>
        </div>
        <div className="flex justify-start @[20rem]:justify-end">
          <StarRating rating={rating} />
        </div>
      </CardHeader>

      <CardContent className="flex-1 px-4 pb-3 pt-0">
        {title && <p className="mb-2 text-sm font-bold text-foreground">{title}</p>}
        <p className="text-xs leading-5 text-gray-50">{review}</p>
      </CardContent>

      <CardFooter className="px-4 pb-4 pt-0">
        <span className="text-xs text-muted-foreground">{reviewDate}</span>
      </CardFooter>
    </Card>
  )
);
ReviewCard.displayName = "ReviewCard";

export { ReviewCard, reviewCardVariants };
