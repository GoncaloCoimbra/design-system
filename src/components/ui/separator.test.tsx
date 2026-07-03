import { render, screen } from "@testing-library/react";
import { Separator } from "./separator";

describe("Separator", () => {
  it("renders with role separator when decorative is false", () => {
    render(<Separator decorative={false} />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("renders with role none when decorative is true", () => {
    const { container } = render(<Separator decorative={true} />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveAttribute("role", "none");
  });

  it("horizontal orientation by default applies horizontal class", () => {
    const { container } = render(<Separator />);
    expect(container.firstChild).toHaveClass("w-full");
  });

  it("vertical orientation applies vertical class", () => {
    const { container } = render(<Separator orientation="vertical" />);
    expect(container.firstChild).toHaveClass("w-px");
  });
});
