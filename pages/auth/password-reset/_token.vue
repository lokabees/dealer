<template>
  <div class="container max-w-md prose p-2">
    <h1 class="text-center">{{ $t('new_password.title') }}</h1>
    <FormulateForm @submit="setNewPassword">
      <FormulateInput
        v-model="password"
        name="password"
        type="password"
        :label="$t('new_password.new_password')"
        :placeholder="$t('new_password.password_placeholder')"
        validation="required|password"
      />
      <FormulateInput
        v-model="confirmPassword"
        name="password"
        type="password"
        :label="$t('new_password.repeat_new_password')"
        :placeholder="$t('new_password.password_placeholder')"
        :validation-rules="{
          passwordMatch: ({ value }) => value === password,
        }"
        :validation-messages="{
          passwordMatch: $t('validation_errors.confirm_password'),
        }"
        validation="required|passwordMatch"
      />
      <FormulateInput type="submit" :label="$t('new_password.submit')" />
    </FormulateForm>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: null,
      confirmPassword: null,
    }
  },
  methods: {
    async setNewPassword() {
      try {
        const { token } = this.$route.params
        await this.$axios.patch(`/api/password-reset/${token}`, {
          password: this.password,
        })
        this.$router.push('/auth/login')
      } catch (error) {
        this.$errorHandler(error, { prefix: 'reset_password' })
      }
    },
  },
}
</script>
