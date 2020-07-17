/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
const { fontFamily } = require('tailwindcss/defaultTheme')
module.exports = {
  theme: {
    extend: {
      margin: {
        36: '9rem',
      },
      borderColor: (theme) => ({
        default: theme('colors.dark', 'currentColor'),
      }),
    },
    fontFamily: {
      sans: ['Montserrat', ...fontFamily.sans],
      serif: ['Merriweather', ...fontFamily.serif],
    },
    colors: {
      transparent: 'transparent',
      black: '#000000',
      white: '#ffffff',
      grey: {
        lighter: '#DADBDD',
        light: '#BBBBBB',
        default: '#575757',
        dark: '#2B2B2B',
      },
      danger: {
        default: '#FE6347',
        lighter: '#FFE1E9',
      },
      primary: {
        lightest: '#F5F7F6',
        lighter: '#E4F4E9',
        default: '#19AE9D',
      },
      secondary: '#006174',
      tertiary: '#02587B',
      warning: {
        lighter: '#FAF3E3',
        light: '#FFD662',
        default: '#FFB100',
      },
    },
    container: {
      center: true,
    },
    variants: {
      spinner: ['responsive'],
    },
    spinner: (theme) => ({
      dark: {
        color: theme('colors.dark', 'currentColor'), // color you want to make the spinner
        size: '1em', // size of the spinner (used for both width and height)
        border: '2px', // border-width of the spinner (shouldn't be bigger than half the spinner's size)
        speed: '500ms', // the speed at which the spinner should rotate
      },
      light: {
        color: theme('colors.light', 'currentColor'), // color you want to make the spinner
        size: '1em', // size of the spinner (used for both width and height)
        border: '2px', // border-width of the spinner (shouldn't be bigger than half the spinner's size)
        speed: '500ms', // the speed at which the spinner should rotate
      },
    }),
  },
  plugins: [require('tailwindcss-spinner')()],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
  },
}
