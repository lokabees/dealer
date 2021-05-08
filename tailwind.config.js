/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
const typography = require('@tailwindcss/typography')
const spinner = require('tailwindcss-spinner')
const tailwindui = require('@tailwindcss/ui')
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        serif: ['Merriweather', ...fontFamily.serif],
        sans: ['Montserrat', ...fontFamily.sans],
      },
      spacing: {
        '2/5': '40%',
      },
    },
    container: {
      center: true,
    },
    /*
     ** Typography settings
     ** See https://github.com/tailwindlabs/tailwindcss-typography
     */
    typography: (theme) => ({
      default: {
        css: {
          'h1, h2, h3, h4': {
            fontFamily: theme('fontFamily.serif').join(', '),
            fontWeight: 'black',
          },
          a: {
            color: theme('colors.primary.default'),
            'text-decoration': 'none',
            '&:hover': {
              color: theme('colors.tertiary'),
            },
          },
        },
      },
    }),
    /*
     ** Main Color settings
     ** See https://tailwindcss.com/docs/customizing-colors/#app
     */
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
        light: '#ECEEF0',
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
    variants: {
      spinner: ['responsive'],
    },
    spinner: (theme) => ({
      dark: {
        color: theme('colors.white', 'currentColor'), // color you want to make the spinner
        size: '1em', // size of the spinner (used for both width and height)
        border: '2px', // border-width of the spinner (shouldn't be bigger than half the spinner's size)
        speed: '500ms', // the speed at which the spinner should rotate
      },
      light: {
        color: theme('colors.grey.dark', 'currentColor'), // color you want to make the spinner
        size: '1em', // size of the spinner (used for both width and height)
        border: '2px', // border-width of the spinner (shouldn't be bigger than half the spinner's size)
        speed: '500ms', // the speed at which the spinner should rotate
      },
    }),
  },
  /*
   ** TailwindCSS Plugins
   ** See https://tailwindcss.com/docs/configuration/#app
   */
  plugins: [typography, tailwindui, spinner()],
}
