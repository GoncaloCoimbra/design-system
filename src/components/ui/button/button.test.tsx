import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./button";

describe("Button", () => {
  it("renders with text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("applies default variant gradient classes", () => {
    render(<Button>Default</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("from-primary-500");
    expect(btn).toHaveClass("to-primary-600");
  });

  it("applies destructive variant gradient classes", () => {
    render(<Button variant="destructive">Destructive</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("from-red-500");
    expect(btn).toHaveClass("to-red-600");
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("disabled button doesn't call onClick", async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Click
      </Button>
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders as child element with asChild", () => {
    render(
      <Button asChild>
        <a href="/test">Link</a>
      </Button>
    );
    // asChild merges button props onto the anchor — no <button> in the DOM
    const link = screen.getByRole("link", { name: "Link" });
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe("A");
  });

  it("shows a spinner and sets aria-busy when loading", () => {
    render(<Button loading>Save</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("aria-busy", "true");
    expect(btn).toBeDisabled();
  });
});
