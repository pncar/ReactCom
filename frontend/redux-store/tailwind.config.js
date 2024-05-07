/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'sans': ['Poppins']
      },
      colors: {
        primary: colors.zinc
      }
    }
  },
  plugins: [],
  darkMode: "class"
}

