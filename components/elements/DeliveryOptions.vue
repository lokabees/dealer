<template>
  <div>
    <div
      v-for="option in options"
      :key="option.value"
      class="flex border border-grey-light p-4 my-2 items-center"
      :class="{ active: isSelected(option.value) }"
    >
      <div class="pr-2">
        <input
          :checked="isSelected(option.value)"
          class="form-checkbox h-6 w-6 rounded-sm text-primary transition duration-150 ease-in-out focus:shadow-none mr-2"
          type="checkbox"
          @input="select(option.value)"
        />
      </div>
      <div>
        <span class="font-bold"> {{ $t(option.title) }} </span><br />
        <span>
          {{ $t(option.text) }}
        </span>
      </div>
      <div class="pl-2">
        <img :src="option.icon" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      selected: {
        LD: false,
        PU: false,
        MD: false,
      },
      value: true,
      options: [
        {
          title: 'shop_registration_wizard.step_3.delivery',
          text: 'shop_registration_wizard.step_3.delivery_text',
          value: 'LD',
          icon: '/img/icons/delivery.svg',
        },
        {
          title: 'shop_registration_wizard.step_3.pickup',
          text: 'shop_registration_wizard.step_3.pickup_text',
          value: 'PU',
          icon: '/img/icons/pickup.svg',
        },
        {
          title: 'shop_registration_wizard.step_3.ship',
          text: 'shop_registration_wizard.step_3.ship_text',
          value: 'MD',
          icon: '/img/icons/ship.svg',
        },
      ],
    }
  },
  computed: {
    ...mapGetters('shops', {
      activeShop: 'activeShop',
    }),
  },
  methods: {
    ...mapMutations('shops', {
      selectActiveShopDeliveryOption: 'selectActiveShopDeliveryOption',
    }),
    select(value) {
      this.selectActiveShopDeliveryOption(value)
    },
    isSelected(value) {
      return this.activeShop.deliveryOptions.includes(value)
    },
  },
}
</script>

<style lang="scss" scoped>
.active {
  @apply border-2 border-primary;
}
</style>
