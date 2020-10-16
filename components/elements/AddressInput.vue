<template>
  <div>
    <!-- TODO custom validation: street and name can have spaces, but no numbers-->
    <div class="sm:flex">
      <div class="w-full">
        <FormulateInput
          :value="activeShop.address.street"
          outer-class="flex-initial pr-1"
          type="text"
          name="street"
          :placeholder="
            $t('shop_registration_wizard.step_1.street_placeholder')
          "
          :label="$t('shop_registration_wizard.step_1.street')"
          validation="required|noNumbers"
          @input="updateActiveShopAddress({ street: $event })"
        />
      </div>
      <div>
        <FormulateInput
          :value="activeShop.address.number"
          outer-class="flex-initial pl-1"
          type="text"
          name="number"
          :placeholder="
            $t('shop_registration_wizard.step_1.number_placeholder')
          "
          :label="$t('shop_registration_wizard.step_1.number')"
          validation="required|number"
          @input="updateActiveShopAddress({ number: $event })"
        />
      </div>
    </div>
    <div class="sm:flex">
      <div>
        <FormulateInput
          :value="activeShop.address.postcode"
          outer-class="pr-1"
          type="text"
          name="postcode"
          :placeholder="
            $t('shop_registration_wizard.step_1.postal_code_placeholder')
          "
          :label="$t('shop_registration_wizard.step_1.postal_code')"
          validation="required"
          @input="updateActiveShopAddress({ postcode: $event })"
        />
      </div>
      <div class="w-full">
        <FormulateInput
          :value="activeShop.address.city"
          outer-class="pl-1"
          type="text"
          name="city"
          :placeholder="$t('shop_registration_wizard.step_1.city_placeholder')"
          :label="$t('shop_registration_wizard.step_1.city')"
          validation="required"
          @input="updateActiveShopAddress({ city: $event })"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters('shops', {
      activeShop: 'activeShop',
    }),
  },
  methods: {
    ...mapMutations('shops', {
      updateActiveShopAddress: 'updateActiveShopAddress',
    }),
  },
}
</script>
