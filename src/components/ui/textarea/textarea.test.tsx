import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Textarea } from "./textarea";

describe("Textarea", () => {
  it("renders a textarea element", () => {
    render(<Textarea />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("accepts text input", async () => {
    render(<Textarea />);
    const textarea = screen.getByRole("textbox");
    await userEvent.type(textarea, "Hello world");
    expect(textarea).toHaveValue("Hello world");
  });

  it("disabled state prevents interaction", () => {
    render(<Textarea disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });
});
