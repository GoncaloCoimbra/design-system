import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming";

addons.setConfig({
  theme: create({
    base: "dark",
    brandTitle: "CommitPT",
    brandImage: "../src/assets/commit_icon.png",
    brandUrl: "https://commitpt.com",
    brandTarget: "_blank",
  }),
});
