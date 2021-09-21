module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
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
        'white-opacity': 'rgba(255,255,255,0.5)',
        'sexy': '#66f'
      },
      borderColor: {
        'sexy': '#66f'
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
      },
      width: {
        '110': '30rem',
        '144': '36rem',
        '160': '40rem',
        '200': '50rem',
        '240': '60rem',
      },
      textColor: {
        'sexy': '#66f'
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
