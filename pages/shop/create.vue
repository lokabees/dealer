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
      :start-index="4"
      @on-complete="$router.push('/shop/success')"
    >
      <span slot="title"></span>

      <!-- STEP 1-->
      <tab-content>
        <ShopInfo :shop-categories="shopCategories" @submit="submitStep1" />
      </tab-content>

      <!-- STEP 2-->
      <tab-content>
        <OpeningHours @submit="submitStep2" />
      </tab-content>

      <!-- STEP 3-->
      <tab-content>
        <DeliveryOptions @submit="submitStep3" />
      </tab-content>

      <!-- STEP 4-->
      <tab-content>
        <CustomerContact @submit="submitStep4" />
      </tab-content>

      <!-- STEP 5-->
      <tab-content>
        <ShopImages @submit="submitStep5" />
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
        <div class="wizard-footer-right">
          <wizard-button
            v-if="props.isLastStep"
            class="wizard-footer-right finish-button"
            :style="props.fillButtonStyle"
            @click.native="createShop"
            >{{
              props.isLastStep
                ? $t('shop_registration_wizard.done')
                : $t('shop_registration_wizard.next')
            }}
          </wizard-button>
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
      return { shopCategories: [] }
    }
  },
  data() {
    return {
      shop: { address: [{}] },
    }
  },
  methods: {
    ...mapMutations('modal', {
      showModal: 'showModal',
      hideModal: 'hideModal',
    }),

    submitStep1(shopInfo) {
      this.shop = { ...shopInfo }
      this.$refs.wizard.nextTab()
    },
    submitStep2(openingHours) {
      this.shop.openingHours = openingHours
      this.$refs.wizard.nextTab()
    },
    submitStep3(delivery) {
      this.shop.delivery = { ...delivery }
      this.$refs.wizard.nextTab()
    },
    submitStep4(contact) {
      this.shop.contact = { ...contact }
      this.$refs.wizard.nextTab()
    },
    async submitStep5(creatives) {
      this.shop.images = { ...creatives }
      console.log(this.shop)
      try {
        await this.$axios.$post('/api/shops', this.shop)
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
