<template>
  <form-wizard
    ref="wizard"
    color="#19ae9d"
    :start-index="4"
    @on-complete="$router.push('/shop/success')"
  >
    <Modal>
      <template v-slot:buttons>
        <button @click="hideModal">{{ $t('login.ok') }}</button>
      </template>
    </Modal>
    <span slot="title">Titel</span>
    {{ shop }}
    <!-- STEP 1-->
    <tab-content>
      <ShopInfo :shopCategories="shopCategories" @submit="submitStep1" />
    </tab-content>

    <!-- STEP 2-->
    <tab-content>
      <OpeningHours @submit="submitStep2" />
    </tab-content>

    <!-- STEP 3-->
    <tab-content>
      <div class="container prose max-w-xl mx-auto">
        <h1>{{ $t('shop_registration_wizard.step_3.title') }}</h1>
        <p>
          {{ $t('shop_registration_wizard.step_3.text') }}
        </p>
        <FormulateForm v-model="shop" @submit="$refs.wizard.nextTab()">
          <FormulateInput
            name="delivery"
            :options="{
              pickup: $t('shop_registration_wizard.step_3.pickup'),
              delivery: $t('shop_registration_wizard.step_3.delivery'),
              ship: $t('shop_registration_wizard.step_3.ship'),
            }"
            type="checkbox"
            label="This is a label for all the options"
          />
          <FormulateInput
            type="submit"
            :label="$t('shop_registration_wizard.next')"
          />
        </FormulateForm>
      </div>
    </tab-content>

    <!-- STEP 4-->
    <tab-content>
      <div class="container prose max-w-xl mx-auto">
        <h1>{{ $t('shop_registration_wizard.step_4.title') }}</h1>
        <p>
          {{ $t('shop_registration_wizard.step_4.text') }}
        </p>
        <FormulateForm
          v-model="shop.customerContact"
          @submit="$refs.wizard.nextTab()"
        >
          <FormulateInput
            type="text"
            name="phone"
            :label="$t('shop_registration_wizard.step_4.phone')"
          />
          <FormulateInput
            type="text"
            name="whatsapp"
            :label="$t('shop_registration_wizard.step_4.whatsapp')"
          />
          <FormulateInput
            type="text"
            name="email"
            :label="$t('shop_registration_wizard.step_4.email')"
          />
          <FormulateInput
            type="text"
            name="website"
            :label="$t('shop_registration_wizard.step_4.website')"
          />
          <FormulateInput
            type="submit"
            :label="$t('shop_registration_wizard.next')"
          />
        </FormulateForm>
      </div>
    </tab-content>

    <!-- STEP 5-->
    <tab-content>
      <div class="container prose max-w-xl mx-auto">
        <h1>{{ $t('shop_registration_wizard.step_5.title') }}</h1>
        <p>
          {{ $t('shop_registration_wizard.step_5.text') }}
        </p>

        <h2>{{ $t('shop_registration_wizard.step_5.your_store') }}</h2>
        <p>{{ $t('shop_registration_wizard.step_5.text_store') }}</p>
        <FormulateInput
          type="image"
          :label="$t('shop_registration_wizard.step_5.store_photo')"
          validation="mime:image/jpeg,image/png"
        />
        <h2>{{ $t('shop_registration_wizard.step_5.you') }}</h2>
        <p>{{ $t('shop_registration_wizard.step_5.text_you') }}</p>
        <FormulateInput
          type="image"
          :label="$t('shop_registration_wizard.step_5.you_photo')"
          validation="mime:image/jpeg,image/png"
        />
        <h2>{{ $t('shop_registration_wizard.step_5.extra_points') }}</h2>
        <p>{{ $t('shop_registration_wizard.step_5.text_extra_points') }}</p>
        <FormulateInput
          v-model="shop.videoLink"
          type="text"
          :placeholder="
            $t('shop_registration_wizard.step_5.yt_link_placeholder')
          "
          :label="$t('shop_registration_wizard.step_5.yt_link')"
        />
      </div>
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
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  middleware: 'authenticated',
  async asyncData({ $axios }) {
    const shopCategories = await $axios.$get('/api/shops/categories')
    return { shopCategories }
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
    async createShop() {
      console.log(this.shop)
      try {
        await this.$axios.$post('/api/shops', this.shop)
      } catch (error) {
        console.error(error)
      }
    },
    submitStep1(args) {
      this.shop = { ...args }
      this.$refs.wizard.nextTab()
    },
    submitStep2(args) {
      console.log('2')
      this.shop.openingHours = args
      console.log(this.shop)
      this.$refs.wizard.nextTab()
    },
  },
}
</script>
