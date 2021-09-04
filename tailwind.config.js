module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      background: {
        'huuuman': 'url("/Huuumans.png")',
        
      },
      height: {
        '-2': '-2rem',
        '3': '3rem',
        'big': '5rem',
      },
      backgroundColor: {
        'white-opacity': 'rgba(255,255,255,0.5)'
      },
      zIndex: {
        '-10': '-10',
       },
       transitionProperty: {
        'height': 'height'
      },
      minWidth: {
        '52': '52rem',
        '60': '60rem'
      }
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
