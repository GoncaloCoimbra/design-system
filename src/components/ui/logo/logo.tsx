import * as React from "react";

import commitIcon from "@/assets/commit_icon.png";
import { cn } from "@/lib/utils";

export type LogoProps = Omit<React.ComponentProps<"img">, "src" | "width" | "height"> & {
  /**
   * Size of the logo in pixels. Applied to both width and height to keep the
   * logo square. Defaults to 40px.
   */
  size?: number;
  /**
   * Border radius applied to the logo container. Use a Tailwind class string
   * (e.g. "rounded-full", "rounded-lg") or omit to use the default rounded-xl.
   */
  rounded?: string;
};

/**
 * # Logo
 *
 * Renders the commitpt brand mark — the `commit_icon.png` asset — as a square
 * image with a configurable size and border radius.
 *
 * @see {@link https://main--6a47d6ac8a9990bb6908d4a9.chromatic.com/?path=/docs/ui-logo--docs Storybook documentation}
 *
 * ---
 *
 * ## Size
 *
 * Pass any positive integer to `size`. The value is applied to both `width` and
 * `height` so the logo remains square at every scale.
 *
 * | Common value | Use case                                      |
 * |-------------|-----------------------------------------------|
 * | `24`        | Inline text, dense toolbars                   |
 * | `32`        | Compact nav bars, list items                  |
 * | `40`        | Default — app nav, headers (default)          |
 * | `64`        | Feature banners, settings pages               |
 * | `96`        | Splash screens, onboarding hero               |
 * | `128+`      | Marketing pages, large empty states           |
 *
 * ---
 *
 * ## Border radius
 *
 * Control rounding via the `rounded` prop — pass any Tailwind border-radius
 * class. The default (`rounded-xl`) gives the logo a soft, modern look that
 * matches the app icon convention on iOS/Android.
 *
 * | `rounded` value  | Result                             |
 * |------------------|------------------------------------|
 * | `"rounded-sm"`   | Slight rounding — almost square    |
 * | `"rounded-lg"`   | Moderate rounding                  |
 * | `"rounded-md"`   | Default — subtle, keeps it square-feeling |
 * | `"rounded-2xl"`  | Rounder, more playful              |
 * | `"rounded-full"` | Fully circular                     |
 *
 * ---
 *
 * ## Usage
 *
 * ### Basic (default size)
 * ```tsx
 * <Logo />
 * ```
 *
 * ### Custom size
 * ```tsx
 * <Logo size={64} />
 * ```
 *
 * ### Circular logo
 * ```tsx
 * <Logo size={48} rounded="rounded-full" />
 * ```
 *
 * ### In a nav bar
 * ```tsx
 * <nav className="flex items-center gap-3">
 *   <Logo size={32} />
 *   <span className="font-semibold">commitpt</span>
 * </nav>
 * ```
 *
 * ---
 *
 * ## Accessibility
 *
 * - The `alt` prop defaults to `"commitpt logo"`. Override it when context
 *   requires a more specific description, or set `alt=""` when the logo is
 *   purely decorative and a visible product name already labels it.
 * - The component renders a native `<img>` — it is discoverable by assistive
 *   technology without any extra ARIA attributes.
 * - There is no minimum touch target concern: the Logo is never interactive by
 *   default. If you make it clickable (e.g. link to home), wrap it in an
 *   anchor and ensure the anchor meets the 44×44 px WCAG touch target.
 *
 * ---
 *
 * ## Design tokens
 *
 * The Logo does not consume color tokens — it renders the PNG asset verbatim.
 * Border radius uses Tailwind utility classes rather than `--radius` tokens so
 * the shape can be overridden independently of the global radius scale.
 */
function Logo({
  size = 40,
  rounded = "rounded-md",
  className,
  alt = "commitpt logo",
  ...props
}: LogoProps) {
  return (
    <img
      data-slot="logo"
      src={commitIcon}
      alt={alt}
      width={size}
      height={size}
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
      className={cn("shrink-0 object-cover", rounded, className)}
      {...props}
    />
  );
}

export { Logo };
