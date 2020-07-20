<template lang="html">
  <div class="">
    <h1>Login</h1>
    {{ guest }}
    {{ $auth.loggedIn }}
    <FormulateForm v-model="guest" @submit="localLogin">
      <!--TODO label with i18n-->
      <FormulateInput
        name="email"
        type="email"
        :label="$t('login.email')"
        validation="bail|required|email"
        placeholder="lothar@mustermail.com"
      />
      <!--TODO password validation-->
      <FormulateInput
        name="password"
        type="password"
        :label="$t('login.password')"
        validation="bail|required"
        placeholder="******************"
      />
      <FormulateInput type="submit" :label="$t('login.login')" />
    </FormulateForm>
    <button @click="logout">logout</button>
  </div>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      guest: {},
    }
  },
  methods: {
    async localLogin() {
      try {
        const { data } = await this.$auth.loginWith('local', {
          data: this.guest,
        })
        console.log(data)
        // TODO: should be done automatically
        // this.$auth.setUser(data)
      } catch (e) {
        console.error(e)
      }
    },
    async logout() {
      try {
        const response = await this.$auth.logout()
        console.log(response)
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>
