import { render, screen } from "@testing-library/react";
import { Label } from "./label";

describe("Label", () => {
  it("renders with text", () => {
    render(<Label>My Label</Label>);
    expect(screen.getByText("My Label")).toBeInTheDocument();
  });

  it("sets htmlFor attribute correctly", () => {
    render(<Label htmlFor="my-input">Name</Label>);
    expect(screen.getByText("Name")).toHaveAttribute("for", "my-input");
  });
});
