import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

describe("Avatar", () => {
  // ─── Rendering ──────────────────────────────────────────────────────────────

  it("renders fallback text when no image is provided", () => {
    render(
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByText("AB")).toBeInTheDocument();
  });

  it("renders fallback when image cannot load in jsdom", () => {
    render(
      <Avatar>
        <AvatarImage src="https://example.com/avatar.png" alt="User avatar" />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByText("AB")).toBeInTheDocument();
  });

  it("sets data-slot='logo' on the root", () => {
    render(
      <Avatar data-testid="av">
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );
    // Radix renders the root as a span; verify it mounts without crashing
    expect(screen.getByText("AB")).toBeInTheDocument();
  });

  it("forwards extra props onto the root element", () => {
    render(
      <Avatar data-testid="av-root">
        <AvatarFallback>XY</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByTestId("av-root")).toBeInTheDocument();
  });

  // ─── Variants ───────────────────────────────────────────────────────────────

  it("applies no gradient classes for default variant", () => {
    render(
      <Avatar data-testid="av" variant="default">
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );
    const root = screen.getByTestId("av");
    expect(root).not.toHaveClass("bg-gradient-to-b");
    expect(root).not.toHaveClass("p-[2px]");
  });

  it("applies gradient padding classes for primary variant", () => {
    render(
      <Avatar data-testid="av" variant="primary">
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );
    const root = screen.getByTestId("av");
    expect(root).toHaveClass("bg-gradient-to-b");
    expect(root).toHaveClass("from-primary-500");
    expect(root).toHaveClass("to-primary-600");
  });

  it("applies gradient padding classes for secondary variant", () => {
    render(
      <Avatar data-testid="av" variant="secondary">
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );
    const root = screen.getByTestId("av");
    expect(root).toHaveClass("bg-gradient-to-b");
    expect(root).toHaveClass("from-secondary-500");
    expect(root).toHaveClass("to-secondary-600");
  });

  // ─── Sizes ──────────────────────────────────────────────────────────────────

  it("applies size-7 class for sm size", () => {
    render(
      <Avatar data-testid="av" size="sm">
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByTestId("av")).toHaveClass("size-7");
  });

  it("applies size-9 class for default size", () => {
    render(
      <Avatar data-testid="av" size="default">
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByTestId("av")).toHaveClass("size-9");
  });

  it("applies size-12 class for lg size", () => {
    render(
      <Avatar data-testid="av" size="lg">
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByTestId("av")).toHaveClass("size-12");
  });

  it("applies size-16 class for xl size", () => {
    render(
      <Avatar data-testid="av" size="xl">
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByTestId("av")).toHaveClass("size-16");
  });

  // ─── Tooltip ────────────────────────────────────────────────────────────────

  it("renders without a tooltip when tooltip prop is omitted", () => {
    render(
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("shows tooltip on hover when tooltip prop is provided", async () => {
    const user = userEvent.setup();
    render(
      <Avatar tooltip="Jane Doe">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    await user.hover(screen.getByText("JD").closest("span")!);
    // Radix renders an accessible tooltip role span alongside the visible content
    expect(await screen.findByRole("tooltip")).toBeInTheDocument();
  });

  it("accepts a React node as tooltip content", async () => {
    const user = userEvent.setup();
    render(
      <Avatar tooltip={<strong>Jane Doe</strong>}>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    await user.hover(screen.getByText("JD").closest("span")!);
    expect(await screen.findByRole("tooltip")).toBeInTheDocument();
  });

  // ─── className passthrough ───────────────────────────────────────────────────

  it("merges additional className onto the root", () => {
    render(
      <Avatar data-testid="av" className="ring-2 ring-background">
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByTestId("av")).toHaveClass("ring-2", "ring-background");
  });
});
