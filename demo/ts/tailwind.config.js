/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/theme-builder/**/*.{ts,tsx}"],
  theme: {
    colors: {
      currentColor: "currentColor",
      transparent: "transparent",
      primary: "#007bff",
      secondary: "#0056b3",
      white: "#fff",
      gray: {
        100: "#f9f9f9",
        200: "#ccc",
        300: "#666",
      },
    },
    extend: {
      backgroundImage: {
        "select-chevron":
          'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"/></svg>\')',
      },
    },
  },
  plugins: [],
};
