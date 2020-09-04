<template>
  <div class="container prose max-w-xl mx-auto">
    <h1>{{ $t('shop_registration_wizard.step_3.title') }}</h1>
    <p>
      {{ $t('shop_registration_wizard.step_3.text') }}
    </p>
    <FormulateForm @submit="$emit('submit')">
      <FormulateInput
        v-model="shop.delivery"
        name="delivery"
        :options="{
          LD: $t('shop_registration_wizard.step_3.delivery'),
          PU: $t('shop_registration_wizard.step_3.pickup'),
          MD: $t('shop_registration_wizard.step_3.ship'),
        }"
        type="checkbox"
        label="This is a label for all the options"
      />
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
  data() {
    return {
      shop: this.initialShop || {},
    }
  },
  watch: {
    shop(newShop, oldShop) {
      this.$emit('input', newShop)
    },
  },
}
</script>
