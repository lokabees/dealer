<template>
  <div class="container max-w-md p-3 md:p-0">
    <div class="prose lg:prose-lg text-center">
      <h1 class="py-10">{{ $t('signup.title') }}</h1>
    </div>
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
        validation="required|email"
        placeholder="max@mustermail.com"
      />
      <FormulateInput
        name="password"
        type="password"
        :label="$t('signup.password')"
        validation="required|password"
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

    <div class="flex flex-col">
      <div>{{ $t('signup.account_exists') }}</div>
      <button class="secondary w-full" @click="$router.push('/auth/login')">
        {{ $t('signup.login') }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  asyncData({ $config }) {
    if (process.server) {
      const master = $config.VUE_APP_MASTER_KEY
      return { master }
    }
  },
  data() {
    return {
      guest: {},
    }
  },
  methods: {
    async localSignUp() {
      try {
        await this.$axios.post(`/api/users`, {
          ...this.guest,
          master: this.master,
        })
        this.$router.push('signup/success')
      } catch (error) {
        // this.$errorHandler({ error, type: 'signup' })
        console.error(error)
      }
    },
  },
}
</script>
