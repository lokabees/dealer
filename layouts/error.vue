<template>
  <div>
    <h1 class="leading-tight">{{ $t('error.error_occured') }}</h1>
    <p>{{ $t('error.continue_home') }}</p>
    <button @click="$router.push('/')">{{ $t('error.go_home') }}</button>
  </div>
</template>

<script>
export default {
  props: ['error'],
}
</script>
