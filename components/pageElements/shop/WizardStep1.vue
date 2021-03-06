<template>
  <div class="container prose max-w-xl mx-auto">
    <h1>{{ $t('shop_registration_wizard.step_1.title') }}</h1>
    <p>
      {{ $t('shop_registration_wizard.step_1.text') }}
    </p>
    <FormulateForm v-model="shop" @submit="submit">
      <FormulateInput
        type="text"
        name="name"
        :placeholder="$t('shop_registration_wizard.step_1.name_placeholder')"
        :label="$t('shop_registration_wizard.step_1.name')"
        validation="required"
      />
      <FormulateInput
        type="text"
        name="owner"
        :placeholder="
          $t('shop_registration_wizard.step_1.shop_owner_placeholder')
        "
        :label="$t('shop_registration_wizard.step_1.shop_owner')"
        validation="required"
      />
      <FormulateInput type="group" name="address">
        <!-- TODO custom validation: street and name can have spaces, but no numbers-->
        <FormulateInput
          type="text"
          name="street"
          :placeholder="
            $t('shop_registration_wizard.step_1.street_placeholder')
          "
          :label="$t('shop_registration_wizard.step_1.street')"
          validation="required"
        />
        <FormulateInput
          type="text"
          name="number"
          :placeholder="
            $t('shop_registration_wizard.step_1.number_placeholder')
          "
          :label="$t('shop_registration_wizard.step_1.number')"
          validation="required|number"
        />
        <FormulateInput
          type="text"
          name="postcode"
          :placeholder="
            $t('shop_registration_wizard.step_1.postal_code_placeholder')
          "
          :label="$t('shop_registration_wizard.step_1.postal_code')"
          validation="required"
        />
        <FormulateInput
          type="text"
          name="city"
          :placeholder="$t('shop_registration_wizard.step_1.city_placeholder')"
          :label="$t('shop_registration_wizard.step_1.city')"
          validation="required"
        />
      </FormulateInput>
      <FormulateInput
        type="textarea"
        name="description"
        :placeholder="
          $t('shop_registration_wizard.step_1.description_placeholder')
        "
        :label="$t('shop_registration_wizard.step_1.description')"
        validation="required"
      />
      <FormulateInput
        name="categories"
        type="checkbox"
        :options="shopCategories"
        :label="$t('shop_registration_wizard.step_1.categories')"
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
    shopCategories: {
      type: Object,
      default: () => [],
    },
    initialShop: {
      type: Object,
      default: () => {},
      required: true,
    },
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
  methods: {
    async submit() {
      try {
        const q = this.getAddressString()
        const address = await this.$axios.$get('/api/maps/suggest', {
          params: { q },
        })
        this.shop.address[0] = address
        this.$emit('submit')
      } catch (error) {
        console.error(error)
        // error 404: address not found
        this.showModal(error)
      }
    },
    getAddressString() {
      const { street, number, postcode, city } = this.shop.address[0]
      return `${street} ${number}, ${postcode} ${city}`
    },
  },
}
</script>
