import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip/tooltip";
import { cn } from "@/lib/utils";

// ─── Variants ─────────────────────────────────────────────────────────────────

const avatarVariants = cva("relative flex shrink-0 overflow-hidden rounded-full", {
  variants: {
    variant: {
      default: [],
      primary: [
        // gradient shows through as an inset border via padding
        "p-px bg-linear-to-b from-primary-300 to-primary-400",
      ],
      secondary: ["p-px bg-linear-to-b from-secondary-300 to-secondary-400"],
    },
    size: {
      sm: "size-7 text-[10px]",
      default: "size-9 text-xs",
      lg: "size-12 text-sm",
      xl: "size-16 text-base",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

// ─── Types ────────────────────────────────────────────────────────────────────

export type AvatarProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> &
  VariantProps<typeof avatarVariants> & {
    /** Text shown in a Tooltip on hover. Omit to disable the tooltip entirely. */
    tooltip?: React.ReactNode;
    /** Side the tooltip appears on. Passed through to TooltipContent. */
    tooltipSide?: React.ComponentPropsWithoutRef<typeof TooltipContent>["side"];
  };

export type AvatarImageProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>;
export type AvatarFallbackProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>;

// ─── Sub-components ───────────────────────────────────────────────────────────

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  AvatarImageProps
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full rounded-full object-cover", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-elevated font-medium text-muted-foreground shrink-0",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

// ─── Root ─────────────────────────────────────────────────────────────────────

/**
 * # Avatar
 *
 * Displays a user or entity's profile image with an optional text fallback,
 * border variant (primary / secondary brand colours), and hover tooltip.
 * Built on top of `@radix-ui/react-avatar` and the design system's Tooltip.
 *
 * @see {@link https://storybook.commitpt.com/?path=/docs/ui-avatar--docs Storybook documentation}
 *
 * ---
 *
 * ## Variants
 *
 * | Variant     | Border                        | When to use                                              |
 * |-------------|-------------------------------|----------------------------------------------------------|
 * | `default`   | None                          | Most product contexts — lists, tables, cards             |
 * | `primary`   | `primary-500 → 600` gradient inset border  | Highlight the current user or a selected/active member   |
 * | `secondary` | `secondary-500 → 600` gradient inset border | Highlight team leads, special roles, or featured members |
 *
 * ---
 *
 * ## Sizes
 *
 * | Size      | Dimensions | Use case                                                    |
 * |-----------|------------|-------------------------------------------------------------|
 * | `sm`      | 28×28px    | Compact lists, comment threads, table rows                  |
 * | `default` | 36×36px    | The right choice for most UI — nav, cards, member lists     |
 * | `lg`      | 48×48px    | Profile headers, dialog triggers, featured user sections    |
 * | `xl`      | 64×64px    | Account settings, user profile pages, onboarding steps      |
 *
 * ---
 *
 * ## Usage
 *
 * ### With image
 * ```tsx
 * <Avatar>
 *   <AvatarImage src="/avatars/jane.png" alt="Jane Doe" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 * ```
 *
 * ### Fallback only
 * ```tsx
 * <Avatar>
 *   <AvatarFallback>BM</AvatarFallback>
 * </Avatar>
 * ```
 *
 * ### Primary border (current user)
 * ```tsx
 * <Avatar variant="primary">
 *   <AvatarImage src="/me.png" alt="You" />
 *   <AvatarFallback>ME</AvatarFallback>
 * </Avatar>
 * ```
 *
 * ### With tooltip
 * ```tsx
 * <Avatar tooltip="Jane Doe">
 *   <AvatarImage src="/avatars/jane.png" alt="Jane Doe" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 * ```
 *
 * ### Avatar group (stacked)
 * ```tsx
 * <div className="flex -space-x-2">
 *   <Avatar className="ring-2 ring-background">…</Avatar>
 *   <Avatar className="ring-2 ring-background">…</Avatar>
 * </div>
 * ```
 *
 * ---
 *
 * ## Accessibility
 *
 * - Always pass a meaningful `alt` on `<AvatarImage>`. Screen readers announce the image
 *   description — "JD" is not sufficient on its own.
 * - `<AvatarFallback>` is announced as text by screen readers when the image fails to load.
 *   Use initials (2 characters max) to keep announcements concise.
 * - The `tooltip` prop wraps the avatar in a Radix `Tooltip`. The tooltip text is surfaced
 *   via `aria-label` on the trigger, so screen reader users get the name even without hover.
 * - For avatar groups, add a wrapping `<ul>` with `aria-label="Team members"` and render
 *   each avatar inside an `<li>` to give screen readers list context.
 *
 * ---
 *
 * ## Design tokens
 *
 * | Token                    | Used by                        |
 * |--------------------------|--------------------------------|
 * | `--color-primary-500`    | `variant="primary"` outline    |
 * | `--color-secondary-500`  | `variant="secondary"` outline  |
 * | `--color-elevated`       | Fallback background            |
 * | `--color-muted-foreground` | Fallback text color          |
 * | `--color-background`     | Stack ring (`ring-background`) |
 */
const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  ({ className, variant, size, tooltip, tooltipSide = "top", children, ...props }, ref) => {
    const root = (
      <AvatarPrimitive.Root
        ref={ref}
        className={cn(avatarVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </AvatarPrimitive.Root>
    );

    if (!tooltip) return root;

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{root}</TooltipTrigger>
          <TooltipContent side={tooltipSide}>{tooltip}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);
Avatar.displayName = AvatarPrimitive.Root.displayName;

export { Avatar, AvatarFallback, AvatarImage, avatarVariants };
