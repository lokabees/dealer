<template>
  <div class="container prose">
    <ErrorModal :visible="!!error">
      <template v-slot:buttons>
        <button @click="error = null">{{ $t('add_product.ok') }}</button>
      </template>
      {{ $t(`add_product.errors.${error}`) }}</ErrorModal
    >
    <h1 class="text-center pt-16 pb-8">{{ $t('add_product.title') }}</h1>
    <FormulateForm v-model="product" @submit="addProduct">
      <div class="relative w-full flex justify-center">
        <FormulateInput
          class="w-full"
          type="image"
          name="img"
          :label="$t('add_product.image')"
          :uploader="uploadProductImage"
          upload-behavior="delayed"
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
        :label="$t('add_product.name')"
        :placeholder="$t('add_product.name_placeholder')"
        validation="required"
      />
      <FormulateInput
        type="textarea"
        name="description"
        :label="$t('add_product.description')"
        :placeholder="$t('add_product.description_placeholder')"
        validation="required"
      />
      <FormulateInput
        type="text"
        name="category"
        :label="$t('add_product.category')"
        :placeholder="$t('add_product.category_placeholder')"
        validation="required"
      />
      <FormulateInput
        :class="{ 'spinner-dark': pending }"
        input-class="button bg-grey-dark text-white w-full hide-on-spinner"
        type="submit"
        :label="$t('add_product.submit')"
      />
    </FormulateForm>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      product: {},
      pending: false,
      error: null,
    }
  },
  computed: {
    ...mapGetters('shops', { activeShop: 'activeShop' }),
    ...mapGetters('products', { products: 'products' }),
  },
  methods: {
    ...mapMutations('products', { addProductInStore: 'addProduct' }),
    async uploadProductImage(file, progress, error, options) {
      const formData = new FormData()
      formData.append('file', file)
      try {
        const imgLocal = await this.$axios.$post(`/api/media/product`, formData)
        // this.updateActiveShopImages({ cover: imgLocal })
        this.product.picture = imgLocal
      } catch (err) {
        // TODO handle error
        console.error(err)
      }
    },
    async addProduct() {
      if (!this.activeShop._id) return
      this.product.shop = this.activeShop._id
      this.pending = true
      try {
        const product = await this.$axios.$post('/api/products', this.product)
        this.addProductInStore(product)
        if (this.products.length === 1) this.$router.push('/products/success')
        else this.$router.push('/products')
      } catch (e) {
        console.error(e)
        this.pending = false
        const status = e?.response?.status || 500
        this.error = status
      }
    },
  },
}
</script>
<style>
.spinner-dark .hide-on-spinner {
  @apply text-grey-dark;
}
</style>
