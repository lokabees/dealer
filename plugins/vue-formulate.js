import Vue from 'vue'
import VueFormulate from '@braid/vue-formulate'

Vue.use(VueFormulate, {
  classes: {
    outer: 'mb-4',
    input:
      'transition ease-in duration-200 border border-light shadow-xs rounded px-3 py-2 leading-none outline-none border-box w-full resize-none focus:border-black dark:border-white dark:bg-black',
    label: 'label',
    help: 'text-xs text-dark',
    error: 'text-warning text-xs absolute -mt-1',
  },
})
