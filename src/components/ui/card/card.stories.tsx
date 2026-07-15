import type { Meta, StoryObj } from "@storybook/react";
import { Clock, Code2, Users2 } from "lucide-react";
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

export const IconFeatureHorizontal: Story = {
  render: () => (
    <div className="flex gap-4 bg-background p-6">
      <CardIconFeature
        className="flex-1 text-blue-400"
        icon={<Clock className="h-5 w-5" />}
        title="Sessões Semanais ao Vivo"
        description="Chamadas regulares onde apresentas o que estás a construir e recebes feedback em tempo real."
        category="Ao Vivo"
      />
      <CardIconFeature
        className="flex-1 text-blue-400"
        icon={<Code2 className="h-5 w-5" />}
        title="Revisões de código de quem já ships"
        description="Submetes o teu trabalho e recebes análise específica de profissionais com experiência real."
        category="Code Review"
      />
      <CardIconFeature
        className="flex-1 text-blue-400"
        icon={<Users2 className="h-5 w-5" />}
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

export const TruncatedDescription: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card com texto longo</CardTitle>
        <CardDescription truncate maxLines={7}>
          Esta é uma descrição propositadamente longa para testar o comportamento de truncagem. Deve
          mostrar no máximo sete linhas de texto e depois apresentar a opção "ler mais" a azul, com
          sublinhado no hover e cursor pointer. Ao clicar, o texto completo deve aparecer e o botão
          deve mudar para "ler menos", permitindo voltar ao estado truncado. Este parágrafo tem de
          ser suficientemente extenso para garantir que ultrapassa as sete linhas dentro de um card
          com 350px de largura, para validar corretamente o comportamento do ResizeObserver e da
          medição de altura real do texto no DOM.
        </CardDescription>
      </CardHeader>
    </Card>
  ),
};

export const ShortDescriptionNoTruncate: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card com texto curto</CardTitle>
        <CardDescription truncate maxLines={7}>
          Texto curto que não deve mostrar o botão "ler mais".
        </CardDescription>
      </CardHeader>
    </Card>
  ),
};
