<template>
  <div class="container">
    <h1 class="title">{{ $t('signup.signup_successful') }}</h1>
    <p>{{ $t('signup.check_inbox') }}</p>
    <button @click="$router.push('/login')">{{ $t('signup.to_login') }}</button>
  </div>
</template>

<script>
export default {
  auth: false,
}
</script>
