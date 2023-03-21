/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxHeight: {
        "600": "600px"
      },
      screens: {
        "x-sm": "100px",
        'sm': '640px',
        'md': '820px',
        'lg': '1024px',
        'xl': '1280px',
      },
    },
  },
  plugins: [],
}
