/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: '#F6F6F6',
        superClear: '#FFFFFF',
        primary: '#4693C7',
        darkPrimary: '#125E8A',
        lightShapes: '#F0F0F0',
        textPrimary: '#000000',
        textSecoundary: '#6C6C6C',
        disabled: '#D9D9D9',
        selectionBG: '#8A716A'
      },
    },
    screens: {
      'sm': '760px', //0
      'small': '1180px', // 1
    },
  },
  plugins: [],
}

