<template>
  <div class="container max-w-md p-3">
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
      <FormulateInput
        type="submit"
        input-class="primary w-full"
        :label="$t('login.login')"
      />
    </FormulateForm>

    <button class="secondary w-full" @click="$router.push('/signup')">
      {{ $t('login.signup') }}
    </button>

    <div class="relative my-4">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t"></div>
      </div>
      <div class="relative flex justify-center text-sm leading-5">
        <span class="px-2 bg-primary-lightest">
          {{ $t('login.sign_up_with') }}
        </span>
      </div>
    </div>

    <div class="flex">
      <div class="mx-auto">
        <button class="secondary my-5" @click="socialLogin('facebook')">
          <unicon name="facebook-f" class="primary"></unicon>
          {{ $t('login.facebook') }}
        </button>
      </div>
      <div class="mx-auto">
        <button class="secondary my-5" @click="socialLogin('google')">
          <unicon name="google" fill="primary"></unicon>
          {{ $t('login.google') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  auth: 'guest',
  data() {
    return {
      guest: {},
    }
  },
  methods: {
    async localLogin() {
      try {
        await this.$auth.loginWith(`local`, {
          data: { ...this.guest },
          params: { master: this.$config.appMasterKey },
        })
        this.$router.push('/')
      } catch (error) {
        this.$errorHandler({ error, type: 'login' })
      }
    },
    async socialLogin(provider) {
      try {
        await this.$auth.loginWith(provider)
      } catch (error) {
        this.$errorHandler({ error, type: 'login' })
      }
    },
  },
}
</script>
