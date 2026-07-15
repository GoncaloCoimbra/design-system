import type { Meta, StoryObj } from "@storybook/react";
import {
  AlertCircle,
  CheckCircle,
  Circle,
  Clock,
  Crown,
  GitBranch,
  GitPullRequest,
  ShieldAlert,
  Star,
  Zap,
} from "lucide-react";
import * as React from "react";

import { Badge } from "./badge";

// ─── Layout helpers ──────────────────────────────────────────────────────────

function Row({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex flex-wrap items-center gap-3 ${className ?? ""}`}>{children}</div>;
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-4">{children}</div>;
}

function LabeledRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-6">
      <span className="w-28 shrink-0 font-mono text-xs text-muted-foreground">{label}</span>
      <Row>{children}</Row>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const ALL_VARIANTS = ["primary", "secondary", "outline", "destructive"] as const;

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: "Base Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
O \`Badge\` é um elemento inline de classificação, estado ou etiqueta. Suporta ícone
à esquerda ou à direita passado como \`children\`, e está disponível em quatro variantes.

---

### Variantes

| Variant       | Fundo                           | Texto           | Quando usar                              |
|---------------|---------------------------------|-----------------|------------------------------------------|
| \`primary\`     | \`primary-900 → 800\` (gradient)  | \`primary-400\`   | Estado activo, categorias, tags normais  |
| \`secondary\`   | \`secondary-900 → 800\` (gradient) | \`secondary-400\`| Badges premium, papéis especiais         |
| \`outline\`     | Transparente                    | \`foreground\`    | Neutros, filtros, etiquetas sem destaque |
| \`destructive\` | \`destructive/10\`               | \`destructive\`   | Erros, avisos, estados críticos          |

---

### Ícones

Os ícones são passados como \`children\` e dimensionados automaticamente a **12px** (\`--icon-xxs\` —
escala micro adequada ao contexto denso do badge). Coloca o ícone antes
ou depois do texto conforme o significado semântico.

---

### Acessibilidade

- O badge é um \`div\` — não é interactivo por defeito. Se for clicável, usa \`role="button"\` e \`tabIndex={0}\`.
- Ícones decorativos dentro do badge devem ter \`aria-hidden="true"\` quando o texto já comunica o estado.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description:
        "Controla o fundo, a cor do texto e da borda. Escolhe com base no significado semântico, não na estética.",
      control: "select",
      options: ["primary", "secondary", "outline", "destructive"],
      table: { defaultValue: { summary: "primary" } },
    },
    children: {
      description:
        "Conteúdo do badge — texto, ícone, ou ambos. Ícones passados como children são dimensionados automaticamente a 12px (`--icon-xxs`).",
      control: "text",
    },
    className: {
      description: "Classes Tailwind adicionais aplicadas ao elemento raiz.",
      table: { defaultValue: { summary: "undefined" } },
      control: false,
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    children: "Novo",
    variant: "primary",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Usa o painel de **Controls** para explorar as variantes e editar o texto. Para testar ícones, usa as stories dedicadas abaixo.",
      },
    },
  },
};

// ─── Variants ─────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <Grid>
      <LabeledRow label="primary">
        <Badge variant="primary">Activo</Badge>
        <Badge variant="primary">Novo</Badge>
        <Badge variant="primary">Em destaque</Badge>
      </LabeledRow>
      <LabeledRow label="secondary">
        <Badge variant="secondary">Pro</Badge>
        <Badge variant="secondary">Premium</Badge>
        <Badge variant="secondary">Beta</Badge>
      </LabeledRow>
      <LabeledRow label="outline">
        <Badge variant="outline">Rascunho</Badge>
        <Badge variant="outline">Arquivado</Badge>
        <Badge variant="outline">Todos</Badge>
      </LabeledRow>
      <LabeledRow label="destructive">
        <Badge variant="destructive">Erro</Badge>
        <Badge variant="destructive">Expirado</Badge>
        <Badge variant="destructive">Bloqueado</Badge>
      </LabeledRow>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Escolhe a variante com base no **significado semântico**, não na cor preferida.

- **\`primary\`** — estado normal activo, categorias, funcionalidades em uso.
- **\`secondary\`** — destaque especial, planos pagos, papéis elevados. Usa com moderação.
- **\`outline\`** — neutro, sem cor de fundo. Ideal para filtros, estados inactivos ou etiquetas que não devem competir com o conteúdo principal.
- **\`destructive\`** — erros, avisos críticos, acessos revogados. Nunca uses para informação positiva.
        `,
      },
    },
  },
};

// ─── Icon Left ────────────────────────────────────────────────────────────────

export const IconLeft: Story = {
  render: () => (
    <Grid>
      {ALL_VARIANTS.map((variant) => (
        <LabeledRow key={variant} label={variant}>
          <Badge variant={variant}>
            <CheckCircle aria-hidden="true" />
            Activo
          </Badge>
          <Badge variant={variant}>
            <Zap aria-hidden="true" />
            Em destaque
          </Badge>
          <Badge variant={variant}>
            <Star aria-hidden="true" />
            Premium
          </Badge>
          <Badge variant={variant}>
            <Circle aria-hidden="true" />
            Pendente
          </Badge>
        </LabeledRow>
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Um ícone à **esquerda** reforça o significado antes de o utilizador ler o texto —
ideal quando o ícone elimina ambiguidade (\`<CheckCircle /> Activo\`, \`<AlertCircle /> Erro\`).

Os ícones são decorativos — usa \`aria-hidden="true"\` para evitar anúncios redundantes
por leitores de ecrã quando o texto já comunica o estado.
        `,
      },
    },
  },
};

// ─── Icon Right ───────────────────────────────────────────────────────────────

export const IconRight: Story = {
  render: () => (
    <Grid>
      {ALL_VARIANTS.map((variant) => (
        <LabeledRow key={variant} label={variant}>
          <Badge variant={variant}>
            Em revisão
            <Clock aria-hidden="true" />
          </Badge>
          <Badge variant={variant}>
            Pull Request
            <GitPullRequest aria-hidden="true" />
          </Badge>
          <Badge variant={variant}>
            Branch
            <GitBranch aria-hidden="true" />
          </Badge>
        </LabeledRow>
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Um ícone à **direita** indica contexto ou tipo — útil quando o ícone qualifica
o texto em vez de o reforçar (\`Em revisão <Clock />\`, \`Pull Request <GitPullRequest />\`).

Evita ícones de acção à direita (ex: \`<X />\`, \`<ChevronDown />\`) — esses pertencem
a componentes interactivos como \`Button\` ou \`Select\`, não a badges estáticos.
        `,
      },
    },
  },
};

// ─── Real World Examples ──────────────────────────────────────────────────────

export const RealWorldExamples: Story = {
  render: () => (
    <Grid>
      <div>
        <p className="mb-3 font-mono text-xs text-muted-foreground">Estado de pipeline</p>
        <Row>
          <Badge variant="primary">
            <CheckCircle aria-hidden="true" />
            Passed
          </Badge>
          <Badge variant="destructive">
            <AlertCircle aria-hidden="true" />
            Failed
          </Badge>
          <Badge variant="outline">
            <Clock aria-hidden="true" />
            Pending
          </Badge>
        </Row>
      </div>

      <div>
        <p className="mb-3 font-mono text-xs text-muted-foreground">Plano do utilizador</p>
        <Row>
          <Badge variant="outline">Free</Badge>
          <Badge variant="primary">Pro</Badge>
          <Badge variant="secondary">
            <Crown aria-hidden="true" />
            Enterprise
          </Badge>
        </Row>
      </div>

      <div>
        <p className="mb-3 font-mono text-xs text-muted-foreground">Estado de pull request</p>
        <Row>
          <Badge variant="primary">
            <GitPullRequest aria-hidden="true" />
            Open
          </Badge>
          <Badge variant="secondary">
            <CheckCircle aria-hidden="true" />
            Merged
          </Badge>
          <Badge variant="destructive">
            <ShieldAlert aria-hidden="true" />
            Blocked
          </Badge>
          <Badge variant="outline">
            <Clock aria-hidden="true" />
            Draft
          </Badge>
        </Row>
      </div>

      <div>
        <p className="mb-3 font-mono text-xs text-muted-foreground">Etiquetas de funcionalidade</p>
        <Row>
          <Badge variant="primary">Novo</Badge>
          <Badge variant="secondary">Beta</Badge>
          <Badge variant="outline">Em breve</Badge>
          <Badge variant="destructive">Descontinuado</Badge>
        </Row>
      </div>

      <div>
        <p className="mb-3 font-mono text-xs text-muted-foreground">Estado de acesso</p>
        <Row>
          <Badge variant="primary">
            <CheckCircle aria-hidden="true" />
            Activo
          </Badge>
          <Badge variant="destructive">
            <AlertCircle aria-hidden="true" />
            Expirado
          </Badge>
          <Badge variant="outline">Convidado</Badge>
        </Row>
      </div>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Padrões concretos de uso real. O badge raramente aparece isolado — aparece ao lado de
um nome, num cabeçalho de tabela, ou inline com texto.

Nota como a variante muda o tom da comunicação:
- \`primary\` transmite normalidade e actividade.
- \`secondary\` transmite exclusividade ou destaque especial.
- \`outline\` recua para o fundo sem competir com conteúdo principal.
- \`destructive\` chama atenção imediata — reserva para estados que requerem acção.
        `,
      },
    },
  },
};
