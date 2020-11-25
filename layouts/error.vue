<template>
  <div class="flex flex-col text-center">
    <h1 class="leading-tight">{{ $t('error.error_occured') }}</h1>
    <p>{{ $t('error.continue_home') }}</p>
    <a class="button primary" :href="`${$config.appUrl}`">
      {{ $t('error.go_home') }}
    </a>
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
