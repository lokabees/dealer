<template>
  <div class="container max-w-md prose p-2">
    <h1 class="text-center">{{ $t('reset_password.title') }}</h1>
    <p class="text-center">{{ $t('reset_password.text') }}</p>
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
    <button class="secondary w-full" @click="$router.push('/auth/login')">
      {{ $t('reset_password.back') }}
    </button>
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
        this.$errorHandler(error, { prefix: 'reset_password' })
      }
    },
  },
}
</script>
