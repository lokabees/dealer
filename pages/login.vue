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

    <n-link to="/signup">signup</n-link>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  auth: 'guest',
  data() {
    return {
      guest: {},
    }
  },
  methods: {
    ...mapMutations('modal', { showModal: 'showModal' }),
    async localLogin() {
      try {
        await this.$auth.loginWith('local', {
          data: { ...this.guest, master: process.env.VUE_APP_MASTER_KEY },
        })
        this.$router.push('/')
      } catch ({
        response: {
          status,
          data: { message },
        },
      }) {
        let errorMessage

        switch (status) {
          case 401:
            if (message.trim() === 'Deine E-Mail ist nicht verifiziert')
              errorMessage = this.$t('login.error_messages.not_verified')
            else
              errorMessage = this.$t('login.error_messages.invalid_credentials')
            break
          default:
            errorMessage = this.$t('login.error_messages.other')
        }

        this.showModal({
          message: errorMessage,
          confirmText: this.$t('general.ok'),
        })
      }
    },
  },
}
</script>
