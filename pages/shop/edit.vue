<template>
  <div class="container prose p-2">
    <Modal>
      <template v-slot:buttons>
        <button @click="hideModal">{{ $t('login.ok') }}</button>
      </template>
    </Modal>
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
          :value="shop.name"
          name="name"
          type="text"
          :label="$t('edit_shop.shop_name')"
          :placeholder="$t('edit_shop.shop_name_placeholder')"
          validation="required"
          @input="updateActiveShop({ name: $event })"
        />
        <!--v-model="shop.published"-->
        <FormulateInput
          :value="shop.published"
          name="visible"
          type="checkbox"
          :label="$t('edit_shop.visibility')"
          input-class="toggle-checkbox"
          element-class="toggle"
          @input="updateActiveShop({ published: $event })"
        />
        <span>{{ $t('edit_shop.visibility_hint') }}</span>
        <!--v-model="shop.categories"-->
        <FormulateInput
          :value="shop.categories"
          type="shopCategories"
          :options="shopCategories"
          @input="updateActiveShop({ categories: $event })"
        />
        <!--v-model="shop.address" -->
        <FormulateInput
          :value="shop.address"
          type="addressInput"
          @input="updateActiveShop({ address: $event })"
        />
        <!---->
        <FormulateInput
          :value="shop.description"
          type="textarea"
          name="description"
          :placeholder="$t('edit_shop.description_placeholder')"
          :label="$t('edit_shop.description')"
          validation="required"
          @input="updateActiveShop({ description: $event })"
        />
      </div>
      <div v-show="tab === 2">
        <!--v-model="shop.openingHours"-->
        <FormulateInput
          :value="shop.openingHours"
          type="openingHours"
          @input="updateActiveShop({ openingHours: $event })"
        />
      </div>
      <FormulateInput type="submit" :label="$t('edit_shop.submit')" />
    </FormulateForm>
  </div>
</template>

<script>
import { clone } from 'lodash'
import { mapMutations } from 'vuex'
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
      shop: {
        ...clone(this.$store.getters['shops/activeShop']),
        address: { ...this.$store.getters['shops/activeShop']?.address } || {},
      },
    }
  },
  methods: {
    ...mapMutations('modal', {
      showModal: 'showModal',
      hideModal: 'hideModal',
    }),
    async save() {
      try {
        const q = this.getAddressString()
        const address = await this.$axios.$get('/api/maps/suggest', {
          params: { q },
        })
        this.shop.address = address

        console.log(this.shop)

        const updatedShop = await this.$axios.$put(
          `/api/shops/${this.shop._id}`,
          this.shop
        )
        this.$store.commit('shops/setActiveShop', updatedShop)
        this.$router.push('/')
      } catch (error) {
        console.error(error)
        const { data } = error?.response
        this.showModal(error + '\n' + JSON.stringify(data))
      }
    },
    updateActiveShop(newShop) {
      this.$store.commit('shops/updateActiveShop', newShop)
    },
    getAddressString() {
      const { street, number, postcode, city } = this.shop.address
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
