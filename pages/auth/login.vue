<template>
  <div class="container max-w-md p-3 md:p-0">
    <div class="prose lg:prose-lg text-center">
      <h1 class="py-10">Login with your credentials</h1>
    </div>
    <FormulateForm v-model="guest" @submit="localLogin">
      <FormulateInput
        name="email"
        type="email"
        :label="$t('login.email')"
        validation="bail|required|email"
        placeholder="lothar@mustermail.com"
      />
      <FormulateInput
        name="password"
        type="password"
        :label="$t('login.password')"
        validation="bail|required"
        placeholder="******************"
      />

      <n-link to="/auth/reset-password">{{
        $t('login.forgot_password')
      }}</n-link>

      <FormulateInput
        :class="{ 'spinner-dark': pending }"
        input-class="button bg-grey-dark text-white w-full hide-on-spinner"
        type="submit"
        :label="$t('login.login')"
      />
    </FormulateForm>

    <button class="secondary w-full" @click="$router.push('/auth/signup')">
      {{ $t('login.signup') }}
    </button>

    <div class="relative my-8">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t"></div>
      </div>
      <div class="relative flex justify-center text-sm leading-5">
        <span class="px-2 bg-primary-lightest">
          {{ $t('login.sign_up_with') }}
        </span>
      </div>
    </div>

    <div class="flex flex-col md:flex-row">
      <button
        class="secondary icon-l w-full text-center"
        @click="socialLogin('facebook')"
      >
        <icon name="facebook" /> {{ $t('login.facebook') }}
      </button>
      <div class="m-2"></div>
      <button class="secondary icon-l w-full" @click="socialLogin('google')">
        <icon name="google" /> {{ $t('login.google') }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  middleware: ['notAuthenticated'],
  data() {
    return {
      guest: {},
      pending: null,
    }
  },
  methods: {
    ...mapActions(['setLocalUser', 'getMe']),
    ...mapActions('shops', {
      getActiveShop: 'getActiveShop',
    }),
    ...mapActions('products', {
      getProducts: 'getProducts',
    }),
    async localLogin() {
      try {
        // Set Loading
        this.pending = 'local'
        // Authenticate with local auth service

        const {
          data: { token },
        } = await this.$axios.post(`/api/auth`, {
          ...this.guest,
          master: this.$config.appMasterKey,
        })
        // Set local access token to store and cookie
        this.setLocalUser(token)

        // Get user information
        await this.getMe()

        // Unset Loading
        this.pending = null

        // Redirect on successfull authentication
        await this.$router.push('/')
      } catch (error) {
        this.pending = null
        this.$errorHandler({ prefix: 'login', error })
      }
    },
    async socialLogin(provider) {
      try {
        // Set Loading
        this.pending = provider

        // Authenticate with external service
        const authResponse = await this.$auth(provider)
        console.log(authResponse)
        // Post the access_token to login user on backend
        /*
        const {
          data: { token },
        } = await this.$axios.post(`/api/auth/${provider}`, {
          token: access_token,
        })
*/
        // Set local access token to store and cookie
        // await this.setLocalUser(token)

        // Get user informations
        // await this.getMe()

        // Unset Loading
        this.pending = null

        // Redirect on successfull authentication
        // this.$router.push('/')
      } catch (error) {
        // Error handler
        console.log(error)
        this.pending = null
        this.$errorHandler({ prefix: 'login', error })
      }
    },
  },
}
</script>
