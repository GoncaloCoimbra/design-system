import { render, screen } from "@testing-library/react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

describe("Avatar", () => {
  it("renders AvatarFallback text when no image loads", () => {
    render(
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByText("AB")).toBeInTheDocument();
  });

  it("AvatarImage accepts src and alt props without crashing", () => {
    // Radix Avatar only renders the img after it loads; in jsdom it falls back
    // We verify the component renders without error and fallback is shown
    render(
      <Avatar>
        <AvatarImage src="https://example.com/avatar.png" alt="User avatar" />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    );
    // Fallback renders because image can't load in jsdom
    expect(screen.getByText("AB")).toBeInTheDocument();
  });
});
