<template>
  <div class="container">
    <h1 class="py-10">Sign up</h1>
    <FormulateForm v-model="guest" @submit="localSignUp">
      <FormulateInput
        type="text"
        name="name"
        :label="$t('signup.name')"
        placeholder="Max Mustermann"
        validation="required"
      />
      <FormulateInput
        name="email"
        type="email"
        :label="$t('signup.email')"
        validation="bail|required|email"
        placeholder="max@mustermail.com"
      />
      <FormulateInput
        name="password"
        type="password"
        :label="$t('signup.password')"
        validation="bail|required|password"
        placeholder="******************"
      />
      <FormulateInput
        name="confirm password"
        type="password"
        :label="$t('signup.confirm_password')"
        :validation-rules="{
          passwordMatch: ({ value }) => value === guest.password,
        }"
        :validation-messages="{
          passwordMatch: $t('validation_errors.confirm_password'),
        }"
        validation="bail|required|passwordMatch"
        placeholder="******************"
      />
      <FormulateInput
        type="checkbox"
        :label="$t('signup.accept_terms')"
        validation="required"
      />
      <FormulateInput type="submit" :label="$t('signup.signup')" />
    </FormulateForm>

    <div class="text-center">
      {{ $t('signup.account_exists') }}<br />
      <n-link to="/login">{{ $t('signup.login') }}</n-link>
    </div>
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
    localSignUp() {
      try {
        /*
        await this.$axios.post(`/api/users`, {
          ...this.guest,
          master: this.$config.appMasterKey,
        })
        */
        this.$router.push('signup/success')
      } catch (error) {
        this.$errorHandler({ error, type: 'signup' })
      }
    },
  },
}
</script>
