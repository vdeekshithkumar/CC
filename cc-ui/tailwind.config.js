/** @type {import('tailwindcss').Config} */
module.exports = {
  targets:'node',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        'CCblue': '#597ef7',
        'CCdarkblue': '#3E7BFA',
        'cc-gray':'#E9E9E9'

      }
    },
    fontFamily:{
      poppins: ["Poppins","sans-serif"]
    }
  },
  plugins: [],
}
