import Vue from 'vue'
import VueFormulate from '@braid/vue-formulate'
import { de } from '@braid/vue-formulate-i18n'

import OpeningHours from '~/components/elements/OpeningHours'
import AddressInput from '~/components/elements/AddressInput'
import ShopCategories from '~/components/elements/ShopCategories'
import DeliveryOptions from '~/components/elements/DeliveryOptions'
import ImageUpload from '~/components/elements/ImageUpload'

// register your component with Vue
Vue.component('OpeningHours', OpeningHours)
Vue.component('AddressInput', AddressInput)
Vue.component('ShopCategories', ShopCategories)
Vue.component('DeliveryOptions', DeliveryOptions)
Vue.component('ImageUpload', ImageUpload)

export default ({ app }, inject) => {
  Vue.use(VueFormulate, {
    plugins: [de],
    library: {
      openingHours: {
        classification: 'text',
        component: 'OpeningHours',
      },
      shopCategories: {
        component: 'ShopCategories',
      },
      imageUpload: {
        component: 'ImageUpload',
      },
      deliveryOptions: {
        component: 'DeliveryOptions',
      },
      addressInput: {
        classification: 'text',
        component: 'AddressInput',
      },
    },
    locales: {
      en: {
        required() {
          return app.i18n.t('validation_errors.mandatory_field')
        },
        password() {
          return app.i18n.t('validation_errors.password')
        },
        noNumbers() {
          return app.i18n.t('validation_errors.no_numbers')
        },
      },
      de: {
        required() {
          return app.i18n.t('validation_errors.mandatory_field')
        },
        password() {
          return app.i18n.t('validation_errors.password')
        },
        noNumbers() {
          return app.i18n.t('validation_errors.no_numbers')
        },
      },
    },
    classes: {
      wrapper: (context) => {
        const defaultClasses = 'my-4'
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
      label: 'text-sm font-bold',
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
      noNumbers: ({ value }) => {
        const regex = new RegExp('^[^0-9]+$')
        return regex.test(value)
      },
    },
  })
}
