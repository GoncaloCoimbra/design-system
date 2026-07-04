import { render, screen } from "@testing-library/react";
import { Progress } from "./progress";

describe("Progress", () => {
  it("renders a progressbar", () => {
    render(<Progress value={50} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("indicator transform reflects value 0 (fully left)", () => {
    const { container } = render(<Progress value={0} />);
    const indicator = container.querySelector(".bg-primary.transition-all") as HTMLElement;
    expect(indicator.style.transform).toBe("translateX(-100%)");
  });

  it("indicator transform reflects value 50", () => {
    const { container } = render(<Progress value={50} />);
    const indicator = container.querySelector(".bg-primary.transition-all") as HTMLElement;
    expect(indicator.style.transform).toBe("translateX(-50%)");
  });

  it("indicator transform reflects value 100 (fully visible)", () => {
    const { container } = render(<Progress value={100} />);
    const indicator = container.querySelector(".bg-primary.transition-all") as HTMLElement;
    expect(indicator.style.transform).toBe("translateX(-0%)");
  });
});
