import * as React from "react";
import { cn } from "@/lib/utils";
import { ExpandableText } from "@/components/ui/expandable-text/expandable-text";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Se definido, o texto passa a truncar em `maxLines` com toggle "ler mais". */
  truncate?: boolean;
  maxLines?: number;
}
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Família de componentes de cartão do Commit Design System. Inclui o container
 * base e os sub-componentes de layout: `CardHeader`, `CardTitle`,
 * `CardDescription`, `CardContent` e `CardFooter`.
 *
 * @see {@link https://storybook.commitpt.com/?path=/docs/ui-card--docs Storybook documentation}
 *
 * ---
 *
 * ## Escala tipográfica
 *
 * | Classe                                          | Tamanho | Onde é usado                    |
 * |-------------------------------------------------|---------|---------------------------------|
 * | `h6` — `text-base font-semibold tracking-tight` | 16px    | `CardTitle`, título `CardIconFeature` |
 * | `muted` — `text-sm leading-5`                   | 14px    | `CardDescription`, descrição    |
 *
 * ---
 *
 * ## Bordas
 *
 * | Token           | Onde é usado  |
 * |-----------------|---------------|
 * | `border-border` | `Card` base   |
 *
 * ---
 *
 * ## Espaçamento
 *
 * | Token    | Valor | Uso típico                                           |
 * |----------|-------|------------------------------------------------------|
 * | `p-6`    | 24px  | padding de `CardHeader`, `CardContent`, `CardFooter` |
 * | `mb-2.5` | 10px  | espaço entre título e descrição                      |
 *
 * ---
 *
 * ## Usage
 *
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Título</CardTitle>
 *     <CardDescription>Descrição</CardDescription>
 *   </CardHeader>
 *   <CardContent>Conteúdo</CardContent>
 *   <CardFooter>
 *     <Button variant="outline" size="sm">Cancelar</Button>
 *     <Button size="sm">Guardar</Button>
 *   </CardFooter>
 * </Card>
 * ```
 *
 * ### Card com descrição truncada (issue #5)
 * ```tsx
 * <CardDescription truncate maxLines={7}>
 *   {textoLongo}
 * </CardDescription>
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
  ({ className, truncate, maxLines = 7, children, ...props }, ref) => {
    if (truncate && typeof children === "string") {
      return (
        <ExpandableText
          ref={ref}
          text={children}
          maxLines={maxLines}
          className={className}
          {...props}
        />
      );
    }
    return (
      <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props}>
        {children}
      </p>
    );
  }
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

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
