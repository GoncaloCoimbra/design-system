import { render, screen } from "@testing-library/react";
import { Typography } from "./typography";

describe("Typography", () => {
  // ─── Default rendering ───────────────────────────────────────────────────────

  it("renders children as text", () => {
    render(<Typography>Hello world</Typography>);
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("defaults to a <p> element", () => {
    const { container } = render(<Typography>Text</Typography>);
    expect(container.querySelector("p")).toBeInTheDocument();
  });

  // ─── Semantic element mapping ────────────────────────────────────────────────

  it.each([
    ["h1", "h1"],
    ["h2", "h2"],
    ["h3", "h3"],
    ["h4", "h4"],
    ["h5", "h5"],
    ["h6", "h6"],
    ["p", "p"],
    ["lead", "p"],
    ["large", "p"],
    ["small", "p"],
    ["muted", "p"],
    ["label", "span"],
    ["caption", "span"],
    ["overline", "span"],
    ["code", "code"],
    ["kbd", "kbd"],
    ["blockquote", "blockquote"],
  ] as const)("variant=%s renders <%s>", (variant, tag) => {
    const { container } = render(<Typography variant={variant}>Text</Typography>);
    expect(container.querySelector(tag)).toBeInTheDocument();
  });

  // ─── as prop overrides element ───────────────────────────────────────────────

  it("renders the element specified by `as` instead of the default", () => {
    const { container } = render(
      <Typography variant="h4" as="h2">
        Title
      </Typography>
    );
    expect(container.querySelector("h2")).toBeInTheDocument();
    expect(container.querySelector("h4")).not.toBeInTheDocument();
  });

  it("renders variant=p as a div when as='div'", () => {
    const { container } = render(
      <Typography variant="p" as="div">
        Text
      </Typography>
    );
    expect(container.querySelector("div > div, div")).toBeInTheDocument();
  });

  // ─── Variant classes ─────────────────────────────────────────────────────────

  it("applies tracking-tight class for heading variants", () => {
    const { container } = render(<Typography variant="h1">Heading</Typography>);
    expect(container.querySelector("h1")).toHaveClass("tracking-tight");
  });

  it("applies font-mono class for code variant", () => {
    const { container } = render(<Typography variant="code">snippet</Typography>);
    expect(container.querySelector("code")).toHaveClass("font-mono");
  });

  it("applies font-mono class for kbd variant", () => {
    const { container } = render(<Typography variant="kbd">⌘K</Typography>);
    expect(container.querySelector("kbd")).toHaveClass("font-mono");
  });

  it("applies tracking-widest and uppercase for overline variant", () => {
    render(<Typography variant="overline">Category</Typography>);
    const el = screen.getByText("Category");
    expect(el).toHaveClass("tracking-widest");
    expect(el).toHaveClass("uppercase");
  });

  it("applies border-l-2 for blockquote variant", () => {
    const { container } = render(<Typography variant="blockquote">Quote</Typography>);
    expect(container.querySelector("blockquote")).toHaveClass("border-l-2");
  });

  // ─── color prop ──────────────────────────────────────────────────────────────

  it("applies text-primary class for color='primary'", () => {
    render(<Typography color="primary">Text</Typography>);
    expect(screen.getByText("Text")).toHaveClass("text-primary");
  });

  it("applies text-destructive class for color='destructive'", () => {
    render(<Typography color="destructive">Error</Typography>);
    expect(screen.getByText("Error")).toHaveClass("text-destructive");
  });

  it("applies text-success class for color='success'", () => {
    render(<Typography color="success">Done</Typography>);
    expect(screen.getByText("Done")).toHaveClass("text-success");
  });

  it("applies text-warning class for color='warning'", () => {
    render(<Typography color="warning">Warn</Typography>);
    expect(screen.getByText("Warn")).toHaveClass("text-warning");
  });

  it("applies text-secondary class for color='secondary'", () => {
    render(<Typography color="secondary">Secondary</Typography>);
    expect(screen.getByText("Secondary")).toHaveClass("text-secondary");
  });

  // ─── weight prop ─────────────────────────────────────────────────────────────

  it("applies font-bold class for weight='bold'", () => {
    render(<Typography weight="bold">Bold</Typography>);
    expect(screen.getByText("Bold")).toHaveClass("font-bold");
  });

  it("applies font-semibold class for weight='semibold'", () => {
    render(<Typography weight="semibold">Semibold</Typography>);
    expect(screen.getByText("Semibold")).toHaveClass("font-semibold");
  });

  it("applies font-normal class for weight='normal'", () => {
    render(<Typography weight="normal">Normal</Typography>);
    expect(screen.getByText("Normal")).toHaveClass("font-normal");
  });

  // ─── align prop ──────────────────────────────────────────────────────────────

  it("applies text-center class for align='center'", () => {
    render(<Typography align="center">Centered</Typography>);
    expect(screen.getByText("Centered")).toHaveClass("text-center");
  });

  it("applies text-right class for align='right'", () => {
    render(<Typography align="right">Right</Typography>);
    expect(screen.getByText("Right")).toHaveClass("text-right");
  });

  it("applies text-left class for align='left'", () => {
    render(<Typography align="left">Left</Typography>);
    expect(screen.getByText("Left")).toHaveClass("text-left");
  });

  // ─── truncate prop ───────────────────────────────────────────────────────────

  it("applies truncate class when truncate is true", () => {
    render(<Typography truncate>Long text</Typography>);
    expect(screen.getByText("Long text")).toHaveClass("truncate");
  });

  it("does not apply truncate class when truncate is omitted", () => {
    render(<Typography>Normal text</Typography>);
    expect(screen.getByText("Normal text")).not.toHaveClass("truncate");
  });

  // ─── className passthrough ───────────────────────────────────────────────────

  it("merges additional className onto the element", () => {
    render(<Typography className="max-w-xs">Text</Typography>);
    expect(screen.getByText("Text")).toHaveClass("max-w-xs");
  });

  // ─── ref forwarding ──────────────────────────────────────────────────────────

  it("forwards ref to the underlying element", () => {
    const ref = React.createRef<HTMLElement>();
    render(<Typography ref={ref}>Text</Typography>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("P");
  });
});

// ref needs React in scope for createRef
import * as React from "react";
