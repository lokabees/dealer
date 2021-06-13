<template>
  <div class="fixed z-50">
    <div v-show="visible" class="modal-bg" />
    <transition name="modalAnimation">
      <div v-show="visible" class="modal-wrapper">
        <div class="modal">
          <div
            v-click-outside="closeModal"
            class="modal-body p-6 sm:p-8 w-full max-w-xl"
          >
            <div class="flex justify-center py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="#2B2B2B"
                class="eva"
              >
                <g data-name="Layer 2">
                  <g data-name="alert-circle">
                    <rect width="24" height="24" opacity="0"></rect>
                    <path
                      d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"
                    ></path>
                    <circle cx="12" cy="16" r="1"></circle>
                    <path
                      d="M12 7a1 1 0 0 0-1 1v5a1 1 0 0 0 2 0V8a1 1 0 0 0-1-1z"
                    ></path>
                  </g>
                </g>
              </svg>
            </div>
            <div>
              {{ $t(message) }}
            </div>
            <div class="flex justify-end">
              <button class="font-bold" @click="hideModal">
                {{ $t('general.ok') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import ClickOutside from 'vue-click-outside'
export default {
  directives: {
    ClickOutside,
  },
  computed: {
    ...mapGetters('modal', {
      visible: 'visible',
      message: 'message',
    }),
  },
  methods: {
    ...mapMutations('modal', { hideModal: 'hideModal' }),
    closeModal(event) {
      const isClickLegit =
        typeof event.target.closest === 'undefined'
          ? event.target.classList.contains('modal-wrapper') ||
            event.target.parentNode.classList.contains('modal-wrapper')
          : !event.target.closest('.modal-body') &&
            event.target.closest('.modal-wrapper')
      if (isClickLegit) {
        this.$emit('close')
      }
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
    @apply bg-danger-lighter border-t-4 border-danger m-3 max-h-full  rounded-lg;
  }
}
</style>
