import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./tooltip";

describe("Tooltip", () => {
  it("tooltip content appears on hover", async () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip text</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
    await userEvent.hover(screen.getByText("Hover me"));
    // Radix renders an sr-only span with role="tooltip" for accessibility
    expect(await screen.findByRole("tooltip")).toBeInTheDocument();
  });
});
