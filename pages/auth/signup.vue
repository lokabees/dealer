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
      <FormulateInput
        name="newsletter"
        type="checkbox"
        :label="$t('signup.updates_offers_consent')"
      />
      <FormulateInput
        :class="{ 'spinner-dark': pending }"
        input-class="button bg-grey-dark text-white w-full hide-on-spinner"
        type="submit"
        :label="$t('signup.signup')"
      />
    </FormulateForm>

    <div class="flex flex-col pb-3">
      <!--<div>{{ $t('signup.account_exists') }}</div>-->
      <button class="secondary w-full" @click="$router.push('/auth/login')">
        {{ $t('signup.account_exists') }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['notAuthenticated'],
  auth: false,
  data() {
    return {
      pending: false,
      guest: {},
    }
  },
  methods: {
    async localSignUp() {
      this.pending = true
      try {
        await this.$axios.post(`/api/users`, {
          ...this.guest,
          master: this.$config.appMasterKey,
        })
        this.$router.push('/auth/signup-success')
      } catch (error) {
        this.$errorHandler({ prefix: 'signup', error })
        this.pending = false
      }
    },
  },
}
</script>
