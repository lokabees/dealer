<template>
  <div class="container prose">
    <h1>{{ $t('edit_shop.title') }}</h1>
    <FormulateForm @submit="save">
      <FormulateInput
        v-model="shop.name"
        name="name"
        type="text"
        :label="$t('edit_shop.shop_name')"
        :placeholder="$t('edit_shop.shop_name_placeholder')"
        validation="required"
      />
      <FormulateInput
        v-model="shop.published"
        name="visible"
        type="checkbox"
        :label="$t('edit_shop.visibility')"
      />
      <span>{{ $t('edit_shop.visibility_hint') }}</span>
      <FormulateInput
        v-model="shop.categories"
        name="categories"
        type="checkbox"
        :options="shopCategories"
        :label="$t('edit_shop.categories')"
      />
      <FormulateInput type="group" name="address">
        <FormulateInput
          v-model="shop.address.street"
          type="text"
          name="street"
          :placeholder="$t('edit_shop.street_placeholder')"
          :label="$t('edit_shop.street')"
          validation="required"
        />
        <FormulateInput
          v-model="shop.address.number"
          type="text"
          name="number"
          :placeholder="$t('edit_shop.number_placeholder')"
          :label="$t('edit_shop.number')"
          validation="required"
        />
        <FormulateInput
          v-model="shop.address.postcode"
          type="text"
          name="postcode"
          :placeholder="$t('edit_shop.postal_code_placeholder')"
          :label="$t('edit_shop.postal_code')"
          validation="required"
        />
        <FormulateInput
          v-model="shop.address.city"
          type="text"
          name="city"
          :placeholder="$t('edit_shop.city_placeholder')"
          :label="$t('edit_shop.city')"
          validation="required"
        />
      </FormulateInput>
      <FormulateInput
        v-model="shop.description"
        type="textarea"
        name="description"
        :placeholder="$t('edit_shop.description_placeholder')"
        :label="$t('edit_shop.description')"
        validation="required"
      />
      <FormulateInput type="submit" :label="$t('edit_shop.submit')" />
    </FormulateForm>
    <FormulateInput v-model="shop.openingHours" type="openingHours" />
  </div>
</template>

<script>
export default {
  middleware: ['authenticated'],
  async asyncData({ $axios }) {
    try {
      const shopCategories = await $axios.$get('/api/shops/categories')
      return { shopCategories }
    } catch (e) {
      console.error(e)
      return { shopCategories: {} }
    }
  },
  data() {
    return {
      shop: {
        ...this.$store.getters['shops/activeShop'],
        address: { ...this.$store.getters['shops/activeShop']?.address } || {},
        openingHours: {
          monday: {
            open: '09:00',
            close: '12:00',
            breaks: [{}],
          },
          tuesday: {
            breaks: [{}],
          },
          wednesday: {
            breaks: [{}],
          },
          thursday: {
            breaks: [{}],
          },
          friday: {
            breaks: [{}],
          },
          saturday: {
            breaks: [{}],
          },
          sunday: {
            breaks: [{}],
          },
        },
      },
    }
  },
  mounted() {
    console.log(this.shop)
  },
  methods: {
    async save() {
      try {
        const q = this.getAddressString()
        const address = await this.$axios.$get('/api/maps/suggest', {
          params: { q },
        })
        console.log(this.shop)

        this.shop.address = address
        /*
        const updatedShop = await this.$axios.$put(
          `/api/shops/${this.shop._id}`,
          this.shop
        )
        this.$store.commit('shops/setActiveShop', updatedShop)
        // this.$router.push('/') */
      } catch (e) {
        console.error(e)
      }
    },
    getAddressString() {
      const { street, number, postcode, city } = this.shop.address
      return `${street} ${number}, ${postcode} ${city}`
    },
  },
}
</script>
