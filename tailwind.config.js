/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      'sans': ['Gotham'],
      'bebasNeue' : 'Bebas Neue',
    },
    extend: {
      colors: {
        'indian-red' : '#D26F71',
        'misty-rose' : '#F1D9D9',
        'dessert-yellow' : '#FADA6C',
        'ultramarine-blue' : '#279AF1',
        'gunmental-grey' : '#2F323A',
    },
  }
  },
  plugins: [],
}

