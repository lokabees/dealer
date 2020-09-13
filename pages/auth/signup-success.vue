<template>
  <div class="container max-w-md p-3 md:p-0 flex h-screen">
    <div class="m-auto">
      <div class="flex justify-center text-primary my-8">
        <icon name="checkmark-circle-outline" height="100" width="100" />
      </div>
      <div class="prose lg:prose-lg text-center">
        <h2 class="leading-tight">{{ $t('signup.signup_successful') }}</h2>
        <p>{{ $t('signup.check_inbox') }}</p>
      </div>

      <button class="primary w-full mt-8" @click="$router.push('/auth/login')">
        {{ $t('signup.to_login') }}
      </button>
    </div>
  </div>
</template>
