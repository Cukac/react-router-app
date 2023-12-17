/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paragraph: "#94a1b2",
        stroke: "#010101",
        primary: "#fffffe",
        secondary: "#72757e",
        highlight: "#7f5af0",
        interactive: "#2cb67d",
      },
    },
  },
  plugins: [],
};
