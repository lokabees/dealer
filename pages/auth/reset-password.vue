<template>
  <div class="container prose">
    <h1>{{ $t('reset_password.title') }}</h1>
    <p>{{ $t('reset_password.text') }}</p>
    <FormulateForm @submit="resetPassword">
      <FormulateInput
        v-model="email"
        name="Email"
        type="email"
        :label="$t('reset_password.email')"
        :placeholder="$t('reset_password.email_placeholder')"
        validation="required|email"
      />
      <FormulateInput type="submit" :label="$t('reset_password.submit')" />
    </FormulateForm>
    <button>{{ $t('reset_password.back') }}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
    }
  },
  methods: {
    async resetPassword() {
      try {
        await this.$axios.$post('/api/password-reset', {
          email: this.email,
          master: this.$config.appMasterKey,
        })
        this.$router.push('/auth/reset-password-success')
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
