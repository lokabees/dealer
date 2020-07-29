import Vue from 'vue'
import VueFormulate from '@braid/vue-formulate'
import { de } from '@braid/vue-formulate-i18n'

export default ({ app: { i18n } }, inject) => {
  Vue.use(VueFormulate, {
    plugins: [de],
    locales: {
      en: {
        password() {
          return i18n.t('validation_errors.password')
        },
        required() {
          return i18n.t('validation_errors.required')
        },
      },
    },
    rules: {
      password: ({ value }) => {
        const strongRegex = new RegExp(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.])(?=.{8,})'
        )
        return strongRegex.test(value)
      },
    },
    classes: {
      outer: 'mb-6',
      element(context) {
        switch (context.classification) {
          case 'file':
            return ''
          case 'box':
            return 'content-center mr-5 my-auto'
          default:
            return ''
        }
      },
      input(context) {
        switch (context.classification) {
          case 'file':
            return 'dropbox'
          case 'button':
            return 'cta bg-tertiary'
          case 'box':
            return 'bg-transparent'
          default:
            return 'border border-light rounded-sm shadow-xs bg-transparent px-3 py-4 leading-none focus:border-black outline-none border-box w-full resize-none'
        }
      },
      label(context) {
        switch (context.classification) {
          case 'box':
            return 'font-semibold text-xs flex-initial my-auto'
          default:
            return 'font-semibold text-xs'
        }
      },
      help: 'text-xs text-dark',
      error: 'text-warning text-xs',
    },
  })
}
