<template>
  <div class="container prose max-w-xl mx-auto">
    <h1>{{ $t('shop_registration_wizard.step_2.title') }}</h1>
    <p>
      {{ $t('shop_registration_wizard.step_2.text') }}
    </p>
    <FormulateForm @submit="$emit('submit')">
      <FormulateInput v-model="initialShop.openingHours" type="openingHours" />
      <FormulateInput
        type="submit"
        :label="$t('shop_registration_wizard.next')"
      />
    </FormulateForm>
  </div>
</template>

<script>
export default {
  props: {
    initialShop: { type: Object, default: () => {}, required: true },
  },
}
</script>
