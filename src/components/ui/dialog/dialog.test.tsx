import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "./dialog";

function TestDialog() {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogTitle>My Dialog</DialogTitle>
        <DialogDescription>Dialog description text</DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

describe("Dialog", () => {
  it("dialog content is not visible before opening", () => {
    render(<TestDialog />);
    expect(screen.queryByText("My Dialog")).not.toBeInTheDocument();
  });

  it("clicking trigger opens dialog", async () => {
    render(<TestDialog />);
    await userEvent.click(screen.getByText("Open"));
    expect(screen.getByText("My Dialog")).toBeInTheDocument();
  });

  it("DialogTitle and DialogDescription are rendered when open", async () => {
    render(<TestDialog />);
    await userEvent.click(screen.getByText("Open"));
    expect(screen.getByText("My Dialog")).toBeInTheDocument();
    expect(screen.getByText("Dialog description text")).toBeInTheDocument();
  });

  it("clicking close button closes dialog", async () => {
    render(<TestDialog />);
    await userEvent.click(screen.getByText("Open"));
    expect(screen.getByText("My Dialog")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(screen.queryByText("My Dialog")).not.toBeInTheDocument();
  });
});
