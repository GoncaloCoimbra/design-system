import type { Meta, StoryObj } from "@storybook/react";
import { ReviewCard } from "./review-card";

// ─── Data ─────────────────────────────────────────────────────────────────────

const REVIEWS = [
  {
    name: "Ana Kovač",
    memberSince: "Membro desde Jan 2023",
    review:
      "As sessões semanais ao vivo mudaram completamente a minha forma de trabalhar. O feedback em tempo real de profissionais experientes vale muito mais do que qualquer curso gravado.",
    rating: 5,
    reviewDate: "14 Jan 2025",
  },
  {
    name: "Bruno Moisão",
    memberSince: "Membro desde Mar 2024",
    review:
      "As code reviews detalhadas ajudaram-me a perceber padrões que eu repetia sem dar conta. Em dois meses o meu código ficou visivelmente mais limpo.",
    rating: 5,
    reviewDate: "2 Fev 2025",
  },
  {
    name: "Mariana Ferreira",
    memberSince: "Membro desde Out 2023",
    review:
      "Gosto muito da componente colaborativa. Ter prazos reais e pessoas a depender do meu trabalho forçou-me a sair da zona de conforto de uma forma que o estudo individual nunca conseguiu.",
    rating: 4,
    reviewDate: "28 Jan 2025",
  },
];

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof ReviewCard> = {
  title: "Base Components/Review Card",
  component: ReviewCard,
  tags: ["autodocs"],
  argTypes: {
    avatarSrc: {
      description:
        "URL da foto de perfil do reviewer. Quando omitida, o Avatar mostra as iniciais derivadas do `name`.",
      table: { defaultValue: { summary: "undefined" } },
      control: "text",
    },
    name: {
      description: "Nome completo do reviewer. Usado no cabeçalho e para gerar as iniciais.",
      table: { defaultValue: { summary: "—" } },
      control: "text",
    },
    memberSince: {
      description:
        'Data de adesão à plataforma, já formatada pelo caller (ex: "Membro desde Jan 2023").',
      table: { defaultValue: { summary: "—" } },
      control: "text",
    },
    review: {
      description:
        "Texto da review. Recomenda-se entre 1 e 4 linhas para manter a coerência visual numa grelha.",
      table: { defaultValue: { summary: "—" } },
      control: "text",
    },
    rating: {
      description:
        "Classificação de 1 a 5 estrelas. Valores fora do intervalo são fixados automaticamente.",
      table: { defaultValue: { summary: "5" } },
      control: { type: "range", min: 1, max: 5, step: 1 },
    },
    reviewDate: {
      description: 'Data de publicação da review, já formatada pelo caller (ex: "14 Jan 2025").',
      table: { defaultValue: { summary: "—" } },
      control: "text",
    },
    className: {
      description: "Classes Tailwind adicionais aplicadas ao Card raiz.",
      table: { defaultValue: { summary: "undefined" } },
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
O **ReviewCard** apresenta a avaliação de um utilizador de forma estruturada e consistente.
Compõe-se com o \`Card\` base e o \`Avatar\` do design system.

## Anatomia

| Zona    | Conteúdo                                                     |
|---------|--------------------------------------------------------------|
| Header  | Avatar (foto ou iniciais automáticas) + nome + data de adesão |
| Content | Texto da review                                              |
| Footer  | Estrelas (rating / 5) + data da review                       |

## Acessibilidade

- As estrelas têm \`role="img"\` e \`aria-label="N de 5 estrelas"\`.
- O \`Avatar\` recebe o \`name\` como \`alt\` da imagem automaticamente.
- Não são usados elementos de decoração sem alternativa textual.

## Tokens de design

| Token                      | Onde é aplicado                        |
|----------------------------|----------------------------------------|
| \`--color-card\`             | Fundo do card                          |
| \`--color-border\`           | Borda do card                          |
| \`--color-primary-500\`      | Estrelas preenchidas                   |
| \`--color-muted-foreground\` | Texto de suporte e estrelas vazias     |
| \`--icon-xs\`                | Tamanho das estrelas (16px)            |
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ReviewCard>;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    name: "Ana Kovač",
    memberSince: "Membro desde Jan 2023",
    review:
      "As sessões semanais ao vivo mudaram completamente a minha forma de trabalhar. O feedback em tempo real de profissionais experientes vale muito mais do que qualquer curso gravado.",
    rating: 5,
    reviewDate: "14 Jan 2025",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Usa os controlos do Storybook para experimentar todas as props. Experimenta mudar o `rating`, remover o `avatarSrc` para ver o fallback com iniciais, ou encurtar o texto da review.",
      },
    },
  },
};

export const WithAvatar: Story = {
  args: {
    avatarSrc: "https://i.pravatar.cc/150?img=47",
    name: "Ana Kovač",
    memberSince: "Membro desde Jan 2023",
    review:
      "As sessões semanais ao vivo mudaram completamente a minha forma de trabalhar. O feedback em tempo real de profissionais experientes vale muito mais do que qualquer curso gravado.",
    rating: 5,
    reviewDate: "14 Jan 2025",
  },
  parameters: {
    docs: {
      description: {
        story:
          'Quando `avatarSrc` é fornecido, o Avatar mostra a foto de perfil. A imagem é circular e ocupa 36×36px (`size="default"`). Usa sempre uma URL estável — evita URLs temporárias em produção.',
      },
    },
  },
};

export const WithoutAvatar: Story = {
  args: {
    name: "Bruno Moisão",
    memberSince: "Membro desde Mar 2024",
    review:
      "As code reviews detalhadas ajudaram-me a perceber padrões que eu repetia sem dar conta. Em dois meses o meu código ficou visivelmente mais limpo.",
    rating: 5,
    reviewDate: "2 Fev 2025",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Quando `avatarSrc` é omitido, o Avatar mostra automaticamente as iniciais derivadas do `name` (primeira letra do primeiro e do último nome). Usa este padrão quando a foto de perfil não está disponível.",
      },
    },
  },
};

export const WithTitle: Story = {
  args: {
    name: "Ana Kovač",
    memberSince: "Membro desde Jan 2023",
    title: "A melhor decisão que tomei este ano",
    review:
      "As sessões semanais ao vivo mudaram completamente a minha forma de trabalhar. O feedback em tempo real de profissionais experientes vale muito mais do que qualquer curso gravado.",
    rating: 5,
    reviewDate: "14 Jan 2025",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Quando `title` é fornecido, aparece a branco e em destaque por cima do texto da review. Usa um título curto e impactante — idealmente uma frase que resume o sentimento do reviewer. A descrição fica em `text-gray-400` para criar hierarquia visual.",
      },
    },
  },
};

export const Ratings: Story = {
  render: () => (
    <div className="flex flex-col gap-4 bg-background p-6">
      {([5, 4, 3, 2, 1] as const).map((rating) => (
        <ReviewCard
          key={rating}
          name={REVIEWS[0].name}
          memberSince={REVIEWS[0].memberSince}
          review={REVIEWS[0].review}
          rating={rating}
          reviewDate={REVIEWS[0].reviewDate}
          className="max-w-sm"
        />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Todas as classificações possíveis de 1 a 5 estrelas. As estrelas preenchidas usam `--color-primary-500`; as vazias `--color-muted-foreground/30`. O `rating` é fixado automaticamente a inteiros e ao intervalo [1, 5].",
      },
    },
  },
};

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 bg-background p-6 md:grid-cols-3">
      {REVIEWS.map((r) => (
        <ReviewCard key={r.name} {...r} />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Grelha de 3 colunas — o padrão mais comum em secções de testemunhos em landing pages. O ReviewCard usa `flex-col` e `flex-1` no conteúdo para que todos os cards da linha tenham a mesma altura quando colocados num `items-stretch` grid.",
      },
    },
  },
};
