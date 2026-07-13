import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

// ─── Variants ─────────────────────────────────────────────────────────────────

const typographyVariants = cva("", {
  variants: {
    variant: {
      // ── Headings
      h1: "scroll-m-20 text-4xl font-bold tracking-tight text-foreground",
      h2: "scroll-m-20 text-3xl font-semibold tracking-tight text-foreground",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight text-foreground",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight text-foreground",
      h5: "scroll-m-20 text-lg font-semibold tracking-tight text-foreground",
      h6: "scroll-m-20 text-base font-semibold tracking-tight text-foreground",

      // ── Body
      p: "text-base leading-7 text-foreground",
      lead: "text-xl text-muted-foreground leading-7",
      large: "text-lg font-medium text-foreground",
      small: "text-sm text-foreground leading-5",
      muted: "text-sm text-muted-foreground leading-5",

      // ── Utility text
      label: "text-sm font-medium text-foreground leading-none",
      caption: "text-xs text-muted-foreground leading-4",
      overline: "text-xs font-semibold uppercase tracking-widest text-muted-foreground",

      // ── Inline / special
      code: "relative rounded bg-elevated px-1.5 py-0.5 font-mono text-sm text-foreground",
      kbd: [
        "inline-flex items-center rounded border border-border bg-elevated",
        "px-1.5 py-0.5 font-mono text-xs font-medium text-foreground",
        "shadow-[0_2px_0_0_var(--color-border)]",
      ],
      blockquote: "border-l-2 border-primary pl-4 italic text-muted-foreground",
    },

    color: {
      default: "",
      primary: "text-primary",
      secondary: "text-secondary",
      muted: "text-muted-foreground",
      success: "text-success",
      warning: "text-warning",
      destructive: "text-destructive",
      inherit: "text-inherit",
    },

    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },

    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },

    truncate: {
      true: "truncate",
    },
  },
  defaultVariants: {
    variant: "p",
    color: "default",
  },
});

// ─── Element map ──────────────────────────────────────────────────────────────

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
  label: "span",
  caption: "span",
  overline: "span",
  code: "code",
  kbd: "kbd",
  blockquote: "blockquote",
};

// ─── Types ────────────────────────────────────────────────────────────────────

export type TypographyProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof typographyVariants> & {
    /**
     * Override the rendered HTML element. When omitted, each `variant` maps to
     * its semantically appropriate element (e.g. `h1` → `<h1>`, `code` → `<code>`).
     */
    as?: keyof React.JSX.IntrinsicElements;
  };

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * # Typography
 *
 * A single component for all text in the design system. It encodes the full
 * typographic scale — headings, body, utility text, and inline elements —
 * and handles semantic HTML element selection automatically.
 *
 * @see {@link https://storybook.commitpt.com/?path=/docs/ui-typography--docs Storybook documentation}
 *
 * ---
 *
 * ## Variants
 *
 * ### Headings
 * | Variant | Element | Size   | Weight   | Use case                              |
 * |---------|---------|--------|----------|---------------------------------------|
 * | `h1`    | `<h1>`  | 36px   | Bold     | Page title — one per page             |
 * | `h2`    | `<h2>`  | 30px   | Semibold | Major section heading                 |
 * | `h3`    | `<h3>`  | 24px   | Semibold | Sub-section heading                   |
 * | `h4`    | `<h4>`  | 20px   | Semibold | Card / panel heading                  |
 * | `h5`    | `<h5>`  | 18px   | Semibold | Group label inside a section          |
 * | `h6`    | `<h6>`  | 16px   | Semibold | Smallest heading, prefer `label` instead |
 *
 * ### Body
 * | Variant | Element | Size   | Use case                              |
 * |---------|---------|--------|---------------------------------------|
 * | `p`     | `<p>`   | 16px   | Default body copy                     |
 * | `lead`  | `<p>`   | 20px   | Introductory paragraph below a heading |
 * | `large` | `<p>`   | 18px   | Emphasised body; feature descriptions |
 * | `small` | `<p>`   | 14px   | Secondary body; supporting copy       |
 * | `muted` | `<p>`   | 14px   | De-emphasised copy, timestamps, hints |
 *
 * ### Utility text
 * | Variant    | Element  | Size   | Use case                              |
 * |------------|----------|--------|---------------------------------------|
 * | `label`    | `<span>` | 14px   | Form labels, control labels           |
 * | `caption`  | `<span>` | 12px   | Image captions, table annotations     |
 * | `overline` | `<span>` | 12px   | Section category tags, eyebrow text   |
 *
 * ### Inline / special
 * | Variant      | Element        | Use case                              |
 * |--------------|----------------|---------------------------------------|
 * | `code`       | `<code>`       | Inline code snippets                  |
 * | `kbd`        | `<kbd>`        | Keyboard shortcuts (e.g. ⌘K)         |
 * | `blockquote` | `<blockquote>` | Pull quotes, testimonials             |
 *
 * ---
 *
 * ## Props
 *
 * | Prop       | Values                                                    | Default     |
 * |------------|-----------------------------------------------------------|-------------|
 * | `variant`  | See tables above                                          | `"p"`       |
 * | `color`    | `default` `primary` `secondary` `muted` `success` `warning` `destructive` `inherit` | `"default"` |
 * | `weight`   | `normal` `medium` `semibold` `bold`                       | —           |
 * | `align`    | `left` `center` `right`                                   | —           |
 * | `truncate` | `true`                                                    | —           |
 * | `as`       | Any HTML tag string                                       | auto        |
 *
 * ---
 *
 * ## Usage
 *
 * ### Basic
 * ```tsx
 * <Typography variant="h1">Page title</Typography>
 * <Typography variant="lead">Introductory text below the heading.</Typography>
 * <Typography variant="p">Body copy goes here.</Typography>
 * ```
 *
 * ### Color override
 * ```tsx
 * <Typography variant="small" color="primary">Active filter</Typography>
 * <Typography variant="muted" color="destructive">Required field</Typography>
 * ```
 *
 * ### Weight override
 * ```tsx
 * <Typography variant="p" weight="semibold">Important notice</Typography>
 * ```
 *
 * ### Truncation
 * ```tsx
 * <Typography variant="p" truncate className="max-w-xs">
 *   Very long text that should not wrap onto a second line...
 * </Typography>
 * ```
 *
 * ### Override element
 * ```tsx
 * // Render an h2 that looks like an h4
 * <Typography variant="h4" as="h2">Section title</Typography>
 * ```
 *
 * ### Inline code and keyboard shortcuts
 * ```tsx
 * <Typography variant="p">
 *   Press <Typography variant="kbd" as="kbd">⌘K</Typography> to open the command palette.
 *   Use <Typography variant="code" as="code">npm run dev</Typography> to start the server.
 * </Typography>
 * ```
 *
 * ---
 *
 * ## Accessibility
 *
 * - Heading variants render semantic `<h1>`–`<h6>` elements by default. Never skip heading
 *   levels for visual effect — use the `as` prop to decouple visual size from semantic level.
 * - `variant="label"` renders a `<span>`, not a `<label>`. For form controls, use the
 *   `<Label>` component instead so the `htmlFor` association is correct.
 * - `variant="kbd"` renders a `<kbd>` element which assistive technology announces as a
 *   keyboard key. Always use real key symbols rather than verbose descriptions.
 *
 * ---
 *
 * ## Design tokens
 *
 * | Token                    | Used by                                              |
 * |--------------------------|------------------------------------------------------|
 * | `--color-foreground`     | Default text colour for headings and body            |
 * | `--color-muted-foreground` | `muted`, `lead`, `caption`, `overline`, `blockquote` |
 * | `--color-primary`        | `blockquote` left border; `color="primary"`          |
 * | `--color-elevated`       | `code` and `kbd` background fill                     |
 * | `--color-border`         | `kbd` border and shadow                              |
 * | `--font-sans`            | All variants except `code` and `kbd`                 |
 * | `--font-mono`            | `code`, `kbd`                                        |
 */
const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = "p", color = "default", weight, align, truncate, as, ...props }, ref) => {
    const Comp = (as ?? variantElementMap[variant!]) as React.ElementType;
    return (
      <Comp
        ref={ref}
        className={cn(typographyVariants({ variant, color, weight, align, truncate }), className)}
        {...props}
      />
    );
  }
);
Typography.displayName = "Typography";

export { Typography, typographyVariants };
