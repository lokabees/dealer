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
    locale: store.state.locale,
    fallbackLocale: 'en',
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
