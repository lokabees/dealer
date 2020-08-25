<template>
  <div v-if="visible">
    <div>
      {{ message }}
    </div>
    <div>
      <slot name="buttons"></slot>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('modal', {
      visible: 'visible',
      message: 'message',
    }),
  },
}
</script>
