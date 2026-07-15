import type { Meta, StoryObj } from "@storybook/react";
import { Code2, GitBranch, Layers, Rocket, ShieldAlert, ShieldCheck, Zap } from "lucide-react";
import { FeatureCard } from "./feature-card";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PRIMARY_FEATURES = [
  {
    icon: <Zap className="icon" />,
    title: "Deploy em segundos",
    description: "Liga o repositório e publica automaticamente em cada push para main.",
  },
  {
    icon: <Code2 className="icon" />,
    title: "Code Reviews detalhadas",
    description: "Recebe análise do teu código por profissionais com experiência real.",
  },
  {
    icon: <GitBranch className="icon" />,
    title: "Histórico de commits",
    description: "Acompanha a evolução do trabalho com métricas claras e accionáveis.",
  },
];

const SECONDARY_FEATURES = [
  {
    icon: <Layers className="icon" />,
    title: "Integrações nativas",
    description: "Liga ao GitHub, GitLab e Bitbucket em menos de cinco minutos.",
  },
  {
    icon: <Rocket className="icon" />,
    title: "Onboarding guiado",
    description: "Do zero ao primeiro deploy em menos de um dia com suporte da comunidade.",
  },
  {
    icon: <ShieldCheck className="icon" />,
    title: "Segurança por defeito",
    description: "Análise automática de vulnerabilidades em cada pull request.",
  },
];

const DESTRUCTIVE_FEATURES = [
  {
    icon: <ShieldAlert className="icon" />,
    title: "Limite atingido",
    description: "Atingiste o número máximo de repositórios no plano gratuito.",
  },
  {
    icon: <ShieldAlert className="icon" />,
    title: "Token expirado",
    description: "O teu token de acesso expirou. Gera um novo para continuar.",
  },
  {
    icon: <ShieldAlert className="icon" />,
    title: "Acesso revogado",
    description: "As permissões do teu repositório foram alteradas. Reconnecta a integração.",
  },
];

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof FeatureCard> = {
  title: "Base Components/Feature Card",
  component: FeatureCard,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description:
        "Controla o fundo, a borda com gradiente e a cor padrão do ícone. `primary` é o padrão para a maioria dos casos.",
      control: "select",
      options: ["primary", "secondary", "destructive"],
      table: { defaultValue: { summary: "primary" } },
    },
    icon: {
      description:
        "Ícone exibido no canto superior esquerdo. Usa sempre a classe `.icon` (`--icon-md`, 24px). A cor é herdada da variante mas pode ser sobreposta.",
      table: { defaultValue: { summary: "—" } },
      control: false,
    },
    title: {
      description: "Título da funcionalidade. Mantém curto — idealmente 2 a 5 palavras.",
      table: { defaultValue: { summary: "—" } },
      control: "text",
    },
    description: {
      description: "Descrição. Recomenda-se 1 a 3 linhas para coerência numa grelha.",
      table: { defaultValue: { summary: "—" } },
      control: "text",
    },
    className: {
      description: "Classes Tailwind adicionais aplicadas ao elemento raiz.",
      table: { defaultValue: { summary: "undefined" } },
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
O **FeatureCard** apresenta uma funcionalidade ou benefício com ícone, título e descrição.
Disponível em três variantes com fundo sólido distinto, borda com gradiente e hover animado.

## Variantes

| Variant       | Fundo             | Borda                         | Quando usar                              |
|---------------|-------------------|-------------------------------|------------------------------------------|
| \`primary\`     | \`primary-900\`     | \`--border-gradient-primary\`   | Features principais, benefícios gerais   |
| \`secondary\`   | \`secondary-900\`   | \`--border-gradient-secondary\` | Features premium ou de destaque especial |
| \`destructive\` | Dark red          | \`destructive → dark red\`      | Avisos, limites, acções de risco         |

## Hover

Todas as variantes têm \`hover:-translate-y-1\` + \`hover:shadow-xl\` — lift subtil de 4px com sombra reforçada.
A transição é \`ease-out 200ms\`, abaixo do limiar de sensibilidade ao movimento.

## Tamanho do ícone

Usa sempre a classe \`.icon\` (\`--icon-md\`, 24px, documentado no Brand Identity). A cor do ícone
é herdada da variante via \`[&_svg]:text-*\` e pode ser sobreposta passando uma classe de cor no ícone.

## Acessibilidade

- O ícone é envolto em \`aria-hidden="true"\` pois é decorativo.
- Se o card for clicável, envolve-o num \`<button>\` ou \`<a>\` com \`aria-label\`.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FeatureCard>;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    variant: "primary",
    icon: <Zap className="icon" />,
    title: "Deploy em segundos",
    description: "Liga o repositório e publica automaticamente em cada push para main.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Usa os controlos para experimentar as três variantes. O ícone herda a cor da variante automaticamente — não precisas de passar classe de cor.",
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 bg-background p-6 sm:flex-row">
      <FeatureCard
        variant="primary"
        className="flex-1"
        icon={<Zap className="icon" />}
        title="Deploy em segundos"
        description="Liga o repositório e publica automaticamente em cada push para main."
      />
      <FeatureCard
        variant="secondary"
        className="flex-1"
        icon={<Rocket className="icon" />}
        title="Acesso premium"
        description="Desbloqueia todas as funcionalidades avançadas da plataforma."
      />
      <FeatureCard
        variant="destructive"
        className="flex-1"
        icon={<ShieldAlert className="icon" />}
        title="Limite atingido"
        description="Atingiste o número máximo de repositórios no plano gratuito."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
As três variantes lado a lado. Cada uma tem fundo, borda e cor de ícone próprios:

- **\`primary\`** — \`primary-900\` + borda azul. Padrão para a maioria das features.
- **\`secondary\`** — \`secondary-900\` + borda roxa. Para destaque premium.
- **\`destructive\`** — fundo dark red + borda vermelha. Reserva para avisos e limitações.

Passa o rato sobre cada card para ver o hover: lift de 4px + shadow reforçada.
        `,
      },
    },
  },
};

export const PrimaryGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 bg-background p-6 sm:grid-cols-3">
      {PRIMARY_FEATURES.map((f) => (
        <FeatureCard key={f.title} variant="primary" {...f} />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Grelha de 3 colunas em `variant="primary"` — o layout mais comum para secções de features em landing pages.',
      },
    },
  },
};

export const SecondaryGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 bg-background p-6 sm:grid-cols-3">
      {SECONDARY_FEATURES.map((f) => (
        <FeatureCard key={f.title} variant="secondary" {...f} />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Grelha em `variant="secondary"` — usa para secções de funcionalidades premium ou de maior peso visual.',
      },
    },
  },
};

export const DestructiveGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 bg-background p-6 sm:grid-cols-3">
      {DESTRUCTIVE_FEATURES.map((f) => (
        <FeatureCard key={f.title} variant="destructive" {...f} />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Grelha em `variant="destructive"` — usa para comunicar limites, erros de configuração ou avisos de segurança. Não uses para features normais.',
      },
    },
  },
};

export const MixedGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 bg-background p-6 sm:grid-cols-3">
      {PRIMARY_FEATURES.map((f) => (
        <FeatureCard key={f.title} variant="primary" {...f} />
      ))}
      {SECONDARY_FEATURES.slice(0, 3).map((f) => (
        <FeatureCard key={f.title} variant="secondary" {...f} />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Mistura de `primary` e `secondary` na mesma grelha — cria hierarquia visual entre features base e premium. Evita misturar `destructive` com as outras variantes no mesmo bloco.",
      },
    },
  },
};
