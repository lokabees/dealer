<template>
  <div class="container max-w-md p-3 md:p-0">
    <div class="prose lg:prose-lg text-center">
      <h1 class="py-10">Login with your credentials</h1>
    </div>
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

      <FormulateInput type="submit" :label="$t('login.login')" />
    </FormulateForm>

    <button class="secondary w-full" @click="$router.push('/auth/signup')">
      {{ $t('login.signup') }}
    </button>

    <div class="relative my-8">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t"></div>
      </div>
      <div class="relative flex justify-center text-sm leading-5">
        <span class="px-2 bg-primary-lightest">
          {{ $t('login.sign_up_with') }}
        </span>
      </div>
    </div>

    <div class="flex flex-col md:flex-row">
      <button
        class="secondary icon-l w-full text-center"
        @click="socialLogin('facebook')"
      >
        <icon name="facebook" /> {{ $t('login.facebook') }}
      </button>
      <div class="m-2"></div>
      <button class="secondary icon-l w-full" @click="socialLogin('google')">
        <icon name="google" /> {{ $t('login.google') }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
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
