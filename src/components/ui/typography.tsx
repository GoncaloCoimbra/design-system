import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-bold tracking-tight text-foreground",
      h2: "scroll-m-20 text-3xl font-semibold tracking-tight text-foreground",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight text-foreground",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight text-foreground",
      h5: "scroll-m-20 text-lg font-semibold tracking-tight text-foreground",
      h6: "scroll-m-20 text-base font-semibold tracking-tight text-foreground",
      p: "text-base leading-7 text-foreground",
      lead: "text-xl text-muted-foreground leading-7",
      large: "text-lg font-medium text-foreground",
      small: "text-sm text-foreground leading-5",
      muted: "text-sm text-muted-foreground leading-5",
      code: "relative rounded bg-elevated px-1.5 py-0.5 font-mono text-sm text-foreground",
      blockquote: "border-l-2 border-primary pl-4 italic text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "p",
  },
});

const variantElementMap: Record<
  NonNullable<VariantProps<typeof typographyVariants>["variant"]>,
  keyof React.JSX.IntrinsicElements
> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  p: "p",
  lead: "p",
  large: "p",
  small: "p",
  muted: "p",
  code: "code",
  blockquote: "blockquote",
};

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof typographyVariants> {
  as?: keyof React.JSX.IntrinsicElements;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = "p", as, ...props }, ref) => {
    const Comp = (as ?? variantElementMap[variant!]) as React.ElementType;
    return <Comp ref={ref} className={cn(typographyVariants({ variant }), className)} {...props} />;
  }
);
Typography.displayName = "Typography";

export { Typography, typographyVariants };
