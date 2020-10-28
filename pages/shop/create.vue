<template>
  <div>
    <div class="container max-w-xl">
      <form-wizard
        ref="wizard"
        color="#19ae9d"
        :start-index="4"
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
          <WizardStep5
            :pending="pending"
            @submit="createShop"
            @back="$refs.wizard.prevTab()"
          />
        </tab-content>

        <template slot="footer">
          <div class="wizard-footer-left"></div>
        </template>
      </form-wizard>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
      pending: false,
    }
  },
  computed: {
    ...mapGetters('shops', {
      activeShop: 'activeShop',
    }),
  },
  methods: {
    async createShop(creatives) {
      this.pending = true
      try {
        await this.$axios.$post('/api/shops', this.activeShop)
        await this.$store.dispatch('shops/getActiveShop')
        this.$router.push('success')
      } catch (error) {
        this.pending = false
        this.$errorHandler({ prefix: 'shop_registration_wizard', error })
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
