<template>
  <div class="">
    <h1>Sign up</h1>

    <FormulateForm v-model="guest" @submit="localSignUp">
      <FormulateInput
        name="email"
        type="email"
        :label="$t('signup.email')"
        validation="bail|required|email"
        placeholder="lothar@mustermail.com"
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
      <FormulateInput type="submit" :label="$t('signup.signup')" />
    </FormulateForm>
    <n-link to="/login">login</n-link>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  auth: false,
  data() {
    return {
      guest: {},
    }
  },
  methods: {
    ...mapMutations('modal', { showModal: 'showModal' }),
    async localSignUp() {
      try {
        await this.$axios.post(`/api/users`, {
          ...this.guest,
          master: process.env.VUE_APP_MASTER_KEY,
        })
      } catch (e) {
        console.error(e)

        // user already exists
        this.showModal({
          message: this.$t('error_messages.conflict'),
          confirmText: this.$t('general.ok'),
        })
      }
    },
  },
}
</script>
