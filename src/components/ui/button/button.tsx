import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default: [
          //main styles
          "bg-gradient-to-b from-primary-500 to-primary-600 text-white",
          //borders
          "border border-primary-400",
          //hover styles
          "hover:from-primary-600 hover:to-primary-600 hover:border-primary-500/50",
        ],
        secondary: [
          // main styles
          "bg-gradient-to-b from-secondary-500 to-secondary-600 text-secondary-foreground",
          // borders
          "border border-secondary-400",
          // hover styles
          "hover:from-secondary-600 hover:to-secondary-600 hover:border-secondary-500/50",
        ],
        outline: [
          // main styles
          "bg-transparent text-primary-500",
          // borders
          "border border-primary-500",
          // hover styles
          "hover:border-primary-600 hover:text-primary-600",
        ],
        ghost: [
          // main styles
          "bg-transparent text-muted-foreground",
          // hover styles
          "hover:bg-elevated hover:text-foreground",
        ],
        destructive: [
          // main styles
          "bg-gradient-to-b from-red-500 to-red-600 text-white",
          // borders
          "border border-red-400",
          // hover styles
          "hover:from-red-600 hover:to-red-600 hover:border-red-500/50",
        ],
        link: [
          // main styles
          "text-primary underline-offset-4",
          // hover styles
          "hover:underline",
        ],
      },
      size: {
        default: "h-9 px-4 py-2 text-sm",
        sm: "h-7 px-3 text-xs",
        lg: "h-11 px-6 text-sm",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    /** Shows a spinner and disables interaction. Sets aria-busy automatically. */
    loading?: boolean;
  };

/**
 * # Button
 *
 * The primary interactive element in the Commit Design System.
 * Renders a semantic `<button>` by default, with full support for icon composition,
 * async loading states, and rendering as any element via `asChild`.
 *
 * @see {@link https://main--6a47d6ac8a9990bb6908d4a9.chromatic.com/?path=/docs/ui-button--docs Storybook documentation}
 *
 * ---
 *
 * ## Variants
 *
 * | Variant       | Token family        | When to use                                                        |
 * |---------------|---------------------|--------------------------------------------------------------------|
 * | `default`     | `primary` (blue)    | The single most important action in a view. Use at most once.      |
 * | `secondary`   | `secondary` (purple)| Supporting actions alongside a primary CTA (e.g. "Save draft").   |
 * | `outline`     | `primary` border    | Lower-emphasis actions that still need clear visual affordance.    |
 * | `ghost`       | Transparent         | Toolbar actions, table row controls, nav items.                    |
 * | `destructive` | Red semantic        | Irreversible actions. Always pair with a confirmation step.        |
 * | `link`        | `primary` text      | Inline navigation-style actions.                                   |
 *
 * ---
 *
 * ## Sizes
 *
 * | Size      | Height | Use case                                              |
 * |-----------|--------|-------------------------------------------------------|
 * | `sm`      | 28px   | Compact toolbars, inline table actions, form fields.  |
 * | `default` | 36px   | The right choice for 95% of product UI.               |
 * | `lg`      | 44px   | Hero sections, onboarding flows, mobile CTAs.         |
 * | `icon`    | 36×36px| Square icon-only buttons. Always set `aria-label`.    |
 *
 * ---
 *
 * ## Usage
 *
 * ### Basic
 * ```tsx
 * <Button>Save changes</Button>
 * <Button variant="outline">Cancel</Button>
 * <Button variant="destructive">Delete account</Button>
 * ```
 *
 * ### With icons
 * ```tsx
 * // Icon on the left — reinforces the label before it's read
 * <Button><Plus /> Create project</Button>
 *
 * // Icon on the right — implies directionality or consequence
 * <Button>Continue <ArrowRight /></Button>
 *
 * // Icon only — must have aria-label
 * <Button size="icon" aria-label="Create new item"><Plus /></Button>
 * ```
 *
 * ### Loading state
 * ```tsx
 * // Automatically disables the button and sets aria-busy
 * <Button loading>Saving…</Button>
 * ```
 *
 * ### Render as a router link (asChild)
 * ```tsx
 * <Button asChild>
 *   <Link href="/dashboard">Go to dashboard</Link>
 * </Button>
 * ```
 *
 * ---
 *
 * ## Accessibility
 *
 * - Focus ring uses `focus-visible` — only appears during keyboard navigation, never on mouse click.
 * - `loading` automatically sets `disabled` and `aria-busy="true"`. Do not set these manually alongside `loading`.
 * - Icon-only buttons (`size="icon"`) **must** have an `aria-label`. Without it, screen readers announce only "button" with no context.
 * - `size="default"` (36px) meets the WCAG 2.5.5 minimum touch target. For mobile-critical actions, prefer `size="lg"`.
 * - Disabled buttons are removed from the tab order by the browser. If a tooltip is needed to explain why the button is disabled, use `aria-disabled` instead and handle clicks manually.
 *
 * ---
 *
 * ## Design tokens
 *
 * Colors are driven by the Commit theme tokens defined in `src/styles/theme.css`.
 * Override tokens after importing the theme CSS to customise for a specific product:
 *
 * ```css
 * @import "@commitpt/design-system/styles";
 *
 * @theme {
 *   --color-primary: oklch(...);
 * }
 * ```
 */
function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {loading && <Loader2 className="animate-spin" />}
      <Slottable>{children}</Slottable>
    </Comp>
  );
}

export { Button, buttonVariants };
