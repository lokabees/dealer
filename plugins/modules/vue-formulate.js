import Vue from 'vue'
import VueFormulate from '@braid/vue-formulate'

Vue.use(VueFormulate, {
  classes: {
    outer: 'mb-6',
    input:
      'transition ease-in duration-200 border shadow-none rounded-sm mt-1 px-3 py-4 leading-none outline-none w-full resize-none focus:border-black hover:primary-lightest',
    label: 'text-sm',
    help: 'text-xs text-dark',
    error: 'text-danger text-xs',
  },
})
