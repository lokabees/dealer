<template>
  <div class="container prose">
    <h1 class="text-center pt-16 pb-8">{{ $t('add_product.title') }}</h1>
    <FormulateForm v-model="product" @submit="addProduct">
      <div class="relative w-full flex justify-center">
        <FormulateInput
          type="image"
          name="img"
          :label="$t('add_product.image')"
          :uploader="uploadProductImage"
          upload-behavior="delayed"
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
        validation="required"
      />
      <FormulateInput type="submit" :label="$t('add_product.submit')" />
    </FormulateForm>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      product: {},
    }
  },
  computed: {
    ...mapGetters('shops', { activeShop: 'getActiveShop' }),
    ...mapGetters('products', { products: 'products' }),
  },
  methods: {
    ...mapMutations('products', { addProduct: 'addProduct' }),
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
      this.product.shop = this.activeShop._id
      try {
        const product = await this.$axios.$post('/api/products', this.product)
        this.addProduct(product)
        if (this.products.length === 1) this.$router.push('/products/success')
        else this.$router.push('/products')
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>
