<template>
  <div>
    <Modal>
      <template v-slot:buttons>
        <button @click="hideModal">{{ $t('login.ok') }}</button>
      </template>
    </Modal>
    <div class="container max-w-xl">
      <form-wizard
        ref="wizard"
        color="#19ae9d"
        :start-index="0"
        step-size="xs"
        @on-complete="$router.push('/shop/success')"
      >
        <span slot="title"></span>

        <!-- STEP 1-->
        <tab-content>
          <WizardStep1
            :shop-categories="shopCategories"
            @submit="$refs.wizard.nextTab()"
          />
        </tab-content>

        <!-- STEP 2-->
        <tab-content>
          <WizardStep2
            @submit="$refs.wizard.nextTab()"
            @back="$refs.wizard.prevTab()"
          />
        </tab-content>

        <!-- STEP 3-->
        <tab-content>
          <WizardStep3
            @submit="$refs.wizard.nextTab()"
            @back="$refs.wizard.prevTab()"
          />
        </tab-content>

        <!-- STEP 4-->
        <tab-content>
          <WizardStep4
            @submit="$refs.wizard.nextTab()"
            @back="$refs.wizard.prevTab()"
          />
        </tab-content>

        <!-- STEP 5-->
        <tab-content>
          <WizardStep5 @submit="createShop" @back="$refs.wizard.prevTab()" />
        </tab-content>

        <template slot="footer">
          <div class="wizard-footer-left"></div>
        </template>
      </form-wizard>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
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
  computed: {
    ...mapGetters('shops', {
      activeShop: 'activeShop',
    }),
  },
  methods: {
    ...mapMutations('modal', {
      showModal: 'showModal',
      hideModal: 'hideModal',
    }),
    async createShop(creatives) {
      try {
        // console.log(this.shop)
        await this.$axios.$post('/api/shops', this.activeShop)
        await this.$store.dispatch('shops/getActiveShop')
        this.$router.push('success')
      } catch (error) {
        console.error(error)
        this.showModal(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.wizard {
  @apply bg-black;

  height: 20px;
}
</style>
