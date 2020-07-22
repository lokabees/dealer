<template>
  <div class="">
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

    <div>
      <button @click="socialLogin('facebook')">login with facebook</button>
    </div>
    <div>
      <button @click="socialLogin('google')">login with google</button>
    </div>
    <div>
      <n-link to="/signup">signup</n-link>
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
          params: { master: process.env.VUE_APP_MASTER_KEY },
        })
        this.$router.push('/')
      } catch (error) {
        this.$errorHandler({ error, type: 'login' })
      }
    },
    async socialLogin(provider) {
      console.log(provider)
      try {
        await this.$auth.loginWith(provider)
      } catch (error) {
        this.$errorHandler({ error, type: 'login' })
      }
    },
  },
}
</script>
