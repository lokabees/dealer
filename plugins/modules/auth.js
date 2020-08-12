import hello from 'hellojs'

hello.init(
  {
    facebook: process.env.VUE_APP_FACEBOOK_ID,
    google: process.env.VUE_APP_GOOGLE_ID,
  },
  {
    redirect_uri: '/auth/login',
  }
)

const providerAuth = (provider) =>
  hello(provider).login({
    scope: 'email',
  })

export default (context, inject) => {
  // Inject $auth in Vue, context and store.
  inject('auth', providerAuth)
  // For Nuxt <= 2.12, also add 👇
  context.$auth = providerAuth
}
