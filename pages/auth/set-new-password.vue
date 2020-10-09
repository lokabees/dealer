<template>
  <div class="container max-w-md prose p-2">
    <h1 class="text-center">{{ $t('new_password.title') }}</h1>
    <FormulateForm @submit="setNewPassword">
      <!--TODO validation password-->
      <FormulateInput
        v-model="password"
        name="password"
        type="password"
        :label="$t('new_password.new_password')"
        :placeholder="$t('new_password.password_placeholder')"
        validation="required|password"
      />
      <!--TODO validation passwords match-->
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
    setNewPassword() {
      console.log('set new password')
      // TODO
      // this.$router.push('/auth/login')
    },
  },
}
</script>
