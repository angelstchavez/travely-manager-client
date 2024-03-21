import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        tm00: "#0a84ff",
        tm10: "#0066cc",
        tm20: "#0051a3",
        tm40: "#003d7a",
        tm60: "#002851",
        tm70: "#001f40",
        tm80: "#001b36",
        tm90: "#001122",
      },
    },
  },
  plugins: [],
};
export default config;
