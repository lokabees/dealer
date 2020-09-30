<template>
  <FormulateInput type="group" name="address">
    <!-- TODO custom validation: street and name can have spaces, but no numbers-->
    <div class="sm:flex">
      <div class="w-full">
        <FormulateInput
          v-model="context.model.street"
          outer-class="flex-initial"
          type="text"
          name="street"
          :placeholder="
            $t('shop_registration_wizard.step_1.street_placeholder')
          "
          :label="$t('shop_registration_wizard.step_1.street')"
          validation="required"
        />
      </div>
      <div>
        <FormulateInput
          v-model="context.model.number"
          outer-class="flex-initial"
          type="text"
          name="number"
          :placeholder="
            $t('shop_registration_wizard.step_1.number_placeholder')
          "
          :label="$t('shop_registration_wizard.step_1.number')"
          validation="required|number"
        />
      </div>
    </div>
    <div class="sm:flex">
      <div>
        <FormulateInput
          v-model="context.model.postcode"
          type="text"
          name="postcode"
          :placeholder="
            $t('shop_registration_wizard.step_1.postal_code_placeholder')
          "
          :label="$t('shop_registration_wizard.step_1.postal_code')"
          validation="required"
        />
      </div>
      <div class="w-full">
        <FormulateInput
          v-model="context.model.city"
          type="text"
          name="city"
          :placeholder="$t('shop_registration_wizard.step_1.city_placeholder')"
          :label="$t('shop_registration_wizard.step_1.city')"
          validation="required"
        />
      </div>
    </div>
  </FormulateInput>
</template>

<script>
export default {
  props: {
    context: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
}
</script>
