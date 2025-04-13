/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        background2:"#fffffe",
        headline: '#020826',
        paragraph: '#716040',
        button: '#8c7851',
        buttonText: '#fffffe',
        stroke: '#020826',
        main: '#fffffe',
        highlight: '#8c7851',
        secondary: '#eaddcf',
        tertiary: '#f25042',
      },
    },
  },
  plugins: [],
};
