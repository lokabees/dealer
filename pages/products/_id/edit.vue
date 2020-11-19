<template>
  <div class="container max-w-2xl pb-16 px-2">
    <Modal
      :visible="unsavedChangesModal"
      :message="$t('edit_product.unsaved_changes')"
    >
      <template v-slot:buttons>
        <button
          :class="{ 'spinner-light': pending.discard }"
          @click="discardChanges"
        >
          {{ $t('edit_product.discard_changes') }}
        </button>
        <button
          :class="{ 'spinner-dark': pending.save }"
          class="primary"
          @click="unsavedChangesModal = false"
        >
          {{ $t('edit_product.save') }}
        </button>
      </template>
    </Modal>
    <h1
      class="text-4xl text-center font-serif font-black text-grey-dark pt-16 pb-8"
    >
      {{ $t('edit_product.title') }}
    </h1>
    <FormulateForm @submit="updateProduct">
      <ImageUpload
        :label="$t('edit_product.image')"
        upload-url="/api/media/product"
        :value="product.picture"
        @uploaded="editProduct({ _id: product._id, picture: $event })"
        @delete="editProduct({ _id: product._id, picture: {} })"
      />
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
      <FormulateInput
        :class="{ 'spinner-dark': pending.save }"
        input-class="button bg-grey-dark text-white w-full hide-on-spinner"
        type="submit"
        :label="$t('edit_product.submit')"
      />
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
    } catch (error) {
      this.$errorHandler({ prefix: 'edit_product', error })
    }
  },
  data() {
    return {
      unsavedChanges: false,
      unsavedChangesModal: false,
      pending: { discard: false, save: false },
    }
  },
  beforeRouteLeave(to, from, next) {
    this.nextRoute = to.path
    if (this.unsavedChanges) this.unsavedChangesModal = true
    else next()
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
  watch: {
    product: {
      deep: true,
      handler() {
        this.unsavedChanges = true
      },
    },
  },
  methods: {
    ...mapMutations('products', { editProduct: 'editProduct' }),
    async discardChanges() {
      this.pending.discard = true
      try {
        await this.$store.dispatch('products/getProducts')
        this.unsavedChanges = false
        this.$router.push(this.nextRoute)
      } catch (error) {
        this.pending.discard = false
        this.$errorHandler({ prefix: 'user', error })
      }
    },
    async uploadProductImage(file, progress, error, options) {
      const formData = new FormData()
      formData.append('file', file)
      try {
        const imgLocal = await this.$axios.$post(`/api/media/product`, formData)
        // this.updateActiveShopImages({ cover: imgLocal })
        this.product.picture = imgLocal // TODO mutate store
      } catch (error) {
        this.$errorHandler({ prefix: 'edit_product', error })
      }
    },
    async updateProduct() {
      this.pending.save = true
      try {
        await this.$axios.$put(
          `/api/products/${this.product._id}`,
          this.product
        )
        this.unsavedChanges = false
        this.$router.push('/products')
      } catch (error) {
        this.pending.save = false
        this.unsavedChangesModal = false
        this.$errorHandler({ prefix: 'edit_product', error })
      }
    },
  },
}
</script>
