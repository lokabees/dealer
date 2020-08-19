<template>
  <div>
    <h1>{{ $t('reset_password_success.title') }}</h1>
    <p>{{ $t('reset_password_success.text') }}</p>
    <button @click="$router.push('/auth/login')" class="primary">
      {{ $t('reset_password_success.button') }}
    </button>
  </div>
</template>

<script>
export default {}
</script>
