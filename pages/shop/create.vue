<template>
  <div>
    <Modal>
      <template v-slot:buttons>
        <button @click="hideModal">{{ $t('login.ok') }}</button>
      </template>
    </Modal>
    <form-wizard
      ref="wizard"
      color="#19ae9d"
      :start-index="0"
      @on-complete="$router.push('/shop/success')"
    >
      <span slot="title"></span>
      <!-- STEP 1-->
      <tab-content>
        <WizardStep1
          :initial-shop="shop"
          :shop-categories="shopCategories"
          @input="updateShop"
          @submit="$refs.wizard.nextTab()"
        />
      </tab-content>

      <!-- STEP 2-->
      <tab-content>
        <WizardStep2
          :initial-shop="shop"
          @input="updateShop"
          @submit="$refs.wizard.nextTab()"
        />
      </tab-content>

      <!-- STEP 3-->
      <tab-content>
        <WizardStep3
          :initial-shop="shop"
          @input="updateShop"
          @submit="$refs.wizard.nextTab()"
        />
      </tab-content>

      <!-- STEP 4-->
      <tab-content>
        <WizardStep4
          :initial-shop="shop"
          @input="updateShop"
          @submit="$refs.wizard.nextTab()"
        />
      </tab-content>

      <!-- STEP 5-->
      <tab-content>
        <WizardStep5
          :initial-shop="shop"
          @input="updateShop"
          @submit="createShop"
        />
      </tab-content>

      <template slot="footer" slot-scope="props">
        <div class="wizard-footer-left">
          <wizard-button
            v-if="props.activeTabIndex > 0 && !props.isLastStep"
            :style="props.fillButtonStyle"
            @click.native="props.prevTab()"
            >{{ $t('shop_registration_wizard.prevous') }}</wizard-button
          >
        </div>
      </template>
    </form-wizard>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  middleware: 'authenticated',
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
        images: {},
        address: [{}],
        openingHours: {
          monday: {
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
  methods: {
    ...mapMutations('modal', {
      showModal: 'showModal',
      hideModal: 'hideModal',
    }),
    updateShop(updatedShop) {
      Object.assign(this.shop, updatedShop)
    },
    async createShop(creatives) {
      try {
        this.shop.address = this.shop.address[0]
        await this.$axios.$post('/api/shops', this.shop)
        this.$router.push('success')
      } catch (error) {
        console.error(error)
        this.showModal(error)
      }
    },
  },
}
</script>
