/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      'sans': ['Gotham'],
      'bebasNeue' : 'Bebas-Neue',
      'cosmos' : 'cosmos',
      'times-new-roman' : 'times-new-roman',
      'exposition' : 'exposition',
    },
    extend: {
      colors: {
        'indian-red' : '#D26F71',
        'misty-rose' : '#F1D9D9',
        'dessert-yellow' : '#FADA6C',
        'ultramarine-blue' : '#279AF1',
        'gunmental' : '#2F323A',
        'bittersweet-shimmer' : '#C44549',
        'tea-green' : '#C4F1BE',
    },
  }
  },
  plugins: [],
}

