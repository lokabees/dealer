<template>
  <div
    class="fixed inset-0 flex items-start justify-center px-4 py-0 pointer-events-none sm:p-3 sm:items-start sm:justify-end z-50"
  >
    <transition-group
      name="toast-fade"
      class="max-w-sm w-full rounded-lg pointer-events-auto"
    >
      <div
        v-for="(t, index) in toasts"
        :key="t.id"
        class="animated rounded-lg shadow-xl overflow-hidden my-3 bg-white"
      >
        <div class="p-4">
          <div class="flex items-center text-primary">
            <client-only>
              <div>
                <img
                  :src="$auth.user.picture.url"
                  class="rounded-full mr-2"
                  width="35"
                  alt=""
                />
              </div>
            </client-only>
            <div class="w-0 flex-1 flex justify-between">
              <h1>toast</h1>
              <p>{{ $t(t.message) }} {{ t.text }}</p>
            </div>
            <div class="ml-4 flex-shrink-0 flex">
              <button>
                <icon
                  name="close"
                  @click="$store.commit('toast/removeToast', index)"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { debounce } from 'lodash'
export default {
  name: 'Toast',
  computed: {
    toasts() {
      return this.$store.getters['toast/list']
    },
  },
  mounted() {
    this.$root.$on(
      'keyDownEscape',
      debounce(() => {
        this.$store.commit('toast/removeLastToast')
      }, 10)
    )
  },
}
</script>
