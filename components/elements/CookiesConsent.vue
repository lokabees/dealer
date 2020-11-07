<template>
  <div>
    <div v-show="!cookiesAllowed && !isLegalPage()" class="modal-bg" />
    <transition name="modalAnimation">
      <div v-show="!cookiesAllowed && !isLegalPage()" class="modal-wrapper">
        <div class="modal">
          <div class="modal-body p-6 sm:p-8 w-full max-w-xl">
            <div class="pb-6">{{ $t('cookies_consent.text') }}</div>
            <div class="pb-6">
              {{ $t('cookies_consent.more_info') }}
              <a :href="`${$config.consumerUrl}/privacy`">{{
                $t('cookies_consent.privacy')
              }}</a>
            </div>
            <div class="flex justify-end">
              <button @click="allowCookies">
                {{ $t('cookies_consent.accept') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return { cookiesAllowed: true }
  },
  mounted() {
    if (!process.browser) return
    this.cookiesAllowed = this.$cookies.get('cookies-allowed')
  },
  methods: {
    isLegalPage() {
      return this.$route.name === 'privacy' || this.$route.name === 'imprint'
    },
    allowCookies() {
      this.$cookies.set('cookies-allowed', 'true', {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
      })
      this.cookiesAllowed = true
    },
  },
}
</script>

<style lang="scss" scoped>
/*
 * Top Modal Item Animation
 */
.modalAnimation-item {
  display: inline-block;
}

.modalAnimation-enter-active,
.modalAnimation-leave-active {
  transition: all 0.5s;
}

.modalAnimation-enter,
.modalAnimation-leave-to {
  opacity: 0;
  transform: translateY(-2rem);
}

.modal {
  @apply h-screen w-full absolute flex items-center justify-center;
  &-wrapper {
    @apply z-50 fixed top-0 left-0 bottom-0 right-0 bg-transparent shadow;
  }
  &-bg {
    @apply z-50 fixed top-0 left-0 h-screen w-full bg-black opacity-50;
  }
  &-body {
    @apply bg-white m-3 max-h-full  rounded-lg;
  }
}
</style>
