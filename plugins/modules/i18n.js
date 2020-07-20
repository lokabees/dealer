import Vue from 'vue'
import VueI18n from 'vue-i18n'

import en from '~/lang/en-US.json'
// import de from '~/lang/de-DE.json'

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
      // de,
    },
  })

  app.i18n.path = (link) => {
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`
    }

    return `/${app.i18n.locale}/${link}`
  }
}
