import redirectSSL from 'redirect-ssl'

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
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** The env Property
   ** See https://nuxtjs.org/api/configuration-env/
   ** also https://nuxtjs.org/blog/moving-from-nuxtjs-dotenv-to-runtime-config/
   */
  publicRuntimeConfig: {
    dev: process.env.NODE_ENV !== 'production',
    appMasterKey: process.env.VUE_APP_MASTER_KEY,
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
    '~/plugins/modules/i18n',
    '~/plugins/modules/vue-form-wizard',
    { src: '~/plugins/modules/auth', mode: 'client' },
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
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://pwa.nuxtjs.org/
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt/content
    '@nuxt/content',
    // Doc: https://github.com/nuxt-community/google-fonts-module
    '@nuxtjs/google-fonts',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
  },
  proxy: {
    // TODO: Uncomment this
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
      Merriweather: true,
      Montserrat: true,
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
