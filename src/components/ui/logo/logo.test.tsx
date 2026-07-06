import { render, screen } from "@testing-library/react";
import { Logo } from "./logo";

describe("Logo", () => {
  it("renders an img element", () => {
    render(<Logo />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("uses default alt text", () => {
    render(<Logo />);
    expect(screen.getByAltText("commitpt logo")).toBeInTheDocument();
  });

  it("accepts a custom alt text", () => {
    render(<Logo alt="brand logo" />);
    expect(screen.getByAltText("brand logo")).toBeInTheDocument();
  });

  it("accepts an empty alt for decorative use", () => {
    // alt="" gives the img role "presentation" per the HTML spec —
    // use querySelector to reach it without going through the role system
    const { container } = render(<Logo alt="" />);
    const img = container.querySelector("img");
    expect(img).toHaveAttribute("alt", "");
  });

  it("applies default size of 40 to width and height", () => {
    render(<Logo />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("width", "40");
    expect(img).toHaveAttribute("height", "40");
  });

  it("applies a custom size to both width and height", () => {
    render(<Logo size={96} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("width", "96");
    expect(img).toHaveAttribute("height", "96");
  });

  it("applies inline style minWidth and minHeight equal to size", () => {
    render(<Logo size={64} />);
    const img = screen.getByRole("img");
    expect(img).toHaveStyle({ minWidth: "64px", minHeight: "64px" });
  });

  it("applies default rounded-md class", () => {
    render(<Logo />);
    expect(screen.getByRole("img")).toHaveClass("rounded-md");
  });

  it("applies a custom rounded class", () => {
    render(<Logo rounded="rounded-full" />);
    expect(screen.getByRole("img")).toHaveClass("rounded-full");
  });

  it("merges additional className onto the img", () => {
    render(<Logo className="shadow-lg" />);
    expect(screen.getByRole("img")).toHaveClass("shadow-lg");
  });

  it("sets data-slot='logo'", () => {
    render(<Logo />);
    expect(screen.getByRole("img")).toHaveAttribute("data-slot", "logo");
  });

  it("forwards extra props onto the img element", () => {
    render(<Logo data-testid="brand-logo" />);
    expect(screen.getByTestId("brand-logo")).toBeInTheDocument();
  });
});
