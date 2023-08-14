/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      'phone' : '320px',
      ...defaultTheme.screens,
    },
    fontFamily: {
      'sans': ['Gotham'],
      'bebasNeue' : 'Bebas-Neue',
      'cosmos' : 'cosmos',
      'times-new-roman' : 'times-new-roman',
      'exposition' : 'exposition',
    },
    extend: {
      backgroundImage: {
        'kalbobox' : `url('data:image/svg+xml,<svg width="150" height="64" viewBox="0 0 150 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="150" height="8" fill="black"/><rect y="28" width="150" height="8" fill="black"/><rect y="56" width="150" height="8" fill="black"/></svg>')`,
      },
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

