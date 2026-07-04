import { render } from "@testing-library/react";
import { Skeleton } from "./skeleton";

describe("Skeleton", () => {
  it("renders a div element", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("accepts and applies custom className", () => {
    const { container } = render(<Skeleton className="w-32 h-4" />);
    expect(container.firstChild).toHaveClass("w-32", "h-4");
  });
});
