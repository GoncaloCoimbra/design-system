import type { Preview } from "@storybook/react";
import { create } from "@storybook/theming";
import "../src/index.css";

const theme = create({
  base: "dark",
  brandTitle: "CommitPT",
  brandImage: "../src/assets/commit_icon.png",
  brandUrl: "https://commitpt.com",
  brandTarget: "_blank",
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
  },
};

export default preview;
