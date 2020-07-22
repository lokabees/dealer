export const state = () => ({
  locales: [
    {
      code: 'de',
      name: 'Deutsch',
    },
    {
      code: 'en',
      name: 'English',
    },
    {
      code: 'es',
      name: 'Español',
    },
    {
      code: 'tr',
      name: 'Türk',
    },
    {
      code: 'it',
      name: 'Italiano',
    },
    {
      code: 'nl',
      name: 'Nederlands',
    },
  ],
  locale: 'en',
})

export const actions = {
  /**
   * nuxtServerInit start on initial loading
   */
  nuxtServerInit({ commit }, { app }) {
    const locale = app.$cookies.get('locale')
    commit('setLocale', locale)
  },
}

export const mutations = {
  setLocale(state, locale) {
    if (state.locales.find((el) => el.code === locale)) {
      state.locale = locale
    }
  },
}

export const getters = {
  locales: (state) => state.locales,
  locale: (state) => state.locale,
}
