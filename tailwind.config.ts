import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: require("./config/customTailwind").theme,
  variants: {
    extend: {
      backgroundColor: ["dark"],
      textColor: ["dark"],
      borderColor: ["dark"],
      ringColor: ["dark"],
    },
  },
  plugins: [require("./config/customTailwind").plugin],
};
export default config;
