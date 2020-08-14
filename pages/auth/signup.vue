<template>
  <div class="container prose max-w-xl mx-auto">
    <h1 class="py-10">{{ $t('signup.title') }}</h1>
    <p>{{ $t('signup.text') }}</p>
    <FormulateForm v-model="guest" @submit="localSignUp">
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
        validation="bail|required"
        placeholder="******************"
      />
      <FormulateInput
        type="checkbox"
        :label="$t('signup.accept_terms')"
        validation="required"
      />
      <FormulateInput
        type="checkbox"
        :label="$t('signup.updates_offers_consent')"
        validation="required"
      />
      <FormulateInput
        type="submit"
        input-class="primary w-full"
        :label="$t('signup.signup')"
      />
    </FormulateForm>

    <button class="secondary w-full" @click="$router.push('/auth/login')">
      {{ $t('signup.account_exists') }}
    </button>

    <div class="relative my-4">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t"></div>
      </div>
      <div class="relative flex justify-center text-sm leading-5">
        <span class="px-2 bg-primary-lightest">
          {{ $t('signup.register_with') }}
        </span>
      </div>
    </div>

    <div class="flex">
      <div>
        <button class="secondary my-5" @click="socialLogin('facebook')">
          {{ $t('signup.facebook') }}
        </button>
      </div>
      <div>
        <button class="secondary my-5" @click="socialLogin('google')">
          {{ $t('signup.google') }}
        </button>
      </div>
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
    async localSignUp() {
      try {
        await this.$axios.post(`/api/users`, {
          ...this.guest,
          master: this.$config.appMasterKey,
        })
        this.$router.push('signup/success')
      } catch (error) {
        this.$errorHandler({ error, type: 'signup' })
      }
    },
  },
}
</script>
