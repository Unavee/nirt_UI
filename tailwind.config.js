/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "#18181b",
        background: "#ffffff",
        foreground: "#000000",
        muted: {
          DEFAULT: "#f4f4f5",
          foreground: "#52525b",
        },
        accent: {
          DEFAULT: "#000000",
          foreground: "#ffffff",
        },
      },
      borderRadius: {
        none: "0px",
      },
    },
  },
  plugins: [],
};
