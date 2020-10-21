<template>
  <div class="container prose">
    <h1 class="text-center pt-16 pb-8">{{ $t('edit_product.title') }}</h1>
    <FormulateForm @submit="updateProduct">
      <div class="relative w-full flex justify-center">
        <FormulateInput
          class="w-full"
          type="image"
          name="picture"
          :label="$t('edit_product.image')"
          :uploader="uploadProductImage"
          element-class="relative h-64 w-full preview-image border-2 border-dashed "
          input-class="absolute top-0 left-0 h-full w-full z-20 opacity-0"
        />
        <div class="absolute top-0 flex h-full w-1/2 items-center z-1">
          <div>
            <img class="mx-auto" src="/img/icons/add-pic.svg" />
            <span class="mx-auto text-center">{{
              $t('edit_product.upload_product_image')
            }}</span>
          </div>
        </div>
      </div>
      <FormulateInput
        type="text"
        name="title"
        :label="$t('edit_product.name')"
        :placeholder="$t('edit_product.name_placeholder')"
        :value="product.title"
        validation="required"
        @input="editProduct({ _id: product._id, title: $event })"
      />
      <FormulateInput
        type="textarea"
        name="description"
        :value="product.description"
        :label="$t('edit_product.description')"
        :placeholder="$t('edit_product.description_placeholder')"
        validation="required"
        @input="editProduct({ _id: product._id, description: $event })"
      />
      <FormulateInput
        type="text"
        name="category"
        :label="$t('edit_product.category')"
        :value="product.category"
        validation="required"
        @input="editProduct({ _id: product._id, category: $event })"
      />
      <FormulateInput type="submit" :label="$t('edit_product.submit')" />
    </FormulateForm>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  async fetch({ store }) {
    try {
      if (!store.getters['products/products'].length > 0)
        await store.dispatch('products/getProducts')
    } catch (e) {
      console.error(e)
    }
  },
  computed: {
    ...mapGetters('products', { products: 'products' }),
    product() {
      const found = this.products.find(
        (element) => element._id === this.$route.params.id
      )
      return found || {}
    },
  },
  methods: {
    ...mapMutations('products', { editProduct: 'editProduct' }),
    async uploadProductImage(file, progress, error, options) {
      const formData = new FormData()
      formData.append('file', file)
      try {
        const imgLocal = await this.$axios.$post(`/api/media/product`, formData)
        // this.updateActiveShopImages({ cover: imgLocal })
        this.product.picture = imgLocal // TODO mutate store
      } catch (err) {
        // TODO handle error
        console.error(err)
      }
    },
    async updateProduct() {
      console.log('update product')
      console.log(this.product)
      try {
        await this.$axios.$put(
          `/api/products/${this.product._id}`,
          this.product
        )
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>
