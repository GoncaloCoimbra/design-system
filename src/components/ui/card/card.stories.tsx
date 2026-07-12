import type { Meta, StoryObj } from "@storybook/react";
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
import { Button } from "../button/button";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Card content area.</p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button size="sm">Save</Button>
      </CardFooter>
    </Card>
  ),
};

const ClockIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 12h5" />
    <path d="M15 12h5" />
    <circle cx="12" cy="12" r="4" />
    <circle className="card-icon-dot" cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
  </svg>
);

const ReviewIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 8h9" />
    <path d="M4 8v10a2 2 0 002 2h10a2 2 0 002-2V8" />
    <path d="M4 8L9 3h6l5 5" />
    <path stroke="#22C55E" d="M8 14h8" />
    <path stroke="#22C55E" d="M8 17.5h5" />
    <circle
      className="card-icon-dot"
      cx="17.2"
      cy="6.6"
      r="1.4"
      fill="currentColor"
      stroke="none"
    />
  </svg>
);

const TeamIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 3v11" />
    <path d="M6 14a3 3 0 003 3h3" />
    <circle cx="6" cy="19" r="2.2" />
    <circle cx="6" cy="6" r="2.2" />
    <circle cx="15" cy="19" r="2.2" />
    <path d="M15 16.5v-9" />
    <circle className="card-icon-dot" cx="15" cy="7" r="1.4" fill="currentColor" stroke="none" />
  </svg>
);

export const IconFeatureHorizontal: Story = {
  render: () => (
    <div className="flex gap-4 bg-background p-6">
      <CardIconFeature
        className="flex-1 text-blue-400"
        icon={<ClockIcon />}
        title="Sessões Semanais ao Vivo"
        description="Chamadas regulares onde apresentas o que estás a construir e recebes feedback em tempo real."
        category="Ao Vivo"
      />
      <CardIconFeature
        className="flex-1 text-blue-400"
        icon={<ReviewIcon />}
        title="Revisões de código de quem já ships"
        description="Submetes o teu trabalho e recebes análise específica de profissionais com experiência real."
        category="Code Review"
      />
      <CardIconFeature
        className="flex-1 text-blue-400"
        icon={<TeamIcon />}
        title="Projetos com gente a depender de ti"
        description="Deadlines, dependências, standup que cobra. O ambiente mais próximo de uma equipa real."
        category="Colaborativo"
      />
    </div>
  ),
};

export const NumberedVertical: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-8 bg-background p-6 md:grid-cols-3">
      <CardNumbered
        number="01"
        title="Sessões Semanais ao Vivo"
        description="Chamadas regulares onde apresentas o que estás a construir e recebes feedback em tempo real."
        category="Ao Vivo"
      />
      <CardNumbered
        number="02"
        title="Revisões de código de quem já ships"
        description="Submetes o teu trabalho e recebes análise específica de profissionais com experiência real no mercado."
        category="Code Review"
      />
      <CardNumbered
        number="03"
        title="Projetos com gente a depender de ti"
        description="Deadlines, dependências, standup que cobra. O ambiente mais próximo de uma equipa real antes de estares numa."
        category="Colaborativo"
      />
    </div>
  ),
};

/** Reproduz o layout "V2 — Editorial": número à esquerda, empilhado, com separadores. */
export const V2Editorial: Story = {
  render: () => (
    <div className="max-w-[520px] bg-background p-6">
      <div className="mb-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground/70">
        Feature Cards
      </div>
      <h2 className="mb-2 text-xl font-semibold text-foreground">V2 — Editorial</h2>
      <CardNumberedRow
        number="01"
        title="Sessões Semanais ao Vivo"
        description="Chamadas regulares onde apresentas o que estás a construir e recebes feedback em tempo real."
        category="Ao Vivo"
      />
      <CardNumberedRow
        number="02"
        title="Revisões de código de quem já ships"
        description="Submetes o teu trabalho e recebes análise específica de profissionais com experiência real no mercado."
        category="Code Review"
      />
      <CardNumberedRow
        number="03"
        title="Projetos com gente a depender de ti"
        description="Deadlines, dependências, standup que cobra. O ambiente mais próximo de uma equipa real antes de estares numa."
        category="Colaborativo"
      />
    </div>
  ),
};
