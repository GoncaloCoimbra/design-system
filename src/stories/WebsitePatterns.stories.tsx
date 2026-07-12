import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ArrowRight, BadgeCheck, Code2, MessageCircleHeart, Sparkles, Users } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar/avatar";
import { Button } from "../components/ui/button/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card/card";
import { Typography } from "../components/ui/typography/typography";
import commitIcon from "@/assets/commit_icon.png";

const meta = {
  title: "Brand Identity/Website Patterns",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A set of polished website patterns inspired by the CommitPT experience: hero, value proposition, testimonials, founder spotlight, and CTA sections.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function SectionShell({ children }: { children: React.ReactNode }) {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-16 sm:px-10 lg:px-12">
      {children}
    </section>
  );
}

export const HeroSection: Story = {
  render: () => (
    <SectionShell>
      <div className="grid items-center gap-10 rounded-3xl border border-border/70 bg-surface/70 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)] lg:grid-cols-[1.2fr_0.8fr] lg:p-12">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            CommitPT
          </div>
          <Typography variant="h1" as="h1" className="max-w-3xl text-4xl sm:text-5xl lg:text-6xl">
            A comunidade que transforma programadores em engenheiros de topo.
          </Typography>
          <Typography variant="lead" className="max-w-2xl text-lg text-muted-foreground">
            Crescer como engenheiro é difícil. Sozinho, é quase impossível.
          </Typography>
          <div className="flex flex-wrap gap-3">
            <Button size="lg">Adere já</Button>
            <Button variant="outline" size="lg">
              Experimenta o Discord grátis
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-6 border-t border-border/60 pt-4 text-sm text-muted-foreground">
            <div>
              <div className="font-semibold text-foreground">300+</div>
              <div>programadores já dentro</div>
            </div>
            <div>
              <div className="font-semibold text-foreground">25+</div>
              <div>profissionais da área</div>
            </div>
            <div>
              <div className="font-semibold text-foreground">4x / mês</div>
              <div>sessões ao vivo</div>
            </div>
          </div>
        </div>

        <Card className="border-primary/20 bg-background/70 p-0">
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center gap-3">
              <Avatar variant="primary" size="lg">
                <AvatarImage src={commitIcon} alt="CommitPT community" />
                <AvatarFallback>CP</AvatarFallback>
              </Avatar>
              <div>
                <Typography variant="h6" as="h3">
                  Build in public
                </Typography>
                <Typography variant="caption">Feedback real, decisões mais fortes</Typography>
              </div>
            </div>
            <div className="space-y-3 rounded-2xl border border-border/70 bg-surface p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <BadgeCheck className="h-4 w-4 text-primary" />
                Check-ins semanais e projetos colaborativos
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Code2 className="h-4 w-4 text-primary" />
                Revisões de código e arquitectura
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Users className="h-4 w-4 text-primary" />
                Discussões técnicas e de carreira
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SectionShell>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Use this layout when the product needs a strong first impression: a clear headline, supporting proof, two strong calls to action, and a visual anchor that reinforces the promise.",
      },
    },
  },
};

export const FeatureListSection: Story = {
  render: () => (
    <SectionShell>
      <div className="mb-6 max-w-2xl space-y-3">
        <Typography variant="overline">O problema</Typography>
        <Typography variant="h2" as="h2">
          Crescer como engenheiro é difícil. Sozinho, é quase impossível.
        </Typography>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {[
          {
            title: "Aprendes muito, constróis pouco",
            description:
              "Segues tutoriais, percebes os conceitos e resolves exercícios. Mas quando abres um projeto em branco, o bloqueio aparece.",
            icon: <Users className="h-6 w-6" />,
          },
          {
            title: "Sem feedback, repetes os mesmos erros",
            description:
              "Há hábitos de código que estás a cultivar há meses que nunca devias ter aprendido. Sem ninguém que os identifique, nunca saberás que existem.",
            icon: <BadgeCheck className="h-6 w-6" />,
          },
          {
            title: "Sem accountability, tudo fica para amanhã",
            description:
              "Planeias trabalhar no projeto este fim-de-semana. Surge outra coisa. Como não há ninguém a contar contigo, adiar não tem consequências.",
            icon: <Code2 className="h-6 w-6" />,
          },
          {
            title: "Projetos a meio que nunca chegam a lado nenhum",
            description:
              "A pasta de projetos está cheia. Nenhum em produção. Cada ideia nova parece mais urgente do que terminar o que já começaste.",
            icon: <MessageCircleHeart className="h-6 w-6" />,
          },
        ].map((item) => (
          <Card key={item.title} className="h-full border-border/70 bg-card">
            <CardHeader>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                {item.icon}
              </div>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </SectionShell>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "A compact feature section built from cards. It gives the website a more editorial rhythm and makes the value proposition easier to scan.",
      },
    },
  },
};

export const TestimonialSection: Story = {
  render: () => (
    <SectionShell>
      <div className="mb-6 max-w-2xl space-y-3">
        <Typography variant="overline">O que dizem os membros</Typography>
        <Typography variant="h2" as="h2">
          Engenheiros reais. Resultados reais.
        </Typography>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {[
          {
            name: "Afonso",
            role: "Estudante e contributor",
            quote:
              "Entrei para aprender, esclarecer dúvidas e sentir que estou a crescer com apoio. Tem sido uma experiência excelente.",
          },
          {
            name: "Jeovani",
            role: "Engenheiro de software",
            quote:
              "As conexões e a dinâmica da comunidade ajudaram-me a passar de aprender sozinho para construir com uma rede real.",
          },
          {
            name: "Sara",
            role: "Developer com foco em produto",
            quote:
              "A comunidade deu-me apoio, responsabilidade e um espaço para evoluir tanto tecnicamente como nas soft skills.",
          },
        ].map((item) => (
          <Card key={item.name} className="border-border/70 bg-surface/70">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar size="sm" variant="primary">
                  <AvatarImage src={commitIcon} alt={item.name} />
                  <AvatarFallback>{item.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-sm">{item.name}</CardTitle>
                  <CardDescription className="text-xs">{item.role}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Typography variant="p" className="text-sm leading-6 text-muted-foreground">
                “{item.quote}”
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionShell>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Testimonials should feel like social proof, not decoration. Keep them short, specific, and tied to outcomes that matter for the audience.",
      },
    },
  },
};

export const FounderSpotlightSection: Story = {
  render: () => (
    <SectionShell>
      <Card className="border-primary/20 bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-0">
        <CardContent className="grid gap-8 p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
          <div className="flex flex-col gap-4">
            <Avatar size="xl" variant="primary">
              <AvatarImage src={commitIcon} alt="Bruno Moisão" />
              <AvatarFallback>BM</AvatarFallback>
            </Avatar>
            <div>
              <Typography variant="h3" as="h3">
                Criado por alguém que esteve onde tu estás.
              </Typography>
              <Typography variant="p" className="mt-2 text-muted-foreground">
                Bruno Moisão criou a CommitPT porque sentiu que faltava um espaço onde programadores
                pudessem aprender juntos, receber feedback e crescer de forma mais prática.
              </Typography>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 rounded-2xl border border-border/70 bg-background/70 p-6">
            <Typography variant="lead" className="text-lg text-foreground">
              O objetivo nunca foi criar mais um servidor de Discord ou vender um curso. Foi criar
              um espaço onde as pessoas pudessem aprender em conjunto, colaborar em projetos e
              evoluir mais depressa do que sozinhas.
            </Typography>
            <div className="flex flex-wrap gap-3">
              <Button>Junta-te à comunidade</Button>
              <Button variant="outline">Lê a história</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </SectionShell>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Founder or creator sections should feel personal but still structured. The layout balances identity, credibility, and a clear next action.",
      },
    },
  },
};

export const CTAAndFAQSection: Story = {
  render: () => (
    <SectionShell>
      <div className="rounded-3xl border border-border/70 bg-surface/70 p-8 lg:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <Typography variant="overline">Perguntas frequentes</Typography>
            <Typography variant="h2" as="h2">
              Já sabes qual é o problema. A solução está a um clique.
            </Typography>
            <Typography variant="p" className="text-muted-foreground">
              A estrutura do site é simples: um problema claro, uma promessa concreta e um próximo
              passo imediato.
            </Typography>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button size="lg">Adere já</Button>
            <Button size="lg" variant="outline">
              Experimenta o Discord grátis
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {[
            "A comunidade é só para programadores experientes?",
            "O que encontro dentro da comunidade?",
            "Quanto tempo preciso de dedicar por semana?",
            "Como funcionam as calls e workshops?",
          ].map((question) => (
            <div
              key={question}
              className="rounded-2xl border border-border/70 bg-background/60 p-4"
            >
              <Typography variant="large" className="text-sm text-foreground">
                {question}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "A closing section that combines conversion focus with a lightweight FAQ pattern. This is the sort of section that makes a landing page feel complete.",
      },
    },
  },
};
