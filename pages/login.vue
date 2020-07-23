<template>
  <div class="container">
    <h1 class="py-10">Login</h1>
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
      <FormulateInput type="submit" :label="$t('login.login')" />
    </FormulateForm>

    <n-link class="my-5" to="/signup"
      ><button>{{ $t('login.signup') }}</button></n-link
    >

    <div class="text-center">
      <hr />
      {{ $t('login.sign_up_with') }}
    </div>

    <div>
      <button @click="socialLogin('facebook')">
        {{ $t('login.facebook') }}
      </button>
    </div>
    <div>
      <button @click="socialLogin('google')">{{ $t('login.google') }}</button>
    </div>
  </div>
</template>

<script>
export default {
  auth: 'guest',
  data() {
    return {
      guest: {},
    }
  },
  methods: {
    async localLogin() {
      try {
        await this.$auth.loginWith(`local`, {
          data: { ...this.guest },
          params: { master: this.$config.appMasterKey },
        })
        this.$router.push('/')
      } catch (error) {
        this.$errorHandler({ error, type: 'login' })
      }
    },
    async socialLogin(provider) {
      try {
        await this.$auth.loginWith(provider)
      } catch (error) {
        this.$errorHandler({ error, type: 'login' })
      }
    },
  },
}
</script>
