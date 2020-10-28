<template>
  <div>
    <div v-show="visible" class="modal-bg" />
    <transition name="modalAnimation">
      <div v-show="visible" class="modal-wrapper">
        <div class="modal">
          <div class="modal-body p-6 sm:p-8 w-full max-w-xl">
            <div class="flex justify-center py-3">
              <eva-icon
                name="alert-circle-outline"
                width="40"
                height="40"
                fill="#2B2B2B"
              />
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
export default {
  computed: {
    ...mapGetters('modal', {
      visible: 'visible',
      message: 'message',
    }),
  },
  methods: {
    ...mapMutations('modal', { hideModal: 'hideModal' }),
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
