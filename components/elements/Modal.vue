<template>
  <div>
    <div v-show="visible && !errorModal" class="modal-bg" />
    <transition name="modalAnimation">
      <div v-show="visible && !errorModal" class="modal-wrapper">
        <div class="modal">
          <div class="modal-body p-6 sm:p-8 w-full max-w-xl">
            <div class="pb-6">
              {{ message }}
            </div>
            <div class="flex justify-end">
              <slot name="buttons"></slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    visible: { type: Boolean, default: false },
    message: { type: String, default: '' },
  },
  computed: {
    ...mapGetters('modal', {
      errorModal: 'visible',
    }),
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
