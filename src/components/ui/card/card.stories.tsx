import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";

/* ------------------------------------------------------------------ */
/* Meta                                                                 */
/* ------------------------------------------------------------------ */

const meta: Meta<typeof Card> = {
  title: "Base Components/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    className: {
      description: "Classes Tailwind adicionais aplicadas ao elemento raiz do Card.",
      table: { defaultValue: { summary: "undefined" } },
      control: "text",
    },
    children: {
      description: "Conteúdo do card — tipicamente `CardHeader`, `CardContent` e `CardFooter`.",
      table: { defaultValue: { summary: "undefined" } },
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
O **Card** é o container base para conteúdo estruturado. Compõe-se com os sub-componentes de layout para criar cartões com cabeçalho, corpo e área de ações.

## Componentes

| Componente          | Uso                                                              |
|---------------------|------------------------------------------------------------------|
| \`Card\`              | Container base com borda e fundo. Aceita qualquer children.      |
| \`CardHeader\`        | Área de cabeçalho — padding padrão \`p-6\`.                       |
| \`CardTitle\`         | Título principal do card (\`text-base\`, semibold).               |
| \`CardDescription\`   | Subtítulo ou descrição (\`text-sm\`, muted).                      |
| \`CardContent\`       | Corpo principal — padding \`p-6 pt-0\`.                           |
| \`CardFooter\`        | Área de ações — flex row com gap e padding consistentes.          |

## Acessibilidade

- O \`Card\` é um elemento \`div\` — adiciona \`role\` e \`aria-label\` conforme o contexto de uso.
- Botões dentro de \`CardFooter\` devem ter texto descritivo ou \`aria-label\`.

## Tokens de design

| Token                      | Onde é aplicado          |
|----------------------------|--------------------------|
| \`--color-border\`           | Borda do \`Card\`          |
| \`--color-card\`             | Fundo do \`Card\`          |
| \`--color-muted-foreground\` | Texto de \`CardDescription\` |
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

/* ------------------------------------------------------------------ */
/* Stories                                                              */
/* ------------------------------------------------------------------ */

export const Playground: Story = {
  render: (args) => (
    <Card className="w-[350px]" {...args}>
      <CardHeader>
        <CardTitle>Publica o teu primeiro projeto</CardTitle>
        <CardDescription>
          Partilha o que estás a construir com a comunidade commitpt.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Adiciona uma descrição, screenshots e o link do repositório para que outros possam
          explorar o teu trabalho.
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" size="sm">
          Guardar rascunho
        </Button>
        <Button size="sm">Publicar</Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Usa este playground para experimentar as props do `Card` base com os controlos do Storybook. O conteúdo interno é composto por `CardHeader`, `CardContent` e `CardFooter` — os building blocks mais comuns.",
      },
    },
  },
};

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Publica o teu primeiro projeto</CardTitle>
        <CardDescription>
          Partilha o que estás a construir com a comunidade commitpt.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Adiciona uma descrição, screenshots e o link do repositório.
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" size="sm">
          Guardar rascunho
        </Button>
        <Button size="sm">Publicar</Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "O `Card` base com todos os sub-componentes de layout: `CardHeader`, `CardTitle`, `CardDescription`, `CardContent` e `CardFooter`. Usa este padrão para qualquer conteúdo estruturado com cabeçalho e ações — formulários, resumos, detalhes de perfil.",
      },
    },
  },
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
