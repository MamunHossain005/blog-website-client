const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: [ "Inter", 'sans-serif'],
        logo: ["Jaro", 'sans-serif'],
      },
      colors: {
        primary: '#3B1C32',
        secondary: '#6A1E55',
        tertiary: '#A64D79'
      },
      backgroundColor: {
        primary: '#3B1C32',
        secondary: '#6A1E55',
        tertiary: '#A64D79'
      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
  darkMode: 'class',
}

