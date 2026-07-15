"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ExpandableTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Número de linhas visíveis antes de truncar. Default 7 (spec da issue #5). */
  maxLines?: number;
  text: string;
  expandLabel?: string;
  collapseLabel?: string;
}

const ExpandableText = React.forwardRef<HTMLParagraphElement, ExpandableTextProps>(
  (
    {
      className,
      text,
      maxLines = 7,
      expandLabel = "ler mais",
      collapseLabel = "ler menos",
      ...props
    },
    forwardedRef
  ) => {
    const [expanded, setExpanded] = React.useState(false);
    const [isTruncatable, setIsTruncatable] = React.useState(false);
    const textRef = React.useRef<HTMLSpanElement>(null);

    // Só mostra o toggle se o texto realmente exceder maxLines.
    // Não dá para saber isto pelo comprimento da string: depende da
    // largura do card e do tamanho de fonte. Por isso medimos no DOM.
    React.useEffect(() => {
      const el = textRef.current;
      if (!el) return;

      const checkTruncation = () => {
        const wasExpanded = expanded;
        if (wasExpanded) return; // não remedir enquanto expandido
        setIsTruncatable(el.scrollHeight > el.clientHeight + 1);
      };

      checkTruncation();

      if (typeof ResizeObserver === "undefined") return;

      const observer = new ResizeObserver(checkTruncation);
      observer.observe(el);
      return () => observer.disconnect();
    }, [text, maxLines, expanded]);

    return (
      <p ref={forwardedRef} className={cn("text-sm text-muted-foreground", className)} {...props}>
        <span
          ref={textRef}
          style={
            !expanded
              ? {
                  display: "-webkit-box",
                  WebkitLineClamp: maxLines,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }
              : undefined
          }
        >
          {text}
        </span>
        {isTruncatable && (
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
            className="ml-1 inline cursor-pointer font-medium text-primary hover:underline"
          >
            {expanded ? collapseLabel : expandLabel}
          </button>
        )}
      </p>
    );
  }
);
ExpandableText.displayName = "ExpandableText";

export { ExpandableText };
