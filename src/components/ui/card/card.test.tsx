import { render, screen } from "@testing-library/react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";

describe("Card", () => {
  it("renders Card with all sub-components and content is visible", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Content here</CardContent>
        <CardFooter>Footer here</CardFooter>
      </Card>
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Content here")).toBeInTheDocument();
    expect(screen.getByText("Footer here")).toBeInTheDocument();
  });
});

describe("CardDescription truncate", () => {
  it("does not show toggle for short text", () => {
    render(
      <CardDescription truncate maxLines={7}>
        Texto curto.
      </CardDescription>
    );
    expect(screen.queryByText("ler mais")).not.toBeInTheDocument();
  });

  it("renders plain text when truncate is not set", () => {
    render(<CardDescription>Descrição normal</CardDescription>);
    expect(screen.getByText("Descrição normal")).toBeInTheDocument();
    expect(screen.queryByText("ler mais")).not.toBeInTheDocument();
  });

  it("renders the text content when truncate is set", () => {
    render(
      <CardDescription truncate maxLines={7}>
        Texto de exemplo truncável.
      </CardDescription>
    );
    expect(screen.getByText("Texto de exemplo truncável.")).toBeInTheDocument();
  });
});
