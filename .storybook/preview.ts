import type { Preview } from "@storybook/react";
import { create } from "@storybook/theming";
import "../src/index.css";

const theme = create({
  base: "dark",
  brandTitle: "CommitPT",
  brandUrl: "https://commitpt.com",
  brandTarget: "_blank",

  appBg: "#1a0b2e",
  appContentBg: "#0b1a2e",
  appPreviewBg: "#0b1a2e",
  appBorderColor: "#36126b",
  appBorderRadius: 8,

  fontBase: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
  fontCode: "'JetBrains Mono', ui-monospace, monospace",

  textColor: "#F8FAFC",
  textMutedColor: "#94A3B8",
  textInverseColor: "#1a0b2e",

  barBg: "#25104d",
  barTextColor: "#F8FAFC",
  barHoverColor: "#b66bfa",
  barSelectedColor: "#9a67f5",

  colorPrimary: "#7c3aed",
  colorSecondary: "#1ea7ff",
});

const preview: Preview = {
  parameters: {
    docs: {
      theme,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ["Brand Identity", "Base Components", "UI"],
      },
    },
  },
};

export default preview;
