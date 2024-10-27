/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui";
import themes from "daisyui/src/theming/themes";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        auth: "url('/auth-bg.png')",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        custom: {
          ...themes["retro"],
          primary: "#FE4144",
          secondary: "#FBBF24",
          error: "#FE2053",
          info: "#2563EB",
          "base-100": "#F8FDEF",
          "base-200": "#ECE3CA",
          "base-300": "#DBCA9A",
        },
      },
      "lemonade",
    ],
  },
};
