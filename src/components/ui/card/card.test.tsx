import { render, screen } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardIconFeature,
  CardNumbered,
  CardNumberedRow,
} from "./card";

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

describe("CardIconFeature", () => {
  it("renders title, description and category", () => {
    render(
      <CardIconFeature
        icon={<svg data-testid="icon" />}
        title="Sessões Semanais ao Vivo"
        description="Chamadas regulares em tempo real."
        category="Ao Vivo"
      />
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByText("Sessões Semanais ao Vivo")).toBeInTheDocument();
    expect(screen.getByText("Chamadas regulares em tempo real.")).toBeInTheDocument();
    expect(screen.getByText("Ao Vivo")).toBeInTheDocument();
  });
});

describe("CardNumbered", () => {
  it("renders number, title, description and category", () => {
    render(
      <CardNumbered
        number="01"
        title="Projetos com gente a depender de ti"
        description="Deadlines, dependências, standup que cobra."
        category="Colaborativo"
      />
    );
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("Projetos com gente a depender de ti")).toBeInTheDocument();
    expect(screen.getByText("Deadlines, dependências, standup que cobra.")).toBeInTheDocument();
    expect(screen.getByText("Colaborativo")).toBeInTheDocument();
  });

  it("renders the number a single time even when numberPosition is bottom", () => {
    render(
      <CardNumbered
        number="01"
        title="Sessões Semanais ao Vivo"
        description="Chamadas regulares em tempo real."
        category="Ao Vivo"
        numberPosition="bottom"
      />
    );
    expect(screen.getAllByText("01")).toHaveLength(1);
  });
});

describe("CardNumberedRow", () => {
  it("renders number, title, description and category in a row layout", () => {
    render(
      <CardNumberedRow
        number="02"
        title="Revisões de código de quem já ships"
        description="Submetes o teu trabalho e recebes análise específica."
        category="Code Review"
      />
    );
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("Revisões de código de quem já ships")).toBeInTheDocument();
    expect(
      screen.getByText("Submetes o teu trabalho e recebes análise específica.")
    ).toBeInTheDocument();
    expect(screen.getByText("Code Review")).toBeInTheDocument();
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
