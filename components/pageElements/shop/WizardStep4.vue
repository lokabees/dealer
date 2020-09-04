<template>
  <div class="container prose max-w-xl mx-auto">
    <h1>{{ $t('shop_registration_wizard.step_4.title') }}</h1>
    <p>
      {{ $t('shop_registration_wizard.step_4.text') }}
    </p>
    <FormulateForm v-model="shop.contact" @submit="$emit('submit')">
      <FormulateInput
        type="text"
        name="phone"
        :placeholder="$t('shop_registration_wizard.step_4.phone_placeholder')"
        :label="$t('shop_registration_wizard.step_4.phone')"
      />
      <FormulateInput
        type="text"
        name="whatsapp"
        :placeholder="
          $t('shop_registration_wizard.step_4.whatsapp_placeholder')
        "
        :label="$t('shop_registration_wizard.step_4.whatsapp')"
      />
      <FormulateInput
        type="text"
        name="email"
        :placeholder="$t('shop_registration_wizard.step_4.email_placeholder')"
        :label="$t('shop_registration_wizard.step_4.email')"
      />
      <FormulateInput
        type="text"
        name="website"
        :placeholder="$t('shop_registration_wizard.step_4.website_placeholder')"
        :label="$t('shop_registration_wizard.step_4.website')"
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
