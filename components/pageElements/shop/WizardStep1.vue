<template>
  <div class="container prose max-w-xl mx-auto">
    <h1 class="text-center pt-16">
      {{ $t('shop_registration_wizard.step_1.title') }}
    </h1>
    <p class="text-center pb-8">
      {{ $t('shop_registration_wizard.step_1.text') }}
    </p>
    <FormulateForm @submit="submit">
      <!--shop name-->
      <FormulateInput
        :value="activeShop.name"
        type="text"
        name="name"
        :placeholder="$t('shop_registration_wizard.step_1.name_placeholder')"
        :label="$t('shop_registration_wizard.step_1.name')"
        validation="bail|required|max:50"
        @input="updateActiveShop({ name: $event })"
      />
      <!--owner name-->
      <!--
      <FormulateInput
        :value="activeShop.owner"
        type="text"
        name="owner"
        :placeholder="
          $t('shop_registration_wizard.step_1.shop_owner_placeholder')
        "
        :label="$t('shop_registration_wizard.step_1.shop_owner')"
        validation="required"
        @input="updateActiveShop({ owner: $event })"
      />
    -->
      <!--shop address-->
      <FormulateInput name="address" type="addressInput" />
      <!--shop description-->
      <FormulateInput
        :value="activeShop.description"
        type="textarea"
        name="description"
        :placeholder="
          $t('shop_registration_wizard.step_1.description_placeholder')
        "
        :label="$t('shop_registration_wizard.step_1.description')"
        validation="bail|required"
        @input="updateActiveShop({ description: $event })"
      />
      <!--shop categories-->
      <FormulateInput
        name="categories"
        type="shopCategories"
        :options="shopCategories"
        :label="$t('shop_registration_wizard.step_1.categories')"
        validation="bail|required|max3"
        :validation-rules="{
          max3: ({ value }) => value.length < 4,
        }"
        :validation-messages="{
          max3: $t('validation_errors.max_3_categories'),
        }"
      />
      <FormulateInput
        type="submit"
        :label="$t('shop_registration_wizard.next')"
      />
    </FormulateForm>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  props: {
    shopCategories: {
      type: Object,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters('shops', {
      activeShop: 'activeShop',
    }),
  },
  watch: {
    shop(newShop, oldShop) {
      this.$emit('input', newShop)
    },
  },
  methods: {
    ...mapMutations('shops', {
      updateActiveShop: 'updateActiveShop',
    }),
    hallo(val) {
      console.log(val)
      return val < 4
    },
    async submit() {
      try {
        const q = this.getAddressString()
        const address = await this.$axios.$get('/api/maps/suggest', {
          params: { q },
        })
        this.updateActiveShop({ address })
        this.$emit('submit')
      } catch (error) {
        console.error(error)
        // error 404: address not found
        this.showModal(error)
      }
    },
    getAddressString() {
      const { street, number, postcode, city } = this.activeShop.address
      return `${street} ${number}, ${postcode} ${city}`
    },
  },
}
</script>
