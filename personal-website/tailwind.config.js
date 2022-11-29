/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{ts,tsx}",
    './components/**/*.{ts,tsx}',
    './index-page-relevant/**/*.{ts,tsx}',
    "./public/**/*.html",
  ],
  theme: {
    colors: {
      cBgDark: '#101827',
      cPurple: '#52489c',
      cLightPurple: '#9f9ac4',
      cLightestPurple: '#b5b2cc',
      cLightGreen: '#84a98c',
      cGreen: '#618B6A',
    },
    extend: {
      spacing: {
        '112': '28rem',
        '128': '30rem',
        '224': '54rem',
        '160': '40rem',
        '100': '25rem',
        '260': '65rem',
        '144': '36rem'
      }
    },
  },
  plugins: [
    require('flowbite-typography'),
    require("flowbite/plugin"),
  ],
  darkMode: 'media',
}
