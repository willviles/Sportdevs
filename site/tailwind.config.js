const tailwindColors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false,
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1440px',
      '3xl': '1920px',
      '4xl': '2260px'
    },
    fontFamily: {
      main: [
        'Manrope',
        'system-ui',
        'BlinkMacSystemFont',
        '-apple-system',
        'Helvetica Neue',
        'sans-serif'
      ],
      monospace: [
        'monaco',
        'Consolas',
        'Lucida Console',
        'monospace'
      ]
    },
    colors: () => {
      const colors = {
        transparent: 'transparent',
        current: 'currentColor',
        black: tailwindColors.black,
        white: tailwindColors.white,
        gray: tailwindColors.gray,
        purple: {
          DEFAULT: '#5B21B6',
          '50': '#CCB4F1',
          '100': '#BFA1EE',
          '200': '#A47AE7',
          '300': '#8A53E0',
          '400': '#6F2CD9',
          '500': '#5B21B6',
          '600': '#481A8F',
          '700': '#341368',
          '800': '#210C41',
          '900': '#0D051B'
        },
        yellow: tailwindColors.yellow,
        green: tailwindColors.green,
        red: tailwindColors.red
      }

      return {
        ...colors,
        primary: colors.purple,
        'body-bg': colors.purple['800'],
        'body-text': colors.white,
        'body-text-link': colors.purple['500'],
        'selection': colors.purple['500']
      }
    },
    fill: theme => ({ ...theme('colors') }),
  },
  variants: {
    extend: {}
  },
  corePlugins: {
    container: false
  },
  plugins: []
}
