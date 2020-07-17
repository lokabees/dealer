import Vue from 'vue'
import VueFormulate from '@braid/vue-formulate'
import { de } from '@braid/vue-formulate-i18n'

Vue.use(VueFormulate, {
  plugins: [de],
  locale: 'de',
  classes: {
    outer: 'mb-6',
    input:
      'border border-light shadow-xs rounded px-3 py-2 leading-none focus:border-black outline-none border-box w-full resize-none',
    label: 'font-medium text-sm',
    help: 'text-xs text-dark',
    error: 'text-warning text-xs',
  },
})
