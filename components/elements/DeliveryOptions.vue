<template>
  <div>
    <div
      v-for="option in options"
      :key="option.value"
      class="flex border border-grey-light p-4 my-2 items-center"
    >
      <div class="pr-2">
        <input
          :value="option.value"
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
export default {
  props: {
    context: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
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
  methods: {
    select(value) {
      if (!this.context.model.includes(value)) {
        if (this.context.model) this.context.model.push(value)
        else this.context.model = [value]
      } else this.context.model.splice(value, 1)
    },
  },
}
</script>
