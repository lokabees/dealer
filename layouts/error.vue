<template>
  <div class="flex flex-col text-center">
    <h1 class="leading-tight">{{ $t('error.error_occured') }}</h1>
    <p>{{ $t('error.continue_home') }}</p>
    <button class="primary" @click="$router.push('/')">
      {{ $t('error.go_home') }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
