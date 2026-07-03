import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming";

addons.setConfig({
  theme: create({
    base: "dark",
    brandTitle: "CommitPT",
    brandUrl: "https://commitpt.com",
    brandTarget: "_blank",
    brandImage: "/brand.svg",
  }),
});
