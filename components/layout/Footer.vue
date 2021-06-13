<template>
  <div class="bg-primary-lightest">
    <div
      class="
        container
        grid grid-cols-3
        gap-6
        mt-16
        mb-8
        pt-12
        w-full
        border-t border-grey-dark
      "
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
            href="https://twitter.com/lokabees"
            target="_blank"
            class="bg-primary-lighter rounded-full w-10 h-10 flex m-2"
          >
            <i class="m-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#19AE9D"
                class="eva"
              >
                <g data-name="Layer 2">
                  <g data-name="twitter">
                    <polyline
                      points="0 0 24 0 24 24 0 24"
                      opacity="0"
                    ></polyline>
                    <path
                      d="M8.08 20A11.07 11.07 0 0 0 19.52 9 8.09 8.09 0 0 0 21 6.16a.44.44 0 0 0-.62-.51 1.88 1.88 0 0 1-2.16-.38 3.89 3.89 0 0 0-5.58-.17A4.13 4.13 0 0 0 11.49 9C8.14 9.2 5.84 7.61 4 5.43a.43.43 0 0 0-.75.24 9.68 9.68 0 0 0 4.6 10.05A6.73 6.73 0 0 1 3.38 18a.45.45 0 0 0-.14.84A11 11 0 0 0 8.08 20"
                    ></path>
                  </g>
                </g>
              </svg>
            </i>
          </a>
        </div>
        <div>
          <a
            href="https://facebook.com/lokabees"
            target="_blank"
            class="bg-primary-lighter rounded-full w-10 h-10 flex m-2"
          >
            <i class="m-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#19AE9D"
                class="eva"
              >
                <g data-name="Layer 2">
                  <g data-name="facebook">
                    <rect
                      width="24"
                      height="24"
                      transform="rotate(180 12 12)"
                      opacity="0"
                    ></rect>
                    <path
                      d="M17 3.5a.5.5 0 0 0-.5-.5H14a4.77 4.77 0 0 0-5 4.5v2.7H6.5a.5.5 0 0 0-.5.5v2.6a.5.5 0 0 0 .5.5H9v6.7a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-6.7h2.62a.5.5 0 0 0 .49-.37l.72-2.6a.5.5 0 0 0-.48-.63H13V7.5a1 1 0 0 1 1-.9h2.5a.5.5 0 0 0 .5-.5z"
                    ></path>
                  </g>
                </g>
              </svg>
            </i>
          </a>
        </div>
        <div>
          <a
            href="https://instagram.com/lokabees/"
            target="_blank"
            rel="noreferrer"
            class="
              bg-primary-lighter
              rounded-full
              w-10
              h-10
              flex
              m-2
              items-center
              justify-center
            "
          >
            <span class="sr-only">Instagram </span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#19AE9D">
              <path
                fill-rule="evenodd"
                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
      <div class="text-center grid">
        <a
          class="text-grey-dark font-medium"
          href="https://lokabees-consumer-dev.herokuapp.com/contact"
          >{{ $t('footer.links.contact') }}</a
        >
        <!--
        <a
          class="text-grey-dark font-medium"
          href="https://lokabees-consumer-dev.herokuapp.com/terms"
          >{{ $t('footer.links.terms') }}</a
        >
      --></div>
    </div>
    <div class="container flex align-center justify-center pb-5">
      <template v-for="locale in locales">
        <nuxt-link
          :key="locale.code"
          :to="switchLocalePath(locale.code)"
          class="w-14 p-2 flex align-center justify-center"
          ><img :src="locale.icon" alt="locale.name" title="locale.name"
        /></nuxt-link>
      </template>
      <!--<button
        v-for="locale in locales"
        :key="locale.code"
        class="w-14"
        @click="switchLanguage(locale.code)"
      >
        <img :src="locale.icon" />
      </button>-->
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
  /* methods: {
    switchLanguage(localeCode) {
      this.$cookies.set('locale', localeCode)
      location.reload()
    },
  }, */
}
</script>
