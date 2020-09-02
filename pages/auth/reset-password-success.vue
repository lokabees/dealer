<template>
  <div class="container prose">
    <h1>{{ $t('reset_password_success.title') }}</h1>
    <p>{{ $t('reset_password_success.text') }}</p>
    <button class="primary" @click="$router.push('/auth/login')">
      {{ $t('reset_password_success.button') }}
    </button>
  </div>
</template>

<script>
export default {}
</script>
