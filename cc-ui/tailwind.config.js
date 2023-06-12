/** @type {import('tailwindcss').Config} */
module.exports = {
  targets:'node',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        'CCblue': '#2F54EB',
        'CCdarkblue': '#3E7BFA',
        'cc-gray':'#E9E9E9',
        'angel-blue':'#F0F5FF',
        'angel-blue-2':'#597EF7',
        'pale-blue': '#D6E4FF'

      }
    },
    fontFamily:{
      poppins: ["Poppins","sans-serif"]
    }
  },
  plugins: [],
}
