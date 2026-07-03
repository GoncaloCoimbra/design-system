import { render, screen } from "@testing-library/react";
import { Alert, AlertTitle, AlertDescription } from "./alert";

describe("Alert", () => {
  it("renders with role alert", () => {
    render(<Alert>Alert content</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders AlertTitle and AlertDescription", () => {
    render(
      <Alert>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>Something went wrong.</AlertDescription>
      </Alert>
    );
    expect(screen.getByText("Heads up!")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
  });

  it("destructive variant applies destructive class", () => {
    render(<Alert variant="destructive">Error</Alert>);
    expect(screen.getByRole("alert")).toHaveClass("text-destructive");
  });
});
