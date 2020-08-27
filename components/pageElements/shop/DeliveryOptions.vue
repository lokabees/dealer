<template>
  <div class="container prose max-w-xl mx-auto">
    <h1>{{ $t('shop_registration_wizard.step_3.title') }}</h1>
    <p>
      {{ $t('shop_registration_wizard.step_3.text') }}
    </p>
    <FormulateForm v-model="delivery" @submit="submit">
      <FormulateInput
        name="delivery"
        :options="{
          pickUp: $t('shop_registration_wizard.step_3.pickup'),
          localDelivery: $t('shop_registration_wizard.step_3.delivery'),
          mail: $t('shop_registration_wizard.step_3.ship'),
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
  data() {
    return {
      delivery: {},
    }
  },
  methods: {
    submit() {
      this.$emit('submit', this.delivery)
    },
  },
}
</script>
