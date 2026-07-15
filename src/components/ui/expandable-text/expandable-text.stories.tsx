import type { Meta, StoryObj } from "@storybook/react";
import { ExpandableText } from "./expandable-text";

const LONG_REVIEW =
  "Entrei na comunidade em novembro de 2025 e, desde o primeiro dia, senti um ambiente acolhedor e sem julgamentos. Aqui conheci pessoas da área, fiz networking e participei em projetos e desafios que me ajudaram a aprofundar os meus conhecimentos em programação e regras de negócio. O apoio dos membros e as calls da comunidade tiveram um impacto real no meu crescimento académico e profissional.";

const SHORT_REVIEW = "Comunidade incrível, recomendo a todos.";

const meta: Meta<typeof ExpandableText> = {
  title: "Base Components/Expandable Text",
  component: ExpandableText,
  tags: ["autodocs"],
  argTypes: {
    text: {
      description: "Texto a exibir. Linhas além do limite configurado são escondidas até expandir.",
      control: "text",
    },
    lines: {
      description: "Número de linhas visíveis quando recolhido (1–6).",
      table: { defaultValue: { summary: "3" } },
      control: { type: "range", min: 1, max: 6, step: 1 },
    },
    expandLabel: {
      description: 'Label do botão "expandir".',
      table: { defaultValue: { summary: "Ver mais" } },
      control: "text",
    },
    collapseLabel: {
      description: 'Label do botão "recolher".',
      table: { defaultValue: { summary: "Ver menos" } },
      control: "text",
    },
    className: {
      description: "Classes Tailwind adicionais aplicadas ao wrapper.",
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
O **ExpandableText** exibe texto truncado com um botão "Ver mais / Ver menos". Ideal para
reviews ou descrições longas em cards onde o espaço vertical é limitado.

## Anatomia

| Elemento | Descrição                                     |
|----------|-----------------------------------------------|
| Texto    | Parágrafo com \`line-clamp\` configurável      |
| Botão    | "Ver mais" / "Ver menos" com ícone ChevronDown |

## Acessibilidade

- O botão usa \`aria-expanded\` para comunicar o estado a leitores de ecrã.
- O ícone \`ChevronDown\` roda 180° quando expandido como dica visual adicional.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ExpandableText>;

export const Playground: Story = {
  args: {
    text: LONG_REVIEW,
    lines: 3,
  },
};

export const ShortText: Story = {
  args: {
    text: SHORT_REVIEW,
    lines: 3,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Quando o texto cabe no número de linhas configurado, o botão não aparece porque não há overflow. O componente deteta automaticamente esta condição via `line-clamp`.",
      },
    },
  },
};

export const SingleLine: Story = {
  args: {
    text: LONG_REVIEW,
    lines: 1,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Com `lines={1}` o texto é truncado a uma única linha. Útil para previews compactos em listas ou tabelas.",
      },
    },
  },
};

export const CustomLabels: Story = {
  args: {
    text: LONG_REVIEW,
    lines: 2,
    expandLabel: "Expandir",
    collapseLabel: "Recolher",
  },
  parameters: {
    docs: {
      description: {
        story:
          'As labels dos botões são totalmente customizáveis via `expandLabel` e `collapseLabel`. Útil para internacionalização ou contextos onde "Ver mais" não se adequa.',
      },
    },
  },
};
