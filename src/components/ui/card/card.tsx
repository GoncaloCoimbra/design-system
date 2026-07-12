import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Família de componentes de cartão do Commit Design System. Inclui a variante
 * base (`Card` + sub-componentes de layout) e três variantes de "feature card"
 * usadas em secções de marketing/landing: `CardIconFeature`, `CardNumbered`
 * e `CardNumberedRow`.
 *
 * @see {@link https://main--6a47d6ac8a9990bb6908d4a9.chromatic.com/?path=/docs/ui-card--docs Storybook documentation}
 *
 * ---
 *
 * ## Escala tipográfica
 *
 * Todos os tamanhos de texto usados nas variantes de Card seguem a escala
 * padrão do Tailwind — a mesma que o `Button` usa — em vez de valores `px`
 * arbitrários. Isto garante que qualquer variante nova continua alinhada à
 * mesma grelha tipográfica do resto do design system.
 *
 * | Classe       | Tamanho | Onde é usado                                          |
 * |--------------|---------|--------------------------------------------------------|
 * | `text-xs`    | 12px    | categoria (mono, uppercase) em todas as variantes       |
 * | `text-sm`    | 14px    | descrição em todas as variantes                         |
 * | `text-base`  | 16px    | `CardTitle`, título do `CardIconFeature`                 |
 * | `text-lg`    | 18px    | título do `CardNumbered`                                 |
 * | `text-xl`    | 20px    | título do `CardNumberedRow`                              |
 * | `text-2xl`   | 24px    | número (`CardNumbered` + `CardNumberedRow`)              |
 *
 * ---
 *
 * ## Ícone vs. número — mesma caixa, 24px
 *
 * O ícone do `CardIconFeature` (`h-6 w-6` → 24px) e o número decorativo do
 * `CardNumbered` / `CardNumberedRow` (`text-2xl` → 24px) foram deliberadamente
 * igualados. Antes o número usava 44px/34px, quase o dobro do ícone, o que
 * desequilibrava o peso visual entre variantes. Ao usar a mesma altura, o
 * marcador (ícone ou número) tem sempre o mesmo protagonismo, seja qual for
 * a variante escolhida.
 *
 * ---
 *
 * ## Bordas
 *
 * | Token                        | Onde é usado                                         |
 * |-------------------------------|-------------------------------------------------------|
 * | `border-border`               | `Card` (default), `CardIconFeature` (estado default)   |
 * | `hover:border-[#2E3F5A]`      | `CardIconFeature` no hover                             |
 * | `border-border/40`            | divisor entre itens em `CardNumbered` / `CardNumberedRow` (40% opacidade) |
 *
 * ---
 *
 * ## Espaçamento
 *
 * | Token         | Valor | Uso típico                                    |
 * |---------------|-------|------------------------------------------------|
 * | `p-6`         | 24px  | padding interno de `CardHeader`/`CardContent`/`CardFooter`/`CardIconFeature` |
 * | `mb-2.5`      | 10px  | espaço entre título e descrição                |
 * | `mb-4`/`gap-6`| 16px  | espaço entre descrição e categoria; gap do grid de `CardNumberedRow` |
 * | `py-8`        | 32px  | padding vertical de cada linha em `CardNumberedRow` |
 *
 * ---
 *
 * ## Usage
 *
 * ### Card base
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Título</CardTitle>
 *     <CardDescription>Descrição</CardDescription>
 *   </CardHeader>
 *   <CardContent>Conteúdo</CardContent>
 *   <CardFooter>
 *     <Button variant="outline" size="sm">Cancel</Button>
 *     <Button size="sm">Save</Button>
 *   </CardFooter>
 * </Card>
 * ```
 *
 * ### Feature card com ícone (layout horizontal)
 * ```tsx
 * <CardIconFeature
 *   icon={<ClockIcon />}
 *   title="Sessões Semanais ao Vivo"
 *   description="Chamadas regulares em tempo real."
 *   category="Ao Vivo"
 * />
 * ```
 *
 * ### Feature card numerado (layout vertical, número em cima)
 * ```tsx
 * <CardNumbered
 *   number="01"
 *   title="Sessões Semanais ao Vivo"
 *   description="Chamadas regulares em tempo real."
 *   category="Ao Vivo"
 * />
 * ```
 *
 * ### Feature card numerado (layout em linha, número à esquerda)
 * ```tsx
 * <CardNumberedRow
 *   number="01"
 *   title="Sessões Semanais ao Vivo"
 *   description="Chamadas regulares em tempo real."
 *   category="Ao Vivo"
 * />
 * ```
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-lg border border-border bg-card text-card-foreground", className)}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1 p-6", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-base font-semibold text-foreground leading-none tracking-tight",
        className
      )}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0 gap-2", className)} {...props} />
  )
);
CardFooter.displayName = "CardFooter";

/* ------------------------------------------------------------------ */
/* Variante horizontal — ícone com ponto que pisca lento no hover      */
/* Ícone: h-6 w-6 (24px) — ver tabela de escala no topo do ficheiro    */
/* ------------------------------------------------------------------ */

export interface CardIconFeatureProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  title: string;
  description: string;
  category: string;
}

const CardIconFeature = React.forwardRef<HTMLDivElement, CardIconFeatureProps>(
  ({ className, icon, title, description, category, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "group rounded-[10px] border border-border bg-card p-6 pb-5",
        "transition-colors duration-300 hover:border-[#2E3F5A]",
        className
      )}
      {...props}
    >
      <div className="mb-4 h-6 w-6 [&_svg]:h-6 [&_svg]:w-6 [&_.card-icon-dot]:group-hover:animate-pulse">
        {icon}
      </div>
      <h3 className="mb-2.5 text-base font-semibold leading-snug tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mb-3.5 text-sm leading-relaxed text-muted-foreground">{description}</p>
      <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground/70">
        {category}
      </div>
    </div>
  )
);
CardIconFeature.displayName = "CardIconFeature";

/* ------------------------------------------------------------------ */
/* Variante vertical — numeração editorial em contorno                 */
/* Número: text-2xl (24px) — igualado ao ícone do CardIconFeature      */
/* ------------------------------------------------------------------ */

export interface CardNumberedProps extends React.HTMLAttributes<HTMLDivElement> {
  number: string;
  title: string;
  description: string;
  category: string;
  /** Onde o número aparece no card. Default "top". */
  numberPosition?: "top" | "bottom";
}

const CardNumbered = React.forwardRef<HTMLDivElement, CardNumberedProps>(
  ({ className, number, title, description, category, numberPosition = "top", ...props }, ref) => {
    const numberEl = (
      <div
        className={cn(
          "font-[Space_Grotesk] text-2xl font-bold leading-none text-transparent",
          numberPosition === "top" ? "mb-5" : "mt-5"
        )}
        style={{ WebkitTextStroke: "1px #2E3B52" }}
      >
        {number}
      </div>
    );

    return (
      <div
        ref={ref}
        className={cn(
          "border-r border-border/40 pb-2 pr-7 last:border-r-0 last:pr-0",
          "md:border-r md:last:border-r-0",
          className
        )}
        {...props}
      >
        {numberPosition === "top" && numberEl}
        <h3 className="mb-2.5 text-lg font-semibold leading-snug tracking-tight text-foreground">
          {title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{description}</p>
        <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground/70">
          {category}
        </div>
        {numberPosition === "bottom" && numberEl}
      </div>
    );
  }
);
CardNumbered.displayName = "CardNumbered";

/* ------------------------------------------------------------------ */
/* Variante lista — número à esquerda, conteúdo à direita, empilhado   */
/* Número: text-2xl (24px) — igualado ao ícone do CardIconFeature      */
/* ------------------------------------------------------------------ */

export interface CardNumberedRowProps extends React.HTMLAttributes<HTMLDivElement> {
  number: string;
  title: string;
  description: string;
  category: string;
}

const CardNumberedRow = React.forwardRef<HTMLDivElement, CardNumberedRowProps>(
  ({ className, number, title, description, category, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-[56px_1fr] gap-6 border-b border-border/40 py-8 last:border-b-0",
        className
      )}
      {...props}
    >
      <div
        className="font-[Space_Grotesk] text-2xl font-bold leading-none text-transparent"
        style={{ WebkitTextStroke: "1px #2E3B52" }}
      >
        {number}
      </div>
      <div>
        <h3 className="mb-2.5 text-xl font-semibold leading-snug tracking-tight text-foreground">
          {title}
        </h3>
        <p className="mb-3 max-w-[420px] text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground/70">
          {category}
        </div>
      </div>
    </div>
  )
);
CardNumberedRow.displayName = "CardNumberedRow";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardIconFeature,
  CardNumbered,
  CardNumberedRow,
};
