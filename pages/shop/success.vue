<template>
  <div class="container prose max-w-xl mx-auto">
    <h1>{{ $t('shop_registration_wizard.success.title') }}</h1>
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
    <button class="primary" @click="$router.push('/')">
      {{ $t('shop_registration_wizard.success.view_store') }}
    </button>
  </div>
</template>

<script>
export default {}
</script>
