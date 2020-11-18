import Vue from 'vue'
import VueI18n from 'vue-i18n'

import en from '~/locales/en-US.json'
import de from '~/locales/de-DE.json'

/*
import es from '~/lang/es-ES.json'
import it from '~/lang/it-IT.json'
import nl from '~/lang/nl-NL.json'
import tr from '~/lang/tr-TR.json'
*/

Vue.use(VueI18n)

export default ({ app, store }) => {
  // i18n
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: app.$cookies.get('locale'),
    fallbackLocale: 'en',
    missing: (locale, key, vm) => {
      if (!key) return
      console.log(key)
      const keyParts = key.split('.')
      if (keyParts.includes('unspecific')) return
      keyParts[keyParts.length - 1] = 'unspecific'
      const newKey = keyParts.join('.')
      if (vm) return vm.$t(newKey)
    },
    messages: {
      en,
      de,
    },
  })

  app.i18n.path = (link) => {
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`
    }

    return `/${app.i18n.locale}/${link}`
  }
}
