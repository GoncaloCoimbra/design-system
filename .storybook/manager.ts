import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming";

addons.setConfig({
  theme: create({
    base: "dark",
    brandTitle: "CommitPT",
    brandUrl: "https://commitpt.com",
    brandTarget: "_blank",
    brandImage: "/brand.svg",

    // Sidebar
    appBg: "#1a0b2e",           // secondary-900
    appContentBg: "#0b1a2e",    // primary-900
    appPreviewBg: "#0b1a2e",    // primary-900
    appBorderColor: "#36126b",  // secondary-700
    appBorderRadius: 8,

    // Typography
    fontBase: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
    fontCode: "'JetBrains Mono', ui-monospace, monospace",

    // Text
    textColor: "#F8FAFC",
    textMutedColor: "#94A3B8",
    textInverseColor: "#1a0b2e",

    // Toolbar
    barBg: "#25104d",           // secondary-800
    barTextColor: "#F8FAFC",
    barHoverColor: "#b66bfa",   // secondary-300
    barSelectedColor: "#9a67f5", // secondary-400

    // Inputs
    inputBg: "#36126b",         // secondary-700
    inputBorder: "#5520a3",     // secondary-600
    inputTextColor: "#F8FAFC",
    inputBorderRadius: 6,

    // Buttons / interactive
    colorPrimary: "#7c3aed",    // secondary-500
    colorSecondary: "#1ea7ff",  // primary-500
  }),
});
