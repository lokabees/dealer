<template>
  <div class="container prose">
    <h1 class="text-center pt-16 pb-8">{{ $t('edit_product.title') }}</h1>
    <FormulateForm @submit="updateProduct">
      <FormulateInput
        type="image"
        name="picture"
        :label="$t('edit_product.image')"
        validation="required"
      />
      <FormulateInput
        type="text"
        name="title"
        :label="$t('edit_product.name')"
        :placeholder="$t('edit_product.name_placeholder')"
        :value="product.title"
        validation="required"
      />
      <FormulateInput
        type="textarea"
        name="description"
        :value="product.description"
        :label="$t('edit_product.description')"
        :placeholder="$t('edit_product.description_placeholder')"
        validation="required"
      />
      <FormulateInput
        type="text"
        name="category"
        :label="$t('edit_product.category')"
        :value="product.category"
        validation="required"
      />
      <FormulateInput type="submit" :label="$t('edit_product.submit')" />
    </FormulateForm>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('products', { products: 'products' }),
    product() {
      const found = this.products.find(
        (element) => element._id === this.$route.params.id
      )
      return found
    },
  },
  methods: {
    updateProduct() {
      console.log('update product')
      console.log(this.product)
    },
  },
}
</script>
