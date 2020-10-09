<template>
  <div class="container prose max-w-xl mx-auto p-2">
    <div class="flex justify-center text-primary py-4">
      <icon name="checkmark-circle-outline" height="100" width="100" />
    </div>
    <h1 class="pt-8">{{ $t('shop_registration_wizard.success.title') }}</h1>
    <p>
      {{ $t('shop_registration_wizard.success.text1') }}
    </p>
    <p>
      {{ $t('shop_registration_wizard.success.text2') }}
    </p>
    <p>
      {{ $t('shop_registration_wizard.success.text3') }}
    </p>
    <p>
      {{ $t('shop_registration_wizard.success.text4') }}
    </p>
    <button class="primary w-full" @click="$router.push('/')">
      {{ $t('shop_registration_wizard.success.view_shop') }}
    </button>
  </div>
</template>

<script>
export default {}
</script>
