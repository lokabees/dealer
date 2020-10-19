<template>
  <div class="container prose p-2">
    <Modal>
      <template v-slot:buttons>
        <button @click="hideModal">{{ $t('login.ok') }}</button>
      </template>
    </Modal>
    <UnsavedChangesModal
      :visible="unsavedChangesModal"
      :message="$t('edit_shop.unsaved_changes')"
    >
      <template v-slot:buttons>
        <button @click="discardChanges">
          {{ $t('edit_shop.discard_changes') }}
        </button>
        <button class="primary" @click="save">
          {{ $t('edit_shop.save_changes') }}
        </button>
      </template>
    </UnsavedChangesModal>
    <h1 class="text-center pt-16 pb-8">{{ $t('edit_shop.title') }}</h1>

    <div class="flex">
      <div class="flex w-1/2" :class="{ active: tab === 1 }">
        <button class="mx-auto capitalize" @click="tab = 1">
          {{ $t('edit_shop.contact_data') }}
        </button>
      </div>
      <div class="flex w-1/2" :class="{ active: tab === 2 }">
        <button class="mx-auto capitalize" @click="tab = 2">
          {{ $t('edit_shop.opening_hours') }}
        </button>
      </div>
    </div>
    <!--v-model="shop.name"-->
    <FormulateForm @submit="save">
      <div v-show="tab === 1">
        <FormulateInput
          :value="activeShop.name"
          name="name"
          type="text"
          :label="$t('edit_shop.shop_name')"
          :placeholder="$t('edit_shop.shop_name_placeholder')"
          validation="required"
          @input="updateActiveShop({ name: $event })"
        />
        <!--v-model="shop.published"-->
        <FormulateInput
          :checked="activeShop.published"
          name="visible"
          type="checkbox"
          :label="$t('edit_shop.visibility')"
          input-class="toggle-checkbox"
          element-class="toggle"
          @input="updateActiveShop({ published: $event })"
        />
        <span>{{ $t('edit_shop.visibility_hint') }}</span>
        <!--v-model="shop.categories"-->
        <FormulateInput type="shopCategories" :options="shopCategories" />
        <!--v-model="shop.address" -->
        <FormulateInput type="addressInput" />
        <!---->
        <FormulateInput
          :value="activeShop.description"
          type="textarea"
          name="description"
          :placeholder="$t('edit_shop.description_placeholder')"
          :label="$t('edit_shop.description')"
          validation="required"
          @input="updateActiveShop({ description: $event })"
        />
      </div>
      <div v-show="tab === 2">
        <FormulateInput type="openingHours" />
      </div>
      <FormulateInput type="submit" :label="$t('edit_shop.submit')" />
    </FormulateForm>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
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
      tab: 1,
      nextRoute: '/',
      unsavedChanges: false,
      unsavedChangesModal: false,
    }
  },
  beforeRouteLeave(to, from, next) {
    this.nextRoute = to.path
    if (this.unsavedChanges) this.unsavedChangesModal = true
    else next()
  },
  computed: {
    ...mapGetters('shops', {
      activeShop: 'activeShop',
    }),
  },
  watch: {
    activeShop: {
      deep: true,
      handler() {
        this.unsavedChanges = true
      },
    },
  },
  methods: {
    ...mapMutations('modal', {
      showModal: 'showModal',
      hideModal: 'hideModal',
    }),
    ...mapMutations('shops', {
      updateActiveShop: 'updateActiveShop',
    }),
    discardChanges() {
      this.$store.dispatch('shops/getActiveShop').then(() => {
        this.unsavedChanges = false
        this.$router.push(this.nextRoute)
      })
    },
    async save() {
      try {
        const q = this.getAddressString()
        const address = await this.$axios.$get('/api/maps/suggest', {
          params: { q },
        })
        this.updateActiveShop({ address })
        const updatedShop = await this.$axios.$put(
          `/api/shops/${this.activeShop._id}`,
          this.activeShop
        )
        this.$store.commit('shops/setActiveShop', updatedShop)
        this.unsavedChanges = false
        this.$router.push('/')
      } catch (error) {
        console.error(error)
        const { data } = error?.response
        this.showModal(error + '\n' + JSON.stringify(data))
      }
    },
    getAddressString() {
      const { street, number, postcode, city } = this.activeShop.address
      return `${street} ${number}, ${postcode} ${city}`
    },
  },
}
</script>

<style lang="scss" scoped>
.active {
  @apply border-b border-black;

  button {
    @apply font-bold;
  }
}
</style>
