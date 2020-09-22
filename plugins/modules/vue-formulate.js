import Vue from 'vue'
import VueFormulate from '@braid/vue-formulate'
import { de } from '@braid/vue-formulate-i18n'

import OpeningHours from '~/components/elements/OpeningHours'
import AddressInput from '~/components/elements/AddressInput'

// register your component with Vue
Vue.component('OpeningHours', OpeningHours)
Vue.component('AddressInput', AddressInput)

Vue.use(VueFormulate, {
  plugins: [de],
  library: {
    openingHours: {
      classification: 'text',
      component: 'OpeningHours',
    },
    addressInput: {
      classification: 'text',
      component: 'AddressInput',
    },
  },
  classes: {
    wrapper: (context) => {
      const defaultClasses = 'my-6'
      switch (context.classification) {
        case 'button':
          return `${defaultClasses}`
        case 'box':
          return `${defaultClasses} flex items-center`
        default:
          return defaultClasses
      }
    },
    input(context) {
      switch (context.classification) {
        case 'button':
          return 'button primary w-full'
        case 'box':
          return 'form-checkbox h-6 w-6 rounded-sm text-primary transition duration-150 ease-in-out focus:shadow-none mr-2'
        default:
          return 'form-input transition ease-in duration-200 border rounded-sm py-4 outline-none w-full resize-none focus:border-black focus:shadow-none hover:primary-lightest'
      }
    },
    label: 'text-sm',
    help: 'text-xs text-dark',
    error: 'text-danger text-xs',
  },
  rules: {
    password: ({ value }) => {
      const strongRegex = new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.])(?=.{8,})'
      )
      return strongRegex.test(value)
    },
  },
})
