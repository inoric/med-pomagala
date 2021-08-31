module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      background: {
        'huuuman': 'url("/Huuumans.png")'
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      textColor: ['active'],
    },
  },
  plugins: [],
}
