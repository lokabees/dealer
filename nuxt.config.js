import redirectSSL from 'redirect-ssl'

import en from './locales/en-US.json'
import de from './locales/de-DE.json'

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   ** Test it with 'static' and 'server'
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: 'Lokabees Dealer',
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'charset',
        name: 'charset',
        content: 'utf-8',
      },
      {
        hid: 'description',
        name: 'description',
        content: '',
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.png' }],
  },
  /*
   ** The env Property
   ** See https://nuxtjs.org/api/configuration-env/
   ** also https://nuxtjs.org/blog/moving-from-nuxtjs-dotenv-to-runtime-config/
   */
  publicRuntimeConfig: {
    dev: process.env.NODE_ENV !== 'production',
    appMasterKey: process.env.VUE_APP_MASTER_KEY,
    consumerUrl: process.env.CONSUMER_URL,
    appUrl: process.env.APP_URL,
  },
  privateRuntimeConfig: {
    VUE_APP_GOOGLE_ID: process.env.VUE_APP_GOOGLE_ID,
    VUE_APP_FACEBOOK_ID: process.env.VUE_APP_FACEBOOK_ID,
  },
  /*
   ** Global CSS
   */
  css: ['@/assets/main.scss'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '~/plugins/modules/axios',
    '~/plugins/modules/vue-formulate',
    // '~/plugins/modules/i18n',
    '~/plugins/modules/vue-form-wizard',
    '~/plugins/services/error-handler',
    { src: '~/plugins/modules/auth', mode: 'client' },
    { src: '~/plugins/modules/eva-icons', ssr: false },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    // https://github.com/microcipcip/cookie-universal/tree/master/packages/cookie-universal-nuxt#readme
    'cookie-universal-nuxt',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://i18n.nuxtjs.org/
    [
      'nuxt-i18n',
      {
        baseUrl: (context) => {
          return context.isDev
            ? 'http://localhost:3000'
            : (window && window.location) ||
                'https://lokabees-dealer-dev.herokuapp.com'
        },
        locales: [
          {
            code: 'de',
            iso: 'de-DE',
          },
          {
            code: 'en',
            iso: 'en-US',
          },
        ],
        seo: false,
        defaultLocale: 'de',
        vueI18n: {
          fallbackLocale: 'de',
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
        },
      },
    ],
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://pwa.nuxtjs.org/
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt/content
    '@nuxt/content',
    // Doc: https://github.com/nuxt-community/google-fonts-module
    '@nuxtjs/google-fonts',
    // Doc: https://github.com/nuxt-community/robots-module
    [
      '@nuxtjs/robots',
      {
        robots: {
          UserAgent: '*',
          Disallow: '/',
        },
      },
    ],
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
  },
  proxy: {
    '/api': { target: process.env.API_URL },
  },
  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {},
  /*
   ** google fonts module configuration
   ** See https://github.com/nuxt-community/google-fonts-module#options
   ** Todo: @lukas - Set specific font weights if purgecss not active - test it
   ** also specific subset
   */
  googleFonts: {
    families: {
      Merriweather: [400, 900],
      Montserrat: [400, 500],
    },
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
  /*
   ** The serverMiddleware Property
   ** See https://nuxtjs.org/api/configuration-servermiddleware/
   */
  serverMiddleware: [
    redirectSSL.create({
      enabled: process.env.NODE_ENV === 'production',
    }),
  ],
}
