/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
import { fontFamily } from 'tailwindcss/defaultTheme'

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        serif: ['Merriweather', ...fontFamily.serif],
        sans: ['Montserrat', ...fontFamily.sans],
      },
    },
    container: {
      center: true,
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
}
