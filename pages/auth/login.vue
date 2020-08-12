<template>
  <div class="container">
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
      <div>
        <button class="secondary my-5" @click="socialLogin('facebook')">
          {{ $t('login.facebook') }}
        </button>
      </div>
      <div>
        <button class="secondary my-5" @click="socialLogin('google')">
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
        await this.$router.push('/')
      } catch (error) {}
    },
    socialLogin(provider) {
      try {
        this.$router.push('/')
      } catch (error) {}
    },
  },
}
</script>
