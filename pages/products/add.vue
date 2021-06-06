<template>
  <div class="container max-w-2xl pb-16 px-2">
    <Modal
      :visible="unsavedChangesModal"
      :message="$t('add_product.unsaved_changes')"
    >
      <template v-slot:buttons>
        <button
          :class="{ 'spinner-light': pending.discard }"
          @click="discardChanges"
        >
          {{ $t('add_product.discard_changes') }}
        </button>
        <button
          :class="{ 'spinner-dark': pending.save }"
          class="primary"
          @click="unsavedChangesModal = false"
        >
          {{ $t('add_product.stay') }}
        </button>
      </template>
    </Modal>
    <h1
      class="text-4xl text-center font-serif font-black text-grey-dark pt-16 pb-8"
    >
      {{ $t('add_product.title') }}
    </h1>
    <FormulateForm v-model="product" @submit="addProduct">
      <FormulateInput
        type="imageUpload"
        :label="$t('edit_product.image')"
        upload-url="/api/media/product"
        :value="product.picture"
        @uploaded="product.picture = $event"
        @delete="product.picture = {}"
      />
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
        :class="{ 'spinner-dark': pending.save }"
        input-class="button bg-grey-dark text-white w-full hide-on-spinner"
        type="submit"
        :label="$t('add_product.submit')"
      />
    </FormulateForm>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Modal from '../../components/elements/Modal.vue'
export default {
  components: { Modal },
  data() {
    return {
      unsavedChanges: false,
      unsavedChangesModal: false,
      product: { picture: {} },
      pending: { discard: false, save: false },
    }
  },
  beforeRouteLeave(to, from, next) {
    this.nextRoute = to.path
    if (this.unsavedChanges) this.unsavedChangesModal = true
    else next()
  },
  computed: {
    ...mapGetters('shops', { activeShop: 'activeShop' }),
    ...mapGetters('products', { products: 'products' }),
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
    uploaded(e) {
      this.product.picture = e
    },
    ...mapMutations('products', { addProductInStore: 'addProduct' }),
    discardChanges() {
      this.unsavedChanges = false
      this.$router.push(this.nextRoute)
    },
    async addProduct() {
      if (!this.activeShop._id) return
      this.pending.save = true
      this.product.shop = this.activeShop._id

      try {
        delete this.product.img
        const product = await this.$axios.$post('/api/products', this.product)
        this.addProductInStore(product)
        this.unsavedChanges = false
        if (this.products.length === 1) {
          this.$router.push('/products/success')
        } else {
          this.$router.push('/products')
        }
      } catch (error) {
        this.pending.save = false
        this.unsavedChangesModal = false
        this.$errorHandler({ prefix: 'add_product', error })
      }
    },
  },
}
</script>
