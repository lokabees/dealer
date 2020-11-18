<template>
  <div class="bg-primary-lightest">
    <div
      class="container grid grid-cols-3 gap-6 mt-16 mb-8 pt-12 w-full border-t border-grey-dark"
    >
      <div class="text-center grid">
        <a
          class="text-grey-dark font-medium"
          :href="`${$config.consumerUrl}/imprint`"
          >{{ $t('footer.links.imprint') }}</a
        >
        <a
          class="text-grey-dark font-medium"
          :href="`${$config.consumerUrl}/privacy`"
          >{{ $t('footer.links.privacy') }}</a
        >
      </div>
      <div class="col-span-1 flex justify-center">
        <div>
          <a
            href="https://github.com/lokabees"
            target="_blank"
            class="bg-primary-lighter rounded-full w-10 h-10 flex m-2"
          >
            <eva-icon class="m-auto" name="twitter" fill="#19AE9D" />
          </a>
        </div>
        <div>
          <a
            href="https://github.com/lokabees"
            target="_blank"
            class="bg-primary-lighter rounded-full w-10 h-10 flex m-2"
          >
            <eva-icon class="m-auto" name="github" fill="#19AE9D" />
          </a>
        </div>
      </div>
      <div class="text-center grid">
        <a
          class="text-grey-dark font-medium"
          :href="`${$config.consumerUrl}/contact`"
          >{{ $t('footer.links.contact') }}</a
        >
        <a
          class="text-grey-dark font-medium"
          :href="`${$config.consumerUrl}/terms`"
          >{{ $t('footer.links.terms') }}</a
        >
      </div>
    </div>
    <div class="container flex justify-center pb-5">
      <button
        v-for="locale in locales"
        :key="locale.code"
        class="w-14"
        @click="switchLanguage(locale.code)"
      >
        <img :src="locale.icon" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    locales() {
      return this.$store.getters.locales
    },
  },
  methods: {
    switchLanguage(localeCode) {
      this.$cookies.set('locale', localeCode)
      location.reload()
    },
  },
}
</script>
