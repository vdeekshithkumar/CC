/** @type {import('tailwindcss').Config} */
module.exports = {
  targets:'node',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        'CCblue': '#597ef7'

      }
    },
    fontFamily:{
      poppins: ["Poppins","sans-serif"]
    }
  },
  plugins: [],
}
