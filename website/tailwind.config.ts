/** @type {import('tailwindcss').Config} */

const NearFormColors = {
  White: "hsla(0, 0%, 100%, 1)",
  Black: "hsla(0, 0%, 0%, 1)",
  Green: "hsla(163, 100%, 45%, 1)",
  Purple: "hsla(260, 100%, 70%, 1)",
  LightPurple: "hsla(262, 100%, 90%, 1)",
  Blue: "hsla(218, 100%, 64%, 1)",
  LightBlue: "hsla(217, 100%, 92%, 1)",
  Grey: "hsla(0, 0%, 85%, 1)",
  LightGrey: "#F4F8FA",
  DeepGrey: "hsla(240, 8%, 29%, 1)",
  Navy: "hsla(205, 78%, 21%, 1)",
  LightNavy: "hsla(222, 25%, 43%, 1)",
  DeepNavy: "hsla(225, 100%, 11%, 1)",
};

const blue = {
  100: "#E8F0FF",
  300: "#B9D3FF",
  500: "#8AB6FF",
  800: "#4589FF",
};

const orange = {
  100: "#ff684f",
  200: "#ff4b2e",
  300: "#ff3d1d",
  400: "#ea2100",
};

module.exports = {
  corePlugins: {
    preflight: false, // disable Tailwind's reset
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./docs/**/*.mdx"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        currentColor: "currentColor",
        transparent: "transparent",
        white: NearFormColors.White,
        black: NearFormColors.Black,
        grayscale: {
          100: NearFormColors.White,
          200: NearFormColors.LightGrey,
          300: NearFormColors.Grey,
          400: NearFormColors.DeepGrey,
          500: NearFormColors.Black,
          800: "#888888",
        },
        orange,
        blue,
        "theme-1": NearFormColors.Green,
        "theme-2": NearFormColors.DeepNavy,
        "theme-3": NearFormColors.DeepNavy,
        "theme-4": NearFormColors.White,
        "header-bg": NearFormColors.White,
        "header-fg": NearFormColors.DeepNavy,
        "button-bg": NearFormColors.Green,
        "button-fg": NearFormColors.DeepNavy,
        "button-bg-hover": NearFormColors.White,
        "button-fg-hover": NearFormColors.DeepNavy,
        "button-border": NearFormColors.Green,
        "code-bg": "#1e1e1e",
        error: "#FF0000",
      },
      height: {
        "theme-builder": "calc(100vh - 60px)",
      },
      width: {
        prose: "90ch",
        "full-panel": "calc(100vw - 100px)",
      },
      fontFamily: {
        sans: ["Inter, Helvetica, Arial, sans-serif"],
      },
      backgroundImage: {
        "select-chevron":
          'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"/></svg>\')',
      },
    },
  },
};
