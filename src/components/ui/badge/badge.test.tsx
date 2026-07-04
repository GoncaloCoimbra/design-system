import { render, screen } from "@testing-library/react";
import { Badge } from "./badge";

describe("Badge", () => {
  it("renders with text", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("default variant has primary tinted background class", () => {
    render(<Badge>Default</Badge>);
    expect(screen.getByText("Default")).toHaveClass("text-primary");
  });

  it("secondary variant has elevated background class", () => {
    render(<Badge variant="secondary">Secondary</Badge>);
    expect(screen.getByText("Secondary")).toHaveClass("bg-elevated");
  });

  it("destructive variant has destructive text class", () => {
    render(<Badge variant="destructive">Destructive</Badge>);
    expect(screen.getByText("Destructive")).toHaveClass("text-destructive");
  });

  it("outline variant has foreground text class", () => {
    render(<Badge variant="outline">Outline</Badge>);
    expect(screen.getByText("Outline")).toHaveClass("text-foreground");
  });
});
