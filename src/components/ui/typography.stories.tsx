import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "./typography";

const meta: Meta<typeof Typography> = {
  title: "UI/Typography",
  component: Typography,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "lead",
        "large",
        "small",
        "muted",
        "code",
        "blockquote",
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 p-6">
      <Typography variant="h1">Heading 1 — The quick brown fox</Typography>
      <Typography variant="h2">Heading 2 — The quick brown fox</Typography>
      <Typography variant="h3">Heading 3 — The quick brown fox</Typography>
      <Typography variant="h4">Heading 4 — The quick brown fox</Typography>
      <Typography variant="h5">Heading 5 — The quick brown fox</Typography>
      <Typography variant="h6">Heading 6 — The quick brown fox</Typography>
      <Typography variant="lead">
        Lead — A larger introductory paragraph for page sections.
      </Typography>
      <Typography variant="p">
        Paragraph — Regular body text with a comfortable line height for reading longer content.
      </Typography>
      <Typography variant="large">Large — Slightly larger body text used for emphasis.</Typography>
      <Typography variant="small">Small — Compact text for secondary information.</Typography>
      <Typography variant="muted">Muted — De-emphasised text for hints and metadata.</Typography>
      <Typography variant="code">code snippet</Typography>
      <Typography variant="blockquote">
        Blockquote — A quoted passage from an external source or a highlighted statement.
      </Typography>
    </div>
  ),
};

export const Headings: Story = {
  render: () => (
    <div className="space-y-3 p-6">
      {(["h1", "h2", "h3", "h4", "h5", "h6"] as const).map((v) => (
        <Typography key={v} variant={v}>
          {v.toUpperCase()} — The quick brown fox jumps over the lazy dog
        </Typography>
      ))}
    </div>
  ),
};

export const Body: Story = {
  render: () => (
    <div className="space-y-3 p-6 max-w-xl">
      <Typography variant="lead">This is a lead paragraph introducing the section.</Typography>
      <Typography variant="p">
        Regular paragraph text. CommitPT&apos;s design system provides a consistent typographic
        scale built on Plus Jakarta Sans for a modern, readable feel across all surfaces.
      </Typography>
      <Typography variant="muted">Last updated 2 hours ago · 3 min read</Typography>
    </div>
  ),
};

export const Inline: Story = {
  render: () => (
    <div className="space-y-3 p-6">
      <Typography variant="code">npm install @commitpt/design-system</Typography>
      <Typography variant="blockquote">
        Design is not just what it looks like and feels like. Design is how it works.
      </Typography>
    </div>
  ),
};
